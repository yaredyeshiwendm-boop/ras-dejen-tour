const CACHE_NAME = "ras-dejen-tour-v2";

const APP_FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_FILES)
    )
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  // Always get the latest JavaScript and HTML.
  if (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === "/app.js"
  ) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request)
      )
    );

    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
