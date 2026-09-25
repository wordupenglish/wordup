const DATA = {

vocabulary:{
beginner:[
{
id:"vb1",
title:"Everyday Adjectives",
description:"Learn useful adjectives for everyday English.",
teach:{
intro:"این درس چند صفت بسیار کاربردی انگلیسی را به شما یاد می‌دهد. اول معنی و کاربرد را یاد بگیرید، سپس تمرین و تست کنید."
},
items:[
["beautiful","/ˈbjuːtɪfəl/","زیبا","She has a beautiful smile.","🌸"],
["happy","/ˈhæpi/","خوشحال","I am happy today.","😊"],
["strong","/strɔːŋ/","قوی","He is very strong.","💪"],
["friendly","/ˈfrendli/","مهربان","Our teacher is friendly.","🤝"],
["careful","/ˈkeəfəl/","محتاط","Be careful on the road.","⚠️"]
]
},
{
id:"vb2",
title:"Useful Daily Words",
description:"Important words you can use every day.",
teach:{intro:"این کلمات در مکالمات روزمره بسیار مهم هستند."},
items:[
["important","/ɪmˈpɔːtənt/","مهم","Education is important.","⭐"],
["easy","/ˈiːzi/","آسان","This question is easy.","🙂"],
["difficult","/ˈdɪfɪkəlt/","دشوار","English can be difficult.","📘"],
["ready","/ˈredi/","آماده","I am ready.","✅"],
["quiet","/ˈkwaɪət/","آرام","The room is quiet.","🤫"]
]
},
{
id:"vb3",
title:"People & Character",
description:"Describe people and personality.",
teach:{intro:"با این کلمات می‌توانید شخصیت و وضعیت افراد را توصیف کنید."},
items:[
["honest","/ˈɒnɪst/","صادق","He is an honest person.","🤝"],
["brave","/breɪv/","شجاع","She is brave.","🦁"],
["polite","/pəˈlaɪt/","مودب","He is always polite.","🙂"],
["busy","/ˈbɪzi/","مصروف","I am busy today.","💼"],
["famous","/ˈfeɪməs/","مشهور","She is a famous writer.","🌟"]
]
}
],

intermediate:[
{
id:"vi1",
title:"Academic & Professional Vocabulary",
description:"Build useful academic and workplace vocabulary.",
teach:{intro:"In Intermediate English, the goal is to understand English explanations and use precise English naturally."},
items:[
["accurate","/ˈækjərət/","correct and exact","The report must be accurate.","🎯"],
["reliable","/rɪˈlaɪəbəl/","able to be trusted","She is a reliable colleague.","🤝"],
["efficient","/ɪˈfɪʃənt/","working well without waste","This method is efficient.","⚙️"],
["essential","/ɪˈsenʃəl/","necessary or extremely important","Practice is essential.","🔑"],
["opportunity","/ˌɒpəˈtjuːnəti/","a favorable chance","This is a great opportunity.","🚪"]
]
},
{
id:"vi2",
title:"Growth & Achievement",
description:"Vocabulary for progress, goals and achievement.",
teach:{intro:"Study the meaning and examples carefully. Then use these words in context."},
items:[
["achieve","/əˈtʃiːv/","successfully reach a goal","She achieved her goal.","🏆"],
["develop","/dɪˈveləp/","grow or improve","We need to develop our skills.","📈"],
["improve","/ɪmˈpruːv/","make better","I want to improve my English.","🚀"],
["maintain","/meɪnˈteɪn/","keep at the same level","Maintain a regular routine.","🔄"],
["require","/rɪˈkwaɪə/","need or demand","The job requires experience.","📋"]
]
}
],

advanced:[
{
id:"va1",
title:"Nuanced Academic English",
description:"Understand sophisticated academic vocabulary.",
teach:{intro:"At Advanced level, focus on nuance, context and precise meaning."},
items:[
["ambiguous","/æmˈbɪɡjuəs/","open to more than one interpretation","The statement was ambiguous.","🔎"],
["compelling","/kəmˈpelɪŋ/","very convincing or persuasive","She presented a compelling argument.","🎯"],
["substantial","/səbˈstænʃəl/","large or important in amount","The study found substantial evidence.","📊"],
["coherent","/kəʊˈhɪərənt/","logical and well connected","Her argument was coherent.","🧩"],
["plausible","/ˈplɔːzəbəl/","reasonable and believable","That explanation is plausible.","💡"]
]
},
{
id:"va2",
title:"Precision & Nuance",
description:"Master higher-level vocabulary.",
teach:{intro:"These words help you express complex ideas with greater precision."},
items:[
["meticulous","/məˈtɪkjələs/","extremely careful and detailed","He is meticulous in his research.","🔬"],
["nuanced","/ˈnjuːɑːnst/","showing subtle differences","Her analysis was nuanced.","🎨"],
["versatile","/ˈvɜːsətaɪl/","able to adapt to many uses","She is a versatile writer.","🛠️"],
["inevitable","/ɪnˈevɪtəbəl/","certain to happen","Change is inevitable.","⏳"],
["sustainable","/səˈsteɪnəbəl/","able to continue without causing serious harm","We need sustainable solutions.","🌱"]
]
}
]
},

grammar:{
beginner:[
{
id:"gb1",
title:"Personal Pronouns",
description:"Learn I, you, he, she, it, we and they.",
teach:{
intro:"ضمیرهای شخصی برای نشان دادن شخص یا چیز استفاده می‌شوند.",
examples:["I am a student.","She is my sister.","They are teachers."]
},
questions:[
["کدام گزینه معنی «او (مذکر)» را می‌دهد؟",["he","she","they","we"],0,"«He» برای یک مرد یا پسر استفاده می‌شود."],
["Choose the correct sentence.",["I am a student.","I is a student.","I are a student.","I be a student."],0,"با I از am استفاده می‌کنیم."]
]
},
{
id:"gb2",
title:"Verb To Be",
description:"Use am, is and are correctly.",
teach:{
intro:"فعل to be در زمان حال به شکل‌های am، is و are استفاده می‌شود.",
examples:["I am ready.","He is happy.","They are busy."]
},
questions:[
["کدام گزینه درست است؟",["She are happy.","She is happy.","She am happy.","She be happy."],1,"برای she از is استفاده می‌کنیم."],
["Choose the correct form: They ___ students.",["am","is","are","be"],2,"برای they از are استفاده می‌کنیم."]
]
},
{
id:"gb3",
title:"Simple Present",
description:"Talk about routines and facts.",
teach:{
intro:"زمان Simple Present برای عادت‌ها، برنامه‌های روزمره و حقایق استفاده می‌شود.",
examples:["I study English.","She works every day.","Water boils at 100°C."]
},
questions:[
["کدام جمله درست است؟",["He work every day.","He works every day.","He working every day.","He is work every day."],1,"برای he/she/it معمولاً به فعل s/es اضافه می‌کنیم."],
["I ___ English every day.",["study","studies","studying","am study"],0,"با I شکل ساده فعل استفاده می‌شود."]
]
}
],

intermediate:[
{
id:"gi1",
title:"Present Perfect",
description:"Connect past experiences with the present.",
teach:{
intro:"Use the present perfect for experiences, recent actions, and situations connected to now.",
examples:["I have finished my work.","She has visited Herat.","They have lived here for years."]
},
questions:[
["Choose the correct sentence.",["I have finished my work.","I has finished my work.","I have finish my work.","I am finished my work."],0,"Use have/has + past participle."],
["She ___ never seen this movie.",["have","has","is","did"],1,"Use has with she."]
]
},
{
id:"gi2",
title:"Conditionals",
description:"Express real and hypothetical situations.",
teach:{
intro:"Conditionals connect a condition with a result.",
examples:["If I study, I will improve.","If I had time, I would travel."]
},
questions:[
["If I study hard, I ___ pass.",["will","would","was","have"],0,"First conditional uses will for the likely result."],
["If I had more time, I ___ travel.",["will","would","am","have"],1,"Second conditional commonly uses would."]
]
},
{
id:"gi3",
title:"Passive Voice",
description:"Focus on the action rather than the doer.",
teach:{
intro:"The passive voice uses a form of be + past participle.",
examples:["The book was written in 2020.","English is spoken worldwide."]
},
questions:[
["Choose the passive sentence.",["People speak English.","English is spoken worldwide.","People are speaking English.","People spoke English."],1,"The passive focuses on English rather than the people."],
["The letter ___ yesterday.",["sent","was sent","is send","sending"],1,"Past passive = was/were + past participle."]
]
}
],

advanced:[
{
id:"ga1",
title:"Inversion",
description:"Use advanced word order for emphasis.",
teach:{
intro:"In formal English, inversion can create emphasis after negative or limiting expressions.",
examples:["Never have I seen such a view.","Rarely does he complain."]
},
questions:[
["Choose the correct sentence.",["Never I have seen it.","Never have I seen it.","Never seen I have it.","Never I saw have it."],1,"After Never in this structure, auxiliary and subject are inverted."]
]
},
{
id:"ga2",
title:"Hedging",
description:"Express academic claims carefully.",
teach:{
intro:"Hedging helps writers avoid making claims stronger than the evidence supports.",
examples:["The results may suggest...","This appears to indicate..."]
},
questions:[
["Which phrase is appropriately cautious?",["This definitely proves everything.","This may suggest a relationship.","Everyone knows this is true.","There is absolutely no doubt."],1,"May suggest is a cautious academic expression."]
]
},
{
id:"ga3",
title:"Participle Clauses",
description:"Create concise advanced sentences.",
teach:{
intro:"Participle clauses can make formal writing more concise.",
examples:["Having finished the work, she left.","Designed carefully, the system is reliable."]
},
questions:[
["Choose the correct sentence.",["Having finished the work, she left.","Having finish the work, she left.","Having finished work she leaving.","Finished having the work, she left."],0,"Having + past participle can show an earlier completed action."]
]
}
]
},

writing:{
beginner:[
{
id:"wb1",
title:"Building a Sentence",
description:"Create clear basic sentences.",
teach:{intro:"جمله انگلیسی معمولاً با فاعل + فعل + مفعول یا مکمل ساخته می‌شود.",examples:["I study English.","She reads books."]},
questions:[
["کدام جمله درست است؟",["English I study.","I English study.","I study English.","Study I English."],2,"ساختار طبیعی جمله: Subject + Verb + Object."],
["Choose the correct sentence.",["She reads books.","She read books every day.","She reading books.","She books reads."],0,"She + reads + books is correct."]
]
},
{
id:"wb2",
title:"Capital Letters",
description:"Use capitalization correctly.",
teach:{intro:"حروف بزرگ در ابتدای جمله، نام افراد، مکان‌ها و زبان‌ها استفاده می‌شوند.",examples:["I live in Kabul.","English is useful."]},
questions:[
["Choose the correct sentence.",["i live in Kabul.","I live in kabul.","I live in Kabul.","i live in kabul."],2,"I and Kabul need capital letters."]
]
}
],
intermediate:[
{
id:"wi1",
title:"Paragraph Structure",
description:"Write focused academic paragraphs.",
teach:{intro:"A strong paragraph normally has a topic sentence, supporting ideas and a concluding sentence.",examples:["Topic sentence → evidence → explanation → conclusion."]},
questions:[
["What usually introduces the main idea of a paragraph?",["A topic sentence","A random example","A reference list","A question only"],0,"The topic sentence normally introduces the paragraph's main idea."]
]
},
{
id:"wi2",
title:"Formal Emails",
description:"Use an appropriate professional tone.",
teach:{intro:"Formal emails should be clear, respectful and appropriately structured.",examples:["Dear Professor,","I am writing to ask about...","Kind regards,"]},
questions:[
["Which opening is most appropriate for a professor?",["Hey!!!","Yo professor","Dear Professor,","What's up?"],2,"Dear Professor is a professional opening."]
]
}
],
advanced:[
{
id:"wa1",
title:"Academic Thesis Statements",
description:"Make a clear, arguable central claim.",
teach:{intro:"An academic thesis should communicate a focused position or claim that can be supported with evidence.",examples:["This essay argues that..."]},
questions:[
["Which is the strongest academic thesis?",["Education is good.","This essay argues that access to education significantly affects social mobility.","I like education.","Education is something everyone knows."],1,"It presents a focused, arguable claim."]
]
},
{
id:"wa2",
title:"Hedging & Academic Tone",
description:"Make claims precise and appropriately cautious.",
teach:{intro:"Academic writing often uses cautious language when evidence does not justify absolute claims.",examples:["The evidence appears to suggest...","The findings may indicate..."]},
questions:[
["Which phrase uses appropriate academic hedging?",["This proves everything.","The findings may indicate a relationship.","This is always true.","Everyone agrees."],1,"May indicate appropriately limits the strength of the claim."]
]
}
]
},

reading:{
beginner:[
{
id:"rb1",
title:"A New Student",
description:"Read a short everyday passage.",
teach:{intro:"اول متن را با دقت بخوانید. به کلمات کلیدی و ایده اصلی توجه کنید."},
passage:"Sara is a new student at a school in Kabul. On her first day, she meets a friendly teacher. The teacher shows her the classroom and introduces her to the other students. Sara feels happy because everyone welcomes her.",
questions:[
["Why is Sara happy?",["Because she goes home early.","Because everyone welcomes her.","Because she is a teacher.","Because she misses school."],1,"The passage says everyone welcomes Sara."]
]
},
{
id:"rb2",
title:"Daily Learning",
description:"Understand a simple informational text.",
teach:{intro:"به ایده اصلی متن توجه کنید."},
passage:"Ali studies English for thirty minutes every morning. He reads a short article, writes five new words, and then reviews them. He believes that a small daily routine helps him remember more.",
questions:[
["How long does Ali study English each morning?",["Ten minutes","Twenty minutes","Thirty minutes","Two hours"],2,"The text says thirty minutes."]
]
}
],
intermediate:[
{
id:"ri1",
title:"Learning a Language",
description:"Read for main ideas and supporting details.",
teach:{intro:"Read the passage once for the main idea, then again for details."},
passage:"Language learning is often more effective when learners interact with meaningful material. Memorizing isolated words can help, but seeing vocabulary in context makes it easier to understand how words function in real communication. Regular exposure also helps learners notice patterns.",
questions:[
["According to the passage, why is context useful?",["It makes grammar unnecessary.","It shows how words function in communication.","It removes the need for practice.","It guarantees fluency."],1,"The passage directly connects context with real communication."]
]
},
{
id:"ri2",
title:"Learning Habits",
description:"Identify relationships between ideas.",
teach:{intro:"Focus on the relationship between habits and learning."},
passage:"Effective learners do not simply spend more time studying. They also organize their practice, review difficult material and monitor their progress. This approach allows them to identify weaknesses before those weaknesses become persistent problems.",
questions:[
["What do effective learners do besides spending time studying?",["Avoid difficult material.","Organize practice and monitor progress.","Stop reviewing.","Study only once."],1,"These actions are explicitly described."]
]
}
],
advanced:[
{
id:"ra1",
title:"The Value of Context",
description:"Analyze a more sophisticated argument.",
teach:{intro:"At Advanced level, focus on the writer's reasoning and implications."},
passage:"Context does more than clarify vocabulary. It can alter the pragmatic force of an expression, reveal assumptions shared by speakers, and determine whether an utterance sounds formal, humorous, indirect, or even confrontational. Consequently, advanced learners benefit from studying language beyond dictionary definitions.",
questions:[
["What can context determine according to the passage?",["Only spelling","Whether an utterance sounds formal, humorous, indirect or confrontational","Only pronunciation","Nothing about meaning"],1,"The passage lists several pragmatic effects of context."]
]
}
]
},

listening:{
beginner:[
{
id:"lb1",
title:"Daily Routine",
description:"Listen to a short everyday English passage.",
teach:{intro:"برای شنیدن، ابتدا متن را ببینید. سپس روی Play بزنید و بدون نگاه کردن دوباره گوش دهید."},
audio:"I wake up at seven o'clock. I have breakfast and then I study English. In the afternoon, I work. In the evening, I read a book.",
questions:[
["What time does the speaker wake up?",["Six o'clock","Seven o'clock","Eight o'clock","Nine o'clock"],1,"The speaker says seven o'clock."]
]
},
{
id:"lb2",
title:"A Simple Plan",
description:"Listen for key information.",
teach:{intro:"به زمان و فعالیت‌های اصلی توجه کنید."},
audio:"Tomorrow I will visit my friend. We will have lunch together and then we will go to the library.",
questions:[
["Where will they go after lunch?",["The airport","The library","The school","The market"],1,"The speaker says they will go to the library."]
]
}
],
intermediate:[
{
id:"li1",
title:"Study Advice",
description:"Listen for the speaker's main recommendation.",
teach:{intro:"Listen once for the general idea and again for important details."},
audio:"If you want to improve your English, try to study consistently rather than waiting for long periods of free time. Even twenty minutes a day can create a useful routine.",
questions:[
["What does the speaker recommend?",["Studying only on weekends","Studying consistently","Avoiding short sessions","Studying once a month"],1,"The speaker recommends consistent study."]
]
}
],
advanced:[
{
id:"la1",
title:"Academic Discussion",
description:"Listen for a nuanced academic claim.",
teach:{intro:"Listen for the speaker's qualification and main conclusion."},
audio:"The evidence does not necessarily demonstrate that technology improves learning in every situation. However, when digital tools are used purposefully, they may support access, feedback and learner engagement.",
questions:[
["What does the speaker say about technology?",["It always improves learning.","It never helps learning.","Purposeful use may support learning.","Technology should replace teachers."],2,"The speaker qualifies the claim and emphasizes purposeful use."]
]
}
]
}

};


