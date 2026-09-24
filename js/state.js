/* Moja Droga — stan aplikacji: storage (mdv4), motyw, skala, sekcja, widoki, scroll, toast */
'use strict';

/* ══════════════════════════════
   STATE & STORAGE (versioned)
══════════════════════════════ */
var LS_KEY='mdv4',LS_LEGACY='mdv3',DATA_VER=1;
var DEF={v:DATA_VER,sect:'islam',lang:'pl',theme:'light',scale:'1',cityId:'krakow',sortReversed:false,engLevel:'b1',pvVer:'2',done:{},lastEng:null,act:{},bestStreak:0,prayers:{},seenWiggle:false,milestones:{},lastExport:0,wakeLock:false,saverDay:''};
function pick(v,allowed,fallback){v=String(v);return allowed.indexOf(v)>-1?v:fallback;}
function sanitizeState(s){
  s=(s&&typeof s==='object')?s:{};
  var st=Object.assign({},DEF,s);
  st.lang=pick(st.lang,['pl','en'],'pl');
  st.theme=pick(st.theme,['light','dark'],'light');
  st.scale=pick(st.scale,['0.85','1','1.2'],'1');
  st.engLevel=pick(st.engLevel,['b1','b2'],'b1');
  st.pvVer=pick(st.pvVer,['2','3','4'],'2');
  st.sect=pick(st.sect,['islam','eng'],'islam');
  if(typeof st.cityId!=='string')st.cityId='krakow';
  if(!st.done||typeof st.done!=='object'||Array.isArray(st.done))st.done={};
  if(!st.lastEng||typeof st.lastEng!=='object')st.lastEng=null;
  if(!st.act||typeof st.act!=='object'||Array.isArray(st.act))st.act={};
  if(!st.milestones||typeof st.milestones!=='object'||Array.isArray(st.milestones))st.milestones={};
  st.bestStreak=(typeof st.bestStreak==='number'&&isFinite(st.bestStreak)&&st.bestStreak>=0)?Math.floor(st.bestStreak):0;
  st.seenWiggle=!!st.seenWiggle;
  if(!st.prayers||typeof st.prayers!=='object'||Array.isArray(st.prayers))st.prayers={};
  for(var pk in st.prayers){
    var pa=Array.isArray(st.prayers[pk])?st.prayers[pk].filter(function(x,xi,xa){return['fajr','dhuhr','asr','maghrib','isha'].indexOf(x)>-1&&xa.indexOf(x)===xi;}):[];
    if(pa.length)st.prayers[pk]=pa.slice(0,5);else delete st.prayers[pk];
  }
  st.sortReversed=!!st.sortReversed;
  st.lastExport=(typeof st.lastExport==='number'&&isFinite(st.lastExport)&&st.lastExport>0)?st.lastExport:0;
  st.wakeLock=!!st.wakeLock;
  if(typeof st.saverDay!=='string')st.saverDay='';
  st.v=DATA_VER;
  return st;
}
function loadState(){
  var raw=null;
  try{raw=localStorage.getItem(LS_KEY)||localStorage.getItem(LS_LEGACY);}catch(e){}
  var parsed=null;
  if(raw){try{parsed=JSON.parse(raw);}catch(e){parsed=null;}}
  return sanitizeState(parsed);
}
var ST=loadState();
var saveErrShown=false;
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(ST));}catch(e){if(!saveErrShown){saveErrShown=true;if(typeof it==='function')toast(it('saveErr'),'err');}}}

var APP=document.getElementById('app');

