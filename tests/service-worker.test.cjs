const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "service-worker.js"), "utf8");

test("offline navigation fallback is restricted to document navigations", () => {
  assert.match(source, /request\.mode\s*===\s*"navigate"/);
  assert.match(source, /caches\.match\("\.\/index\.html"\)/);
  assert.match(source, /if\s*\(request\.mode\s*===\s*"navigate"\)[\s\S]*?return;[\s\S]*?event\.respondWith/);
});

test("failed static asset requests never fall back to the homepage HTML", () => {
  const staticHandler = source.split("// Static assets are cache-first.")[1] || "";
  assert.ok(staticHandler, "static asset handler should be present");
  assert.match(staticHandler, /return\s+Response\.error\(\)/);
  assert.doesNotMatch(staticHandler, /caches\.match\("\.\/index\.html"\)/);
});

test("activation only removes old WordUp caches", () => {
  assert.match(source, /key\.startsWith\(CACHE_PREFIX\)\s*&&\s*key\s*!==\s*CACHE_NAME/);
  assert.match(source, /const CACHE_PREFIX\s*=\s*"wordup-"/);
});

test("pre-cache failures do not prevent the worker from installing", () => {
  assert.match(source, /cache\.add\(asset\)\.catch/);
  assert.match(source, /await\s+self\.skipWaiting\(\)/);
});
