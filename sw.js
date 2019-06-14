const cachedName = "SWD | Designs"
const staticAssets = [
    './',
    './index.html',
    './css/bootstrap.css',
    './css/style.css',
    './js/jquery.js',
    './js.bootstrap.js',
    './js/main.js',
    './js/popper.js',
    './images/logo2.png',
    './images/bg4.jpg',
    './images/bg9.jpg',
    './images/bg2.jpg',
    './images/pic1.jpg',
    './images/img4.jpg',
    './images/img5.png',
    './images/img01.jpg',
    './images/img6.jpg',
    './images/img4.jpg',
    './images/img8.jpg'
]

self.addEventListener('install', event => {

    event.waitUntil(

        caches.open(cachedName)
            .then(function (cache) {

                console.log('[ServiceWorker] Caching app shell');

                return cache.addAll(staticAssets);

            })

    );

})

self.addEventListener('fetch', event => {

    const req = event.request;

    const url = new URL(req.url);

    if (url.origin === location.origin) {

        event.respondWith(cacheFirst(req))

    } else {

        event.respondWith(networkFirst(req))

    }
})

async function cacheFirst(req) {

    const cacheResponse = await caches.match(req);

    return cacheResponse || fetch(req);
}

async function networkFirst(req) {

    const cache = await caches.open(cachedName);

    try {

        const res = await fetch(req);

        cache.put(req, res.clone())

        return res

    } catch (error) {

        return await cache.match(req)

    }
}