// ============================================================
// STATE
// ============================================================

const STORAGE_KEY="wordUpV8State";

let state={
version:8,
xp:0,
streak:0,
lastStudy:"",
theme:"light",
lessons:{},
mistakes:[],
reviews:{},
placement:null
};

try{
const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
if(saved) state={...state,...saved};
}catch(e){}

let currentSkill="vocabulary";
let currentLevel="beginner";
let currentLesson=null;
let currentMode=null;
let learnStep=0;
let quizQuestions=[];
let quizIndex=0;
let quizScore=0;
let selectedAnswer=null;
let answerChecked=false;

let placementQuestions=[];
let placementIndex=0;
let placementScore=0;
let placementAnswer=null;
let placementChecked=false;


// ============================================================
// STORAGE
// ============================================================

function save(){
localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
updateStats();
}

function updateStreak(){
const today=new Date().toISOString().slice(0,10);

if(state.lastStudy===today)return;

if(state.lastStudy){
const old=new Date(state.lastStudy);
const now=new Date(today);
const diff=Math.round((now-old)/86400000);

if(diff===1) state.streak++;
else if(diff>1) state.streak=1;
}else{
state.streak=1;
}

state.lastStudy=today;
}

function addXP(amount){
state.xp+=amount;
updateStreak();
save();
}


