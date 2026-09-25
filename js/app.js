/* Moja Droga — inicjalizacja aplikacji + rejestracja Service Workera (PWA) */
'use strict';

/* ══════════════════════════════
   INIT
══════════════════════════════ */
(function init(){
  /* globalny handler bledow — toast max raz na 10 s */
  var lastErrToast=0;
  window.addEventListener('error',function(){
    var now=Date.now();
    if(now-lastErrToast<10000)return;
    lastErrToast=now;toast(it('errGeneric'));
  });
  document.documentElement.setAttribute('lang',ST.lang);
  applySect();
  applyLangChrome();
  if(ST.sect==='eng'){
    showV('ve-home');
    renderEngHome();
  } else if(ST.sect==='wed'){
    showV('vw-home');
    renderWedding();
  } else {
    showV('vi-home');
    renderIslam();
    refreshP();
  }
  /* odswiezanie wyrownane do pelnej minuty + natychmiast po powrocie do karty */
  (function tick(){if(ST.sect==='islam')refreshP();setTimeout(tick,60000-(Date.now()%60000)+60);})();
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&ST.sect==='islam')refreshP();});
  /* skroty z manifestu / linki ?go= */
  try{
    var go=new URLSearchParams(location.search).get('go');
    if(go==='eng')document.getElementById('bnEng').click();
    else if(go==='wed')document.getElementById('bnWed').click();
    else if(go==='prayer')openIslamPrayer();
    else if(go==='prayers')document.getElementById('bnIslam').click();
  }catch(e){}
  /* podpowiedz ustawien (wiggle) przy pierwszym uruchomieniu */
  if(!ST.seenWiggle){
    setTimeout(function(){
      document.getElementById('iSettingsBtn').classList.add('wig');
      document.getElementById('eSettingsBtn').classList.add('wig');
      document.getElementById('wSettingsBtn').classList.add('wig');
    },2000);
  }
})();

/* ── PWA: rejestracja Service Workera + powiadomienie o aktualizacji ── */
function showUpdateBar(nw){
  if(document.getElementById('updBar'))return;
  var pl=(document.documentElement.lang||'pl')!=='en';
  var bar=document.createElement('div');bar.id='updBar';bar.className='upd-bar';bar.setAttribute('role','status');
  var sp=document.createElement('span');sp.textContent=pl?'Dostępna nowa wersja':'New version available';
  var btn=document.createElement('button');btn.type='button';btn.textContent=pl?'Odśwież':'Refresh';
  btn.addEventListener('click',function(){nw.postMessage('SKIP_WAITING');});
  bar.appendChild(sp);bar.appendChild(btn);document.body.appendChild(bar);
  setTimeout(function(){bar.classList.add('show');},30);
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      reg.update();
      setInterval(function () { reg.update(); }, 60 * 60 * 1000);
      reg.addEventListener('updatefound', function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', function () {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBar(nw);
          }
        });
      });
    });
    var reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!reloading) { reloading = true; location.reload(); }
    });
  });
}
