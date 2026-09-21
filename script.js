let vocabulary = {};

const STORAGE_KEY = "wordUpFinalState";
const THEME_KEY = "wordUpTheme";

let state = {
    xp: 0,
    streak: 0,
    lastPracticeDate: "",
    completed: {},
    progress: null,
    mistakes: [],
    achievements: [],
    daily: {
        date: "",
        completed: false
    }
};

let currentSection = "vocabulary";
let currentLevel = "Beginner";
let currentStage = 0;

let questions = [];
let currentQuestion = 0;
let score = 0;
let hearts = 5;
let timerInterval = null;
let timeLeft = 30;

let isMistakeReview = false;
let isDailyChallenge = false;
let answeredCurrent = false;


/* =========================
   DATA
========================= */

const stages = {

    vocabulary: [
        {
            name: "Learn the Words",
            icon: "🧠",
            description: "Meet new words and connect English with Dari."
        },
        {
            name: "Word Recognition",
            icon: "👀",
            description: "Recognize English words quickly."
        },
        {
            name: "Meaning Challenge",
            icon: "🎯",
            description: "Choose the correct Dari meaning."
        },
        {
            name: "Sentence Builder",
            icon: "🧩",
            description: "Understand vocabulary inside real sentences."
        },
        {
            name: "Listen & Choose",
            icon: "🎧",
            description: "Listen and identify the word."
        },
        {
            name: "Pronunciation",
            icon: "🗣️",
            description: "Build confidence with English pronunciation."
        },
        {
            name: "Speed Challenge",
            icon: "⚡",
            description: "Think quickly under time pressure."
        },
        {
            name: "Mastery Test",
            icon: "🏆",
            description: "Prove that you have mastered the level."
        }
    ],

    grammar: [
        {
            name: "Grammar Foundations",
            icon: "📖",
            description: "Build a strong grammar foundation."
        },
        {
            name: "Correct Form",
            icon: "🎯",
            description: "Choose the grammatically correct form."
        },
        {
            name: "Context Challenge",
            icon: "🧩",
            description: "Apply grammar inside real sentences."
        },
        {
            name: "Speed Grammar",
            icon: "⚡",
            description: "Make accurate decisions under pressure."
        },
        {
            name: "Grammar Mastery",
            icon: "🏆",
            description: "Complete your grammar journey."
        }
    ],

    writing: [
        {
            name: "Sentence Foundations",
            icon: "📝",
            description: "Build clear and natural sentences."
        },
        {
            name: "Sentence Improvement",
            icon: "✍️",
            description: "Choose stronger English."
        },
        {
            name: "Meaning & Tone",
            icon: "💡",
            description: "Understand tone, clarity and context."
        },
        {
            name: "Writing Challenge",
            icon: "⚡",
            description: "Make strong writing decisions quickly."
        },
        {
            name: "Writing Mastery",
            icon: "🏆",
            description: "Complete your writing journey."
        }
    ],

    mixed: [
        {
            name: "Warm-Up",
            icon: "🔥",
            description: "Start with a mixture of English skills."
        },
        {
            name: "Brain Challenge",
            icon: "🧠",
            description: "Mix vocabulary, grammar and writing."
        },
        {
            name: "Challenge Mode",
            icon: "🎮",
            description: "A more demanding mixed challenge."
        },
        {
            name: "Final Challenge",
            icon: "🏆",
            description: "Prove your overall English skills."
        }
    ]
};


const grammarQuestions = [

    {
        q: "She ___ to school every day.",
        a: ["go", "goes", "going", "gone"],
        c: 1,
        explanation: "With he, she or it in the simple present, the verb normally takes -s or -es."
    },

    {
        q: "They ___ watching a movie right now.",
        a: ["is", "are", "was", "be"],
        c: 1,
        explanation: "The present continuous uses am/is/are + verb-ing."
    },

    {
        q: "I ___ my homework yesterday.",
        a: ["finish", "finished", "have finished", "finishing"],
        c: 1,
        explanation: "Yesterday refers to a completed past action, so the simple past is appropriate."
    },

    {
        q: "He has ___ his work.",
        a: ["finish", "finished", "finishing", "finishes"],
        c: 1,
        explanation: "The present perfect uses have/has + past participle."
    },

    {
        q: "If I had more time, I ___ another language.",
        a: ["learn", "learned", "would learn", "will learn"],
        c: 2,
        explanation: "This is a second conditional sentence: if + past, would + base verb."
    },

    {
        q: "There ___ many students in the classroom.",
        a: ["is", "are", "was", "be"],
        c: 1,
        explanation: "Students is plural, so we use are."
    },

    {
        q: "She is interested ___ learning English.",
        a: ["at", "on", "in", "for"],
        c: 2,
        explanation: "The natural expression is interested in."
    },

    {
        q: "This book is ___ than that one.",
        a: ["interesting", "more interesting", "most interesting", "interest"],
        c: 1,
        explanation: "For this adjective, the comparative form is more interesting."
    },

    {
        q: "You ___ wear a seatbelt while driving.",
        a: ["should", "might", "couldn't", "would"],
        c: 0,
        explanation: "Should expresses advice or a recommended action."
    },

    {
        q: "By next year, I ___ my degree.",
        a: [
            "complete",
            "completed",
            "will have completed",
            "am completing"
        ],
        c: 2,
        explanation: "The future perfect describes an action completed before a future point."
    },

    {
        q: "Neither the teacher nor the students ___ ready.",
        a: ["is", "was", "are", "be"],
        c: 2,
        explanation: "With neither...nor, the verb commonly agrees with the nearer subject: students."
    },

    {
        q: "I have lived here ___ 2022.",
        a: ["for", "since", "during", "from"],
        c: 1,
        explanation: "Since is used with a starting point in time."
    },

    {
        q: "She suggested ___ earlier.",
        a: ["leave", "to leave", "leaving", "left"],
        c: 2,
        explanation: "Suggest is normally followed by a gerund when expressing an activity."
    },

    {
        q: "The report ___ by the research team last week.",
        a: ["completed", "was completed", "has completed", "completing"],
        c: 1,
        explanation: "This is passive voice in the simple past."
    },

    {
        q: "If I had known, I ___ you.",
        a: ["would tell", "would have told", "will tell", "tell"],
        c: 1,
        explanation: "This is a third conditional structure: if + past perfect, would have + past participle."
    }

];