// ============================================================
// SCREENS
// ============================================================

function showScreen(id){
document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
const el=document.getElementById(id);
if(el)el.classList.add("active");
window.scrollTo({top:0,behavior:"auto"});
updateStats();
}

function goHome(){
closeModal();
showScreen("home");
}

function toggleTheme(){
state.theme=state.theme==="dark"?"light":"dark";
document.body.classList.toggle("dark",state.theme==="dark");
save();
}

function loadTheme(){
document.body.classList.toggle("dark",state.theme==="dark");
}


// ============================================================
// STATS
// ============================================================

function allLessons(){
const out=[];
for(const skill of Object.keys(DATA)){
for(const level of Object.keys(DATA[skill])){
DATA[skill][level].forEach((lesson,index)=>{
out.push({skill,level,index,lesson});
});
}
}
return out;
}

function lessonState(id){
return state.lessons[id]||{};
}

function masteryPercent(){
const lessons=allLessons();
if(!lessons.length)return 0;
const passed=lessons.filter(x=>lessonState(x.lesson.id).passed).length;
return Math.round((passed/lessons.length)*100);
}

function updateStats(){
const xp=document.getElementById("homeXP");
const streak=document.getElementById("homeStreak");
const mastery=document.getElementById("homeMastery");
const lessons=document.getElementById("homeLessons");

if(xp)xp.textContent=state.xp;
if(streak)streak.textContent=state.streak;
if(mastery)mastery.textContent=masteryPercent()+"%";
if(lessons)lessons.textContent=allLessons().filter(x=>lessonState(x.lesson.id).passed).length;
}


