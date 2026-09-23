/* Moja Droga — sekcja Angielski: tlumaczenia (ES) + baza tematow i lekcji (TOPICS) */
'use strict';

/* ══════════════════════════════
   ENGLISH — TRANSLATIONS
══════════════════════════════ */
var ES={
  pl:{homeSub:'Ścieżka nauki angielskiego · B1 → B2',b1lbl:'B1 opanowane',b2lbl:'B2 opanowane',totlbl:'łącznie',ex:'Przykłady',tip:'Wskazówka',markDone:'Zaznacz jako opanowane',form:'Jak tworzymy?',when:'Kiedy używamy?',compare:'Porównanie',mistakes:'Częste błędy',remember:'Zapamiętaj',quiz:'Mini-ćwiczenie',cont:'Kontynuuj naukę',mastered:'opanowane',qOk:'Dobrze!',qNo:'Nie tym razem'},
  en:{homeSub:'English learning path · B1 → B2',b1lbl:'B1 mastered',b2lbl:'B2 mastered',totlbl:'total',ex:'Examples',tip:'Tip',markDone:'Mark as mastered',form:'How to form it',when:'When do we use it?',compare:'Compare',mistakes:'Common mistakes',remember:'Remember',quiz:'Mini exercise',cont:'Continue learning',mastered:'mastered',qOk:'Correct!',qNo:'Not this time'}
};
function et(k){return ES[ST.lang][k]||k;}

