const STORAGE_KEY = "wordUpV7State";
const THEME_KEY = "wordUpTheme";

const curriculum = {
  Vocabulary: {
    Beginner: [
      {
        title: "Everyday Adjectives",
        description: "Learn common adjectives for everyday communication.",
        items: [
          {word:"beautiful", pronunciation:"/ˈbjuːtɪfəl/", meaning:"زیبا", example:"She has a beautiful smile.", exampleDari:"او لبخند زیبایی دارد."},
          {word:"happy", pronunciation:"/ˈhæpi/", meaning:"خوشحال", example:"I feel happy today.", exampleDari:"امروز احساس خوشحالی می‌کنم."},
          {word:"strong", pronunciation:"/strɔːŋ/", meaning:"قوی", example:"He is strong enough to carry the box.", exampleDari:"او به اندازه کافی قوی است که جعبه را حمل کند."},
          {word:"friendly", pronunciation:"/ˈfrendli/", meaning:"مهربان / دوستانه", example:"Our new teacher is very friendly.", exampleDari:"استاد جدید ما بسیار مهربان است."},
          {word:"careful", pronunciation:"/ˈkeəfəl/", meaning:"محتاط", example:"Be careful when you cross the road.", exampleDari:"وقتی از سرک عبور می‌کنی محتاط باش."}
        ]
      },
      {
        title: "Useful Daily Words",
        description: "Words you can use in everyday conversations.",
        items: [
          {word:"important", pronunciation:"/ɪmˈpɔːtənt/", meaning:"مهم", example:"Education is important.", exampleDari:"تحصیل مهم است."},
          {word:"easy", pronunciation:"/ˈiːzi/", meaning:"آسان", example:"This exercise is easy.", exampleDari:"این تمرین آسان است."},
          {word:"difficult", pronunciation:"/ˈdɪfɪkəlt/", meaning:"دشوار", example:"The question is difficult.", exampleDari:"این سوال دشوار است."},
          {word:"ready", pronunciation:"/ˈredi/", meaning:"آماده", example:"Are you ready?", exampleDari:"آیا آماده هستی؟"},
          {word:"quiet", pronunciation:"/ˈkwaɪət/", meaning:"آرام / ساکت", example:"Please be quiet.", exampleDari:"لطفاً آرام باشید."}
        ]
      },
      {
        title: "People & Character",
        description: "Useful words for describing people and personality.",
        items: [
          {word:"honest", pronunciation:"/ˈɒnɪst/", meaning:"صادق", example:"She is an honest person.", exampleDari:"او یک شخص صادق است."},
          {word:"brave", pronunciation:"/breɪv/", meaning:"شجاع", example:"The brave student answered first.", exampleDari:"دانش‌آموز شجاع اول پاسخ داد."},
          {word:"polite", pronunciation:"/pəˈlaɪt/", meaning:"مودب", example:"He is always polite.", exampleDari:"او همیشه مودب است."},
          {word:"busy", pronunciation:"/ˈbɪzi/", meaning:"مصروف", example:"I am busy this afternoon.", exampleDari:"امروز بعد از ظهر مصروف هستم."},
          {word:"famous", pronunciation:"/ˈfeɪməs/", meaning:"مشهور", example:"She is a famous writer.", exampleDari:"او یک نویسنده مشهور است."}
        ]
      }
    ],

    Intermediate: [
      {
        title:"Academic & Professional Vocabulary",
        description:"Useful vocabulary for study and professional communication.",
        items:[
          {word:"accurate",definition:"correct and free from mistakes",example:"The report must be accurate."},
          {word:"reliable",definition:"able to be trusted or depended on",example:"We need reliable information."},
          {word:"efficient",definition:"working well without wasting time or resources",example:"She found a more efficient method."},
          {word:"essential",definition:"completely necessary or extremely important",example:"Clear communication is essential."},
          {word:"opportunity",definition:"a situation that makes it possible to do or achieve something",example:"This course is a valuable opportunity."}
        ]
      },
      {
        title:"Growth & Achievement",
        description:"Vocabulary for progress, development, and achievement.",
        items:[
          {word:"achieve",definition:"to successfully reach a goal",example:"She worked hard to achieve her goal."},
          {word:"develop",definition:"to grow, improve, or create something over time",example:"Students develop their skills through practice."},
          {word:"improve",definition:"to become better or make something better",example:"Reading can improve your vocabulary."},
          {word:"maintain",definition:"to keep something at the same level or condition",example:"It is difficult to maintain motivation."},
          {word:"require",definition:"to need something",example:"This job requires strong communication skills."}
        ]
      }
    ],

    Advanced: [
      {
        title:"Nuanced Academic English",
        description:"Precise vocabulary for advanced academic communication.",
        items:[
          {word:"ambiguous",definition:"having more than one possible meaning or interpretation",example:"The statement was ambiguous."},
          {word:"compelling",definition:"very convincing or persuasive",example:"The researcher presented a compelling argument."},
          {word:"substantial",definition:"large, important, or significant in amount or effect",example:"The project requires substantial investment."},
          {word:"coherent",definition:"logical, clear, and well organized",example:"Her essay presents a coherent argument."},
          {word:"plausible",definition:"reasonable and likely to be true",example:"The explanation is plausible."}
        ]
      },
      {
        title:"Precision & Nuance",
        description:"Advanced words for expressing ideas precisely.",
        items:[
          {word:"meticulous",definition:"extremely careful and precise about details",example:"He kept meticulous records."},
          {word:"nuanced",definition:"showing subtle differences and careful distinctions",example:"The article offers a nuanced analysis."},
          {word:"versatile",definition:"able to be used or adapted for many different purposes",example:"English is a versatile language."},
          {word:"inevitable",definition:"certain to happen and impossible to avoid",example:"Change is inevitable."},
          {word:"sustainable",definition:"able to continue for a long time without causing serious harm",example:"We need sustainable solutions."}
        ]
      }
    ]
  },

  Grammar: {
    Beginner:[
      {
        title:"Personal Pronouns",
        description:"Learn I, you, he, she, it, we, and they.",
        teach:[
          "Personal pronouns replace nouns in a sentence.",
          "I refers to the speaker. You refers to the person or people being spoken to.",
          "He and she are commonly used for people. It is commonly used for things or animals. We and they refer to groups."
        ],
        examples:["I am a teacher.","She is my friend.","They study English every day."]
      },
      {
        title:"Verb To Be",
        description:"Learn am, is, and are.",
        teach:[
          "Use am with I.",
          "Use is with he, she, it, and singular nouns.",
          "Use are with you, we, they, and plural nouns."
        ],
        examples:["I am ready.","She is happy.","They are students."]
      },
      {
        title:"Simple Present",
        description:"Talk about habits, routines, and facts.",
        teach:[
          "Use the base verb with I, you, we, and they.",
          "With he, she, and it, usually add s, es, or ies.",
          "Use the simple present for habits, routines, facts, and repeated actions."
        ],
        examples:["I study every day.","She works at a school.","They play football."]
      }
    ],
    Intermediate:[
      {
        title:"Present Perfect",
        description:"Connect past actions with the present.",
        teach:["Use have/has + past participle.","Use it for experiences, recent actions, and situations connected to the present."],
        examples:["I have finished my work.","She has visited Herat twice."]
      },
      {
        title:"Conditionals",
        description:"Express real, possible, and hypothetical situations.",
        teach:["Conditional sentences describe a condition and its result.","Different conditional forms express different levels of reality and possibility."],
        examples:["If you study, you will improve.","If I had more time, I would read more."]
      },
      {
        title:"Passive Voice",
        description:"Focus on the action or receiver rather than the doer.",
        teach:["Passive voice uses a form of be + past participle.","It is useful when the action or result is more important than the person who performed it."],
        examples:["The book was written in 2025.","English is spoken worldwide."]
      }
    ],
    Advanced:[
      {
        title:"Inversion",
        description:"Use advanced word order for emphasis and formal style.",
        teach:["Inversion places an auxiliary verb before the subject.","It often appears after negative or restrictive expressions."],
        examples:["Never have I seen such a result.","Rarely does he make mistakes."]
      },
      {
        title:"Hedging",
        description:"Express academic claims carefully and appropriately.",
        teach:["Hedging makes claims less absolute.","Common forms include may, might, appears to, tends to, and suggests."],
        examples:["The evidence suggests that the method may be effective.","This appears to indicate a broader trend."]
      },
      {
        title:"Participle Clauses",
        description:"Create concise advanced sentences.",
        teach:["Participle clauses can connect actions or provide additional information.","They can make formal writing more concise."],
        examples:["Having finished the assignment, she submitted it.","Used correctly, the method can save time."]
      }
    ]
  },

  Writing:{
    Beginner:[
      {
        title:"Building a Sentence",
        description:"Understand the basic structure of an English sentence.",
        teach:["A basic sentence commonly contains a subject and a verb.","Many sentences also contain an object or complement."],
        examples:["I study English.","She reads books.","They play football."]
      },
      {
        title:"Capital Letters",
        description:"Use capital letters correctly.",
        teach:["Start a sentence with a capital letter.","Use capitals for names, places, languages, and the pronoun I."],
        examples:["My name is Suliman.","I study English in Kabul."]
      }
    ],
    Intermediate:[
      {
        title:"Paragraph Structure",
        description:"Build clear and organized paragraphs.",
        teach:["A strong paragraph usually has a topic sentence, supporting ideas, and a concluding sentence.","Each sentence should contribute to the main idea."],
        examples:["Topic sentence → supporting evidence → explanation → concluding idea."]
      },
      {
        title:"Formal Emails",
        description:"Write professional emails clearly and politely.",
        teach:["Use a clear subject, appropriate greeting, concise body, and professional closing.","Avoid unnecessary slang in formal communication."],
        examples:["Dear Professor,","I am writing to ask about the upcoming assignment.","Kind regards,"]
      }
    ],
    Advanced:[
      {
        title:"Academic Thesis Statements",
        description:"Write focused and defensible thesis statements.",
        teach:["A thesis states the central argument or position of an academic text.","It should be specific enough to guide the entire paper."],
        examples:["Regular reading can improve vocabulary because it exposes learners to words in meaningful contexts."]
      },
      {
        title:"Hedging & Academic Tone",
        description:"Write carefully without making unsupported absolute claims.",
        teach:["Academic writing often uses cautious language.","Words such as may, might, suggests, appears, and generally can help qualify claims."],
        examples:["The findings suggest that regular practice may improve language retention."]
      }
    ]
  },

  Reading:{
    Beginner:[
      {
        title:"A New Student",
        description:"Read a short beginner text and understand its main ideas.",
        text:"Sara is a new student at an English class. She arrives early and meets her teacher. The teacher welcomes her and introduces her to the other students. Sara feels happy because the class is friendly.",
        question:"Why does Sara feel happy?",
        options:["Because the class is friendly.","Because she arrived late.","Because she is the teacher.","Because the class is empty."],
        correct:0
      }
    ],
    Intermediate:[
      {
        title:"Learning a Language",
        description:"Read for main ideas and supporting details.",
        text:"Learning a language requires regular exposure and active use. Students often improve more effectively when they combine reading, listening, speaking, and writing. Short but consistent study sessions can also be more sustainable than occasional long sessions.",
        question:"What does the passage emphasize?",
        options:["Only speaking matters.","Consistent and varied practice supports language learning.","Long study sessions are always better.","Reading should be avoided."],
        correct:1
      }
    ],
    Advanced:[
      {
        title:"The Value of Context",
        description:"Interpret ideas and implications in an advanced text.",
        text:"Words rarely exist in complete isolation. Their meaning can shift according to context, discipline, tone, and the relationship between speakers. Consequently, advanced language learners need more than dictionary definitions; they must also learn to infer meaning from surrounding information.",
        question:"What is the main argument?",
        options:["Dictionary definitions are useless.","Words always have one fixed meaning.","Context is important for understanding language precisely.","Advanced learners should avoid dictionaries."],
        correct:2
      }
    ]
  },

  Listening:{
    Beginner:[
      {
        title:"Daily Routine",
        description:"Listen to a short everyday English passage.",
        audio:"I wake up at seven o'clock. I have breakfast and then I go to work. In the evening, I study English for one hour.",
        question:"What does the speaker study in the evening?",
        options:["English","History","Mathematics","Science"],
        correct:0
      }
    ],
    Intermediate:[
      {
        title:"Study Advice",
        description:"Listen for the main recommendation.",
        audio:"If you want to improve your English, try to study a little every day. Do not worry about making mistakes. Regular practice is more important than studying for many hours only once a week.",
        question:"What does the speaker recommend?",
        options:["Studying once a week","Avoiding mistakes completely","Regular daily practice","Studying only for exams"],
        correct:2
      }
    ],
    Advanced:[
      {
        title:"Academic Discussion",
        description:"Listen for the speaker's central idea.",
        audio:"The speaker argues that technology can support education, but its effectiveness depends on how it is used. Simply providing digital tools does not guarantee better learning outcomes. Teachers still need to design meaningful activities around those tools.",
        question:"What condition does the speaker emphasize?",
        options:["Technology always improves education.","Digital tools are unnecessary.","Technology is effective when integrated into meaningful learning activities.","Teachers should stop using technology."],
        correct:2
      }
    ]
  }
};

