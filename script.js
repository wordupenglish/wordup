const STORAGE_KEY = "wordUpV5State";
const THEME_KEY = "wordUpTheme";

const stages = {
    Vocabulary: [
        ["Word Discovery","Learn new words and their meanings."],
        ["Word Recognition","Recognize vocabulary quickly."],
        ["Meaning Challenge","Choose the precise meaning."],
        ["Context Mastery","Understand words in context."],
        ["Listen & Choose","Connect sound with meaning."],
        ["Speed Vocabulary","Think faster under pressure."],
        ["Vocabulary Mastery","Prove what you know."]
    ],
    Grammar: [
        ["Grammar Foundations","Build accurate sentence structures."],
        ["Correct Form","Choose the grammatically correct form."],
        ["Context Grammar","Apply grammar naturally."],
        ["Grammar Sprint","Make accurate decisions quickly."],
        ["Grammar Mastery","Demonstrate strong control."]
    ],
    Writing: [
        ["Sentence Foundations","Build clear and complete sentences."],
        ["Sentence Improvement","Choose the clearest expression."],
        ["Meaning & Tone","Understand purpose, tone and nuance."],
        ["Writing Challenge","Make stronger writing choices."],
        ["Writing Mastery","Demonstrate advanced written English."]
    ],
    Mixed: [
        ["Warm-Up","A balanced English challenge."],
        ["Brain Challenge","Switch between different skills."],
        ["Challenge Mode","Keep your accuracy under pressure."],
        ["Final Challenge","The ultimate WordUp test."]
    ]
};

const achievementDefinitions = [
    ["first-step","🌱","First Step","Complete your first stage.",s=>Object.keys(s.completed).length>=1],
    ["word-hunter","📖","Word Hunter","Earn 100 XP.",s=>s.xp>=100],
    ["streak-3","🔥","On Fire","Reach a 3-day streak.",s=>s.streak>=3],
    ["streak-7","🚀","Week Warrior","Reach a 7-day streak.",s=>s.streak>=7],
    ["century","💯","Century","Earn 500 XP.",s=>s.xp>=500],
    ["mistake-master","🔁","Mistake Master","Successfully review 10 mistakes.",s=>s.reviewed>=10],
    ["perfect","🎯","Perfect Round","Get 100% on a stage.",s=>s.perfectRounds>=1],
    ["scholar","🎓","Scholar","Complete 10 stages.",s=>Object.keys(s.completed).length>=10],
    ["wordup-legend","🏆","WordUp Legend","Complete 20 stages.",s=>Object.keys(s.completed).length>=20]
];

let state = {
    xp:0,
    streak:0,
    lastPracticeDate:"",
    completed:{},
    mistakes:[],
    reviewed:0,
    perfectRounds:0,
    daily:{date:"",completed:false},
    level:"Beginner"
};

let vocabulary = {};
let currentSection="Vocabulary";
let currentLevel="Beginner";
let currentStage=0;
let questions=[];
let currentQuestion=0;
let score=0;
let hearts=5;
let timeLeft=30;
let timerInterval=null;
let answeredCurrent=false;
let earnedThisRound=0;
let isDailyChallenge=false;
let isMistakeReview=false;
let roundFailed=false;

