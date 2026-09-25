/* Moja Droga — inicjalizacja aplikacji + rejestracja Service Workera (PWA) */
'use strict';

/* ══════════════════════════════
   INIT
══════════════════════════════ */
/* Bezpieczne uruchomienie: gdy HTML pochodzi ze starszej wersji (cache HTTP),
   nowe widoki moga nie istniec — aplikacja i tak musi dzialac. */
function bootView(){
  var v=ST.sect==='wed'?'vw-home':(ST.sect==='eng'?'ve-home':'vi-home');
  if(!document.getElementById(v))v=document.getElementById('vi-home')?'vi-home':'ve-home';
  if(!document.getElementById(v))return;
  showV(v);
  try{
    if(v==='vw-home'){
      if(typeof renderWedding==='function')renderWedding();
    }else if(v==='ve-home'){
      if(typeof renderEngHome==='function')renderEngHome();
    }else{
      if(typeof renderIslam==='function')renderIslam();
      if(typeof refreshP==='function')refreshP();
    }
  }catch(e){}
}
/* Klik w tab = powrot na poczatek sekcji (widok glowny + scroll na gore). */
function navGo(sect,view,fn){
  var b=document.getElementById(sect==='islam'?'bnIslam':(sect==='eng'?'bnEng':'bnWed'));
  if(!b)return; /* starszy HTML bez tego przycisku */
  b.addEventListener('click',function(){
    ST.sect=sect;save();
    try{applySect();}catch(e){}
    if(!document.getElementById(view))return;
    delete VIEW_SCROLL[view];
    showV(view);
    var sc=viewScroller(view);if(sc)sc.scrollTop=0;
    try{fn();}catch(e){}
  });
}
function wireNav(){
  navGo('islam','vi-home',function(){renderIslam();refreshP();});
  navGo('eng','ve-home',function(){renderEngHome();});
  navGo('wed','vw-home',function(){renderWedding();});
}
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
  wireNav();
  bootView();
  /* odswiezanie wyrownane do pelnej minuty + natychmiast po powrocie do karty */
  (function tick(){if(ST.sect==='islam')refreshP();setTimeout(tick,60000-(Date.now()%60000)+60);})();
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&ST.sect==='islam')refreshP();});
  /* skroty z manifestu / linki ?go= */
  try{
    var go=new URLSearchParams(location.search).get('go');
    var jump={'eng':'bnEng','wed':'bnWed','prayers':'bnIslam'};
    if(go&&jump[go]){
      var jb=document.getElementById(jump[go]);
      if(jb)jb.click();
    }else if(go==='prayer'&&typeof openIslamPrayer==='function')openIslamPrayer();
  }catch(e){}
  /* podpowiedz ustawien (wiggle) przy pierwszym uruchomieniu */
  if(!ST.seenWiggle){
    setTimeout(function(){
      ['iSettingsBtn','eSettingsBtn','wSettingsBtn'].forEach(function(id){
        var b=document.getElementById(id);if(b)b.classList.add('wig');
      });
    },2000);
  }
})();

/* ── PWA: rejestracja Service Workera + automatyczna aktualizacja ── */
/* nw = nowy worker (moze byc null, gdy nowy SW juz przejal kontrole) */
function showUpdateBar(nw){
  if(document.getElementById('updBar'))return;
  var pl=(document.documentElement.lang||'pl')!=='en';
  var bar=document.createElement('div');bar.id='updBar';bar.className='upd-bar';bar.setAttribute('role','status');
  var sp=document.createElement('span');sp.textContent=pl?'Dostępna nowa wersja':'New version available';
  var btn=document.createElement('button');btn.type='button';btn.textContent=pl?'Odśwież':'Refresh';
  btn.addEventListener('click',function(){
    if(nw&&nw.postMessage)nw.postMessage('SKIP_WAITING');
    setTimeout(function(){location.reload();},120);
  });
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
    }).catch(function(){});
    /* Nowa wersja przejmuje kontrole (sw.js: skipWaiting) → odswiezamy raz.
       Gdy uzytkownik ma otwarty panel (ustawienia/profil/miasto), nie
       przerywamy pracy — pokazujemy pasek z przyciskiem. */
    var reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (reloading) return;
      reloading = true;
      if (document.querySelector('.overlay.open')) showUpdateBar(null);
      else location.reload();
    });
  });
}
