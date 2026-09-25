/* Moja Droga — sekcja Wedding: przygotowania do wesela (notatnik) */
'use strict';

/* ── WEDDING — TEXTS (PL/EN chrome + ID phrase) ── */
var WED={
  phrase:'Saya terima nikah dan kawinnya Putri Nabila Arofah Binti Achmad Efendi dengan mas kawin tersebut dibayar tunai',
  pl:{
    title:'Wedding',
    sub:'Przygotowania do wesela — Twój notatnik',
    badge:'Nauka na pamięć',
    idLbl:'Zdanie do wypowiedzenia (indonezyjski)',
    read:'Odsłuchaj wymowę',
    reading:'Odtwarzanie…',
    slow:'Wolno',
    copy:'Kopiuj zdanie',
    plLbl:'Tłumaczenie polskie',
    plTxt:'Przyjmuję jej małżeństwo z Putri Nabila Arofah, córką Achmada Efendiego, z tym posagiem (mahr) zapłaconym w gotówce.',
    enLbl:'English translation',
    enTxt:'I accept her marriage to Putri Nabila Arofah, daughter of Achmad Efendi, with this dowry (mahr) paid in cash.',
    tip:'Wskazówka',
    tipTxt:'Powiedz to zdanie jednym, spokojnym zdaniem — bez przerw i bez dodawania własnych słów. Przećwicz na głos kilka razy, najlepiej z odsłuchem wymowy.',
    checkT:'Lista przygotowań',
    mastered:'opanowanych'
  },
  en:{
    title:'Wedding',
    sub:'Wedding preparations — your notebook',
    badge:'Memorise it',
    idLbl:'Sentence to say (Indonesian)',
    read:'Listen to pronunciation',
    reading:'Playing…',
    slow:'Slow',
    copy:'Copy sentence',
    plLbl:'Polish translation',
    plTxt:'I accept her marriage to Putri Nabila Arofah, daughter of Achmad Efendi, with this dowry (mahr) paid in cash.',
    enLbl:'English translation',
    enTxt:'I accept her marriage to Putri Nabila Arofah, daughter of Achmad Efendi, with this dowry (mahr) paid in cash.',
    tip:'Tip',
    tipTxt:'Say this sentence as one calm sentence — no pauses, no extra words. Practise it out loud a few times, ideally with the pronunciation playback.',
    checkT:'Preparation checklist',
    mastered:'done'
  }
};
var WED_ITEMS_PL=['Zdanie opanowane na pamięć','Wymowa przećwiczona na głos','Posag (mahr) ustalony i gotowy','Termin i miejsce ceremonii potwierdzone','Świadkowie (saksi) potwierdzeni','Dokumenty gotowe'];
var WED_ITEMS_EN=['Sentence memorised','Pronunciation practised out loud','Dowry (mahr) agreed and ready','Date and venue confirmed','Witnesses (saksi) confirmed','Documents ready'];
function wt(k){return (WED[ST.lang]&&WED[ST.lang][k]!==undefined)?WED[ST.lang][k]:WED.pl[k];}
function wItems(){return ST.lang==='en'?WED_ITEMS_EN:WED_ITEMS_PL;}