const grammarQuestions = [
    {q:"If I ___ more time, I would study another language.",a:"had",o:["have","had","will have","am having"],e:"The second conditional uses past simple after 'if'."},
    {q:"She has lived here ___ 2021.",a:"since",o:["for","since","during","from"],e:"Use 'since' with a starting point in time."},
    {q:"Neither the teacher nor the students ___ ready.",a:"are",o:["is","are","was","be"],e:"The verb agrees with the nearer plural subject 'students'."},
    {q:"By next year, they ___ the course.",a:"will have completed",o:["complete","completed","will complete","will have completed"],e:"Future perfect describes an action completed before a future point."},
    {q:"I wish I ___ more confident when I was younger.",a:"had been",o:["am","was","had been","have been"],e:"Use past perfect for an unreal regret about an earlier time."},
    {q:"The report ___ by the research team yesterday.",a:"was prepared",o:["prepared","was prepared","has prepared","is preparing"],e:"The passive voice is required."},
    {q:"He suggested ___ the meeting until Friday.",a:"postponing",o:["postpone","to postpone","postponing","postponed"],e:"Suggest is normally followed by a gerund."},
    {q:"Hardly ___ the room when the phone rang.",a:"had I entered",o:["I entered","did I enter","had I entered","I had entered"],e:"Negative adverbial inversion uses auxiliary + subject."},
    {q:"The woman ___ car was stolen contacted the police.",a:"whose",o:["who","which","whose","whom"],e:"'Whose' expresses possession."},
    {q:"You ___ have told me earlier; I could have helped.",a:"should",o:["must","should","can","may"],e:"'Should have' expresses criticism or regret about the past."},
    {q:"Despite ___ tired, he continued working.",a:"being",o:["be","to be","being","been"],e:"Despite is followed by a noun or gerund."},
    {q:"If she had left earlier, she ___ the train.",a:"would have caught",o:["will catch","would catch","would have caught","caught"],e:"Third conditional: if + past perfect, would have + past participle."},
    {q:"This is the most interesting book I ___ this year.",a:"have read",o:["read","am reading","have read","had read"],e:"Present perfect connects past experience with the current year."},
    {q:"He is used to ___ early.",a:"getting up",o:["get up","getting up","got up","to get up"],e:"'Be used to' is followed by a gerund."},
    {q:"Not only ___ late, but he also forgot the documents.",a:"was he",o:["he was","was he","he is","is he"],e:"Not only at the beginning triggers inversion."}
];

const writingQuestions = [
    {q:"Choose the clearest sentence.",a:"The meeting was postponed because the manager was unavailable.",o:["Due to the manager, the meeting was postponed because unavailable.","The meeting was postponed because the manager was unavailable.","The manager unavailable made the meeting postponed.","Because unavailable, the meeting was postponing."],e:"The correct sentence is direct, grammatical and precise."},
    {q:"Which phrase is most appropriate in a formal email?",a:"I would appreciate your response at your earliest convenience.",o:["Send me an answer ASAP.","I need your answer now.","I would appreciate your response at your earliest convenience.","Answer me quickly please."],e:"The correct option is professional and appropriately polite."},
    {q:"Choose the best transition: 'The evidence is limited. ___, the findings remain significant.'",a:"Nevertheless",o:["For example","Nevertheless","Similarly","First"],e:"Nevertheless introduces a contrast."},
    {q:"Which sentence has the most precise tone?",a:"The results suggest that further research is necessary.",o:["The results kind of say we need more research.","The results prove everything.","The results suggest that further research is necessary.","More research, obviously."],e:"Academic writing should be cautious and precise."},
    {q:"Choose the strongest thesis statement.",a:"This essay examines how technology has changed communication and evaluates its social effects.",o:["Technology is interesting.","I will talk about technology.","Technology has changed things a lot.","This essay examines how technology has changed communication and evaluates its social effects."],e:"A strong thesis clearly states the focus and purpose."},
    {q:"Choose the sentence with the clearest logical relationship.",a:"Although the course was demanding, the students completed it successfully.",o:["The course was demanding, although students completed it.","Although the course was demanding, the students completed it successfully.","The students successful because demanding course.","Demanding course therefore although students."],e:"Although clearly introduces contrast."},
    {q:"Which word best replaces 'very important' in formal writing?",a:"essential",o:["huge","awesome","essential","really big"],e:"Essential is concise and formal."},
    {q:"Choose the most concise version.",a:"The results were inconclusive.",o:["The results were not able to reach a conclusion.","The results did not conclusively establish the outcome.","The results were inconclusive.","The results were results without conclusion."],e:"The third option expresses the idea most efficiently."},
    {q:"Which sentence avoids an unsupported absolute claim?",a:"The findings indicate that the approach may improve performance.",o:["This approach always works.","Everyone benefits from this approach.","The findings indicate that the approach may improve performance.","This is definitely the only solution."],e:"May improve is appropriately cautious."},
    {q:"Choose the best academic phrase.",a:"The findings are consistent with previous research.",o:["The findings are the same as everything before.","The findings match up kinda with old stuff.","The findings are consistent with previous research.","The findings are obviously right."],e:"This is a standard formal academic construction."},
    {q:"Which opening is most suitable for a professional report?",a:"This report evaluates the effectiveness of the proposed strategy.",o:["So, here's what happened.","I am gonna talk about the strategy.","This report evaluates the effectiveness of the proposed strategy.","Let's check this thing out."],e:"A professional report should state its purpose clearly."},
    {q:"Choose the best sentence for expressing cautious disagreement.",a:"This interpretation may overlook several relevant factors.",o:["This interpretation is stupid.","This interpretation is completely wrong.","This interpretation may overlook several relevant factors.","Nobody agrees with this interpretation."],e:"The sentence is respectful and evidence-conscious."}
];

