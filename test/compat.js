/* Moja Droga — test zgodnosci ze starszym HTML (mixed-version)
   Uruchomienie: node test/compat.js
   Symuluje sytuacje z zycia: przegladarka trzyma w cache STARSZY index.html
   (np. sprzed zakladki Wedding), a pliki js/ sa juz nowe. Wtedy w DOM brakuje
   nowych elementow i zaden skrypt nie moze rzucic wyjatku — inaczej cala
   aplikacja (w tym dolna nawigacja) przestaje dzialac.
   Test uruchamia caly JS na atrapach DOM bez nowych elementow, w trzech stanach:
   bez zapisu, z sect='eng' i z sect='wed'. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script[^>]*\bsrc="(js\/[^"]+\.js)"/g)].map(m => m[1]);

/* Elementy dodane w tej wersji — symulujemy HTML, ktorego jeszcze nie ma. */
const NEW_IDS = ['vw-home', 'wLangBtn', 'wSzPill', 'wThemeBtn', 'w-homeTitle', 'w-homeSub',
  'w-scroll', 'bnWed', 'updateRow', 'updateLbl', 'updateBtn', 'updateNote'];

const allIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
const oldIds = new Set([...allIds].filter(id => NEW_IDS.indexOf(id) === -1));

let errors = 0;
const fail = (msg) => { errors++; console.error('  ✗ ' + msg); };
const ok = (msg) => console.log('  ✓ ' + msg);

const noop = () => {};
function mkClassList() {
  const set = new Set();
  return {
    add: (...c) => c.forEach(x => set.add(x)),
    remove: (...c) => c.forEach(x => set.delete(x)),
    toggle: (c, on) => { const v = on === undefined ? !set.has(c) : !!on; v ? set.add(c) : set.delete(c); return v; },
    contains: c => set.has(c)
  };
}
function mkEl(tag, id) {
  const el = {
    tagName: (tag || 'div').toUpperCase(), id: id || '', children: [], hidden: false,
    innerHTML: '', textContent: '', value: '', className: '', title: '', disabled: false,
    style: { setProperty: noop, removeProperty: noop }, dataset: {}, classList: mkClassList(),
    addEventListener: noop, removeEventListener: noop, appendChild(c) { el.children.push(c); c.parentNode = el; return c; },
    insertBefore(c) { el.children.unshift(c); c.parentNode = el; return c; },
    remove: noop, setAttribute: noop, getAttribute: () => null, removeAttribute: noop,
    querySelector: () => null, querySelectorAll: () => [], closest: () => null,
    contains: () => false, focus: noop, click: noop, select: noop,
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 320, height: 100 })
  };
  el.parentNode = null;
  return el;
}

/* jedna proba: zwraca {errors:[], missing:[], els:Map} */
function runPass(state, label) {
  const byId = new Map();
  const mk = (id) => { if (!byId.has(id)) byId.set(id, mkEl('div', id)); return byId.get(id); };
  const missing = new Set();
  const documentEl = mkEl('html');
  const bodyEl = mkEl('body');
  const store = {};
  if (state) store['mdv4'] = JSON.stringify(state);
  const document = {
    documentElement: documentEl, body: bodyEl, title: '',
    /* KLUCZ TESTU: brak nowych elementow zwraca null (jak w starszym HTML) */
    getElementById: id => { const el = oldIds.has(id) ? mk(id) : null; if (!el) missing.add(id); else el.parentNode = el.parentNode || mkEl('div'); return el; },
    querySelector: () => null, querySelectorAll: () => [],
    createElement: t => mkEl(t), createDocumentFragment: () => mkEl('fragment'),
    addEventListener: noop, removeEventListener: noop,
    execCommand: () => true, hidden: false, visibilityState: 'visible'
  };
  const windowObj = {
    document, matchMedia: () => ({ matches: false, addEventListener: noop, addListener: noop, removeEventListener: noop }),
    addEventListener: noop, removeEventListener: noop,
    requestAnimationFrame: cb => { cb(16); return 1; }, cancelAnimationFrame: noop,
    setTimeout: () => 1, clearTimeout: noop, setInterval: () => 1, clearInterval: noop,
    navigator: { onLine: true, userAgent: 'node', clipboard: { writeText: () => Promise.resolve() } },
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    location: { search: state === 'go=wed' ? '?go=wed' : '', href: 'http://localhost/index.html', reload: noop, origin: 'http://localhost', protocol: 'http:' },
    Intl, URLSearchParams, JSON, Math, Date, String, Number, Array, Object, Promise, isFinite, isNaN, parseInt, parseFloat, Set, Map,
    console: { log: noop, warn: noop, error: noop },
    serviceWorker: undefined, fetch: () => Promise.resolve({ text: () => Promise.resolve("const CACHE = 'moja-droga-v22';") }),
    MutationObserver: function () { this.observe = noop; this.disconnect = noop; this.takeRecords = () => []; }
  };
  windowObj.window = windowObj;
  windowObj.self = windowObj;
  windowObj.globalThis = windowObj;

  const ctx = vm.createContext(windowObj);
  const threw = [];
  scripts.forEach(rel => {
    const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    try { vm.runInContext(code, ctx, { filename: rel }); }
    catch (e) { threw.push(rel + ' → ' + e.message + ' @ ' + String(e.stack || '').split('\n').slice(1, 4).join(' | ')); }
  });
  console.log('  · ' + label);
  if (threw.length) threw.forEach(t => fail('wyjatek na starym HTML: ' + t));
  else ok('caly JS wykonal sie bez wyjatkow (' + scripts.length + ' plikow)');
  if (byId.has('bnWed')) fail('atrapa DOM zawiera bnWed — test nie symuluje starszego HTML');
  return { byId, missing, ctx };
}


