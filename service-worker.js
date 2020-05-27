const CACHE_NAME = "mari-belajar-v0.0.1";
var urlsToCache = [
    "/",
    "/navbar.html",
    "/index.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/buah.html",
    "/pages/binatang.html",
    "/pages/about.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/navbar.js",
    "/images/buah/apple.png",
    "/images/buah/buah_naga.png",
    "/images/buah/jeruk.png",
    "/images/buah/kiwi.png",
    "/images/buah/mangga.png",
    "/images/buah/manggis.png",
    "/images/buah/nanas.png",
    "/images/buah/pear.png",
    "/images/buah/pisang.png",
    "/images/buah/semangka.png",
    "/images/buah/sirsak.png",
    "/images/buah/strawberry.png",
    "/images/hewan/anjing.png",
    "/images/hewan/ayam.png",
    "/images/hewan/babi.png",
    "/images/hewan/gajah.png",
    "/images/hewan/ikan.png",
    "/images/hewan/jerapah.png",
    "/images/hewan/kangguru.png",
    "/images/hewan/kucing.png",
    "/images/hewan/kuda.png",
    "/images/hewan/kupu.png",
    "/images/hewan/lebah.png",
    "/images/hewan/tupai.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/example/example_buah.png",
    "/images/example/example_hewan.png",
    "/images/account/email.png",
    "/images/account/fb.png",
    "/images/account/phone.png",
    "/images/profile.jpg",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});