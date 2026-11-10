/* WordUp offline-first service worker.
   Keep navigation fallbacks separate from scripts, styles, and other assets. */
"use strict";

const CACHE_PREFIX = "wordup-";
const CACHE_NAME = "wordup-v40-full-curriculum-offline-20261110";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon.svg",
  "./style.css",
  "./wordup-notifications.css",
  "./wordup-course.css",
  "./wordup-exams.css",
  "./script.js",
  "./v12/engine/content-model.js",
  "./v12/engine/fast-lesson-generator.js",
  "./v12/content/lesson-schema.js",
  "./v12/engine/question-engine.js",
  "./v12/content/levels/foundation.js",
  "./v12/content/generated/foundation-lessons.js",
  "./v12/content/generated/foundation-writing-2.js",
  "./v12/content/generated/foundation-writing-3.js",
  "./v12/content/generated/foundation-writing-4.js",
  "./v12/content/generated/foundation-grammar-1.js",
  "./v12/content/generated/foundation-grammar-2.js",
  "./v12/content/generated/foundation-grammar-3.js",
  "./v12/content/generated/foundation-grammar-4.js",
  "./v12/content/generated/foundation-vocabulary-1.js",
  "./v12/content/generated/foundation-vocabulary-2.js",
  "./v12/content/generated/foundation-vocabulary-3.js",
  "./v12/content/generated/foundation-vocabulary-4.js",
  "./v12/content/generated/foundation-reading-1.js",
  "./v12/content/generated/foundation-reading-2.js",
  "./v12/content/generated/foundation-listening-1.js",
  "./v12/content/generated/foundation-listening-2.js",
  "./v12/content/levels/a1.js",
  "./v12/content/generated/a1-grammar-1.js",
  "./v12/content/generated/a1-grammar-2.js",
  "./v12/content/generated/a1-listening-1.js",
  "./v12/content/generated/a1-listening-2.js",
  "./v12/content/generated/a1-reading-1.js",
  "./v12/content/generated/a1-reading-2.js",
  "./v12/content/generated/a1-vocabulary-1.js",
  "./v12/content/generated/a1-vocabulary-2.js",
  "./v12/content/generated/a1-vocabulary-3.js",
  "./v12/content/generated/a1-writing-1.js",
  "./v12/content/levels/a2.js",
  "./v12/content/levels/b1.js",
  "./v12/content/generated/b1-lessons.js",
  "./v12/content/levels/b2.js",
  "./v12/content/levels/c1.js",
  "./v12/content/levels/c2.js",
  "./v12/content/levels/academic.js",
  "./v12/content/generated/b2-complete-lessons.js",
  "./v12/content/generated/c1-complete-lessons.js",
  "./v12/content/generated/c2-complete-lessons.js",
  "./v12/content/generated/academic-complete-lessons.js",
  "./v12/curriculum/master-map.js",
  "./v12/content/generated/a2-lessons.js",
  "./v12/content/generated/a1-speaking-1.js",
  "./v12/content/generated/foundation-speaking-1.js",
  "./v12/content/generated/a2-speaking-1.js",
  "./v12/content/content-registry.js",
  "./v12/engine/progress-engine.js",
  "./v12/engine/curriculum-expansion.js",
  "./v12/engine/content-validator.js",
  "./v12/engine/v12-runtime.js",
  "./wordup-course.js",
  "./wordup-exams.js",
  "./wordup-gamification.css",
  "./wordup-gamification.js",
  "./wordup-winter.css",
  "./wordup-notifications.js"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // One missing optional asset must not prevent the worker from installing.
    await Promise.all(CORE_ASSETS.map(asset =>
      cache.add(asset).catch(error => {
        console.warn("WordUp could not pre-cache:", asset, error);
      })
    ));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Do not delete unrelated applications' caches on a shared origin.
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        const cachedPage = await caches.match(request, { ignoreSearch: true });
        if (cachedPage) return cachedPage;
        const homePage = await caches.match("./index.html");
        return homePage || Response.error();
      }
    })());
    return;
  }

  // Static assets are cache-first. Never return index.html for a missing
  // JavaScript, CSS, JSON, image, or font request.
  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
