/* Moja Droga — aktywnosc, seria dni, kamienie milowe, profil, konfetti */
'use strict';

/* ══════════════════════════════
   AKTYWNOSC, SERIA, KAMIENIE MILOWE
══════════════════════════════ */
function dKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
/* dzien liczy sie do serii dopiero od 2 aktywnosci (nie "od razu" po jednym wejsciu) */
function dayCounts(k){return (ST.act[k]||0)>=2;}
function calcStreak(){
  var d=new Date(),s=0;
  if(!dayCounts(dKey(d)))d.setDate(d.getDate()-1); /* seria liczona od dzis lub wczoraj */
  while(dayCounts(dKey(d))){s++;d.setDate(d.getDate()-1);}
  return s;
}
/* poziom koloru jak na GitHubie: im wiecej aktywnosci danego dnia, tym mocniejszy */
function heatLv(c){return c>=6?4:c>=4?3:c>=2?2:c>=1?1:0;}
function activeDays(){return Object.keys(ST.act).length;}
function totalDone(){var n=0;for(var k in ST.done){if(ST.done[k])n++;}return n;}
/* ── MODLITWY (subtelny licznik +/− zamiast 5 duzych chipow) ── */
var PR5=['fajr','dhuhr','asr','maghrib','isha'];
function prayersList(){return (ST.prayers[dKey(new Date())]||[]).slice().sort(function(a,b){return PR5.indexOf(a)-PR5.indexOf(b);});}
function prayersToday(){return prayersList().length;}
function prayersMonth(){var p=dKey(new Date()).slice(0,7),n=0;for(var k in ST.prayers){if(k.slice(0,7)===p)n+=ST.prayers[k].length;}return n;}
function prayerStreak(){ /* kolejne dni z kompletem 5/5 */
  var d=new Date(),s=0;
  if((ST.prayers[dKey(d)]||[]).length<5)d.setDate(d.getDate()-1);
  while((ST.prayers[dKey(d)]||[]).length>=5){s++;d.setDate(d.getDate()-1);}
  return s;
}
var ptUndoAsk=false,ptUndoT=null;
function renderPrayerTracker(){
  var lbl=document.getElementById('ptToggleLbl');
  if(lbl)lbl.textContent=tr('ptToggle')||'Modlitwy';
  var list=prayersList();
  var cnt=document.getElementById('ptCount');
  if(cnt)cnt.textContent=list.length+'/5';
  var empty=document.getElementById('ptEmpty');
  if(empty){
    if(!list.length){
      empty.hidden=false;
      empty.textContent=tr('ptEmpty')||'Jeszcze dziś nic nie odnotowano — dotknij +, gdy odmówisz modlitwę.';
    }else empty.hidden=true;
  }
  var dots=document.getElementById('ptDots');
  if(dots){
    dots.innerHTML='';
    for(var i=0;i<5;i++){
      var dt=document.createElement('i');
      if(i<list.length)dt.className='on';
      dots.appendChild(dt);
    }
  }
  var dec=document.getElementById('ptDec'),inc=document.getElementById('ptInc');
  if(dec){
    dec.disabled=!list.length;
    dec.textContent=!list.length?'−':(ptUndoAsk?it('ptUndo'):'−');
    dec.classList.toggle('ask',ptUndoAsk&&!!list.length);
  }
  if(inc)inc.disabled=list.length>=5;
}
function ptNextMissing(){
  var list=prayersList();
  for(var i=0;i<PR5.length;i++){if(list.indexOf(PR5[i])===-1)return PR5[i];}
  return null;
}
function ptAddOne(){
  var list=prayersList();
  if(list.length>=5)return;
  var nid=ptNextMissing();
  if(!nid)return;
  if(navigator.vibrate)navigator.vibrate(8);
  ptUndoAsk=false;clearTimeout(ptUndoT);
  var k=dKey(new Date()),arr=ST.prayers[k]||(ST.prayers[k]=[]);
  if(arr.indexOf(nid)===-1)arr.push(nid);
  save();toast(it('ptOn'),'ok');touchAct();
  if(arr.length===5&&!ST.milestones.p5){ST.milestones.p5=1;save();toast(it('msP5'),'ok');confetti();}
  else if(arr.length===5&&prayerStreak()>=7&&!ST.milestones.p7){ST.milestones.p7=1;save();toast(it('msP7'),'ok');confetti();}
  renderPrayerTracker();
  if(document.getElementById('profOv').classList.contains('open'))renderProfile();
}
function ptRemoveOne(){
  var list=prayersList();
  if(!list.length)return;
  if(navigator.vibrate)navigator.vibrate(8);
  if(!ptUndoAsk){
    ptUndoAsk=true;renderPrayerTracker();
    clearTimeout(ptUndoT);ptUndoT=setTimeout(function(){ptUndoAsk=false;renderPrayerTracker();},3500);
    return;
  }
  clearTimeout(ptUndoT);ptUndoAsk=false;
  var k=dKey(new Date()),arr=ST.prayers[k]||[];
  arr.pop();
  if(!arr.length)delete ST.prayers[k];
  save();toast(it('ptOff'));
  renderPrayerTracker();
  if(document.getElementById('profOv').classList.contains('open'))renderProfile();
}