/* ══════════════════════════════
   ENGLISH — TOPICS DATA
   Required: t:{pl,en}, d:{pl,en}
   Optional blocks (rendered in fixed order when present):
     sec:{pl,en} — section header in list
     form:{pl,en} — formula chip
     when:[{pl,en}] — bullet list
     ex:[] — examples, " — " splits note
     compare:[{h:{pl,en},ex:'',note:{pl,en}}]
     mistakes:[{bad:'',good:'',why:{pl,en}}]
     remember:{pl,en} (tip:{pl,en} works as alias)
     quiz:[{q:{pl,en},opts:[{pl,en}],a:0,why:{pl,en}}]
══════════════════════════════ */
var TOPICS=[
  {id:'grammar',emoji:'⚙️',title:{pl:'Gramatyka',en:'Grammar'},sub:{pl:'Czasy, strona bierna, tryby warunkowe',en:'Tenses, passive voice, conditionals'},
   b1:[
    {sec:{pl:'Czasy teraźniejsze',en:'Present Tenses'},t:{pl:'Present Simple',en:'Present Simple'},
     d:{pl:'Nawyki, fakty i stałe prawdy. Czas „neutralny” — mówimy o tym, co jest zawsze lub regularnie prawdziwe.',en:'Habits, facts and permanent truths. The neutral tense — for things that are always or regularly true.'},
     form:{pl:'podmiot + czasownik · he/she/it → +s/es (go → goes, watch → watches, study → studies)',en:'subject + verb · he/she/it → +s/es (go → goes, watch → watches, study → studies)'},
     when:[
      {pl:'nawyki i rutyna — I work every day.',en:'habits and routines — I work every day.'},
      {pl:'fakty i prawdy ogólne — The sun rises in the east.',en:'facts and general truths — The sun rises in the east.'},
      {pl:'rozkłady jazdy i harmonogramy — The train leaves at 7:30.',en:'timetables and schedules — The train leaves at 7:30.'}],
     ex:['I work every day. — (routine / czynność stała)','The sun rises in the east. — (fact / fakt)','She doesn\'t drink coffee. — (negative: doesn\'t + forma podstawowa)','Does he live in Warsaw? — (question: does + forma podstawowa)'],
     mistakes:[
      {bad:'She go to work by bus.',good:'She goes to work by bus.',why:{pl:'W 3. osobie (he/she/it) zawsze dodajemy -s/-es.',en:'Third person (he/she/it) always takes -s/-es.'}},
      {bad:'Does he plays football?',good:'Does he play football?',why:{pl:'Po do/does czasownik wraca do formy podstawowej.',en:'After do/does the verb goes back to the base form.'}}],
     compare:[
      {h:{pl:'Present Simple',en:'Present Simple'},ex:'I work in Kraków.',note:{pl:'na stałe — to moja regularna praca',en:'permanent — my regular job'}},
      {h:{pl:'Present Continuous',en:'Present Continuous'},ex:'I am working from home this week.',note:{pl:'tymczasowo — tylko przez jakiś czas',en:'temporary — only for a limited time'}}],
     remember:{pl:'Znaczniki: always, usually, often, every day/week. Pytania i przeczenia z do/does.',en:'Markers: always, usually, often, every day/week. Questions and negatives with do/does.'},
     quiz:[{q:{pl:'She ___ coffee every morning.',en:'She ___ coffee every morning.'},opts:[{pl:'drink',en:'drink'},{pl:'drinks',en:'drinks'},{pl:'is drinking',en:'is drinking'}],a:1,why:{pl:'3. osoba (she) w Present Simple → drinks.',en:'Third person (she) in Present Simple → drinks.'}}]},
    {t:{pl:'Present Continuous',en:'Present Continuous'},
     d:{pl:'Co dzieje się TERAZ, jest tymczasowe albo zaplanowane na przyszłość. Czas „w ruchu”.',en:'What is happening NOW, is temporary, or is an arranged future plan. The tense "in motion".'},
     form:{pl:'am/is/are + czasownik-ing (I am working, she is working)',en:'am/is/are + verb-ing (I am working, she is working)'},
     when:[
      {pl:'dzieje się w tej chwili — I\'m working right now.',en:'happening at this moment — I\'m working right now.'},
      {pl:'sytuacje tymczasowe — I\'m staying with a friend this week.',en:'temporary situations — I\'m staying with a friend this week.'},
      {pl:'uzgodnione plany na przyszłość — She\'s meeting a friend tonight.',en:'arranged future plans — She\'s meeting a friend tonight.'}],
     ex:['I\'m working right now. — (happening now / teraz)','She\'s meeting a friend tonight. — (arranged plan / plan)','They aren\'t coming to the party. — (negative / przeczenie)','Are you listening? — (question / pytanie)'],
     mistakes:[
      {bad:'I\'m loving this song.',good:'I love this song.',why:{pl:'Czasowniki stanu (love, know, want, like, need) nie używają Continuous.',en:'State verbs (love, know, want, like, need) don\'t use the Continuous.'}},
      {bad:'She working now.',good:'She is working now.',why:{pl:'Bez am/is/are nie ma Present Continuous.',en:'Without am/is/are there is no Present Continuous.'}}],
     remember:{pl:'Znaczniki: now, right now, at the moment, tonight. Czasowniki stanu: know, want, like, love, need, believe → zawsze Simple.',en:'Markers: now, right now, at the moment, tonight. State verbs: know, want, like, love, need, believe → always Simple.'},
     quiz:[{q:{pl:'Look! It ___.',en:'Look! It ___.'},opts:[{pl:'rains',en:'rains'},{pl:'is raining',en:'is raining'},{pl:'rain',en:'rain'}],a:1,why:{pl:'Dzieje się w tej chwili (Look!) → Present Continuous.',en:'Happening at this moment (Look!) → Present Continuous.'}}]},
    {t:{pl:'Present Perfect',en:'Present Perfect'},
     d:{pl:'Czynność przeszła z efektem TERAZ albo bez podania konkretnego czasu. Most między przeszłością a teraźniejszością.',en:'A past action with a result NOW, or at an unspecified time. A bridge between past and present.'},
     form:{pl:'have/has + 3. forma czasownika (past participle): I have seen, she has gone',en:'have/has + past participle (3rd form): I have seen, she has gone'},
     when:[
      {pl:'efekt widoczny teraz — I\'ve lost my keys. (nie mogę wejść)',en:'result visible now — I\'ve lost my keys. (I can\'t get in)'},
      {pl:'doświadczenia życiowe — Have you ever been to Japan?',en:'life experiences — Have you ever been to Japan?'},
      {pl:'z just / already / yet — I\'ve just finished.',en:'with just / already / yet — I\'ve just finished.'},
      {pl:'w niezakończonym czasie: today, this week, this year — I\'ve read three books this month.',en:'in unfinished time: today, this week, this year — I\'ve read three books this month.'}],
     ex:['I\'ve just finished my homework. — (just / właśnie)','She has never been to Japan. — (never / nigdy)','Have you seen this film yet? — (yet in questions)','They\'ve already left. — (already / już)'],
     mistakes:[
      {bad:'I have seen him yesterday.',good:'I saw him yesterday.',why:{pl:'Z konkretnym czasem przeszłym (yesterday, last week) → Past Simple, nie Present Perfect.',en:'With a specific past time (yesterday, last week) → Past Simple, not Present Perfect.'}},
      {bad:'I\'ve been to London last year.',good:'I went to London last year.',why:{pl:'„Last year” to zakończony okres → Past Simple.',en:'"Last year" is a finished period → Past Simple.'}}],
     compare:[
      {h:{pl:'Present Perfect',en:'Present Perfect'},ex:'I have lost my keys.',note:{pl:'nie wiemy kiedy — ważny jest efekt: nie mogę otworzyć drzwi TERAZ',en:'we don\'t know when — the result matters: I can\'t open the door NOW'}},
      {h:{pl:'Past Simple',en:'Past Simple'},ex:'I lost my keys yesterday.',note:{pl:'konkretny, zakończony moment w przeszłości',en:'a specific, finished moment in the past'}}],
     remember:{pl:'Znaczniki: just, already, yet, ever, never, since, for, today, this week. Konkretny czas przeszły? → Past Simple.',en:'Markers: just, already, yet, ever, never, since, for, today, this week. A specific past time? → Past Simple.'},
     quiz:[{q:{pl:'I ___ to London three times.',en:'I ___ to London three times.'},opts:[{pl:'went',en:'went'},{pl:'have been',en:'have been'},{pl:'was',en:'was'}],a:1,why:{pl:'Doświadczenie życiowe bez konkretnego czasu → Present Perfect.',en:'Life experience with no specific time → Present Perfect.'}}]},
    {t:{pl:'Present Perfect Continuous',en:'Present Perfect Continuous'},
     d:{pl:'Czynność zaczęła się w przeszłości i trwa do teraz — nacisk na CZAS TRWANIA, nie na wynik.',en:'An action started in the past and continues until now — emphasis on DURATION, not on the result.'},
     form:{pl:'have/has been + czasownik-ing: I have been waiting, she has been studying',en:'have/has been + verb-ing: I have been waiting, she has been studying'},
     when:[
      {pl:'jak długo coś trwa — I\'ve been waiting for 2 hours.',en:'how long something has been going on — I\'ve been waiting for 2 hours.'},
      {pl:'widoczne efekty niedawnej aktywności — You\'re out of breath. Have you been running?',en:'visible signs of recent activity — You\'re out of breath. Have you been running?'},
      {pl:'pytania o długość — How long have you been living here?',en:'duration questions — How long have you been living here?'}],
     ex:['I\'ve been waiting for 2 hours. — (for / przez)','She\'s been studying since 2020. — (since / od)','How long have you been living here? — (duration question)'],
     mistakes:[
      {bad:'I\'m working here since 2020.',good:'I\'ve been working here since 2020.',why:{pl:'„Since/for” z czynnością trwającą do teraz → Present Perfect (Continuous), nie Present Continuous.',en:'"Since/for" with an action continuing until now → Present Perfect (Continuous), not Present Continuous.'}}],
     compare:[
      {h:{pl:'Present Perfect Continuous',en:'Present Perfect Continuous'},ex:'I\'ve been reading this book for a week.',note:{pl:'proces — czytam dalej, nie wiadomo czy skończyłem',en:'process — still reading, maybe not finished'}},
      {h:{pl:'Present Perfect',en:'Present Perfect'},ex:'I\'ve read 100 pages.',note:{pl:'wynik / ilość — wiadomo, ile zrobiono',en:'result / amount — we know how much is done'}}],
     remember:{pl:'for = PRZEZ JAK DŁUGO (for 3 hours). since = OD KIEDY (since Monday, since 2020).',en:'for = HOW LONG (for 3 hours). since = FROM WHEN (since Monday, since 2020).'},
     quiz:[{q:{pl:'How long ___ here?',en:'How long ___ here?'},opts:[{pl:'are you living',en:'are you living'},{pl:'have you been living',en:'have you been living'},{pl:'do you live',en:'do you live'}],a:1,why:{pl:'Pytanie o czas trwania do teraz → Present Perfect Continuous.',en:'Duration until now → Present Perfect Continuous.'}}]},
    {sec:{pl:'Czasy przeszłe',en:'Past Tenses'},t:{pl:'Past Simple',en:'Past Simple'},
     d:{pl:'Zakończona czynność w konkretnym momencie w przeszłości. Czas „zamkniętej sprawy” — wiemy KIEDY to się stało.',en:'A finished action at a specific moment in the past. The "closed case" tense — we know WHEN it happened.'},
     form:{pl:'czasownik-ed (worked) albo 2. forma nieregularna (went, saw, ate)',en:'verb-ed (worked) or 2nd irregular form (went, saw, ate)'},
     when:[
      {pl:'z konkretnym czasem: yesterday, last week, in 2010, ago — I went there last year.',en:'with a specific time: yesterday, last week, in 2010, ago — I went there last year.'},
      {pl:'sekwencja zdarzeń w opowiadaniu — I woke up, had coffee and left.',en:'sequences of events in stories — I woke up, had coffee and left.'}],
     ex:['I went to London last year. — (specific time / konkretny czas)','She called me at 8 pm. — (specific time)','They didn\'t come to the party. — (negative)','Where did you go on holiday? — (question)'],
     mistakes:[
      {bad:'Did you went there?',good:'Did you go there?',why:{pl:'Po did czasownik wraca do formy podstawowej.',en:'After did the verb goes back to the base form.'}},
      {bad:'I have seen him yesterday.',good:'I saw him yesterday.',why:{pl:'„Yesterday” to konkretny czas przeszły → Past Simple, nie Present Perfect.',en:'"Yesterday" is a specific past time → Past Simple, not Present Perfect.'}}],
     compare:[
      {h:{pl:'Past Simple',en:'Past Simple'},ex:'I lost my keys yesterday.',note:{pl:'konkretny, zakończony moment — sprawa zamknięta',en:'specific, finished moment — case closed'}},
      {h:{pl:'Present Perfect',en:'Present Perfect'},ex:'I have lost my keys.',note:{pl:'bez czasu — liczy się efekt teraz',en:'no time given — the present result matters'}}],
     remember:{pl:'Z yesterday, ago, last, in 2010 → ZAWSZE Past Simple.',en:'With yesterday, ago, last, in 2010 → ALWAYS Past Simple.'},
     quiz:[{q:{pl:'We ___ to Gdańsk last summer.',en:'We ___ to Gdańsk last summer.'},opts:[{pl:'have gone',en:'have gone'},{pl:'went',en:'went'},{pl:'go',en:'go'}],a:1,why:{pl:'„Last summer” to zakończony, konkretny czas → Past Simple.',en:'"Last summer" is a finished, specific time → Past Simple.'}}]},
    {t:{pl:'Past Continuous',en:'Past Continuous'},
     d:{pl:'Czynność W TRAKCIE w konkretnym momencie przeszłym — tło wydarzeń albo czynność przerwana przez inną.',en:'An action IN PROGRESS at a past moment — the background of events, or an action interrupted by another one.'},
     form:{pl:'was/were + czasownik-ing: I was reading, they were sleeping',en:'was/were + verb-ing: I was reading, they were sleeping'},
     when:[
      {pl:'czynność trwająca w danym momencie — At 8 pm I was watching TV.',en:'action in progress at a given moment — At 8 pm I was watching TV.'},
      {pl:'tło przerwane krótszą czynnością (Past Simple) — I was reading when he called.',en:'background interrupted by a shorter action (Past Simple) — I was reading when he called.'},
      {pl:'tło w opowiadaniach — The sun was shining and birds were singing.',en:'background in stories — The sun was shining and birds were singing.'}],
     ex:['I was reading when he called. — (interrupted / przerywana)','At 8 pm I was watching TV. — (in progress at that time)','It was raining all day. — (all day long)','What were you doing? — (question)'],
     mistakes:[
      {bad:'While I watched TV, he called.',good:'While I was watching TV, he called.',why:{pl:'Trwające tło (while) → Past Continuous; krótkie zdarzenie → Past Simple.',en:'Ongoing background (while) → Past Continuous; short event → Past Simple.'}}],
     compare:[
      {h:{pl:'Past Simple + Past Simple',en:'Past Simple + Past Simple'},ex:'When I arrived, she cooked dinner.',note:{pl:'po kolei: najpierw przyjechałem, potem gotowała',en:'in sequence: I arrived first, then she cooked'}},
      {h:{pl:'Past Continuous + Past Simple',en:'Past Continuous + Past Simple'},ex:'When I arrived, she was cooking dinner.',note:{pl:'gotowała już, gdy wszedłem — czynność w trakcie',en:'she was already cooking when I walked in — in progress'}}],
     remember:{pl:'Układanka: długa czynność (Past Continuous) + krótkie zdarzenie (Past Simple) — when / while.',en:'Pattern: long action (Past Continuous) + short event (Past Simple) — when / while.'},
     quiz:[{q:{pl:'I ___ TV when he called.',en:'I ___ TV when he called.'},opts:[{pl:'watched',en:'watched'},{pl:'was watching',en:'was watching'},{pl:'watch',en:'watch'}],a:1,why:{pl:'Długa czynność przerwana krótkim zdarzeniem → Past Continuous.',en:'Long action interrupted by a short event → Past Continuous.'}}]},
    {t:{pl:'Past Perfect',en:'Past Perfect'},
     d:{pl:'„Przeszłość przeszłości” — czynność zakończona PRZED inną przeszłą czynnością. Pokazuje kolejność zdarzeń.',en:'The "past of the past" — an action completed BEFORE another past action. It shows the order of events.'},
     form:{pl:'had + 3. forma czasownika: I had eaten, she had left',en:'had + past participle: I had eaten, she had left'},
     when:[
      {pl:'wcześniejsze z dwóch przeszłych zdarzeń — When I got home, the film had already started.',en:'the earlier of two past events — When I got home, the film had already started.'},
      {pl:'z before / after / by the time / already — She had left before I arrived.',en:'with before / after / by the time / already — She had left before I arrived.'}],
     ex:['By the time I arrived, she had already left. — (she left first)','He had never been abroad before he went to Spain.','When I got home, the film had already finished.'],
     mistakes:[
      {bad:'Yesterday I had gone to the shop and bought milk.',good:'Yesterday I went to the shop and bought milk.',why:{pl:'Past Perfect tylko gdy jest DRUGI punkt w przeszłości. Bez niego → Past Simple.',en:'Past Perfect only when there is a SECOND past reference point. Without it → Past Simple.'}}],
     compare:[
      {h:{pl:'Past Simple + Past Simple',en:'Past Simple + Past Simple'},ex:'When I arrived, the film started.',note:{pl:'film zaczął się w momencie mojego przyjścia',en:'the film started at the moment I arrived'}},
      {h:{pl:'Past Perfect + Past Simple',en:'Past Perfect + Past Simple'},ex:'When I arrived, the film had started.',note:{pl:'film zaczął się WCZEŚNIEJ — przegapiłem początek',en:'the film had started EARLIER — I missed the beginning'}}],
     remember:{pl:'Potrzebujesz dwóch punktów w przeszłości. Wcześniejsze zdarzenie → had + pp.',en:'You need two past reference points. The earlier event → had + pp.'},
     quiz:[{q:{pl:'By the time we arrived, they ___.',en:'By the time we arrived, they ___.'},opts:[{pl:'left',en:'left'},{pl:'had left',en:'had left'},{pl:'have left',en:'have left'}],a:1,why:{pl:'Wyszli WCZEŚNIEJ niż my przyjechali — wcześniejsze zdarzenie → Past Perfect.',en:'They left BEFORE we arrived — earlier event → Past Perfect.'}}]},
    {sec:{pl:'Przyszłość',en:'Future'},t:{pl:'Will / Won\'t',en:'Will / Won\'t'},
     d:{pl:'Decyzja podjęta W CHWILI mówienia, przewidywanie bez dowodu, obietnica lub oferta pomocy.',en:'Decision made AT THE MOMENT of speaking, prediction without evidence, promise or offer of help.'},
     form:{pl:'will/won\'t + bezokolicznik (bez to): I will help, she won\'t come',en:'will/won\'t + bare infinitive: I will help, she won\'t come'},
     when:[
      {pl:'spontaniczna decyzja — I\'ll help you!',en:'spontaneous decision — I\'ll help you!'},
      {pl:'przewidywanie bez dowodu (opinia) — I think it will rain.',en:'prediction without evidence (opinion) — I think it will rain.'},
      {pl:'obietnica — I won\'t tell anyone.',en:'promise — I won\'t tell anyone.'},
      {pl:'oferta — Shall I / Can I carry that for you?',en:'offer — Shall I / Can I carry that for you?'}],
     ex:['I\'ll help you! — (spontaneous decision / decyzja teraz)','It will probably rain tomorrow. — (prediction)','I won\'t tell anyone, I promise. — (promise / obietnica)','Will you be at the party? — (question)'],
     mistakes:[
      {bad:'I will to help you.',good:'I will help you.',why:{pl:'Po will bezokolicznik BEZ to.',en:'After will, bare infinitive WITHOUT to.'}},
      {bad:'I will call you — I decided yesterday.',good:'I\'m going to call you — I decided yesterday.',why:{pl:'Plan podjęty wcześniej → going to, nie will.',en:'A plan made earlier → going to, not will.'}}],
     compare:[
      {h:{pl:'Will',en:'Will'},ex:'I\'ll call you tonight!',note:{pl:'decyzja podjęta TERAZ, w chwili mówienia',en:'decision made NOW, at the moment of speaking'}},
      {h:{pl:'Going to',en:'Going to'},ex:'I\'m going to call you tonight.',note:{pl:'plan istniał już WCZEŚNIEJ',en:'the plan already existed BEFORE'}}],
     remember:{pl:'Will ≠ plan! Decyzja teraz → will. Plan z wcześniej → going to.',en:'Will ≠ plan! Decision now → will. Earlier plan → going to.'},
     quiz:[{q:{pl:'— The phone is ringing! — I ___ it!',en:'— The phone is ringing! — I ___ it!'},opts:[{pl:'answer',en:'answer'},{pl:'\'ll answer',en:'\'ll answer'},{pl:'\'m going to answer',en:'\'m going to answer'}],a:1,why:{pl:'Spontaniczna decyzja w chwili mówienia → will.',en:'Spontaneous decision at the moment of speaking → will.'}}]},
    {t:{pl:'Going to',en:'Going to'},
     d:{pl:'Plan podjęty WCZEŚNIEJ albo przewidywanie z WIDOCZNYM DOWODEM.',en:'An intention decided BEFORE, or a prediction based on VISIBLE EVIDENCE.'},
     form:{pl:'am/is/are + going to + bezokolicznik: I\'m going to study',en:'am/is/are + going to + bare infinitive: I\'m going to study'},
     when:[
      {pl:'zamiar / plan z wcześniej — I\'m going to study tonight.',en:'intention / earlier plan — I\'m going to study tonight.'},
      {pl:'przewidywanie z widocznym dowodem — Look at those clouds! It\'s going to rain.',en:'prediction with visible evidence — Look at those clouds! It\'s going to rain.'}],
     ex:['I\'m going to study tonight — I have a plan (intention)','Look at those clouds — it\'s going to rain! — (visible evidence)','She\'s going to have a baby. — (certain future fact)','Are you going to watch the match? — (question about plan)'],
     mistakes:[
      {bad:'Look! It will rain!',good:'Look! It\'s going to rain!',why:{pl:'Widzisz dowód (ciemne chmury) → going to, nie will.',en:'You can see evidence (dark clouds) → going to, not will.'}}],
     compare:[
      {h:{pl:'Going to',en:'Going to'},ex:'I\'m going to visit grandma on Sunday.',note:{pl:'plan ustalony wcześniej',en:'a plan made earlier'}},
      {h:{pl:'Present Continuous',en:'Present Continuous'},ex:'I\'m visiting grandma on Sunday — we agreed.',note:{pl:'plan z UMÓWIONYM terminem/osobą',en:'an arrangement with a fixed time/person'}}],
     remember:{pl:'Widzisz dowód → going to. Masz wcześniejszy plan → going to. Decyzja teraz → will.',en:'You see evidence → going to. Earlier plan → going to. Decision now → will.'},
     quiz:[{q:{pl:'Watch out! You ___ your coffee!',en:'Watch out! You ___ your coffee!'},opts:[{pl:'will spill',en:'will spill'},{pl:'\'re going to spill',en:'\'re going to spill'},{pl:'spill',en:'spill'}],a:1,why:{pl:'Widzisz, że kubek stoi na krawędzi — widoczny dowód → going to.',en:'You can see the cup on the edge — visible evidence → going to.'}}]},
    {sec:{pl:'Tryby warunkowe',en:'Conditionals'},t:{pl:'Zerowy tryb warunkowy',en:'Zero Conditional'},
     d:{pl:'Fakty naukowe i ogólne prawdy — wynik ZAWSZE pewny, niezależny od czasu.',en:'Scientific facts and general truths — the result is ALWAYS certain, independent of time.'},
     form:{pl:'If + Present Simple, … + Present Simple',en:'If + Present Simple, … + Present Simple'},
     when:[
      {pl:'prawa natury — If you heat water to 100°C, it boils.',en:'laws of nature — If you heat water to 100°C, it boils.'},
      {pl:'regularne skutki — If I drink coffee late, I can\'t sleep.',en:'regular consequences — If I drink coffee late, I can\'t sleep.'},
      {pl:'instrukcje — If the light is red, stop.',en:'instructions — If the light is red, stop.'}],
     ex:['If you heat water to 100°C, it boils. — (physics / fizyka)','If I drink too much coffee, I can\'t sleep. — (regular result)','When it rains, the streets get wet. — (when = if)'],
     mistakes:[
      {bad:'If you will heat water, it boils.',good:'If you heat water, it boils.',why:{pl:'W zerowym trybie po if nigdy will.',en:'In zero conditional, never will after if.'}}],
     remember:{pl:'If = when (bez zmiany sensu). Wynik zawsze pewny → Zero Conditional.',en:'If = when (no change in meaning). Result always certain → Zero Conditional.'},
     quiz:[{q:{pl:'If you ___ ice in the sun, it melts.',en:'If you ___ ice in the sun, it melts.'},opts:[{pl:'leave',en:'leave'},{pl:'will leave',en:'will leave'},{pl:'left',en:'left'}],a:0,why:{pl:'Prawo natury → Present Simple po obu stronach.',en:'Law of nature → Present Simple on both sides.'}}]},
    {t:{pl:'Pierwszy tryb warunkowy',en:'First Conditional'},
     d:{pl:'Realny, możliwy warunek w przyszłości i jego prawdopodobny skutek.',en:'A real, possible future condition and its likely result.'},
     form:{pl:'If + Present Simple, … will + bezokolicznik (albo odwrotnie)',en:'If + Present Simple, … will + bare infinitive (or reversed)'},
     when:[
      {pl:'realna przyszła możliwość — If it rains, I\'ll take an umbrella.',en:'real future possibility — If it rains, I\'ll take an umbrella.'},
      {pl:'ostrzeżenie — You\'ll be late if you don\'t hurry.',en:'warning — You\'ll be late if you don\'t hurry.'},
      {pl:'obietnica warunkowa — If you help me, I\'ll help you.',en:'conditional promise — If you help me, I\'ll help you.'}],
     ex:['If it rains, I\'ll take an umbrella. — (possible condition)','You\'ll be late if you don\'t hurry. — (if at the end)','If she calls, tell her I\'m busy. — (present simple after "if")','Will you help me if I need you?'],
     mistakes:[
      {bad:'If it will rain, I\'ll stay home.',good:'If it rains, I\'ll stay home.',why:{pl:'Po if ZAWSZE Present Simple, nigdy will.',en:'After if ALWAYS Present Simple, never will.'}},
      {bad:'If I will see him, I tell him.',good:'If I see him, I\'ll tell him.',why:{pl:'Dwie zasady naraz: if + Present Simple, wynik z will.',en:'Two rules at once: if + Present Simple, result with will.'}}],
     compare:[
      {h:{pl:'First Conditional',en:'First Conditional'},ex:'If I win the lottery, I\'ll buy a house.',note:{pl:'możliwe — traktuję to realnie',en:'possible — I treat it as realistic'}},
      {h:{pl:'Second Conditional',en:'Second Conditional'},ex:'If I won the lottery, I\'d buy a house.',note:{pl:'marzenie — mało prawdopodobne',en:'a dream — unlikely'}}],
     remember:{pl:'Po if → NIGDY will. Wynik → will + infinitive.',en:'After if → NEVER will. Result → will + infinitive.'},
     quiz:[{q:{pl:'If she ___ me, I\'ll tell her.',en:'If she ___ me, I\'ll tell her.'},opts:[{pl:'calls',en:'calls'},{pl:'will call',en:'will call'},{pl:'call',en:'call'}],a:0,why:{pl:'Po if → Present Simple (calls), wynik z will.',en:'After if → Present Simple (calls), result with will.'}}]},
    {t:{pl:'Drugi tryb warunkowy',en:'Second Conditional'},
     d:{pl:'Sytuacja nierealna lub mało prawdopodobna TERAZ / W PRZYSZŁOŚCI. Marzenia i hipotezy.',en:'An unreal or unlikely situation NOW / IN THE FUTURE. Dreams and hypotheses.'},
     form:{pl:'If + Past Simple, … would + bezokolicznik',en:'If + Past Simple, … would + bare infinitive'},
     when:[
      {pl:'marzenie / hipoteza — If I had a car, I would drive to work.',en:'dream / hypothesis — If I had a car, I would drive to work.'},
      {pl:'rada — If I were you, I wouldn\'t do that.',en:'advice — If I were you, I wouldn\'t do that.'},
      {pl:'pytanie hipotetyczne — What would you do if you won the lottery?',en:'hypothetical question — What would you do if you won the lottery?'}],
     ex:['If I had a car, I would drive to work. — (I don\'t have one)','If I were you, I wouldn\'t do that. — (advice / rada)','What would you do if you won the lottery? — (hypothetical)','She would travel more if she had money.'],
     mistakes:[
      {bad:'If I would have money, I\'d travel.',good:'If I had money, I\'d travel.',why:{pl:'Would NIGDY w części z if.',en:'Would NEVER in the if clause.'}},
      {bad:'If I was you, I\'d wait.',good:'If I were you, I\'d wait.',why:{pl:'W radach: If I were you — were dla wszystkich osób.',en:'In advice: If I were you — were for all persons.'}}],
     compare:[
      {h:{pl:'First Conditional',en:'First Conditional'},ex:'If it rains, I\'ll stay home.',note:{pl:'realne — może padać',en:'realistic — it might rain'}},
      {h:{pl:'Second Conditional',en:'Second Conditional'},ex:'If I lived by the sea, I\'d swim every day.',note:{pl:'nierealne — nie mieszkam nad morzem',en:'unreal — I don\'t live by the sea'}}],
     remember:{pl:'„If I were you, I would…” — najczęstsza fraza z tym czasem. Uwaga: was → were.',en:'"If I were you, I would…" — the most common phrase with this conditional. Note: was → were.'},
     quiz:[{q:{pl:'If I ___ rich, I would travel the world.',en:'If I ___ rich, I would travel the world.'},opts:[{pl:'was/were',en:'was/were'},{pl:'am',en:'am'},{pl:'would be',en:'would be'}],a:0,why:{pl:'Po if → Past Simple (were); would tylko w wyniku.',en:'After if → Past Simple (were); would only in the result.'}}]},
    {sec:{pl:'Strona bierna',en:'Passive Voice'},t:{pl:'Passive Voice — podstawy',en:'Passive Voice — basics'},
     d:{pl:'Używamy, gdy WYKONAWCA jest nieznany, nieważny albo oczywisty. Liczy się czynność, nie kto ją zrobił.',en:'Used when the AGENT is unknown, unimportant or obvious. The action matters, not who did it.'},
     form:{pl:'odpowiednia forma „be” + 3. forma czasownika: is made, was built',en:'correct form of "be" + past participle: is made, was built'},
     when:[
      {pl:'wykonawca nieznany — My bike was stolen.',en:'agent unknown — My bike was stolen.'},
      {pl:'wykonawca nieważny — English is spoken worldwide.',en:'agent unimportant — English is spoken worldwide.'},
      {pl:'styl formalny / informacje — The museum is closed on Mondays.',en:'formal style / information — The museum is closed on Mondays.'}],
     ex:['English is spoken all over the world. — (Present Simple Passive)','The window was broken by a ball. — (Past Simple Passive)','This building was built in 1920. — (without agent)','These products are made in China.'],
     mistakes:[
      {bad:'The house was build in 1990.',good:'The house was built in 1990.',why:{pl:'Po „be” zawsze 3. forma (built), nie forma podstawowa — uwaga na czasowniki nieregularne.',en:'After be always the 3rd form (built) — watch irregular verbs.'}},
      {bad:'My phone has stole.',good:'My phone has been stolen.',why:{pl:'W stronie biernej zawsze jest „be” + 3. forma.',en:'The passive always needs "be" + past participle.'}}],
     compare:[
      {h:{pl:'Strona czynna',en:'Active'},ex:'A ball broke the window.',note:{pl:'wiemy i ważne jest, CO zrobiło szkodę',en:'we know and care WHAT caused the damage'}},
      {h:{pl:'Strona bierna',en:'Passive'},ex:'The window was broken.',note:{pl:'liczy się skutek; sprawca nieznany/nieważny',en:'the result matters; the agent is unknown/unimportant'}}],
     remember:{pl:'„by + wykonawca” tylko gdy to ważna informacja — zwykle pomijamy.',en:'"by + agent" only when it\'s important — usually omitted.'},
     quiz:[{q:{pl:'This bridge ___ in 1880.',en:'This bridge ___ in 1880.'},opts:[{pl:'built',en:'built'},{pl:'was built',en:'was built'},{pl:'is built',en:'is built'}],a:1,why:{pl:'Przeszłość + strona bierna → was + 3. forma.',en:'Past + passive → was + past participle.'}}]},
    {sec:{pl:'Modalne',en:'Modal Verbs'},t:{pl:'Can / Could / Be able to',en:'Can / Could / Be able to'},
     d:{pl:'Zdolność i uprzejme prośby. Can — teraz, could — przeszłość lub grzeczność, be able to — gdzie can nie działa.',en:'Ability and polite requests. Can — now, could — past or politeness, be able to — where can doesn\'t work.'},
     form:{pl:'can/could + bezokolicznik; be able to + bezokolicznik (will be able to, have been able to)',en:'can/could + bare infinitive; be able to + bare infinitive (will be able to, have been able to)'},
     when:[
      {pl:'zdolność teraz — I can swim.',en:'present ability — I can swim.'},
      {pl:'zdolność w przeszłości — She could read at four.',en:'past ability — She could read at four.'},
      {pl:'uprzejma prośba — Could you help me?',en:'polite request — Could you help me?'},
      {pl:'po will / w czasach Perfect — I\'ll be able to come.',en:'after will / in Perfect tenses — I\'ll be able to come.'}],
     ex:['I can swim very fast. — (present ability)','Could you open the window? — (polite request)','She could speak French as a child. — (past ability)','I\'ll be able to help you tomorrow. — (after will)'],
     mistakes:[
      {bad:'I can to swim.',good:'I can swim.',why:{pl:'Po modalnych bezokolicznik BEZ to.',en:'After modals, bare infinitive WITHOUT to.'}},
      {bad:'I will can help you.',good:'I\'ll be able to help you.',why:{pl:'„Will can” nie istnieje — użyj be able to.',en:'"Will can" doesn\'t exist — use be able to.'}}],
     remember:{pl:'Po modalnym nigdy „to”. Przyszłość zdolności → be able to.',en:'Never "to" after a modal. Future ability → be able to.'},
     quiz:[{q:{pl:'I hope I ___ speak English fluently one day.',en:'I hope I ___ speak English fluently one day.'},opts:[{pl:'will can',en:'will can'},{pl:'\'ll be able to',en:'\'ll be able to'},{pl:'can to',en:'can to'}],a:1,why:{pl:'Po will nie ma can — używamy be able to.',en:'There\'s no can after will — we use be able to.'}}]},
    {t:{pl:'Should / Shouldn\'t',en:'Should / Shouldn\'t'},
     d:{pl:'Rada, rekomendacja lub umiarkowany obowiązek. Synonim: ought to (bardziej formalne).',en:'Advice, recommendation or mild obligation. Synonym: ought to (more formal).'},
     form:{pl:'should/shouldn\'t + bezokolicznik: You should rest',en:'should/shouldn\'t + bare infinitive: You should rest'},
     when:[
      {pl:'rada — You should see a doctor.',en:'advice — You should see a doctor.'},
      {pl:'pytanie o radę — Should I call her?',en:'asking for advice — Should I call her?'},
      {pl:'oczekiwanie — The train should arrive soon.',en:'expectation — The train should arrive soon.'}],
     ex:['You should see a doctor. — (advice / rada)','He shouldn\'t eat so much sugar.','Should I call her? — (asking for advice)','You ought to apologize. — (ought to = should)'],
     mistakes:[
      {bad:'You should to see a doctor.',good:'You should see a doctor.',why:{pl:'Po should bez „to” (ale: ought TO).',en:'No "to" after should (but: ought TO).'}}],
     compare:[
      {h:{pl:'Should',en:'Should'},ex:'You should rest.',note:{pl:'rada — dobrze byłoby, ale nie musisz',en:'advice — it would be good, but you don\'t have to'}},
      {h:{pl:'Must',en:'Must'},ex:'You must rest — doctor\'s orders.',note:{pl:'silny nakaz — nie masz wyboru',en:'strong necessity — no choice'}}],
     remember:{pl:'Should = „powinieneś” (rada). Must = „musisz” (nakaz).',en:'Should = advice. Must = strong obligation.'},
     quiz:[{q:{pl:'You look tired. You ___ go to bed earlier.',en:'You look tired. You ___ go to bed earlier.'},opts:[{pl:'should',en:'should'},{pl:'should to',en:'should to'},{pl:'must to',en:'must to'}],a:0,why:{pl:'Rada → should + bezokolicznik bez to.',en:'Advice → should + bare infinitive.'}}]},
    {t:{pl:'Must / Have to / Don\'t have to',en:'Must / Have to / Don\'t have to'},
     d:{pl:'Silny obowiązek i jego przeciwieństwa. Uwaga: przeciwieństwo must NIE znaczy „nie wolno”!',en:'Strong obligation and its opposites. Careful: the opposite of must does NOT mean "forbidden"!'},
     form:{pl:'must/have to + bezokolicznik; przeczenia: mustn\'t (zakaz) i don\'t have to (brak obowiązku)',en:'must/have to + bare infinitive; negatives: mustn\'t (prohibition) and don\'t have to (no obligation)'},
     when:[
      {pl:'wewnętrzny nakaz — I must call Mum, it\'s her birthday.',en:'internal necessity — I must call Mum, it\'s her birthday.'},
      {pl:'zewnętrzny obowiązek (przepisy, praca) — I have to wear a uniform at work.',en:'external obligation (rules, work) — I have to wear a uniform at work.'},
      {pl:'brak obowiązku — You don\'t have to come if you\'re tired.',en:'no obligation — You don\'t have to come if you\'re tired.'},
      {pl:'zakaz — You mustn\'t smoke here.',en:'prohibition — You mustn\'t smoke here.'}],
     ex:['I must call Mum — it\'s her birthday (internal must)','I have to work on Saturdays. — (external obligation)','You don\'t have to wear a tie. — (no obligation)','You mustn\'t smoke here. — (prohibition)'],
     mistakes:[
      {bad:'You don\'t have to smoke here. (= not allowed)',good:'You mustn\'t smoke here.',why:{pl:'Zakaz → mustn\'t. Don\'t have to znaczy tylko „nie musisz”.',en:'Prohibition → mustn\'t. Don\'t have to only means "you don\'t need to".'}}],
     compare:[
      {h:{pl:'Mustn\'t',en:'Mustn\'t'},ex:'You mustn\'t be late.',note:{pl:'ZAKAZ — nie wolno ci',en:'PROHIBITION — you are not allowed'}},
      {h:{pl:'Don\'t have to',en:'Don\'t have to'},ex:'You don\'t have to come early.',note:{pl:'BRAK OBOWIĄZKU — możesz, ale nie musisz',en:'NO OBLIGATION — you can, but you don\'t need to'}}],
     remember:{pl:'KLUCZ: don\'t have to = nie musisz (możesz). mustn\'t = nie wolno (zakaz).',en:'KEY: don\'t have to = no need (you may). mustn\'t = not allowed (ban).'},
     quiz:[{q:{pl:'It\'s free! You ___ pay anything.',en:'It\'s free! You ___ pay anything.'},opts:[{pl:'mustn\'t',en:'mustn\'t'},{pl:'don\'t have to',en:'don\'t have to'},{pl:'don\'t must',en:'don\'t must'}],a:1,why:{pl:'Brak obowiązku (nie musisz płacić) → don\'t have to.',en:'No obligation (no need to pay) → don\'t have to.'}}]},
    {t:{pl:'Might / May',en:'Might / May'},
     d:{pl:'Możliwość ok. 50% lub mniej — „może tak, może nie”. Might jest nieco mniej pewne niż may.',en:'About 50% possibility or less — "maybe yes, maybe no". Might is slightly less certain than may.'},
     form:{pl:'might/may + bezokolicznik; przeczenie: might not, may not',en:'might/may + bare infinitive; negatives: might not, may not'},
     when:[
      {pl:'niepewna prognoza — It might rain later.',en:'uncertain prediction — It might rain later.'},
      {pl:'niepewność o fakcie — She may not be at home.',en:'uncertainty about a fact — She may not be at home.'},
      {pl:'ostrożna sugestia — Take an umbrella, it might rain.',en:'cautious suggestion — Take an umbrella, it might rain.'},
      {pl:'grzeczna prośba (may) — May I come in?',en:'polite request (may) — May I come in?'}],
     ex:['It might rain later. — (about 50% possible)','She may not be at home. — (possibility)','Take an umbrella — it might be cold. — (cautious advice)'],
     mistakes:[
      {bad:'It might to rain.',good:'It might rain.',why:{pl:'Po might/may bezokolicznik bez to.',en:'After might/may, bare infinitive without to.'}}],
     compare:[
      {h:{pl:'Will',en:'Will'},ex:'It will rain tomorrow.',note:{pl:'pewność ~100%',en:'certainty ~100%'}},
      {h:{pl:'Might / May',en:'Might / May'},ex:'It might rain tomorrow.',note:{pl:'możliwość ~50%',en:'possibility ~50%'}}],
     remember:{pl:'Skala pewności: will (100%) > should (90%) > may/might (50%) > could (30%).',en:'Certainty scale: will (100%) > should (90%) > may/might (50%) > could (30%).'},
     quiz:[{q:{pl:'I\'m not sure — I ___ go to the party.',en:'I\'m not sure — I ___ go to the party.'},opts:[{pl:'might',en:'might'},{pl:'will',en:'will'},{pl:'must',en:'must'}],a:0,why:{pl:'„I\'m not sure” → niepewność ~50% → might.',en:'"I\'m not sure" → ~50% uncertainty → might.'}}]},
    {sec:{pl:'Inne struktury',en:'Other Structures'},t:{pl:'Reported Speech — podstawy',en:'Reported Speech — basics'},
     d:{pl:'Relacjonowanie czyjejś wypowiedzi — „on powiedział, że…”. Czasy cofają się o krok wstecz.',en:'Reporting what someone said — "he said that…". Tenses shift one step back.'},
     form:{pl:'said / told + osoba + (that) + zdanie z cofniętym czasem',en:'said / told + person + (that) + sentence with a backshifted tense'},
     when:[
      {pl:'relacjonowanie wypowiedzi — He said (that) he was tired.',en:'reporting a statement — He said (that) he was tired.'},
      {pl:'relacjonowanie pytań — She asked if I was OK.',en:'reporting questions — She asked if I was OK.'},
      {pl:'relacjonowanie poleceń — She told me not to go.',en:'reporting commands — She told me not to go.'}],
     ex:['"I am tired." → He said he was tired. — (Present → Past)','"I will call you." → She said she would call. — (will → would)','"I have eaten." → He said he had eaten. — (PP → Past Perfect)','"Don\'t go!" → She told me not to go. — (imperative / rozkaz)'],
     mistakes:[
      {bad:'She said me that she was busy.',good:'She told me that she was busy.',why:{pl:'Tell + osoba (told me). Say — bez osoby (she said that…).',en:'Tell + person (told me). Say — no person (she said that…).'}},
      {bad:'He said he is tired.',good:'He said he was tired.',why:{pl:'Czas cofa się o krok: is → was.',en:'The tense shifts back: is → was.'}}],
     compare:[
      {h:{pl:'Mowa prosta',en:'Direct speech'},ex:'"I\'m busy," she said.',note:{pl:'dokładne słowa w cudzysłowie',en:'exact words in quotes'}},
      {h:{pl:'Mowa zależna',en:'Reported speech'},ex:'She said she was busy.',note:{pl:'czas cofnięty, zaimki zmienione',en:'tense shifted back, pronouns changed'}}],
     remember:{pl:'Cofanie czasów: is→was, will→would, have eaten→had eaten, can→could.',en:'Backshift: is→was, will→would, have eaten→had eaten, can→could.'},
     quiz:[{q:{pl:'"I\'m happy." → She said she ___ happy.',en:'"I\'m happy." → She said she ___ happy.'},opts:[{pl:'is',en:'is'},{pl:'was',en:'was'},{pl:'be',en:'be'}],a:1,why:{pl:'Mowa zależna — czas cofa się: am → was.',en:'Reported speech — the tense shifts back: am → was.'}}]},
    {t:{pl:'Relative Clauses — who / which / that',en:'Relative Clauses — who / which / that'},
     d:{pl:'Zdania podrzędne dopowiadające, o kim/czym mówimy. Defining (bez przecinków) — określają, O KTÓRE chodzi.',en:'Subordinate clauses adding info about a person/thing. Defining (no commas) — they specify WHICH ONE we mean.'},
     form:{pl:'who → osoby | which → rzeczy/zwierzęta | that → osoby i rzeczy (tylko defining)',en:'who → people | which → things/animals | that → people and things (defining only)'},
     when:[
      {pl:'o osobie — The man who called is my boss.',en:'about a person — The man who called is my boss.'},
      {pl:'o rzeczy — The book that I\'m reading is great.',en:'about a thing — The book that I\'m reading is great.'},
      {pl:'gdy bez klauzuli zdanie gubi sens — I like films that make me think.',en:'when without the clause the meaning is lost — I like films that make me think.'}],
     ex:['The man who called is my boss. — (who = person)','The book that I\'m reading is great. — (that = thing)','The car which he bought was expensive.','I know a girl who speaks five languages.'],
     mistakes:[
      {bad:'The man which called is my boss.',good:'The man who called is my boss.',why:{pl:'O osobach → who lub that, nigdy which.',en:'For people → who or that, never which.'}},
      {bad:'This is the house where I was born in.',good:'This is the house where I was born.',why:{pl:'Po where nie dajemy in/on — where już je zawiera.',en:'No in/on after where — where already contains it.'}}],
     compare:[
      {h:{pl:'Defining (bez przecinków)',en:'Defining (no commas)'},ex:'The students who passed got certificates.',note:{pl:'tylko CI, którzy zdali — klauzula zawęża',en:'only THOSE who passed — the clause narrows it down'}},
      {h:{pl:'Non-defining (z przecinkami)',en:'Non-defining (commas)'},ex:'My students, who passed, got certificates.',note:{pl:'wszyscy zdali — klauzula tylko dopowiada',en:'all of them passed — the clause just adds info'}}],
     remember:{pl:'Who = ludzie, which = rzeczy, that = oba (defining). W defining można pominąć that/which, gdy to obiekt: The book (that) I read.',en:'Who = people, which = things, that = both (defining). In defining clauses you can drop that/which when it\'s the object: The book (that) I read.'},
     quiz:[{q:{pl:'That\'s the girl ___ brother is my friend.',en:'That\'s the girl ___ brother is my friend.'},opts:[{pl:'who',en:'who'},{pl:'whose',en:'whose'},{pl:'which',en:'which'}],a:1,why:{pl:'„Jej brat” → dzierżawcze whose.',en:'"Her brother" → possessive whose.'}}]},
    {t:{pl:'Gerund vs Infinitive (podstawy)',en:'Gerund vs Infinitive (basics)'},
     d:{pl:'Po niektórych czasownikach zawsze -ing, po innych zawsze to + czasownik. To trzeba po prostu zapamiętać w parach.',en:'Some verbs are always followed by -ing, others by to + verb. These simply need to be memorised in pairs.'},
     form:{pl:'gerund: enjoy, finish, mind, avoid, suggest + -ing | infinitive: want, decide, hope, plan, manage + to + verb',en:'gerund: enjoy, finish, mind, avoid, suggest + -ing | infinitive: want, decide, hope, plan, manage + to + verb'},
     when:[
      {pl:'po enjoy/finish/avoid → -ing — I enjoy swimming.',en:'after enjoy/finish/avoid → -ing — I enjoy swimming.'},
      {pl:'po want/decide/hope → to + verb — I want to swim.',en:'after want/decide/hope → to + verb — I want to swim.'},
      {pl:'po przyimkach zawsze -ing — Thank you for coming.',en:'after prepositions always -ing — Thank you for coming.'}],
     ex:['I enjoy swimming. — (after enjoy → gerund)','I want to swim. — (after want → infinitive)','She avoided talking to him. — (after avoid → gerund)','They decided to leave early. — (after decide → infinitive)'],
     mistakes:[
      {bad:'I enjoy to swim.',good:'I enjoy swimming.',why:{pl:'Po enjoy zawsze -ing.',en:'After enjoy always -ing.'}},
      {bad:'I want going home.',good:'I want to go home.',why:{pl:'Po want zawsze to + czasownik.',en:'After want always to + verb.'}}],
     compare:[
      {h:{pl:'stop + -ing',en:'stop + -ing'},ex:'I stopped smoking.',note:{pl:'przestałem palić — koniec czynności',en:'I quit smoking — the activity ended'}},
      {h:{pl:'stop + to + verb',en:'stop + to + verb'},ex:'I stopped to smoke.',note:{pl:'zatrzymałem się, ŻEBY zapalić',en:'I paused IN ORDER TO smoke'}}],
     remember:{pl:'Uwaga na zmianę sensu: stop/remember/try + -ing znaczy co innego niż + to.',en:'Watch meaning changes: stop/remember/try + -ing mean something different from + to.'},
     quiz:[{q:{pl:'I really enjoy ___ books.',en:'I really enjoy ___ books.'},opts:[{pl:'reading',en:'reading'},{pl:'to read',en:'to read'},{pl:'read',en:'read'}],a:0,why:{pl:'Po enjoy zawsze forma -ing.',en:'After enjoy, always the -ing form.'}}]},
    {sec:{pl:'Praktyczne podstawy',en:'Practical Basics'},t:{pl:'Przedimki: a / an / the',en:'Articles: a / an / the'},
     d:{pl:'Najczęstszy błąd Polaków! a/an = „jakiś” (pierwszy raz, niesprecyzowane). the = „ten konkretny” (znany obu stronom).',en:'The most common mistake Polish learners make! a/an = "some" (first mention, unspecific). the = "this particular one" (known to both sides).'},
     form:{pl:'a + spółgłoska (a book), an + samogłoska (an apple), the + znane/unikalne (the sun, the book I bought)',en:'a + consonant (a book), an + vowel (an apple), the + known/unique (the sun, the book I bought)'},
     when:[
      {pl:'pierwsza wzmianka / cokolwiek — I saw a dog.',en:'first mention / any — I saw a dog.'},
      {pl:'druga wzmianka / konkretny — The dog was huge.',en:'second mention / specific — The dog was huge.'},
      {pl:'bez przedimka: ogólnie w l.mn. — I like dogs.',en:'no article: general plural — I like dogs.'},
      {pl:'bez przedimka: posiłki, języki, większość krajów — I have lunch at 1. I speak Polish.',en:'no article: meals, languages, most countries — I have lunch at 1. I speak Polish.'}],
     ex:['I saw a dog. The dog was huge. — (a → the)','She\'s an engineer. — (profession → a/an)','The sun is shining. — (unique thing)','I love music. — (general — no article)'],
     mistakes:[
      {bad:'I am the student.',good:'I am a student.',why:{pl:'Mówisz o sobie jako o „kimś z grupy” → a, nie the.',en:'You describe yourself as "one of a group" → a, not the.'}},
      {bad:'I go to the school to learn. (general meaning)',good:'I go to school.',why:{pl:'Instytucje używane „celowo” (school, bed, work, church) → bez the.',en:'Institutions used for their purpose (school, bed, work, church) → no the.'}}],
     compare:[
      {h:{pl:'a/an',en:'a/an'},ex:'I need a pen.',note:{pl:'jakikolwiek długopis — pierwszy raz, niesprecyzowane',en:'any pen — first mention, unspecific'}},
      {h:{pl:'the',en:'the'},ex:'The pen you gave me is great.',note:{pl:'ten konkretny — oboje wiemy, o który',en:'that specific one — we both know which'}}],
     remember:{pl:'Pytanie-test: „czy słuchacz wie, o który chodzi?” TAK → the. NIE → a/an. Ogólnie w l.mn. → bez przedimka.',en:'Test question: "does the listener know which one?" YES → the. NO → a/an. General plural → no article.'},
     quiz:[{q:{pl:'I bought ___ book yesterday. ___ book is amazing!',en:'I bought ___ book yesterday. ___ book is amazing!'},opts:[{pl:'a … The',en:'a … The'},{pl:'the … A',en:'the … A'},{pl:'a … A',en:'a … A'}],a:0,why:{pl:'Pierwsza wzmianka → a; druga (już znamy) → the.',en:'First mention → a; second (already known) → the.'}}]},
    {t:{pl:'Przyimki czasu: in / on / at',en:'Prepositions of Time: in / on / at'},
     d:{pl:'Trzy poziomy „zegara”: at = godzina (punkt), on = dzień, in = okres dłuższy niż dzień.',en:'Three "clock" levels: at = clock time (a point), on = a day, in = a period longer than a day.'},
     form:{pl:'at + godzina (at 7:30) | on + dzień/data (on Monday, on 5 May) | in + miesiąc/rok/pora (in July, in 2024, in the morning)',en:'at + clock time (at 7:30) | on + day/date (on Monday, on 5 May) | in + month/year/season (in July, in 2024, in the morning)'},
     when:[
      {pl:'at — godziny, night, noon — at 8 o\'clock, at night.',en:'at — clock times, night, noon — at 8 o\'clock, at night.'},
      {pl:'on — dni tygodnia, daty — on Friday, on my birthday.',en:'on — weekdays, dates — on Friday, on my birthday.'},
      {pl:'in — miesiące, lata, pory roku, morning/afternoon/evening — in May, in 1999.',en:'in — months, years, seasons, morning/afternoon/evening — in May, in 1999.'},
      {pl:'BEZ przyimka: today, tomorrow, yesterday, last/next week, every day.',en:'NO preposition: today, tomorrow, yesterday, last/next week, every day.'}],
     ex:['at 7:30, at night, at noon','on Monday, on 3rd June, on Christmas Day','in January, in 2024, in summer, in the morning','last week, next Monday — (no preposition!)'],
     mistakes:[
      {bad:'in Monday',good:'on Monday',why:{pl:'Dni tygodnia → zawsze on.',en:'Weekdays → always on.'}},
      {bad:'at the morning',good:'in the morning',why:{pl:'Morning/afternoon/evening → in (ale: at night!).',en:'Morning/afternoon/evening → in (but: at night!).'}},
      {bad:'on last week',good:'last week',why:{pl:'Last/next/every → bez przyimka.',en:'Last/next/every → no preposition.'}}],
     compare:[
      {h:{pl:'at — punkt',en:'at — a point'},ex:'at 6 pm, at midnight',note:{pl:'dokładny moment na zegarze',en:'an exact moment on the clock'}},
      {h:{pl:'on — dzień',en:'on — a day'},ex:'on Tuesday, on 1 May',note:{pl:'jeden konkretny dzień',en:'one specific day'}},
      {h:{pl:'in — okres',en:'in — a period'},ex:'in March, in 2020',note:{pl:'dłuższy zakres czasu',en:'a longer stretch of time'}}],
     remember:{pl:'Piramida: AT (najmniejsze) → ON (dzień) → IN (największe). Last/next/every — bez przyimka.',en:'Pyramid: AT (smallest) → ON (day) → IN (biggest). Last/next/every — no preposition.'},
     quiz:[{q:{pl:'See you ___ Friday!',en:'See you ___ Friday!'},opts:[{pl:'on',en:'on'},{pl:'in',en:'in'},{pl:'at',en:'at'}],a:0,why:{pl:'Dzień tygodnia → on.',en:'Weekday → on.'}}]},
    {t:{pl:'used to — dawne zwyczaje',en:'used to — past habits'},
     d:{pl:'Coś, co robiliśmy REGULARNIE w przeszłości, ale już nie robimy. Dawny stan lub zwyczaj.',en:'Something we did REGULARLY in the past but no longer do. A past habit or state.'},
     form:{pl:'used to + bezokolicznik: I used to play. Pytanie: Did you use to…? Przeczenie: didn\'t use to…',en:'used to + bare infinitive: I used to play. Question: Did you use to…? Negative: didn\'t use to…'},
     when:[
      {pl:'dawny zwyczaj — I used to smoke. (już nie palę)',en:'past habit — I used to smoke. (I don\'t anymore)'},
      {pl:'dawny stan — There used to be a cinema here.',en:'past state — There used to be a cinema here.'},
      {pl:'kontrast z teraz — I used to hate coffee — now I love it.',en:'contrast with now — I used to hate coffee — now I love it.'}],
     ex:['I used to play football every weekend. — (habit in the past)','Did you use to live in Warsaw? — (question)','She didn\'t use to like spicy food. — (negative)'],
     mistakes:[
      {bad:'I use to play tennis. (about the past)',good:'I used to play tennis.',why:{pl:'W twierdzeniach zawsze used to (z „d”).',en:'In statements always used to (with "d").'}},
      {bad:'I\'m used to wake up early.',good:'I\'m used to waking up early.',why:{pl:'be used to + -ing = „jestem przyzwyczajony” — inna struktura!',en:'be used to + -ing = "I\'m accustomed to" — a different structure!'}}],
     compare:[
      {h:{pl:'used to + verb',en:'used to + verb'},ex:'I used to drink coffee.',note:{pl:'KIEDYŚ piłem — już nie',en:'I USED TO drink it — not anymore'}},
      {h:{pl:'be used to + -ing',en:'be used to + -ing'},ex:'I\'m used to drinking coffee.',note:{pl:'JESTEM przyzwyczajony do picia',en:'I\'m ACCUSTOMED to drinking it'}}],
     remember:{pl:'used to + czasownik = kiedyś (już nie). be used to + -ing = jestem przyzwyczajony. get used to = przyzwyczajam się.',en:'used to + verb = in the past (not now). be used to + -ing = accustomed. get used to = becoming accustomed.'},
     quiz:[{q:{pl:'I ___ play the piano, but I stopped years ago.',en:'I ___ play the piano, but I stopped years ago.'},opts:[{pl:'used to',en:'used to'},{pl:'use to',en:'use to'},{pl:'am used to',en:'am used to'}],a:0,why:{pl:'Dawny zwyczaj, którego już nie ma → used to.',en:'A past habit that\'s over → used to.'}}]},
    {t:{pl:'Pytania na co dzień — do / does / did',en:'Everyday questions — do / does / did'},
     d:{pl:'Żeby zapytać o czynność, na początku zdania stawiamy „do” (I/you/we/they), „does” (he/she/it) albo „did” (przeszłość). Reszta zdania zostaje bez zmian.',en:'To ask about an action, put "do" (I/you/we/they), "does" (he/she/it) or "did" (past) at the start. The rest of the sentence stays the same.'},
     form:{pl:'Do you work here? · Does she speak English? · Did you sleep well?',en:'Do you work here? · Does she speak English? · Did you sleep well?'},
     ex:['Do you like coffee? — (Lubisz kawę?)','Does he work here? — (Czy on tu pracuje?)','What do you do? — (Czym się zajmujesz?)','Where do you live? — (Gdzie mieszkasz?)','Did you see that? — (Widziałeś to?)','When does the bus leave? — (Kiedy odjeżdża autobus?)'],
     mistakes:[
      {bad:'You like coffee?',good:'Do you like coffee?',why:{pl:'O czynność pytamy z „do/does/did” na początku.',en:'For actions we ask with "do/does/did" at the start.'}},
      {bad:'Does she works here?',good:'Does she work here?',why:{pl:'Po does czasownik jest bez „-s” — „does” już je ma.',en:'After does the verb has no "-s" — "does" already carries it.'}}],
     remember:{pl:'he/she/it → does (czasownik bez -s) · przeszłość → did (czasownik bez -ed).',en:'he/she/it → does (verb without -s) · past → did (verb without -ed).'},
     quiz:[{q:{pl:'___ your brother live in Kraków?',en:'___ your brother live in Kraków?'},opts:[{pl:'Do',en:'Do'},{pl:'Does',en:'Does'},{pl:'Is',en:'Is'}],a:1,why:{pl:'Your brother = he → does.',en:'Your brother = he → does.'}}]}
   ],
   b2:[
    {sec:{pl:'Zaawansowane tryby warunkowe',en:'Advanced Conditionals'},t:{pl:'Trzeci tryb warunkowy',en:'Third Conditional'},
     d:{pl:'Żal za niespełnionym warunkiem w PRZESZŁOŚCI — stało się, nie da się zmienić.',en:'Regret about an unfulfilled PAST condition — it happened, it can\'t be changed.'},
     form:{pl:'If + Past Perfect, … would have + 3. forma',en:'If + Past Perfect, … would have + past participle'},
     when:[
      {pl:'żal za przeszłością — If I had studied, I would have passed.',en:'past regret — If I had studied, I would have passed.'},
      {pl:'krytyka czyjegoś działania — If you had listened, this wouldn\'t have happened.',en:'criticising an action — If you had listened, this wouldn\'t have happened.'},
      {pl:'hipoteza o przeszłości — What would you have done?',en:'hypothesis about the past — What would you have done?'}],
     ex:['If I had studied harder, I would have passed. — (I didn\'t study)','She wouldn\'t have been late if she had set an alarm.','If they had left earlier, they would have caught the train.','Would you have helped me if I had asked?'],
     mistakes:[
      {bad:'If I would have studied, I would have passed.',good:'If I had studied, I would have passed.',why:{pl:'Po if → Past Perfect (had + 3. forma), nigdy would have.',en:'After if → Past Perfect (had + pp), never would have.'}},
      {bad:'If I had studied, I would passed.',good:'If I had studied, I would have passed.',why:{pl:'W wyniku: would HAVE + 3. forma.',en:'In the result: would HAVE + past participle.'}}],
     compare:[
      {h:{pl:'Second Conditional',en:'Second Conditional'},ex:'If I studied more, I would pass.',note:{pl:'nierealne TERAZ — jeszcze mogę to zmienić',en:'unreal NOW — I can still change it'}},
      {h:{pl:'Third Conditional',en:'Third Conditional'},ex:'If I had studied, I would have passed.',note:{pl:'nierealne W PRZESZŁOŚCI — już po wszystkim',en:'unreal IN THE PAST — it\'s over'}}],
     remember:{pl:'Formuła: If I had done X, I would have done Y. Oba dotyczą przeszłości.',en:'Formula: If I had done X, I would have done Y. Both clauses refer to the past.'},
     quiz:[{q:{pl:'If we ___ earlier, we wouldn\'t have missed the flight.',en:'If we ___ earlier, we wouldn\'t have missed the flight.'},opts:[{pl:'had left',en:'had left'},{pl:'left',en:'left'},{pl:'would have left',en:'would have left'}],a:0,why:{pl:'Po if → Past Perfect (had left).',en:'After if → Past Perfect (had left).'}}]},
    {t:{pl:'Mixed Conditional',en:'Mixed Conditional'},
     d:{pl:'Mieszanka: PRZESZŁA przyczyna → TERAŹNIEJSZY skutek. Najczęstszy typ: „gdybym wtedy…, to teraz…”.',en:'A mix: PAST cause → PRESENT result. The most common type: "if I had then…, I would now…".'},
     form:{pl:'If + Past Perfect (przeszłość), … would + bezokolicznik (teraz)',en:'If + Past Perfect (past), … would + bare infinitive (now)'},
     when:[
      {pl:'przeszła decyzja → dziś inaczej — If I had taken that job, I would be rich now.',en:'past decision → different today — If I had taken that job, I would be rich now.'},
      {pl:'przeszły stan → teraźniejszy skutek — If she hadn\'t emigrated, she would be living here now.',en:'past state → present result — If she hadn\'t emigrated, she would be living here now.'}],
     ex:['If I had taken that job (PP), I would be rich now (present).','If she hadn\'t emigrated, she would be living here now.','If he had studied medicine, he would be a doctor today.'],
     mistakes:[
      {bad:'If I had taken that job, I would have been rich now.',good:'If I had taken that job, I would be rich now.',why:{pl:'Skutek jest TERAZ → would be (nie would have been).',en:'The result is NOW → would be (not would have been).'}}],
     compare:[
      {h:{pl:'Third Conditional',en:'Third Conditional'},ex:'If I had taken the job, I would have become rich.',note:{pl:'skutek też w przeszłości',en:'the result is also past'}},
      {h:{pl:'Mixed Conditional',en:'Mixed Conditional'},ex:'If I had taken the job, I would be rich now.',note:{pl:'przeszła przyczyna → skutek TERAZ',en:'past cause → result NOW'}}],
     remember:{pl:'Mixed = przeszłe „if” (had + 3. forma) + teraźniejszy skutek (would + infinitive). Słowo-klucz: now/today.',en:'Mixed = past "if" (had + pp) + present result (would + inf). Key word: now/today.'},
     quiz:[{q:{pl:'If I had learned English earlier, I ___ fluent now.',en:'If I had learned English earlier, I ___ fluent now.'},opts:[{pl:'would be',en:'would be'},{pl:'would have been',en:'would have been'},{pl:'will be',en:'will be'}],a:0,why:{pl:'„now” → skutek teraźniejszy → would be.',en:'"now" → present result → would be.'}}]},
    {t:{pl:'Wish / If only / I\'d rather',en:'Wish / If only / I\'d rather'},
     d:{pl:'Wyrażanie żalu i życzeń. Wish + Past Simple = żal o TERAZ. Wish + Past Perfect = żal o PRZESZŁOŚCI.',en:'Expressing regrets and wishes. Wish + Past Simple = regret about NOW. Wish + Past Perfect = regret about the PAST.'},
     form:{pl:'wish + Past Simple (I wish I knew) | wish + Past Perfect (I wish I had known) | wish + would (I wish you would stop)',en:'wish + Past Simple (I wish I knew) | wish + Past Perfect (I wish I had known) | wish + would (I wish you would stop)'},
     when:[
      {pl:'żal o teraźniejszości — I wish I knew the answer.',en:'regret about the present — I wish I knew the answer.'},
      {pl:'żal o przeszłości — I wish I hadn\'t said that.',en:'regret about the past — I wish I hadn\'t said that.'},
      {pl:'irytacja cudzym zachowaniem — I wish you would stop shouting.',en:'annoyance at someone\'s behaviour — I wish you would stop shouting.'},
      {pl:'silniejszy żal — If only I had more time!',en:'stronger regret — If only I had more time!'},
      {pl:'preferencja — I\'d rather you didn\'t smoke here.',en:'preference — I\'d rather you didn\'t smoke here.'}],
     ex:['I wish I knew the answer. — (I don\'t know now / nie wiem)','I wish I hadn\'t said that. — (past regret / żal za przeszłością)','If only I had more time! — (strong regret / silny żal)','I\'d rather you didn\'t smoke here. — (preference / wolałbym)'],
     mistakes:[
      {bad:'I wish I know the answer.',good:'I wish I knew the answer.',why:{pl:'Po wish o teraz → Past Simple (knew).',en:'Wish about the present → Past Simple (knew).'}},
      {bad:'I wish I didn\'t say that yesterday.',good:'I wish I hadn\'t said that yesterday.',why:{pl:'Żal o przeszłości → Past Perfect.',en:'Regret about the past → Past Perfect.'}}],
     compare:[
      {h:{pl:'wish + Past Simple',en:'wish + Past Simple'},ex:'I wish I lived by the sea.',note:{pl:'żal o TERAZ — nie mieszkam nad morzem',en:'regret about NOW — I don\'t live by the sea'}},
      {h:{pl:'wish + Past Perfect',en:'wish + Past Perfect'},ex:'I wish I had bought that flat.',note:{pl:'żal o PRZESZŁOŚCI — nie kupiłem',en:'regret about the PAST — I didn\'t buy it'}}],
     remember:{pl:'Wish działa jak tryb warunkowy: teraz → Past Simple, przeszłość → Past Perfect. If only = mocniejsze.',en:'Wish works like conditionals: present → Past Simple, past → Past Perfect. If only = stronger.'},
     quiz:[{q:{pl:'I wish I ___ more attention at school. (żal za przeszłością)',en:'I wish I ___ more attention at school. (past regret)'},opts:[{pl:'had paid',en:'had paid'},{pl:'paid',en:'paid'},{pl:'would pay',en:'would pay'}],a:0,why:{pl:'Żal o przeszłości → Past Perfect (had paid).',en:'Regret about the past → Past Perfect (had paid).'}}]},
    {sec:{pl:'Zaawansowana strona bierna',en:'Advanced Passive'},t:{pl:'Passive Voice — wszystkie czasy',en:'Passive Voice — all tenses'},
     d:{pl:'Strona bierna we wszystkich czasach. Formuła: odpowiednia forma „be” + 3. forma (past participle).',en:'Passive voice in all tenses. Formula: the correct form of "be" + past participle.'},
     form:{pl:'be + 3. forma; czas kryje się w „be”: is done / was done / has been done / is being done / will be done / should be done',en:'be + past participle; the tense hides in "be": is done / was done / has been done / is being done / will be done / should be done'},
     when:[
      {pl:'Present Simple — The office is cleaned daily.',en:'Present Simple — The office is cleaned daily.'},
      {pl:'Present Perfect — The report has been written.',en:'Present Perfect — The report has been written.'},
      {pl:'Future — The bridge will be repaired next year.',en:'Future — The bridge will be repaired next year.'},
      {pl:'Continuous — The house is being painted.',en:'Continuous — The house is being painted.'},
      {pl:'Modal — It should be done by Friday.',en:'Modal — It should be done by Friday.'}],
     ex:['The report has been written. — (Present Perfect Passive)','The bridge will be repaired next year. — (Future Passive)','The house is being painted. — (Present Continuous Passive)','It should be done by Friday. — (Modal Passive)'],
     mistakes:[
      {bad:'The house is being paint.',good:'The house is being painted.',why:{pl:'Zawsze 3. forma (painted), nigdy bezokolicznik.',en:'Always past participle (painted), never the infinitive.'}},
      {bad:'It should been done.',good:'It should be done.',why:{pl:'Po modalu → be + 3. forma (bez „been”).',en:'After a modal → be + pp (no "been").'}}],
     compare:[
      {h:{pl:'is being done',en:'is being done'},ex:'The road is being repaired.',note:{pl:'dzieje się TERAZ — trwa',en:'happening NOW — in progress'}},
      {h:{pl:'has been done',en:'has been done'},ex:'The road has been repaired.',note:{pl:'już ZROBIONE — efekt widoczny',en:'already DONE — visible result'}}],
     remember:{pl:'Czas siedzi w „be”, nie w czasowniku głównym — ten zawsze jest w 3. formie.',en:'The tense lives in "be", not in the main verb — that one is always the past participle.'},
     quiz:[{q:{pl:'The documents ___ yesterday. (Past Simple Passive)',en:'The documents ___ yesterday. (Past Simple Passive)'},opts:[{pl:'were sent',en:'were sent'},{pl:'was sent',en:'was sent'},{pl:'are sent',en:'are sent'}],a:0,why:{pl:'L. mn. + przeszłość → were sent.',en:'Plural + past → were sent.'}}]},
    {t:{pl:'Causative: have / get sth done',en:'Causative: have / get sth done'},
     d:{pl:'Zlecamy czynność komuś innemu — TY nie robisz, ktoś robi dla ciebie. have/get + obiekt + 3. forma.',en:'We arrange for someone else to do something — YOU don\'t do it. have/get + object + past participle.'},
     form:{pl:'have/get + obiekt + 3. forma: I had my car repaired. / She\'s getting her hair cut.',en:'have/get + object + past participle: I had my car repaired. / She\'s getting her hair cut.'},
     when:[
      {pl:'usługa zlecona — I had my car repaired. (mechanik to zrobił)',en:'outsourced service — I had my car repaired. (a mechanic did it)'},
      {pl:'planowana usługa — She\'s getting her hair cut tomorrow.',en:'a booked service — She\'s getting her hair cut tomorrow.'},
      {pl:'potrzeba zlecenia — We need to get the boiler fixed.',en:'the need to outsource — We need to get the boiler fixed.'}],
     ex:['I had my car repaired. — (someone repaired it for me)','She\'s getting her hair cut tomorrow. — (appointment)','We need to get the boiler fixed. — (need someone to fix)','Have you had your eyes tested recently?'],
     mistakes:[
      {bad:'I repaired my car yesterday. (when a mechanic did it)',good:'I had my car repaired yesterday.',why:{pl:'Jeśli zleciłeś komuś — causative, nie zwykły Past Simple.',en:'If you outsourced it — causative, not plain Past Simple.'}},
      {bad:'I had repaired my car. (o zleceniu)',good:'I had my car repaired.',why:{pl:'Kolejność: had + OBIEKT + 3. forma.',en:'Order: had + OBJECT + past participle.'}}],
     compare:[
      {h:{pl:'have sth done',en:'have sth done'},ex:'I had the documents checked.',note:{pl:'neutralne / bardziej formalne',en:'neutral / more formal'}},
      {h:{pl:'get sth done',en:'get sth done'},ex:'I got the documents checked.',note:{pl:'potoczne, „załatwiłem”',en:'informal, "I got it sorted"'}}],
     remember:{pl:'Have sth done = bardziej formalne. Get sth done = potoczne. W obu TY nie robisz — ktoś inny robi dla ciebie.',en:'Have sth done = more formal. Get sth done = more informal. In both cases YOU don\'t do it — someone does it for you.'},
     quiz:[{q:{pl:'I ___ at the dentist\'s yesterday.',en:'I ___ at the dentist\'s yesterday.'},opts:[{pl:'had my tooth filled',en:'had my tooth filled'},{pl:'filled my tooth',en:'filled my tooth'},{pl:'had filled my tooth',en:'had filled my tooth'}],a:0,why:{pl:'Dentysta zrobił to za mnie → had + obiekt + 3. forma.',en:'The dentist did it for me → had + object + past participle.'}}]},
    {sec:{pl:'Zaawansowana gramatyka',en:'Advanced Grammar'},t:{pl:'Non-defining Relative Clauses',en:'Non-defining Relative Clauses'},
     d:{pl:'Dodatkowa informacja w przecinkach — NIE ogranicza sensu zdania głównego. Zawsze przecinki, nigdy „that”.',en:'Extra information in commas — it does NOT restrict the main clause. Always commas, never "that".'},
     form:{pl:'podmiot, who/which/whose + klauzula, + reszta zdania: My brother, who lives in Gdańsk, is a doctor.',en:'subject, who/which/whose + clause, + rest of sentence: My brother, who lives in Gdańsk, is a doctor.'},
     when:[
      {pl:'dodatkowa info o osobie — My brother, who lives in Gdańsk, is a doctor.',en:'extra info about a person — My brother, who lives in Gdańsk, is a doctor.'},
      {pl:'dodatkowa info o rzeczy — The Eiffel Tower, which was built in 1889, is iconic.',en:'extra info about a thing — The Eiffel Tower, which was built in 1889, is iconic.'},
      {pl:'komentarz do całego zdania — She gave me a lift, which was very kind of her.',en:'comment on the whole sentence — She gave me a lift, which was very kind of her.'}],
     ex:['My brother, who lives in Gdańsk, is a doctor. — (extra info)','The Eiffel Tower, which was built in 1889, is iconic.','She gave me a lift, which was very kind of her. — (which = the whole action)'],
     mistakes:[
      {bad:'My brother, that lives in Gdańsk, is a doctor.',good:'My brother, who lives in Gdańsk, is a doctor.',why:{pl:'W non-defining nigdy „that” — tylko who/which.',en:'In non-defining clauses never "that" — only who/which.'}},
      {bad:'My brother who lives in Gdańsk is a doctor. (about an only brother)',good:'My brother, who lives in Gdańsk, is a doctor.',why:{pl:'Bez przecinków brzmi, jakbyś miał kilku braci.',en:'Without commas it sounds like you have several brothers.'}}],
     compare:[
      {h:{pl:'defining (bez przecinków)',en:'defining (no commas)'},ex:'The students who passed were happy.',note:{pl:'tylko CI, którzy zdali — ogranicza grupę',en:'only THOSE who passed — restricts the group'}},
      {h:{pl:'non-defining (z przecinkami)',en:'non-defining (with commas)'},ex:'The students, who passed, were happy.',note:{pl:'wszyscy zdali — dodatkowa informacja',en:'all of them passed — extra information'}}],
     remember:{pl:'Usuń klauzulę nieograniczającą → zdanie nadal ma pełny sens. Usuń ograniczającą (defining) → zdanie traci sens.',en:'Remove a non-defining clause → the sentence still makes full sense. Remove a defining clause → it loses its meaning.'},
     quiz:[{q:{pl:'My house, ___ is over 100 years old, needs renovation.',en:'My house, ___ is over 100 years old, needs renovation.'},opts:[{pl:'which',en:'which'},{pl:'that',en:'that'},{pl:'who',en:'who'}],a:0,why:{pl:'Non-defining + rzecz → which (nigdy that).',en:'Non-defining + thing → which (never that).'}}]},
    {t:{pl:'Inversion for Emphasis',en:'Inversion for Emphasis'},
     d:{pl:'Inwersja podmiot-orzeczenie dla wzmocnienia lub w stylu formalnym. Słowa sygnałowe: Never, Not only, Rarely, Seldom, Hardly, No sooner.',en:'Subject-verb inversion for emphasis or formal style. Triggers: Never, Not only, Rarely, Seldom, Hardly, No sooner.'},
     form:{pl:'słowo sygnałowe + POMOCNIK + podmiot + reszta: Never have I seen… / Not only did he lie…',en:'trigger + AUXILIARY + subject + rest: Never have I seen… / Not only did he lie…'},
     when:[
      {pl:'wzmocnienie emocji — Never have I seen such a mess!',en:'emotional emphasis — Never have I seen such a mess!'},
      {pl:'styl formalny (eseje) — Rarely does she make mistakes.',en:'formal style (essays) — Rarely does she make mistakes.'},
      {pl:'Not only… but also — Not only did he lie, but he also stole.',en:'Not only… but also — Not only did he lie, but he also stole.'},
      {pl:'Hardly/No sooner + Past Perfect — No sooner had I left than it started raining.',en:'Hardly/No sooner + Past Perfect — No sooner had I left than it started raining.'}],
     ex:['Never have I seen such a mess. — (Never + aux + subject)','Not only did he lie, but he also stole. — (Not only + did + subject)','Rarely does she make mistakes. — (Rarely + does + subject)','No sooner had I left than it started raining.'],
     mistakes:[
      {bad:'Never I have seen such a mess.',good:'Never have I seen such a mess.',why:{pl:'Po słowie sygnałowym → inwersja: pomocnik PRZED podmiotem.',en:'After a trigger → inversion: auxiliary BEFORE the subject.'}},
      {bad:'Not only he lied, but he also stole.',good:'Not only did he lie, but he also stole.',why:{pl:'Not only + did + podmiot + bezokolicznik.',en:'Not only + did + subject + bare infinitive.'}}],
     compare:[
      {h:{pl:'normalna kolejność',en:'normal order'},ex:'I have never seen such a mess.',note:{pl:'neutralnie, codziennie',en:'neutral, everyday'}},
      {h:{pl:'inwersja',en:'inversion'},ex:'Never have I seen such a mess!',note:{pl:'emfaza / styl formalny',en:'emphasis / formal style'}}],
     remember:{pl:'Formuła: POMOCNIK + podmiot + reszta. Never have I… (nie: Never I have). Typowe w piśmie formalnym.',en:'Formula: AUXILIARY + subject + rest. Never have I… (not: Never I have). Typical in formal writing.'},
     quiz:[{q:{pl:'___ such a talented musician! (nigdy nie spotkałem)',en:'___ such a talented musician! (never met)'},opts:[{pl:'Never have I met',en:'Never have I met'},{pl:'Never I have met',en:'Never I have met'},{pl:'I have never met',en:'I have never met'}],a:0,why:{pl:'Never na początku → inwersja: have I met.',en:'Never at the start → inversion: have I met.'}}]},
    {t:{pl:'Cleft Sentences',en:'Cleft Sentences'},
     d:{pl:'Wyróżnienie (akcentowanie) wybranego elementu zdania. Dwie struktury: It is/was… that/who oraz What… is/was.',en:'Highlighting a specific element of a sentence. Two structures: It is/was… that/who and What… is/was.'},
     form:{pl:'It is/was + akcentowany element + that/who… | What + klauzula + is/was…',en:'It is/was + highlighted element + that/who… | What + clause + is/was…'},
     when:[
      {pl:'akcent na OSOBIE — It was John who broke the window.',en:'focus on a PERSON — It was John who broke the window.'},
      {pl:'akcent na MIEJSCU/czasie — It was in Rome that we first met.',en:'focus on PLACE/time — It was in Rome that we first met.'},
      {pl:'akcent na RZECZY/potrzebie — What I need is a long holiday.',en:'focus on a THING/need — What I need is a long holiday.'},
      {pl:'akcent na reakcji/zdarzeniu — What surprised me was his reaction.',en:'focus on a reaction/event — What surprised me was his reaction.'}],
     ex:['It was John who broke the window. — (not someone else)','It was in Rome that we first met. — (in Rome specifically)','What I need is a long holiday. — (what I need)','What surprised me was his reaction.'],
     mistakes:[
      {bad:'What I need it is a holiday.',good:'What I need is a holiday.',why:{pl:'Po What-klauzuli → od razu is/was, bez „it”.',en:'After a What-clause → straight to is/was, no "it".'}},
      {bad:'It was John which broke the window.',good:'It was John who broke the window.',why:{pl:'Osoba → who (nie which).',en:'A person → who (not which).'}}],
     compare:[
      {h:{pl:'It-cleft',en:'It-cleft'},ex:'It was Anna who called.',note:{pl:'akcent: ANNA (nie ktoś inny)',en:'focus: ANNA (not someone else)'}},
      {h:{pl:'What-cleft',en:'What-cleft'},ex:'What I want is peace.',note:{pl:'akcent: to, CZEGO chcę',en:'focus: WHAT I want'}}],
     remember:{pl:'It was X who/that… = akcent na X. What… is/was Y = akcent na Y. Używaj, by brzmieć naturalniej i precyzyjniej.',en:'It was X who/that… = focus on X. What… is/was Y = focus on Y. Use them to sound more natural and precise.'},
     quiz:[{q:{pl:'___ I really enjoyed was the dessert.',en:'___ I really enjoyed was the dessert.'},opts:[{pl:'What',en:'What'},{pl:'It',en:'It'},{pl:'That',en:'That'}],a:0,why:{pl:'What-klauzula na początku + was → What.',en:'What-clause at the start + was → What.'}}]},
    {t:{pl:'Participle Clauses',en:'Participle Clauses'},
     d:{pl:'Skracają zdania podrzędne (czasowe, przyczynowe). Present participle (-ing) lub Past participle (3. forma). Typowe w piśmie formalnym.',en:'They shorten subordinate clauses (time, reason). Present participle (-ing) or past participle (pp). Typical in formal writing.'},
     form:{pl:'-ing klauzula: Seeing the car, she ran away. | Having + 3. f.: Having finished, he left. | 3. f.: Exhausted, she slept.',en:'-ing clause: Seeing the car, she ran away. | Having + pp: Having finished, he left. | pp: Exhausted, she slept.'},
     when:[
      {pl:'czas (= when) — Seeing the car, she ran away.',en:'time (= when) — Seeing the car, she ran away.'},
      {pl:'kolejność (= after) — Having finished, he left.',en:'sequence (= after) — Having finished, he left.'},
      {pl:'przyczyna (= because) — Exhausted by the journey, she went to bed.',en:'reason (= because) — Exhausted by the journey, she went to bed.'}],
     ex:['Seeing the car, she ran away. — (= When she saw the car)','Having finished, he left. — (= After he had finished)','Exhausted by the journey, she went to bed. — (= Because she was exhausted)'],
     mistakes:[
      {bad:'Walking down the street, it started raining.',good:'Walking down the street, I got caught in the rain.',why:{pl:'Imiesłów MUSI dotyczyć podmiotu zdania głównego (I, nie it).',en:'The participle MUST refer to the main-clause subject (I, not it).'}},
      {bad:'Having finished the work, the TV was turned on.',good:'Having finished the work, he turned on the TV.',why:{pl:'To ON skończył pracę — podmiot musi się zgadzać.',en:'HE finished the work — the subjects must match.'}}],
     compare:[
      {h:{pl:'Seeing… (równocześnie)',en:'Seeing… (simultaneous)'},ex:'Walking home, I called her.',note:{pl:'dwie czynności naraz',en:'two actions at once'}},
      {h:{pl:'Having seen… (wcześniej)',en:'Having seen… (earlier)'},ex:'Having read the email, I replied.',note:{pl:'najpierw przeczytałem, potem odpisałem',en:'first I read it, then I replied'}}],
     remember:{pl:'Imiesłów MUSI dotyczyć podmiotu zdania głównego! „Walking down the street, it started raining” → BŁĄD.',en:'The participle MUST refer to the subject of the main clause! "Walking down the street, it started raining" → WRONG.'},
     quiz:[{q:{pl:'___ the news, she started to cry. (= When she heard)',en:'___ the news, she started to cry. (= When she heard)'},opts:[{pl:'Hearing',en:'Hearing'},{pl:'Heard',en:'Heard'},{pl:'Having hearded',en:'Having hearded'}],a:0,why:{pl:'Równoczesna czynność, aktywna → -ing (Hearing).',en:'Simultaneous active action → -ing (Hearing).'}}]}
   ]
  },
  {id:'vocabulary',emoji:'📚',title:{pl:'Słownictwo',en:'Vocabulary'},sub:{pl:'Tematy leksykalne i rejestry',en:'Lexical topics and registers'},
   b1:[
    {sec:{pl:'Codzienne tematy',en:'Everyday Topics'},t:{pl:'Praca i kariera',en:'Work & Career'},
     d:{pl:'Zawody: accountant, engineer, nurse, plumber. Czynności: apply for a job, get promoted, resign, be made redundant. Kolokacje: meet a deadline, attend a meeting.',en:'Jobs: accountant, engineer, nurse, plumber. Actions: apply for a job, get promoted, resign, be made redundant. Collocations: meet a deadline, attend a meeting.'},
     ex:['She applied for a marketing job and got an interview.','He was made redundant when the company downsized.','We need to meet the deadline — the project is due on Friday.','I work the night shift three times a week.']},
    {t:{pl:'Podróże i transport',en:'Travel & Transport'},
     d:{pl:'Booking: book/reserve, check in/out, cancel. Transport: catch/miss a connection, take the train. Lotnisko: departure, arrivals, boarding gate, customs.',en:'Booking: book/reserve, check in/out, cancel. Transport: catch/miss a connection, take the train. Airport: departure, arrivals, boarding gate, customs.'},
     ex:['I\'d like to book a double room for three nights.','We missed our connecting flight and had to wait 6 hours.','Passengers should arrive at the boarding gate 30 minutes early.']},
    {t:{pl:'Zdrowie i ciało',en:'Health & Body'},
     d:{pl:'Choroby: headache, fever, cough, rash, food poisoning. Wizyta lekarska: prescription, diagnosis, treatment, symptoms.',en:'Illnesses: headache, fever, cough, rash, food poisoning. Medical visit: prescription, diagnosis, treatment, symptoms.'},
     ex:['I\'ve had a headache all day — I need to take a painkiller.','The doctor prescribed antibiotics for the infection.','She\'s allergic to penicillin — it\'s on her medical records.']},
    {t:{pl:'Jedzenie i gotowanie',en:'Food & Cooking'},
     d:{pl:'Metody: bake, fry, boil, grill, steam, roast, simmer. Restauracja: starter, main course, dessert, bill, tip. Smak: tasty, bland, bitter, sour, spicy.',en:'Methods: bake, fry, boil, grill, steam, roast, simmer. Restaurant: starter, main course, dessert, bill, tip. Taste: tasty, bland, bitter, sour, spicy.'},
     ex:['Could we have the bill, please? We\'d like to pay separately.','The steak was overdone — I asked for medium-rare.','I always add a pinch of salt when boiling pasta.']},
    {t:{pl:'Technologia i internet',en:'Technology & Internet'},
     d:{pl:'Czynności: download, upload, browse, stream, charge, update, back up. Social media: post, share, follow, like, comment, go viral.',en:'Actions: download, upload, browse, stream, charge, update, back up. Social media: post, share, follow, like, comment, go viral.'},
     ex:['Don\'t forget to back up your files before the update.','The video went viral — it got 10 million views overnight.','My phone died again — I forgot to charge it.']},
    {t:{pl:'Pieniądze i zakupy',en:'Money & Shopping'},
     d:{pl:'Bankowość: mortgage, loan, interest rate, overdraft. Zakupy: afford, bargain, discount, refund, exchange.',en:'Banking: mortgage, loan, interest rate, overdraft. Shopping: afford, bargain, discount, refund, exchange.'},
     ex:['I can\'t afford a new laptop right now — I\'ll save up.','The item was damaged, so I asked for a full refund.','They\'re offering a 30% discount if you buy before midnight.']},
    {t:{pl:'Relacje i uczucia',en:'Relationships & Feelings'},
     d:{pl:'Relacje: colleague, neighbour, acquaintance. Uczucia: proud, jealous, anxious, relieved, frustrated, embarrassed, overwhelmed, homesick.',en:'Relationships: colleague, neighbour, acquaintance. Feelings: proud, jealous, anxious, relieved, frustrated, embarrassed, overwhelmed, homesick.'},
     ex:['I felt really embarrassed when I forgot her name.','She was relieved when the test results came back fine.','He\'s been homesick ever since he moved abroad.']},
    {t:{pl:'Czas, data i pogoda',en:'Time, Date & Weather'},
     d:{pl:'Czas: today — dziś, tomorrow — jutro, yesterday — wczoraj, now — teraz, later — później, soon — wkrótce. Pogoda: sunny — słonecznie, cloudy — pochmurno, rain — deszcz, snow — śnieg, wind — wiatr, hot — gorąco, cold — zimno.',en:'Time: today, tomorrow, yesterday, now, later, soon. Weather: sunny, cloudy, rain, snow, wind, hot, cold.'},
     ex:['It\'s sunny today. — (Dziś jest słonecznie.)','It\'s raining. Take an umbrella! — (Pada deszcz. Weź parasol!)','See you tomorrow! — (Do zobaczenia jutro!)','It\'s cold outside. Wear a jacket! — (Na dworze jest zimno. Ubierz kurtkę!)'],
     quiz:[{q:{pl:'„jutro” po angielsku to:',en:'„tomorrow” means:'},opts:[{pl:'yesterday',en:'yesterday'},{pl:'tomorrow',en:'tomorrow'},{pl:'today',en:'today'}],a:1,why:{pl:'tomorrow = jutro.',en:'tomorrow = jutro.'}}]},
    {t:{pl:'Dom i mieszkanie',en:'Home & Flat'},
     d:{pl:'flat — mieszkanie, house — dom, room — pokój, kitchen — kuchnia, bathroom — łazienka, bedroom — sypialnia, living room — salon, key — klucz, rent — czynsz, neighbour — sąsiad.',en:'flat, house, room, kitchen, bathroom, bedroom, living room, key, rent, neighbour.'},
     ex:['I live in a small flat. — (Mieszkam w małym mieszkaniu.)','The kitchen is next to the living room. — (Kuchnia jest obok salonu.)','I pay the rent every month. — (Płacę czynsz co miesiąc.)','My neighbours are very friendly. — (Moi sąsiedzi są bardzo mili.)'],
     quiz:[{q:{pl:'„łazienka” po angielsku to:',en:'„bathroom” means:'},opts:[{pl:'kitchen',en:'kitchen'},{pl:'bathroom',en:'bathroom'},{pl:'bedroom',en:'bedroom'}],a:1,why:{pl:'bathroom = łazienka.',en:'bathroom = łazienka.'}}]},
    {t:{pl:'Zakupy i pieniądze',en:'Shopping & Money'},
     d:{pl:'shop — sklep, price — cena, cheap — tani, expensive — drogi, cash — gotówka, card — karta, receipt — paragon, change — reszta, sale — wyprzedaż, size — rozmiar.',en:'shop, price, cheap, expensive, cash, card, receipt, change, sale, size.'},
     ex:['This jacket is too expensive. — (Ta kurtka jest za droga.)','Can I pay in cash? — (Czy mogę zapłacić gotówką?)','Keep the receipt. — (Zachowaj paragon.)','Here is your change. — (Proszę, twoja reszta.)','What size are you? — (Jaki masz rozmiar?)'],
     quiz:[{q:{pl:'„tani” po angielsku to:',en:'„cheap” means:'},opts:[{pl:'expensive',en:'expensive'},{pl:'cheap',en:'cheap'},{pl:'sale',en:'sale'}],a:1,why:{pl:'cheap = tani.',en:'cheap = tani.'}}]},
    {t:{pl:'Rodzina i ludzie',en:'Family & People'},
     d:{pl:'mother — mama, father — tata, parents — rodzice, brother — brat, sister — siostra, son — syn, daughter — córka, husband — mąż, wife — żona, friend — przyjaciel.',en:'mother, father, parents, brother, sister, son, daughter, husband, wife, friend.'},
     ex:['My mother\'s name is Fatima. — (Moja mama ma na imię Fatima.)','I have two brothers. — (Mam dwóch braci.)','Her husband works in a hospital. — (Jej mąż pracuje w szpitalu.)','We visit our parents every week. — (Odwiedzamy rodziców co tydzień.)'],
     quiz:[{q:{pl:'„siostra” po angielsku to:',en:'„sister” means:'},opts:[{pl:'daughter',en:'daughter'},{pl:'sister',en:'sister'},{pl:'wife',en:'wife'}],a:1,why:{pl:'sister = siostra.',en:'sister = siostra.'}}]},
    {t:{pl:'Urząd i dokumenty',en:'Office & Documents'},
     d:{pl:'document — dokument, form — formularz, signature — podpis, ID card — dowód osobisty, passport — paszport, appointment — umówiona wizyta, queue — kolejka, office — urząd.',en:'document, form, signature, ID card, passport, appointment, queue, office.'},
     ex:['I need to fill in this form. — (Muszę wypełnić ten formularz.)','Sign here, please. — (Proszę się tu podpisać.)','I have an appointment at 10. — (Mam wizytę na 10.)','Can I take a number? — (Czy mogę wziąć numerek?)','How long do I have to wait? — (Jak długo muszę czekać?)'],
     remember:{pl:'fill in a form = wypełnić formularz · sign = podpisać.',en:'fill in a form · sign.'},
     quiz:[{q:{pl:'„podpis” po angielsku to:',en:'"signature" means:'},opts:[{pl:'signature',en:'signature'},{pl:'document',en:'document'},{pl:'form',en:'form'}],a:0,why:{pl:'signature = podpis.',en:'signature = podpis.'}}]},
    {t:{pl:'Na mieście — kierunki',en:'In the City — Directions'},
     d:{pl:'left — lewo, right — prawo, straight on — prosto, corner — róg, crossroads — skrzyżowanie, bus stop — przystanek, map — mapa, turn — skręcić, lost — zgubiony.',en:'left, right, straight on, corner, crossroads, bus stop, map, turn, lost.'},
     ex:['Excuse me, where is the bus stop? — (Przepraszam, gdzie jest przystanek?)','Go straight on. — (Idź prosto.)','Turn left at the corner. — (Skręć w lewo na rogu.)','It\'s on the right. — (To jest po prawej.)','I\'m lost. Can you help me? — (Zgubiłem się. Możesz mi pomóc?)'],
     remember:{pl:'turn left/right = skręć w lewo/prawo · go straight on = idź prosto.',en:'turn left/right · go straight on.'},
     quiz:[{q:{pl:'„Skręć w prawo” po angielsku to:',en:'"Turn right" means:'},opts:[{pl:'Turn right',en:'Turn right'},{pl:'Go straight on',en:'Go straight on'},{pl:'Turn left',en:'Turn left'}],a:0,why:{pl:'turn right = skręć w prawo.',en:'turn right = skręć w prawo.'}}]}
   ],
   b2:[
    {sec:{pl:'Zaawansowany zakres',en:'Advanced Vocabulary'},t:{pl:'Język abstrakcyjny',en:'Abstract Language'},
     d:{pl:'Pojęcia: concept, theory, perspective, implication, consequence, approach, framework, dimension, extent, scope.',en:'Concepts: concept, theory, perspective, implication, consequence, approach, framework, dimension, extent, scope.'},
     ex:['From a broader perspective, the policy has had mixed results.','The implications of this decision are still unclear.','We need to consider all dimensions of the problem.']},
    {t:{pl:'Biznes i finanse',en:'Business & Finance'},
     d:{pl:'Terminy: revenue, profit, expenditure, budget, forecast, stakeholder, ROI. Wyrażenia: meet targets, cut costs, expand into new markets.',en:'Terms: revenue, profit, expenditure, budget, forecast, stakeholder, ROI. Expressions: meet targets, cut costs, expand into new markets.'},
     ex:['The company exceeded its revenue forecast by 15% this quarter.','We need to cut costs without affecting service quality.','They\'re planning to expand into Eastern European markets.']},
    {t:{pl:'Środowisko i ekologia',en:'Environment & Ecology'},
     d:{pl:'climate change, carbon footprint, renewable energy, emissions, biodiversity, deforestation, sustainable development.',en:'climate change, carbon footprint, renewable energy, emissions, biodiversity, deforestation, sustainable development.'},
     ex:['The government pledged to reduce carbon emissions by 50% by 2030.','Investing in renewable energy is crucial for sustainable development.','Deforestation has a devastating impact on biodiversity.']},
    {t:{pl:'Rejestr — formalny vs nieformalny',en:'Register — formal vs informal'},
     d:{pl:'Formal → Informal: assist (help), commence (start), obtain (get), reside (live), regarding (about), therefore (so).',en:'Formal → Informal: assist (help), commence (start), obtain (get), reside (live), regarding (about), therefore (so).'},
     ex:['Formal: I am writing to enquire about… / Informal: I\'m writing to ask about…','Formal: We require your assistance. / Informal: We need your help.','Formal: Please commence the presentation. / Informal: Please start.']}
   ]
  },
  {id:'speaking',emoji:'🗣️',title:{pl:'Mówienie',en:'Speaking'},sub:{pl:'Wyrażanie opinii, dyskusja, narracja',en:'Opinions, discussion, storytelling'},
   b1:[
    {sec:{pl:'Wyrażanie i reagowanie',en:'Expressing & Reacting'},t:{pl:'Wyrażanie opinii',en:'Expressing Opinions'},
     d:{pl:'I think / I believe / In my opinion / As I see it / From my point of view / I feel that…',en:'I think / I believe / In my opinion / As I see it / From my point of view / I feel that…'},
     ex:['In my opinion, working from home increases productivity.','As I see it, we need to invest more in education.','From my point of view, this approach is too risky.','Personally, I\'d prefer to wait and see what happens.']},
    {t:{pl:'Zgadzanie się i niezgadzanie',en:'Agreeing & Disagreeing'},
     d:{pl:'Zgoda: Exactly! That\'s a good point. I couldn\'t agree more. Niezgoda: I see your point, but… I\'m not sure about that.',en:'Agreement: Exactly! That\'s a good point. I couldn\'t agree more. Disagreement: I see your point, but… I\'m not sure about that.'},
     ex:['I couldn\'t agree more — stricter rules are definitely needed.','I see your point, but I think the situation is more complex.','With all due respect, I have to disagree with that.','That\'s a good point, although I\'d add that…']},
    {t:{pl:'Propozycje i sugestie',en:'Suggestions & Proposals'},
     d:{pl:'Shall we…? / Why don\'t we…? / What about + -ing? / How about…? / We could… / I suggest…',en:'Shall we…? / Why don\'t we…? / What about + -ing? / How about…? / We could… / I suggest…'},
     ex:['Why don\'t we meet for coffee this weekend?','What about going to the cinema instead?','How does Saturday sound to you?','I suggest we start with the most urgent tasks first.']},
    {t:{pl:'Opowiadanie historii',en:'Storytelling'},
     d:{pl:'Wstęp: It happened when / Once… Napięcie: Suddenly / To my surprise. Zakończenie: In the end / Eventually.',en:'Opening: It happened when / Once… Tension: Suddenly / To my surprise. Ending: In the end / Eventually.'},
     ex:['It all started when I got on the wrong train by mistake.','Suddenly, I realised I\'d left my passport at the hotel.','To my surprise, the shop was completely empty.','In the end, we managed to catch the last flight home.']},
    {t:{pl:'Small talk — pogawędka',en:'Small Talk'},
     d:{pl:'Krótka, miła rozmowa o niczym — przy kawie, w pracy, na imprezie. Kilka gotowych pytań i odpowiedzi wystarczy.',en:'A short, friendly chat about nothing — over coffee, at work, at a party. A few ready-made questions and answers are enough.'},
     ex:['Hi! How\'s it going? — Not bad, thanks. And you? — (Cześć! Co słychać? — Nieźle, dzięki. A u ciebie?)','What do you do? — I work in a shop. — (Czym się zajmujesz? — Pracuję w sklepie.)','Where are you from? — I\'m from Poland. — (Skąd jesteś? — Z Polski.)','How was your weekend? — It was nice, I was with my family. — (Jak minął weekend? — Fajnie, byłem z rodziną.)','Nice weather today, right? — Yeah, finally! — (Ładna pogoda, prawda? — No, w końcu!)'],
     remember:{pl:'„How\'s it going?” = „Co słychać?” — odpowiadasz krótko: „Good, thanks. And you?”.',en:'"How\'s it going?" — answer shortly: "Good, thanks. And you?".'},
     quiz:[{q:{pl:'Ktoś pyta „How\'s it going?”. Co odpowiesz?',en:'Someone asks "How\'s it going?". What do you say?'},opts:[{pl:'Good, thanks. And you?',en:'Good, thanks. And you?'},{pl:'I go to work.',en:'I go to work.'},{pl:'Yes, it is going.',en:'Yes, it is going.'}],a:0,why:{pl:'Standardowa, krótka odpowiedź.',en:'The standard short answer.'}}]},
    {t:{pl:'W sklepie i restauracji',en:'In Shops & Restaurants'},
     d:{pl:'Zwroty, których użyjesz niemal codziennie. „Can I have…?” i „I\'d like…” załatwiają 90% spraw.',en:'Phrases you\'ll use almost daily. "Can I have…?" and "I\'d like…" handle 90% of situations.'},
     ex:['Can I have a coffee, please? — (Poproszę kawę.)','I\'d like a table for two. — (Poproszę stolik dla dwóch osób.)','How much is it? — (Ile to kosztuje?)','Can I pay by card? — (Czy mogę zapłacić kartą?)','The bill, please. — (Rachunek, proszę.)','I\'m just looking, thanks. — (Tylko się rozglądam, dziękuję.)'],
     mistakes:[
      {bad:'I want a coffee.',good:'Can I have a coffee, please?',why:{pl:'„I want” brzmi nieuprzejmie. „Can I have…, please?” jest grzeczne.',en:'"I want" sounds rude. "Can I have…, please?" is polite.'}}],
     remember:{pl:'please = proszę · thanks = dzięki — z tymi dwoma słowami wszystko brzmi lepiej.',en:'please and thanks — with these two words everything sounds better.'},
     quiz:[{q:{pl:'Jak grzecznie poprosić o rachunek?',en:'How do you politely ask for the bill?'},opts:[{pl:'The bill, please.',en:'The bill, please.'},{pl:'Give me the bill!',en:'Give me the bill!'},{pl:'Bill now!',en:'Bill now!'}],a:0,why:{pl:'Krótko i grzecznie: The bill, please.',en:'Short and polite: The bill, please.'}}]}
   ],
   b2:[
    {sec:{pl:'Zaawansowane techniki',en:'Advanced Techniques'},t:{pl:'Perswazja i argumentowanie',en:'Persuasion & Argumentation'},
     d:{pl:'On the one hand… on the other hand. Although it is true that… nevertheless. Evidence suggests that…',en:'On the one hand… on the other hand. Although it is true that… nevertheless. Evidence suggests that…'},
     ex:['On the one hand, remote work offers flexibility; on the other, it can be isolating.','Although it\'s true that prices have risen, the quality has also improved.','It could be argued that this policy benefits only the wealthiest.','Evidence suggests that regular exercise reduces stress significantly.']},
    {t:{pl:'Język hedgingu',en:'Hedging Language'},
     d:{pl:'It seems to me that… / It would appear that… / To some extent… / I might be wrong, but…',en:'It seems to me that… / It would appear that… / To some extent… / I might be wrong, but…'},
     ex:['It seems to me that the government has underestimated the problem.','To some extent, both sides are responsible for the conflict.','It would appear that the data is incomplete.','I might be wrong, but I think the deadline has already passed.']},
    {t:{pl:'Zaawansowane spójniki (discourse markers)',en:'Advanced Discourse Markers'},
     d:{pl:'Kontrast: whereas, nevertheless, in contrast. Przyczyna: consequently, as a result. Konkluzja: to sum up, on balance, all things considered.',en:'Contrast: whereas, nevertheless, in contrast. Cause: consequently, as a result. Conclusion: to sum up, on balance, all things considered.'},
     ex:['Whereas some people thrive working from home, others find it isolating.','Consequently, the company was forced to restructure its operations.','On balance, the benefits of the policy outweigh the drawbacks.','All things considered, this was the right decision.']}
   ]
  },
  {id:'writing',emoji:'✍️',title:{pl:'Pisanie',en:'Writing'},sub:{pl:'E-maile, eseje, raporty',en:'Emails, essays, reports'},
   b1:[
    {sec:{pl:'Typy tekstów B1',en:'B1 Text Types'},t:{pl:'E-mail nieformalny',en:'Informal Email'},
     d:{pl:'Wstęp: Hi / Dear [imię]. Zakończenie: Best / Take care / Cheers. Cel: zaproszenie, dziękowanie, prośba. Rejestr potoczny.',en:'Opening: Hi / Dear [name]. Closing: Best / Take care / Cheers. Purpose: invitation, thanks, request. Informal register.'},
     ex:['Hi Tom, Just a quick note to say thank you for last night — it was great!','Hope you\'re doing well! I\'m writing to let you know that…','I was wondering if you could give me some advice about…']},
    {t:{pl:'E-mail formalny',en:'Formal Email'},
     d:{pl:'Wstęp: Dear Mr/Ms + nazwisko lub Dear Sir/Madam. Zakończenie: Yours sincerely / Yours faithfully. Bez skrótów, formalny ton.',en:'Opening: Dear Mr/Ms + surname or Dear Sir/Madam. Closing: Yours sincerely / Yours faithfully. No contractions, formal tone.'},
     ex:['I am writing to enquire about the position advertised on your website.','I would be grateful if you could provide further information regarding…','Please find attached my CV for your consideration.']},
    {t:{pl:'Esej za/przeciw',en:'For/Against Essay'},
     d:{pl:'Struktura: Wstęp → argumenty za → argumenty przeciw → podsumowanie. Spójniki: However / On the other hand / In conclusion / Furthermore.',en:'Structure: Introduction → arguments for → arguments against → conclusion. Connectives: However / On the other hand / In conclusion / Furthermore.'},
     ex:['There are several advantages to working from home. Firstly, it saves commuting time.','However, there are also some drawbacks. For instance, it can be hard to concentrate.','In conclusion, while working from home has benefits, it is not for everyone.']},
    {t:{pl:'SMS i krótkie wiadomości',en:'Texts & Short Messages'},
     d:{pl:'Piszemy krótko i po ludzku. Nie musi być idealnie — ma być szybko i jasno.',en:'We write short and naturally. It doesn\'t have to be perfect — it has to be quick and clear.'},
     ex:['Hi! Are you free tonight? — (Cześć! Masz czas dziś wieczorem?)','Thanks for your help! — (Dzięki za pomoc!)','Sorry, I\'m running late. Be there in 10 minutes. — (Sory, spóźnię się. Będę za 10 minut.)','Can you call me when you have a minute? — (Zadzwonisz, jak będziesz mieć chwilę?)','Happy birthday! Have a great day! — (Wszystkiego najlepszego! Miłego dnia!)','Let me know when you\'re home. — (Daj znać, jak będziesz w domu.)'],
     remember:{pl:'Let me know = daj znać — używa się tego non stop.',en:'Let me know — people use it all the time.'},
     quiz:[{q:{pl:'„Daj znać” po angielsku to:',en:'"Let me know" means:'},opts:[{pl:'Let me know',en:'Let me know'},{pl:'Give me know',en:'Give me know'},{pl:'Say to me',en:'Say to me'}],a:0,why:{pl:'let me know = daj znać.',en:'let me know = daj znać.'}}]}
   ],
   b2:[
    {sec:{pl:'Typy tekstów B2',en:'B2 Text Types'},t:{pl:'Esej dyskursywny',en:'Discursive Essay'},
     d:{pl:'Teza → rozwinięcie → kontrargumenty → konkluzja. Discourse markers: Moreover / Nevertheless / Admittedly / Despite / It cannot be denied that…',en:'Thesis → development → counter-arguments → conclusion. Discourse markers: Moreover / Nevertheless / Admittedly / Despite / It cannot be denied that…'},
     ex:['Moreover, the evidence suggests that investment in public transport reduces pollution.','Nevertheless, critics argue that the costs outweigh the benefits.','Admittedly, there are valid concerns about the long-term impact.','Despite these advantages, the consequences remain uncertain.']},
    {t:{pl:'Raport z rekomendacjami',en:'Report with Recommendations'},
     d:{pl:'Sekcje: tło (background), ustalenia (findings), wnioski (conclusions), zalecenia (recommendations). Rejestr formalny, strona bierna.',en:'Sections: background, findings, conclusions, recommendations. Formal register, passive voice.'},
     ex:['The survey revealed that 70% of employees prefer flexible working hours.','It is recommended that the company introduce a hybrid working policy.','Based on the findings, it is clear that further investment is required.']},
    {t:{pl:'Spójność tekstu — discourse markers',en:'Text Cohesion — discourse markers'},
     d:{pl:'Dodawanie: Furthermore, Moreover, In addition. Kontrast: However, Nevertheless, In contrast, Whereas. Podsumowanie: To sum up, On balance.',en:'Adding: Furthermore, Moreover, In addition. Contrast: However, Nevertheless, In contrast, Whereas. Summary: To sum up, On balance.'},
     ex:['Furthermore, the study revealed that exercise improves mental health significantly.','Consequently, the company was forced to restructure its operations.','In contrast, countries with stricter regulations showed lower unemployment.','With regard to the environmental impact, further research is needed.']}
   ]
  },
  {id:'listening',emoji:'🎧',title:{pl:'Słuchanie',en:'Listening'},sub:{pl:'Rozumienie ze słuchu',en:'Listening comprehension'},
   b1:[
    {sec:{pl:'Poziom B1',en:'B1 Level'},t:{pl:'Strategie słuchania',en:'Listening Strategies'},
     d:{pl:'1. Słuchaj globalnie (główna myśl). 2. Korzystaj z kontekstu i intonacji. 3. Przed słuchaniem przejrzyj pytania. 4. Nieznane słowa pomiń — skup się na kluczowych informacjach.',en:'1. Listen globally first (main idea). 2. Use context and intonation. 3. Before listening, preview questions. 4. Skip unknown words — focus on key information.'},
     ex:['When you hear an announcement, focus on: WHERE, WHEN, WHAT — not every word.','If you miss a word, don\'t panic — use context to guess the meaning.','Intonation tells you if someone is certain, surprised, or ironic.']},
    {t:{pl:'Rozumienie ogłoszeń i rozmów',en:'Announcements & Conversations'},
     d:{pl:'Ogłoszenia: wychwytuj WHERE, WHEN, WHAT. Rozmowy telefoniczne: standardowe zwroty.',en:'Announcements: catch WHERE, WHEN, WHAT. Phone calls: standard phrases.'},
     ex:['Platform 3 for the 14:25 to Warsaw — listen for: number, time, destination.','In a call: "I\'m calling to confirm…" — purpose stated at the start.','If you didn\'t catch it: "I\'m sorry, could you repeat that?" or "Could you speak more slowly?"']},
    {t:{pl:'Pytania, które usłyszysz najczęściej',en:'Questions You\'ll Hear Most'},
     d:{pl:'Te pytania słychać wszędzie — w sklepie, na lotnisku, w pracy. Jak poznasz je „z ucha”, żadna rozmowa cię nie zaskoczy.',en:'You hear these questions everywhere — in shops, at the airport, at work. Once you recognise them "by ear", no conversation will surprise you.'},
     ex:['Can I help you? — (Czy mogę pomóc?) — w sklepie','Where are you from? — (Skąd jesteś?)','How long are you staying? — (Jak długo zostajesz?)','What time does it open? — (O której otwierają?)','Anything else? — (Coś jeszcze?) — w sklepie i kawiarni','Cash or card? — (Gotówka czy karta?)'],
     remember:{pl:'Nie rozumiesz? Spokojnie: „Sorry, can you say that again, please?” — proszę, powtórz.',en:'Don\'t understand? Stay calm: "Sorry, can you say that again, please?"'},
     quiz:[{q:{pl:'Ktoś mówi „Cash or card?”. O co pyta?',en:'Someone says "Cash or card?". What are they asking?'},opts:[{pl:'Jak chcesz zapłacić',en:'How you want to pay'},{pl:'Ile masz pieniędzy',en:'How much money you have'},{pl:'Gdzie jest bankomat',en:'Where the cash machine is'}],a:0,why:{pl:'cash = gotówka, card = karta.',en:'cash = gotówka, card = karta.'}}]}
   ],
   b2:[
    {sec:{pl:'Poziom B2',en:'B2 Level'},t:{pl:'Autentyczne nagrania',en:'Authentic Recordings'},
     d:{pl:'Redukcje: gonna (going to), wanna (want to), kinda (kind of), didja (did you). Naturalne tempo, różne akcenty.',en:'Reductions: gonna (going to), wanna (want to), kinda (kind of), didja (did you). Natural pace, various accents.'},
     ex:['I\'m gonna call you later. → (= I\'m going to call)','Didja see the match last night? → (= Did you see)','You wanna grab a coffee? → (= Do you want to)','It\'s kinda complicated. → (= kind of / rather)']},
    {t:{pl:'Znaczenie implicite',en:'Implicit Meaning'},
     d:{pl:'Rozumiesz co NIE jest powiedziane wprost: sarkazm, ironię, aluzje, postawę rozmówcy.',en:'You understand what is NOT said directly: sarcasm, irony, allusions, speaker\'s attitude.'},
     ex:['"Oh, that\'s just great." (flat tone) — often means the opposite: that\'s terrible!','A: "What do you think of my idea?" B: "It\'s... interesting." — often means: I don\'t like it.','"He\'s not exactly the most reliable person." — understatement for: he\'s very unreliable.']}
   ]
  },
  {id:'reading',emoji:'📖',title:{pl:'Czytanie',en:'Reading'},sub:{pl:'Rozumienie tekstów',en:'Understanding written texts'},
   b1:[
    {sec:{pl:'Poziom B1',en:'B1 Level'},t:{pl:'Strategie czytania',en:'Reading Strategies'},
     d:{pl:'Skimming: czytasz szybko dla głównej myśli. Scanning: szukasz konkretnej informacji. Inference: domyślasz się sensu z kontekstu.',en:'Skimming: read quickly for the main idea. Scanning: search for specific information. Inference: guess meaning from context.'},
     ex:['Skimming: read only the first sentence of each paragraph for the main idea.','Scanning: run your eyes down the text for a specific name, number or date.','Inference: "He slammed the door and left." — infer he was angry (not stated directly).']},
    {t:{pl:'Typy tekstów B1',en:'B1 Text Types'},
     d:{pl:'E-maile i listy, artykuły prasowe na znane tematy, opisy, narracje, instrukcje, fora internetowe.',en:'Emails and letters, newspaper articles on familiar topics, descriptions, narratives, instructions, internet forums.'},
     ex:['"The hostel is a 5-minute walk from the main station." — understand: location and distance.','"Prices start from €49 per person." — understand: cost information.','Forum post: "Has anyone tried this? tbh it\'s kinda overrated imo" — informal language, abbreviations.']},
    {t:{pl:'Słowa-kleje — but, because, so',en:'Glue Words — but, because, so'},
     d:{pl:'Te małe słowa łączą zdania. Jak je znasz, rozumiesz tekst, nawet gdy nie znasz wszystkich słów. but — ale, because — bo/ponieważ, so — więc, and — i, or — lub, if — jeśli.',en:'These small words join sentences. If you know them, you understand a text even without knowing every word. but, because, so, and, or, if.'},
     ex:['I was tired, but I went to work. — (Byłem zmęczony, ale poszedłem do pracy.)','I stayed home because it was raining. — (Zostałem w domu, bo padało.)','It was late, so we took a taxi. — (Było późno, więc wzięliśmy taksówkę.)','Call me if you need anything. — (Zadzwoń, jeśli będziesz czegoś potrzebować.)','Do you want tea or coffee? — (Chcesz herbatę czy kawę?)'],
     remember:{pl:'because odpowiada na pytanie „dlaczego?”, so mówi „i dlatego…”.',en:'because answers "why?", so means "and that\'s why…".'},
     quiz:[{q:{pl:'I was hungry, ___ I made a sandwich.',en:'I was hungry, ___ I made a sandwich.'},opts:[{pl:'so',en:'so'},{pl:'but',en:'but'},{pl:'or',en:'or'}],a:0,why:{pl:'Głodny → WIĘC zrobiłem kanapkę.',en:'Hungry → SO I made a sandwich.'}}]}
   ],
   b2:[
    {sec:{pl:'Poziom B2',en:'B2 Level'},t:{pl:'Teksty abstrakcyjne i literackie',en:'Abstract & Literary Texts'},
     d:{pl:'Rozumiesz złożone teksty, wychwytujesz postawę i ton autora, implikacje i ironię.',en:'You understand complex texts, can identify the author\'s attitude and tone, implications and irony.'},
     ex:['"The report paints a grim picture of the housing market." — "grim picture" = very negative.','"One might argue that this policy is misguided." — distanced, critical tone.','Understated: "The results were not entirely satisfactory." — means: the results were bad.']}
   ]
  },
  {id:'phrasal',emoji:'🔗',title:{pl:'Frazale i idiomy',en:'Phrasal Verbs & Idioms'},sub:{pl:'Phrasal verbs, idiomy, kolokacje',en:'Phrasal verbs, idioms, collocations'},
   b1:[
    {sec:{pl:'Popularne frazale',en:'Common Phrasal Verbs'},t:{pl:'GET — najważniejsze',en:'GET — most important'},
     d:{pl:'get up, get on/off, get over (pokonać/wyleczyć się z), get along with (dogadywać się), get rid of (pozbyć się), get away with (ujść bezkarnie).',en:'get up, get on/off, get over (recover/overcome), get along with (have a good relationship with), get rid of (remove/eliminate), get away with (not be caught/punished).'},
     ex:['She gets up at 6 every morning. — (wstaje / wakes up)','I can\'t get over how beautiful this city is. — (nie mogę wyjść z podziwu)','They get along really well — they never argue.','He got away with cheating on the test. — (uszło mu to na sucho)']},
    {t:{pl:'LOOK — najważniejsze',en:'LOOK — most important'},
     d:{pl:'look up (szukać), look after (opiekować się), look forward to (czekać z niecierpliwością), look into (zbadać), look down on (pogardzać).',en:'look up (search for), look after (take care of), look forward to (anticipate with excitement), look into (investigate), look down on (feel superior to).'},
     ex:['I\'ll look it up in the dictionary. — (sprawdzę)','She looks after her elderly parents. — (opiekuje się)','I\'m really looking forward to the holidays! — (nie mogę się doczekać)','The police are looking into the matter. — (badają sprawę)']},
    {sec:{pl:'Kolokacje',en:'Collocations'},t:{pl:'DO vs MAKE',en:'DO vs MAKE'},
     d:{pl:'DO: homework, dishes, business, damage, exercise, someone a favour. MAKE: decision, effort, progress, mistake, complaint, noise.',en:'DO: homework, dishes, business, damage, exercise, someone a favour. MAKE: decision, effort, progress, mistake, complaint, noise.'},
     ex:['Could you do me a favour? — (wyświadczyć przysługę)','I made a mistake — I sent the wrong file. — (popełniłem błąd)','She\'s making great progress with her English. — (robi postępy)','Please don\'t make so much noise! — (nie hałasuj)'],
     tip:{pl:'NIE mieszaj: "make homework" → BŁĄD. "do a decision" → BŁĄD. Zapamiętaj całe kolokacje jako jednostki.',en:'Don\'t mix: "make homework" → WRONG. "do a decision" → WRONG. Learn collocations as whole chunks.'}},
    {t:{pl:'Codzienne czynności — frazale',en:'Daily Routine Phrasals'},
     d:{pl:'Frazale, których używa się od rana do wieczora. wake up — obudzić się, get up — wstać, put on — założyć (ubranie), take off — zdjąć, turn on/off — włączyć/wyłączyć, go out — wyjść, come back — wrócić.',en:'Phrasals you use from morning to night. wake up, get up, put on, take off, turn on/off, go out, come back.'},
     ex:['I wake up at 6 and get up at 6:15. — (Budzę się o 6, wstaję o 6:15.)','Put on your jacket — it\'s cold! — (Załóż kurtkę — jest zimno!)','Can you turn off the light? — (Zgasisz światło?)','I\'m going out with friends tonight. — (Wychodzę dziś ze znajomymi.)','When will you come back? — (Kiedy wrócisz?)'],
     remember:{pl:'put on = zakładać · take off = zdejmować — ubrania, buty, okulary.',en:'put on · take off — clothes, shoes, glasses.'},
     quiz:[{q:{pl:'„Włącz telewizor” po angielsku to:',en:'"Turn on the TV" means:'},opts:[{pl:'Turn on the TV',en:'Turn on the TV'},{pl:'Turn off the TV',en:'Turn off the TV'},{pl:'Take off the TV',en:'Take off the TV'}],a:0,why:{pl:'turn on = włączyć.',en:'turn on = włączyć.'}}]}
   ],
   b2:[
    {sec:{pl:'Zaawansowane',en:'Advanced'},t:{pl:'Frazale nieoczywiste',en:'Non-obvious Phrasal Verbs'},
     d:{pl:'bring about (spowodować), draw on (korzystać z), fall through (nie dojść do skutku), phase out (stopniowo eliminować), account for (stanowić; wyjaśnić).',en:'bring about (cause), draw on (use/rely on), fall through (fail to happen), phase out (gradually eliminate), account for (make up; explain).'},
     ex:['The reforms brought about significant changes in healthcare.','She drew on her experience as a nurse to write the book.','The deal fell through at the last minute — both sides walked away.','Fossil fuels account for over 70% of global energy use.']},
    {t:{pl:'Idiomy zaawansowane',en:'Advanced Idioms'},
     d:{pl:'go back to the drawing board (zacząć od nowa), on the same page (rozumieć się), a blessing in disguise (nieszczęście w szczęściu), cut corners (iść na skróty).',en:'go back to the drawing board (start again from scratch), on the same page (have the same understanding), a blessing in disguise (something bad that turns out good), cut corners (do something poorly to save time/money).'},
     ex:['The project failed — we had to go back to the drawing board. — (zacząć od nowa)','Make sure everyone is on the same page before the meeting. — (rozumie to samo)','Losing that job was a blessing in disguise — I found a much better one.','We can\'t cut corners on safety — it\'s not worth the risk.']}
   ]
  },
  {id:'pronunciation',emoji:'🔊',title:{pl:'Wymowa',en:'Pronunciation'},sub:{pl:'Dźwięki, akcent, intonacja',en:'Sounds, word stress, intonation'},
   b1:[
    {sec:{pl:'Trudne dźwięki',en:'Difficult Sounds'},t:{pl:'TH — /θ/ i /ð/',en:'TH — /θ/ and /ð/'},
     d:{pl:'/θ/ bezdźwięczne: think, three, bath. /ð/ dźwięczne: this, the, breathe. Język dotyka górnych zębów.',en:'/θ/ voiceless: think, three, bath. /ð/ voiced: this, the, breathe. Tongue touches upper teeth.'},
     ex:['/θ/: think, three, birthday, tooth, month, south, path','/ð/: this, that, the, breathe, mother, weather, together','Minimal pairs: thin vs den vs fin (three different sounds!)','Practice: "This Thursday, I\'ll think of something thick."'],
     tip:{pl:'Polacy często używają "t/d" lub "f/v" zamiast th. Ćwicz przed lustrem — język musi być widoczny!',en:'Polish speakers often use "t/d" or "f/v" instead of th. Practice in front of a mirror — your tongue should be visible!'}},
    {t:{pl:'Akcent wyrazowy (Word Stress)',en:'Word Stress'},
     d:{pl:'Każde słowo angielskie ma stały akcent. PHOtograph → phoTOgraphy → photoGRAPHic. Błędny akcent = niezrozumiane słowo.',en:'Every English word has fixed stress. PHOtograph → phoTOgraphy → photoGRAPHic. Wrong stress = misunderstood word.'},
     ex:['REcord (noun: płyta) vs reCORD (verb: nagrywać)','PREsent (noun/adj: prezent/obecny) vs preSENT (verb: prezentować)','CONflict (noun) vs conFLICT (verb)','ADdress (noun: adres) vs adDRESS (verb: zwracać się do)'],
     tip:{pl:'Ucz się akcentu RAZEM ze słowem. Słownik Cambridge online — klikaj głośnik żeby usłyszeć wymowę.',en:'Learn word stress TOGETHER with the word. Cambridge Dictionary online — click the speaker to hear pronunciation.'}},
    {t:{pl:'Redukcje mówione',en:'Spoken Reductions'},
     d:{pl:'gonna (going to), wanna (want to), kinda (kind of), gotta (got to/have to), shoulda/coulda/woulda (should/could/would have).',en:'gonna (going to), wanna (want to), kinda (kind of), gotta (got to/have to), shoulda/coulda/woulda (should/could/would have).'},
     ex:['I\'m gonna call you later. → (going to)','You wanna grab a coffee? → (want to)','I shoulda told her the truth. → (should have)','It\'s kinda complicated to explain. → (kind of)']},
    {t:{pl:'Łączenie słów (Linking)',en:'Linking Words'},
     d:{pl:'Native speakerzy łączą słowa bez przerw. Spółgłoska + samogłoska łączą się naturalnie. "turn it off" → "turnnitoff".',en:'Native speakers link words without pauses. Consonant + vowel link naturally. "turn it off" → "turnnitoff".'},
     ex:['turn it off → "tur-ni-toff"','not at all → "no-tat-all"','go on → "go-won"','did you → "di-djou"']},
    {t:{pl:'Trudne słowa — jak je powiedzieć',en:'Tricky Words — How to Say Them'},
     d:{pl:'Te słowa wszyscy wymawiają źle. W nawiasach — jak to mniej więcej brzmi po naszemu.',en:'Everyone mispronounces these words. In brackets — roughly how they sound.'},
     ex:['comfortable — wygodny → „KAMF-te-bl” (nie „komfort-ajbl”)','Wednesday — środa → „WENZ-dei” (pierwsze „d” jest nieme)','vegetable — warzywo → „WEDŻ-te-bl”','chocolate — czekolada → „CZOK-lit”','clothes — ubrania → „kłołz” (jak „close”)','work — praca → „łörk” · walk — chodzić → „łok” (inaczej!)'],
     remember:{pl:'work ≠ walk — inny dźwięk w środku: łörk vs łok.',en:'work ≠ walk — a different middle sound.'},
     quiz:[{q:{pl:'Jak wymawiamy „Wednesday”?',en:'How do we say "Wednesday"?'},opts:[{pl:'„WENZ-dei”',en:'"WENZ-dei"'},{pl:'„Wed-nes-dei”',en:'"Wed-nes-dei"'},{pl:'„Wed-NEZ-dej”',en:'"Wed-NEZ-dej"'}],a:0,why:{pl:'Pierwsze „d” jest nieme.',en:'The first "d" is silent.'}}]}
   ],
   b2:[
    {sec:{pl:'Poziom B2',en:'B2 Level'},t:{pl:'Intonacja zdaniowa',en:'Sentence Intonation'},
     d:{pl:'Rising (↑): pytania Yes/No. Falling (↓): pytania WH-, twierdzenia. Rise-fall: ironia, zaskoczenie.',en:'Rising (↑): Yes/No questions. Falling (↓): WH- questions, statements. Rise-fall: irony, surprise.'},
     ex:['Are you coming? ↑ — (Yes/No question — rising)','Where are you going? ↓ — (WH- question — falling)','I got the job! ↓ — (excited statement — falling)','Oh, THAT\'s surprising. ↗↘ — (sarcastic — rise-fall)'],
     tip:{pl:'"Really?" z rosnącą = prawdziwe zaskoczenie. "Really." z opadającą = sceptycyzm lub ironia. Intonacja zmienia znaczenie!',en:'"Really?" with rising = genuine surprise. "Really." with falling = scepticism or irony. Intonation changes meaning!'}},
    {t:{pl:'Weak forms — schwa /ə/',en:'Weak forms — schwa /ə/'},
     d:{pl:'Najczęstszy dźwięk w angielskim. Słowa bez akcentu → schwa: the /ðə/, a /ə/, and /ən/, can /kən/, for /fər/.',en:'The most frequent sound in English. Unstressed words → schwa: the /ðə/, a /ə/, and /ən/, can /kən/, for /fər/.'},
     ex:['I\'ll meet you at the /ðə/ station for /fər/ a /ə/ coffee.','Can /kən/ you help me? — "can" in weak form','Them, him, her, his, us — all use schwa in natural speech.'],
     tip:{pl:'Używanie "silnych form" wszędzie (the = "thee", and = "end") brzmi robotycznie. Weak forms to sekret naturalnego brzmienia.',en:'Using "strong forms" everywhere (the = "thee", and = "end") sounds robotic. Weak forms are the secret to sounding natural.'}}
   ]
  }
];