// ============================================================
// CURRICULUM
// ============================================================

function openSkill(skill){
currentSkill=skill;
document.getElementById("curriculumTitle").textContent=
skill.charAt(0).toUpperCase()+skill.slice(1);
currentLevel="beginner";
setLevel("beginner");
showScreen("curriculum");
}

function setLevel(level){
currentLevel=level;

document.querySelectorAll(".level-tab").forEach(btn=>{
btn.classList.toggle("active",btn.dataset.level===level);
});

renderLessons();
}

function levelCompleted(skill,level){
return DATA[skill][level].every(l=>lessonState(l.id).passed);
}

function levelUnlocked(skill,level){
if(level==="beginner")return true;

if(level==="intermediate")
return levelCompleted(skill,"beginner");

if(level==="advanced")
return levelCompleted(skill,"intermediate");

return false;
}

function canOpenLesson(skill,level,index){
if(!levelUnlocked(skill,level))return false;
if(index===0)return true;

const previous=DATA[skill][level][index-1];
return !!lessonState(previous.id).passed;
}

function renderLessons(){
const container=document.getElementById("lessonList");
const lessons=DATA[currentSkill][currentLevel];

if(!levelUnlocked(currentSkill,currentLevel)){
container.innerHTML=`
<div class="empty">
<h2>🔒 Level locked</h2>
<p>Pass all ${currentLevel==="advanced"?"Intermediate":"Beginner"} tests in this skill to unlock this level.</p>
</div>`;
return;
}

container.innerHTML=lessons.map((lesson,index)=>{
const s=lessonState(lesson.id);
const open=canOpenLesson(currentSkill,currentLevel,index);
const learned=s.learned;
const passed=s.passed;

let status=`<span class="status">${open?"AVAILABLE":"LOCKED"}</span>`;
if(passed)status=`<span class="status pass">✓ TEST PASSED</span>`;
else if(learned)status=`<span class="status learned">✓ LEARNED</span>`;

return`
<article class="lesson-card ${open?"":"locked"}">
<div class="lesson-number">LESSON ${index+1}</div>
${status}
<h3>${escapeHtml(lesson.title)}</h3>
<p>${escapeHtml(lesson.description)}</p>

<div class="lesson-actions">
<button ${open?"":"disabled"} onclick="startActivity('learn',${index})">📖 Learn</button>
<button ${open&&learned?"":"disabled"} onclick="startActivity('practice',${index})">🧠 Practice</button>
<button class="test-btn" ${open&&learned?"":"disabled"} onclick="startActivity('test',${index})">📝 Test</button>
</div>
</article>`;
}).join("");
}


// ============================================================
// LEARNING
// ============================================================

function startActivity(mode,index){
if(!canOpenLesson(currentSkill,currentLevel,index))return;

const lesson=DATA[currentSkill][currentLevel][index];
const s=lessonState(lesson.id);

if(mode!=="learn"&&!s.learned){
openModal(`
<h2>Learn this lesson first</h2>
<p>Complete the Learn activity before starting Practice or the Final Test.</p>
<button class="primary full" onclick="closeModal();startActivity('learn',${index})">Start Learning</button>
`);
return;
}

currentLesson={...lesson,index};
currentMode=mode;

if(mode==="learn"){
learnStep=0;
renderLearn();
showScreen("lesson");
}else{
startQuiz(mode);
}
}

function renderLearn(){
const lesson=currentLesson;

document.getElementById("activityLabel").textContent=
"LEARN • "+lesson.title;

const total=lesson.items?lesson.items.length:1;
const progress=Math.round((learnStep/total)*100);
document.getElementById("lessonProgressBar").style.width=progress+"%";

let html="";

if(learnStep===0){
html=`
<h1>${escapeHtml(lesson.title)}</h1>
<p class="muted">${escapeHtml(lesson.description)}</p>
<div class="teach-card">
<strong>Teacher's note</strong>
<p>${escapeHtml(lesson.teach.intro)}</p>
</div>`;

if(lesson.passage){
html+=`<h2>Read</h2><p>${escapeHtml(lesson.passage)}</p>`;
}

if(lesson.audio){
html+=`
<h2>Listen</h2>
<button class="primary" onclick="speak(${JSON.stringify(lesson.audio)})">🔊 Play audio</button>
<div class="teach-card"><small>${escapeHtml(lesson.audio)}</small></div>`;
}

if(lesson.teach.examples){
html+=`<h2>Examples</h2>`+
lesson.teach.examples.map(x=>`<div class="example">${escapeHtml(x)}</div>`).join("");
}

if(lesson.items){
html+=`<p><b>${lesson.items.length} items</b> will be introduced in this lesson.</p>`;
}

}else if(lesson.items){

const item=lesson.items[learnStep-1];

html=`
<div class="word-display">${escapeHtml(item[0])}</div>
<div class="ipa">${escapeHtml(item[1])}</div>
<div class="translation">${escapeHtml(item[2])}</div>
<div class="teach-card">
<b>Example</b>
<div class="example">${escapeHtml(item[3])}</div>
<div style="font-size:42px;margin-top:12px">${item[4]}</div>
</div>
<button class="secondary" onclick="speak(${JSON.stringify(item[0])})">🔊 Hear pronunciation</button>
`;

}else{
html=`
<h1>${escapeHtml(lesson.title)}</h1>
<div class="teach-card">
${escapeHtml(lesson.teach.intro)}
</div>
`;
}

document.getElementById("lessonContent").innerHTML=html;
}