const writingQuestions = [

    {
        q: "Which sentence sounds most natural and professional?",
        a: [
            "I want you to send me the file quickly.",
            "Please send me the file at your earliest convenience.",
            "Send the file fast.",
            "You have to send the file now."
        ],
        c: 1,
        explanation: "The second sentence is polite, professional and appropriate in formal communication."
    },

    {
        q: "Choose the clearest sentence.",
        a: [
            "Due to the fact that he was tired, he did not attend.",
            "Because he was tired, he did not attend.",
            "He was tired due to the fact and did not attend.",
            "Being tired was the reason why attendance was not done."
        ],
        c: 1,
        explanation: "Because he was tired is shorter and clearer."
    },

    {
        q: "Which sentence is most appropriate for an academic paper?",
        a: [
            "This thing proves that students need sleep.",
            "The findings suggest that adequate sleep is important for students.",
            "Students totally need sleep.",
            "Sleep is super important for students."
        ],
        c: 1,
        explanation: "The second sentence uses precise and appropriately cautious academic language."
    },

    {
        q: "Choose the strongest sentence.",
        a: [
            "The project was good and very useful.",
            "The project was useful.",
            "The project produced several practical benefits for students.",
            "The project was kind of useful."
        ],
        c: 2,
        explanation: "The third sentence gives a more precise and informative claim."
    },

    {
        q: "Which sentence avoids unnecessary repetition?",
        a: [
            "The reason is because the class was cancelled.",
            "The class was cancelled because of the weather.",
            "The class was cancelled due to the reason of weather.",
            "Because of the fact that weather happened, class was cancelled."
        ],
        c: 1,
        explanation: "The second sentence communicates the idea directly."
    },

    {
        q: "Which opening is most suitable for a professional email?",
        a: [
            "Hey bro, I need something.",
            "Dear Sir/Madam, I am writing to inquire about the position.",
            "What's up? I want the job.",
            "Listen, I have a question."
        ],
        c: 1,
        explanation: "The second option is formal and professional."
    },

    {
        q: "Which sentence has the most appropriate tone for giving feedback?",
        a: [
            "Your work is bad.",
            "You clearly don't understand this.",
            "Your work has several strengths, and a few areas could be developed further.",
            "This is wrong."
        ],
        c: 2,
        explanation: "The third option is constructive and professional."
    },

    {
        q: "Choose the most concise version.",
        a: [
            "At this point in time, we are currently unable to respond.",
            "We are currently unable to respond.",
            "At this current point in time, responding is not possible.",
            "We cannot currently at this point respond."
        ],
        c: 1,
        explanation: "The second sentence removes unnecessary wording."
    },

    {
        q: "Which sentence is more precise?",
        a: [
            "Many things affected the result.",
            "Several factors influenced the result.",
            "Stuff affected the result.",
            "A lot of things somehow affected the result."
        ],
        c: 1,
        explanation: "Several factors is more precise and appropriate."
    },

    {
        q: "Which sentence is best for a LinkedIn post?",
        a: [
            "I learned a lot of things today.",
            "Today's lesson reminded me that continuous learning is essential for professional growth.",
            "Today was nice.",
            "Learning is cool."
        ],
        c: 1,
        explanation: "The second sentence is professional and reflective."
    },

    {
        q: "Choose the best transition.",
        a: [
            "Furthermore, the study had several limitations.",
            "And also, the study had stuff.",
            "Plus the study had things.",
            "The study had limitations and whatever."
        ],
        c: 0,
        explanation: "Furthermore is a formal transition used to add related information."
    },

    {
        q: "Which sentence sounds least ambiguous?",
        a: [
            "I saw the student with the teacher.",
            "While speaking with the teacher, I saw the student.",
            "I saw the student that had the teacher.",
            "The student was seen by me with the teacher."
        ],
        c: 1,
        explanation: "The second option clearly establishes the context."
    }

];