/* ── WEDDING — RENDER ── */
function wedSetChk(el,on){el.classList.toggle('done',!!on);el.innerHTML=on?'<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.5 4.8 9 10 3"/></svg>':'';}
function renderWedding(){
  var sc=document.getElementById('w-scroll');
  if(!sc)return; /* HTML z cache bez widoku Wedding — nic nie rob */
  syncLangBtns();
  document.querySelectorAll('#wSzPill .sz-btn').forEach(function(b){b.classList.toggle('on',b.dataset.sc===ST.scale);b.style.fontSize=b.dataset.sc==='0.85'?'10px':b.dataset.sc==='1'?'12px':'14px';});
  var ttl=document.getElementById('w-homeTitle'),sub=document.getElementById('w-homeSub');
  if(ttl)ttl.textContent=wt('title');
  if(sub)sub.textContent=wt('sub');
  sc.innerHTML='';
  var badge=document.createElement('div');badge.className='wed-badge';badge.textContent='💍 '+wt('badge');sc.appendChild(badge);
  var card=document.createElement('section');card.className='wed-card';card.setAttribute('aria-label',wt('idLbl'));
  var lbl=document.createElement('div');lbl.className='wed-lbl';lbl.textContent=wt('idLbl');card.appendChild(lbl);
  var ph=document.createElement('p');ph.className='wed-phrase';ph.setAttribute('lang','id');ph.textContent='💖 '+WED.phrase+' 💖';card.appendChild(ph);
  var btnRow=document.createElement('div');btnRow.className='wed-btns';
  var readB=document.createElement('button');readB.type='button';readB.className='wed-btn';readB.textContent='🔊 '+wt('read');
  var slowB=document.createElement('button');slowB.type='button';slowB.className='wed-btn wed-ghost';slowB.textContent='🐢 '+wt('slow');
  var copyB=document.createElement('button');copyB.type='button';copyB.className='wed-btn wed-ghost';copyB.textContent='📋 '+wt('copy');
  btnRow.appendChild(readB);btnRow.appendChild(slowB);btnRow.appendChild(copyB);card.appendChild(btnRow);
  sc.appendChild(card);
  var pl=document.createElement('section');pl.className='wed-note';
  var plH=document.createElement('div');plH.className='wed-lbl';plH.textContent=wt('plLbl');pl.appendChild(plH);
  var plP=document.createElement('p');plP.className='wed-tr';plP.setAttribute('lang','pl');plP.textContent=wt('plTxt');pl.appendChild(plP);
  sc.appendChild(pl);
  var en=document.createElement('section');en.className='wed-note';
  var enH=document.createElement('div');enH.className='wed-lbl';enH.textContent=wt('enLbl');en.appendChild(enH);
  var enP=document.createElement('p');enP.className='wed-tr';enP.setAttribute('lang','en');enP.textContent=wt('enTxt');en.appendChild(enP);
  sc.appendChild(en);
  var tip=document.createElement('section');tip.className='wed-tip';
  var tipH=document.createElement('div');tipH.className='wed-lbl';tipH.textContent='💡 '+wt('tip');tip.appendChild(tipH);
  var tipP=document.createElement('p');tipP.className='wed-tr';tipP.textContent=wt('tipTxt');tip.appendChild(tipP);
  sc.appendChild(tip);
  var items=wItems();
  var doneCount=0;items.forEach(function(_,i){if(ST.done['wed_'+i])doneCount++;});
  var chT=document.createElement('div');chT.className='wed-check-hdr';
  var chL=document.createElement('span');chL.textContent='✓ '+wt('checkT');chT.appendChild(chL);
  var chC=document.createElement('span');chC.className='wed-count';chC.textContent=doneCount+'/'+items.length+' '+wt('mastered');chT.appendChild(chC);
  sc.appendChild(chT);
  var list=document.createElement('div');list.className='wed-check';
  items.forEach(function(t,i){
    var k='wed_'+i,isDone=!!ST.done[k];
    var row=document.createElement('div');row.className='item-row';
    var chk=document.createElement('div');chk.className='i-chk';wedSetChk(chk,isDone);
    var body=document.createElement('div');body.className='i-body';
    var ttl=document.createElement('div');ttl.className='i-ttl';ttl.textContent=t;
    body.appendChild(ttl);row.appendChild(chk);row.appendChild(body);
    row.addEventListener('click',function(){
      ST.done[k]=!ST.done[k];save();if(navigator.vibrate)navigator.vibrate(10);
      wedSetChk(chk,ST.done[k]);
      toast(ST.done[k]?it('doneOn'):it('doneOff'),ST.done[k]?'ok':null);
      touchAct();if(ST.done[k]){checkDoneMilestones();}
      renderWedding();
    });
    list.appendChild(row);
  });
  sc.appendChild(list);
  readB.addEventListener('click',function(){speakWed(false,this);});
  slowB.addEventListener('click',function(){speakWed(true,this);});
  copyB.addEventListener('click',function(){copyTxt(WED.phrase);});
}

/* ── WEDDING — SPEECH ── */
function speakWed(slow,btn){
  var orig=btn?btn.textContent:'';
  try{
    if(!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined'){toast(it('errGeneric'),'err');return;}
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(WED.phrase);
    u.lang='id-ID';u.rate=slow?0.55:0.85;u.pitch=1;
    try{
      var vs=window.speechSynthesis.getVoices()||[];
      var idV=vs.filter(function(v){return v.lang&&(v.lang.toLowerCase().indexOf('id')===0);});
      if(idV.length)u.voice=idV[0];
    }catch(e){}
    if(btn)btn.textContent='… '+wt('reading');
    u.onend=u.onerror=function(){if(btn)btn.textContent=orig;};
    setTimeout(function(){if(btn&&btn.textContent!==orig)btn.textContent=orig;},8000);
    window.speechSynthesis.speak(u);
    if(navigator.vibrate)navigator.vibrate(10);
  }catch(e){toast(it('errGeneric'),'err');}
}

/* ── WEDDING — EVENTS (zabezpieczone: starszy HTML z cache nie moze wywalic aplikacji) ── */
(function(){
  var lb=document.getElementById('wLangBtn');if(lb)lb.addEventListener('click',toggleLang);
  var tb=document.getElementById('wThemeBtn');
  if(tb)tb.addEventListener('click',function(){ST.theme=ST.theme==='dark'?'light':'dark';save();applyTheme();});
  var pill=document.getElementById('wSzPill');
  if(pill)pill.querySelectorAll('.sz-btn').forEach(function(b){b.addEventListener('click',function(){ST.scale=b.dataset.sc;save();applyScale();});});
})();
/* Dolna nawigacja (Islam / Angielski / Wedding) podlaczana jest w js/app.js — wireNav(). */



