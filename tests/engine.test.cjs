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
