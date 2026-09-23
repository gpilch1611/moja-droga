/* Moja Droga — test dymny (smoke test)
   Uruchomienie: node test/smoke.js
   Sprawdza: zasoby zalaczone w index.html, skladnie plikow js/, kompletnosc
   referencji getElementById, duplikaty id, spojnosc kluczy i18n PL/EN,
   manifest oraz pliki precache Service Workera. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let errors = 0;
const fail = (msg) => { errors++; console.error('  ✗ ' + msg); };
const ok = (msg) => console.log('  ✓ ' + msg);

/* ── index.html ── */
console.log('index.html');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/* 1. Lokalne zasoby (<script src>, <link href>) istnieja na dysku */
const assets = [...html.matchAll(/<(?:script[^>]*\bsrc|link[^>]*\bhref)="([^"]+)"/g)]
  .map(m => m[1].split('?')[0])
  .filter(u => !/^https?:/.test(u) && !u.startsWith('data:'));
assets.forEach(a => {
  if (fs.existsSync(path.join(ROOT, a))) ok('zasob istnieje: ' + a);
  else fail('brak pliku zasobu z index.html: ' + a);
});

/* ── js/ ── */
console.log('js/');
const jsDir = path.join(ROOT, 'js');
const onDisk = fs.existsSync(jsDir) ? fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).sort() : [];
const inHtml = [...html.matchAll(/<script[^>]*\bsrc="js\/([^"]+\.js)"/g)].map(m => m[1]);
let jsAll = '';
inHtml.forEach(f => {
  const p = path.join(jsDir, f);
  if (!fs.existsSync(p)) { fail('index.html laduje nieistniejacy plik: js/' + f); return; }
  const code = fs.readFileSync(p, 'utf8');
  jsAll += code + '\n';
  try { new vm.Script(code, { filename: 'js/' + f }); ok('js/' + f + ' — skladnia OK (' + code.length + ' znakow)'); }
  catch (e) { fail('js/' + f + ' — blad skladni: ' + e.message); }
});
const notLinked = onDisk.filter(f => inHtml.indexOf(f) === -1);
if (notLinked.length) fail('pliki w js/ niezalaczone w index.html: ' + notLinked.join(', '));
else ok('wszystkie pliki js/ sa zalaczone w index.html (' + onDisk.length + ')');
if (/<script(?![^>]*\bsrc=)[^>]*>\s*\S/.test(html)) fail('index.html zawiera inline\'owy blok <script> — caly JS ma byc w js/');
else ok('brak inline\'owego JS w index.html');

/* 2. Referencje getElementById vs istniejace id (html + js) */
const ids = new Set();
[...html.matchAll(/\bid="([^"]+)"/g)].forEach(m => ids.add(m[1]));
[...jsAll.matchAll(/\.id='([^']+)'/g)].forEach(m => ids.add(m[1])); // id tworzone dynamicznie (np. updBar)
let missing = 0;
const refs = new Set([...(html + '\n' + jsAll).matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]));
refs.forEach(r => { if (!ids.has(r)) { fail('getElementById("' + r + '") — brak elementu z tym id'); missing++; } });
if (!missing) ok('wszystkie ' + refs.size + ' referencji getElementById wskazuje na istniejace id');

/* 3. Duplikaty id w markupie */
const seen = {}, dups = [];
[...html.matchAll(/\bid="([^"]+)"/g)].forEach(m => { seen[m[1]] = (seen[m[1]] || 0) + 1; });
Object.keys(seen).forEach(k => { if (seen[k] > 1) dups.push(k); });
if (dups.length) fail('zduplikowane id w markupie: ' + dups.join(', '));
else ok('brak zduplikowanych id (' + ids.size + ' unikalnych)');

/* 4. Klucze i18n uzywane przez it() istnieja w obu jezykach (js/islam-data.js) */
const i18n = fs.existsSync(path.join(jsDir, 'islam-data.js'))
  ? fs.readFileSync(path.join(jsDir, 'islam-data.js'), 'utf8') : '';
const isPl = i18n.match(/pl:\{appTitle:[\s\S]*?\},\n\s*en:\{/);
const isEn = i18n.match(/en:\{appTitle:[\s\S]*?\}\n\};/);
if (!isPl || !isEn) fail('nie udalo sie wyciagnac slownika IS z js/islam-data.js');
else {
  const keysOf = (s) => new Set([...s.matchAll(/([a-zA-Z0-9_]+):['"]/g)].map(m => m[1]));
  const pl = keysOf(isPl[0]), en = keysOf(isEn[0]);
  const onlyPl = [...pl].filter(k => !en.has(k));
  const onlyEn = [...en].filter(k => !pl.has(k));
  if (onlyPl.length || onlyEn.length) fail('klucze IS bez pary: pl-only=[' + onlyPl + '] en-only=[' + onlyEn + ']');
  else ok('slownik IS spojny PL/EN (' + pl.size + ' kluczy)');
}

/* ── manifest.webmanifest ── */
console.log('manifest.webmanifest');
let manifest = null;
try { manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8')); ok('poprawny JSON'); }
catch (e) { fail('blad JSON: ' + e.message); }
if (manifest) {
  (manifest.icons || []).forEach(ic => {
    const p = path.join(ROOT, ic.src);
    if (fs.existsSync(p)) ok('ikona istnieje: ' + ic.src);
    else fail('brak pliku ikony: ' + ic.src);
  });
  (manifest.shortcuts || []).forEach(s => {
    if (/^\.\/index\.html\?go=/.test(s.url)) ok('skrot "' + s.name + '" → ' + s.url);
    else fail('skrot "' + s.name + '" ma niepoprawny url: ' + s.url);
  });
  if (!manifest.shortcuts || !manifest.shortcuts.length) fail('brak skrotow w manifescie');
}

/* ── sw.js ── */
console.log('sw.js');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
try { new vm.Script(sw); ok('skladnia OK'); } catch (e) { fail('blad skladni: ' + e.message); }
const cacheM = sw.match(/CACHE\s*=\s*'([^']+)'/);
if (cacheM) ok('wersja cache: ' + cacheM[1]); else fail('nie znaleziono stalej CACHE');
const coreM = sw.match(/CORE\s*=\s*\[([\s\S]*?)\]/);
if (!coreM) fail('nie znaleziono listy CORE');
else {
  const files = [...coreM[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  files.forEach(f => {
    const rel = f.replace(/^\.\//, '').replace(/\/$/, 'index.html') || 'index.html';
    if (fs.existsSync(path.join(ROOT, rel))) ok('precache istnieje: ' + f);
    else fail('brak pliku precache: ' + f);
  });
  /* kazdy lokalny zasob z index.html musi byc w precache (PWA offline) */
  const notCached = assets.filter(a => files.indexOf('./' + a) === -1);
  if (notCached.length) fail('zasoby z index.html spoza precache SW: ' + notCached.join(', '));
  else ok('wszystkie zasoby z index.html sa w precache SW');
}

/* ── wynik ── */
console.log('');
if (errors) { console.error('PORAZKA: ' + errors + ' problem(ow)'); process.exit(1); }
console.log('WSZYSTKO OK');
