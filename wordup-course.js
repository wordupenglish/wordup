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
          a1: "A1 \u2014 Beginner",
          a2: "A2 \u2014 Elementary",
          b1: "B1 \u2014 Intermediate",
          b2: "B2 \u2014 Upper-Intermediate",
          c1: "C1 \u2014 Advanced",
          c2: "C2 \u2014 Proficiency",
          academic: "Academic English"
      };

      function learnerLevelName(level) {
          return LEARNER_LEVEL_NAMES[level] || "Level";
      }
      const LEVEL_NAMES = {
        foundation: "Foundation",
        a1: "A1 \u2014 Beginner",
        a2: "A2 \u2014 Elementary",
        b1: "B1 \u2014 Intermediate",
        b2: "B2 \u2014 Upper-Intermediate",
        c1: "C1 \u2014 Advanced",
        c2: "C2 \u2014 Proficiency",
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
        writing: "\u270D\uFE0F",
        grammar: "\u{1F524}",
        vocabulary: "\u{1F4DA}",
        reading: "\u{1F4D6}",
        listening: "\u{1F3A7}",
        speaking: "\u{1F5E3}\uFE0F",
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
                        \u2190 Back
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
                            \u2192
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
                                \u00B7
                                ${esc(
                                    SKILL_NAMES[nextLesson.skill]
                                    || nextLesson.skill
                                )}
                            </small>

                        </div>

                        <b>
                            Continue \u2192
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

                            <span>\u2192</span>

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
            `${LEVEL_NAMES[level]} \u00B7 ${SKILL_NAMES[skill]}`;

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
                                ${completed ? "\u2713" : index + 1}
                            </div>

                            <div class="wu-lesson-main">

                                <strong>
                                    ${esc(lesson.topic || lesson.title)}
                                </strong>

                                <small>
                                    ${esc(lesson.duration || 10)} min
                                    \u00B7 ${lesson.practice?.length || 0} practice questions
                                    \u00B7 ${lesson.test?.length || 0} test questions
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
                                    : `<span>Start \u2192</span>`
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
            `${LEVEL_NAMES[lesson.level] || lesson.level} \u00B7 ${SKILL_NAMES[lesson.skill] || lesson.skill}`;

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
                    Start Practice \u2192
                </button>

                <button
                    class="secondary"
                    onclick="wordUpCourseCompleteLesson()">
                    \u2713 Mark Lesson Complete
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
                        Continue to Test \u2192
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
                    Take Final Test \u2192
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
            ? `<div class="wu-feedback-good">\u2713 Correct! Excellent.</div>`
            : `<div class="wu-feedback-bad">\u2717 Not quite. Review the lesson and try again.</div>`;
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
                    ${passed ? "\u{1F389}" : "\u{1F4DA}"}
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
                                Next Lesson \u2192
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
                if (requestId !== wordLookupRequest) return;

                // Secondary dictionary source for words missing from the first API.
                try {
                    const fallbackController = new AbortController();
                    const fallbackTimer = window.setTimeout(
                        () => fallbackController.abort(), 10000
                    );

                    let fallbackData;
                    try {
                        const fallbackResponse = await fetch(
                            "https://en.wiktionary.org/api/rest_v1/page/definition/" +
                                encodeURIComponent(query),
                            { signal: fallbackController.signal }
                        );

                        if (!fallbackResponse.ok) {
                            throw new Error("Secondary dictionary unavailable");
                        }
                        fallbackData = await fallbackResponse.json();
                    } finally {
                        window.clearTimeout(fallbackTimer);
                    }

                    if (requestId !== wordLookupRequest) return;

                    const englishEntries = fallbackData && fallbackData.en;
                    const fallbackEntry = Array.isArray(englishEntries)
                        ? englishEntries.find(item =>
                            Array.isArray(item.definitions) && item.definitions.length
                        )
                        : null;
                    const fallbackDefinition = fallbackEntry &&
                        fallbackEntry.definitions[0];

                    if (fallbackDefinition && fallbackDefinition.definition) {
                        const cleanDefinition = String(
                            fallbackDefinition.definition
                        ).replace(/<[^>]*>/g, "");

                        box.innerHTML = `
                            <article class="wu-word-card">
                                <div class="wu-word-label">WORD MEANING</div>
                                <h3>${esc(query)}${fallbackEntry.partOfSpeech
                                    ? ` <span class="wu-word-status">\u00B7 ${esc(fallbackEntry.partOfSpeech)}</span>`
                                    : ""}</h3>
                                <p>${esc(cleanDefinition)}</p>
                            </article>
                        `;
                        return;
                    }
                } catch (fallbackError) {
                    // Show the standard message below if both sources fail.
                }

                if (requestId !== wordLookupRequest) return;
                box.innerHTML = `<article class="wu-word-card"><div class="wu-word-label">WORD MEANING</div><p class="wu-word-status">Could not retrieve a definition for \u201C${esc(rawQuery.trim())}\u201D. Check your connection or spelling and try again.</p></article>`;
            }
        }
        function renderResults() {
            const query = wuSearchNormalize(input.value);
            const tokens = query.split(/\s+/).filter(Boolean);
            renderWordMeaning(input.value);
            let lessons = getContent().filter(lesson =>
                activeSkill === "all" || lesson.skill === activeSkill
            );

            if (tokens.length) {
                lessons = lessons.map(lesson => {
                    const title = wuSearchNormalize(
                        lesson.topic || lesson.title || lesson.id
                    );
                    const skill = wuSearchNormalize(lesson.skill);
                    const corpus = wuSearchNormalize(JSON.stringify(lesson));
                    let score = 0;
                    let matched = 0;

                    if (title.includes(query)) score += 100;

                    for (const token of tokens) {
                        if (corpus.includes(token)) {
                            matched++;
                            score += 4;
                            if (title.includes(token)) score += 20;
                            if (skill === token) score += 30;
                        }
                    }

                    if (matched === tokens.length) score += 15;
                    return { lesson, score, matched };
                })
                .filter(item => item.score > 0 && item.matched > 0)
                .sort((a, b) => b.score - a.score)
                .map(item => item.lesson);
            } else {
                lessons = lessons.slice(0, 18);
            }

            if (!query && activeSkill === "all") {
                resultsBox.innerHTML = `
                    <div class="wu-search-empty">
                        <strong>Popular searches</strong>
                        <div class="wu-search-suggestions">
                            ${["present simple", "vocabulary", "reading", "speaking", "academic writing"]
                                .map(term => `<button type="button" data-wu-search-query="${term}">${term.replace(/\b\w/g, c => c.toUpperCase())}</button>`)
                                .join("")}
                        </div>
                        <p>Or type any word, topic, or skill in the search box.</p>
                    </div>
                `;
                return;
            }

            if (!lessons.length) {
                resultsBox.innerHTML = `
                    <div class="wu-search-empty">
                        <strong>No matching lessons yet</strong>
                        <p>Try a shorter phrase, a different spelling, or another skill.</p>
                    </div>
                `;
                return;
            }

            resultsBox.innerHTML = `
                <div class="wu-search-meta">${lessons.length}${tokens.length ? " matching" : ""} lesson suggestions</div>
                ${lessons.slice(0, 30).map(lesson => {
                    const title = lesson.topic || lesson.title || lesson.id;
                    const level = LEVEL_NAMES[lesson.level] || lesson.level || "English";
                    const skill = SKILL_NAMES[lesson.skill] || lesson.skill || "Lesson";
                    const description = lesson.objective || lesson.description ||
                        lesson.explanation || "Open this lesson to study the explanation, examples, and practice.";
                    return `
                        <button type="button" class="wu-search-result"
                                data-wu-search-lesson="${esc(lesson.id)}">
                            <strong>${esc(title)}</strong>
                            <span class="wu-search-meta">${esc(level)} \u00B7 ${esc(skill)}</span>
                            <small>${esc(String(description).slice(0, 190))}</small>
                        </button>
                    `;
                }).join("")}
            `;
        }

        function closeSearch() {
            overlay.remove();
            if (previousFocus && previousFocus.isConnected && previousFocus.focus) {
                previousFocus.focus();
            }
        }

        overlay.querySelector(".wu-search-close").addEventListener("click", closeSearch);
        overlay.addEventListener("click", event => {
            if (event.target === overlay) closeSearch();
        });

        input.addEventListener("input", renderResults);

        overlay.querySelector(".wu-search-filters").addEventListener("click", event => {
            const button = event.target.closest("[data-wu-search-skill]");
            if (!button) return;
            activeSkill = button.dataset.wuSearchSkill;
            overlay.querySelectorAll("[data-wu-search-skill]").forEach(item => {
                item.classList.toggle("active", item === button);
            });
            renderResults();
        });

        resultsBox.addEventListener("click", event => {
            const suggestion = event.target.closest("[data-wu-search-query]");
            if (suggestion) {
                input.value = suggestion.dataset.wuSearchQuery;
                renderResults();
                input.focus();
                return;
            }

            const result = event.target.closest("[data-wu-search-lesson]");
            if (!result) return;
            const lessonId = result.dataset.wuSearchLesson;
            closeSearch();
            if (typeof window.wordUpOpenCourseLesson === "function") {
                window.wordUpOpenCourseLesson(lessonId);
            } else {
                console.error("WordUp course lesson opener is not available.");
            }
        });

        input.addEventListener("keydown", event => {
            if (event.key === "Escape") closeSearch();
            if (event.key === "Enter") {
                const first = resultsBox.querySelector("[data-wu-search-lesson]");
                if (first) first.click();
            }
        });

        renderResults();
        window.setTimeout(() => input.focus(), 30);
    }

    window.wordUpOpenSearch = wuSearchOpen;

    document.addEventListener("keydown", event => {
        if (event.key !== "/" || event.ctrlKey || event.altKey || event.metaKey) return;
        const target = event.target;
        if (target && (
            target.matches("input, textarea, select") ||
            target.isContentEditable
        )) return;
        if (!document.getElementById("wuGlobalSearchOverlay")) {
            event.preventDefault();
            wuSearchOpen();
        }
    });

})();