function nextLearnStep(){
const lesson=currentLesson;
const total=lesson.items?lesson.items.length+1:1;

if(learnStep<total-1){
learnStep++;
renderLearn();
return;
}

state.lessons[lesson.id]={
...lessonState(lesson.id),
learned:true
};

addXP(lesson.items?10:8);
save();

openChoiceModal();
}


// ============================================================
// LEARN → PRACTICE / TEST
// ============================================================

function openChoiceModal(){
document.getElementById("modalContent").innerHTML=`
<h2>Lesson learned 🎉</h2>
<p>You have completed the teaching section. What would you like to do next?</p>

<div class="choice-grid">
<button onclick="chooseAfterLearn('practice')">
🧠 <b>Practice</b><br>
<small>No official score. Learn from mistakes.</small>
</button>

<button onclick="chooseAfterLearn('test')">
📝 <b>Final Test</b><br>
<small>Scored. Passing unlocks the next lesson.</small>
</button>

<button onclick="closeModal();backToCurriculum()">
← Back to Lessons
</button>
</div>`;
document.getElementById("modal").classList.remove("hidden");
}

function chooseAfterLearn(mode){
closeModal();
startActivity(mode,currentLesson.index);
}

function closeModal(){
document.getElementById("modal").classList.add("hidden");
}

function backToCurriculum(){
renderLessons();
showScreen("curriculum");
}

function exitActivity(){
if(confirm("Exit this activity? Your completed progress is already saved.")){
backToCurriculum();
}
}


// ============================================================
// QUIZ ENGINE
// ============================================================

function startQuiz(mode){
currentMode=mode;

const lesson=currentLesson;

if(lesson.items){
quizQuestions=buildVocabularyQuestions(lesson);
}else{
quizQuestions=lesson.questions.map(q=>({
question:q[0],
options:q[1],
correctIndex:q[2],
explanation:q[3]
}));
}

quizIndex=0;
quizScore=0;
selectedAnswer=null;
answerChecked=false;

document.getElementById("quizBadge").textContent=
mode==="practice"?"🧠 PRACTICE — NO SCORE":"📝 FINAL TEST — SCORED";

renderQuiz();
showScreen("quiz");
}

function buildVocabularyQuestions(lesson){
const items=lesson.items;
const qs=[];

items.forEach((item,i)=>{
const word=item[0];
const meaning=item[2];

let options;
let question;

if(currentLevel==="beginner"){

if(i%2===0){
question=`What is the meaning of “${word}”?`;

const pool=items.map(x=>x[2]).filter(x=>x!==meaning);
options=shuffle([meaning,...shuffle(pool).slice(0,3)]);
}else{
question=`«${meaning}» کدام کلمه انگلیسی است؟`;

const pool=items.map(x=>x[0]).filter(x=>x!==word);
options=shuffle([word,...shuffle(pool).slice(0,3)]);
}

}else{

question=`What does “${word}” mean?`;

const pool=items.map(x=>x[2]).filter(x=>x!==meaning);
options=shuffle([meaning,...shuffle(pool).slice(0,3)]);
}

qs.push({
question,
options,
correctIndex:options.indexOf(currentLevel==="beginner"&&i%2===0?meaning:currentLevel==="beginner"?word:meaning),
explanation:`${word} = ${meaning}`
});
});

return qs;
}

function renderQuiz(){
const q=quizQuestions[quizIndex];

selectedAnswer=null;
answerChecked=false;

document.getElementById("quizCounter").textContent=
`${quizIndex+1} / ${quizQuestions.length}`;

document.getElementById("quizProgressBar").style.width=
`${Math.round((quizIndex/quizQuestions.length)*100)}%`;

document.getElementById("quizFeedback").innerHTML="";

document.getElementById("nextQuestionBtn").disabled=true;
document.getElementById("nextQuestionBtn").textContent="Check answer";

document.getElementById("quizContent").innerHTML=`
<div class="quiz-question">
<div class="context">${currentMode==="practice"?"تمرین آزاد • Practice":"Final assessment • Test"}</div>
<h2>${escapeHtml(q.question)}</h2>

<div class="options">
${q.options.map((option,i)=>`
<button class="option"
data-answer-index="${i}"
onclick="selectAnswer(${i})">
${escapeHtml(option)}
</button>`).join("")}
</div>
</div>`;
}

function selectAnswer(index){
if(answerChecked)return;

selectedAnswer=index;

document.querySelectorAll(".option").forEach((btn,i)=>{
btn.classList.toggle("selected",i===index);
});

document.getElementById("nextQuestionBtn").disabled=false;
document.getElementById("nextQuestionBtn").textContent="Check answer";
}

function nextQuestion(){
if(!answerChecked){
checkAnswer();
return;
}

if(quizIndex<quizQuestions.length-1){
quizIndex++;
renderQuiz();
}else{
finishQuiz();
}
}

function checkAnswer(){
if(selectedAnswer===null)return;

answerChecked=true;

const q=quizQuestions[quizIndex];
const correct=selectedAnswer===q.correctIndex;

if(correct)quizScore++;

document.querySelectorAll(".option").forEach((btn,i)=>{
btn.classList.remove("selected");

if(i===q.correctIndex)btn.classList.add("correct");
else if(i===selectedAnswer)btn.classList.add("wrong");
});

document.getElementById("quizFeedback").innerHTML=`
<div class="feedback ${correct?"good":"bad"}">
<strong>${correct?"✓ Correct":"✗ Not quite"}</strong>
<p>${escapeHtml(q.explanation)}</p>
</div>`;

if(!correct){
saveMistake({
skill:currentSkill,
level:currentLevel,
lessonId:currentLesson.id,
question:q.question,
options:q.options,
correctIndex:q.correctIndex,
explanation:q.explanation
});
}

document.getElementById("nextQuestionBtn").textContent=
quizIndex<quizQuestions.length-1?"Next question →":"Finish";
}

