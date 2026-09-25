/* Moja Droga — sekcja Angielski: render widokow i obsluga zdarzen */
'use strict';

/* ══════════════════════════════
   ENGLISH — HELPERS & RENDER
══════════════════════════════ */
var curEngTopic=null;
var curEngItemData=null; // {item, key}
var engListScroll=0;

function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
function eKey(topicId,level,item){return topicId+'_'+level+'_'+slug(item.t.en||item.t.pl);}
/* One-time migration: index-based keys (topic_level_idx) → slug keys */
function migrateDoneKeys(){
  var moved=false;
  TOPICS.forEach(function(t){
    ['b1','b2'].forEach(function(lv){
      t[lv].forEach(function(item,idx){
        var oldK=t.id+'_'+lv+'_'+idx;
        if(Object.prototype.hasOwnProperty.call(ST.done,oldK)){
          if(ST.done[oldK])ST.done[eKey(t.id,lv,item)]=true;
          delete ST.done[oldK];moved=true;
        }
      });
    });
  });
  if(moved)save();
}
migrateDoneKeys();
function tStats(t){
  var b1t=t.b1.length,b1d=0,b2t=t.b2.length,b2d=0;
  t.b1.forEach(function(it){if(ST.done[eKey(t.id,'b1',it)])b1d++;});
  t.b2.forEach(function(it){if(ST.done[eKey(t.id,'b2',it)])b2d++;});
  return{b1t:b1t,b1d:b1d,b2t:b2t,b2d:b2d};
}
function allEStats(){
  var r={b1t:0,b1d:0,b2t:0,b2d:0};
  TOPICS.forEach(function(t){var s=tStats(t);r.b1t+=s.b1t;r.b1d+=s.b1d;r.b2t+=s.b2t;r.b2d+=s.b2d;});
  return r;
}
function eT(item){return(item.t[ST.lang]||item.t.pl);}
function eD(item){return(item.d[ST.lang]||item.d.pl);}
function eSec(item){if(!item.sec)return null;return(item.sec[ST.lang]||item.sec.pl);}
function eTip(item){if(!item.tip)return null;return(item.tip[ST.lang]||item.tip.pl);}

