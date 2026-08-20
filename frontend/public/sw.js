// EcoMargin PWA — Enterprise Service Worker
// public/sw.js

const CACHE_NAME = 'ecomargin-cache-v4';
const STATIC_ASSETS = [
  '/offline.html',
  '/favicon.ico',
  '/favicon.png',
  '/site.webmanifest'
];

// Install: Cache static fallback assets only (DO NOT pre-cache index.html or hashed JS/CSS bundles)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Purge older cache storage versions (e.g. ecomargin-cache-v3)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Interceptor
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip caching Cloudinary, external APIs, and images to prevent stale media
  if (url.origin !== self.location.origin || event.request.destination === 'image') {
    return;
  }

  // 1. Navigation / HTML Requests: Use Network-First strategy
  // Ensures clients ALWAYS fetch the fresh index.html pointing to current hashed JS/CSS bundles
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // If device is offline, fall back to cached document or offline fallback
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // 2. Static / Hashed Assets: Cache-First with Network Fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Cache successful asset responses
          if (networkResponse && networkResponse.status === 200 && event.request.url.includes('/assets/')) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return Promise.reject('offline');
        });
    })
  );
});

// Listen for update messages from parent page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