function finishQuiz(){
const total=quizQuestions.length;
const passed=currentMode==="test"&&quizScore/total>=.70;

if(currentMode==="test"){
const old=lessonState(currentLesson.id);

state.lessons[currentLesson.id]={
...old,
attempts:(old.attempts||0)+1,
bestScore:Math.max(old.bestScore||0,quizScore),
passed:passed||old.passed
};

addXP(passed?30:5);
}else{
addXP(5);
}

updateReviewData(passed);

renderResult(passed);
}


// ============================================================
// RESULTS
// ============================================================

function renderResult(passed){
const total=quizQuestions.length;
const percent=Math.round((quizScore/total)*100);

let html="";

if(currentMode==="practice"){
html=`
<div class="result-box">
<div class="result-icon">🧠</div>
<h1>Practice complete</h1>
<p>You answered <b>${quizScore}</b> of <b>${total}</b> correctly.</p>
<p>Practice does <b>not</b> receive an official score or unlock lessons.</p>

<div class="result-actions">
<button class="primary" onclick="startActivity('practice',${currentLesson.index})">Practice Again</button>
<button class="secondary" onclick="startActivity('test',${currentLesson.index})">Take Final Test</button>
<button class="secondary" onclick="backToCurriculum()">Back to Lessons</button>
</div>
</div>`;
}else{
html=`
<div class="result-box">
<div class="result-icon">${passed?"🎉":"📚"}</div>
<h1>${passed?"Test passed!":"Keep practicing."}</h1>

<div class="result-stat">${percent}%</div>

<p>You answered <b>${quizScore}</b> of <b>${total}</b> correctly.</p>

${passed
?`<p>Next lesson is now unlocked.</p>`
:`<p>You need at least 70% to pass. Review the lesson and try again.</p>`}

<div class="result-actions">
${passed
?`<button class="primary" onclick="nextUnlockedLesson()">Next Lesson →</button>`
:`<button class="primary" onclick="startActivity('practice',${currentLesson.index})">Practice Again</button>
<button class="secondary" onclick="startActivity('learn',${currentLesson.index})">Relearn</button>`}
<button class="secondary" onclick="backToCurriculum()">Back to Lessons</button>
</div>
</div>`;
}

document.getElementById("resultContent").innerHTML=html;
showScreen("result");
}

function nextUnlockedLesson(){
const lessons=DATA[currentSkill][currentLevel];

if(currentLesson.index<lessons.length-1){
startActivity("learn",currentLesson.index+1);
}else{
backToCurriculum();
}
}


// ============================================================
// MISTAKES + REVIEW
// ============================================================

function saveMistake(m){
state.mistakes=state.mistakes.filter(x=>
!(x.lessonId===m.lessonId&&x.question===m.question)
);

state.mistakes.unshift({
...m,
time:Date.now(),
reviewed:0
});

state.mistakes=state.mistakes.slice(0,100);
save();
}

function startMistakes(){
showScreen("mistakes");
renderMistakes();
}

function renderMistakes(){
const box=document.getElementById("mistakeContent");

if(!state.mistakes.length){
box.innerHTML=`
<div class="empty">
<h2>🎉 No mistakes to review</h2>
<p>When you miss a question, it will appear here automatically.</p>
</div>`;
return;
}

box.innerHTML=`
<p><b>${state.mistakes.length}</b> saved mistakes.</p>
${state.mistakes.slice(0,20).map((m,i)=>`
<article class="review-card">
<small>${escapeHtml(m.skill)} • ${escapeHtml(m.level)}</small>
<h3>${escapeHtml(m.question)}</h3>
<p><b>Correct answer:</b> ${escapeHtml(m.options[m.correctIndex])}</p>
<p>${escapeHtml(m.explanation)}</p>
<button class="secondary" onclick="removeMistake(${i})">✓ I reviewed this</button>
</article>
`).join("")}`;
}

function removeMistake(index){
state.mistakes.splice(index,1);
save();
renderMistakes();
}


// ============================================================
// SPACED REVIEW FOUNDATION
// ============================================================

function updateReviewData(passed){
if(!currentLesson)return;

const id=currentLesson.id;

if(!state.reviews[id]){
state.reviews[id]={
interval:1,
nextReview:Date.now()
};
}

const r=state.reviews[id];

if(passed){
r.interval=Math.min(60,Math.max(2,r.interval*2));
}else{
r.interval=1;
}

r.nextReview=Date.now()+r.interval*86400000;

save();
}


// ============================================================
// PLACEMENT TEST
// ============================================================

function startPlacement(){
placementQuestions=[
{level:"beginner",q:"She ___ happy.",o:["am","is","are","be"],c:1},
{level:"beginner",q:"I ___ English every day.",o:["study","studies","studying","studied"],c:0},
{level:"intermediate",q:"I have ___ my homework.",o:["finish","finished","finishing","finishes"],c:1},
{level:"intermediate",q:"If I had time, I ___ travel.",o:["will","would","am","have"],c:1},
{level:"advanced",q:"Which is the most appropriately hedged claim?",o:["This proves everything.","The evidence may suggest a relationship.","Everyone knows this.","This is always true."],c:1},
{level:"advanced",q:"Choose the correct inversion.",o:["Never I have seen it.","Never have I seen it.","Never seen I have it.","I never have seen it?"],c:1}
];

placementIndex=0;
placementScore=0;
placementAnswer=null;
placementChecked=false;

renderPlacement();
showScreen("placement");
}

function renderPlacement(){
const q=placementQuestions[placementIndex];

document.getElementById("placementProgressBar").style.width=
`${Math.round((placementIndex/placementQuestions.length)*100)}%`;

document.getElementById("placementContent").innerHTML=`
<div class="quiz-question">
<div class="context">${q.level.toUpperCase()}</div>
<h2>${escapeHtml(q.q)}</h2>

<div class="options">
${q.o.map((x,i)=>`
<button class="option" onclick="selectPlacement(${i})">${escapeHtml(x)}</button>
`).join("")}
</div>
</div>`;

document.getElementById("placementNext").disabled=true;
document.getElementById("placementNext").textContent="Check answer";
placementAnswer=null;
placementChecked=false;
}