const achievements = [

    {
        id: "first",
        icon: "🌱",
        title: "First Step",
        description: "Complete your first stage.",
        check: s => Object.keys(s.completed).length >= 1
    },

    {
        id: "ten",
        icon: "🔥",
        title: "Getting Serious",
        description: "Complete 10 stages.",
        check: s => Object.keys(s.completed).length >= 10
    },

    {
        id: "hundred",
        icon: "⚡",
        title: "100 XP",
        description: "Earn 100 XP.",
        check: s => s.xp >= 100
    },

    {
        id: "fivehundred",
        icon: "💎",
        title: "500 XP",
        description: "Earn 500 XP.",
        check: s => s.xp >= 500
    },

    {
        id: "streak3",
        icon: "🔥",
        title: "Three Days",
        description: "Reach a 3-day streak.",
        check: s => s.streak >= 3
    },

    {
        id: "streak7",
        icon: "👑",
        title: "Weekly Warrior",
        description: "Reach a 7-day streak.",
        check: s => s.streak >= 7
    },

    {
        id: "perfect",
        icon: "🏆",
        title: "Perfect",
        description: "Complete a stage with 100%.",
        check: s => Object.values(s.completed).some(x => x.perfect)
    },

    {
        id: "review",
        icon: "🧠",
        title: "Learn From Mistakes",
        description: "Complete a mistake review.",
        check: s => s.achievements.includes("review")
    },

    {
        id: "advanced",
        icon: "🚀",
        title: "Advanced",
        description: "Complete an advanced stage.",
        check: s => Object.keys(s.completed).some(k => k.includes("Advanced"))
    }
];


/* =========================
   STATE
========================= */

function loadState() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            );

        if (saved) {
            state = {
                ...state,
                ...saved,
                completed: saved.completed || {},
                mistakes: saved.mistakes || [],
                achievements: saved.achievements || [],
                daily: saved.daily || {
                    date: "",
                    completed: false
                }
            };
        }

    } catch (error) {
        console.warn("Could not load saved progress.");
    }
}


function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

    checkAchievements();
}


function todayKey() {

    const d = new Date();

    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0")
    ].join("-");
}


function yesterdayKey() {

    const d = new Date();

    d.setDate(d.getDate() - 1);

    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0")
    ].join("-");
}


function updateStreak() {

    const today = todayKey();

    if (state.lastPracticeDate === today) {
        return;
    }

    if (state.lastPracticeDate === yesterdayKey()) {
        state.streak++;
    } else {
        state.streak = 1;
    }

    state.lastPracticeDate = today;
}


/* =========================
   THEME
========================= */

function toggleTheme() {

    document.body.classList.toggle("light");

    const light =
        document.body.classList.contains("light");

    localStorage.setItem(
        THEME_KEY,
        light ? "light" : "dark"
    );

    updateThemeIcon();
}


function updateThemeIcon() {

    const icon =
        document.getElementById("themeIcon");

    if (!icon) return;

    icon.textContent =
        document.body.classList.contains("light")
            ? "☀️"
            : "🌙";
}


function loadTheme() {

    const theme =
        localStorage.getItem(THEME_KEY);

    if (theme === "light") {
        document.body.classList.add("light");
    }

    updateThemeIcon();
}


/* =========================
   SCREEN
========================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const target =
        document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =========================
   HOME
========================= */

function updateHome() {

    document.getElementById("topXP").textContent =
        state.xp;

    document.getElementById("xpValue").textContent =
        state.xp;

    document.getElementById("streakValue").textContent =
        state.streak;

    document.getElementById("mistakeValue").textContent =
        state.mistakes.length;

    document.getElementById("journeyXP").textContent =
        state.xp;

    document.getElementById("quizXP").textContent =
        state.xp;

    const total =
        Object.keys(state.completed).length;

    const mastery =
        Math.min(
            100,
            Math.round((total / 24) * 100)
        );

    document.getElementById("masteryValue").textContent =
        mastery + "%";

    const playerLevel =
        Math.floor(state.xp / 500) + 1;

    document.getElementById("playerLevel").textContent =
        playerLevel;

    document.getElementById("welcomeText").textContent =
        state.streak > 1
            ? `You're on a ${state.streak}-day streak. Keep going!`
            : "Every session makes you stronger.";

    updateContinueBox();
    updateReviewBox();
    updateDaily();
    renderAchievementPreview();
}


function updateContinueBox() {

    const box =
        document.getElementById("continueBox");

    const introButton =
        document.getElementById("introContinueBtn");

    if (!state.progress) {

        box.classList.add("hidden");

        if (introButton) {
            introButton.classList.add("hidden");
        }

        return;
    }

    const p = state.progress;

    const stageName =
        stages[p.section][p.stage]?.name ||
        "Next Challenge";

    document.getElementById("continueTitle").textContent =
        `${capitalize(p.section)} · ${p.level}`;

    document.getElementById("continueDescription").textContent =
        stageName;

    box.classList.remove("hidden");

    if (introButton) {
        introButton.classList.remove("hidden");
    }
}


function updateReviewBox() {

    const box =
        document.getElementById("reviewBox");

    if (!state.mistakes.length) {
        box.classList.add("hidden");
        return;
    }

    document.getElementById("reviewDescription").textContent =
        `${state.mistakes.length} item${state.mistakes.length === 1 ? "" : "s"} need more practice.`;

    box.classList.remove("hidden");
}