function loadState(){
    try{
        const saved=localStorage.getItem(STORAGE_KEY);
        if(saved) state={...state,...JSON.parse(saved)};
    }catch(e){ console.warn(e); }

    const theme=localStorage.getItem(THEME_KEY);
    if(theme) document.documentElement.dataset.theme=theme;
    updateThemeButton();
    updateDaily();
}

function saveState(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    updateAchievements();
}

function todayKey(){
    return new Date().toISOString().slice(0,10);
}

function yesterdayKey(){
    const d=new Date();
    d.setDate(d.getDate()-1);
    return d.toISOString().slice(0,10);
}

function updateDaily(){
    const today=todayKey();
    if(state.daily.date!==today){
        state.daily={date:today,completed:false};
        saveState();
    }
    const el=document.getElementById("dailyText");
    if(el) el.textContent=state.daily.completed
        ?"Completed today — come back tomorrow for another challenge!"
        :"Complete today's challenge and earn bonus XP.";
}

function updateStreak(){
    const today=todayKey();
    if(state.lastPracticeDate===today) return;

    if(state.lastPracticeDate===yesterdayKey()) state.streak++;
    else state.streak=1;

    state.lastPracticeDate=today;
}

function xpLevel(){
    return Math.floor(state.xp/250)+1;
}

function mastery(){
    const total=Object.keys(stages).reduce((n,s)=>n+stages[s].length,0);
    return Math.min(100,Math.round(Object.keys(state.completed).length/total*100));
}

function updateHome(){
    document.getElementById("xpValue").textContent=state.xp;
    document.getElementById("topXP").textContent=state.xp;
    document.getElementById("streakValue").textContent=state.streak;
    document.getElementById("masteryValue").textContent=mastery()+"%";
    document.getElementById("mistakeValue").textContent=state.mistakes.length;
    document.getElementById("levelBadge").textContent="Level "+xpLevel();

    document.getElementById("welcomeTitle").textContent=
        state.streak>0 ? "Keep the momentum going!" : "Ready to learn?";

    document.getElementById("streakMessage").textContent=
        state.streak>0 ? `You're on a ${state.streak}-day learning streak.` : "Start your first challenge today.";

    const review=document.getElementById("reviewCard");
    review.classList.toggle("hidden",state.mistakes.length===0);
    document.getElementById("reviewText").textContent=
        `${state.mistakes.length} question${state.mistakes.length===1?"":"s"} waiting for review.`;

    updateDaily();
}

function showScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo({top:0,behavior:"smooth"});
}

function startApp(){
    updateHome();
    showScreen("homeScreen");
}

function continueApp(){
    updateHome();
    if(state.progress){
        currentSection=state.progress.section;
        currentLevel=state.progress.level;
        currentStage=state.progress.stage;
        openJourney(currentSection);
    }else{
        showScreen("homeScreen");
    }
}

function openJourney(section){
    currentSection=section;
    currentLevel=state.level||"Beginner";
    document.getElementById("journeyTitle").textContent=section;
    renderJourney();
    showScreen("journeyScreen");
}

function setLevel(level){
    currentLevel=level;
    state.level=level;
    saveState();
    renderJourney();
}

function stageKey(section,level,index){
    return `${section}|${level}|${index}`;
}

