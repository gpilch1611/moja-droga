/* Moja Droga — podbicie wersji Service Workera + test dymny
   Uruchomienie: node tools/bump-sw.js
   Zwieksza numer w stalej CACHE w sw.js (moja-droga-vN -> vN+1), zeby
   przegladarki pobraly swieze pliki, a nastepnie uruchamia test/smoke.js. */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SW = path.join(ROOT, 'sw.js');

const src = fs.readFileSync(SW, 'utf8');
const m = src.match(/CACHE\s*=\s*'moja-droga-v(\d+)'/);
if (!m) {
  console.error('  ✗ nie znaleziono stalej CACHE w sw.js');
  process.exit(1);
}
const next = Number(m[1]) + 1;
fs.writeFileSync(SW, src.replace(m[0], "CACHE = 'moja-droga-v" + next + "'"), 'utf8');
console.log('  ✓ wersja cache: v' + m[1] + ' → v' + next);

execFileSync(process.execPath, [path.join(ROOT, 'test', 'smoke.js')], { stdio: 'inherit' });