function updateDaily() {

    const today = todayKey();

    if (state.daily.date !== today) {

        state.daily = {
            date: today,
            completed: false
        };

        saveState();
    }

    const title =
        document.getElementById("dailyTitle");

    const desc =
        document.getElementById("dailyDescription");

    if (state.daily.completed) {

        title.textContent =
            "Daily challenge complete! 🎉";

        desc.textContent =
            "Come back tomorrow for a new challenge.";

    } else {

        title.textContent =
            "Today's challenge is ready.";

        desc.textContent =
            "Complete it for bonus XP and a streak boost.";
    }
}


/* =========================
   JOURNEY
========================= */

function openJourney(section) {

    currentSection = section;

    currentLevel =
        state.progress &&
        state.progress.section === section
            ? state.progress.level
            : "Beginner";

    showScreen("journeyScreen");

    renderJourney();
}


function selectLevel(level) {

    currentLevel = level;

    renderJourney();
}


function renderJourney() {

    const titles = {
        vocabulary: "Vocabulary Journey",
        grammar: "Grammar Journey",
        writing: "Writing Journey",
        mixed: "Mixed Practice"
    };

    const descriptions = {
        vocabulary: "Build vocabulary through meaning, context, listening and mastery.",
        grammar: "Develop accurate grammar through progressive challenges.",
        writing: "Build clearer, stronger and more natural English.",
        mixed: "Train several English skills together."
    };

    document.getElementById("journeyEyebrow").textContent =
        currentSection.toUpperCase();

    document.getElementById("journeyTitle").textContent =
        titles[currentSection];

    document.getElementById("journeyDescription").textContent =
        descriptions[currentSection];

    document
        .querySelectorAll(".level-tab")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.level === currentLevel
            );

        });

    const map =
        document.getElementById("journeyMap");

    map.innerHTML = "";

    const sectionStages =
        stages[currentSection];

    sectionStages.forEach((stage, index) => {

        const key =
            makeProgressKey(
                currentSection,
                currentLevel,
                index
            );

        const completed =
            state.completed[key];

        const previousKey =
            index === 0
                ? null
                : makeProgressKey(
                    currentSection,
                    currentLevel,
                    index - 1
                );

        const unlocked =
            index === 0 ||
            !!state.completed[previousKey];

        const button =
            document.createElement("button");

        button.className =
            "journey-node" +
            (!unlocked ? " locked" : "");

        button.disabled = !unlocked;

        button.innerHTML = `
            <div class="node-icon">${stage.icon}</div>

            <div class="node-info">
                <h3>${index + 1}. ${stage.name}</h3>
                <p>${stage.description}</p>
            </div>

            <div class="node-status">
                ${
                    completed
                        ? "✓ COMPLETE"
                        : unlocked
                            ? "START →"
                            : "🔒"
                }
            </div>
        `;

        if (unlocked) {

            button.onclick = () => {
                startStage(
                    currentSection,
                    currentLevel,
                    index
                );
            };
        }

        map.appendChild(button);
    });
}


function makeProgressKey(section, level, stage) {

    return `${section}|${level}|${stage}`;
}


/* =========================
   START / CONTINUE
========================= */

function startNewJourney() {

    state.progress = {
        section: "vocabulary",
        level: "Beginner",
        stage: 0
    };

    saveState();

    openJourney("vocabulary");
}


function continueJourney() {

    if (!state.progress) {

        openJourney("vocabulary");

        return;
    }

    currentSection =
        state.progress.section;

    currentLevel =
        state.progress.level;

    currentStage =
        state.progress.stage;

    startStage(
        currentSection,
        currentLevel,
        currentStage
    );
}


/* =========================
   QUESTION GENERATION
========================= */

function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];
    }

    return copy;
}


function pickRandom(array, count) {

    return shuffle(array)
        .slice(
            0,
            Math.min(count, array.length)
        );
}


function createVocabularyQuestions(level, stage) {

    const words =
        vocabulary[level] || [];

    const selected =
        pickRandom(words, 10);

    return selected.map(item => {

        const distractors =
            pickRandom(
                words.filter(
                    x =>
                        x.word !== item.word &&
                        x.meaning !== item.meaning
                ),
                3
            );

        let q;
        let answers;
        let correct;

        if (stage === 0 || stage === 2) {

            q =
                `What is the Dari meaning of "${item.word}"?`;

            answers =
                shuffle([
                    item.meaning,
                    ...distractors.map(x => x.meaning)
                ]);

            correct =
                answers.indexOf(item.meaning);

        } else if (stage === 1) {

            q =
                `Which English word means "${item.meaning}"?`;

            answers =
                shuffle([
                    item.word,
                    ...distractors.map(x => x.word)
                ]);

            correct =
                answers.indexOf(item.word);

        } else if (stage === 3) {

            q =
                `Which word best completes this sentence?\n\n"${item.example}"`;

            answers =
                shuffle([
                    item.word,
                    ...distractors.map(x => x.word)
                ]);

            correct =
                answers.indexOf(item.word);

        } else if (stage === 4) {

            q =
                "Listen carefully. Which word did you hear?";

            answers =
                shuffle([
                    item.word,
                    ...distractors.map(x => x.word)
                ]);

            correct =
                answers.indexOf(item.word);

        } else if (stage === 5) {

            q =
                `Which option is the correct English word for "${item.meaning}"?`;

            answers =
                shuffle([
                    item.word,
                    ...distractors.map(x => x.word)
                ]);

            correct =
                answers.indexOf(item.word);

        } else {

            q =
                `Quick! What does "${item.word}" mean?`;

            answers =
                shuffle([
                    item.meaning,
                    ...distractors.map(x => x.meaning)
                ]);

            correct =
                answers.indexOf(item.meaning);
        }

        return {
            q,
            a: answers,
            c: correct,
            explanation:
                `${item.word} means "${item.meaning}".`,
            speech:
                item.word,
            word:
                item.word
        };
    });
}


