const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const progressSource = fs.readFileSync(path.join(root, "v12/engine/progress-engine.js"), "utf8");
const questionSource = fs.readFileSync(path.join(root, "v12/engine/question-engine.js"), "utf8");

function progressHarness(startDate = "2026-11-02T12:00:00") {
    const store = new Map();
    let clock = new Date(startDate);
    class FakeDate extends Date {
        constructor(...args) {
            super(...(args.length ? args : [clock.getTime()]));
        }
    }
    const sandbox = {
        window: {},
        localStorage: {
            getItem: key => store.has(key) ? store.get(key) : null,
            setItem: (key, value) => store.set(key, String(value))
        },
        Date: FakeDate,
        console: { log() {}, error() {} }
    };
    vm.runInNewContext(progressSource, sandbox);
    return {
        api: sandbox.window,
        setDate(value) { clock = new Date(value); },
        read() { return JSON.parse(store.get("wordup_v12_progress") || "{}"); }
    };
}

test("lesson completion awards XP only once", () => {
    const h = progressHarness();
    h.api.wordUpCompleteLesson("lesson-1");
    h.api.wordUpCompleteLesson("lesson-1");
    assert.equal(h.api.wordUpGetProgress().xp, 10);
    assert.equal(h.api.wordUpGetCompletedLessons().length, 1);
});

test("test XP is awarded once, with one-time passing bonus", () => {
    const h = progressHarness();
    h.api.wordUpCompleteTest("test-1", 50);
    assert.equal(h.api.wordUpGetProgress().xp, 10);
    h.api.wordUpCompleteTest("test-1", 85);
    h.api.wordUpCompleteTest("test-1", 95);
    const p = h.api.wordUpGetProgress();
    assert.equal(p.xp, 30);
    assert.equal(p.tests["test-1"].attempts, 3);
    assert.equal(p.scores["test-1"], 95);
});

test("legacy completed tests do not receive duplicate rewards", () => {
    const h = progressHarness();
    h.api.wordUpSaveProgress({
        lessons: {}, tests: { "legacy-test": { completed: true, score: 80 } },
        scores: { "legacy-test": 80 }, xp: 40, streak: 2, mistakes: []
    });
    h.api.wordUpCompleteTest("legacy-test", 90);
    assert.equal(h.api.wordUpGetProgress().xp, 40);
});

test("daily streak increases on consecutive local dates and resets after a gap", () => {
    const h = progressHarness("2026-11-02T10:00:00");
    h.api.wordUpCompleteLesson("day-1");
    assert.equal(h.api.wordUpGetProgress().streak, 1);
    h.setDate("2026-11-03T10:00:00");
    h.api.wordUpCompleteLesson("day-2");
    assert.equal(h.api.wordUpGetProgress().streak, 2);
    h.setDate("2026-11-05T10:00:00");
    h.api.wordUpCompleteLesson("day-3");
    assert.equal(h.api.wordUpGetProgress().streak, 1);
});

test("same-day activity does not increase the streak", () => {
    const h = progressHarness();
    h.api.wordUpCompleteLesson("day-1");
    h.api.wordUpCompleteLesson("day-2");
    assert.equal(h.api.wordUpGetProgress().streak, 1);
});

function questionHarness() {
    const sandbox = { window: {}, console: { log() {} } };
    vm.runInNewContext(questionSource, sandbox);
    return sandbox.window;
}

test("question checker accepts option indexes and option text", () => {
    const api = questionHarness();
    const q = { options: ["First", "Second", "Third"], answer: 1 };
    assert.equal(api.wordUpCheckQuestion(q, 1), true);
    assert.equal(api.wordUpCheckQuestion(q, "Second"), true);
    assert.equal(api.wordUpCheckQuestion(q, 0), false);
});

test("question checker compares text answers case-insensitively and trims whitespace", () => {
    const api = questionHarness();
    const q = { options: ["A correct answer", "A distractor"], answer: "A correct answer" };
    assert.equal(api.wordUpCheckQuestion(q, "  a CORRECT   answer "), true);
});

test("question checker rejects missing answers and invalid indexes", () => {
    const api = questionHarness();
    const q = { options: ["A", "B"], answer: 1 };
    assert.equal(api.wordUpCheckQuestion(q, undefined), false);
    assert.equal(api.wordUpCheckQuestion(q, 5), false);
});

