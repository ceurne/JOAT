// The test copy's own worker (scope test/). Without it the web app's worker answers for test/ too, with the copy it
// saw last time. This one keeps nothing: always the newest test version (unchanged files come back as "not modified").
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => { if(e.request.method !== 'GET') return; e.respondWith(fetch(e.request, { cache: 'no-cache' })); });