function createMixedQuestions(level) {

    const vocab =
        createVocabularyQuestions(
            level,
            2
        ).slice(0, 4);

    const grammar =
        pickRandom(grammarQuestions, 3);

    const writing =
        pickRandom(writingQuestions, 3);

    return shuffle([
        ...vocab,
        ...grammar,
        ...writing
    ]);
}


/* =========================
   START STAGE
========================= */

function startStage(
    section,
    level,
    stage
) {

    currentSection = section;
    currentLevel = level;
    currentStage = stage;

    isMistakeReview = false;
    isDailyChallenge = false;

    hearts = 5;
    score = 0;
    currentQuestion = 0;

    if (section === "vocabulary") {

        questions =
            createVocabularyQuestions(
                level,
                stage
            );

    } else if (section === "grammar") {

        questions =
            shuffle(grammarQuestions)
                .slice(0, 10);

    } else if (section === "writing") {

        questions =
            shuffle(writingQuestions)
                .slice(0, 10);

    } else {

        questions =
            createMixedQuestions(level);
    }

    if (!questions.length) {

        showToast("No questions available yet.");

        return;
    }

    state.progress = {
        section,
        level,
        stage
    };

    saveState();

    showScreen("quizScreen");

    renderQuestion();
}


function startDailyChallenge() {

    if (state.daily.completed) {

        showToast("Today's challenge is already complete! 🎉");

        return;
    }

    isDailyChallenge = true;
    isMistakeReview = false;

    currentSection = "mixed";
    currentLevel = "Intermediate";
    currentStage = 2;

    hearts = 5;
    score = 0;
    currentQuestion = 0;

    const seed =
        new Date().getDate() +
        new Date().getMonth();

    const vocabPart =
        createVocabularyQuestions(
            "Intermediate",
            seed % 7
        ).slice(0, 4);

    const grammarPart =
        shuffle(grammarQuestions).slice(0, 3);

    const writingPart =
        shuffle(writingQuestions).slice(0, 3);

    questions =
        [
            ...vocabPart,
            ...grammarPart,
            ...writingPart
        ];

    showScreen("quizScreen");

    renderQuestion();
}


/* =========================
   QUIZ
========================= */

function isSpeedStage() {

    return (
        currentSection === "vocabulary" &&
        currentStage === 6
    ) ||
    (
        currentSection === "grammar" &&
        currentStage === 3
    ) ||
    (
        currentSection === "writing" &&
        currentStage === 3
    ) ||
    (
        currentSection === "mixed" &&
        currentStage >= 2
    ) ||
    isDailyChallenge;
}


function renderQuestion() {

    stopTimer();

    answeredCurrent = false;

    const question =
        questions[currentQuestion];

    if (!question) {

        finishStage();

        return;
    }

    document.getElementById("stageName").textContent =
        isDailyChallenge
            ? "Daily Challenge"
            : stages[currentSection][currentStage].name;

    document.getElementById("questionCounter").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("scoreValue").textContent =
        score;

    document.getElementById("heartsDisplay").textContent =
        "❤️".repeat(hearts) +
        "🖤".repeat(Math.max(0, 5 - hearts));

    document.getElementById("questionProgress").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    document.getElementById("questionText").textContent =
        question.q;

    document.getElementById("questionType").textContent =
        detectQuestionType(question);

    const listen =
        document.getElementById("listenButton");

    if (
        question.speech &&
        (
            currentStage === 4 ||
            currentSection === "vocabulary"
        )
    ) {

        listen.classList.remove("hidden");

    } else {

        listen.classList.add("hidden");
    }

    const grid =
        document.getElementById("answerGrid");

    grid.innerHTML = "";

    question.a.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.innerHTML = `
            <span class="answer-key">
                ${String.fromCharCode(65 + index)}
            </span>
            ${escapeHtml(answer)}
        `;

        button.onclick = () =>
            chooseAnswer(index);

        grid.appendChild(button);
    });

    document
        .getElementById("feedback")
        .className =
        "feedback hidden";

    document
        .getElementById("nextButton")
        .classList.add("hidden");

    if (isSpeedStage()) {
        startTimer();
    }

    if (
        question.speech &&
        currentStage === 4
    ) {

        setTimeout(
            () => speakQuestion(),
            350
        );
    }
}