function renderJourney(){
    document.querySelectorAll(".level-tabs button").forEach(b=>{
        b.classList.toggle("active",b.dataset.level===currentLevel);
    });

    const map=document.getElementById("journeyMap");
    map.innerHTML="";

    stages[currentSection].forEach((stage,i)=>{
        const key=stageKey(currentSection,currentLevel,i);
        const completed=!!state.completed[key];
        const previous=i===0||!!state.completed[stageKey(currentSection,currentLevel,i-1)];
        const unlocked=previous;

        const card=document.createElement("button");
        card.className=`stage-card ${completed?"completed":""} ${!unlocked?"locked":""} ${!completed&&unlocked?"current":""}`;
        card.disabled=!unlocked;
        card.onclick=()=>startStage(i);

        card.innerHTML=`
            <span class="stage-number">${completed?"✓":i+1}</span>
            <span class="stage-info">
                <b>${stage[0]}</b>
                <small>${stage[1]}</small>
            </span>
            <span class="stage-state">${completed?"🏆":unlocked?"▶️":"🔒"}</span>
        `;
        map.appendChild(card);
    });
}

function startStage(index){
    currentStage=index;
    isDailyChallenge=false;
    isMistakeReview=false;
    roundFailed=false;
    buildQuestions();
    startQuiz();
}

function buildQuestions(){
    questions=[];

    if(currentSection==="Vocabulary"){
        questions=createVocabularyQuestions(currentLevel,currentStage);
    }else if(currentSection==="Grammar"){
        questions=createGrammarQuestions(currentStage);
    }else if(currentSection==="Writing"){
        questions=createWritingQuestions(currentStage);
    }else{
        questions=createMixedQuestions();
    }

    questions=shuffle(questions).slice(0,10);
}

function createVocabularyQuestions(level,stage){
    const pool=vocabulary[level]||[];
    if(!pool.length) return [];

    const result=[];
    const count=Math.min(12,pool.length);

    for(let i=0;i<count;i++){
        const item=pool[i];
        const mode=(stage+i)%4;
        let q="",correct="",options=[];

        if(mode===0){
            q=`What does "${item.word}" mean?`;
            correct=item.meaning;
            options=[correct,...randomItems(pool.filter(x=>x.word!==item.word),3).map(x=>x.meaning)];
        }else if(mode===1){
            q=`Which word best matches this meaning?\n"${item.meaning}"`;
            correct=item.word;
            options=[correct,...randomItems(pool.filter(x=>x.word!==item.word),3).map(x=>x.word)];
        }else if(mode===2){
            q=`Choose the best word for this sentence:\n"${item.example}"`;
            correct=item.word;
            options=[correct,...randomItems(pool.filter(x=>x.word!==item.word),3).map(x=>x.word)];
        }else{
            q=`Which example uses "${item.word}" correctly?`;
            correct=item.example;
            options=[correct,...randomItems(pool.filter(x=>x.word!==item.word),3).map(x=>x.example)];
        }

        result.push({q,a:correct,o:shuffle(options),type:"VOCABULARY",ex:`${item.word}: ${item.meaning}`});
    }
    return result;
}

function createGrammarQuestions(stage){
    return grammarQuestions.map(x=>({
        q:stage===0?x.q:`Grammar challenge: ${x.q}`,
        a:x.a,
        o:shuffle([...x.o]),
        type:"GRAMMAR",
        ex:x.e
    }));
}

function createWritingQuestions(stage){
    return writingQuestions.map(x=>({
        q:stage===0?x.q:`Writing challenge: ${x.q}`,
        a:x.a,
        o:shuffle([...x.o]),
        type:"WRITING",
        ex:x.e
    }));
}

function createMixedQuestions(){
    const v=createVocabularyQuestions(currentLevel,2);
    const g=createGrammarQuestions(2);
    const w=createWritingQuestions(2);
    return shuffle([...v.slice(0,4),...g.slice(0,3),...w.slice(0,3)]);
}

