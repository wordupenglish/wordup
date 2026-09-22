const KEY="wordUpV6State";
const OLD="wordUpV5State";

const curriculum={
Vocabulary:{
Beginner:[
{title:"Everyday Adjectives",items:[
["beautiful","/ˈbjuːtɪfəl/","زیبا","having a very pleasing appearance","She has a beautiful smile.","🌸"],
["happy","/ˈhæpi/","خوشحال","feeling pleasure or joy","I am happy today.","😊"],
["strong","/strɔːŋ/","قوی","having physical or mental power","He is strong and healthy.","💪"],
["friendly","/ˈfrendli/","مهربان / دوستانه","kind and pleasant toward others","Our teacher is very friendly.","🤝"],
["careful","/ˈkeəfəl/","محتاط","giving attention to avoid mistakes or danger","Be careful with the glass.","⚠️"]
]},
{title:"Useful Daily Words",items:[
["important","/ɪmˈpɔːtənt/","مهم","having great value or importance","Education is important.","⭐"],
["easy","/ˈiːzi/","آسان","not difficult","This exercise is easy.","👍"],
["difficult","/ˈdɪfɪkəlt/","دشوار","not easy to do or understand","English can be difficult.","🧩"],
["ready","/ˈredi/","آماده","prepared for something","I am ready to start.","🚀"],
["quiet","/ˈkwaɪət/","آرام / ساکت","making little or no noise","The room is quiet.","🤫"]
]},
{title:"People & Character",items:[
["honest","/ˈɒnɪst/","صادق","telling the truth","He is an honest person.","🫱"],
["brave","/breɪv/","شجاع","willing to face danger or difficulty","The brave student spoke first.","🦁"],
["polite","/pəˈlaɪt/","مودب","having good manners","Please be polite to others.","🙏"],
["busy","/ˈbɪzi/","مصروف","having a lot to do","I am busy this morning.","📚"],
["famous","/ˈfeɪməs/","مشهور","known by many people","She is a famous writer.","🌟"]
]}
],
Intermediate:[
{title:"Academic & Professional Vocabulary",items:[
["accurate","/ˈækjərət/","دقیق","correct and free from errors","We need accurate information.","🎯"],
["reliable","/rɪˈlaɪəbəl/","قابل اعتماد","able to be trusted","She is a reliable colleague.","🤝"],
["efficient","/ɪˈfɪʃənt/","کارآمد","working well without wasting time","This system is efficient.","⚙️"],
["essential","/ɪˈsenʃəl/","ضروری","completely necessary","Sleep is essential for health.","🔑"],
["opportunity","/ˌɒpəˈtjuːnəti/","فرصت","a favorable chance","This is a great opportunity.","🚪"]
]},
{title:"Growth & Achievement",items:[
["achieve","/əˈtʃiːv/","به دست آوردن","successfully reach a goal","She worked hard to achieve her goal.","🏆"],
["develop","/dɪˈveləp/","توسعه دادن","grow or improve something","We need to develop our skills.","📈"],
["improve","/ɪmˈpruːv/","بهبود دادن","make something better","Practice will improve your English.","🔧"],
["maintain","/meɪnˈteɪn/","حفظ کردن","keep something at the same level","Maintain a healthy routine.","🔄"],
["require","/rɪˈkwaɪə/","نیاز داشتن","need something","The course requires commitment.","📋"]
]}
],
Advanced:[
{title:"Nuanced Academic English",items:[
["ambiguous","/æmˈbɪɡjuəs/","دوپهلو / مبهم","open to more than one interpretation","The statement is ambiguous.","🔀"],
["compelling","/kəmˈpelɪŋ/","قانع‌کننده","very persuasive or convincing","She presented a compelling argument.","🎤"],
["substantial","/səbˈstænʃəl/","قابل توجه / اساسی","large in amount or importance","The project requires substantial funding.","📊"],
["coherent","/kəʊˈhɪərənt/","منسجم","logical and well organized","Her argument was coherent.","🧠"],
["plausible","/ˈplɔːzəbəl/","محتمل / قابل قبول","seeming reasonable or possible","That explanation sounds plausible.","💡"]
]},
{title:"Precision & Nuance",items:[
["meticulous","/məˈtɪkjələs/","بسیار دقیق","extremely careful about details","He is meticulous in his research.","🔬"],
["nuanced","/ˈnjuːɑːnst/","دارای ظرافت معنایی","showing subtle differences","The article offers a nuanced analysis.","🎨"],
["versatile","/ˈvɜːsətaɪl/","چندکاره","able to adapt to many uses","She is a versatile writer.","🛠️"],
["inevitable","/ɪnˈevɪtəbəl/","اجتناب‌ناپذیر","certain to happen","Change is inevitable.","⏳"],
["sustainable","/səˈsteɪnəbəl/","پایدار","able to continue without causing serious harm","We need sustainable solutions.","🌱"]
]}
]
},
Grammar:{
Beginner:[
{title:"Personal Pronouns",lesson:"Personal pronouns replace names or nouns: I, you, he, she, it, we, they.",examples:["I am a teacher.","She is my friend.","They are students."],dari:"ضمیرهای شخصی جای نام یا اسم را می‌گیرند. مانند: I, you, he, she, it, we, they."},
{title:"Verb To Be",lesson:"Use am with I, is with he/she/it, and are with you/we/they.",examples:["I am ready.","He is happy.","They are busy."],dari:"برای I از am، برای he/she/it از is و برای you/we/they از are استفاده می‌کنیم."},
{title:"Simple Present",lesson:"Use the simple present for habits, facts, and repeated actions.",examples:["I study every day.","She works in Kabul.","They play football."],dari:"زمان حال ساده برای عادت‌ها، واقعیت‌ها و کارهای تکراری استفاده می‌شود."}
],
Intermediate:[
{title:"Present Perfect",lesson:"Use the present perfect for experiences or actions connected to the present.",examples:["I have finished my work.","She has visited Herat.","They have studied English for years."],dari:"حال کامل معمولاً برای تجربه‌ها یا کارهایی استفاده می‌شود که با زمان حال ارتباط دارند."},
{title:"Conditionals",lesson:"Conditional sentences describe possible, imaginary, or general situations.",examples:["If I study, I will improve.","If I had time, I would travel.","If water reaches 100°C, it boils."],dari:"جملات شرطی برای بیان موقعیت‌های واقعی، احتمالی یا فرضی استفاده می‌شوند."},
{title:"Passive Voice",lesson:"The passive focuses on the action or receiver rather than the person doing it.",examples:["The book was written in 2020.","English is spoken worldwide."],dari:"در حالت مجهول تمرکز روی عمل یا گیرنده عمل است، نه انجام‌دهنده آن."}
],
Advanced:[
{title:"Inversion",lesson:"Inversion changes normal word order for emphasis or formal style.",examples:["Rarely have I seen such dedication.","Never had she experienced this before."],dari:"در انگلیسی پیشرفته گاهی برای تأکید یا سبک رسمی، ترتیب عادی جمله تغییر می‌کند."},
{title:"Hedging",lesson:"Academic English often uses cautious language to avoid making claims too absolute.",examples:["The evidence suggests that...","This may indicate that...","It appears that..."],dari:"در نوشتار علمی برای بیان محتاطانه از عباراتی مانند may, suggest و appear استفاده می‌شود."},
{title:"Participle Clauses",lesson:"Participle clauses can make advanced writing more concise.",examples:["Having finished the work, she left.","Designed carefully, the system is reliable."],dari:"عبارت‌های participle می‌توانند جمله‌های پیشرفته را کوتاه‌تر و منسجم‌تر کنند."}
]
},
Writing:{
Beginner:[
{title:"Building a Sentence",lesson:"A basic English sentence usually needs a subject and a verb.",examples:["I study.","She works.","They play football."],dari:"یک جمله ساده انگلیسی معمولاً حداقل به فاعل و فعل نیاز دارد."},
{title:"Capital Letters",lesson:"Use capital letters at the beginning of sentences and for names and places.",examples:["My name is Suliman.","I live in Kabul."],dari:"در ابتدای جمله و برای نام اشخاص و مکان‌ها از حرف بزرگ استفاده می‌کنیم."}
],
Intermediate:[
{title:"Paragraph Structure",lesson:"A good paragraph usually has a topic sentence, supporting ideas, and a concluding sentence.",examples:["Education is important. It develops skills and creates opportunities."],dari:"یک پاراگراف خوب معمولاً جمله موضوعی، ایده‌های پشتیبان و جمله پایانی دارد."},
{title:"Formal Emails",lesson:"Formal writing should be clear, respectful, and appropriately structured.",examples:["Dear Professor, I am writing to ask about the assignment."],dari:"در نوشتار رسمی باید واضح، محترمانه و منظم بنویسیم."}
],
Advanced:[
{title:"Academic Thesis Statements",lesson:"A strong thesis presents a clear, specific position that the paper will develop.",examples:["Regular reading can significantly improve vocabulary acquisition among adult learners."],dari:"در نوشتار دانشگاهی thesis باید موضع مشخص و قابل توسعه مقاله را بیان کند."},
{title:"Hedging & Academic Tone",lesson:"Academic writers often qualify claims rather than presenting every statement as absolute fact.",examples:["The findings appear to suggest that...","This evidence may indicate..."],dari:"لحن علمی معمولاً ادعاها را با احتیاط و دقت بیان می‌کند."}
]
},
Reading:{
Beginner:[
{title:"A New Student",text:"Ali is a new student. He studies English every morning. He likes his class because his teacher is friendly.",question:"Why does Ali like his class?",options:["His teacher is friendly.","He has no homework.","He studies at night.","His class is empty."],answer:0}
],
Intermediate:[
{title:"Learning a Language",text:"Learning a language requires regular exposure and meaningful practice. Memorizing isolated words can help, but learners usually make stronger progress when they encounter vocabulary in real contexts.",question:"What does the passage emphasize?",options:["Memorizing is useless.","Regular meaningful practice is important.","Vocabulary should never be memorized.","Language learning is easy."],answer:1}
],
Advanced:[
{title:"The Value of Context",text:"Vocabulary knowledge extends beyond knowing a dictionary definition. Advanced learners must recognize connotation, register, collocation, and the pragmatic effect of a word within a particular context.",question:"According to the passage, advanced vocabulary knowledge includes:",options:["Only dictionary definitions.","Only pronunciation.","Contextual and pragmatic understanding.","Memorizing longer word lists."],answer:2}
]
},
Listening:{
Beginner:[
{title:"Daily Routine",text:"I wake up at seven o'clock. I have breakfast and go to class.",question:"What time does the speaker wake up?",options:["Six o'clock","Seven o'clock","Eight o'clock","Nine o'clock"],answer:1}
],
Intermediate:[
{title:"Study Advice",text:"Successful learners do not depend on motivation alone. They build routines and continue practicing even when they do not feel motivated.",question:"What does the speaker recommend?",options:["Waiting for motivation.","Building consistent routines.","Studying only when happy.","Avoiding difficult tasks."],answer:1}
],
Advanced:[
{title:"Academic Discussion",text:"Although technology provides unprecedented access to information, access alone does not guarantee meaningful learning. Critical evaluation remains essential.",question:"What qualification does the speaker make?",options:["Technology is always harmful.","Information is unavailable.","Access does not automatically create learning.","Critical thinking is unnecessary."],answer:2}
]
}
};

