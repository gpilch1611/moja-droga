/* Moja Droga — test ladowania (bez przegladarki)
   Uruchomienie: node test/load.js
   Wykonuje wszystkie pliki js/ w kolejnosci z index.html na minimalnych atrapach DOM,
   zeby wychwycic bledy wykonywane przy starcie (brakujace API, literowki, zle nazwy). */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script[^>]*\bsrc="(js\/[^"]+\.js)"/g)].map(m => m[1]);

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
    innerHTML: '', textContent: '', value: '', className: '', title: '',
    style: { setProperty: noop, removeProperty: noop }, dataset: {}, classList: mkClassList(),
    addEventListener: noop, removeEventListener: noop, appendChild(c) { el.children.push(c); c.parentNode = el; return c; },
    insertBefore(c) { el.children.unshift(c); c.parentNode = el; return c; },
    remove: noop, setAttribute: noop, getAttribute: () => null, removeAttribute: noop,
    querySelector: () => null, querySelectorAll: () => [], closest: () => null,
    contains: () => false, focus: noop, click: noop, select: noop, animate: () => ({ finished: Promise.resolve() }),
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 320, height: 100 })
  };
  el.parentNode = null;
  return el;
}
const byId = new Map();
const getEl = id => { if (!byId.has(id)) byId.set(id, mkEl('div', id)); return byId.get(id); };
/* realne id z markupu + id tworzone dynamicznie w JS (.id='...'), zeby wykryc literowki */
const htmlIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
scripts.forEach(rel => {
  const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  [...code.matchAll(/\.id='([^']+)'/g)].forEach(m => htmlIds.add(m[1]));
});
const unknownIds = new Set();

const documentEl = mkEl('html');
const bodyEl = mkEl('body');
const document = {
  documentElement: documentEl, body: bodyEl, title: '',
  getElementById: id => { if (!htmlIds.has(id)) unknownIds.add(id); const el = getEl(id); el.parentNode = el.parentNode || mkEl('div'); return el; },
  querySelector: () => null, querySelectorAll: () => [],
  createElement: t => mkEl(t), createDocumentFragment: () => mkEl('fragment'),
  addEventListener: noop, removeEventListener: noop,
  execCommand: () => true, hidden: false, visibilityState: 'visible'
};
const store = {};
const windowObj = {
  document, matchMedia: () => ({ matches: false, addEventListener: noop, addListener: noop, removeEventListener: noop }),
  addEventListener: noop, removeEventListener: noop,
  requestAnimationFrame: cb => { cb(16); return 1; }, cancelAnimationFrame: noop,
  setTimeout: (fn) => 1, clearTimeout: noop, setInterval: () => 1, clearInterval: noop,
  navigator: { onLine: true, userAgent: 'node', clipboard: { writeText: () => Promise.resolve() } },
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  location: { search: '', reload: noop, origin: 'http://localhost', protocol: 'http:' },
  Intl, URLSearchParams, JSON, Math, Date, String, Number, Array, Object, Promise, isFinite, isNaN, parseInt, parseFloat,
  console: { log: noop, warn: noop, error: noop },
  serviceWorker: undefined, fetch: () => Promise.resolve({ text: () => Promise.resolve("const CACHE = 'moja-droga-v14';") }),
  MutationObserver: function () { this.observe = noop; this.disconnect = noop; this.takeRecords = () => []; }
};
windowObj.window = windowObj;
windowObj.self = windowObj;
windowObj.globalThis = windowObj;

let errors = 0;
console.log('test/load.js — ladowanie js/ na atrapach DOM');
const ctx = vm.createContext(windowObj);
scripts.forEach(rel => {
  const p = path.join(ROOT, rel);
  const code = fs.readFileSync(p, 'utf8');
  try {
    vm.runInContext(code, ctx, { filename: rel });
    console.log('  ✓ ' + rel + ' — wykonany bez bledow');
  } catch (e) {
    errors++;
    console.error('  ✗ ' + rel + ' — ' + e.message);
  }
});
if (unknownIds.size) {
  errors++;
  console.error('  ✗ getElementById na id, ktorych nie ma w index.html: ' + [...unknownIds].join(', '));
} else {
  console.log('  ✓ wszystkie uzyte id istnieja w index.html');
}
console.log('');
if (errors) { console.error('PORAZKA: ' + errors + ' problem(ow)'); process.exit(1); }
console.log('WSZYSTKO OK');