test("question score is calculated consistently", () => {
    const api = questionHarness();
    const questions = [
        { options: ["A", "B"], answer: 0 },
        { options: ["C", "D"], answer: "D" }
    ];
    assert.equal(api.wordUpScoreQuestions(questions, [0, "D"]), 100);
    assert.equal(api.wordUpScoreQuestions(questions, [1, "C"]), 0);
});

test("curriculum content registry has unique lesson IDs and valid assessment keys", () => {
    const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const scriptPaths = index.split('<script src="./v12/').slice(1)
        .map(part => "./v12/" + part.split('"')[0].split('?')[0]);
        const sandbox = { console: { log() {}, warn() {}, error() {} } };
    sandbox.window = sandbox;
    vm.createContext(sandbox);

    for (const src of scriptPaths) {
        const file = path.join(root, src.slice(2));
        const source = fs.readFileSync(file, "utf8");
        vm.runInContext(source, sandbox, { filename: src });
    }

    assert.equal(typeof sandbox.wordUpGetAllContent, "function", "content registry should load");
    const lessons = sandbox.wordUpGetAllContent();
    assert.ok(lessons.length > 300, "the full curriculum should be registered");
    const a1Lessons = lessons.filter(lesson => lesson.level === "a1");
    assert.ok(a1Lessons.length > 20, "A1 reading, vocabulary, writing, grammar, listening, and speaking bundles must all be registered");
    assert.ok(a1Lessons.some(lesson => lesson.skill === "listening" && lesson.transcript), "A1 listening lessons must include transcripts");
    const a1Skills = new Set(a1Lessons.map(lesson => lesson.skill));
    for (const skill of ["writing", "grammar", "vocabulary", "reading", "listening", "speaking"]) {
        assert.ok(a1Skills.has(skill), "A1 must register " + skill + " lessons");
    }
    const ids = lessons.map(lesson => lesson.id);
    assert.ok(ids.every(Boolean), "every lesson should have an ID");
    assert.equal(new Set(ids).size, ids.length, "lesson IDs must be unique");

    const audit = sandbox.wordUpContentQualityReport();
    console.log("Curriculum quality snapshot:", JSON.stringify({
        totalLessons: audit.totalLessons,
        levels: audit.levels,
        lessonsWithoutVocabulary: audit.lessonsWithoutVocabulary,
        lessonsWithoutMistakes: audit.lessonsWithoutMistakes,
        lessonsWithoutIndependentPractice: audit.lessonsWithoutIndependentPractice,
        lessonsMissingIndependentPractice: lessons.filter(lesson => !Array.isArray(lesson.independentPractice) || !lesson.independentPractice.length).map(lesson => lesson.id),
        openResponseQuestions: audit.openResponseQuestions,
        malformedAssessmentQuestions: audit.malformedAssessmentQuestions,
        lessonsWithGenericWording: audit.lessonsWithGenericWording,
        repeatedPrompts: audit.repeatedPrompts,
        repeatedPromptDetails: lessons.flatMap(lesson => ["guidedPractice", "activities", "practice", "independentPractice", "test"].flatMap(section => {
            const seen = new Set();
            const duplicates = [];
            (Array.isArray(lesson[section]) ? lesson[section] : []).forEach(item => {
                const prompt = typeof item === "string" ? item : item && (item.question || item.prompt || item.text);
                if (!prompt) return;
                const normalized = String(prompt).trim().toLowerCase();
                if (seen.has(normalized)) duplicates.push(String(prompt));
                else seen.add(normalized);
            });
            return duplicates.length ? [{ id: lesson.id, section, duplicates }] : [];
        })),
        lessonsWithCrossSectionPromptReuse: audit.lessonsWithCrossSectionPromptReuse,
        practiceTestPromptReuse: lessons.flatMap(lesson => {
            const practicePrompts = new Set((Array.isArray(lesson.practice) ? lesson.practice : []).map(item =>
                String(typeof item === "string" ? item : item && (item.question || item.prompt || item.text) || "").trim().toLowerCase()
            ).filter(Boolean));
            return (Array.isArray(lesson.test) ? lesson.test : []).flatMap(item => {
                const prompt = String(typeof item === "string" ? item : item && (item.question || item.prompt || item.text) || "").trim();
                return prompt && practicePrompts.has(prompt.toLowerCase()) ? [{ id: lesson.id, prompt }] : [];
            });
        }).slice(0, 30)
    }));
    assert.equal(audit.duplicateIds.length, 0, "curriculum must not contain duplicate IDs");
    assert.equal(audit.malformedAssessmentQuestions, 0, "assessment questions must have valid answer keys");
    assert.equal(audit.lessonsWithoutIndependentPractice, 0, "every lesson must include independent practice");
    assert.equal(audit.repeatedPrompts, 0, "a lesson must not repeat the same prompt within a section");
});


