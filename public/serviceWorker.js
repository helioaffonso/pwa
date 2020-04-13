self.addEventListener('install', function(event) {
    console.log('SW - Installing', event);
});
self.addEventListener('activate', function(event) {
    console.log('SW - Activate', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('SW - Fetch', event);
    event.respondWith(fetch(event.request));
});
