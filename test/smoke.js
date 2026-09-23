/* Moja Droga — test dymny (smoke test)
   Uruchomienie: node test/smoke.js
   Sprawdza: skladnie blokow <script>, kompletnosc referencji getElementById,
   duplikaty id, poprawnosc manifestu i plikow precache Service Workera. */
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

/* 1. Skladnia inline'owych blokow <script> */
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
if (blocks.length < 2) fail('oczekiwano co najmniej 2 blokow <script>, znaleziono ' + blocks.length);
blocks.forEach((b, i) => {
  try { new vm.Script(b[1]); ok('blok <script> #' + (i + 1) + ' — skladnia OK (' + b[1].length + ' znakow)'); }
  catch (e) { fail('blok <script> #' + (i + 1) + ' — blad skladni: ' + e.message); }
});

/* 2. Referencje getElementById vs istniejace id */
const ids = new Set();
[...html.matchAll(/\bid="([^"]+)"/g)].forEach(m => ids.add(m[1]));
[...html.matchAll(/\.id='([^']+)'/g)].forEach(m => ids.add(m[1])); // id tworzone dynamicznie (np. updBar)
let missing = 0;
const refs = new Set([...html.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]));
refs.forEach(r => { if (!ids.has(r)) { fail('getElementById("' + r + '") — brak elementu z tym id'); missing++; } });
if (!missing) ok('wszystkie ' + refs.size + ' referencji getElementById wskazuje na istniejace id');

/* 3. Duplikaty id w markupie */
const seen = {}, dups = [];
[...html.matchAll(/\bid="([^"]+)"/g)].forEach(m => { seen[m[1]] = (seen[m[1]] || 0) + 1; });
Object.keys(seen).forEach(k => { if (seen[k] > 1) dups.push(k); });
if (dups.length) fail('zduplikowane id w markupie: ' + dups.join(', '));
else ok('brak zduplikowanych id (' + ids.size + ' unikalnych)');

/* 4. Klucze i18n uzywane przez it()/et() istnieja w obu jezykach */
const isPl = html.match(/pl:\{appTitle:[\s\S]*?\},\n\s*en:\{/);
const isEn = html.match(/en:\{appTitle:[\s\S]*?\}\n\};/);
if (!isPl || !isEn) fail('nie udalo sie wyciagnac slownika IS');
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
}

/* ── wynik ── */
console.log('');
if (errors) { console.error('PORAZKA: ' + errors + ' problem(ow)'); process.exit(1); }
console.log('WSZYSTKO OK');