let state = loadState();

let currentType = "Vocabulary";
let currentLevel = "Beginner";
let currentLessonIndex = 0;
let activityMode = "practice";
let questions = [];
let questionIndex = 0;
let score = 0;
let hearts = 3;
let currentQuestion = null;
let selectedAnswer = null;
let activityCorrect = 0;
let activityWrong = 0;

function defaultState(){
  return {
    xp:0,
    streak:0,
    lastDate:"",
    learned:{},
    passed:{},
    mistakes:[],
    completedTests:0
  };
}

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? {...defaultState(), ...saved} : defaultState();
  }catch(e){
    return defaultState();
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateStats();
}

function lessonKey(type,level,index){
  return `${type}|${level}|${index}`;
}

function isLearned(type,level,index){
  return !!state.learned[lessonKey(type,level,index)];
}

function isPassed(type,level,index){
  return !!state.passed[lessonKey(type,level,index)];
}

function canTest(type,level,index){
  return isLearned(type,level,index);
}

function canOpenLesson(type,level,index){
  if(index === 0) return true;
  return isPassed(type,level,index-1);
}

function showScreen(id){
  document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
  const el=document.getElementById(id);
  if(el) el.classList.add("active");
  window.scrollTo({top:0,behavior:"instant"});
}

function startApp(){
  showHome();
}

