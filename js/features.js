/* Moja Droga — funkcje dodatkowe: przypomnienia, wake lock, kopiowanie,
   udostepnianie postepu, kopia zapasowa, strefa ryzyka, o aplikacji, tryb offline,
   skroty klawiaturowe i glebsze linki (?go=eng&topic=...) */
'use strict';

/* ══════════════════════════════
   JEDNO DZIENNE PRZYPOMNIENIE (zamiast kilku toastow)
   Priorytet: modlitwa <10 min > seria wygasajaca wieczorem.
   Maksymalnie jeden taki komunikat dziennie.
   ══════════════════════════════ */
var lastRemindKey='';
function dayReminderShown(kind){
  var k='rem_'+dKey(new Date())+'_'+kind;
  if(ST.milestones[k])return true;
  ST.milestones[k]=1;save();
  return false;
}
setInterval(function(){
  if(ST.sect!=='islam')return;
  var d=getPD(),ms=d.nextD-new Date();
  if(ms<=600000){
    var k=dKey(new Date())+'_'+d.next;
    if(lastRemindKey===k)return;
    lastRemindKey=k;
    if(!dayReminderShown('pray'))return;
    toast(it('remindPray')+' — '+PL_N[d.next][ST.lang]+' '+fmtT(d.nextD,d.city.tz),'ok');
    if(navigator.vibrate)navigator.vibrate([12,40,12]);
    return;
  }
  var dk=dKey(new Date());
  if(new Date().getHours()<20)return;
  if(ST.saverDay===dk||(ST.act[dk]||0)>=2)return;
  if(calcStreak()<=0)return;
  if(!dayReminderShown('streak'))return;
  ST.saverDay=dk;save();
  toast(it('streakWarn'),'err');
},30000);

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
    document.getElementById('shareLbl').textContent=tr('shareLbl')||'Udostępnij postęp';
    document.getElementById('shareBtn').textContent=tr('shareBtn')||'Udostępnij';
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
/* ── USTAWIENIA: fallback w HTML, zeby nigdy nie bylo surowych kluczy ── */
function tr(key){
  try{
    var v=it(key);
    if(v&&v!==key)return v;
  }catch(e){}
  return null;
}
function renderPrayerTrackerSafe(){try{renderPrayerTracker();}catch(e){}}
function syncSettingsExtras(){
  syncWake();syncBackup();syncAbout();
  var t=document.getElementById('setOvTitle');if(t)t.textContent=tr('settings')||'Ustawienia';
  var ah=document.getElementById('setAppH');if(ah)ah.textContent=tr('setAppH')||'Aplikacja';
  var dh=document.getElementById('setDataH');if(dh)dh.textContent=tr('setDataH')||'Dane i kopie';
  var ih=document.getElementById('setInfoH');if(ih)ih.textContent=tr('setInfoH')||'Informacje';
  var lbl=document.getElementById('aboutLbl');if(lbl)lbl.textContent=tr('aboutLbl')||'O aplikacji';
  var dl=document.getElementById('dangerLbl');if(dl)dl.textContent=tr('dangerLbl')||'Strefa ryzyka';
  var wl=document.getElementById('wakeLbl');if(wl)wl.textContent=tr('wakeLbl')||'Nie gaś ekranu w widoku modlitwy';
  var ul=document.getElementById('updateLbl');if(ul)ul.textContent=tr('updateLbl')||'Aktualizacja aplikacji';
  var un=document.getElementById('updateNote');if(un)un.textContent=tr('updateNote')||'';
  var ub=document.getElementById('updateBtn');if(ub&&!ub.disabled)ub.textContent=tr('updateBtn')||'Wymuś aktualizację';
  var rb=document.getElementById('resetBtn');if(rb&&!rb.dataset.ask)rb.textContent=tr('resetBtn')||'Wyczyść wszystkie dane';
}


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
  else if(e.key==='3'){var bw=document.getElementById('bnWed');if(bw)bw.click();}
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
      var be=document.getElementById('bnEng');
      if(be)be.click();
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

/* ══════════════════════════════
   WYMUŚ AKTUALIZACJĘ (ratunek, gdy przegladarka trzyma stara wersje z cache)
   Odrejestrowuje Service Workera, czysci cache i wraca z nowym adresem (?u=).
   ══════════════════════════════ */
function forceUpdate(){
  var b=document.getElementById('updateBtn');
  if(b){b.disabled=true;b.textContent=tr('updateWait')||'Aktualizuję…';}
  var jobs=[];
  try{
    if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations){
      jobs.push(navigator.serviceWorker.getRegistrations().then(function(rs){
        return Promise.all(rs.map(function(r){return r.unregister();}));
      }));
    }
  }catch(e){}
  try{
    if(window.caches&&window.caches.keys){
      jobs.push(window.caches.keys().then(function(ks){
        return Promise.all(ks.map(function(k){return window.caches.delete(k);}));
      }));
    }
  }catch(e){}
  Promise.all(jobs).catch(function(){}).then(function(){
    location.replace(location.href.split('?')[0]+'?u='+Date.now());
  });
}
(function(){
  var b=document.getElementById('updateBtn');
  if(b)b.addEventListener('click',forceUpdate);
})();
