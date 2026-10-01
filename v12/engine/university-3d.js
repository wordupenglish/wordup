/*
============================================================
 WORDUP ENGLISH UNIVERSITY
 Integrated 3D Curriculum Engine
============================================================
*/

(function () {
    "use strict";

    const LEVELS = [
        {
            id: "foundation",
            name: "Foundation",
            subtitle: "Build your English from the beginning",
            color: "foundation"
        },
        {
            id: "a1",
            name: "A1",
            subtitle: "Beginner English",
            color: "a1"
        },
        {
            id: "a2",
            name: "A2",
            subtitle: "Elementary English",
            color: "a2"
        },
        {
            id: "b1",
            name: "B1",
            subtitle: "Intermediate English",
            color: "b1"
        },
        {
            id: "b2",
            name: "B2",
            subtitle: "Upper-Intermediate English",
            color: "b2"
        },
        {
            id: "c1",
            name: "C1",
            subtitle: "Advanced English",
            color: "c1"
        },
        {
            id: "c2",
            name: "C2",
            subtitle: "Proficiency English",
            color: "c2"
        },
        {
            id: "academic",
            name: "Academic English",
            subtitle: "University and research skills",
            color: "academic"
        }
    ];

    const SKILLS = [
        ["vocabulary", "Vocabulary", "📚"],
        ["grammar", "Grammar", "🧩"],
        ["reading", "Reading", "📖"],
        ["listening", "Listening", "🎧"],
        ["speaking", "Speaking", "🎤"],
        ["writing", "Writing", "✍️"]
    ];

    let root = null;

    function getCurriculum() {
        return window.WORDUP_MASTER_CURRICULUM ||
               window.WORDUP_CURRICULUM ||
               window.WORDUP_CONTENT_REGISTRY ||
               null;
    }

    function getLevelTopics(levelId) {
        const curriculum = getCurriculum();

        if (!curriculum) return {};

        if (curriculum[levelId]) {
            return curriculum[levelId];
        }

        if (curriculum.levels && curriculum.levels[levelId]) {
            return curriculum.levels[levelId];
        }

        return {};
    }

    function normalizeTopics(levelId) {
        const source = getLevelTopics(levelId);
        const result = {};

        SKILLS.forEach(([skill]) => {
            let value = source[skill];

            if (!value) {
                result[skill] = [];
                return;
            }

            if (Array.isArray(value)) {
                result[skill] = value;
                return;
            }

            if (value.topics && Array.isArray(value.topics)) {
                result[skill] = value.topics;
                return;
            }

            if (value.lessons && Array.isArray(value.lessons)) {
                result[skill] = value.lessons;
                return;
            }

            result[skill] = [];
        });

        return result;
    }

    function esc(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function injectStyles() {
        if (document.getElementById("wordup-university-3d-style")) return;

        const style = document.createElement("style");
        style.id = "wordup-university-3d-style";

        style.textContent = `
        #wordup-university {
            position:fixed;
            inset:0;
            z-index:999999;
            overflow:auto;
            background:
                radial-gradient(circle at 20% 10%, rgba(80,120,255,.16), transparent 35%),
                radial-gradient(circle at 80% 90%, rgba(160,80,255,.14), transparent 35%),
                #070912;
            color:#fff;
            font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
            perspective:1400px;
        }

        #wordup-university * {
            box-sizing:border-box;
        }

        .wu-topbar {
            position:sticky;
            top:0;
            z-index:10;
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:18px 28px;
            background:rgba(7,9,18,.78);
            backdrop-filter:blur(18px);
            border-bottom:1px solid rgba(255,255,255,.09);
        }

        .wu-brand {
            font-weight:900;
            letter-spacing:.08em;
            font-size:18px;
        }

        .wu-close {
            border:1px solid rgba(255,255,255,.15);
            background:rgba(255,255,255,.06);
            color:#fff;
            padding:9px 15px;
            border-radius:12px;
            cursor:pointer;
        }

        .wu-page {
            max-width:1400px;
            margin:auto;
            padding:45px 28px 80px;
        }

        .wu-hero {
            text-align:center;
            margin-bottom:48px;
        }

        .wu-hero h1 {
            font-size:clamp(38px,6vw,76px);
            margin:0;
            font-weight:950;
            letter-spacing:-.055em;
            text-shadow:0 20px 60px rgba(0,0,0,.5);
        }

        .wu-hero p {
            color:#aeb7cc;
            font-size:18px;
            margin-top:14px;
        }

        .wu-levels {
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            gap:24px;
        }

        .wu-level {
            min-height:220px;
            position:relative;
            padding:28px;
            border:1px solid rgba(255,255,255,.12);
            border-radius:25px;
            background:
                linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.025));
            box-shadow:
                0 25px 60px rgba(0,0,0,.35),
                inset 0 1px rgba(255,255,255,.12);
            transform:translateZ(0);
            transition:.25s ease;
            cursor:pointer;
        }

        .wu-level:hover {
            transform:translateY(-8px) rotateX(2deg);
            border-color:rgba(255,255,255,.3);
            box-shadow:
                0 35px 80px rgba(0,0,0,.5),
                0 0 50px rgba(100,120,255,.08);
        }

        .wu-level-code {
            font-size:46px;
            font-weight:950;
            letter-spacing:-.06em;
        }

        .wu-level-name {
            font-size:22px;
            font-weight:800;
            margin-top:10px;
        }

        .wu-level-sub {
            color:#aeb7cc;
            margin-top:8px;
            line-height:1.5;
        }

        .wu-level-arrow {
            position:absolute;
            right:24px;
            bottom:22px;
            font-size:28px;
            opacity:.65;
        }

        .wu-back {
            margin-bottom:25px;
            background:rgba(255,255,255,.06);
            color:white;
            border:1px solid rgba(255,255,255,.1);
            border-radius:12px;
            padding:10px 16px;
            cursor:pointer;
        }

        .wu-title {
            font-size:42px;
            font-weight:900;
            margin-bottom:8px;
        }

        .wu-subtitle {
            color:#aeb7cc;
            margin-bottom:35px;
        }

        .wu-units {
            display:grid;
            gap:28px;
        }

        .wu-unit {
            padding:26px;
            border-radius:24px;
            background:rgba(255,255,255,.045);
            border:1px solid rgba(255,255,255,.09);
        }

        .wu-unit h3 {
            margin:0 0 20px;
            font-size:25px;
        }

        .wu-lessons {
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            gap:15px;
        }

        .wu-lesson {
            padding:20px;
            border-radius:18px;
            background:rgba(0,0,0,.2);
            border:1px solid rgba(255,255,255,.08);
            cursor:pointer;
            transition:.2s;
        }

        .wu-lesson:hover {
            transform:translateY(-4px);
            border-color:rgba(255,255,255,.25);
        }

        .wu-lesson-number {
            color:#8d9aff;
            font-size:13px;
            font-weight:800;
            text-transform:uppercase;
            letter-spacing:.1em;
        }

        .wu-lesson-title {
            font-size:18px;
            font-weight:800;
            margin-top:7px;
        }

        .wu-skills {
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
            gap:16px;
            margin-top:30px;
        }

        .wu-skill {
            padding:25px 18px;
            text-align:center;
            border-radius:20px;
            background:linear-gradient(145deg,rgba(255,255,255,.09),rgba(255,255,255,.025));
            border:1px solid rgba(255,255,255,.1);
            cursor:pointer;
            transition:.2s;
        }

        .wu-skill:hover {
            transform:translateY(-5px);
        }

        .wu-skill-icon {
            font-size:34px;
        }

        .wu-skill-name {
            font-weight:800;
            margin-top:10px;
        }

        .wu-empty {
            padding:30px;
            color:#8f99ad;
            text-align:center;
            border:1px dashed rgba(255,255,255,.12);
            border-radius:18px;
        }

        @media(max-width:600px) {
            .wu-page {
                padding:30px 16px 60px;
            }

            .wu-topbar {
                padding:14px 16px;
            }

            .wu-title {
                font-size:32px;
            }

            .wu-level {
                min-height:190px;
            }
        }
        `;

        document.head.appendChild(style);
    }

    function createRoot() {
        root = document.createElement("div");
        root.id = "wordup-university";
        document.body.appendChild(root);
    }

    function topbar() {
        return `
            <div class="wu-topbar">
                <div class="wu-brand">WORDUP ENGLISH UNIVERSITY</div>
                <button class="wu-close" onclick="wordUpUniversityClose()">✕ Close</button>
            </div>
        `;
    }

    function home() {
        root.innerHTML = `
            ${topbar()}
            <main class="wu-page">
                <section class="wu-hero">
                    <h1>WORDUP</h1>
                    <p>Your complete English learning journey — from Foundation to Academic English.</p>
                </section>

                <section class="wu-levels">
                    ${LEVELS.map(level => `
                        <article class="wu-level"
                            onclick="wordUpUniversityLevel('${level.id}')">
                            <div class="wu-level-code">${esc(level.name)}</div>
                            <div class="wu-level-name">${esc(level.name === "Foundation" ? "Foundation English" : level.name)}</div>
                            <div class="wu-level-sub">${esc(level.subtitle)}</div>
                            <div class="wu-level-arrow">→</div>
                        </article>
                    `).join("")}
                </section>
            </main>
        `;
    }

    function level(levelId) {
        const level = LEVELS.find(x => x.id === levelId);
        if (!level) return home();

        const topics = normalizeTopics(levelId);

        const allTopics = [];

        SKILLS.forEach(([skill, name, icon]) => {
            (topics[skill] || []).forEach((topic, index) => {
                allTopics.push({
                    skill,
                    name,
                    icon,
                    topic,
                    index
                });
            });
        });

        const lessons = [];

        /*
         * Lessons are integrated.
         * Every lesson contains all six skills.
         */
        const max = Math.max(
            ...SKILLS.map(([skill]) => (topics[skill] || []).length),
            0
        );

        for (let i = 0; i < max; i++) {
            const skills = SKILLS.map(([skill,name,icon]) => {
                const list = topics[skill] || [];
                return list[i] ? {
                    skill,
                    name,
                    icon,
                    topic: list[i]
                } : null;
            }).filter(Boolean);

            if (skills.length) {
                lessons.push({
                    number:i + 1,
                    title: skills[0].topic?.title ||
                           skills[0].topic?.name ||
                           `Integrated Lesson ${i + 1}`,
                    skills
                });
            }
        }

        /*
         * If the curriculum has no directly readable arrays,
         * still show the skill structure.
         */
        root.innerHTML = `
            ${topbar()}
            <main class="wu-page">

                <button class="wu-back" onclick="wordUpUniversityHome()">
                    ← University
                </button>

                <div class="wu-title">${esc(level.name)}</div>
                <div class="wu-subtitle">${esc(level.subtitle)}</div>

                <div class="wu-units">

                    <section class="wu-unit">
                        <h3>Unit 1 — Integrated English</h3>

                        ${
                            lessons.length
                            ? `
                                <div class="wu-lessons">
                                    ${lessons.map(lesson => `
                                        <article class="wu-lesson"
                                            onclick='wordUpUniversityLesson(${JSON.stringify({
                                                level:levelId,
                                                lesson:lesson
                                            })})'>

                                            <div class="wu-lesson-number">
                                                Lesson ${lesson.number}
                                            </div>

                                            <div class="wu-lesson-title">
                                                ${esc(
                                                    typeof lesson.title === "string"
                                                    ? lesson.title
                                                    : `Integrated Lesson ${lesson.number}`
                                                )}
                                            </div>

                                            <div class="wu-skills">
                                                ${lesson.skills.map(s => `
                                                    <div class="wu-skill">
                                                        <div class="wu-skill-icon">${s.icon}</div>
                                                        <div class="wu-skill-name">
                                                            ${esc(s.name)}
                                                        </div>
                                                    </div>
                                                `).join("")}
                                            </div>

                                        </article>
                                    `).join("")}
                                </div>
                            `
                            : `
                                <div class="wu-empty">
                                    Curriculum structure detected, but this level
                                    does not yet contain readable lesson arrays.
                                </div>
                            `
                        }
                    </section>

                </div>
            </main>
        `;
    }

    function lesson(data) {
        const lesson = data.lesson;

        root.innerHTML = `
            ${topbar()}

            <main class="wu-page">

                <button class="wu-back"
                    onclick="wordUpUniversityLevel('${data.level}')">
                    ← Level
                </button>

                <div class="wu-title">
                    ${esc(
                        typeof lesson.title === "string"
                        ? lesson.title
                        : "Integrated English Lesson"
                    )}
                </div>

                <div class="wu-subtitle">
                    Learn → Examples → Guided Practice → Skill Practice →
                    Integrated Practice → Review → Assessment
                </div>

                <section class="wu-unit">

                    <h3>Lesson Skills</h3>

                    <div class="wu-skills">
                        ${lesson.skills.map(skill => `
                            <article class="wu-skill"
                                onclick='wordUpUniversityOpenSkill(${JSON.stringify(skill)})'>
                                <div class="wu-skill-icon">${skill.icon}</div>
                                <div class="wu-skill-name">
                                    ${esc(skill.name)}
                                </div>
                            </article>
                        `).join("")}
                    </div>

                    <div style="margin-top:40px;padding:25px;
                        border-radius:20px;background:rgba(255,255,255,.04);
                        border:1px solid rgba(255,255,255,.08);">

                        <h3>Lesson Flow</h3>

                        <p style="color:#aeb7cc;line-height:1.8;">
                            This lesson is designed as an integrated learning
                            experience. Learners study the concept, examine
                            examples, practise individual skills, combine the
                            skills in meaningful tasks, review mistakes, and
                            complete an assessment before unlocking the next lesson.
                        </p>

                        <button class="wu-close"
                            onclick="wordUpUniversityStartLesson(${JSON.stringify(data).replace(/"/g,'&quot;')})">
                            Start Lesson →
                        </button>

                    </div>

                </section>

            </main>
        `;
    }

    function openSkill(skill) {
        alert(
            skill.name +
            "\\n\\nTopic: " +
            (
                typeof skill.topic === "string"
                ? skill.topic
                : JSON.stringify(skill.topic, null, 2)
            )
        );
    }

    function startLesson(data) {
        /*
         * Connect here to the existing WordUp lesson/runtime.
         * We intentionally do not replace the current engine.
         */

        if (typeof window.wordUpOpenLesson === "function") {
            const first = data.lesson.skills[0];

            window.wordUpOpenLesson(
                first.topic?.id ||
                first.topic?.lessonId ||
                first.topic?.lesson ||
                first.topic
            );

            return;
        }

        alert(
            "University lesson selected.\\n\\n" +
            "The existing WordUp lesson engine is still active."
        );
    }

    window.wordUpUniversityHome = home;

    window.wordUpUniversityLevel = function (levelId) {
        level(levelId);
    };

    window.wordUpUniversityLesson = function (data) {
        lesson(data);
    };

    window.wordUpUniversityOpenSkill = openSkill;

    window.wordUpUniversityStartLesson = startLesson;

    window.wordUpUniversityClose = function () {
        if (root) {
            root.remove();
            root = null;
        }
    };

    window.wordUpUniversityOpen = function () {
        injectStyles();

        if (!root) {
            createRoot();
        }

        home();
    };

    window.WORDUP_UNIVERSITY_VERSION = "integrated-3d";

})();
