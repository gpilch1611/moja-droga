/* Moja Droga — test w prawdziwej przegladarce (Chrome headless, CDP)
   Uruchomienie: node tools/browser-check.js
   Sprawdza na widoku telefonu (390x844): trzy zakladki, rozany motyw Wedding,
   liste przygotowan z zapisem, PL/EN, tryb ciemny, ustawienia, powrot po
   przeladowaniu oraz brak bledow w konsoli. Wymaga Chrome/Edge. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { launch, sleep, findChrome } = require('./cdp');

const ROOT = path.join(__dirname, '..');
const PORT = 8111;
/* Bez argumentu testujemy lokalna kopie; z adresem — wskazana strone (np. wersje na zywo). */
const REMOTE = process.argv[2] || '';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png' };
const PAGE = REMOTE || ('http://127.0.0.1:' + PORT + '/index.html');

let errors = 0;
const ok = m => console.log('  ✓ ' + m);
const fail = m => { errors++; console.error('  ✗ ' + m); };
const eq = (label, got, want) => { if (String(got) === String(want)) ok(label + ': ' + got); else fail(label + ': oczekiwano ' + want + ', jest ' + got); };

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
  const p = path.join(ROOT, rel);
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end('404'); return; }
  /* jak GitHub Pages: pliki cache'owane na 10 min — test ma byc realistyczny */
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'max-age=600' });
  res.end(fs.readFileSync(p));
});

(async () => {
  if (!findChrome()) { console.log('POMINIETO: brak Chrome/Edge (ustaw CHROME_PATH)'); process.exit(0); }
  if (!REMOTE) await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const browser = await launch();
  if (!browser) { console.error('Nie udalo sie uruchomic Chrome'); process.exit(2); }
  console.log('tools/browser-check.js — ' + browser.version);

  const p = await browser.page('about:blank');
  await p.mobile(390, 844);
  await p.goto(PAGE);
  await sleep(3500);

  console.log('· widok telefonu 390x844');
  eq('viewport', await p.ev('innerWidth+"x"+innerHeight'), '390x844');
  eq('przyciski dolnej nawigacji', await p.ev('document.querySelectorAll(".bnav-btn").length'), 3);
  eq('Islam startuje', await p.ev('document.getElementById("i-entryList").children.length>0'), 'true');

  console.log('· Wedding');
  await p.ev('document.getElementById("bnWed").click()'); await sleep(700);
  eq('aktywny widok', await p.ev('document.querySelector(".view.active").id'), 'vw-home');
  eq('tlo rozane', await p.ev('getComputedStyle(document.body).backgroundColor'), 'rgb(253, 240, 245)');
  eq('kartki (zdanie + tlumaczenie + wskazowka)', await p.ev('document.querySelectorAll("#w-scroll .wed-card,#w-scroll .wed-note,#w-scroll .wed-tip").length'), 3);
  eq('zdanie indonezyjskie', await p.ev('document.querySelector(".wed-phrase").textContent'), '💖 ' + (await p.ev('WED.phrase')) + ' 💖');
  eq('tlumaczenie polskie', await p.ev('document.querySelector("#w-scroll .wed-note .wed-tr").textContent'), await p.ev('WED.pl.trTxt'));
  eq('przyciski wymowy/kopiowania', await p.ev('document.querySelectorAll("#w-scroll .wed-btn").length'), 3);
  return phase2(p, browser);

async function phase2(p, browser) {
  console.log('· jezyk i motyw');
  await p.ev('document.getElementById("wLangBtn").click()'); await sleep(600);
  eq('po EN naglowek', await p.ev('document.querySelector(".wed-lbl").textContent'), 'Sentence to say (Indonesian)');
  eq('po EN tlumaczenie', await p.ev('document.querySelector("#w-scroll .wed-note .wed-tr").textContent'), await p.ev('WED.en.trTxt'));
  eq('po EN zdanie ID bez zmian', await p.ev('document.querySelector(".wed-phrase").textContent.indexOf("Saya terima nikah")>0'), 'true');
  await p.ev('document.getElementById("wLangBtn").click()'); await sleep(400);
  await p.ev('document.getElementById("wThemeBtn").click()'); await sleep(400);
  eq('ciemny motyw', await p.ev('getComputedStyle(document.body).backgroundColor'), 'rgb(30, 16, 24)');
  await p.ev('document.getElementById("wThemeBtn").click()'); await sleep(300);

  console.log('· ustawienia (z Wedding)');
  await p.ev('document.getElementById("wSettingsBtn").click()'); await sleep(500);
  eq('panel otwarty', await p.ev('document.getElementById("setOv").classList.contains("open")'), 'true');
  eq('przycisk wymuszenia aktualizacji', await p.ev('!!document.getElementById("updateBtn")'), 'true');
  await p.ev('document.getElementById("closeSetBtn").click()'); await sleep(300);

  console.log('· pozostale sekcje i powrot');
  await p.ev('document.getElementById("bnIslam").click()'); await sleep(500);
  eq('Islam', await p.ev('document.querySelector(".view.active").id'), 'vi-home');
  await p.ev('document.getElementById("bnEng").click()'); await sleep(500);
  eq('Angielski', await p.ev('document.querySelector(".view.active").id'), 've-home');
  await p.ev('document.getElementById("bnWed").click()'); await sleep(400);
  await p.goto(PAGE); await sleep(3500);
  eq('po przeladowaniu wraca na Wedding', await p.ev('document.querySelector(".view.active").id'), 'vw-home');
  eq('kartki po przeladowaniu', await p.ev('document.querySelectorAll("#w-scroll .wed-card,#w-scroll .wed-note,#w-scroll .wed-tip").length'), 3);

  const errs = p.errors();
  if (errs.length) errs.forEach(e => fail('blad konsoli: ' + e)); else ok('brak bledow w konsoli');

  await p.close();
  browser.kill();
  if (!REMOTE) server.close();
  console.log('');
  if (errors) { console.error('PORAZKA: ' + errors + ' problem(ow)'); process.exit(1); }
  console.log('WSZYSTKO OK');
}

})();