test("level and master exams have enough distinct assessment questions across available skills", () => {
    const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const scriptPaths = index.split('<script src="./v12/').slice(1)
        .map(part => "./v12/" + part.split('"')[0].split('?')[0]);
        const sandbox = {
        console: { log() {}, warn() {}, error() {} },
        document: { readyState: "loading", addEventListener() {} },
        localStorage: { getItem() { return null; }, setItem() {} }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    for (const src of scriptPaths) {
        const file = path.join(root, src.slice(2));
        vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: src });
    }
    vm.runInContext(fs.readFileSync(path.join(root, "wordup-exams.js"), "utf8"), sandbox, { filename: "wordup-exams.js" });

    assert.equal(typeof sandbox.wordUpBuildExamQuestions, "function", "exam question builder should be available");
    const levels = ["foundation", "a1", "a2", "b1", "b2", "c1", "c2", "academic"];
    const report = {};
    const allSkills = ["writing", "grammar", "vocabulary", "reading", "listening", "speaking"];
    for (const level of levels) {
        const levelLessons = sandbox.wordUpGetAllContent().filter(x => x.level === level);
        const registeredSkills = new Set(levelLessons.map(x => x.skill));
        for (const skill of allSkills) {
            assert.ok(registeredSkills.has(skill), level + " curriculum must include " + skill);
        }
        const questions = sandbox.wordUpBuildExamQuestions("level", level);
        report[level] = { count: questions.length, skills: [...new Set(questions.map(x => x.skill))] };
        assert.ok(questions.length >= 5, level + " must have at least five usable final-exam questions");
        const availableSkills = new Set(sandbox.wordUpGetAllContent().filter(x => x.level === level).map(x => x.skill));
        const examSkills = new Set(questions.map(x => x.skill));
        for (const skill of availableSkills) {
            assert.ok(examSkills.has(skill), level + " exam must represent available skill: " + skill);
        }
        const normalizeExamPrompt = value => String(value || "").trim().toLowerCase();
        for (const question of questions) {
            const lesson = levelLessons.find(item => item.id === question.lessonId);
            if (!lesson || question.type !== "choice") continue;
            const practicePrompts = new Set((lesson.practice || []).map(item =>
                normalizeExamPrompt(typeof item === "string" ? item : item && (item.question || item.prompt || item.text))
            ));
            assert.ok(!practicePrompts.has(normalizeExamPrompt(question.prompt)),
                level + " final exam must not repeat a practice prompt: " + question.prompt);
        }
    }
    const master = sandbox.wordUpBuildExamQuestions("master");
    const placement = sandbox.wordUpBuildExamQuestions("placement");
    console.log("Exam question availability:", JSON.stringify({ levels: report, master: master.length, placement: placement.length }));
    assert.ok(master.length >= 60, "master exam must have at least 60 usable questions");
    assert.ok(placement.length >= 30, "placement exam must have at least 30 usable questions");

    const textAnswer = sandbox.wordUpExamQuestionFrom(
        { question: "Choose the second option", options: ["First", "Second"], answer: " second " },
        { id: "test-text-key", topic: "Text answer key" },
        "grammar",
        0
    );
    assert.equal(textAnswer.answer, 1, "text answer keys must be normalized to the correct option index");
});

test("lesson practice continues to the next lesson rather than opening a per-lesson final assessment", () => {
    const course = fs.readFileSync(path.join(root, "wordup-course.js"), "utf8");
    assert.match(course, /wordUpCourseContinueNextLesson/);
    assert.match(course, /Next Lesson/);
    assert.doesNotMatch(course, /Continue to Final Assessment/);
    assert.ok(course.includes("SKILLS.filter(skill => getLessons(level, skill).length > 0)"));
});


