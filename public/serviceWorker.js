self.addEventListener('install', function(event) {
    console.log('SW - Installing ', event);
    event.waitUntil(
        caches.open('statics')
            .then(function (cache){
                console.log('SW - Precaching');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/material.min.js',
                    '/src/js/fetch.js',
                    '/src/js/promise.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/css/help.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ]);

            })
        )
});
self.addEventListener('activate', function(event) {
    console.log('SW - Activate', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('SW - Fetch', event);
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }else{
                    return fetch(event.request)
                            .then(function(res){
                                return caches.open('dynamic')
                                    .then(function(cache){
                                        cache.put(event.request.url, res.clone());
                                        return res;
                                    })
                            });
                }
            })
        );
});
