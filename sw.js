const CACHE = 'iggusti-1.4.3';

const ASSETS = [
  './',
  './index.html',
  './404.html',
  './manifest.json',
  './css/main.css',
  './css/bootstrap.min.css',
  './css/fonts.css',
  './css/fontawesome.css',
  './js/core/jquery.3.7.1.min.js',
  './js/core/popper.min.js',
  './js/core/bootstrap.min.js',
  './js/now-ui-kit.js',
  './js/aos.js',
  './scripts/main.js',
  './fonts/montserrat-latin-200-normal.woff2',
  './fonts/montserrat-latin-400-normal.woff2',
  './fonts/montserrat-latin-700-normal.woff2',
  './fonts/fa-solid-900.woff2',
  './fonts/fa-brands-400.woff2',
  './images/iggusti.webp',
  './images/iggusti-150.webp',
  './images/og-cover.jpg',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/icon-maskable-512.png',
  './images/apple-touch-icon.png',
  './images/favicon.ico'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(function (cache) {
        return cache.addAll(ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key !== CACHE;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE).then(function (cache) {
              cache.put(request, copy);
            });
          }

          return response;
        })
        .catch(function () {
          return caches.match(request, { ignoreSearch: true }).then(function (cached) {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(function (cached) {
      const network = fetch(request)
        .then(function (response) {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE).then(function (cache) {
              cache.put(request, copy);
            });
          }

          return response;
        })
        .catch(function () {
          return cached;
        });

      return cached || network;
    })
  );
});
