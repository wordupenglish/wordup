/*
============================================================
 WORDUP COURSE INTEGRATION
 Uses the existing V12 curriculum/content/progress engine.
 No second curriculum system.
============================================================
*/

(function () {
    "use strict";

    const LEVELS = [
        "foundation",
        "a1",
        "a2",
        "b1",
        "b2",
        "c1",
        "c2",
        "academic"
    ];

          const LEARNER_LEVEL_NAMES = {
          foundation: "Foundation",
          a1: "A1 — Beginner",
          a2: "A2 — Elementary",
          b1: "B1 — Intermediate",
          b2: "B2 — Upper-Intermediate",
          c1: "C1 — Advanced",
          c2: "C2 — Proficiency",
          academic: "Academic English"
      };

      function learnerLevelName(level) {
          return LEARNER_LEVEL_NAMES[level] || "Level";
      }
      const LEVEL_NAMES = {
        foundation: "Foundation",
        a1: "A1 — Beginner",
        a2: "A2 — Elementary",
        b1: "B1 — Intermediate",
        b2: "B2 — Upper-Intermediate",
        c1: "C1 — Advanced",
        c2: "C2 — Proficiency",
        academic: "Academic English"
    };

    const SKILLS = [
        "writing",
        "grammar",
        "vocabulary",
        "reading",
        "listening",
        "speaking"
    ];

    const SKILL_ICONS = {
        writing: "✍️",
        grammar: "🔤",
        vocabulary: "📚",
        reading: "📖",
        listening: "🎧",
        speaking: "🗣️",
    };

    const SKILL_NAMES = {
        writing: "Writing",
        grammar: "Grammar",
        vocabulary: "Vocabulary",
        reading: "Reading",
        listening: "Listening",
        speaking: "Speaking",
    };

    /*
    =========================================================
     WORDUP COURSE
     Presentation layer only.
     Uses the existing V12 curriculum/content engine.
    =========================================================
    */

    const UNIVERSITY_STAGES = {
        foundation: {
            title: "Foundation",
            subtitle: "Build the essential foundations of English.",
            description: "Start with letters, words, sentences, basic grammar, reading, listening and guided writing."
        },
        a1: {
            title: "Level 2",
            subtitle: "Build everyday English.",
            description: "Develop the language needed for simple communication and familiar situations."
        },
        a2: {
            title: "Level 3",
            subtitle: "Expand your everyday English.",
            description: "Build stronger grammar, vocabulary, reading and communication skills."
        },
        b1: {
            title: "Level 4",
            subtitle: "Become an independent English user.",
            description: "Develop connected communication, practical reading, listening and structured writing."
        },
        b2: {
            title: "Level 5",
            subtitle: "Develop confident and precise English.",
            description: "Strengthen advanced communication, complex grammar and academic preparation."
        },
        c1: {
            title: "Level 6",
            subtitle: "Use English with precision and flexibility.",
            description: "Develop sophisticated vocabulary, grammar, argumentation and academic communication."
        },
        c2: {
            title: "Level 7",
            subtitle: "Reach highly advanced English control.",
            description: "Work with nuanced language, complex texts and sophisticated communication."
        },
        academic: {
            title: "Academic English",
            subtitle: "Prepare for university-level English.",
            description: "Develop academic reading, writing, vocabulary, grammar and research communication."
        }
    };

    let currentView = "levels";
    let currentLevel = null;
    let currentSkill = null;
    let currentLesson = null;
    let currentTab = "learn";

    function esc(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function getContent() {
        if (typeof window.wordUpGetAllContent === "function") {
            return window.wordUpGetAllContent();
        }
        return [];
    }

    function getProgress() {
        if (typeof window.wordUpGetProgress === "function") {
            return window.wordUpGetProgress();
        }

        return {
            lessons: {},
            tests: {},
            scores: {},
            xp: 0,
            streak: 0,
            mistakes: []
        };
    }

    function getLessons(level, skill) {
        return getContent().filter(lesson =>
            lesson.level === level &&
            (!skill || lesson.skill === skill)
        );
    }

    function isLessonComplete(id) {
        const progress = getProgress();
        return !!(
            progress.lessons &&
            progress.lessons[id] &&
            progress.lessons[id].completed
        );
    }

    function isTestComplete(id) {
        const progress = getProgress();
        return !!(
            progress.tests &&
            progress.tests[id] &&
            progress.tests[id].completed
        );
    }

    function levelProgress(level) {
        const lessons = getLessons(level);

        if (!lessons.length) return 0;

        const completed =
            lessons.filter(x => isLessonComplete(x.id)).length;

        return Math.round(
            (completed / lessons.length) * 100
        );
    }

    function renderShell() {
        const screen = document.getElementById("curriculum");

        if (!screen) return null;

        screen.innerHTML = `
            <div class="wu-course-shell">

                <div class="wu-course-header">
                    <div>
                        <span class="wu-course-kicker">WORDUP COURSE</span>
                        <h1 id="wuCourseTitle">English Course</h1>
                        <p id="wuCourseSubtitle">
                            Build your English step by step from Foundation to Academic English.
                        </p>
                    </div>

                    <button
                        class="back-btn"
                        id="wuCourseBack"
                        onclick="wordUpCourseBack()">
                        ← Back
                    </button>
                </div>

                <div id="wuCourseContent"></div>

            </div>
        `;

        return screen;
    }

    function renderLevels() {
        currentView = "levels";
        currentLevel = null;
        currentSkill = null;
        currentLesson = null;

        renderShell();

        const content = getContent();
        const box = document.getElementById("wuCourseContent");

        if (!content.length) {
            box.innerHTML = `
                <div class="wu-course-empty">
                    <h2>Course is loading...</h2>
                    <p>Your lessons are being prepared. Please try again in a moment.</p>
                </div>
            `;
            return;
        }

        const progress = getProgress();

        const totalLessons = content.length;

        const completedLessons = content.filter(
            x => isLessonComplete(x.id)
        ).length;

        const overall = totalLessons
            ? Math.round(
                completedLessons /
                totalLessons *
                100
            )
            : 0;

        const nextLesson =
            content.find(
                x => !isLessonComplete(x.id)
            );

        const levelCards = LEVELS.map(
            (level, index) => {

                const lessons =
                    getLessons(level);

                const completed =
                    lessons.filter(
                        x => isLessonComplete(x.id)
                    ).length;

                const percent =
                    lessons.length
                        ? Math.round(
                            completed /
                            lessons.length *
                            100
                        )
                        : 0;

                const isCurrent =
                    progress.currentLevel === level ||
                    localStorage.getItem("wordUpCurrentLevel") === level;

                return `
                    <button
                        type="button"
                        class="wu-course-level-card ${isCurrent ? "current" : ""}"
                        onclick="wordUpOpenCourseLevel('${level}')">

                        <div class="wu-course-level-number">
                            ${index + 1}
                        </div>

                        <div class="wu-course-level-content">

                            <div class="wu-course-level-heading">
                                <strong>
                                    ${esc(LEVEL_NAMES[level] || `Level ${index + 1}`)}
                                </strong>

                                ${
                                    isCurrent
                                    ? `<span class="wu-course-current-badge">Current</span>`
                                    : ""
                                }
                            </div>

                            <span class="wu-course-level-meta">
                                ${lessons.length} lesson${lessons.length === 1 ? "" : "s"}
                            </span>

                            <div class="wu-course-level-progress">
                                <span style="width:${percent}%"></span>
                            </div>

                            <span class="wu-course-level-percent">
                                ${percent}% completed
                            </span>

                        </div>

                        <span class="wu-course-level-arrow">
                            →
                        </span>

                    </button>
                `;
            }
        ).join("");

        box.innerHTML = `

            <section class="wu-course-overview">

                <div class="wu-course-overview-main">

                    <span class="wu-course-kicker">
                        WORDUP COURSE
                    </span>

                    <h2>
                        Build your English step by step.
                    </h2>

                    <p>
                        Work through each level, study the lessons,
                        practise what you learn, and complete the tests
                        to keep moving forward.
                    </p>

                </div>

                <div class="wu-course-overview-progress">

                    <div class="wu-course-overview-progress-top">
                        <span>Overall progress</span>
                        <strong>${overall}%</strong>
                    </div>

                    <div class="wu-course-progress">
                        <span style="width:${overall}%"></span>
                    </div>

                    <small>
                        ${completedLessons} of ${totalLessons} lessons completed
                    </small>

                </div>

            </section>

            ${
                nextLesson
                ? `
                    <button
                        type="button"
                        class="wu-course-continue"
                        onclick="wordUpOpenCourseLesson('${esc(nextLesson.id)}')">

                        <div class="wu-course-continue-main">

                            <span>
                                CONTINUE LEARNING
                            </span>

                            <strong>
                                ${esc(nextLesson.topic || nextLesson.title)}
                            </strong>

                            <small>
                                ${esc(
                                    LEVEL_NAMES[nextLesson.level]
                                    || nextLesson.level
                                )}
                                ·
                                ${esc(
                                    SKILL_NAMES[nextLesson.skill]
                                    || nextLesson.skill
                                )}
                            </small>

                        </div>

                        <b>
                            Continue →
                        </b>

                    </button>
                `
                : `
                    <div class="wu-course-complete">
                        <strong>
                            You have completed all available lessons.
                        </strong>

                        <span>
                            Excellent work. Keep practising to maintain your progress.
                        </span>
                    </div>
                `
            }

            <div class="wu-course-section-heading">

                <h2>
                    Your Levels
                </h2>

                <p>
                    Choose a level to see its skills and lessons.
                </p>

            </div>

            <div class="wu-course-level-grid">
                ${levelCards}
            </div>

        `;
    }
    function renderLevel(level) {
        currentView = "level";
        currentLevel = level;
        currentSkill = null;
        currentLesson = null;

        renderShell();

        document.getElementById("wuCourseTitle").textContent =
            LEVEL_NAMES[level] || level;

        document.getElementById("wuCourseSubtitle").textContent =
            "Choose a skill to continue learning.";

        const box = document.getElementById("wuCourseContent");

        const lessons = getLessons(level);
        const progress = getProgress();

        box.innerHTML = `

            <div class="wu-course-level-summary">

                <div>
                    <strong>${lessons.length}</strong>
                    <span>Lessons</span>
                </div>

                <div>
                    <strong>${levelProgress(level)}%</strong>
                    <span>Completed</span>
                </div>

                <div>
                    <strong>${esc(progress.xp || 0)}</strong>
                    <span>Total XP</span>
                </div>

            </div>

            <div class="wu-course-section-heading">
                <h2>Skills</h2>
                <p>Each level develops the major English skills together.</p>
            </div>

            <div class="wu-skill-grid">

                ${SKILLS.map(skill => {

                    const skillLessons =
                        getLessons(level, skill);

                    const completed =
                        skillLessons.filter(
                            x => isLessonComplete(x.id)
                        ).length;

                    const pct =
                        skillLessons.length
                            ? Math.round(
                                completed /
                                skillLessons.length *
                                100
                            )
                            : 0;

                    return `
                        <button
                            class="wu-skill-course-card"
                            onclick="wordUpOpenCourseSkill('${level}','${skill}')">

                            <span class="wu-skill-icon">
                                ${SKILL_ICONS[skill]}
                            </span>

                            <div>
                                <strong>
                                    ${SKILL_NAMES[skill]}
                                </strong>

                                <small>
                                    ${skillLessons.length} lesson${skillLessons.length === 1 ? "" : "s"}
                                </small>

                                <div class="wu-course-progress">
                                    <span style="width:${pct}%"></span>
                                </div>

                                <small>${pct}% completed</small>
                            </div>

                            <span>→</span>

                        </button>
                    `;
                }).join("")}

            </div>

        `;
    }

    function renderSkill(level, skill) {
        currentView = "skill";
        currentLevel = level;
        currentSkill = skill;
        currentLesson = null;

        renderShell();

        document.getElementById("wuCourseTitle").textContent =
            `${LEVEL_NAMES[level]} · ${SKILL_NAMES[skill]}`;

        document.getElementById("wuCourseSubtitle").textContent =
            "Choose a lesson and follow the learning sequence.";

        const box = document.getElementById("wuCourseContent");

        const lessons = getLessons(level, skill);

        if (!lessons.length) {
            box.innerHTML = `
                <div class="wu-course-empty">
                    <h2>No lessons loaded yet</h2>
                    <p>
                        This skill already exists in the WordUp curriculum map.
                        Its detailed lesson content will appear here as it is added.
                    </p>
                </div>
            `;
            return;
        }

        box.innerHTML = `

            <div class="wu-lesson-list">

                ${lessons.map((lesson, index) => {

                    const completed =
                        isLessonComplete(lesson.id);

                    const tested =
                        isTestComplete(lesson.id);

                    const score =
                        getProgress().scores?.[lesson.id];

                    return `
                        <button
                            class="wu-course-lesson-card"
                            onclick="wordUpOpenCourseLesson('${esc(lesson.id)}')">

                            <div class="wu-lesson-index">
                                ${completed ? "✓" : index + 1}
                            </div>

                            <div class="wu-lesson-main">

                                <strong>
                                    ${esc(lesson.topic || lesson.title)}
                                </strong>

                                <small>
                                    ${esc(lesson.duration || 10)} min
                                    · ${lesson.practice?.length || 0} practice questions
                                    · ${lesson.test?.length || 0} test questions
                                </small>

                                ${
                                    score !== undefined
                                    ? `<small>Best test score: ${esc(score)}%</small>`
                                    : ""
                                }

                            </div>

                            <div class="wu-lesson-status">

                                ${
                                    completed
                                    ? `<span class="wu-complete-badge">Completed</span>`
                                    : tested
                                    ? `<span class="wu-progress-badge">Tested</span>`
                                    : `<span>Start →</span>`
                                }

                            </div>

                        </button>
                    `;

                }).join("")}

            </div>
        `;
    }

    function renderLesson(lessonId) {
        const lesson =
            getContent().find(x => x.id === lessonId);

        if (!lesson) return;

        currentView = "lesson";
        currentLesson = lesson;

        renderShell();

        document.getElementById("wuCourseTitle").textContent =
            lesson.topic || "Lesson";

        document.getElementById("wuCourseSubtitle").textContent =
            `${LEVEL_NAMES[lesson.level] || lesson.level} · ${SKILL_NAMES[lesson.skill] || lesson.skill}`;

        renderLessonTabs();
    }

    function renderLessonTabs() {
        const box =
            document.getElementById("wuCourseContent");

        const lesson = currentLesson;

        box.innerHTML = `

            <div class="wu-lesson-tabs">

                <button
                    class="${currentTab === "learn" ? "active" : ""}"
                    onclick="wordUpCourseTab('learn')">
                    Learn
                </button>

                <button
                    class="${currentTab === "practice" ? "active" : ""}"
                    onclick="wordUpCourseTab('practice')">
                    Practice
                </button>

                <button
                    class="${currentTab === "test" ? "active" : ""}"
                    onclick="wordUpCourseTab('test')">
                    Test
                </button>

            </div>

            <div id="wuLessonPanel"></div>
        `;

        if (currentTab === "learn") {
            renderLearn();
        }

        if (currentTab === "practice") {
            renderPractice();
        }

        if (currentTab === "test") {
            renderTest();
        }
    }

    function renderLearn() {
        const lesson = currentLesson;

        let html = `

            <article class="wu-learning-card">

                <div class="wu-learning-label">
                    LESSON
                </div>

                <h2>
                    ${esc(lesson.topic)}
                </h2>

                <h3>Objective</h3>

                <p>
                    ${esc(lesson.objective)}
                </p>

                <h3>Explanation</h3>

                <p>
                    ${esc(lesson.explanation)}
                </p>

        `;

        if (lesson.rules?.length) {
            html += `
                <h3>Key rules</h3>
                <ul>
                    ${lesson.rules.map(x =>
                        `<li>${esc(x)}</li>`
                    ).join("")}
                </ul>
            `;
        }

        if (lesson.examples?.length) {
            html += `
                <h3>Examples</h3>
                <div class="wu-example-list">
                    ${lesson.examples.map(x =>
                        `<div>${esc(x)}</div>`
                    ).join("")}
                </div>
            `;
        }

        if (lesson.vocabulary?.length) {
            html += `
                <h3>Vocabulary</h3>

                <div class="wu-vocabulary-mini">

                    ${lesson.vocabulary.map(item => `
                        <div>
                            <strong>${esc(item.word)}</strong>
                            <span>${esc(item.meaning)}</span>
                        </div>
                    `).join("")}

                </div>
            `;
        }

        if (lesson.mistakes?.length) {
            html += `
                <h3>Common mistakes</h3>
                <ul>
                    ${lesson.mistakes.map(x =>
                        `<li>${esc(x)}</li>`
                    ).join("")}
                </ul>
            `;
        }

        html += `

            </article>

            <div class="wu-learning-actions">

                <button
                    class="primary"
                    onclick="wordUpCourseTab('practice')">
                    Start Practice →
                </button>

                <button
                    class="secondary"
                    onclick="wordUpCourseCompleteLesson()">
                    ✓ Mark Lesson Complete
                </button>

            </div>

        `;

        document.getElementById("wuLessonPanel").innerHTML = html;
    }

    function renderPractice() {
        const lesson = currentLesson;
        const questions = lesson.practice || [];

        if (!questions.length) {
            document.getElementById("wuLessonPanel").innerHTML = `
                <div class="wu-course-empty">
                    <h2>No practice questions yet.</h2>
                    <button class="primary"
                        onclick="wordUpCourseTab('test')">
                        Continue to Test →
                    </button>
                </div>
            `;
            return;
        }

        document.getElementById("wuLessonPanel").innerHTML = `

            <div class="wu-practice-header">
                <span>PRACTICE</span>
                <strong>${questions.length} questions</strong>
                <small>Practice is for learning. Your test is scored.</small>
            </div>

            <div class="wu-question-list">

                ${questions.map((q, index) => {

                    const answer =
                        q.answer ??
                        q.correctAnswer ??
                        q.correct;

                    return `
                        <article
                            class="wu-question-card"
                            data-practice-question="${index}">

                            <strong>
                                ${index + 1}. ${esc(
                                    q.question ||
                                    q.prompt ||
                                    q.text ||
                                    "Question"
                                )}
                            </strong>

                            <div class="wu-question-options">

                                ${(q.options || []).map((option, i) => `
                                    <button
                                        onclick="wordUpPracticeAnswer(
                                            ${index},
                                            ${i},
                                            ${JSON.stringify(answer)}
                                        )">
                                        ${esc(option)}
                                    </button>
                                `).join("")}

                            </div>

                            <div
                                class="wu-question-feedback"
                                id="wuPracticeFeedback${index}">
                            </div>

                        </article>
                    `;

                }).join("")}

            </div>

            <div class="wu-learning-actions">

                <button
                    class="primary"
                    onclick="wordUpCourseTab('test')">
                    Take Final Test →
                </button>

            </div>
        `;
    }

    let testAnswers = {};

    function renderTest() {
        const lesson = currentLesson;
        const questions = lesson.test || [];

        testAnswers = {};

        if (!questions.length) {
            document.getElementById("wuLessonPanel").innerHTML = `
                <div class="wu-course-empty">
                    <h2>No test questions yet.</h2>
                    <p>This lesson needs assessment content before it can be tested.</p>
                </div>
            `;
            return;
        }

        document.getElementById("wuLessonPanel").innerHTML = `

            <div class="wu-test-header">
                <span>FINAL ASSESSMENT</span>
                <strong>${questions.length} questions</strong>
                <small>70% is required to pass.</small>
            </div>

            <div class="wu-question-list">

                ${questions.map((q, index) => `
                    <article class="wu-question-card">

                        <strong>
                            ${index + 1}. ${esc(
                                q.question ||
                                q.prompt ||
                                q.text ||
                                "Question"
                            )}
                        </strong>

                        <div class="wu-question-options">

                            ${(q.options || []).map((option, i) => `
                                <button
                                    data-test-question="${index}"
                                    onclick="wordUpSelectTestAnswer(${index},${i})">
                                    ${esc(option)}
                                </button>
                            `).join("")}

                        </div>

                    </article>
                `).join("")}

            </div>

            <div class="wu-test-submit">

                <button
                    class="primary big"
                    onclick="wordUpSubmitTest()">
                    Submit Test
                </button>

            </div>

            <div id="wuTestResult"></div>
        `;
    }

    function practiceAnswer(questionIndex, selectedIndex, answer) {
        const card =
            document.querySelector(
                `[data-practice-question="${questionIndex}"]`
            );

        if (!card) return;

        const buttons =
            card.querySelectorAll("button");

        buttons.forEach(button => {
            button.disabled = true;
        });

        const correct =
            String(selectedIndex) === String(answer);

        if (buttons[selectedIndex]) {
            buttons[selectedIndex].classList.add(
                correct ? "correct" : "wrong"
            );
        }

        if (!correct && buttons[Number(answer)]) {
            buttons[Number(answer)].classList.add("correct");
        }

        const feedback =
            document.getElementById(
                `wuPracticeFeedback${questionIndex}`
            );

        feedback.innerHTML = correct
            ? `<div class="wu-feedback-good">✓ Correct! Excellent.</div>`
            : `<div class="wu-feedback-bad">✗ Not quite. Review the lesson and try again.</div>`;
    }

    function selectTestAnswer(questionIndex, optionIndex) {
        testAnswers[questionIndex] = optionIndex;

        document
            .querySelectorAll(
                `[data-test-question="${questionIndex}"]`
            )
            .forEach((button, index) => {
                button.classList.toggle(
                    "selected",
                    index === optionIndex
                );
            });
    }

    function submitTest() {
        const lesson = currentLesson;
        const questions = lesson.test || [];

        if (!questions.length) return;

        let correct = 0;

        questions.forEach((q, index) => {

            const answer =
                q.answer ??
                q.correctAnswer ??
                q.correct;

            if (
                Number(testAnswers[index]) ===
                Number(answer)
            ) {
                correct++;
            }
        });

        const score =
            Math.round(
                correct /
                questions.length *
                100
            );

        const passed = score >= 70;

        if (typeof window.wordUpCompleteTest === "function") {
            window.wordUpCompleteTest(
                lesson.id,
                score
            );
        }

        if (passed &&
            typeof window.wordUpCompleteLesson === "function") {
            window.wordUpCompleteLesson(
                lesson.id
            );
        }

        const result =
            document.getElementById("wuTestResult");

        result.innerHTML = `

            <div class="
                wu-test-result
                ${passed ? "passed" : "failed"}
            ">

                <div class="wu-result-icon">
                    ${passed ? "🎉" : "📚"}
                </div>

                <h2>
                    ${passed ? "Test passed!" : "Keep practicing."}
                </h2>

                <strong class="wu-result-score">
                    ${score}%
                </strong>

                <p>
                    You answered
                    <strong>${correct}</strong>
                    of
                    <strong>${questions.length}</strong>
                    correctly.
                </p>

                ${
                    passed
                    ? `
                        <p>
                            Excellent. This lesson is now recorded
                            as completed.
                        </p>
                    `
                    : `
                        <p>
                            You need at least 70%.
                            Review the lesson and try again.
                        </p>
                    `
                }

                <div class="wu-learning-actions">

                    ${
                        passed
                        ? `
                            <button
                                class="primary"
                                onclick="wordUpCourseNextLesson()">
                                Next Lesson →
                            </button>
                        `
                        : `
                            <button
                                class="primary"
                                onclick="wordUpCourseTab('practice')">
                                Practice Again
                            </button>
                        `
                    }

                    <button
                        class="secondary"
                        onclick="wordUpCourseBack()">
                        Back to Lessons
                    </button>

                </div>

            </div>
        `;

        updateStatsSafely();
    }

    function completeLesson() {
        if (!currentLesson) return;

        if (typeof window.wordUpCompleteLesson === "function") {
            window.wordUpCompleteLesson(
                currentLesson.id
            );
        }

        renderLessonTabs();

        updateStatsSafely();
    }

    function nextLesson() {
        if (!currentLesson) return;

        const lessons =
            getLessons(
                currentLesson.level,
                currentLesson.skill
            );

        const index =
            lessons.findIndex(
                x => x.id === currentLesson.id
            );

        if (index >= 0 && index < lessons.length - 1) {
            renderLesson(
                lessons[index + 1].id
            );
        } else {
            renderSkill(
                currentLesson.level,
                currentLesson.skill
            );
        }
    }

    function updateStatsSafely() {
        if (typeof window.updateStats === "function") {
            try {
                window.updateStats();
            } catch (error) {
                console.warn(
                    "WordUp course stats refresh skipped.",
                    error
                );
            }
        }
    }

    function courseBack() {

        if (currentView === "lesson") {
            renderSkill(
                currentLevel,
                currentSkill
            );
            return;
        }

        if (currentView === "skill") {
            renderLevel(currentLevel);
            return;
        }

        if (currentView === "level") {
            renderLevels();
            return;
        }

        if (typeof window.goHome === "function") {
            window.goHome();
        }
    }

    function openCourse() {
        if (typeof window.showScreen === "function") {
            window.showScreen("curriculum");
        }

        setTimeout(
            renderLevels,
            0
        );
    }

    function openLevel(level) {
        if (!LEVELS.includes(level)) return;

        if (typeof window.showScreen === "function") {
            window.showScreen("curriculum");
        }

        setTimeout(
            () => renderLevel(level),
            0
        );
    }

      function setSkill(skill) {
          if (!SKILLS.includes(skill)) return;

          if (!currentLevel) {
              const preferredLevel =
                  LEVELS.find(level => getLessons(level, skill).length)
                  || "foundation";

              openSkill(preferredLevel, skill);
              return;
          }

          openSkill(currentLevel, skill);
      }

    function openSkill(level, skill) {
        if (!LEVELS.includes(level)) return;
        if (!SKILLS.includes(skill)) return;

        if (typeof window.showScreen === "function") {
            window.showScreen("curriculum");
        }

        setTimeout(
            () => renderSkill(level, skill),
            0
        );
    }

    function openLesson(id) {
        if (typeof window.showScreen === "function") {
            window.showScreen("curriculum");
        }

        setTimeout(
            () => renderLesson(id),
            0
        );
    }

    function openHomeSkill(skill) {
        const progress =
            getProgress();

        let preferredLevel =
            localStorage.getItem(
                "wordUpCurrentLevel"
            );

        preferredLevel =
            preferredLevel &&
            LEVELS.includes(
                preferredLevel.toLowerCase()
            )
                ? preferredLevel.toLowerCase()
                : null;

        if (!preferredLevel) {
            preferredLevel = LEVELS.find(
                level =>
                    getLessons(level, skill).length
            ) || "foundation";
        }

        openSkill(
            preferredLevel,
            skill
        );
    }

    /*
       Expose public controls.
    */

    window.wordUpOpenCourse =
        openCourse;

    window.wordUpOpenCourseLevel =
        openLevel;

    window.wordUpOpenCourseSkill =
        openSkill;

    window.wordUpOpenCourseLesson =
        openLesson;

    window.wordUpCourseBack =
        courseBack;

    window.wordUpCourseTab =
        function (tab) {
            currentTab = tab;
            renderLessonTabs();
        };

    window.wordUpPracticeAnswer =
        practiceAnswer;

    window.wordUpSelectTestAnswer =
        selectTestAnswer;

    window.wordUpSubmitTest =
        submitTest;

    window.wordUpCourseCompleteLesson =
        completeLesson;

    window.wordUpCourseNextLesson =
        nextLesson;

    /*
       Connect existing Home skill cards to V12 Course.
    */

    const originalOpenSkill =
        window.openSkill;

    window.openSkill = function (skill) {

        if (
            SKILLS.includes(skill) &&
            getContent().length
        ) {
            openHomeSkill(skill);
            return;
        }

        if (typeof originalOpenSkill === "function") {
            originalOpenSkill(skill);
        }
    };

    /*
       Connect Continue Learning to the real V12 content.
    */

    const originalContinueLearning =
        window.continueLearning;

    window.continueLearning = function () {

        const content =
            getContent();

        if (!content.length) {
            if (typeof originalContinueLearning === "function") {
                originalContinueLearning();
            }
            return;
        }

        const progress =
            getProgress();

        const next =
            content.find(
                lesson =>
                    !(
                        progress.lessons &&
                        progress.lessons[lesson.id] &&
                        progress.lessons[lesson.id].completed
                    )
            );

        if (next) {
            openLesson(next.id);
        } else {
            openCourse();
        }
    };

    /*
       Replace the old V12 floating launcher.
       Course navigation is now the real entry point.
    */

    function removeOldLauncher() {
        const launcher =
            document.getElementById(
                "wordup-v12-launcher"
            );

        if (launcher) {
            launcher.remove();
        }
    }

    /*
       Make every visible Course navigation button
       use the integrated course.
    */

    function connectCourseNavigation() {

        document
            .querySelectorAll("button, a")
            .forEach(element => {

                const label =
                    element.textContent
                        .trim()
                        .replace(/\s+/g, " ");

                if (
                    label === "Course" ||
                    label === "📚 Course"
                ) {
                    element.onclick = function (event) {
                        event.preventDefault();
                        openCourse();
                    };
                }

            });
    }

    /*
       Keep the existing showScreen system.
       When the curriculum screen is opened,
       display the integrated course.
    */

    const originalShowScreen =
        window.showScreen;

    if (typeof originalShowScreen === "function") {

        window.showScreen = function (screenId) {

            originalShowScreen(screenId);

            if (screenId === "curriculum") {

                setTimeout(
                    () => {

                        renderLevels();

                        connectCourseNavigation();
                        removeOldLauncher();

                    },
                    0
                );
            }

        };

    }

    function init() {

        removeOldLauncher();
        connectCourseNavigation();

        const curriculum =
            document.getElementById("curriculum");

        if (curriculum) {
            curriculum.dataset.wordupCourse =
                "integrated";
        }

        console.log(
            "%cWordUp Course Integration loaded.",
            "font-weight:bold;font-size:15px"
        );

        console.log(
            "V12 lessons:",
            getContent().length
        );
    }

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    } else {
        init();
    }

})();