function startQuiz(){
    if(!questions.length){
        toast("Vocabulary data could not be loaded.");
        return;
    }

    currentQuestion=0;
    score=0;
    hearts=5;
    earnedThisRound=0;
    answeredCurrent=false;
    timeLeft=getTimeLimit();

    document.getElementById("quizStageTitle").textContent=
        isDailyChallenge?"Daily Challenge":
        isMistakeReview?"Mistake Review":
        stages[currentSection][currentStage][0];

    showScreen("quizScreen");
    renderQuestion();
}

function getTimeLimit(){
    if(isDailyChallenge) return 20;
    if(currentSection==="Vocabulary" && currentStage===5) return 12;
    if(currentSection==="Mixed" && currentStage>=2) return 18;
    return 30;
}

function renderQuestion(){
    stopTimer();

    const q=questions[currentQuestion];
    answeredCurrent=false;
    timeLeft=getTimeLimit();

    document.getElementById("questionCounter").textContent=
        `${currentQuestion+1} / ${questions.length}`;

    document.getElementById("scoreValue").textContent=score;
    document.getElementById("quizXP").textContent=state.xp+earnedThisRound;
    document.getElementById("quizProgress").style.width=
        `${currentQuestion/questions.length*100}%`;

    document.getElementById("timer").textContent=timeLeft;
    document.getElementById("questionType").textContent=q.type;
    document.getElementById("questionText").innerHTML=q.q.replace(/\n/g,"<br>");
    document.getElementById("feedback").className="feedback hidden";
    document.getElementById("nextBtn").classList.add("hidden");

    updateHearts();

    const grid=document.getElementById("answerGrid");
    grid.innerHTML="";

    q.o.forEach((answer,i)=>{
        const btn=document.createElement("button");
        btn.className="answer-btn";
        btn.innerHTML=`<span class="answer-key">${i+1}</span>${answer}`;
        btn.onclick=()=>answerQuestion(answer,btn);
        grid.appendChild(btn);
    });

    startTimer();
}

function startTimer(){
    timerInterval=setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").textContent=timeLeft;

        if(timeLeft<=0){
            stopTimer();
            if(!answeredCurrent) answerQuestion(null,null,true);
        }
    },1000);
}

function stopTimer(){
    if(timerInterval){
        clearInterval(timerInterval);
        timerInterval=null;
    }
}

function answerQuestion(answer,clickedButton,timedOut=false){
    if(answeredCurrent) return;

    answeredCurrent=true;
    stopTimer();

    const q=questions[currentQuestion];
    const correct=answer===q.a;

    document.querySelectorAll(".answer-btn").forEach(btn=>{
        btn.disabled=true;
        if(btn.textContent.includes(q.a)) btn.classList.add("correct");
    });

    if(clickedButton && !correct) clickedButton.classList.add("wrong");

    if(correct){
        score++;
        const speedBonus=Math.max(0,Math.floor(timeLeft/5));
        const base=currentSection==="Mixed"?15:10;
        earnedThisRound+=base+speedBonus;
        showFeedback(true,`Correct! ${q.ex||""}`);
    }else{
        hearts--;
        addMistake(q);
        showFeedback(false,timedOut?`Time's up. ${q.ex||""}`:`Not quite. ${q.ex||""}`);
    }

    document.getElementById("scoreValue").textContent=score;
    document.getElementById("quizXP").textContent=state.xp+earnedThisRound;
    updateHearts();

    if(hearts<=0){
        roundFailed=true;
        setTimeout(finishRound,900);
    }else{
        document.getElementById("nextBtn").classList.remove("hidden");
    }
}

function showFeedback(good,text){
    const el=document.getElementById("feedback");
    el.className=`feedback ${good?"good":"bad"}`;
    el.textContent=text;
}

function nextQuestion(){
    if(!answeredCurrent) return;

    currentQuestion++;

    if(currentQuestion>=questions.length) finishRound();
    else renderQuestion();
}

function updateHearts(){
    document.getElementById("hearts").textContent=
        "❤️".repeat(hearts)+"🖤".repeat(5-hearts);
}

function addMistake(q){
    const exists=state.mistakes.some(x=>x.q===q.q&&x.a===q.a);
    if(!exists) state.mistakes.push({
        q:q.q,a:q.a,o:q.o,type:q.type,ex:q.ex
    });
    saveState();
}

