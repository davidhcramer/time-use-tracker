const VERSION = "tenths-v4";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate for the app shell and fonts; everything else goes to the network.
// Shell revalidation bypasses the HTTP cache (GH Pages max-age=600 would otherwise
// let the "background refresh" re-store the stale copy).
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const isShell = url.origin === location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!isShell && !isFont) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(e.request);
      const req = isShell ? new Request(e.request.url, { cache: "no-cache" }) : e.request;
      const fetched = fetch(req)
        .then((res) => {
          if (res && res.status === 200) cache.put(e.request, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
