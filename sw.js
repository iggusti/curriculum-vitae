const CACHE = 'iggusti-1.6.2';

const ASSETS = [
  './',
  './index.html',
  './404.html',
  './manifest.json',
  './assets/css/fonts.css',
  './assets/css/main.css',
  './assets/vendor/aos.css',
  './assets/vendor/aos.js',
  './assets/vendor/bootstrap.min.css',
  './assets/vendor/bootstrap.min.js',
  './assets/vendor/fontawesome.css',
  './assets/vendor/jquery-3.7.1.min.js',
  './assets/vendor/now-ui-kit.js',
  './assets/vendor/popper.min.js',
  './assets/js/main.js',
  './assets/fonts/fa-brands-400.woff2',
  './assets/fonts/fa-solid-900.woff2',
  './assets/fonts/montserrat-latin-200-normal.woff2',
  './assets/fonts/montserrat-latin-400-normal.woff2',
  './assets/fonts/montserrat-latin-700-normal.woff2',
  './assets/images/icons/apple-touch-icon.png',
  './assets/images/icons/favicon.ico',
  './assets/images/icons/icon-192.png',
  './assets/images/icons/icon-512.png',
  './assets/images/icons/icon-maskable-512.png',
  './assets/images/photos/cc-bg-wadukan.webp',
  './assets/images/profile/iggusti.webp',
  './assets/images/profile/iggusti-150.webp',
  './assets/images/social/og-cover.jpg'
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