function finishRound(){
    stopTimer();

    const percentage=Math.round(score/questions.length*100);

    if(!roundFailed){
        updateStreak();

        if(percentage===100){
            earnedThisRound+=25;
            state.perfectRounds++;
        }

        if(isDailyChallenge){
            earnedThisRound+=50;
            state.daily.completed=true;
        }

        state.xp+=earnedThisRound;

        if(!isMistakeReview){
            const key=stageKey(currentSection,currentLevel,currentStage);
            if(!state.completed[key]) state.completed[key]={
                score:percentage,
                date:todayKey()
            };

            state.progress={
                section:currentSection,
                level:currentLevel,
                stage:Math.min(currentStage+1,stages[currentSection].length-1)
            };
        }

        saveState();
    }

    document.getElementById("celebrationTitle").textContent=
        roundFailed?"Keep Going!":
        percentage===100?"Perfect!":
        percentage>=80?"Excellent!":
        percentage>=60?"Well Done!":"Good Try!";

    document.getElementById("celebrationMessage").textContent=
        roundFailed
        ?"You ran out of hearts. Review your mistakes and try again."
        :`${score} of ${questions.length} correct. ${percentage}% accuracy.`;

    document.getElementById("celebrationIcon").textContent=
        roundFailed?"💪":percentage===100?"🏆":percentage>=80?"🎉":"👏";

    document.getElementById("earnedXP").textContent=
        roundFailed?"+0 XP":`+${earnedThisRound} XP`;

    const starCount=roundFailed?1:Math.max(1,Math.ceil(percentage/20));
    document.getElementById("stars").textContent="⭐".repeat(starCount)+"☆".repeat(5-starCount);

    createConfetti(!roundFailed&&percentage>=60);
    showScreen("celebrationScreen");
}

function continueAfterCelebration(){
    if(roundFailed){
        showScreen("homeScreen");
        updateHome();
        return;
    }

    document.getElementById("resultMastery").textContent=
        Math.round(score/questions.length*100)+"%";

    const percentage=Math.round(score/questions.length*100);
    document.getElementById("resultMastery").parentElement.style.setProperty("--mastery",percentage+"%");
    document.getElementById("resultScore").textContent=`${score}/${questions.length}`;
    document.getElementById("resultXP").textContent=`+${earnedThisRound}`;
    document.getElementById("resultCompleted").textContent=Object.keys(state.completed).length;

    showScreen("resultScreen");
    updateHome();
}

function continueJourney(){
    if(isDailyChallenge||isMistakeReview){
        showScreen("homeScreen");
        updateHome();
        return;
    }

    currentStage=Math.min(currentStage+1,stages[currentSection].length-1);
    renderJourney();
    showScreen("journeyScreen");
}

function startDailyChallenge(){
    isDailyChallenge=true;
    isMistakeReview=false;
    currentSection=["Vocabulary","Grammar","Writing","Mixed"][new Date().getDate()%4];
    currentLevel=["Beginner","Intermediate","Advanced"][new Date().getDate()%3];
    currentStage=new Date().getDate()%stages[currentSection].length;

    buildQuestions();
    startQuiz();
}

function startMistakeReview(){
    if(!state.mistakes.length){
        toast("You have no mistakes to review. Great work!");
        return;
    }

    isMistakeReview=true;
    isDailyChallenge=false;
    roundFailed=false;

    questions=shuffle(state.mistakes.map(x=>({
        q:x.q,a:x.a,o:shuffle([...x.o]),type:x.type,ex:x.ex
    }))).slice(0,10);

    currentSection="Mixed";
    currentStage=0;
    startQuiz();
}

function updateMistakesAfterReview(){
    // handled by removeCorrectMistake
}

function removeCorrectMistake(q){
    state.mistakes=state.mistakes.filter(x=>!(x.q===q.q&&x.a===q.a));
    state.reviewed++;
}

function toggleTheme(){
    const current=document.documentElement.dataset.theme;
    const next=current==="dark"?"light":"dark";
    document.documentElement.dataset.theme=next;
    localStorage.setItem(THEME_KEY,next);
    updateThemeButton();
}