let state=loadState();
let current={type:"Vocabulary",level:"Beginner",lesson:0,phase:"lesson",item:0,score:0,xp:0,questions:[]};
let selectedLevel="Beginner";

function defaults(){return{xp:0,streak:0,lastDay:"",completed:{},mistakes:[],theme:"light"}}
function loadState(){
 let d=defaults();
 try{
   let old=JSON.parse(localStorage.getItem(OLD)||"null");
   let saved=JSON.parse(localStorage.getItem(KEY)||"null");
   return Object.assign(d,old||{},saved||{});
 }catch{return d}
}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function today(){return new Date().toISOString().slice(0,10)}
function addXP(n){state.xp+=n;document.querySelectorAll("#xp,#homeXP").forEach(x=>x.textContent="⭐ "+state.xp+" XP");save()}
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0)}
function goHome(){updateHome();show("home")}
function updateHome(){
 document.getElementById("homeXP").textContent=state.xp;
 document.getElementById("xp").textContent="⭐ "+state.xp+" XP";
 document.getElementById("streak").textContent=state.streak;
 let total=0,done=0;
 Object.keys(curriculum).forEach(t=>Object.keys(curriculum[t]).forEach(l=>{
   total+=curriculum[t][l].length;
   curriculum[t][l].forEach((_,i)=>{if(state.completed[`${t}-${l}-${i}`])done++})
 }));
 document.getElementById("mastery").textContent=(total?Math.round(done/total*100):0)+"%";
 document.getElementById("mistakes").textContent=state.mistakes.length;
 document.getElementById("mistakeBtn").style.display=state.mistakes.length?"block":"none";
}
function openCurriculum(type){current.type=type;selectedLevel="Beginner";document.getElementById("curriculumType").textContent=type.toUpperCase();show("curriculum");renderLessons()}
function selectLevel(level){selectedLevel=level;renderLessons()}
function renderLessons(){
 ["Beginner","Intermediate","Advanced"].forEach(x=>document.getElementById(x).classList.toggle("active",x===selectedLevel));
 let list=curriculum[current.type][selectedLevel];
 document.getElementById("lessons").innerHTML=list.map((l,i)=>{
   let key=`${current.type}-${selectedLevel}-${i}`,done=state.completed[key],unlock=i===0||state.completed[`${current.type}-${selectedLevel}-${i-1}`];
   return `<div class="lesson-card ${unlock?"":"locked"}">
    <div class="number">${done?"✓":i+1}</div>
    <div><b>${l.title}</b><small>${done?"Completed":"Lesson "+(i+1)}</small></div>
    <button ${unlock?"":"disabled"} onclick="openLesson(${i})">${done?"Review":"Learn"}</button>
   </div>`
 }).join("");
}
function openLesson(i){
 let list=curriculum[current.type][selectedLevel];
 if(!list[i])return;
 current.lesson=i;current.phase="lesson";current.item=0;
 renderLesson();show("lesson");
}
function levelHelp(){
 if(selectedLevel==="Beginner")return "دری: اول یاد بگیر، بعد تمرین و تست کن.";
 if(selectedLevel==="Intermediate")return "Learn the idea first, then practice it.";
 return "Study the concept carefully, then apply it in context.";
}
function renderLesson(){
 let l=curriculum[current.type][selectedLevel][current.lesson];
 if(current.type==="Vocabulary"){renderVocabularyLesson(l)}
 else if(current.type==="Reading"){renderReadingLesson(l)}
 else if(current.type==="Listening"){renderListeningLesson(l)}
 else {renderGrammarWriting(l)}
}
function renderVocabularyLesson(l){
 let items=l.items;
 let x=items[current.item];
 let beginner=selectedLevel==="Beginner";
 document.getElementById("lessonContent").innerHTML=`<div class="lesson-wrap">
 <div class="lesson-hero">
 <p class="eyebrow">${current.type} · ${selectedLevel}</p>
 <h1>${l.title}</h1>
 <p>${levelHelp()}</p>
 <div class="image">${x[5]}</div>
 <p class="word">${x[0]}</p>
 <p class="phonetic">${x[1]}</p>
 <button class="listen" onclick="speak('${esc(x[0])}')">🔊 Listen</button>
 <div class="info-grid">
  ${beginner?`<div class="info"><h3>معنی / Meaning</h3><p class="dari">${x[2]}</p></div>`:""}
  <div class="info"><h3>English Meaning</h3><p>${x[3]}</p></div>
  <div class="info"><h3>Example / مثال</h3><p class="example">“${x[4]}”</p>${beginner?`<p class="dari">مثال برای استفاده از کلمه در جمله.</p>`:""}</div>
 </div>
 <p style="margin-top:20px;color:var(--muted)">Word ${current.item+1} of ${items.length}</p>
 </div></div>`;
}
function renderGrammarWriting(l){
 let beginner=selectedLevel==="Beginner";
 document.getElementById("lessonContent").innerHTML=`<div class="lesson-wrap"><div class="lesson-hero">
 <p class="eyebrow">${current.type} · ${selectedLevel}</p>
 <h1>${l.title}</h1>
 <div class="info"><h3>Lesson</h3><p>${l.lesson}</p></div>
 ${beginner?`<div class="info" style="margin-top:15px"><h3>توضیح دری</h3><p class="dari">${l.dari}</p></div>`:""}
 <h3>Examples</h3>${l.examples.map(x=>`<p class="example">“${x}”</p>`).join("")}
 </div></div>`;
}
function renderReadingLesson(l){
 document.getElementById("lessonContent").innerHTML=`<div class="lesson-wrap"><div class="lesson-hero">
 <p class="eyebrow">READING · ${selectedLevel}</p><h1>${l.title}</h1>
 <p class="example">${l.text}</p>
 ${selectedLevel==="Beginner"?`<div class="info"><p class="dari">اول متن را با دقت بخوان، سپس سؤال را جواب بده.</p></div>`:""}
 </div></div>`;
}
function renderListeningLesson(l){
 document.getElementById("lessonContent").innerHTML=`<div class="lesson-wrap"><div class="lesson-hero">
 <p class="eyebrow">LISTENING · ${selectedLevel}</p><h1>${l.title}</h1>
 <div class="info"><h3>Listen</h3><p>${l.text}</p><button class="listen" onclick="speak('${esc(l.text)}')">🔊 Play Audio</button></div>
 <p>Listen several times. Then continue to practice.</p>
 </div></div>`;
}
function beginPractice(){
 if(current.type==="Vocabulary"){
   if(current.item<curriculum[current.type][selectedLevel][current.lesson].items.length-1){current.item++;renderLesson();return}
 }
 current.phase="practice";current.item=0;renderPractice();show("practice");
}
function renderPractice(){
 let l=curriculum[current.type][selectedLevel][current.lesson];
 let html="";
 if(current.type==="Vocabulary"){
   let x=l.items[current.item], beginner=selectedLevel==="Beginner";
   html=`<div class="practice-card"><p class="eyebrow">PRACTICE</p><h2>${x[0]}</h2>
   <p class="phonetic">${x[1]}</p><button class="listen" onclick="speak('${esc(x[0])}')">🔊 Listen</button>
   <h3>${beginner?"معنی درست را انتخاب کن / Choose the correct meaning":"Choose the correct English meaning"}</h3>
   <div class="practice-options">
    ${practiceOptions(x).map((o,i)=>`<button class="option" onclick="practiceAnswer(${i},${i===0})">${o}</button>`).join("")}
   </div></div>`;
 }else{
   html=`<div class="practice-card"><p class="eyebrow">GUIDED PRACTICE</p><h2>${l.title}</h2><p>${current.type==="Reading"||current.type==="Listening"?l.question:l.examples[0]}</p>
   <p class="dari">${selectedLevel==="Beginner"?"حالا مفهوم را با یک تمرین کوتاه بررسی کن.":"Now apply what you have learned."}</p></div>`;
 }
 document.getElementById("practiceLabel").textContent=`${current.type} Practice`;
 document.getElementById("practiceCount").textContent=current.type==="Vocabulary"?`${current.item+1}/${l.items.length}`:"1 practice";
 document.getElementById("practiceContent").innerHTML=html;
 document.getElementById("practiceNext").style.display=current.type==="Vocabulary"?"none":"block";
}
function practiceOptions(x){
 let pool=[x[2],x[3],"a type of person","an action or place"];
 return shuffle(pool).slice(0,4);
}
function practiceAnswer(i,correct){
 document.querySelectorAll(".option").forEach(x=>x.disabled=true);
 document.querySelectorAll(".option")[i].classList.add(correct?"correct":"wrong");
 let l=curriculum[current.type][selectedLevel][current.lesson];
 setTimeout(()=>{
   if(current.item<l.items.length-1){current.item++;renderPractice()}
   else startQuiz();
 },650);
}
function practiceNext(){startQuiz()}
function startQuiz(){
 current.questions=makeQuestions();current.item=0;current.score=0;current.xp=0;
 show("quiz");renderQuestion();
}
function makeQuestions(){
 let l=curriculum[current.type][selectedLevel][current.lesson];
 if(current.type==="Vocabulary"){
   return l.items.map(x=>{
    let correct=selectedLevel==="Beginner"?x[2]:x[3];
    let pool=l.items.filter(y=>y!==x).map(y=>selectedLevel==="Beginner"?y[2]:y[3]);
    return {q:selectedLevel==="Beginner"?`What does “${x[0]}” mean?`:`Which meaning best matches “${x[0]}”?`,a:correct,o:shuffle([correct,...pool]).slice(0,4),ex:`${x[0]} — ${x[3]}`};
   });
 }
 if(current.type==="Reading"||current.type==="Listening"){
   return [{q:l.question,a:l.options[l.answer],o:l.options,ex:l.text}];
 }
 let qs=[];
 let base=l.examples||[];
 base.forEach((e,i)=>qs.push({q:`Which sentence correctly demonstrates “${l.title}”?`,a:e,o:shuffle([e,...base.filter(x=>x!==e),"This sentence is not correct."]).slice(0,4),ex:l.lesson}));
 return qs.slice(0,3);
}
function renderQuestion(){
 let qs=current.questions,x=qs[current.item],pct=current.item/qs.length*100;
 document.getElementById("quizProgress").textContent=`${current.item+1} / ${qs.length}`;
 document.getElementById("quizXP").textContent="⭐ "+current.xp;
 document.getElementById("bar").style.width=pct+"%";
 document.getElementById("question").innerHTML=`<div class="q-type">${current.type} · ${selectedLevel}</div><div class="q-text">${x.q}</div>`;
 document.getElementById("answers").innerHTML=x.o.map((o,i)=>`<button class="answer" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join("");
 document.getElementById("feedback").innerHTML="";
}
function answer(i){
 let x=current.questions[current.item],buttons=[...document.querySelectorAll(".answer")];
 buttons.forEach(b=>b.disabled=true);
 let correct=x.o[i]===x.a;
 buttons[i].classList.add(correct?"correct":"wrong");
 if(correct){current.score++;current.xp+=10;addXP(10)}
 else{
   state.mistakes.push({type:current.type,level:selectedLevel,lesson:current.lesson,q:x.q,a:x.a});
   state.mistakes=state.mistakes.slice(-30);
 }
 save();
 document.getElementById("feedback").innerHTML=`<div class="feedback ${correct?"good":"bad"}">
 ${correct?"✅ Correct!":"❌ Not quite."} ${selectedLevel==="Beginner"?`<br>Explanation: ${x.ex}`:`<br>${x.ex}`}
 </div>`;
 setTimeout(()=>{
  current.item++;
  if(current.item<current.questions.length)renderQuestion();else finishQuiz();
 },900);
}
function finishQuiz(){
 let total=current.questions.length,score=Math.round(current.score/total*100);
 let key=`${current.type}-${selectedLevel}-${current.lesson}`;
 if(score>=70){state.completed[key]=true;updateStreak()}
 addXP(score>=90?30:score>=70?20:5);
 save();
 document.getElementById("resultTitle").textContent=score>=70?"🎉 Lesson Mastered!":"📚 Keep Practicing!";
 document.getElementById("resultText").textContent=`You scored ${score}%. ${score>=70?"The next lesson is ready when you are.":"Review the lesson and try again."}`;
 document.getElementById("resultScore").textContent=score+"%";
 document.getElementById("resultEarned").textContent=current.xp;
 show("result");
}
function finishResult(){
 if(state.completed[`${current.type}-${selectedLevel}-${current.lesson}`]&&current.lesson+1<curriculum[current.type][selectedLevel].length){
   current.lesson++;current.item=0;renderLesson();show("lesson");
 }else{openCurriculum(current.type)}
 updateHome();
}
function updateStreak(){
 let d=today();
 if(state.lastDay!==d){state.streak++;state.lastDay=d}
}
function startContinue(){
 for(let t of Object.keys(curriculum))for(let l of ["Beginner","Intermediate","Advanced"])for(let i=0;i<curriculum[t][l].length;i++){
   if(!state.completed[`${t}-${l}-${i}`]){current.type=t;selectedLevel=l;current.lesson=i;renderLesson();show("lesson");return}
 }
 openCurriculum("Vocabulary");
}
function backToCurriculum(){openCurriculum(current.type)}
function quitQuiz(){if(confirm("Leave this quiz? Your current quiz progress will not be saved."))backToCurriculum()}
function startMistakes(){
 if(!state.mistakes.length)return;
 let m=state.mistakes[0];
 current.type=m.type;selectedLevel=m.level;current.lesson=m.lesson;
 current.questions=state.mistakes.slice(0,10).map(x=>({q:x.q,a:x.a,o:shuffle([x.a,"Not enough information","None of these","Another answer"]),ex:"Review this item carefully."}));
 current.item=0;current.score=0;current.xp=0;show("quiz");renderQuestion();
}
function toggleTheme(){
 state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");save()
}
function speak(text){
 if(!("speechSynthesis"in window))return;
 speechSynthesis.cancel();
 let u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.82;speechSynthesis.speak(u);
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function esc(s){return String(s).replace(/'/g,"\\'").replace(/\n/g," ")}
document.addEventListener("DOMContentLoaded",()=>{
 document.body.classList.toggle("dark",state.theme==="dark");
 updateHome();
});