/* ── przebieg testu ── */
console.log('test/compat.js — nowy JS na starszym HTML (stany z cache)');
console.log('  HTML bez nowych elementow: ' + NEW_IDS.join(', '));

const p1 = runPass(null, 'stan bez zapisu (pierwsze uruchomienie)');
const p2 = runPass({ v: 1, sect: 'eng', lang: 'pl', theme: 'light', scale: '1', done: {} }, 'stan z sect=eng');
const p3 = runPass({ v: 1, sect: 'wed', lang: 'pl', theme: 'light', scale: '1', done: { wed_0: true } }, 'stan z sect=wed');

/* start musi wybrac widok, ktory istnieje: sect=eng → ve-home, sect=wed → vi-home (bezpieczny powrot) */
[[p1, 'vi-home', 'bez zapisu'], [p2, 've-home', 'sect=eng'], [p3, 'vi-home', 'sect=wed']].forEach(pair => {
  var p = pair[0], want = pair[1], lbl = pair[2];
  const got = (p.byId.get('vi-home') && p.byId.get('vi-home').classList.contains('active')) ? 'vi-home'
    : ((p.byId.get('ve-home') && p.byId.get('ve-home').classList.contains('active')) ? 've-home' : 'brak');
  if (got === want) ok('[' + lbl + '] start na istniejacym widoku: ' + got);
  else fail('[' + lbl + '] oczekiwano ' + want + ', a aktywny jest ' + got);
});

/* renderWedding nie moze rzucac, gdy brakuje widoku Wedding */
try {
  vm.runInContext('renderWedding()', p3.ctx);
  ok('renderWedding() bezpieczne przy braku widoku Wedding');
} catch (e) { fail('renderWedding() rzuca wyjatek: ' + e.message); }

/* widok z nowszej wersji zadany wprost tez nie moze wywalic aplikacji */
try {
  vm.runInContext('showV("vw-home")', p3.ctx);
  ok('showV("vw-home") bezpieczne przy braku tego widoku');
} catch (e) { fail('showV("vw-home") rzuca wyjatek: ' + e.message); }

/* dolna nawigacja: brak przycisku Wedding nie moze zablokowac Islam/Angielski */
const navSrc = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
['navGo', 'wireNav'].forEach(n => {
  if (navSrc.indexOf('function ' + n) === -1) fail('brak funkcji ' + n + '() w js/app.js (ochrona nawigacji)');
});
if (/getElementById\('bnWed'\)\s*&&?/.test(navSrc) === false && /getElementById\('bnWed'\)\.addEventListener/.test(navSrc)) fail('js/app.js podlacza bnWed bez zabezpieczenia');
else ok('nawigacja sprawdza istnienie przyciskow przed podlaczeniem');

console.log('');
if (errors) { console.error('PORAZKA: ' + errors + ' problem(ow)'); process.exit(1); }
console.log('WSZYSTKO OK');