function selectPlacement(index){
if(placementChecked)return;

placementAnswer=index;

document.querySelectorAll("#placementContent .option").forEach((x,i)=>{
x.classList.toggle("selected",i===index);
});

document.getElementById("placementNext").disabled=false;
}

function placementNext(){
const q=placementQuestions[placementIndex];

if(!placementChecked){
placementChecked=true;

if(placementAnswer===q.c)placementScore++;

document.querySelectorAll("#placementContent .option").forEach((x,i)=>{
if(i===q.c)x.classList.add("correct");
else if(i===placementAnswer)x.classList.add("wrong");
});

document.getElementById("placementNext").textContent=
placementIndex<placementQuestions.length-1?"Next question →":"Finish";
return;
}

if(placementIndex<placementQuestions.length-1){
placementIndex++;
renderPlacement();
}else{
finishPlacement();
}
}

function finishPlacement(){
let level="beginner";

if(placementScore>=5)level="advanced";
else if(placementScore>=3)level="intermediate";

state.placement={
score:placementScore,
total:placementQuestions.length,
level,
date:Date.now()
};

save();

document.getElementById("resultContent").innerHTML=`
<div class="result-box">
<div class="result-icon">🎯</div>
<h1>Placement complete</h1>
<div class="result-stat">${placementScore}/${placementQuestions.length}</div>
<p>Your recommended starting level is <b>${level}</b>.</p>
<p>This recommendation does not erase or automatically pass lessons. You can explore the curriculum at your own pace.</p>

<div class="result-actions">
<button class="primary" onclick="openSkill('vocabulary')">Start Vocabulary</button>
<button class="secondary" onclick="goHome()">Dashboard</button>
</div>
</div>`;

showScreen("result");
}


// ============================================================
// CONTINUE LEARNING
// ============================================================

function continueLearning(){
const order=["beginner","intermediate","advanced"];
const skills=["vocabulary","grammar","writing","reading","listening"];

for(const skill of skills){
for(const level of order){

if(!levelUnlocked(skill,level))continue;

const lessons=DATA[skill][level];

for(let i=0;i<lessons.length;i++){
const s=lessonState(lessons[i].id);

if(canOpenLesson(skill,level,i)&&!s.passed){
currentSkill=skill;
currentLevel=level;
startActivity(s.learned?"test":"learn",i);
return;
}
}
}
}

openSkill("vocabulary");
}


// ============================================================
// DASHBOARD
// ============================================================

function showDashboard(){
showScreen("dashboard");
renderDashboard();
}

function renderDashboard(){
const box=document.getElementById("dashboardContent");

const skills=Object.keys(DATA);

box.innerHTML=`
<div class="stats-grid">
<div class="stat-card"><strong>${state.xp}</strong><span>XP</span></div>
<div class="stat-card"><strong>${state.streak}</strong><span>Day streak</span></div>
<div class="stat-card"><strong>${masteryPercent()}%</strong><span>Overall mastery</span></div>
<div class="stat-card"><strong>${state.mistakes.length}</strong><span>Mistakes to review</span></div>
</div>

<div class="dashboard-grid">
${skills.map(skill=>{
const all=Object.values(DATA[skill]).flat();
const passed=all.filter(x=>lessonState(x.id).passed).length;
const pct=Math.round((passed/all.length)*100);

return`
<div class="progress-card">
<h3>${skill.charAt(0).toUpperCase()+skill.slice(1)}</h3>
<b>${passed}/${all.length} tests passed</b>
<div class="progress-line"><div style="width:${pct}%"></div></div>
<small>${pct}% completed</small>
</div>`;
}).join("")}
</div>

<div class="review-card" style="margin-top:18px">
<h3>Learning system</h3>
<p>Learn → Practice → Test → Review → Spaced repetition → Mastery</p>
</div>`;
}


// ============================================================
// LISTENING
// ============================================================

function speak(text){
if(!("speechSynthesis" in window)){
alert("Speech synthesis is not available in this browser.");
return;
}

speechSynthesis.cancel();

const utterance=new SpeechSynthesisUtterance(text);
utterance.lang="en-US";
utterance.rate=.9;
speechSynthesis.speak(utterance);
}


// ============================================================
// HELPERS
// ============================================================

function shuffle(array){
return [...array].sort(()=>Math.random()-.5);
}

function escapeHtml(value){
return String(value)
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#039;");
}


// ============================================================
// PWA
// ============================================================

if("serviceWorker" in navigator){
window.addEventListener("load",()=>{
navigator.serviceWorker.register("./service-worker.js")
.catch(()=>{});
});
}


// ============================================================
// START
// ============================================================

loadTheme();
updateStats();

document.querySelector(".profile-btn").onclick=()=>{
showDashboard();
};


/* =========================================================
   WORDUP V9 ADMIN ENGINE
   ========================================================= */

const WORDUP_OWNER_EMAIL = "Sulimansurkhrody@yahoo.com";

const WORDUP_GITHUB_REPO =
    "https://github.com/wordupenglish/wordup";

const WORDUP_GITHUB_ISSUES =
    "https://github.com/wordupenglish/wordup/issues";

const WORDUP_GITHUB_TRAFFIC =
    "https://github.com/wordupenglish/wordup/graphs/traffic";


/* ---------------------------------------------------------
   SAFE LOCAL ANALYTICS
   --------------------------------------------------------- */

function wordUpGetStats() {

    let stats;

    try {
        stats = JSON.parse(
            localStorage.getItem("wordUpV9Analytics") || "{}"
        );
    } catch {
        stats = {};
    }

    stats.visits = Number(stats.visits || 0);
    stats.lessons = Number(stats.lessons || 0);
    stats.tests = Number(stats.tests || 0);
    stats.mistakes = Number(stats.mistakes || 0);

    return stats;
}


function wordUpSaveStats(stats) {

    localStorage.setItem(
        "wordUpV9Analytics",
        JSON.stringify(stats)
    );
}


function wordUpTrackVisit() {

    const stats = wordUpGetStats();

    stats.visits++;

    stats.lastVisit = new Date().toISOString();

    wordUpSaveStats(stats);
}


