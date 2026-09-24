/* Moja Droga — funkcje dodatkowe: przypomnienia, wake lock, kopiowanie,
   udostepnianie postepu, kopia zapasowa, strefa ryzyka, o aplikacji, tryb offline,
   skroty klawiaturowe i glebsze linki (?go=eng&topic=...) */
'use strict';

/* ══════════════════════════════
   PRZYPOMNIENIA (modlitwa + seria)
══════════════════════════════ */
var lastRemindKey='';
setInterval(function(){
  if(ST.sect!=='islam')return;
  var d=getPD(),ms=d.nextD-new Date();
  if(ms>600000)return;
  var k=dKey(new Date())+'_'+d.next;
  if(lastRemindKey===k)return;
  lastRemindKey=k;
  toast(it('remindPray')+' — '+PL_N[d.next][ST.lang]+' '+fmtT(d.nextD,d.city.tz),'ok');
  if(navigator.vibrate)navigator.vibrate([12,40,12]);
},20000);
/* przypomnienie o serii wieczorem, gdy brakuje aktywnosci */
setInterval(function(){
  var k=dKey(new Date());
  if(new Date().getHours()<20)return;
  if(ST.saverDay===k||(ST.act[k]||0)>=2)return;
  if(calcStreak()<=0)return;
  ST.saverDay=k;save();
  toast(it('streakWarn'),'err');
},300000);

/* ══════════════════════════════
   WAKE LOCK (widok modlitwy krok po kroku)
══════════════════════════════ */
var wlSentinel=null;
function wlApply(){
  if(!('wakeLock' in navigator))return;
  var want=!!ST.wakeLock&&currentView()==='vi-prayer'&&!document.hidden;
  if(want&&!wlSentinel){
    navigator.wakeLock.request('screen').then(function(s){
      wlSentinel=s;
      s.addEventListener('release',function(){wlSentinel=null;});
    }).catch(function(){});
  }else if(!want&&wlSentinel){
    try{wlSentinel.release();}catch(e){}
    wlSentinel=null;
  }
}
function syncWake(){
  var b=document.getElementById('wakeBtn');if(!b)return;
  b.parentElement.style.display=('wakeLock' in navigator)?'':'none';
  b.textContent=ST.wakeLock?it('wakeOn'):it('wakeOff');
  b.setAttribute('aria-pressed',ST.wakeLock?'true':'false');
}
document.getElementById('wakeBtn').addEventListener('click',function(){
  ST.wakeLock=!ST.wakeLock;save();syncWake();wlApply();
  toast(ST.wakeLock?it('wakeOn'):it('wakeOff'));
});

/* ══════════════════════════════
   KOPIOWANIE (dlugi dotyk na tekscie)
══════════════════════════════ */
function copyTxt(s){
  s=String(s||'').trim();if(!s)return;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(s).then(function(){toast(it('copied'),'ok');},function(){fallbackCopy(s);});
  }else fallbackCopy(s);
}
function fallbackCopy(s){
  try{
    var ta=document.createElement('textarea');ta.value=s;ta.setAttribute('readonly','');
    ta.style.position='fixed';ta.style.top='-1000px';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
    toast(it('copied'),'ok');
  }catch(e){}
}
(function(){
  var t=null;
  function start(e){
    var n=e.target&&e.target.closest?e.target.closest('.letter-ar,.cmp-ex,.id-form,.li-meaning,.line-item'):null;
    if(!n)return;
    clearTimeout(t);
    t=setTimeout(function(){
      copyTxt(n.textContent);
      if(navigator.vibrate)navigator.vibrate(12);
      t=null;
    },600);
  }
  function cancel(){clearTimeout(t);t=null;}
  document.addEventListener('touchstart',start,{passive:true});
  document.addEventListener('touchend',cancel,{passive:true});
  document.addEventListener('touchmove',cancel,{passive:true});
  document.addEventListener('touchcancel',cancel,{passive:true});
})();

/* ══════════════════════════════
   UDOSTEPNIANIE POSTEPU
══════════════════════════════ */
if(navigator.share){
  var shareRow=document.getElementById('shareRow');
  if(shareRow){
    shareRow.style.display='';
    document.getElementById('shareLbl').textContent=featureIt('shareLbl','Udostępnij postęp');
    document.getElementById('shareBtn').textContent=featureIt('shareBtn','Udostępnij');
    document.getElementById('shareBtn').addEventListener('click',function(){
      var txt=it('shareText').replace('{st}',calcStreak()).replace('{done}',totalDone());
      navigator.share({title:it('appTitle'),text:txt}).catch(function(){});
    });
  }
}

document.addEventListener('visibilitychange',wlApply);
document.addEventListener('click',function(){setTimeout(wlApply,80);});

