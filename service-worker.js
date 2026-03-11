const CACHE = 'magic-contacts-v3';
const BASE = '/Contact-Magic';
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/service-worker.js',
  BASE + '/icons/icon-192.png',
  BASE + '/icons/icon-512.png'
];

// Install: cache all assets, then skip waiting
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches, then claim clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first with network fallback; serve index.html for offline navigation
self.addEventListener('fetch', e => {
  // Skip cross-origin requests (analytics, fonts, APIs, etc.)
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request)
        .then(response => {
          // Dynamically cache successful same-origin responses for offline use
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE)
              .then(cache => cache.put(e.request, clone))
              .catch(() => { /* quota exceeded or other cache error – ignore */ });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: serve index.html for navigation requests
          if (e.request.mode === 'navigate') {
            return caches.match(BASE + '/index.html');
          }
          // Non-navigation resources (images, scripts) can fail silently when offline
          return Promise.reject(new Error('offline'));
        });
    })
  );
});