function showHome(){
  updateStats();
  showScreen("home");
}

function updateStats(){
  document.getElementById("xp").textContent=state.xp;
  document.getElementById("streak").textContent=state.streak;

  const total=Object.keys(curriculum).reduce((sum,type)=>{
    return sum + Object.values(curriculum[type]).flat().length;
  },0);

  const passed=Object.keys(state.passed).length;
  const mastery=total ? Math.round((passed/total)*100) : 0;

  document.getElementById("mastery").textContent=mastery+"%";
  document.getElementById("mistakeCount").textContent=state.mistakes.length;
}

function openCurriculum(type){
  currentType=type;
  currentLevel="Beginner";
  document.getElementById("curriculumTitle").textContent=type;
  showScreen("curriculumScreen");
  renderCurriculum();
}

function setLevel(level){
  currentLevel=level;
  renderCurriculum();
}

function renderCurriculum(){
  ["Beginner","Intermediate","Advanced"].forEach(level=>{
    const btn=document.getElementById("tab"+level);
    btn.classList.toggle("active",level===currentLevel);
  });

  const lessons=curriculum[currentType][currentLevel] || [];
  const list=document.getElementById("lessonList");

  list.innerHTML=lessons.map((lesson,index)=>{
    const learned=isLearned(currentType,currentLevel,index);
    const passed=isPassed(currentType,currentLevel,index);
    const available=canOpenLesson(currentType,currentLevel,index);

    return `
      <article class="lesson-card">
        <div class="lesson-header">
          <div class="lesson-number">${index+1}</div>

          <div class="lesson-info">
            <h3>${escapeHtml(lesson.title)}</h3>
            <p>${escapeHtml(lesson.description || "")}</p>

            <div class="lesson-status ${
              passed ? "status-learned" :
              available ? "" : "status-locked"
            }">
              ${
                passed ? "✓ Test passed — Next lesson unlocked" :
                learned ? "✓ Learned — Practice or test available" :
                available ? "Available — Start learning" :
                "🔒 Pass the previous test to unlock"
              }
            </div>
          </div>
        </div>

        <div class="lesson-actions">
          <button class="action-btn primary"
            ${available ? "" : "disabled"}
            onclick="openLesson(${index})">
            📖 Learn
          </button>

          <button class="action-btn"
            ${learned ? "" : "disabled"}
            onclick="startActivity(${index},'practice')">
            🧠 Practice
          </button>

          <button class="action-btn"
            ${canTest(currentType,currentLevel,index) ? "" : "disabled"}
            onclick="startActivity(${index},'test')">
            📝 Test
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function openLesson(index){
  if(!canOpenLesson(currentType,currentLevel,index)){
    return;
  }

  currentLessonIndex=index;
  const lesson=curriculum[currentType][currentLevel][index];

  renderLesson(lesson);
  showScreen("lessonScreen");
}

function renderLesson(lesson){
  let html=`
    <div class="lesson-body">
      <h1>${escapeHtml(lesson.title)}</h1>
      <p>${escapeHtml(lesson.description || "")}</p>
  `;

  if(currentType==="Vocabulary"){
    html += renderVocabularyTeaching(lesson);
  }else if(currentType==="Grammar" || currentType==="Writing"){
    html += `
      <div class="teaching-block">
        ${lesson.teach.map(x=>`<p>${escapeHtml(x)}</p>`).join("")}
      </div>
      <h3>Examples</h3>
      ${lesson.examples.map(x=>`
        <div class="teaching-block example">
          ${escapeHtml(x)}
        </div>
      `).join("")}
    `;
  }else if(currentType==="Reading"){
    html += `
      <div class="teaching-block">
        <h3>Read carefully</h3>
        <p>${escapeHtml(lesson.text)}</p>
      </div>
      <div class="teaching-block">
        <strong>Before you practice:</strong>
        <p>Try to understand the main idea and important details.</p>
      </div>
    `;
  }else if(currentType==="Listening"){
    html += `
      <div class="teaching-block">
        <h3>Listening lesson</h3>
        <p>Listen to the passage first. You can replay it as many times as you need.</p>
        <button class="primary-btn" onclick="speakText(${JSON.stringify(lesson.audio)})">
          🔊 Play Listening
        </button>
      </div>
      <div class="teaching-block">
        <p>Do not worry about understanding every single word on your first listen.</p>
      </div>
    `;
  }

  html += `
    <div class="lesson-complete">
      <h3>Lesson completed? 🎯</h3>
      <p>
        You have finished the teaching section.
        Now you can practice without a score or take the scored test.
      </p>
      <button class="primary-btn" onclick="finishLearning()">
        Continue
      </button>
    </div>
  </div>`;

  document.getElementById("lessonContent").innerHTML=html;
}

function renderVocabularyTeaching(lesson){
  return lesson.items.map(item=>`
    <div class="teaching-block">
      <div class="word">${escapeHtml(item.word)}</div>
      <div class="pronunciation">${escapeHtml(item.pronunciation)}</div>
      <p><strong>Meaning:</strong> ${escapeHtml(item.meaning || item.definition || "")}</p>

      <div class="example">
        <strong>Example:</strong><br>
        ${escapeHtml(item.example)}
      </div>

      ${item.exampleDari ? `
        <div class="example">
          <strong>دری:</strong><br>
          ${escapeHtml(item.exampleDari)}
        </div>
      ` : ""}
    </div>
  `).join("");
}

function finishLearning(){
  const key=lessonKey(currentType,currentLevel,currentLessonIndex);
  state.learned[key]=true;
  saveState();

  document.getElementById("choiceText").textContent =
    `You have finished "${curriculum[currentType][currentLevel][currentLessonIndex].title}". What would you like to do next?`;

  document.getElementById("choiceModal").classList.remove("hidden");
}

function closeChoice(){
  document.getElementById("choiceModal").classList.add("hidden");
  backToCurriculum();
}

function choosePractice(){
  closeChoice();
  startActivity(currentLessonIndex,"practice");
}

function chooseTest(){
  closeChoice();
  startActivity(currentLessonIndex,"test");
}

function startActivity(index,mode){
  const lesson=curriculum[currentType][currentLevel][index];

  if(!isLearned(currentType,currentLevel,index)){
    openLesson(index);
    return;
  }

  if(mode==="test" && !canTest(currentType,currentLevel,index)){
    return;
  }

  currentLessonIndex=index;
  activityMode=mode;
  questionIndex=0;
  score=0;
  hearts=3;
  activityCorrect=0;
  activityWrong=0;
  selectedAnswer=null;

  questions=buildQuestions(currentType,currentLevel,index,mode);

  if(!questions.length){
    alert("This lesson does not have questions yet.");
    return;
  }

  document.getElementById("activityTitle").textContent =
    mode==="practice" ? "Practice" : "Final Test";

  document.getElementById("activityBadge").textContent =
    mode==="practice"
      ? "🧠 PRACTICE — No score"
      : "📝 FINAL TEST — Scored";

  document.getElementById("activityBadge").className =
    "activity-badge " + (mode==="practice" ? "badge-practice" : "badge-test");

  showScreen("quizScreen");
  renderQuestion();
}

function buildQuestions(type,level,index,mode){
  const lesson=curriculum[type][level][index];

  if(type==="Vocabulary"){
    return buildVocabularyQuestions(lesson,level);
  }

  if(type==="Grammar" || type==="Writing"){
    return buildGrammarWritingQuestions(lesson,type,level);
  }

  if(type==="Reading" || type==="Listening"){
    return [{
      prompt:lesson.question,
      options:lesson.options,
      correctIndex:lesson.correct,
      explanation:
        type==="Reading"
        ? "Look back at the passage and identify the sentence that supports the answer."
        : "Listen again and focus on the information connected to the question."
    }];
  }

  return [];
}

function buildVocabularyQuestions(lesson,level){
  const items=lesson.items || [];
  const result=[];

  if(level==="Beginner"){
    items.forEach((item,i)=>{
      const meanings=items.map(x=>x.meaning);
      const english=items.map(x=>x.word);

      const firstOptions=shuffle([...meanings]);
      result.push({
        prompt:`What is the Dari meaning of "${item.word}"?`,
        options:firstOptions,
        correctIndex:firstOptions.indexOf(item.meaning),
        explanation:`"${item.word}" means "${item.meaning}".`,
        speak:item.word
      });

      const secondOptions=shuffle([...english]);
      result.push({
        prompt:`Which English word means "${item.meaning}"?`,
        options:secondOptions,
        correctIndex:secondOptions.indexOf(item.word),
        explanation:`"${item.meaning}" means "${item.word}".`,
        speak:item.word
      });
    });
  }else{
    const words=items.map(x=>x.word);

    items.forEach(item=>{
      const options=shuffle(items.map(x=>x.definition));
      result.push({
        prompt:`What does "${item.word}" mean?`,
        options,
        correctIndex:options.indexOf(item.definition),
        explanation:`"${item.word}" means: ${item.definition}`,
        speak:item.word
      });

      const wordOptions=shuffle([...words]);
      result.push({
        prompt:`Which word best matches this definition?\n"${item.definition}"`,
        options:wordOptions,
        correctIndex:wordOptions.indexOf(item.word),
        explanation:`The correct word is "${item.word}".`,
        speak:item.word
      });
    });
  }

  return result;
}

function buildGrammarWritingQuestions(lesson,type,level){
  const examples=lesson.examples || [];

  if(type==="Grammar"){
    if(lesson.title==="Personal Pronouns"){
      return [
        {
          prompt:"Choose the correct pronoun: ___ am a teacher.",
          options:["I","He","They","She"],
          correctIndex:0,
          explanation:"Use I when referring to yourself."
        },
        {
          prompt:"Choose the correct pronoun: ___ is my friend.",
          options:["She","They","We","I"],
          correctIndex:0,
          explanation:"She is used for a female person."
        },
        {
          prompt:"Choose the correct pronoun: ___ study English every day.",
          options:["They","It","He","She"],
          correctIndex:0,
          explanation:"They is used for plural people."
        }
      ];
    }

    if(lesson.title==="Verb To Be"){
      return [
        {
          prompt:"Choose the correct form: I ___ ready.",
          options:["am","is","are","be"],
          correctIndex:0,
          explanation:"Use am with I."
        },
        {
          prompt:"Choose the correct form: She ___ happy.",
          options:["is","am","are","be"],
          correctIndex:0,
          explanation:"Use is with she."
        },
        {
          prompt:"Choose the correct form: They ___ students.",
          options:["are","is","am","be"],
          correctIndex:0,
          explanation:"Use are with they."
        }
      ];
    }

    if(lesson.title==="Simple Present"){
      return [
        {
          prompt:"Choose the correct sentence.",
          options:["She works at a school.","She work at a school.","She working at a school.","She worked at a school every day."],
          correctIndex:0,
          explanation:"With she, the simple present usually takes -s."
        },
        {
          prompt:"Choose the correct sentence.",
          options:["They play football.","They plays football.","They playing football.","They played football every day."],
          correctIndex:0,
          explanation:"With they, use the base verb play."
        }
      ];
    }

    if(lesson.title==="Present Perfect"){
      return [
        {
          prompt:"Choose the correct form: She ___ visited Herat twice.",
          options:["has","have","is","did"],
          correctIndex:0,
          explanation:"Use has with she in the present perfect."
        },
        {
          prompt:"Choose the correct sentence.",
          options:["I have finished my work.","I has finished my work.","I am finished my work.","I have finish my work."],
          correctIndex:0,
          explanation:"Present perfect uses have/has + past participle."
        }
      ];
    }

    if(lesson.title==="Conditionals"){
      return [
        {
          prompt:"Choose the correct result: If you study, you ___ improve.",
          options:["will","would","have","had"],
          correctIndex:0,
          explanation:"The first conditional commonly uses will in the result clause."
        },
        {
          prompt:"Choose the correct sentence.",
          options:["If I had more time, I would read more.","If I have more time, I would read more.","If I had more time, I will read more.","If I have more time, I would have read more."],
          correctIndex:0,
          explanation:"The second conditional commonly uses past simple + would."
        }
      ];
    }

    if(lesson.title==="Passive Voice"){
      return [
        {
          prompt:"Choose the passive sentence.",
          options:["The book was written in 2025.","Someone wrote the book in 2025.","The book wrote in 2025.","Someone was write the book."],
          correctIndex:0,
          explanation:"Passive voice uses a form of be + past participle."
        },
        {
          prompt:"Choose the correct passive form: English ___ worldwide.",
          options:["is spoken","speaks","is speak","spoken"],
          correctIndex:0,
          explanation:"English is spoken worldwide."
        }
      ];
    }

    if(lesson.title==="Inversion"){
      return [
        {
          prompt:"Choose the correct inverted sentence.",
          options:["Never have I seen such a result.","Never I have seen such a result.","Never have seen I such a result.","I never have seen such a result."],
          correctIndex:0,
          explanation:"After Never in this structure, the auxiliary comes before the subject."
        }
      ];
    }

    if(lesson.title==="Hedging"){
      return [
        {
          prompt:"Which sentence uses appropriate academic hedging?",
          options:[
            "The evidence suggests that the method may be effective.",
            "The method is absolutely effective in every situation.",
            "The method always works.",
            "Everyone knows the method works."
          ],
          correctIndex:0,
          explanation:"Suggests and may make the claim appropriately cautious."
        }
      ];
    }

    if(lesson.title==="Participle Clauses"){
      return [
        {
          prompt:"Choose the correct participle clause.",
          options:[
            "Having finished the assignment, she submitted it.",
            "Having finish the assignment, she submitted it.",
            "Having finished the assignment, she submit it.",
            "Finished having the assignment, she submitted it."
          ],
          correctIndex:0,
          explanation:"Having + past participle can show an earlier completed action."
        }
      ];
    }
  }

  if(type==="Writing"){
    if(lesson.title==="Building a Sentence"){
      return [
        {
          prompt:"Which is a complete basic English sentence?",
          options:["I study English.","Study English I.","English study I.","I English study."],
          correctIndex:0,
          explanation:"I is the subject, study is the verb, and English is the object."
        }
      ];
    }

    if(lesson.title==="Capital Letters"){
      return [
        {
          prompt:"Which sentence uses capital letters correctly?",
          options:[
            "My name is Suliman.",
            "my name is suliman.",
            "My Name Is suliman.",
            "my Name is Suliman."
          ],
          correctIndex:0,
          explanation:"The sentence begins with a capital letter and the name is capitalized."
        }
      ];
    }

    if(lesson.title==="Paragraph Structure"){
      return [
        {
          prompt:"What normally comes first in a well-organized paragraph?",
          options:["A topic sentence","A random example","A conclusion","A reference list"],
          correctIndex:0,
          explanation:"The topic sentence introduces the paragraph's main idea."
        }
      ];
    }

    if(lesson.title==="Formal Emails"){
      return [
        {
          prompt:"Which opening is most appropriate for a formal academic email?",
          options:["Dear Professor,","Hey bro,","Yo!","What's up?"],
          correctIndex:0,
          explanation:"Dear Professor is an appropriate formal greeting."
        }
      ];
    }

    if(lesson.title==="Academic Thesis Statements"){
      return [
        {
          prompt:"Which is the strongest thesis statement?",
          options:[
            "Regular reading can improve vocabulary because it exposes learners to words in meaningful contexts.",
            "Reading is nice.",
            "I think vocabulary is maybe good.",
            "There are many things about reading."
          ],
          correctIndex:0,
          explanation:"A strong thesis is focused and gives a defensible central claim."
        }
      ];
    }

    if(lesson.title==="Hedging & Academic Tone"){
      return [
        {
          prompt:"Which sentence uses an appropriate academic tone?",
          options:[
            "The findings suggest that regular practice may improve language retention.",
            "Regular practice definitely makes everyone learn perfectly.",
            "Everyone knows regular practice works.",
            "Regular practice is obviously the only solution."
          ],
          correctIndex:0,
          explanation:"Suggest and may appropriately qualify the claim."
        }
      ];
    }
  }

  return examples.map((example,i)=>({
    prompt:"Which example correctly represents the lesson?",
    options:shuffle([
      example,
      ...examples.filter((_,j)=>j!==i)
    ]),
    correctIndex:0,
    explanation:"This example demonstrates the concept taught in this lesson."
  }));
}

function renderQuestion(){
  if(questionIndex >= questions.length){
    finishActivity();
    return;
  }

  const q=questions[questionIndex];
  currentQuestion=q;
  selectedAnswer=null;

  document.getElementById("questionNumber").textContent =
    `${questionIndex+1} / ${questions.length}`;

  document.getElementById("quizScore").textContent =
    activityMode==="practice"
      ? "Practice"
      : `Score: ${score}`;

  document.getElementById("quizProgress").style.width =
    `${((questionIndex)/questions.length)*100}%`;

  document.getElementById("hearts").textContent =
    "❤️".repeat(hearts) + "🖤".repeat(3-hearts);

  document.getElementById("questionText").textContent=q.prompt;

  document.getElementById("questionInstruction").textContent =
    activityMode==="practice"
      ? "Practice mode: choose an answer and learn from the feedback. There is no score."
      : "Final Test: choose the best answer. Your result is scored.";

  const listen=document.getElementById("listenBtn");
  listen.style.display=q.speak ? "inline-block" : "none";

  const answers=document.getElementById("answers");
  answers.innerHTML="";

  q.options.forEach((option,index)=>{
    const button=document.createElement("button");
    button.className="answer-btn";
    button.textContent=option;

    /*
      IMPORTANT:
      Correctness is determined ONLY by the numeric answer index.
      We never use includes(), startsWith(), or text matching.
    */
    button.dataset.answerIndex=String(index);

    button.addEventListener("click",()=>{
      answerQuestion(index,button);
    });

    answers.appendChild(button);
  });

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
}

function answerQuestion(index,button){
  if(selectedAnswer!==null) return;

  selectedAnswer=index;
  const q=currentQuestion;
  const correct=index===q.correctIndex;

  document.querySelectorAll(".answer-btn").forEach(btn=>{
    btn.disabled=true;

    const btnIndex=Number(btn.dataset.answerIndex);

    if(btnIndex===q.correctIndex){
      btn.classList.add("correct");
    }
  });

  if(correct){
    activityCorrect++;

    if(activityMode==="practice"){
      score=0;
    }else{
      score++;
    }

    button.classList.add("correct");

    document.getElementById("feedback").innerHTML=
      `<strong>✓ Correct!</strong><br>${escapeHtml(q.explanation || "")}`;
  }else{
    activityWrong++;

    hearts=Math.max(0,hearts-1);
    button.classList.add("wrong");

    saveMistake(q);

    document.getElementById("feedback").innerHTML=
      `<strong>✗ Not quite.</strong><br>${escapeHtml(q.explanation || "Review the lesson and try again.")}`;
  }

  document.getElementById("feedback").classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");

  document.getElementById("hearts").textContent =
    "❤️".repeat(hearts) + "🖤".repeat(3-hearts);

  document.getElementById("quizScore").textContent =
    activityMode==="practice" ? "Practice" : `Score: ${score}`;
}

function nextQuestion(){
  questionIndex++;
  renderQuestion();
}

function finishActivity(){
  const percentage=Math.round((activityCorrect/questions.length)*100);

  document.getElementById("quizProgress").style.width="100%";

  if(activityMode==="test"){
    const passed=percentage>=70;
    const key=lessonKey(currentType,currentLevel,currentLessonIndex);

    if(passed){
      state.passed[key]=true;
      state.xp += 20;

      const nextIndex=currentLessonIndex+1;
      const nextLessons=curriculum[currentType][currentLevel] || [];

      if(nextIndex < nextLessons.length){
        state.xp += 10;
      }

      state.completedTests++;
      updateStreak();
    }

    saveState();
  }

  document.getElementById("finalScore").textContent=percentage+"%";
  document.getElementById("finalCorrect").textContent=
    `${activityCorrect} / ${questions.length} correct`;

  if(activityMode==="practice"){
    document.getElementById("resultIcon").textContent="🧠";
    document.getElementById("resultTitle").textContent="Practice Complete";
    document.getElementById("resultMessage").textContent=
      "This was practice, so it did not affect your score. Review the feedback and take the final test when you feel ready.";

    document.getElementById("resultActions").innerHTML=`
      <button class="primary-btn" onclick="retryPractice()">Practice Again</button>
      <button class="secondary-btn" onclick="takeTestFromResult()">Take Final Test</button>
      <button class="secondary-btn" onclick="backToCurriculum()">Back to Lessons</button>
    `;
  }else{
    const passed=percentage>=70;

    document.getElementById("resultIcon").textContent=passed ? "🎉" : "📖";
    document.getElementById("resultTitle").textContent=
      passed ? "Test Passed!" : "Keep Practicing";

    document.getElementById("resultMessage").textContent=
      passed
      ? "Excellent. You passed this lesson and the next lesson is now unlocked."
      : "You need at least 70% to pass. Review the lesson, practice again, and retake the test.";

    const lessons=curriculum[currentType][currentLevel] || [];
    const next=currentLessonIndex+1;

    let actions=`
      <button class="primary-btn" onclick="retryTest()">Retake Test</button>
      <button class="secondary-btn" onclick="retryPractice()">Practice</button>
    `;

    if(passed && next<lessons.length){
      actions += `
        <button class="primary-btn" onclick="openLesson(${next})">
          Continue to Next Lesson →
        </button>
      `;
    }

    actions += `
      <button class="secondary-btn" onclick="backToCurriculum()">Back to Lessons</button>
      <button class="secondary-btn" onclick="showHome()">Home</button>
    `;

    document.getElementById("resultActions").innerHTML=actions;
  }

  showScreen("resultScreen");
}

function finishQuiz(){
  finishActivity();
}

function retryPractice(){
  startActivity(currentLessonIndex,"practice");
}

function retryTest(){
  startActivity(currentLessonIndex,"test");
}

function takeTestFromResult(){
  startActivity(currentLessonIndex,"test");
}

function backToLessonFromResult(){
  openLesson(currentLessonIndex);
}

function quitActivity(){
  if(confirm("Exit this activity? Your current attempt will not be counted.")){
    backToCurriculum();
  }
}

function backToCurriculum(){
  document.getElementById("choiceModal").classList.add("hidden");
  renderCurriculum();
  showScreen("curriculumScreen");
}

function showHomeFromActivity(){
  showHome();
}

function continueLearning(){
  const levels=["Beginner","Intermediate","Advanced"];
  const types=["Vocabulary","Grammar","Writing","Reading","Listening"];

  for(const type of types){
    for(const level of levels){
      const lessons=curriculum[type][level] || [];

      for(let i=0;i<lessons.length;i++){
        if(canOpenLesson(type,level,i) && !isPassed(type,level,i)){
          currentType=type;
          currentLevel=level;
          currentLessonIndex=i;
          openLesson(i);
          return;
        }
      }
    }
  }

  showHome();
}

function startMistakes(){
  if(!state.mistakes.length){
    alert("You do not have any saved mistakes yet.");
    return;
  }

  alert("Mistake review is available from your saved questions. For the cleanest learning path, return to the relevant lesson and practice it again.");
}

function saveMistake(q){
  const record={
    type:currentType,
    level:currentLevel,
    lesson:currentLessonIndex,
    prompt:q.prompt,
    time:Date.now()
  };

  state.mistakes.unshift(record);

  if(state.mistakes.length>50){
    state.mistakes=state.mistakes.slice(0,50);
  }

  saveState();
}

function updateStreak(){
  const today=new Date().toISOString().slice(0,10);

  if(state.lastDate!==today){
    state.streak++;
    state.lastDate=today;
  }
}

function speakCurrent(){
  if(currentQuestion && currentQuestion.speak){
    speakText(currentQuestion.speak);
  }
}

function speakText(text){
  if(!("speechSynthesis" in window)){
    alert("Speech is not supported by this browser.");
    return;
  }

  speechSynthesis.cancel();

  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang="en-US";
  utterance.rate=.85;

  speechSynthesis.speak(utterance);
}

function toggleTheme(){
  const root=document.documentElement;

  if(root.getAttribute("data-theme")==="dark"){
    root.removeAttribute("data-theme");
    localStorage.setItem(THEME_KEY,"light");
  }else{
    root.setAttribute("data-theme","dark");
    localStorage.setItem(THEME_KEY,"dark");
  }
}

function loadTheme(){
  if(localStorage.getItem(THEME_KEY)==="dark"){
    document.documentElement.setAttribute("data-theme","dark");
  }
}

function shuffle(array){
  const a=[...array];

  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }

  return a;
}

function escapeHtml(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

loadTheme();
updateStats();