function updateThemeButton(){
    const btn=document.getElementById("themeBtn");
    if(btn) btn.textContent=document.documentElement.dataset.theme==="dark"?"☀️":"🌙";
}

function speakQuestion(){
    const text=document.getElementById("questionText").innerText;
    if("speechSynthesis" in window){
        speechSynthesis.cancel();
        const utter=new SpeechSynthesisUtterance(text);
        utter.lang="en-US";
        utter.rate=.9;
        speechSynthesis.speak(utter);
    }else toast("Speech is not supported by this browser.");
}

function confirmExitQuiz(){
    document.getElementById("exitModal").classList.remove("hidden");
}

function closeExitModal(){
    document.getElementById("exitModal").classList.add("hidden");
}

function leaveQuiz(){
    closeExitModal();
    stopTimer();
    showScreen("homeScreen");
    updateHome();
}

function updateAchievements(){
    const earned=state.achievements||[];
    achievementDefinitions.forEach(a=>{
        if(a[4](state)&&!earned.includes(a[0])){
            earned.push(a[0]);
            toast(`🏆 Achievement unlocked: ${a[2]}`);
        }
    });
    state.achievements=earned;
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}

function renderAchievements(){
    const grid=document.getElementById("achievementsGrid");
    grid.innerHTML="";

    achievementDefinitions.forEach(a=>{
        const unlocked=(state.achievements||[]).includes(a[0]);
        const el=document.createElement("div");
        el.className=`achievement ${unlocked?"":"locked"}`;
        el.innerHTML=`
            <div class="achievement-icon">${unlocked?a[1]:"🔒"}</div>
            <b>${a[2]}</b>
            <small>${a[3]}</small>
        `;
        grid.appendChild(el);
    });
}

function shuffle(arr){
    return [...arr].sort(()=>Math.random()-.5);
}

function randomItems(arr,n){
    return shuffle(arr).slice(0,n);
}

function toast(message){
    const container=document.getElementById("toast-container");
    const el=document.createElement("div");
    el.className="toast";
    el.textContent=message;
    container.appendChild(el);
    setTimeout(()=>el.remove(),3200);
}

function createConfetti(enabled){
    if(!enabled) return;

    const container=document.getElementById("confetti");
    container.innerHTML="";

    for(let i=0;i<45;i++){
        const piece=document.createElement("div");
        piece.className="confetti-piece";
        piece.style.left=Math.random()*100+"vw";
        piece.style.animationDelay=Math.random()*1.2+"s";
        piece.style.background=`hsl(${Math.random()*360},80%,60%)`;
        container.appendChild(piece);
    }

    setTimeout(()=>container.innerHTML="",3500);
}

document.addEventListener("keydown",e=>{
    if(!document.getElementById("quizScreen").classList.contains("active")) return;

    if(["1","2","3","4"].includes(e.key)&&!answeredCurrent){
        const index=Number(e.key)-1;
        const buttons=document.querySelectorAll(".answer-btn");
        if(buttons[index]) buttons[index].click();
    }

    if(e.key==="Enter"&&answeredCurrent){
        const next=document.getElementById("nextBtn");
        if(!next.classList.contains("hidden")) next.click();
    }

    if(e.key==="Escape") confirmExitQuiz();
});

document.querySelector('[onclick="showScreen(\'achievementsScreen\')"]')
    ?.addEventListener("click",renderAchievements);

document.addEventListener("click",e=>{
    if(e.target.closest('[onclick="showScreen(\'achievementsScreen\')"]')){
        setTimeout(renderAchievements,30);
    }
});

async function loadVocabulary(){
    try{
        const response=await fetch("vocabulary.json",{cache:"no-store"});
        if(!response.ok) throw new Error("Vocabulary file unavailable");
        vocabulary=await response.json();
    }catch(error){
        console.error(error);
        toast("Vocabulary file could not be loaded.");
    }
}

async function init(){
    loadState();
    await loadVocabulary();
    updateHome();
    renderAchievements();
}

init();
