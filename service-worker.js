/* WordUp offline-first service worker.
   Keep navigation fallbacks separate from scripts, styles, and other assets. */
"use strict";

const CACHE_PREFIX = "wordup-";
const CACHE_NAME = "wordup-v39-offline-safe-20261110";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./wordup-gamification.css",
  "./wordup-winter.css",
  "./wordup-notifications.css",
  "./wordup-notifications.js",
  "./wordup-gamification.js",
  "./wordup-course.js",
  "./wordup-exams.js",
  "./wordup-exams.css"
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
        const cachedPage = await caches.match(request);
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
    const cached = await caches.match(request);
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