function detectQuestionType(question) {

    if (question.speech) {
        if (currentStage === 4) {
            return "LISTENING";
        }

        if (currentStage === 5) {
            return "PRONUNCIATION";
        }
    }

    if (currentSection === "grammar") {
        return "GRAMMAR";
    }

    if (currentSection === "writing") {
        return "WRITING";
    }

    if (currentSection === "mixed") {
        return "MIXED PRACTICE";
    }

    if (currentStage === 6) {
        return "SPEED CHALLENGE";
    }

    return "VOCABULARY";
}


function chooseAnswer(index) {

    if (answeredCurrent) {
        return;
    }

    answeredCurrent = true;

    stopTimer();

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(
        button => button.disabled = true
    );

    buttons[question.c]
        ?.classList.add("correct");

    const feedback =
        document.getElementById("feedback");

    if (index === question.c) {

        score++;

        feedback.className =
            "feedback correct-feedback";

        feedback.innerHTML =
            `🎉 Correct! ${escapeHtml(question.explanation || "Great work.")}`;

        showToast(
            getPositiveMessage()
        );

        if (question.word) {
            removeMistake(question.word);
        }

    } else {

        hearts--;

        buttons[index]
            ?.classList.add("wrong");

        saveMistake(
            question
        );

        feedback.className =
            "feedback wrong-feedback";

        feedback.innerHTML =
            `Not quite. ${escapeHtml(question.explanation || "Review this one.")}`;

        updateHearts();

        if (hearts <= 0) {

            setTimeout(
                finishWithNoHearts,
                900
            );

            return;
        }
    }

    feedback.classList.remove("hidden");

    document
        .getElementById("scoreValue")
        .textContent = score;

    document
        .getElementById("nextButton")
        .classList.remove("hidden");
}


function nextQuestion() {

    if (!answeredCurrent) {
        return;
    }

    currentQuestion++;

    renderQuestion();
}


function updateHearts() {

    document.getElementById("heartsDisplay").textContent =
        "❤️".repeat(hearts) +
        "🖤".repeat(Math.max(0, 5 - hearts));
}


/* =========================
   TIMER
========================= */

function startTimer() {

    timeLeft = 30;

    const box =
        document.getElementById("timerBox");

    const value =
        document.getElementById("timerValue");

    box.classList.remove("hidden");
    box.classList.remove("warning");

    value.textContent = timeLeft;

    timerInterval =
        setInterval(() => {

            timeLeft--;

            value.textContent =
                timeLeft;

            if (timeLeft <= 8) {
                box.classList.add("warning");
            }

            if (timeLeft <= 0) {

                stopTimer();

                timeExpired();
            }

        }, 1000);
}


function stopTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }

    const box =
        document.getElementById("timerBox");

    if (box) {
        box.classList.add("hidden");
        box.classList.remove("warning");
    }
}


function timeExpired() {

    if (answeredCurrent) {
        return;
    }

    answeredCurrent = true;

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(
        button => button.disabled = true
    );

    buttons[question.c]
        ?.classList.add("correct");

    hearts--;

    saveMistake(question);

    updateHearts();

    const feedback =
        document.getElementById("feedback");

    feedback.className =
        "feedback wrong-feedback";

    feedback.innerHTML =
        `⏰ Time's up! ${escapeHtml(question.explanation || "")}`;

    feedback.classList.remove("hidden");

    if (hearts <= 0) {

        setTimeout(
            finishWithNoHearts,
            900
        );

        return;
    }

    document
        .getElementById("nextButton")
        .classList.remove("hidden");
}


/* =========================
   MISTAKES
========================= */

function saveMistake(question) {

    const key =
        question.word ||
        question.q;

    const existing =
        state.mistakes.find(
            x => x.key === key
        );

    if (existing) {

        existing.times++;

    } else {

        state.mistakes.push({
            key,
            q: question.q,
            a: question.a,
            c: question.c,
            explanation: question.explanation,
            word: question.word || "",
            times: 1
        });
    }

    state.mistakes =
        state.mistakes.slice(-100);

    saveState();
}


function removeMistake(word) {

    if (!word) {
        return;
    }

    state.mistakes =
        state.mistakes.filter(
            x => x.word !== word
        );

    saveState();
}


function startMistakeReview() {

    if (!state.mistakes.length) {

        showToast("Your mistake list is empty! 🎉");

        return;
    }

    isMistakeReview = true;
    isDailyChallenge = false;

    hearts = 5;
    score = 0;
    currentQuestion = 0;

    questions =
        shuffle(state.mistakes)
            .slice(0, 10)
            .map(item => ({
                q: item.q,
                a: item.a,
                c: item.c,
                explanation: item.explanation,
                word: item.word
            }));

    showScreen("quizScreen");

    renderQuestion();
}


function finishMistakeReview() {

    state.mistakes = [];

    state.achievements =
        Array.from(
            new Set([
                ...state.achievements,
                "review"
            ])
        );

    saveState();
}


/* =========================
   FINISH
========================= */

function finishWithNoHearts() {

    stopTimer();

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );

    document.getElementById("earnedXP").textContent =
        "+0";

    document.getElementById("celebrationScore").textContent =
        `${score}/${questions.length}`;

    document.getElementById("celebrationAccuracy").textContent =
        `${percentage}%`;

    document.getElementById("celebrationTitle").textContent =
        "Keep Going! 💪";

    document.getElementById("celebrationMessage").textContent =
        "You ran out of hearts, but your mistakes have been saved for review.";

    document.getElementById("nextUnlock").textContent =
        "Review your mistakes and try again.";

    document.getElementById("celebrationStars").textContent =
        "🧠 ❤️ 💪";

    showScreen("celebrationScreen");
}


