const fs = require('fs');
const vm = require('vm');
const h = fs.readFileSync('D:/pobrane/ai/Moja Droga/index.html', 'utf8');
const m = h.match(/<script>([\s\S]*?)<\/script>/);
let src = m[1];
// strip outer IIFE wrapper: first occurrence of (function(){ and the LAST })();
src = src.replace('(function(){', '');
const idx = src.lastIndexOf('})();');
src = src.slice(0, idx);

const sandbox = {
  document: {
    getElementById: () => ({
      classList: { toggle() {}, add() {}, remove() {} },
      style: { setProperty() {} },
      addEventListener() {}, setAttribute() {}, appendChild() {},
    }),
    querySelector: () => null,
    querySelectorAll: () => ({ forEach() {} }),
    createElement: () => ({ classList: { add() {}, toggle() {} }, appendChild() {}, addEventListener() {}, dataset: {}, style: {} }),
    addEventListener() {},
    documentElement: { setAttribute() {}, style: { setProperty() {} } },
    body: { appendChild() {} },
  },
  localStorage: { getItem: () => null, setItem() {} },
  window: { addEventListener() {} },
  navigator: {}, Intl, Date, Math, URL,
  setInterval: () => 0, setTimeout: () => 0,
  Blob: function () {}, FileReader: function () {},
};
vm.createContext(sandbox);
vm.runInContext(src + '\n;globalThis.__T=TOPICS;globalThis.__C=CITIES;globalThis.__E=ENTRIES;globalThis.__eKey=eKey;globalThis.__ps=psets;globalThis.__ST=ST;', sandbox);
const T = sandbox.__T, C = sandbox.__C, E = sandbox.__E, ps = sandbox.__ps;
console.log('topics:' + T.length, 'cities:' + C.length, 'entries:' + E.length, 'psets:' + Object.keys(ps).join(','));
const errs = [];
const keys = new Set();
T.forEach(t => {
  if (!t.id || !t.title || !t.title.pl || !t.title.en) errs.push('topic bad id/title: ' + JSON.stringify(t.id));
  ['b1', 'b2'].forEach(lv => {
    if (!t[lv] || !t[lv].length) { errs.push(t.id + ' missing/empty ' + lv); return; }
    t[lv].forEach((it, i) => {
      const loc = t.id + '/' + lv + '/' + i + ' (' + (it.t && (it.t.en || it.t.pl)) + ')';
      if (!it.t || !it.t.pl || !it.t.en) errs.push(loc + ' bad t');
      if (!it.d || !it.d.pl || !it.d.en) errs.push(loc + ' bad d');
      if (it.t) {
        const k = sandbox.__eKey(t.id, lv, it);
        if (keys.has(k)) errs.push('DUPLICATE eKey: ' + k);
        keys.add(k);
      }
      (it.when || []).forEach((w, wi) => { if (!w.pl || !w.en) errs.push(loc + ' when[' + wi + '] missing lang'); });
      (it.compare || []).forEach((c, ci) => { if (!c.h || !c.h.pl || !c.h.en || !c.note || !c.note.pl || !c.note.en || c.ex === undefined) errs.push(loc + ' compare[' + ci + '] incomplete'); });
      (it.mistakes || []).forEach((mm, mi) => { if (!mm.bad || !mm.good || !mm.why || !mm.why.pl || !mm.why.en) errs.push(loc + ' mistakes[' + mi + '] incomplete'); });
      if (it.remember && (!it.remember.pl || !it.remember.en)) errs.push(loc + ' remember incomplete');
      if (it.tip && (!it.tip.pl || !it.tip.en)) errs.push(loc + ' tip incomplete');
      if (it.sec && (!it.sec.pl || !it.sec.en)) errs.push(loc + ' sec incomplete');
      (it.quiz || []).forEach((q, qi) => {
        if (!q.q || !q.q.pl || !q.q.en) errs.push(loc + ' quiz[' + qi + '] bad q');
        if (!q.why || !q.why.pl || !q.why.en) errs.push(loc + ' quiz[' + qi + '] bad why');
        if (!q.opts || q.opts.length < 2) errs.push(loc + ' quiz[' + qi + '] opts<2');
        else {
          if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.opts.length) errs.push(loc + ' quiz[' + qi + '] answer a=' + q.a + ' OUT OF BOUNDS (opts=' + q.opts.length + ')');
          q.opts.forEach((o, oi) => { if (!o.pl || !o.en) errs.push(loc + ' quiz[' + qi + '] opt[' + oi + '] missing lang'); });
        }
      });
    });
  });
});
console.log(errs.length ? 'DATA ERRORS:\n' + errs.join('\n') : 'NO DATA ERRORS');
console.log('items b1:' + T.reduce((a, t) => a + t.b1.length, 0), 'b2:' + T.reduce((a, t) => a + t.b2.length, 0));
const cid = C.map(c => c.id);
console.log('dup city ids:', cid.filter((x, i) => cid.indexOf(x) !== i).join(',') || 'none');
const eid = E.map(e => e.id);
console.log('dup entry ids:', eid.filter((x, i) => eid.indexOf(x) !== i).join(',') || 'none');
// prayer sets sanity
['2', '3', '4'].forEach(v => {
  const s = ps[v];
  console.log('pset ' + v + ': ' + s.length + ' sections, lines: ' + s.reduce((a, x) => a + x.lines.length, 0));
});
// prayer-time engine numeric check vs known values (Krakow, 15 June 2024 ~ mid-year)
const compUTC = sandbox.compUTC || null;
try {
  const r = vm.runInContext('compUTC(2024,6,15,50.0647,19.945)', sandbox);
  console.log('Krakow 2024-06-15 raw UTC hours:', JSON.stringify(r, (k, v) => typeof v === 'number' ? +v.toFixed(3) : v));
  const r2 = vm.runInContext('compUTC(2024,12,15,50.0647,19.945)', sandbox);
  console.log('Krakow 2024-12-15 raw UTC hours:', JSON.stringify(r2, (k, v) => typeof v === 'number' ? +v.toFixed(3) : v));
} catch (e) { console.log('compUTC error: ' + e.message); }
// HTML: ids + getElementById cross-check + duplicate IDs
const idMatches = [...h.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
const dupIds = idMatches.filter((x, i) => idMatches.indexOf(x) !== i);
console.log('HTML ids:', idMatches.length, 'duplicates:', [...new Set(dupIds)].join(',') || 'none');
const gbi = [...h.matchAll(/getElementById\('([^']+)'\)/g)].map(x => x[1]);
const htmlIds = new Set(idMatches);
const missing = [...new Set(gbi.filter(g => !htmlIds.has(g) && !/^epf-/.test(g)))];
console.log('getElementById targets missing from HTML:', missing.join(',') || 'none');
const dyn = [...new Set(gbi.filter(g => !htmlIds.has(g)))];
console.log('dynamic-only ids:', dyn.join(',') || 'none');