function resolvedTheme(){return ST.theme==='dark'?'dark':'light';}
function applyMeta(){var d=resolvedTheme()==='dark',m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',ST.sect==='eng'?(d?'#0D1117':'#F5F8FD'):(d?'#0E1C18':'#F4EFE6'));}
function updateThemeBtns(){var ico=ST.theme==='dark'?'🌙':'☀';var ib=document.getElementById('iThemeBtn'),eb=document.getElementById('eThemeBtn');if(ib)ib.textContent=ico;if(eb)eb.textContent=ico;}
function applyTheme(){document.documentElement.setAttribute('data-theme',resolvedTheme());applyMeta();updateThemeBtns();}
applyTheme();

function applyScale(){
  document.documentElement.style.setProperty('--scale',ST.scale);
  document.querySelectorAll('.sz-btn').forEach(function(b){
    b.classList.toggle('on',b.dataset.sc===ST.scale);
    b.style.fontSize=b.dataset.sc==='0.85'?'10px':b.dataset.sc==='1'?'12px':'14px';
  });
}
applyScale();

function applySect(){
  APP.setAttribute('data-sect',ST.sect);
  document.documentElement.setAttribute('data-sect',ST.sect);
  applyMeta();
  document.getElementById('bnIslam').classList.toggle('on',ST.sect==='islam');
  document.getElementById('bnEng').classList.toggle('on',ST.sect==='eng');
  document.getElementById('bnIslam').setAttribute('aria-current',ST.sect==='islam'?'page':'false');
  document.getElementById('bnEng').setAttribute('aria-current',ST.sect==='eng'?'page':'false');
}
applySect();

function applyLangChrome(){document.getElementById('bnEngLbl').textContent=ST.lang==='pl'?'Angielski':'English';document.title=IS[ST.lang].appTitle;}

var toastEl=null,toastT=null;
/* type: 'ok' (sukces), 'err' (blad) lub brak (neutralny) */
function toast(msg,type){
  if(!toastEl){
    toastEl=document.createElement('div');toastEl.className='toast';toastEl.setAttribute('role','status');toastEl.setAttribute('aria-live','polite');
    toastEl.innerHTML='<span class="toast-ico" aria-hidden="true"></span><span class="toast-txt"></span>';
    document.body.appendChild(toastEl);
  }
  toastEl.querySelector('.toast-ico').textContent=type==='ok'?'✓':type==='err'?'!':'';
  toastEl.querySelector('.toast-ico').hidden=!type;
  toastEl.querySelector('.toast-txt').textContent=msg;
  toastEl.classList.remove('ok','err');
  if(type==='ok')toastEl.classList.add('ok');
  else if(type==='err')toastEl.classList.add('err');
  toastEl.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(function(){toastEl.classList.remove('show');},1600);
}

var VIEWS=['vi-home','vi-list','vi-letters','vi-prayer','ve-home','ve-topic','ve-item'];
var VIEW_SCROLL={};
var RESTORE_VIEWS={'vi-home':1,'ve-home':1,'ve-topic':1};
function viewScroller(id){var v=document.getElementById(id);return v?v.querySelector('.entry-list,.detail-scroll,.pscroll,.id-scroll'):null;}
var raf=(typeof requestAnimationFrame==='function')?requestAnimationFrame:function(f){return setTimeout(f,0);};
/* dir: 'fwd' = w glab (wsuwa z prawej), 'back' = powrot (wsuwa z lewej), brak = fade z dolu */
function showV(id,dir){
  var cur=currentView();
  if(cur&&cur!==id){var sc=viewScroller(cur);if(sc)VIEW_SCROLL[cur]=sc.scrollTop;}
  VIEWS.forEach(function(v){
    var el=document.getElementById(v),on=v===id;
    el.classList.remove('v-fwd','v-back');
    el.classList.toggle('active',on);
    if(on&&dir==='fwd')el.classList.add('v-fwd');
    else if(on&&dir==='back')el.classList.add('v-back');
  });
  var y=(RESTORE_VIEWS[id]&&VIEW_SCROLL[id]!==undefined)?VIEW_SCROLL[id]:0;
  raf(function(){var t=viewScroller(id);if(t)t.scrollTop=y;});
}
function currentView(){var a=document.querySelector('.view.active');return a?a.id:null;}

/* Central re-render — used after language change so detail views update too */
var curIslamEntry=null;
function rerender(){
  applyScale();
  applyLangChrome();
  syncLangBtns();
  var v=currentView();
  if(v==='vi-home'){renderIslam();refreshP();}
  else if(v==='vi-list'){if(curIslamEntry)openIslamList(curIslamEntry);refreshP();}
  else if(v==='vi-letters'){openIslamLetters();refreshP();}
  else if(v==='vi-prayer'){openIslamPrayer();refreshP();}
  else if(v==='ve-home'){renderEngHome();}
  else if(v==='ve-topic'){if(curEngTopic)openEngTopic(curEngTopic.id);}
  else if(v==='ve-item'){if(curEngItemData)openEngItem(curEngItemData.item,curEngItemData.key);}
}
function setLang(l){ST.lang=l;save();document.documentElement.setAttribute('lang',l);rerender();}
function toggleLang(){setLang(ST.lang==='pl'?'en':'pl');}
function syncLangBtns(){
  var cur=ST.lang==='pl'?'PL':'EN';
  ['iLangBtn','eLangBtn'].forEach(function(id){
    var b=document.getElementById(id);
    if(!b)return;
    b.textContent=cur;
    b.classList.toggle('en',ST.lang==='en');
  });
}


