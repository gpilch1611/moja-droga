/* Moja Droga — maly klient Chrome DevTools Protocol (bez dodatkowych zaleznosci)
   Uzywany przez tools/browser-check.js i tools/update-sim.js.
   Wymaga zainstalowanego Chrome/Edge; sciezke mozna podac w CHROME_PATH. */
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const sleep = ms => new Promise(r => setTimeout(r, ms));

function findChrome() {
  const cands = [];
  if (process.env.CHROME_PATH) cands.push(process.env.CHROME_PATH);
  if (process.platform === 'win32') {
    cands.push('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe');
  } else if (process.platform === 'darwin') {
    cands.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge');
  } else {
    cands.push('/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser');
  }
  return cands.find(p => { try { return fs.existsSync(p); } catch (e) { return false; } }) || null;
}

/* Szum, ktory nie jest bledem aplikacji (np. brak Service Workera na file://) */
const NOISE = /vibrate|favicon|manifest\.webmanifest|sw\.js|ServiceWorker|ERR_FAILED|origin 'null'/;

async function launch(opts) {
  const exe = findChrome();
  if (!exe) return null;
  const port = (opts && opts.port) || 9200 + Math.floor(Math.random() * 600);
  const profile = path.join(os.tmpdir(), 'md-chrome-' + Date.now() + '-' + port);
  const child = spawn(exe, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + port, '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
  let version = null;
  for (let i = 0; i < 80 && !version; i++) {
    try { version = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json(); } catch (e) { await sleep(250); }
  }
  if (!version) { kill(child); return null; }
  return {
    exe, port, version: version.Browser,
    async page(url) {
      const t = await (await fetch('http://127.0.0.1:' + port + '/json/new?' + encodeURIComponent(url), { method: 'PUT' })).json();
      return openTarget(t);
    },
    kill() { kill(child); }
  };
}

function kill(child) {
  try {
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else child.kill('SIGKILL');
  } catch (e) {}
}

async function openTarget(target) {
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pending = new Map(); const logs = [];
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      logs.push('EXCEPTION: ' + ((d.exception && d.exception.description) || d.text));
    } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      logs.push('console.error: ' + m.params.args.map(a => a.value !== undefined ? a.value : a.description).join(' '));
    } else if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
      logs.push('log.error: ' + m.params.entry.text + ' ' + (m.params.entry.url || ''));
    }
  });
  const send = (method, params) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: '(function(){try{return String(' + expr + ');}catch(e){return "THROW: "+e.message;}})()', returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : 'undefined';
  };
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
  return {
    send, ev, logs,
    /* faktyczne bledy aplikacji (bez znanego szumu) */
    errors() { return logs.filter(l => !NOISE.test(l)); },
    goto(url) { return send('Page.navigate', { url }); },
    mobile(w, h) { return send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 3, mobile: true }); },
    close() { try { ws.close(); } catch (e) {} }
  };
}

module.exports = { launch, sleep, findChrome };
