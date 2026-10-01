// JOAT offline cache. The game (page, atlas pages, icons) is stored on the first visit; music is stored the first time
// it plays. The game opens from the cache straight away; a newer version is fetched in the background and is there
// the next time the app starts.
const CACHE = 'joat-v146-5ea9e548';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'atlas/p0.png', 'atlas/p1.png', 'atlas/p10.png', 'atlas/p11.png', 'atlas/p12.png', 'atlas/p13.png', 'atlas/p14.png', 'atlas/p15.png', 'atlas/p16.png', 'atlas/p17.png', 'atlas/p2.png', 'atlas/p3.png', 'atlas/p4.png', 'atlas/p5.png', 'atlas/p6.png', 'atlas/p7.png', 'atlas/p8.png', 'atlas/p9.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin || e.request.headers.has('range')) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if(r && r.ok && r.status === 200) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