function renderEngHome(){
  syncLangBtns();
  document.querySelectorAll('#eSzPill .sz-btn').forEach(function(b){b.classList.toggle('on',b.dataset.sc===ST.scale);b.style.fontSize=b.dataset.sc==='0.85'?'10px':b.dataset.sc==='1'?'12px':'14px';});
  document.getElementById('tabB1').classList.toggle('on',ST.engLevel==='b1');
  document.getElementById('tabB2').classList.toggle('on',ST.engLevel==='b2');
  var s=allEStats();
  countUp(document.getElementById('eStB1'),s.b1d,'',function(v){return v+'/'+s.b1t;});
  countUp(document.getElementById('eStB2'),s.b2d,'',function(v){return v+'/'+s.b2t;});
  var sAllD=s.b1d+s.b2d,sAllT=s.b1t+s.b2t,sPct=sAllT?sAllD/sAllT:0;
  countUp(document.getElementById('eStAll'),Math.round(sPct*100),'%');
  document.getElementById('eCellAll').title=sAllD+'/'+sAllT;
  var ring=document.getElementById('eRingFg');
  if(ring){ring.style.strokeDasharray='100.53';ring.style.strokeDashoffset=(100.53*(1-sPct)).toFixed(1);}
  document.getElementById('e-homeSub').textContent=et('homeSub');
  document.getElementById('e-homeTitle').textContent=it('appTitle');
  document.getElementById('eLblB1').textContent=et('b1lbl');
  document.getElementById('eLblB2').textContent=et('b2lbl');
  document.getElementById('eLblAll').textContent=et('totlbl');
  var cw=document.getElementById('e-contWrap');cw.innerHTML='';
  if(ST.lastEng&&ST.lastEng.t){
    var tp=null;TOPICS.forEach(function(t){if(t.id===ST.lastEng.t)tp=t;});
    if(tp){
      var itemsC=ST.lastEng.lv==='b2'?tp.b2:tp.b1;
      var itC=null;itemsC.forEach(function(x){if(eKey(tp.id,ST.lastEng.lv,x)===ST.lastEng.k)itC=x;});
      if(itC){
        var card=document.createElement('div');card.className='cont-card';
        var cb=document.createElement('div');cb.className='cont-body';
        var cl=document.createElement('div');cl.className='cont-lbl';cl.textContent=et('cont');
        var ct=document.createElement('div');ct.className='cont-ttl';ct.textContent=tp.emoji+' '+eT(itC);
        cb.appendChild(cl);cb.appendChild(ct);card.appendChild(cb);
        var cbtn=document.createElement('button');cbtn.type='button';cbtn.className='cont-btn';cbtn.textContent='›';
        card.appendChild(cbtn);cw.appendChild(card);
        (function(tp2,it2,lv2,ky2){
          card.addEventListener('click',function(){
            ST.engLevel=lv2;save();
            curEngTopic=tp2;
            document.getElementById('e-topicTitle').textContent=tp2.emoji+' '+tp2.title[ST.lang]+' — '+lv2.toUpperCase();
            renderEngItems();
            openEngItem(it2,ky2);
          });
        })(tp,itC,ST.lastEng.lv,ST.lastEng.k);
      }
    }
  }
  var lv=ST.engLevel;
  var list=document.getElementById('e-topicList');list.innerHTML='';
  TOPICS.forEach(function(t){
    var ts=tStats(t);
    var doneN=lv==='b1'?ts.b1d:ts.b2d;
    var total=lv==='b1'?ts.b1t:ts.b2t;
    var pct=total>0?Math.round(doneN/total*100):0;
    var row=document.createElement('div');row.className='entry-row';
    row.innerHTML='<div class="e-ico">'+t.emoji+'</div>'+
      '<div class="e-body"><div class="e-title">'+t.title[ST.lang]+'</div><div class="e-sub">'+t.sub[ST.lang]+'</div></div>'+
      '<div class="e-right">'+
        '<div class="e-pct">'+doneN+'/'+total+'</div>'+
        '<div class="prog-bar"><div class="prog-fill" id="epf-'+t.id+'" style="width:'+pct+'%"></div></div>'+
        '<span class="e-arr">›</span></div>';
    row.addEventListener('click',function(){openEngTopic(t.id);});
    list.appendChild(row);
  });
}

function openEngTopic(id){
  curEngTopic=TOPICS.find(function(t){return t.id===id;});
  engListScroll=0;VIEW_SCROLL['ve-topic']=0;
  var lv=ST.engLevel;
  document.getElementById('e-topicTitle').textContent=curEngTopic.emoji+' '+curEngTopic.title[ST.lang]+' — '+lv.toUpperCase();
  renderEngItems();
  showV('ve-topic','fwd');
}
function renderEngItems(){
  var lv=ST.engLevel;
  var items=lv==='b1'?curEngTopic.b1:curEngTopic.b2;
  var list=document.getElementById('e-itemList');list.innerHTML='';
  var lastSec=null;
  items.forEach(function(item,idx){
    var sec=eSec(item);
    if(sec&&sec!==lastSec){
      var h=document.createElement('div');h.className='topic-sec-hdr';h.textContent=sec;list.appendChild(h);lastSec=sec;
    }
    var ky=eKey(curEngTopic.id,lv,item);
    var isDone=!!ST.done[ky];
    var row=document.createElement('div');row.className='item-row';
    var chk=document.createElement('div');chk.className='i-chk';chk.dataset.k=ky;setChk(chk,isDone);
    var body=document.createElement('div');body.className='i-body';
    var tt=document.createElement('div');tt.className='i-ttl';tt.textContent=eT(item);
    var dd=document.createElement('div');dd.className='i-desc';dd.textContent=eD(item);
    body.appendChild(tt);body.appendChild(dd);
    var arr=document.createElement('span');arr.className='i-arr';arr.textContent='›';
    row.appendChild(chk);row.appendChild(body);row.appendChild(arr);
    (function(ky2,chkEl,item2){
      chkEl.addEventListener('click',function(ev){
        ev.stopPropagation();
        ST.done[ky2]=!ST.done[ky2];save();if(navigator.vibrate)navigator.vibrate(10);
        setChk(chkEl,ST.done[ky2]);
        toast(ST.done[ky2]?it('doneOn'):it('doneOff'),ST.done[ky2]?'ok':null);
        touchAct();if(ST.done[ky2]){checkDoneMilestones();checkTopicComplete();}
      });
      row.addEventListener('click',function(){engListScroll=list.scrollTop;openEngItem(item2,ky2);});
    })(ky,chk,item);
    list.appendChild(row);
  });
}