function finishStage() {

    stopTimer();

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );

    if (isMistakeReview) {

        finishMistakeReview();

        const earned =
            Math.max(
                25,
                score * 10
            );

        state.xp += earned;

        updateStreak();
        saveState();

        showCelebration(
            percentage,
            earned,
            "REVIEW COMPLETE! 🧠",
            "You turned mistakes into progress."
        );

        return;
    }


    if (isDailyChallenge) {

        const earned =
            150 +
            (percentage === 100 ? 100 : 0);

        state.xp += earned;

        state.daily.completed = true;

        updateStreak();

        saveState();

        showCelebration(
            percentage,
            earned,
            percentage === 100
                ? "DAILY PERFECT! 🏆"
                : "DAILY COMPLETE! 🔥",
            "You completed today's challenge."
        );

        return;
    }


    const key =
        makeProgressKey(
            currentSection,
            currentLevel,
            currentStage
        );

    const previous =
        state.completed[key];

    let earned =
        100 +
        currentStage * 25;

    if (percentage === 100) {
        earned += 50;
    }

    if (hearts === 5) {
        earned += 25;
    }

    if (previous) {
        earned =
            Math.floor(earned / 2);
    }

    state.xp += earned;

    state.completed[key] = {
        percentage,
        perfect: percentage === 100,
        timestamp: Date.now()
    };

    updateStreak();

    const nextStage =
        currentStage + 1;

    if (
        nextStage <
        stages[currentSection].length
    ) {

        state.progress = {
            section: currentSection,
            level: currentLevel,
            stage: nextStage
        };

    } else {

        state.progress = {
            section: currentSection,
            level: currentLevel,
            stage: 0
        };
    }

    saveState();

    let title =
        "GOOD EFFORT! 💪";

    if (percentage === 100) {
        title = "PERFECT! 🏆";
    } else if (percentage >= 80) {
        title = "EXCELLENT! 👏";
    } else if (percentage >= 60) {
        title = "WELL DONE! ⭐";
    }

    const nextName =
        nextStage <
        stages[currentSection].length
            ? stages[currentSection][nextStage].name
            : "Journey Complete";

    showCelebration(
        percentage,
        earned,
        title,
        percentage >= 80
            ? `You've unlocked the next challenge: ${nextName}.`
            : `Keep practicing. Your next challenge is ${nextName}.`
    );
}


function showCelebration(
    percentage,
    earned,
    title,
    message
) {

    document.getElementById("earnedXP").textContent =
        `+${earned}`;

    document.getElementById("celebrationScore").textContent =
        `${score}/${questions.length}`;

    document.getElementById("celebrationAccuracy").textContent =
        `${percentage}%`;

    document.getElementById("celebrationTitle").textContent =
        title;

    document.getElementById("celebrationMessage").textContent =
        message;

    const nextStage =
        currentStage + 1;

    let nextText =
        "Your next challenge is ready.";

    if (
        !isMistakeReview &&
        !isDailyChallenge &&
        nextStage <
        stages[currentSection].length
    ) {

        nextText =
            stages[currentSection][nextStage].name;

    } else if (!isMistakeReview && !isDailyChallenge) {

        nextText =
            "You completed this journey!";
    }

    document.getElementById("nextUnlock").textContent =
        nextText;

    if (percentage === 100) {
        document.getElementById("celebrationStars").textContent =
            "⭐⭐⭐⭐⭐";
    } else if (percentage >= 80) {
        document.getElementById("celebrationStars").textContent =
            "⭐⭐⭐⭐";
    } else if (percentage >= 60) {
        document.getElementById("celebrationStars").textContent =
            "⭐⭐⭐";
    } else {
        document.getElementById("celebrationStars").textContent =
            "⭐⭐";
    }

    createConfetti();

    showScreen("celebrationScreen");
}


function continueAfterCelebration() {

    if (isMistakeReview) {

        isMistakeReview = false;

        showScreen("homeScreen");

        updateHome();

        return;
    }

    if (isDailyChallenge) {

        isDailyChallenge = false;

        showScreen("homeScreen");

        updateHome();

        return;
    }

    const next =
        currentStage + 1;

    if (
        next <
        stages[currentSection].length
    ) {

        currentStage = next;

        startStage(
            currentSection,
            currentLevel,
            currentStage
        );

        return;
    }

    showFinalResult();
}


function showFinalResult() {

    const completedCount =
        stages[currentSection].reduce(
            (total, _, index) => {

                const key =
                    makeProgressKey(
                        currentSection,
                        currentLevel,
                        index
                    );

                return total +
                    (state.completed[key] ? 1 : 0);

            },
            0
        );

    const mastery =
        Math.round(
            (
                completedCount /
                stages[currentSection].length
            ) * 100
        );

    document.getElementById("finalMastery").textContent =
        `${mastery}%`;

    document.getElementById("finalCorrect").textContent =
        completedCount;

    document.getElementById("finalXP").textContent =
        state.xp;

    document.getElementById("resultTitle").textContent =
        mastery === 100
            ? "You mastered it! 🏆"
            : "Journey complete! 🎉";

    document.getElementById("resultDescription").textContent =
        `You completed ${completedCount} of ${stages[currentSection].length} stages in ${currentLevel}.`;

    showScreen("resultScreen");
}