/* ══════════════════════════════
   KOPIA ZAPASOWA / STREFA RYZYKA / O APLIKACJI
══════════════════════════════ */
var APP_VER='';
function syncBackup(){
  var el=document.getElementById('backupNote');if(!el)return;
  el.textContent='';el.style.color='';
  if(!ST.lastExport){el.textContent=it('backupNever');return;}
  var days=Math.floor((Date.now()-ST.lastExport)/86400000);
  el.textContent=it('backupDays').replace('{d}',days);
  if(days>=30){el.textContent+=' · '+it('backupAsk');el.style.color='#B4452F';}
}
/* eksport z js/islam.js zapisuje date kopii (dodatkowy listener) */
document.getElementById('exportBtn').addEventListener('click',function(){
  ST.lastExport=Date.now();save();syncBackup();
});
function syncAbout(){
  var el=document.getElementById('aboutNote');if(!el)return;
  el.innerHTML='';
  var v=document.createElement('div');
  v.textContent=it('aboutVer')+': v'+(APP_VER||'—');
  var c=document.createElement('div');
  c.textContent=it('aboutContent').replace('{n}',ENTRIES.length).replace('{t}',TOPICS.length);
  var a=document.createElement('a');
  a.href='https://github.com/gpilch1611/moja-droga';
  a.target='_blank';a.rel='noopener';a.textContent=it('aboutRepo');
  a.className='about-link';
  el.appendChild(v);el.appendChild(c);el.appendChild(a);
}
fetch('sw.js').then(function(r){return r.text();}).then(function(t){
  var m=t.match(/CACHE\s*=\s*'([^']+)'/);
  if(m)APP_VER=m[1].replace('moja-droga-','');
  syncAbout();
}).catch(function(){syncAbout();});
document.getElementById('resetBtn').addEventListener('click',function(){
  var b=this;
  if(!b.dataset.ask){
    b.dataset.ask='1';b.textContent=it('resetSure');b.classList.add('ask');
    setTimeout(function(){
      if(b.dataset.ask){delete b.dataset.ask;b.textContent=it('resetBtn');b.classList.remove('ask');}
    },3500);
    return;
  }
  delete b.dataset.ask;
  try{localStorage.removeItem(LS_KEY);localStorage.removeItem(LS_LEGACY);}catch(e){}
  toast(it('resetDone'),'ok');
  setTimeout(function(){location.reload();},700);
});
/* synchronizacja nowych sekcji ustawien przy kazdym otwarciu overlayu */
function syncSettingsExtras(){
  syncWake();syncBackup();syncAbout();
  var lbl=document.getElementById('aboutLbl');if(lbl)lbl.textContent=featureIt('aboutLbl','O aplikacji');
  var dl=document.getElementById('dangerLbl');if(dl)dl.textContent=featureIt('dangerLbl','Strefa ryzyka');
  var wl=document.getElementById('wakeLbl');if(wl)wl.textContent=featureIt('wakeLbl','Nie gaś ekranu w widoku modlitwy');
  var rb=document.getElementById('resetBtn');if(rb&&!rb.dataset.ask)rb.textContent=it('resetBtn');
}
document.getElementById('iSettingsBtn').addEventListener('click',syncSettingsExtras);
document.getElementById('eSettingsBtn').addEventListener('click',syncSettingsExtras);

/* ══════════════════════════════
   TRYB OFFLINE
══════════════════════════════ */
function syncOffline(){
  var b=document.getElementById('offBar');if(!b)return;
  b.textContent=it('offlineMsg');
  b.hidden=navigator.onLine!==false;
}
window.addEventListener('online',syncOffline);
window.addEventListener('offline',syncOffline);
syncOffline();



/* ══════════════════════════════
   SKROTY KLAWIATUROWE (desktop)
══════════════════════════════ */
document.addEventListener('keydown',function(e){
  if(e.metaKey||e.ctrlKey||e.altKey)return;
  var t=e.target;
  if(t&&/^(input|textarea|select)$/i.test(t.tagName))return;
  if(e.key==='1'){document.getElementById('bnIslam').click();}
  else if(e.key==='2'){document.getElementById('bnEng').click();}
  else if(e.key==='ArrowLeft'){
    var b=document.querySelector('.view.active .back-btn');
    if(b){e.preventDefault();b.click();}
  }
});

/* ══════════════════════════════
   GLEBSZE LINKI: ?go=eng&topic=<id>&lv=b1|b2
══════════════════════════════ */
(function(){
  try{
    var q=new URLSearchParams(location.search),tp=q.get('topic');
    if(!tp)return;
    var lv=String(q.get('lv')||'').toLowerCase();
    if(lv==='b1'||lv==='b2'){ST.engLevel=lv;save();}
    setTimeout(function(){
      document.getElementById('bnEng').click();
      var found=null;
      TOPICS.forEach(function(t){if(t.id===tp)found=t;});
      if(found&&typeof openEngTopic==='function')openEngTopic(found.id);
    },80);
  }catch(e){}
})();

/* ══════════════════════════════
   SYNCHRONIZACJA CYKLICZNA
══════════════════════════════ */
setInterval(function(){wlApply();},30000);
