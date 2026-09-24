/* Moja Droga — Service Worker (auto-update, offline) */
const CACHE = 'moja-droga-v19';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/state.js',
  './js/islam-data.js',
  './js/islam.js',
  './js/eng-data.js',
  './js/eng.js',
  './js/progress.js',
  './js/features.js',
  './js/app.js',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  if (url.origin === location.origin) {
    /* Network-first: po wrzuceniu nowej wersji na GitHub aplikacja
       pobierze świeże pliki automatycznie; offline pada z powrotem do cache. */
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(r => r || caches.match('./index.html'))
        )
    );
  } else {
    /* Zewnętrzne zasoby (np. Google Fonts): cache-first. */
    e.respondWith(
      caches.match(e.request).then(r =>
        r ||
        fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
      )
    );
  }
});