/* =========================
   EXIT MODAL
========================= */

function confirmExitQuiz() {

    document
        .getElementById("exitModal")
        .classList.remove("hidden");
}


function closeExitModal() {

    document
        .getElementById("exitModal")
        .classList.add("hidden");
}


function leaveQuiz() {

    closeExitModal();

    stopTimer();

    showScreen("homeScreen");

    updateHome();
}


/* =========================
   AUDIO
========================= */

function speakQuestion() {

    const question =
        questions[currentQuestion];

    if (!question) {
        return;
    }

    const text =
        question.speech ||
        question.q;

    if (
        !("speechSynthesis" in window)
    ) {

        showToast(
            "Your browser does not support speech synthesis."
        );

        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = .82;
    utterance.pitch = 1;

    window.speechSynthesis.speak(
        utterance
    );
}


/* =========================
   ACHIEVEMENTS
========================= */

function checkAchievements() {

    let changed = false;

    achievements.forEach(item => {

        if (
            item.id === "review" &&
            !state.achievements.includes("review")
        ) {
            return;
        }

        if (
            item.check(state) &&
            !state.achievements.includes(item.id)
        ) {

            state.achievements.push(item.id);

            changed = true;

            setTimeout(
                () => showToast(
                    `${item.icon} Achievement unlocked: ${item.title}!`
                ),
                100
            );
        }
    });

    if (changed) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );
    }
}


function renderAchievementPreview() {

    const container =
        document.getElementById(
            "achievementPreview"
        );

    if (!container) return;

    container.innerHTML = "";

    achievements
        .slice(0, 5)
        .forEach(item => {

            const unlocked =
                item.check(state);

            const element =
                document.createElement("div");

            element.className =
                "achievement-item" +
                (!unlocked ? " locked" : "");

            element.innerHTML = `
                <div class="achievement-icon">
                    ${unlocked ? item.icon : "🔒"}
                </div>

                <strong>${item.title}</strong>

                <span>${item.description}</span>
            `;

            container.appendChild(element);
        });
}


function openAchievements() {

    const grid =
        document.getElementById(
            "achievementGrid"
        );

    grid.innerHTML = "";

    achievements.forEach(item => {

        const unlocked =
            item.check(state);

        const element =
            document.createElement("div");

        element.className =
            "achievement-item" +
            (!unlocked ? " locked" : "");

        element.innerHTML = `
            <div class="achievement-icon">
                ${unlocked ? item.icon : "🔒"}
            </div>

            <strong>${item.title}</strong>

            <span>${item.description}</span>
        `;

        grid.appendChild(element);
    });

    showScreen("achievementsScreen");
}


/* =========================
   UTILITIES
========================= */

function capitalize(value) {

    return value.charAt(0).toUpperCase() +
        value.slice(1);
}


function getPositiveMessage() {

    const messages = [
        "Excellent! 👏",
        "Great job! 🔥",
        "Correct! 🧠",
        "Nice work! ⭐",
        "You've got it! 🚀",
        "Brilliant! 💪"
    ];

    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];
}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(
        showToast.timeout
    );

    showToast.timeout =
        setTimeout(
            () => toast.classList.remove("show"),
            2200
        );
}


function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );

    container.innerHTML = "";

    const symbols = [
        "•",
        "◆",
        "★",
        "✦"
    ];

    for (let i = 0; i < 75; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.fontSize =
            `${8 + Math.random() * 12}px`;

        piece.style.animationDelay =
            `${Math.random() * .7}s`;

        piece.style.opacity =
            `${.5 + Math.random() * .5}`;

        container.appendChild(piece);
    }

    setTimeout(
        () => {
            container.innerHTML = "";
        },
        3500
    );
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        const quiz =
            document
                .getElementById("quizScreen")
                .classList
                .contains("active");

        if (!quiz) return;

        if (
            ["1", "2", "3", "4"]
                .includes(event.key)
        ) {

            const index =
                Number(event.key) - 1;

            chooseAnswer(index);
        }

        if (
            event.key === "Enter" &&
            answeredCurrent
        ) {

            nextQuestion();
        }
    }
);


/* =========================
   INIT
========================= */

async function loadVocabulary() {

    try {

        const response =
            await fetch("vocabulary.json");

        if (!response.ok) {
            throw new Error("Vocabulary file unavailable.");
        }

        vocabulary =
            await response.json();

    } catch (error) {

        console.error(error);

        vocabulary = {
            Beginner: [],
            Intermediate: [],
            Advanced: []
        };

        showToast(
            "Vocabulary database could not be loaded."
        );
    }
}


async function init() {

    loadState();

    loadTheme();

    await loadVocabulary();

    updateHome();

    if (state.progress) {

        document
            .getElementById("introContinueBtn")
            .classList
            .remove("hidden");
    }

    showScreen("introScreen");
}


document.addEventListener(
    "DOMContentLoaded",
    init
);
