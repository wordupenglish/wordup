const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
const dateHelpers = source.match(/function wordUpLegacyLocalDateKey[\s\S]*?(?=function save\()/)?.[0];
const saveFunction = source.match(/function save\(\)\s*\{[\s\S]*?\n\}/)?.[0];
const streakFunction = source.match(/function updateStreak\(\)\s*\{[\s\S]*?\n\}/)?.[0];

assert.ok(dateHelpers && saveFunction && streakFunction, "legacy progress helpers should be present");

test("legacy date keys use the browser's local calendar date", () => {
  const sandbox = { Date };
  vm.runInNewContext(dateHelpers, sandbox);
  const localMidnight = new Date(2026, 10, 10, 0, 15);
  assert.equal(sandbox.wordUpLegacyLocalDateKey(localMidnight), "2026-11-10");
});

test("calendar-day arithmetic is stable across month and year boundaries", () => {
  const sandbox = { Date };
  vm.runInNewContext(dateHelpers, sandbox);
  const previous = sandbox.wordUpLegacyCalendarDayNumber("2026-12-31");
  const next = sandbox.wordUpLegacyCalendarDayNumber("2027-01-01");
  assert.equal(next - previous, 1);
  assert.ok(Number.isNaN(sandbox.wordUpLegacyCalendarDayNumber("not-a-date")));
});

test("streaks advance using local calendar dates rather than UTC dates", () => {
  class LocalDate extends Date {
    constructor() { super("2026-11-09T20:00:00.000Z"); }
    getFullYear() { return 2026; }
    getMonth() { return 10; }
    getDate() { return 10; }
  }
  const sandbox = { Date: LocalDate, state: { streak: 3, lastStudy: "2026-11-09" } };
  vm.runInNewContext(dateHelpers + "\n" + streakFunction, sandbox);
  sandbox.updateStreak();
  assert.equal(sandbox.state.streak, 4);
  assert.equal(sandbox.state.lastStudy, "2026-11-10");
});

test("a backwards device-clock change does not erase a streak", () => {
  class LocalDate extends Date {
    constructor() { super("2026-11-10T12:00:00.000Z"); }
    getFullYear() { return 2026; }
    getMonth() { return 10; }
    getDate() { return 9; }
  }
  const sandbox = { Date: LocalDate, state: { streak: 5, lastStudy: "2026-11-10" } };
  vm.runInNewContext(dateHelpers + "\n" + streakFunction, sandbox);
  sandbox.updateStreak();
  assert.equal(sandbox.state.streak, 5);
  assert.equal(sandbox.state.lastStudy, "2026-11-10");
});

test("storage quota failures are caught without crashing the app", () => {
  let refreshed = 0;
  const sandbox = {
    STORAGE_KEY: "wordUpV8State",
    state: { xp: 10 },
    localStorage: { setItem() { throw new Error("QuotaExceededError"); } },
    updateStats() { refreshed += 1; },
    console: { error() {} }
  };
  vm.runInNewContext(saveFunction, sandbox);
  assert.equal(sandbox.save(), false);
  assert.equal(refreshed, 1);
});

test("successful saves return true and refresh the dashboard", () => {
  let stored = null;
  let refreshed = 0;
  const sandbox = {
    STORAGE_KEY: "wordUpV8State",
    state: { xp: 42 },
    localStorage: { setItem(key, value) { stored = [key, value]; } },
    updateStats() { refreshed += 1; },
    console: { error() {} }
  };
  vm.runInNewContext(saveFunction, sandbox);
  assert.equal(sandbox.save(), true);
  assert.equal(stored[0], "wordUpV8State");
  assert.equal(JSON.parse(stored[1]).xp, 42);
  assert.equal(refreshed, 1);
});
