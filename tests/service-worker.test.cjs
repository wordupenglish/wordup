const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "service-worker.js"), "utf8");

test("offline navigation fallback is restricted to document navigations", () => {
  assert.match(source, /request\.mode\s*===\s*"navigate"/);
  assert.match(source, /caches\.match\("\.\/index\.html"\)/);
  const navigationHandler = source.split('if (request.mode === "navigate")')[1]?.split("// Static assets are cache-first.")[0] || "";
  assert.match(navigationHandler, /event\.respondWith/);
  assert.match(navigationHandler, /caches\.match\("\.\/index\.html"\)/);
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

test("the offline shell pre-caches every local asset referenced by the app", () => {
  const index = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const localAssets = [...index.matchAll(/(?:src|href)=["'](\.\/[^"'?#]+)(?:\?[^"']*)?["']/g)]
    .map(match => match[1])
    .filter(asset => asset !== "./" && !asset.includes("google"));
  for (const asset of new Set(localAssets)) {
    assert.ok(source.includes('"' + asset + '"'), "offline cache is missing " + asset);
  }
});

test("pre-cached assets match versioned URLs with cache-busting query strings", () => {
  const ignoreSearchLookups = [...source.matchAll(/caches\.match\(request,\s*\{\s*ignoreSearch:\s*true\s*\}\)/g)];
  assert.equal(ignoreSearchLookups.length, 2, "both navigation and static asset lookups should ignore cache-busting query strings");
});