test("reading exam questions always include the actual passage", () => {
    const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const scriptPaths = index.split('<script src="./v12/').slice(1)
        .map(part => "./v12/" + part.split('"')[0].split('?')[0]);
        const sandbox = {
        console: { log() {}, warn() {}, error() {} },
        document: { readyState: "loading", addEventListener() {} },
        localStorage: { getItem() { return null; }, setItem() {} }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    for (const src of scriptPaths) {
        vm.runInContext(fs.readFileSync(path.join(root, src.slice(2)), "utf8"), sandbox, { filename: src });
    }
    vm.runInContext(fs.readFileSync(path.join(root, "wordup-exams.js"), "utf8"), sandbox, { filename: "wordup-exams.js" });
    for (const level of ["foundation", "a1", "a2", "b1", "b2", "c1", "c2", "academic"]) {
        const questions = sandbox.wordUpBuildExamQuestions("level", level);
        const reading = questions.filter(q => q.skill === "reading" && q.type === "choice");
        assert.ok(reading.length > 0, level + " should include reading questions");
        for (const q of reading) assert.ok(q.passage && q.passage.trim().length > 40,
            level + " reading question must display its passage: " + q.prompt);
    }
});

test("listening choice questions have audio and placeholder distractors are excluded", () => {
    const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const scriptPaths = index.split('<script src="./v12/').slice(1)
        .map(part => "./v12/" + part.split('"')[0].split('?')[0]);
        const sandbox = {
        console: { log() {}, warn() {}, error() {} },
        document: { readyState: "loading", addEventListener() {} },
        localStorage: { getItem() { return null; }, setItem() {} }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    for (const src of scriptPaths) {
        vm.runInContext(fs.readFileSync(path.join(root, src.slice(2)), "utf8"), sandbox, { filename: src });
    }
    vm.runInContext(fs.readFileSync(path.join(root, "wordup-exams.js"), "utf8"), sandbox, { filename: "wordup-exams.js" });
    const questions = sandbox.wordUpBuildExamQuestions("master");
    const listening = questions.filter(q => q.skill === "listening" && q.type === "choice");
    for (const q of listening) assert.ok(q.audio && q.audio.trim(), "listening question must have a playable transcript");
    const banned = [/opposite position is always correct/i, /issue should not be investigated/i,
        /information proves something unrelated/i, /no conclusion can be drawn from any detail/i,
        /detail that contradicts the passage/i, /unrelated fact not mentioned/i,
        /prediction that has not been made/i, /gives no useful information/i];
    for (const q of questions.filter(q => q.type === "choice")) {
        assert.ok(!q.options.some(option => banned.some(pattern => pattern.test(option))),
            "generic placeholder distractors must not reach an exam");
    }
});

test("speaking tasks show a real target or a complete oral-response instruction and are not auto-scored", () => {
    const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const scriptPaths = index.split('<script src="./v12/').slice(1)
        .map(part => "./v12/" + part.split('"')[0].split('?')[0]);
        const sandbox = {
        console: { log() {}, warn() {}, error() {} },
        document: { readyState: "loading", addEventListener() {} },
        localStorage: { getItem() { return null; }, setItem() {} }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    for (const src of scriptPaths) {
        vm.runInContext(fs.readFileSync(path.join(root, src.slice(2)), "utf8"), sandbox, { filename: src });
    }
    vm.runInContext(fs.readFileSync(path.join(root, "wordup-exams.js"), "utf8"), sandbox, { filename: "wordup-exams.js" });
    const questions = sandbox.wordUpBuildExamQuestions("master").filter(q => q.type === "speech");
    assert.ok(questions.length > 0, "master exam should include speaking tasks");
    for (const q of questions) {
        assert.ok(q.target || /Speak for 30–45 seconds/.test(q.prompt), "speaking task must identify what to say");
        assert.equal(q.answer, null, "oral tasks must not use a hidden text answer key");
        assert.equal(sandbox.wordUpExamIsCorrect(q, "any transcript"), null, "speech must not be auto-marked as correct or incorrect");
    }
    const score = sandbox.wordUpExamScoreQuestions([
        { type: "choice", answer: 1 }, { type: "speech" }, { type: "dictation", answer: "hello" }
    ], [1, "hello there", "hello"]);
    assert.deepEqual({ correct: score.correct, total: score.total, score: score.score }, { correct: 2, total: 2, score: 100 });
});

test("index loads the comfort palette after all existing visual styles", () => {
    const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
    assert.ok(index.includes("wordup-theme.css?v=20261103-comfort-theme"));
    assert.ok(index.includes("wordup-exams.js?v=20261103-passage-oral"));
});