function touchAct(){
  var k=dKey(new Date());ST.act[k]=(ST.act[k]||0)+1;
  var st=calcStreak();if(st>ST.bestStreak)ST.bestStreak=st;
  save();
  updateStreakChip();
  if(document.getElementById('profOv').classList.contains('open'))renderProfile();
  if(st>=7&&!ST.milestones.s7){ST.milestones.s7=1;save();toast(it('ms7'),'ok');confetti();}
}
/* bump licznika serii, gdy wartosc rosnie */
var lastStreakShown=-1;
function updateStreakChip(){
  var n=document.getElementById('iStreakNum');if(!n)return;
  var v=calcStreak();
  if(lastStreakShown>-1&&v>lastStreakShown){
    n.textContent=v;
    n.classList.remove('bump');void n.offsetWidth;n.classList.add('bump');
    if(navigator.vibrate)navigator.vibrate([10,30,10]);
  }else n.textContent=v;
  lastStreakShown=v;
}
/* ── PROFIL: szczegolowe statystyki po kliknieciu w chip serii ── */
function renderProfile(){
  document.getElementById('profTitle').textContent=it('profT');
  var b=document.getElementById('profBody');b.innerHTML='';
  function mkGrid(){var g=document.createElement('div');g.className='prof-grid';b.appendChild(g);return g;}
  function cell(g,v,l){var c=document.createElement('div');c.className='prof-cell';var a=document.createElement('div');a.className='prof-v';if(typeof v==='number')countUp(a,v);else a.textContent=v;var s=document.createElement('div');s.className='prof-l';s.textContent=l;c.appendChild(a);c.appendChild(s);g.appendChild(c);}
  function shdr(txt){var h=document.createElement('div');h.className='prof-shdr';h.textContent=txt;b.appendChild(h);}
  var st=calcStreak(),g1=mkGrid();
  cell(g1,st,(st===1?it('day1'):it('dayN')));
  cell(g1,ST.bestStreak,it('profBest'));
  cell(g1,activeDays(),it('statsDays'));
  cell(g1,totalDone(),it('statsDone'));
  var rule=document.createElement('p');rule.className='prof-rule';rule.textContent=it('profRule');b.appendChild(rule);
  shdr(it('profPray'));
  var pt=prayersToday(),dots=document.createElement('div');dots.className='prof-dots';
  for(var i=0;i<5;i++){var di=document.createElement('i');if(i<pt)di.className='on';dots.appendChild(di);}
  b.appendChild(dots);
  var g2=mkGrid();
  cell(g2,pt+'/5',it('profPToday'));
  cell(g2,prayersMonth(),it('profPMonth'));
  cell(g2,prayerStreak(),it('profPStreak'));
  shdr(it('profHeat'));
  var heat=document.createElement('div');heat.className='prof-heat';heat.setAttribute('aria-hidden','true');
  for(var j=41;j>=0;j--){
    var d=new Date();d.setDate(d.getDate()-j);
    var lv=heatLv(ST.act[dKey(d)]||0);
    var cEl=document.createElement('i');cEl.className='heat-d'+(lv?' lv'+lv:'')+' heat-pop';
    cEl.style.animationDelay=((41-j)*12)+'ms';
    heat.appendChild(cEl);
  }
  b.appendChild(heat);
  var leg=document.createElement('div');leg.className='prof-legend';leg.setAttribute('aria-hidden','true');
  leg.appendChild(document.createTextNode(it('profLess')+' '));
  [0,1,2,3,4].forEach(function(l){var li=document.createElement('i');li.className='heat-d'+(l?' lv'+l:'');leg.appendChild(li);});
  leg.appendChild(document.createTextNode(' '+it('profMore')));
  b.appendChild(leg);
}
function reducedMotion(){return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);}
/* ── ANIMOWANE LICZBY (count-up) ── */
function countUp(el,target,suffix,fmt){
  if(!el)return;
  if(el._cuRAF&&typeof cancelAnimationFrame==='function')cancelAnimationFrame(el._cuRAF);
  el._cuRAF=null;
  function paint(v){el.textContent=fmt?fmt(v):(v+(suffix||''));}
  if(reducedMotion()||typeof requestAnimationFrame!=='function'){paint(target);return;}
  var t0=null,dur=600;
  function step(ts){
    if(t0===null)t0=ts;
    var p=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-p,3);
    paint(Math.round(target*e));
    if(p<1)el._cuRAF=requestAnimationFrame(step);
    else{el._cuRAF=null;paint(target);}
  }
  paint(0);el._cuRAF=requestAnimationFrame(step);
}
/* ── CHECKMARK (animowany SVG zamiast tekstowego znaku) ── */
function setChk(el,done){
  if(!el)return;
  el.classList.toggle('done',!!done);
  el.innerHTML=done?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.6"/></svg>':'';
}
function confetti(){
  if(reducedMotion())return;
  var box=document.createElement('div');box.className='confetti';box.setAttribute('aria-hidden','true');
  var colors=ST.sect==='eng'?['#3A6FC2','#6B9ED4','#6B4AC2','#9F82D8','#3E8E5A']:['#A9762F','#C9A24B','#3E8E5A','#C79A46','#8A6D3B'];
  for(var i=0;i<26;i++){
    var p=document.createElement('i');
    p.style.left=(Math.random()*100)+'vw';
    p.style.background=colors[i%colors.length];
    p.style.animationDelay=(Math.random()*0.35)+'s';
    p.style.animationDuration=(1.1+Math.random()*0.7)+'s';
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(function(){box.remove();},2400);
}
function checkDoneMilestones(){
  if(totalDone()>=100&&!ST.milestones.d100){ST.milestones.d100=1;save();toast(it('ms100'),'ok');confetti();}
}
function checkTopicComplete(){
  if(!curEngTopic)return;
  var lv=ST.engLevel,items=lv==='b1'?curEngTopic.b1:curEngTopic.b2;
  if(!items||!items.length)return;
  var all=true;
  for(var i=0;i<items.length;i++){if(!ST.done[eKey(curEngTopic.id,lv,items[i])]){all=false;break;}}
  var mk='tc_'+curEngTopic.id+'_'+lv;
  if(all&&!ST.milestones[mk]){ST.milestones[mk]=1;save();toast(it('msAll'),'ok');confetti();}
}

/* ── HAPTYKA PRZELACZNIKOW ── */
document.addEventListener('click',function(e){
  if(!navigator.vibrate)return;
  var t=e.target;
  if(t&&t.closest&&t.closest('.pill button,.lang-btn,.sz-btn,.bnav-btn,.prayer-pills button,.sort-btn,.pw-city,.quiz-opt,.city-btn,.pt-step-btn,.streak-ico'))navigator.vibrate(8);
});

/* ── GEST: SWIPE W PRAWO = WSTECZ ── */
(function(){
  var sx=0,sy=0,trk=false;
  document.addEventListener('touchstart',function(e){
    if(document.querySelector('.overlay.open')){trk=false;return;}
    var t=e.touches[0];
    if(t.clientX<=28){sx=t.clientX;sy=t.clientY;trk=true;}else trk=false;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!trk)return;trk=false;
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(dx>64&&Math.abs(dy)<60){
      var b=document.querySelector('.view.active .back-btn');
      if(b){if(navigator.vibrate)navigator.vibrate(8);b.click();}
    }
  },{passive:true});
})();

/* ── PASEK POSTEPU CZYTANIA ── */
function bindPbar(scrollId,barId){
  var sc=document.getElementById(scrollId),bar=document.getElementById(barId);
  if(!sc||!bar)return;
  sc.addEventListener('scroll',function(){
    var max=sc.scrollHeight-sc.clientHeight;
    bar.style.width=(max>0?Math.min(100,Math.round(sc.scrollTop/max*100)):0)+'%';
  },{passive:true});
}
bindPbar('i-prayerScroll','pbarPrayer');
bindPbar('e-itemScroll','pbarItem');

/* ── PROFIL / STATYSTYKI ── */
document.getElementById('iStatsBtn').addEventListener('click',function(){renderProfile();document.getElementById('profOv').classList.add('open');});
document.getElementById('closeProfBtn').addEventListener('click',function(){document.getElementById('profOv').classList.remove('open');});
document.getElementById('profOv').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});

/* ── INSTALL PROMPT ── */
var deferredInstall=null;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredInstall=e;});
document.getElementById('installBtn').addEventListener('click',function(){
  if(!deferredInstall)return;
  var p=deferredInstall;deferredInstall=null;
  p.prompt();
  document.getElementById('setOv').classList.remove('open');
});

