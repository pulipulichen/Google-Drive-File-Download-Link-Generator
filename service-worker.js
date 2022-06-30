/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/* global self, caches, Promise, fetch */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v20220630-1114';
const RUNTIME = 'runtime';

/**
 * How to build cache list?
 * 
 * 1. FilelistCreator 
 * 2. String replace
 */

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'icon.png',
  'index.html',
  'manifest.json',
  'one-drive.html',
  'script-onedrive.js',
  'script.js',
  'style.css',
  'assets/favicon/generator/android-icon-144x144.png',
  'assets/favicon/generator/android-icon-192x192.png',
  'assets/favicon/generator/android-icon-36x36.png',
  'assets/favicon/generator/android-icon-48x48.png',
  'assets/favicon/generator/android-icon-72x72.png',
  'assets/favicon/generator/android-icon-96x96.png',
  'assets/favicon/generator/apple-icon-114x114.png',
  'assets/favicon/generator/apple-icon-120x120.png',
  'assets/favicon/generator/apple-icon-144x144.png',
  'assets/favicon/generator/apple-icon-152x152.png',
  'assets/favicon/generator/apple-icon-180x180.png',
  'assets/favicon/generator/apple-icon-57x57.png',
  'assets/favicon/generator/apple-icon-60x60.png',
  'assets/favicon/generator/apple-icon-72x72.png',
  'assets/favicon/generator/apple-icon-76x76.png',
  'assets/favicon/generator/apple-icon-precomposed.png',
  'assets/favicon/generator/apple-icon.png',
  'assets/favicon/generator/favicon-16x16.png',
  'assets/favicon/generator/favicon-32x32.png',
  'assets/favicon/generator/favicon-96x96.png',
  'assets/favicon/generator/favicon.ico',
  'assets/favicon/generator/manifest.json',
  'assets/favicon/generator/ms-icon-144x144.png',
  'assets/favicon/generator/ms-icon-150x150.png',
  'assets/favicon/generator/ms-icon-310x310.png',
  'assets/favicon/generator/ms-icon-70x70.png',
  'lib/ClipboardUtils.js',
  'lib/clipboard.min.js',
  'lib/jquery.min.js',
  'lib/puli-util.clipboard.js',
  'lib/semantic-ui/semantic.min.css',
  'lib/semantic-ui/semantic.min.js',
  'lib/semantic-ui/themes/default/assets/fonts/icons.svg',
  'lib/semantic-ui/themes/default/assets/fonts/icons.ttf',
  'lib/semantic-ui/themes/default/assets/fonts/icons.woff',
  'lib/semantic-ui/themes/default/assets/fonts/icons.woff2',
  'scripts/service-worker-loader.js',
  'scripts/createEditLink.js',
  'scripts/createLink.js',
  'scripts/ga.js',
  'scripts/typeDetect.js',
  'vendors/TinyURLAPI.js',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});