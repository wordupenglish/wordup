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
    const scriptPaths = [...index.matchAll(/<script\s+src=["'](\.\/v12\/[^"'?]+)(?:\?[^"']*)?["']/g)]
        .map(match => match[1])
        .filter(src =>
            src === "./v12/engine/content-model.js" ||
            src === "./v12/engine/fast-lesson-generator.js" ||
            src.startsWith("./v12/content/") ||
            src === "./v12/engine/content-validator.js"
        );

    const sandbox = { console: { log() {}, warn() {}, error() {} } };
    sandbox.window = sandbox;
    vm.createContext(sandbox);

    for (const src of scriptPaths) {
        const file = path.join(root, src.replace(/^\.\//, ""));
        const source = fs.readFileSync(file, "utf8");
        vm.runInContext(source, sandbox, { filename: src });
    }

    assert.equal(typeof sandbox.wordUpGetAllContent, "function", "content registry should load");
    const lessons = sandbox.wordUpGetAllContent();
    assert.ok(lessons.length > 300, "the full curriculum should be registered");
    const a1Lessons = lessons.filter(lesson => lesson.level === "a1");
    assert.ok(a1Lessons.length >= 14, "A1 grammar and listening bundles must all be registered");
    assert.ok(a1Lessons.some(lesson => lesson.skill === "listening" && lesson.transcript), "A1 listening lessons must include transcripts");
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
        lessonsWithRepeatedPrompts: lessons.filter(lesson => ["guidedPractice", "activities", "practice", "independentPractice", "test"].some(section => {
            const prompts = (Array.isArray(lesson[section]) ? lesson[section] : []).map(item =>
                typeof item === "string" ? item : item && (item.question || item.prompt || item.text)
            ).filter(Boolean).map(value => String(value).trim().toLowerCase());
            return new Set(prompts).size !== prompts.length;
        })).map(lesson => lesson.id),
        lessonsWithCrossSectionPromptReuse: audit.lessonsWithCrossSectionPromptReuse
    }));
    assert.equal(audit.duplicateIds.length, 0, "curriculum must not contain duplicate IDs");
    assert.equal(audit.malformedAssessmentQuestions, 0, "assessment questions must have valid answer keys");
    assert.equal(audit.lessonsWithoutIndependentPractice, 0, "every lesson must include independent practice");
});
