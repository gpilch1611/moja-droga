/* Moja Droga — symulacja wgrania nowej wersji na urzadzenie z zainstalowana PWA
   Uruchomienie: node tools/update-sim.js [rewizja]     (domyslnie HEAD~1)
   Sprawdza, ze po podmianie plikow na serwerze (deploy) urzadzenie samo pobiera
   nowa wersje: stara wersja z Service Workerem, potem "deploy", potem kontrola
   czy nowe elementy juz sa. Wymaga Chrome/Edge i repozytorium git. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const { launch, sleep, findChrome } = require('./cdp');

const ROOT = path.join(__dirname, '..');
const REV = process.argv[2] || 'HEAD~1';
const PORT = 8222;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png' };
const OLD_DIR = path.join(os.tmpdir(), 'md-update-sim');

let errors = 0;
const ok = m => console.log('  ✓ ' + m);
const fail = m => { errors++; console.error('  ✗ ' + m); };

let SERVE = OLD_DIR;
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
  const p = path.join(SERVE, rel);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end('404'); return; }
  /* GitHub Pages cache'uje pliki na 10 minut — to wlasnie testujemy */
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'max-age=600' });
  res.end(fs.readFileSync(p));
});

/* "deploy": podmiana plikow w katalogu serwera na aktualne z repozytorium */
function deploy() {
  const files = ['index.html', 'sw.js', 'manifest.webmanifest', 'css/style.css'];
  fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).forEach(f => files.push('js/' + f));
  files.forEach(f => fs.copyFileSync(path.join(ROOT, f), path.join(OLD_DIR, f)));
  return files.length;
}

function rmWorktree() {
  try { execFileSync('git', ['worktree', 'remove', '--force', OLD_DIR], { cwd: ROOT, stdio: 'ignore' }); } catch (e) {}
  try { execFileSync('git', ['worktree', 'prune'], { cwd: ROOT, stdio: 'ignore' }); } catch (e) {}
}

(async () => {
  if (!findChrome()) { console.log('POMINIETO: brak Chrome/Edge (ustaw CHROME_PATH)'); process.exit(0); }
  rmWorktree();
  try { execFileSync('git', ['worktree', 'add', '--detach', OLD_DIR, REV], { cwd: ROOT, stdio: 'ignore' }); }
  catch (e) { console.error('Nie udalo sie utworzyc worktree dla ' + REV); process.exit(2); }
  console.log('tools/update-sim.js — wersja odniesienia: ' + REV + ' → ' + OLD_DIR);

  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const browser = await launch();
  if (!browser) { console.error('Nie udalo sie uruchomic Chrome'); rmWorktree(); process.exit(2); }
  const PAGE = 'http://127.0.0.1:' + PORT + '/index.html';
  const p = await browser.page(PAGE);
  await p.mobile(390, 844);
  await sleep(4000);

  console.log('· wersja odniesienia (z Service Workerem)');
  const oldHasWed = await p.ev('!!document.getElementById("bnWed")');
  console.log('  · widzi zakladke Wedding: ' + oldHasWed);
  if (oldHasWed === 'true') fail('wersja odniesienia ' + REV + ' juz ma zakladke Wedding — podaj starsza rewizje');
  ok('Service Worker przejal kontrole: ' + await p.ev('!!navigator.serviceWorker.controller'));
  await p.goto(PAGE); await sleep(3000);
  ok('po przeladowaniu kontroler nadal aktywny: ' + await p.ev('!!navigator.serviceWorker.controller'));

  console.log('· deploy nowej wersji');
  console.log('  · podmieniono plikow: ' + deploy());
  await p.goto(PAGE); await sleep(5000);

  const wed = await p.ev('!!document.getElementById("bnWed")');
  if (wed === 'true') ok('urzadzenie samo pobralo nowa wersje (zakladka Wedding jest)');
  else fail('urzadzenie zostalo na starej wersji (brak zakladki Wedding)');

  await p.ev('document.getElementById("bnWed") && document.getElementById("bnWed").click()');
  await sleep(800);
  const kartki = await p.ev('document.querySelectorAll("#w-scroll .wed-card,#w-scroll .wed-note,#w-scroll .wed-tip").length');
  if (String(kartki) === '4') ok('nowa zakladka dziala (4 kartki)');
  else fail('nowa zakladka nie dziala (kartki: ' + kartki + ')');
  if (await p.ev('document.querySelector(".view.active").id') === 'vw-home') ok('aktywny widok Wedding');
  else fail('nie udalo sie przejsc do widoku Wedding');

  const errs = p.errors();
  if (errs.length) errs.forEach(e => fail('blad konsoli: ' + e)); else ok('brak bledow w konsoli');

  await p.close();
  browser.kill();
  server.close();
  rmWorktree();
  console.log('');
  if (errors) { console.error('PORAZKA: ' + errors + ' problem(ow)'); process.exit(1); }
  console.log('WSZYSTKO OK');
})();
