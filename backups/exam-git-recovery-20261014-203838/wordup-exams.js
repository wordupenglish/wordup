/* WordUp shared exam engine. Static-site safeguards are deterrents, not server security. */
(function () {
  'use strict';
  if (window.__wordUpExamEngineLoaded) return;
  window.__wordUpExamEngineLoaded = true;
  const LEVELS = ['foundation','a1','a2','b1','b2','c1','c2','academic'];
  const NAMES = {foundation:'Foundation',a1:'A1 â€” Beginner',a2:'A2 â€” Elementary',b1:'B1 â€” Intermediate',b2:'B2 â€” Upper-Intermediate',c1:'C1 â€” Advanced',c2:'C2 â€” Proficiency',academic:'Academic English'};
  const SKILLS = ['vocabulary','grammar','reading','listening','speaking','writing'];
  const ICONS = {vocabulary:'\u{1F4DA}',grammar:'\u{1F524}',reading:'\u{1F4D6}',listening:'\u{1F3A7}',speaking:'\u{1F5E3}\u{FE0F}',writing:'\u{270D}\u{FE0F}'};
  const STORE = 'wordUpExamAttemptsV1';
  let state = null, timer = null, remaining = 0, recognition = null, observer = null, hiddenTestButton = null;
  const $ = (s, root=document) => root.querySelector(s);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const allLessons = () => { try { return typeof window.wordUpGetAllContent === 'function' ? window.wordUpGetAllContent() || [] : []; } catch (_) { return []; } };
  const levelName = l => NAMES[l] || l || 'WordUp';
  const attempts = () => { try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch (_) { return []; } };
  function saveAttempt(entry) { const a=attempts(); const i=a.findIndex(x=>x.id===entry.id); if(i>=0)a[i]=entry;else a.push(entry); try { localStorage.setItem(STORE, JSON.stringify(a.slice(-200))); } catch (_) {} }
  function normalize(s) { return String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim(); }
  function hash(s) { let h=2166136261; for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);} return h>>>0; }
  function shuffle(arr, seed) { const a=arr.slice(); let x=(seed>>>0)||1; for(let i=a.length-1;i>0;i--){x^=x<<13;x^=x>>>17;x^=x<<5;const j=(x>>>0)%(i+1);[a[i],a[j]]=[a[j],a[i]];} return a; }
  function pickSkill(lesson) { const s=String(lesson.skill||'').toLowerCase(); return SKILLS.includes(s)?s:'grammar'; }
  function questionFrom(q, lesson, skill, idx) {
    if (!q || typeof q !== 'object') return null;
    const prompt=q.question||q.prompt||q.text;
    if (!prompt) return null;
     if (/which topic is the focus of this lesson/i.test(String(prompt))) return null;
    const opts=Array.isArray(q.options)?q.options:[];
    const answer=Number(q.answer ?? q.correctAnswer ?? q.correct);
    if (opts.length>=2 && Number.isInteger(answer) && answer>=0 && answer<opts.length) return {type:'choice',skill,lessonId:lesson.id,lessonTitle:lesson.topic||lesson.title||lesson.id,prompt,options:opts.map(String),answer,explanation:q.explanation||q.feedback||''};
    return null;
  }
  function buildQuestions(mode, level) {
    const lessons=allLessons().filter(l=>mode==='master'||mode==='placement'||l.level===level);
    let qs=[];
    lessons.forEach(lesson=>{
      const skill=pickSkill(lesson);
      // Include both lesson assessments and practice questions.
      // Test questions are processed first; duplicate prompts are excluded.
      const lessonQuestions = [
        ...(Array.isArray(lesson.test) ? lesson.test : []),
        ...(Array.isArray(lesson.practice) ? lesson.practice : [])
      ];
      const seenLessonPrompts = new Set();
      lessonQuestions.forEach((q,i)=>{
        const prompt = q && (q.question || q.prompt || q.text);
        const key = String(prompt || "").trim().toLowerCase().replace(/\s+/g," ");
        if (!key || seenLessonPrompts.has(key)) return;
        const v = questionFrom(q,lesson,skill,i);
        if(v) {
          seenLessonPrompts.add(key);
          qs.push(v);
        }
      });
      // Generate dictation only from clean words and complete sentences.
      if (skill === 'listening' || skill === 'writing') {
        (lesson.vocabulary || []).slice(0, 3).forEach(v => {
          const word = typeof v === 'string' ? v : (v.word || v.term);
          if (typeof word !== 'string') return;
          const cleanWord = word.trim();
          const wordCount = cleanWord.split(/\s+/).length;
          if (cleanWord && wordCount <= 6 && !/[\/\\â†’â†]/.test(cleanWord)) {
            qs.push({
              type: 'dictation',
              skill: 'listening',
              lessonId: lesson.id,
              lessonTitle: lesson.topic || lesson.title || lesson.id,
              prompt: 'Listen carefully and type the word or phrase you hear.',
              answer: cleanWord,
              audio: cleanWord
            });
          }
        });

        (lesson.examples || []).slice(0, 3).forEach(example => {
          if (typeof example !== 'string') return;
          const sentence = example.trim().replace(/\s+/g, ' ');
          const words = sentence.match(/[A-Za-z]+(?:['â€™-][A-Za-z]+)*/g) || [];
          const hasSentenceEnding = /[.!?]["')\]]*$/.test(sentence);
          const hasPronunciationNotation = /[\/\\â†’â†]/.test(sentence);

          if (words.length >= 4 && words.length <= 20 &&
              hasSentenceEnding && !hasPronunciationNotation) {
            qs.push({
              type: 'dictation',
              skill: 'writing',
              lessonId: lesson.id,
              lessonTitle: lesson.topic || lesson.title || lesson.id,
              prompt: 'Listen and type the complete sentence. Use the keyboard; the text will not appear on screen.',
              answer: sentence,
              audio: sentence
            });
          }
        });
      }
      if(skill==='speaking'){
        const phrase=(lesson.examples||[]).find(x=>typeof x==='string'&&x.trim());
        if(phrase) qs.push({type:'speech',skill,lessonId:lesson.id,lessonTitle:lesson.topic||lesson.title||lesson.id,prompt:'Say this sentence aloud as clearly as you can.',answer:phrase.trim(),audio:phrase.trim()});
      }
    });
    // Deduplicate identical prompts within skill/lesson and balance across skills.
    const seen=new Set(); qs=qs.filter(q=>{const k=q.skill+'|'+q.lessonId+'|'+q.type+'|'+q.prompt+'|'+(q.answer||'');if(seen.has(k))return false;seen.add(k);return true;});
    const seed=hash((mode+'|'+(level||'all')+'|'+new Date().toISOString().slice(0,10)));
    const grouped={}; SKILLS.forEach(s=>grouped[s]=shuffle(qs.filter(q=>q.skill===s),seed+hash(s)));
    const balanced=[]; let max=Math.max(0,...SKILLS.map(s=>grouped[s].length));
    for(let i=0;i<max;i++) SKILLS.forEach(s=>{if(grouped[s][i])balanced.push(grouped[s][i]);});
    const count=mode==='master'?Math.min(60,balanced.length):mode==='placement'?Math.min(30,balanced.length):Math.min(30,balanced.length);
    return shuffle(balanced,seed^0xA53C9E1).slice(0,count);
  }
  function openExam(mode, level) {
    const questions=buildQuestions(mode,level);
    if(questions.length<5){alert('This exam needs at least five available questions. More lesson assessment content must be added first.');return;}
    cleanupTimer(); state={mode,level:level||null,questions,answers:{},index:0,started:0,violations:0,finished:false,attemptId:'WU-'+Date.now().toString(36).toUpperCase()};
    remaining=(mode==='master'?45:mode==='placement'?15:25)*60;
    renderRules();
  }
  function rootBox() {
    let root = document.getElementById('wordup-exam-overlay');
    if (!root) {
        root = document.createElement('div');
        root.id = 'wordup-exam-overlay';
        root.className = 'wue-overlay';

        root.setAttribute('role', 'main');
        root.setAttribute('aria-live', 'polite');
        document.body.appendChild(root);
    }
    root.style.cssText = 'position:fixed!important;inset:0!important;width:100vw!important;min-height:100vh!important;z-index:2147483000!important;overflow-y:auto!important;box-sizing:border-box!important;padding:24px!important;background:var(--bg,#fff)!important;';
    return root;
}
  function header(title, subtitle) { return `<div class="wue-header"><span class="wue-kicker">WORDUP ASSESSMENT</span><h2>${esc(title)}</h2><p>${esc(subtitle||'Take your time, focus, and show what you have learned.')}</p></div>`; }
  function renderRules() {
    const root=rootBox(); if(!root)return;
    const title=state.mode==='master'?'Master Exam':state.mode==='placement'?'Test My Level':`${levelName(state.level)} Exam`;
    root.innerHTML=`<section class="wue-view">${header(title,'Your progress is built one question at a time. Breathe, focus, and trust the work you have done.')}
      <div class="wue-motivation"><p>âœ¨ You do not need to be perfect â€” just give every question your honest best.</p><p>ðŸ’ª Every challenge is a chance to discover how much you have learned and what to improve next.</p><p>ðŸŒ± Stay calm, believe in your effort, and keep moving forward. You can do this!</p></div>
      <div class="wue-panel"><h3>Before you begin</h3><ul><li>Time limit: <strong>${Math.floor(remaining/60)} minutes</strong>. The exam submits when time runs out.</li><li>Answer each question before moving on. You cannot skip unanswered questions or return to earlier questions.</li><li>Questions cover Vocabulary, Grammar, Reading, Listening, Speaking, and Writing where lesson content is available.</li><li>Listening and writing tasks may play audio only. Type what you hear. Speaking tasks may ask for microphone access.</li><li>Do not switch tabs, copy questions, or use outside help. Repeated focus changes may submit the exam.</li><li>Your attempt and results are saved on this device. Browser-based exams cannot completely prevent cheating.</li></ul>
      <label class="wue-confirm"><input id="wueRulesCheck" type="checkbox"><span>I have read the rules and agree to complete this exam honestly.</span></label>
      <div class="wue-actions"><button class="wue-secondary" onclick="wordUpExamCancel()">Not now</button><button id="wueBegin" class="wue-primary" disabled onclick="wordUpExamBegin()">I agree â€” Begin exam</button></div></div></section>`;
    $('#wueRulesCheck',root).addEventListener('change',e=>$('#wueBegin',root).disabled=!e.target.checked);
  }
  function begin() { if(!state||!$('#wueRulesCheck')?.checked)return; state.started=Date.now(); state.deadline=state.started+remaining*1000; saveAttempt({id:state.attemptId,mode:state.mode,level:state.level||null,date:new Date(state.started).toISOString(),status:'in-progress',answers:{},score:null}); renderQuestion(); timer=setInterval(()=>{if(!state||state.finished)return;remaining=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));const t=$('#wueTimer');if(t)t.textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;if(remaining<=0)finish(true);},250); installGuards(); }
  function speak(text) { if(!('speechSynthesis' in window)){alert('Audio playback is not supported in this browser.');return;} speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(String(text));u.lang='en-US';u.rate=.82;speechSynthesis.speak(u); }
  function renderQuestion() {
    if(!state||state.finished)return; const q=state.questions[state.index], root=rootBox(); if(!q||!root)return;
    const skills=[...new Set(state.questions.map(x=>x.skill))];
    root.innerHTML=`<section class="wue-view">${header(state.mode==='master'?'Master Exam':state.mode==='placement'?'Test My Level':`${levelName(state.level)} Exam`,'Read or listen carefully. One question at a time.')}
      <div class="wue-exam-bar"><span>Question ${state.index+1} of ${state.questions.length}</span><span id="wueTimer" aria-live="polite">${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}</span></div>
      <div class="wue-progress"><span style="width:${state.index/state.questions.length*100}%"></span></div>
      <div class="wue-panel wue-question"><div class="wue-tags"><span>${ICONS[q.skill]||'ðŸ“'} ${esc(q.skill)}</span><span>${esc(q.type==='dictation'?'Audio typing':q.type==='speech'?'Pronunciation':'Question')}</span></div><h3>${esc(q.prompt)}</h3>
      ${q.type==='choice'?`<div class="wue-options">${q.options.map((o,i)=>`<button class="wue-option" data-wue-option="${i}" onclick="wordUpExamChoose(${i})">${esc(o)}</button>`).join('')}</div>`:''}
      ${q.type==='dictation'?`<div class="wue-audio"><button class="wue-secondary" onclick="wordUpExamPlayAudio()">ðŸ”Š Play audio</button><p>Audio only â€” the answer is not shown.</p></div><input id="wueTyped" class="wue-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type what you hear" aria-label="Type the spoken answer">`:''}
      ${q.type==='speech'?`<div class="wue-audio"><button class="wue-secondary" onclick="wordUpExamPlayAudio()">ðŸ”Š Hear example</button></div><div class="wue-speech-actions"><button class="wue-secondary" onclick="wordUpExamMic()">ðŸŽ™ï¸ Start microphone</button><span id="wueSpeechStatus" aria-live="polite">Microphone permission may be required.</span></div><textarea id="wueSpeechText" class="wue-input" rows="2" placeholder="Recognized speech appears here" aria-label="Recognized pronunciation"></textarea><p class="wue-muted">Pronunciation is checked against speech recognition when your browser supports it. This is an estimate, not a professional accent score.</p>`:''}
      <div class="wue-actions"><button class="wue-primary" id="wueNext" onclick="wordUpExamNext()" ${q.type==='choice'?'disabled':''}>${state.index===state.questions.length-1?'Finish exam':'Submit & continue â†’'}</button></div><p id="wueFeedback" class="wue-feedback" aria-live="polite"></p></div></section>`;
    if(q.type==='dictation') setTimeout(()=>{const input=$('#wueTyped');if(input)input.focus();},50);
  }
  function choose(i) { if(!state||state.finished)return; const q=state.questions[state.index]; if(q.type!=='choice')return;state.answers[state.index]=i;document.querySelectorAll('[data-wue-option]').forEach((b,j)=>{b.classList.toggle('is-selected',j===i);b.setAttribute('aria-pressed',String(j===i));});$('#wueNext').disabled=false; }
  function playAudio(){if(state&&state.questions[state.index])speak(state.questions[state.index].audio||state.questions[state.index].answer);}
  function mic(){if(!state)return;const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SpeechRecognition){const status=$('#wueSpeechStatus');if(status)status.textContent='Speech recognition is not supported here. You can type what you said to continue.';return;}try{if(recognition)recognition.abort();recognition=new SpeechRecognition();recognition.lang='en-US';recognition.interimResults=false;recognition.maxAlternatives=3;const status=$('#wueSpeechStatus');if(status)status.textContent='Listeningâ€¦ speak clearly.';recognition.onresult=e=>{const text=e.results[0][0].transcript;const input=$('#wueSpeechText');if(input)input.value=text;if(status)status.textContent=`Heard: â€œ${text}â€`;$('#wueNext').disabled=false;};recognition.onerror=()=>{if(status)status.textContent='Microphone could not hear you. Check permission and try again, or type your response.';};recognition.onend=()=>{if(status&&status.textContent==='Listeningâ€¦ speak clearly.')status.textContent='Listening ended.';};recognition.start();}catch(e){const status=$('#wueSpeechStatus');if(status)status.textContent='Could not start microphone. Check browser permission.';}}
  function next(){if(!state||state.finished)return;const q=state.questions[state.index];let answer=state.answers[state.index];if(q.type==='dictation')answer=$('#wueTyped')?.value?.trim()||'';if(q.type==='speech')answer=$('#wueSpeechText')?.value?.trim()||'';if(answer===undefined||answer===null||String(answer).trim()===''){const f=$('#wueFeedback');if(f)f.textContent=q.type==='speech'?'Use the microphone or type a response before continuing.':'Please answer this question before continuing.';return;}state.answers[state.index]=answer;if(state.index<state.questions.length-1){state.index++;renderQuestion();}else finish(false);}
  function isCorrect(q,a){if(q.type==='choice')return Number(a)===q.answer;if(q.type==='dictation')return normalize(a)===normalize(q.answer);if(q.type==='speech'){const heard=normalize(a),target=normalize(q.answer);return !!heard&&(heard===target||heard.includes(target)||target.includes(heard)&&heard.length/Math.max(1,target.length)>.75);}return false;}
  function finish(timedOut){if(!state||state.finished)return;state.finished=true;cleanupTimer();removeGuards();if(recognition){try{recognition.stop();}catch(_){}recognition=null;}if('speechSynthesis'in window)speechSynthesis.cancel();const qs=state.questions;let correct=0;const perSkill={};const review=qs.map((q,i)=>{const answer=state.answers[i];const ok=isCorrect(q,answer);if(ok)correct++;if(!perSkill[q.skill])perSkill[q.skill]={total:0,correct:0,lessons:{}};perSkill[q.skill].total++;if(ok)perSkill[q.skill].correct++;const key=q.lessonId||'general';if(!perSkill[q.skill].lessons[key])perSkill[q.skill].lessons[key]={title:q.lessonTitle||key,total:0,correct:0};perSkill[q.skill].lessons[key].total++;if(ok)perSkill[q.skill].lessons[key].correct++;return {q,answer,ok};});const score=Math.round(correct/Math.max(1,qs.length)*100),passed=score>=70;const record={id:state.attemptId,mode:state.mode,level:state.level||null,date:new Date().toISOString(),durationSeconds:Math.round((Date.now()-state.started)/1000),timedOut:!!timedOut,focusWarnings:state.violations,score,correct,total:qs.length,passed,perSkill,review:review.map(r=>({skill:r.q.skill,lessonId:r.q.lessonId,question:r.q.prompt,answer:r.answer,correctAnswer:r.q.type==='choice'?r.q.options[r.q.answer]:r.q.answer,isCorrect:r.ok,type:r.q.type}))};if(state.mode==='placement'){const l=score>=95?'academic':score>=90?'c2':score>=85?'c1':score>=75?'b2':score>=65?'b1':score>=50?'a2':score>=35?'a1':'foundation';record.recommendedLevel=l;try{localStorage.setItem('wordUpV10PlacementResult',JSON.stringify({level:l,overallLevel:l,score,total:qs.length,correct,date:record.date,source:'WordUp comprehensive exam'}));localStorage.setItem('wordUpCurrentLevel',l);}catch(_){} }saveAttempt(record);
    renderResults(record,review,timedOut);}
  function renderResults(record,review,timedOut){const root=rootBox();if(!root)return;const weak=Object.entries(record.perSkill).map(([skill,v])=>({skill,pct:Math.round(v.correct/v.total*100),...v})).sort((a,b)=>a.pct-b.pct);const recommended=weak.filter(x=>x.pct<80);const title=record.mode==='master'?'Master Exam Results':record.mode==='placement'?'Your Level Assessment':`${levelName(record.level)} Exam Results`;root.innerHTML=`<section class="wue-view">${header(title,timedOut?'Time is up. Your answers have been saved.':'Your attempt is saved on this device.')}
      <div class="wue-result-hero"><div class="wue-result-score">${record.score}%</div><h3>${record.passed?'Well done â€” you passed!':'Keep going. Every attempt helps you improve.'}</h3><p>${record.correct} correct out of ${record.total}${timedOut?' Â· Time expired':''}</p>${record.mode==='placement'?`<p>Suggested starting point: <strong>${esc(levelName(record.recommendedLevel))}</strong></p>`:''}</div>
      <div class="wue-panel"><h3>Skill breakdown</h3><div class="wue-skill-results">${weak.map(s=>`<div><span>${ICONS[s.skill]||'ðŸ“'} ${esc(s.skill)}</span><strong>${s.pct}%</strong><div class="wue-progress"><span style="width:${s.pct}%"></span></div></div>`).join('')}</div><h3>What to work on next</h3>${recommended.length?`<ul>${recommended.map(s=>`<li><strong>${esc(s.skill)}</strong> (${s.pct}%): review ${Object.values(s.lessons).filter(l=>l.correct<l.total).map(l=>esc(l.title)).slice(0,5).join(', ')||'lessons in this skill'}.</li>`).join('')}</ul>`:'Great balance across your skills. Keep reviewing lessons to retain your progress.'}</div>
      <div class="wue-panel"><h3>Answer review</h3><p class="wue-muted">Review correct answers and use the lesson links in your own course to study again.</p><div class="wue-review">${review.map((r,i)=>`<details class="wue-review-item"><summary><span>${r.ok?'âœ…':'ðŸ“˜'} ${i+1}. ${esc(r.q.skill)} â€” ${r.ok?'Correct':'Review this'}</span></summary><p><strong>Question:</strong> ${esc(r.q.prompt)}</p><p><strong>Your answer:</strong> ${esc(r.q.type==='choice'?(r.answer===undefined?'Not answered':r.q.options[Number(r.answer)]||r.answer):r.answer||'Not answered')}</p><p><strong>Correct answer:</strong> ${esc(r.q.type==='choice'?r.q.options[r.q.answer]:r.q.answer)}</p><p><strong>Lesson:</strong> ${esc(r.q.lessonTitle)}</p></details>`).join('')}</div></div>
      <div class="wue-actions"><button class="wue-secondary" onclick="wordUpExamHistory()">View attempt history</button><button class="wue-primary" onclick="wordUpExamHome()">Back to course</button></div></section>`;}
  function cleanupTimer(){if(timer){clearInterval(timer);timer=null;}}
  function installGuards(){document.addEventListener('visibilitychange',onVisibility);window.addEventListener('blur',onBlur);document.addEventListener('contextmenu',blockContext);document.addEventListener('copy',blockCopy);document.addEventListener('cut',blockCopy);document.addEventListener('paste',blockCopy);}
  function removeGuards(){document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('blur',onBlur);document.removeEventListener('contextmenu',blockContext);document.removeEventListener('copy',blockCopy);document.removeEventListener('cut',blockCopy);document.removeEventListener('paste',blockCopy);}
  function onVisibility(){if(document.hidden)violation();}function onBlur(){if(state&&!state.finished&&state.started)violation();}function violation(){if(!state||state.finished)return;state.violations++;const f=$('#wueFeedback');if(f)f.textContent=`Focus warning ${state.violations}: please stay on the exam page.`;if(state.violations>=3)finish(false);}function blockContext(e){if(state&&!state.finished)e.preventDefault();}function blockCopy(e){if(state&&!state.finished)e.preventDefault();}
  function cancel(){cleanupTimer();removeGuards();if(state&&state.started&&!state.finished)saveAttempt({id:state.attemptId,mode:state.mode,level:state.level||null,date:new Date(state.started).toISOString(),status:'abandoned',abandonedAt:new Date().toISOString(),answers:state.answers,focusWarnings:state.violations});state=null;const examView=document.getElementById('wordup-exam-overlay');if(examView)examView.remove();if(window.wordUpOpenCourse)window.wordUpOpenCourse();}
  function home(){cleanupTimer();removeGuards();if(state&&state.started&&!state.finished)saveAttempt({id:state.attemptId,mode:state.mode,level:state.level||null,date:new Date(state.started).toISOString(),status:'abandoned',abandonedAt:new Date().toISOString(),answers:state.answers,focusWarnings:state.violations});state=null;const examView=document.getElementById('wordup-exam-overlay');if(examView)examView.remove();if(window.wordUpOpenCourse)window.wordUpOpenCourse();}
  function history(){const a=attempts().slice().reverse();const root=rootBox();if(!root)return;root.innerHTML=`<section class="wue-view">${header('Exam attempt history','Attempts are saved on this device.') }<div class="wue-panel">${a.length?a.map(x=>`<div class="wue-history-row"><span><strong>${esc(x.mode==='master'?'Master Exam':x.mode==='placement'?'Test My Level':levelName(x.level)+' Exam')}</strong><small>${esc(new Date(x.date).toLocaleString())}</small></span><strong>${x.score==null?esc(x.status||'Saved'):x.score+'%'}</strong></div>`).join(''):'<p>No saved attempts yet.</p>'}</div><div class="wue-actions"><button class="wue-primary" onclick="wordUpExamHome()">Back to course</button></div></section>`;}
  function injectCards(){const content=$('#wuCourseContent');if(!content)return;
    // Hide the legacy lesson test controls so assessment exists only at level/course level.
    content.querySelectorAll('.wu-lesson-tabs button').forEach(b=>{if(/^test$/i.test(b.textContent.trim()))b.remove();});
    content.querySelectorAll('.wu-learning-actions button').forEach(b=>{if(/take final test/i.test(b.textContent))b.remove();});
    content.querySelectorAll('.wu-course-lesson-card small').forEach(s=>{if(/test questions/i.test(s.textContent))s.textContent=s.textContent.replace(/\s*[Â·â€¢]\s*\d+\s*test questions?/i,'');});
    const grid=$('.wu-course-level-grid',content);if(grid&&!$('#wue-master-card',content)){const card=document.createElement('button');card.id='wue-master-card';card.className='wue-launch-card wue-master-card';card.innerHTML='<span class="wue-launch-icon">ðŸ†</span><span><strong>Master Exam</strong><small>Assess your learning across the whole course</small></span><b>â†’</b>';card.onclick=()=>openExam('master');grid.insertAdjacentElement('afterend',card);}
    const skills=$('.wu-skill-grid',content);if(skills&&!$('#wue-level-card',content)){const card=document.createElement('button');card.id='wue-level-card';card.className='wue-launch-card';card.innerHTML='<span class="wue-launch-icon">ðŸ“</span><span><strong>Level Exam</strong><small>One timed exam across all six skills</small></span><b>â†’</b>';card.onclick=()=>openExam('level',skills.querySelector('button')?.getAttribute('onclick')?.match(/\('([^']+)'/)?.[1]||state?.level||null);skills.insertAdjacentElement('afterend',card);}
  }
  function patchPlacement(){const fn=function(){openExam('placement');};fn.__wordUpExamPatched=true;['startPlacementTest','startPlacement','wordUpStartPlacement'].forEach(k=>{window[k]=fn;});const launch=document.getElementById('wordup-v10-placement-launch');if(launch&&!launch.dataset.wueBound){launch.addEventListener('click',function(e){e.preventDefault();openExam('placement');});launch.dataset.wueBound='1';}}
  function hookCourse(){const oldTab=window.wordUpCourseTab;if(typeof oldTab==='function'&&!oldTab.__wueWrapped){const tabFn=function(tab){return oldTab(tab==='test'?'practice':tab);};tabFn.__wueWrapped=true;window.wordUpCourseTab=tabFn;}const oldLevel=window.wordUpOpenCourseLevel;if(typeof oldLevel==='function'&&!oldLevel.__wueWrapped){const fn=function(level){oldLevel(level);setTimeout(()=>{const content=$('#wuCourseContent');if(content)content.dataset.wueLevel=level;injectCards();},30);};fn.__wueWrapped=true;window.wordUpOpenCourseLevel=fn;}
    const oldCourse=window.wordUpOpenCourse;if(typeof oldCourse==='function'&&!oldCourse.__wueWrapped){const fn=function(){oldCourse();setTimeout(injectCards,40);};fn.__wueWrapped=true;window.wordUpOpenCourse=fn;}
    const target=$('#wuCourseContent');if(target&&!observer){observer=new MutationObserver(()=>{patchPlacement();injectCards();});observer.observe(target,{childList:true,subtree:true});}patchPlacement();injectCards();}
  window.wordUpExamBegin=begin;window.wordUpExamChoose=choose;window.wordUpExamNext=next;window.wordUpExamPlayAudio=playAudio;window.wordUpExamMic=mic;window.wordUpExamCancel=cancel;window.wordUpExamHome=home;window.wordUpExamHistory=history;
  document.addEventListener('click',function(e){
    const button=e.target instanceof Element
      ? e.target.closest('#wordup-v10-placement-launch, button[onclick="startPlacement()"]')
      : null;
    if(!button)return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    openExam('placement');
  },true);
  function init(){hookCourse();patchPlacement();setInterval(()=>{hookCourse();patchPlacement();},1000);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