function wordUpUpdateAdminStats() {

    const stats = wordUpGetStats();

    const visits = document.getElementById("adminLocalVisits");
    const lessons = document.getElementById("adminLessons");
    const tests = document.getElementById("adminTests");
    const mistakes = document.getElementById("adminMistakes");

    if (visits) visits.textContent = stats.visits;
    if (lessons) lessons.textContent = stats.lessons;
    if (tests) tests.textContent = stats.tests;
    if (mistakes) mistakes.textContent = stats.mistakes;
}


wordUpTrackVisit();


/* ---------------------------------------------------------
   ADMIN ACCESS
   --------------------------------------------------------- */

function wordUpOpenAdmin() {

    const password = prompt(
        "🔐 WordUp Owner Area\n\nEnter your Admin password:"
    );

    /*
       IMPORTANT:
       This is a local owner gate, not a server-security system.
       The authoritative private analytics remain on GitHub.
    */

    const savedPassword =
        localStorage.getItem("wordUpOwnerPassword");

    if (!savedPassword) {

        const setup = prompt(
            "First-time setup.\n\nCreate your WordUp Admin password:"
        );

        if (!setup || setup.length < 8) {
            alert(
                "Password must contain at least 8 characters."
            );
            return;
        }

        localStorage.setItem(
            "wordUpOwnerPassword",
            setup
        );

        alert(
            "Admin password created.\n\nOpen Admin again and enter your password."
        );

        return;
    }

    if (password !== savedPassword) {

        alert("❌ Incorrect Admin password.");

        return;
    }

    showScreen("admin");

    setTimeout(
        wordUpUpdateAdminStats,
        50
    );
}


/* ---------------------------------------------------------
   GITHUB ADMIN LINKS
   --------------------------------------------------------- */

function wordUpOpenGitHubTraffic() {

    window.open(
        WORDUP_GITHUB_TRAFFIC,
        "_blank",
        "noopener,noreferrer"
    );
}


function wordUpOpenGitHubIssues() {

    window.open(
        WORDUP_GITHUB_ISSUES,
        "_blank",
        "noopener,noreferrer"
    );
}


function wordUpOpenGitHubRepo() {

    window.open(
        WORDUP_GITHUB_REPO,
        "_blank",
        "noopener,noreferrer"
    );
}


/* ---------------------------------------------------------
   FEEDBACK
   --------------------------------------------------------- */

function wordUpBuildDiagnostics() {

    return [
        "",
        "========== WordUp Diagnostics ==========",
        "URL: " + location.href,
        "Browser: " + navigator.userAgent,
        "Language: " + navigator.language,
        "Platform: " + navigator.platform,
        "Screen: " + window.innerWidth + "x" + window.innerHeight,
        "Online: " + navigator.onLine,
        "Time: " + new Date().toISOString(),
        "========================================",
        ""
    ].join("\n");
}


function wordUpSendEmail(subject, body) {

    const mailto =
        "mailto:" +
        WORDUP_OWNER_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

    window.location.href = mailto;
}


function wordUpGeneralFeedback() {

    wordUpSendEmail(
        "WordUp Feedback",
        "Hello WordUp Team,\n\n" +
        "My feedback:\n\n\n" +
        wordUpBuildDiagnostics()
    );
}


function wordUpSuggestFeature() {

    wordUpSendEmail(
        "WordUp Feature Suggestion",
        "Hello WordUp Team,\n\n" +
        "I would like to suggest this feature:\n\n\n" +
        wordUpBuildDiagnostics()
    );
}


function wordUpContactEmail() {

    wordUpSendEmail(
        "WordUp Contact",
        "Hello WordUp Team,\n\n" +
        "Message:\n\n\n" +
        wordUpBuildDiagnostics()
    );
}


function wordUpContactWhatsApp() {

    window.open(
        "https://wa.me/93785054012",
        "_blank",
        "noopener,noreferrer"
    );
}


/* ---------------------------------------------------------
   GITHUB BUG REPORT
   --------------------------------------------------------- */

function wordUpReportBug() {

    const title =
        encodeURIComponent(
            "Bug Report — WordUp"
        );

    const body =
        encodeURIComponent(
`## What happened?

Please describe the problem here.

## Steps to reproduce

1.
2.
3.

## Expected result

What should have happened?

## Actual result

What actually happened?

${wordUpBuildDiagnostics()}`
        );

    const issueURL =
        WORDUP_GITHUB_ISSUES +
        "/new?title=" +
        title +
        "&body=" +
        body;

    window.open(
        issueURL,
        "_blank",
        "noopener,noreferrer"
    );
}


/* ---------------------------------------------------------
   EXPORT LOCAL DATA
   --------------------------------------------------------- */

function wordUpExportLocalData() {

    const data = {};

    for (let i = 0; i < localStorage.length; i++) {

        const key =
            localStorage.key(i);

        try {
            data[key] =
                JSON.parse(
                    localStorage.getItem(key)
                );
        } catch {
            data[key] =
                localStorage.getItem(key);
        }
    }

    const file = new Blob(
        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(file);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "wordup-local-data.json";

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
}


/* ---------------------------------------------------------
   AUTOMATIC LESSON / TEST TRACKING
   --------------------------------------------------------- */

function wordUpIncrementLessonCount() {

    const stats =
        wordUpGetStats();

    stats.lessons++;

    wordUpSaveStats(stats);
}


function wordUpIncrementTestCount() {

    const stats =
        wordUpGetStats();

    stats.tests++;

    wordUpSaveStats(stats);
}


function wordUpIncrementMistakeCount() {

    const stats =
        wordUpGetStats();

    stats.mistakes++;

    wordUpSaveStats(stats);
}


/* ---------------------------------------------------------
   MAKE COMMON BUTTON NAVIGATION SAFE
   --------------------------------------------------------- */

window.wordUpOpenAdmin =
    wordUpOpenAdmin;

window.wordUpReportBug =
    wordUpReportBug;

window.wordUpGeneralFeedback =
    wordUpGeneralFeedback;

window.wordUpSuggestFeature =
    wordUpSuggestFeature;

window.wordUpContactEmail =
    wordUpContactEmail;

window.wordUpContactWhatsApp =
    wordUpContactWhatsApp;

window.wordUpOpenGitHubTraffic =
    wordUpOpenGitHubTraffic;

window.wordUpOpenGitHubIssues =
    wordUpOpenGitHubIssues;

window.wordUpOpenGitHubRepo =
    wordUpOpenGitHubRepo;

window.wordUpExportLocalData =
    wordUpExportLocalData;