function openEngItem(item,ky){
  touchAct();
  curEngItemData={item:item,key:ky};
  if(curEngTopic){ST.lastEng={t:curEngTopic.id,lv:ST.engLevel,k:ky};save();}
  document.getElementById('e-itemTopTtl').textContent=eT(item);
  var scroll=document.getElementById('e-itemScroll');scroll.innerHTML='';scroll.scrollTop=0;
  var pbI=document.getElementById('pbarItem');if(pbI)pbI.style.width='0%';
  function hdr(txt){var h=document.createElement('div');h.className='id-shdr';h.textContent=txt;scroll.appendChild(h);}
  // Title
  var ttEl=document.createElement('div');ttEl.className='id-title';ttEl.textContent=eT(item);
  scroll.appendChild(ttEl);
  // Description
  var ddEl=document.createElement('div');ddEl.className='id-desc';ddEl.textContent=eD(item);
  scroll.appendChild(ddEl);
  // Form
  if(item.form){
    hdr(et('form'));
    var fEl=document.createElement('div');fEl.className='id-form';fEl.textContent=item.form[ST.lang]||item.form.pl;
    scroll.appendChild(fEl);
  }
  // When
  if(item.when&&item.when.length){
    hdr(et('when'));
    var ul=document.createElement('ul');ul.className='id-list';
    item.when.forEach(function(w){var li=document.createElement('li');li.textContent=w[ST.lang]||w.pl;ul.appendChild(li);});
    scroll.appendChild(ul);
  }
  // Examples
  if(item.ex&&item.ex.length>0){
    hdr(et('ex'));
    item.ex.forEach(function(ex){
      var parts=ex.split(' — ');
      var exEl=document.createElement('div');exEl.className='id-ex';
      var bold=document.createElement('strong');bold.textContent=parts[0];
      exEl.appendChild(bold);
      if(parts[1]){exEl.appendChild(document.createTextNode(' '));var em=document.createElement('em');em.textContent='— '+parts[1];exEl.appendChild(em);}
      scroll.appendChild(exEl);
    });
  }
  // Compare
  if(item.compare&&item.compare.length){
    hdr(et('compare'));
    item.compare.forEach(function(c){
      var ci=document.createElement('div');ci.className='cmp-item';
      var h=document.createElement('div');h.className='cmp-h';h.textContent=c.h[ST.lang]||c.h.pl;ci.appendChild(h);
      var x=document.createElement('div');x.className='cmp-ex';x.textContent=c.ex;ci.appendChild(x);
      var n=document.createElement('div');n.className='cmp-note';n.textContent=c.note[ST.lang]||c.note.pl;ci.appendChild(n);
      scroll.appendChild(ci);
    });
  }
  // Mistakes
  if(item.mistakes&&item.mistakes.length){
    hdr(et('mistakes'));
    item.mistakes.forEach(function(m){
      var r=document.createElement('div');r.className='mis-row';
      var ic=document.createElement('div');ic.className='mis-ico';ic.textContent='✗';r.appendChild(ic);
      var bd=document.createElement('div');bd.className='mis-body';
      var s=document.createElement('div');s.className='mis-s';s.textContent=m.bad+' → '+m.good;bd.appendChild(s);
      var w=document.createElement('div');w.className='mis-why';w.textContent=m.why[ST.lang]||m.why.pl;bd.appendChild(w);
      r.appendChild(bd);scroll.appendChild(r);
    });
  }
  // Remember (or legacy tip)
  var rem=item.remember?(item.remember[ST.lang]||item.remember.pl):eTip(item);
  if(rem){
    var tipEl=document.createElement('div');tipEl.className='id-tip';
    var tipHdr=document.createElement('div');tipHdr.className='id-tip-hdr';tipHdr.textContent=et(item.remember?'remember':'tip');
    tipEl.appendChild(tipHdr);
    tipEl.appendChild(document.createTextNode(rem));
    scroll.appendChild(tipEl);
  }
  // Quiz
  if(item.quiz&&item.quiz.length){
    hdr(et('quiz'));
    item.quiz.forEach(function(q){
      var box=document.createElement('div');box.className='quiz';
      var qEl=document.createElement('div');qEl.className='quiz-q';qEl.textContent=q.q[ST.lang]||q.q.pl;box.appendChild(qEl);
      var opts=document.createElement('div');opts.className='quiz-opts';
      var why=document.createElement('div');why.className='quiz-why';why.textContent=q.why[ST.lang]||q.why.pl;
      q.opts.forEach(function(o,oi){
        var b=document.createElement('button');b.type='button';b.className='quiz-opt';b.textContent=o[ST.lang]||o.pl;
        b.addEventListener('click',function(){
          if(box.dataset.done)return;box.dataset.done='1';
          if(oi===q.a){b.classList.add('ok');b.textContent=o[ST.lang]||o.pl;}
          else{b.classList.add('bad');opts.children[q.a].classList.add('ok');}
          why.classList.add('show');
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);box.appendChild(why);
      scroll.appendChild(box);
    });
  }
  // Done row
  var isDone=!!ST.done[ky];
  var doneRow=document.createElement('div');doneRow.className='id-done-row';
  var dChk=document.createElement('div');dChk.className='i-chk';setChk(dChk,isDone);
  var dLbl=document.createElement('span');dLbl.className='id-done-lbl';dLbl.textContent=et('markDone');
  doneRow.appendChild(dChk);doneRow.appendChild(dLbl);
  doneRow.addEventListener('click',function(){
    ST.done[ky]=!ST.done[ky];save();if(navigator.vibrate)navigator.vibrate(10);
    setChk(dChk,ST.done[ky]);
    toast(ST.done[ky]?it('doneOn'):it('doneOff'),ST.done[ky]?'ok':null);
    touchAct();if(ST.done[ky]){checkDoneMilestones();checkTopicComplete();}
    var lChk=document.querySelector('#e-itemList [data-k="'+ky+'"]');
    if(lChk)setChk(lChk,ST.done[ky]);
  });
  scroll.appendChild(doneRow);
  showV('ve-item','fwd');
}

/* ── ENGLISH EVENTS ── */
/* przelaczanie B1/B2 z crossfade listy i karty kontynuacji */
function switchEngLevel(lv){
  if(ST.engLevel===lv)return;
  ST.engLevel=lv;save();
  var els=[document.getElementById('e-topicList'),document.getElementById('e-contWrap')].filter(Boolean);
  els.forEach(function(el){el.classList.add('xfade');});
  if(reducedMotion()){renderEngHome();return;}
  els.forEach(function(el){el.classList.add('out');});
  setTimeout(function(){
    renderEngHome();
    els.forEach(function(el){el.classList.remove('out');});
  },120);
}
document.getElementById('tabB1').addEventListener('click',function(){switchEngLevel('b1');});
document.getElementById('tabB2').addEventListener('click',function(){switchEngLevel('b2');});
document.getElementById('eBackTopic').addEventListener('click',function(){showV('ve-home','back');renderEngHome();});
document.getElementById('eBackItem').addEventListener('click',function(){showV('ve-topic','back');renderEngItems();document.getElementById('e-itemList').scrollTop=engListScroll;});
document.getElementById('eLangBtn').addEventListener('click',toggleLang);
document.getElementById('eThemeBtn').addEventListener('click',function(){ST.theme=ST.theme==='dark'?'light':'dark';save();applyTheme();});
document.querySelectorAll('#eSzPill .sz-btn').forEach(function(b){b.addEventListener('click',function(){ST.scale=b.dataset.sc;save();applyScale();});});

/* ── BOTTOM NAV (wszystkie sekcje: centralnie w js/wedding.js) ── */

