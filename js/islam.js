/* Moja Droga — sekcja Islam: silnik godzin modlitw, render widokow, obsluga zdarzen */
'use strict';

/* ── PRAYER ENGINE ── */
function doy(y,m,d){return Math.round((Date.UTC(y,m-1,d)-Date.UTC(y,0,1))/86400000)+1;}
function solCalc(y,m,d){var g=(2*Math.PI/365)*(doy(y,m,d)-1);return{eq:229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g)),dc:0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g)};}
function HA(lat,dc,alt){return Math.acos(Math.max(-1,Math.min(1,(Math.sin(alt*Math.PI/180)-Math.sin(lat*Math.PI/180)*Math.sin(dc))/(Math.cos(lat*Math.PI/180)*Math.cos(dc)))))*180/Math.PI/15;}
function compUTC(y,m,d,lat,lon){var sc=solCalc(y,m,d),noon=12-lon/15-sc.eq/60,aAlt=Math.atan(1/(1+Math.tan(Math.abs(lat*Math.PI/180-sc.dc))))*180/Math.PI;return{fajr:noon-HA(lat,sc.dc,-18),sunrise:noon-HA(lat,sc.dc,-0.833),dhuhr:noon,asr:noon+HA(lat,sc.dc,aAlt),maghrib:noon+HA(lat,sc.dc,-0.833),isha:noon+HA(lat,sc.dc,-17)};}
function lp(tz){var p=new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).split('-');return{y:+p[0],m:+p[1],d:+p[2]};}
function hToD(y,m,d,h){return new Date(Date.UTC(y,m-1,d)+h*3600000);}
function fmtT(date,tz){return new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',hour12:false}).format(date);}
function getPD(){
  var city=getCity(),p=lp(city.tz),raw=compUTC(p.y,p.m,p.d,city.lat,city.lon),times={};
  ['fajr','sunrise','dhuhr','asr','maghrib','isha'].forEach(function(k){times[k]=hToD(p.y,p.m,p.d,raw[k]);});
  var tmr=new Date(Date.UTC(p.y,p.m-1,p.d)+86400000),tp=new Intl.DateTimeFormat('en-CA',{timeZone:city.tz,year:'numeric',month:'2-digit',day:'2-digit'}).format(tmr).split('-'),r2=compUTC(+tp[0],+tp[1],+tp[2],city.lat,city.lon);
  times.fajrTmr=hToD(+tp[0],+tp[1],+tp[2],r2.fajr);
  var now=new Date(),cur=null;
  if(now>=times.fajr&&now<times.sunrise)cur='fajr';else if(now>=times.dhuhr&&now<times.asr)cur='dhuhr';else if(now>=times.asr&&now<times.maghrib)cur='asr';else if(now>=times.maghrib&&now<times.isha)cur='maghrib';else if(now>=times.isha)cur='isha';
  var prayers=['fajr','dhuhr','asr','maghrib','isha'],next=null,nextD=times.fajrTmr;
  for(var j=0;j<prayers.length;j++){if(times[prayers[j]]>now){next=prayers[j];nextD=times[prayers[j]];break;}}
  if(!next){next='fajr';nextD=times.fajrTmr;}
  return{city:city,times:times,cur:cur,next:next,nextD:nextD};
}
function renderPW(){
  var d=getPD();
  document.getElementById('pwCityBtn').textContent=d.city.name;
  document.getElementById('pwMethod').textContent=it('pwMethod');
  var grid=document.getElementById('pwGrid');
  /* luk slonca: kontener wstawiany raz, przed siatka godzin */
  var sun=document.getElementById('pwSun');
  if(!sun){
    sun=document.createElement('div');sun.className='sun-arc';sun.id='pwSun';sun.setAttribute('aria-hidden','true');
    grid.parentNode.insertBefore(sun,grid);
  }
  renderSunArc(sun,d);
  grid.innerHTML='';
  ['fajr','sunrise','dhuhr','asr','maghrib','isha'].forEach(function(k){
    var el=document.createElement('div');el.className='pw-cell'+(k!=='sunrise'&&k===d.cur?' on':'')+(k===d.next?' next':'')+(k==='sunrise'?' dim':'');
    el.innerHTML='<div class="pw-l">'+PL_N[k][ST.lang]+'</div><div class="pw-v">'+fmtT(d.times[k],d.city.tz)+'</div>';
    grid.appendChild(el);
  });
  var pw=document.querySelector('.pw');
  if(pw)pw.classList.toggle('soon',d.nextD-new Date()<600000);
  return d;
}
/* luk slonca: kropka wedruje od wschodu do zachodu, po zmroku gasnie na krancu */
function renderSunArc(box,d){
  var now=new Date(),ms=(d.times.maghrib-d.times.sunrise),t=ms>0?(now-d.times.sunrise)/ms:.5,night=false;
  if(!isFinite(t))t=.5;
  if(t<0){t=0;night=true;}else if(t>1){t=1;night=true;}
  var x=240-220*Math.cos(Math.PI*t),y=22-20*Math.sin(Math.PI*t);
  box.innerHTML='<svg viewBox="0 0 480 26" aria-hidden="true">'+
    '<path class="arc" d="M20 22 A220 20 0 0 1 460 22"/>'+
    '<line class="horizon" x1="0" y1="22" x2="480" y2="22"/>'+
    '<circle class="sun'+(night?' night':'')+'" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4"/></svg>';
}
function miniH(d){
  var c=d.cur?PL_N[d.cur][ST.lang]:it('between'),ms=Math.max(0,d.nextD-new Date()),mn=Math.floor(ms/60000),cd;
  if(ms<3600000){ /* ponizej godziny: odliczanie z sekundami */
    var ss=Math.ceil(ms/1000);
    cd='<span class="cd-tick">'+String(Math.floor(ss/60)).padStart(2,'0')+':'+String(ss%60).padStart(2,'0')+'</span>';
  }else{
    var hh=Math.floor(mn/60),mm=mn%60;cd=hh+' h '+mm+' min';
  }
  return it('now')+': <b>'+c+'</b> · '+it('next')+': <b>'+PL_N[d.next][ST.lang]+' '+fmtT(d.nextD,d.city.tz)+'</b> · '+it('inTime')+' '+cd;
}
function refreshP(){var d=renderPW(),h=miniH(d);['i-mbHome','i-mbList','i-mbLetters','i-mbPrayer'].forEach(function(id){var el=document.getElementById(id);if(el)el.innerHTML=h;});}
/* odswiezanie co sekunde: w ostatniej godzinie tylko mini-bar (bez migania siatki) */
var pdCache=null,pdCacheT=0;
function pdCached(){ /* cache wyliczen (Intl/trygonometria) na 30 s */
  var n=Date.now();
  if(!pdCache||n-pdCacheT>30000||pdCache.nextD-n<0){pdCache=getPD();pdCacheT=n;}
  return pdCache;
}
(function(){
  setInterval(function(){
    if(ST.sect!=='islam')return;
    var d=pdCached(),ms=d.nextD-Date.now();
    if(ms>=3600000)return; /* pelny refresh robi tick z js/app.js raz na minute */
    var h=miniH(d);
    ['i-mbHome','i-mbList','i-mbLetters','i-mbPrayer'].forEach(function(id){var el=document.getElementById(id);if(el)el.innerHTML=h;});
  },1000);
})();

/* ── ISLAM RENDER MENU ── */
function renderIslam(){
  syncLangBtns();
  document.getElementById('i-appTitle').textContent=it('appTitle');
  document.getElementById('i-appSub').textContent=it('appSub');
  document.getElementById('i-listHdr').textContent=it('listHeader');
  applyScale();
  refreshP();
  var list=document.getElementById('i-entryList');list.innerHTML='';
  var ordered=ST.sortReversed?ENTRIES.slice().reverse():ENTRIES.slice();
  ordered.forEach(function(entry){
    var row=document.createElement('div');row.className='entry-row';
    var num=document.createElement('span');num.className='e-num';num.textContent=canonNum(entry.id);
    var body=document.createElement('div');body.className='e-body';
    var tt=document.createElement('div');tt.className='e-title';tt.textContent=entry.title[ST.lang];
    var ss=document.createElement('div');ss.className='e-sub';ss.textContent=entry.sub[ST.lang];
    body.appendChild(tt);body.appendChild(ss);
    var arr=document.createElement('span');arr.className='e-arr';arr.textContent='›';
    row.appendChild(num);row.appendChild(body);row.appendChild(arr);
    row.addEventListener('click',function(){openIslamEntry(entry);});
    list.appendChild(row);
  });
  updateStreakChip();
}
function openIslamEntry(e){touchAct();if(e.type==='list')openIslamList(e);else if(e.type==='letters')openIslamLetters();else if(e.type==='prayer')openIslamPrayer();}
function openIslamList(entry){
  curIslamEntry=entry;
  document.getElementById('i-listTopTtl').textContent=entry.title[ST.lang];
  document.getElementById('i-listTitle').textContent=entry.title[ST.lang];
  document.getElementById('i-listSub').textContent=entry.sub[ST.lang];
  var body=document.getElementById('i-listBody');body.innerHTML='';
  entry.lines.forEach(function(line,i){
    var row=document.createElement('div');row.className='line-item';
    if(typeof line==='string'&&line.slice(-1)===':'){row.classList.add('li-hdr');row.textContent=line;}
    else if(typeof line!=='string'&&line.pl!==undefined&&String(line.pl).slice(-1)===':'){row.classList.add('li-hdr');row.textContent=rl(line);}
    else if(line&&line.phrase!==undefined){
      var idx=document.createElement('span');idx.className='li-num';idx.textContent=(i+1)+'.';
      row.appendChild(idx);row.appendChild(document.createTextNode(line.phrase));
      var m=document.createElement('div');m.className='li-meaning';m.textContent=line.note[ST.lang];
      row.appendChild(document.createElement('br'));row.appendChild(m);
    }else{
      var idx2=document.createElement('span');idx2.className='li-num';idx2.textContent=(i+1)+'.';
      row.appendChild(idx2);row.appendChild(document.createTextNode(rl(line)));
    }
    body.appendChild(row);
  });
  showV('vi-list','fwd');
}
function openIslamLetters(){
  curIslamEntry=findEntry('alfabet');
  var entry=curIslamEntry;
  document.getElementById('i-lettersTopTtl').textContent=entry.title[ST.lang];
  document.getElementById('i-lettersTitle').textContent=entry.title[ST.lang];
  document.getElementById('i-lettersSub').textContent=entry.sub[ST.lang];
  var body=document.getElementById('i-lettersBody');body.innerHTML='';
  arLetters.forEach(function(lt){
    var row=document.createElement('div');row.className='letter-row';
    var ar=document.createElement('div');ar.className='letter-ar';ar.setAttribute('dir','rtl');ar.setAttribute('lang','ar');ar.textContent=lt.ar;
    var lat=document.createElement('div');lat.className='letter-lat';lat.textContent=lt.l[ST.lang];
    row.appendChild(ar);row.appendChild(lat);body.appendChild(row);
  });
  showV('vi-letters','fwd');
}
function openIslamPrayer(){
  var pe=findEntry('modlitwa');
  curIslamEntry=pe;
  document.getElementById('i-prayerTopTtl').textContent=pe.title[ST.lang];
  ['pv2','pv3','pv4'].forEach(function(id){
    var v=id.replace('pv','');
    document.getElementById(id).textContent=it('pv'+v);
    document.getElementById(id).classList.toggle('on',ST.pvVer===v);
  });
  ptUndoAsk=false;clearTimeout(ptUndoT);
  renderPrayerTracker();
  renderPrayerBody();
  showV('vi-prayer','fwd');
}
function renderPrayerBody(){
  var scroll=document.getElementById('i-prayerScroll');scroll.innerHTML='';
  var pb=document.getElementById('pbarPrayer');if(pb)pb.style.width='0%';
  psets[ST.pvVer].forEach(function(sec){
    var block=document.createElement('div');block.className='sec-block'+(sec.hl?' hl':'');
    var hdr=document.createElement('div');hdr.className='sec-head';hdr.textContent=ST.lang==='pl'?sec.lp:sec.le;
    block.appendChild(hdr);
    sec.lines.forEach(function(line){var row=document.createElement('div');row.className='line-item';row.textContent=rl(line);block.appendChild(row);});
    scroll.appendChild(block);
  });
}

/* ── ISLAM EVENTS ── */
document.getElementById('iLangBtn').addEventListener('click',toggleLang);
document.getElementById('iBackList').addEventListener('click',function(){showV('vi-home','back');renderIslam();});
document.getElementById('iBackLetters').addEventListener('click',function(){showV('vi-home','back');renderIslam();});
document.getElementById('iBackPrayer').addEventListener('click',function(){showV('vi-home','back');renderIslam();});
['pv2','pv3','pv4'].forEach(function(id){document.getElementById(id).addEventListener('click',function(){ST.pvVer=id.replace('pv','');save();openIslamPrayer();});});
document.getElementById('ptInc').addEventListener('click',function(){ptAddOne();});
document.getElementById('ptDec').addEventListener('click',function(){ptRemoveOne();});
document.getElementById('iSortBtn').addEventListener('click',function(){ST.sortReversed=!ST.sortReversed;save();renderIslam();});
document.getElementById('iThemeBtn').addEventListener('click',function(){ST.theme=ST.theme==='dark'?'light':'dark';save();applyTheme();});
document.querySelectorAll('#iSzPill .sz-btn').forEach(function(b){b.addEventListener('click',function(){ST.scale=b.dataset.sc;save();applyScale();});});
/* city */
document.getElementById('pwCityBtn').addEventListener('click',function(){
  document.getElementById('cityOvTitle').textContent=it('changeCity');
  var ci=document.getElementById('cityInp');ci.placeholder=it('searchCity');ci.value='';
  renderCityList('');document.getElementById('cityOv').classList.add('open');
  setTimeout(function(){ci.focus();},50);
});
document.getElementById('closeCityBtn').addEventListener('click',function(){document.getElementById('cityOv').classList.remove('open');});
document.getElementById('cityOv').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
document.getElementById('cityInp').addEventListener('input',function(){renderCityList(this.value);});
function renderCityList(q){
  var el=document.getElementById('cityListEl');el.innerHTML='';
  var qq=q.trim().toLowerCase();
  CITIES.filter(function(c){return !qq||c.name.toLowerCase().indexOf(qq)!==-1;}).forEach(function(c){
    var b=document.createElement('button');b.className='city-btn'+(c.id===ST.cityId?' on':'');b.textContent=c.name;
    b.addEventListener('click',function(){ST.cityId=c.id;save();refreshP();document.getElementById('cityOv').classList.remove('open');});
    el.appendChild(b);
  });
}

/* ── SETTINGS OVERLAY (naglowki + szczegoly z features.js) ── */
function openSettingsBase(){
  document.getElementById('setOvTitle').textContent=it('settings');
  document.getElementById('setDataLbl').textContent=it('dataLbl');
  document.getElementById('exportBtn').textContent=it('exportBtn');
  document.getElementById('importBtn').textContent=it('importBtn');
  var note=document.getElementById('setNote');note.textContent=it('setNote');note.style.color='';
  /* instalacja PWA */
  var iRow=document.getElementById('installRow'),iBtn=document.getElementById('installBtn'),iLbl=document.getElementById('installLbl');
  var standalone=(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;
  var isIos=/iphone|ipad|ipod/i.test(navigator.userAgent);
  iBtn.style.display='';
  if(deferredInstall){iRow.style.display='';iLbl.textContent=it('installLbl');iBtn.textContent=it('installBtn');}
  else if(isIos&&!standalone){iRow.style.display='';iLbl.textContent=it('installIos');iBtn.style.display='none';}
  else{iRow.style.display='none';}
  /* koniec podpowiedzi wiggle */
  if(!ST.seenWiggle){ST.seenWiggle=true;save();document.getElementById('iSettingsBtn').classList.remove('wig');document.getElementById('eSettingsBtn').classList.remove('wig');document.getElementById('wSettingsBtn').classList.remove('wig');}
  if(typeof syncSettingsExtras==='function')syncSettingsExtras();
  document.getElementById('setOv').classList.add('open');
}
document.getElementById('iSettingsBtn').addEventListener('click',openSettingsBase);
document.getElementById('eSettingsBtn').addEventListener('click',openSettingsBase);
document.getElementById('closeSetBtn').addEventListener('click',function(){document.getElementById('setOv').classList.remove('open');});
document.getElementById('setOv').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});
document.getElementById('wSettingsBtn').addEventListener('click',openSettingsBase);
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){document.querySelectorAll('.overlay.open').forEach(function(o){o.classList.remove('open');});}
});
/* pulapka fokusu (Tab) w otwartym overlayu */
document.addEventListener('keydown',function(e){
  if(e.key!=='Tab')return;
  var o=document.querySelector('.overlay.open');if(!o)return;
  var f=o.querySelectorAll('button,input,[tabindex]');if(!f.length)return;
  var first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  else if(!o.contains(document.activeElement)){e.preventDefault();first.focus();}
});
/* blokada przewijania tla + zarzadzanie fokusem, gdy otwarty jest overlay */
var ovLockObs=new MutationObserver(function(muts){
  document.body.classList.toggle('no-scroll',!!document.querySelector('.overlay.open'));
  muts.forEach(function(mu){
    var o=mu.target;
    if(o.classList.contains('open')){
      o._prevFocus=document.activeElement;
      setTimeout(function(){
        var f=o.querySelector('button,input');
        if(f&&!o.contains(document.activeElement))f.focus();
      },70);
    }else if(o._prevFocus&&o._prevFocus.focus){
      try{o._prevFocus.focus();}catch(err){}
      o._prevFocus=null;
    }
  });
});
document.querySelectorAll('.overlay').forEach(function(o){ovLockObs.observe(o,{attributes:true,attributeFilter:['class']});});
/* export */
document.getElementById('exportBtn').addEventListener('click',function(){
  var blob=new Blob([JSON.stringify(ST,null,2)],{type:'application/json'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='moja-droga-backup.json';
  document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},100);
});
/* import */
document.getElementById('importBtn').addEventListener('click',function(){document.getElementById('importFile').click();});
document.getElementById('importFile').addEventListener('change',function(){
  var f=this.files&&this.files[0];if(!f)return;
  var note=document.getElementById('setNote');
  var reader=new FileReader();
  reader.onload=function(){
    try{
      var parsed=JSON.parse(reader.result);
      if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||(parsed.v===undefined&&parsed.done===undefined&&parsed.sect===undefined)){
        throw new Error('not a Moja Droga backup');
      }
      if(!confirm(it('importConfirm')))return;
      ST=sanitizeState(parsed);
      migrateDoneKeys();
      save();
      applyTheme();applyScale();applySect();
      document.documentElement.setAttribute('lang',ST.lang);
      showV(ST.sect==='eng'?'ve-home':'vi-home');
      rerender();
      note.textContent=it('importOk');note.style.color='#3E8E5A';toast(it('importOk'),'ok');
    }catch(err){
      note.textContent=it('importErr');note.style.color='#B4452F';toast(it('importErr'),'err');
    }
  };
  reader.onerror=function(){note.textContent=it('importErr');note.style.color='#B4452F';};
  reader.readAsText(f);
  this.value='';
});

