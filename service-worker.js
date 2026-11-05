try {
    importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
} catch (error) {
    // Keep WordUp offline caching available if the push SDK CDN is unavailable.
    console.warn("OneSignal worker SDK could not be loaded:", error);
}

const CACHE_NAME = "wordup-v38-push-20261105";
const CORE_ASSETS = ["./","./index.html","./style.css","./script.js","./manifest.json","./wordup-gamification.css","./wordup-winter.css","./wordup-notifications.css","./wordup-notifications.js","./wordup-gamification.js","./wordup-course.js","./wordup-exams.js","./wordup-exams.css"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  event.respondWith(fetch(request).then(response => {
    if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => {}); return response; }
    return caches.match(request).then(cached => cached || response);
  }).catch(() => caches.match(request).then(cached => cached || caches.match("./index.html"))));
});