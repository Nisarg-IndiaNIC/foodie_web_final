'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "a0c3c53b3cc7a0aec206e84cda0dbd6d",
"index.html": "3b7c69200dd224749ac27dabac9d3e07",
"/": "3b7c69200dd224749ac27dabac9d3e07",
"main.dart.js": "d72762acc52aab0f7eb444d4ad29a82a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "367dbedc302874a02f1bc8bee3ada67d",
"assets/AssetManifest.json": "c0276efaed3a499adc986943590aab63",
"assets/NOTICES": "c6743e520a204dac1393e0d2e6c597d1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/friees.png": "da215a1334b34733218da839914a1c9f",
"assets/assets/sayimage.png": "4b3fc6a2a6948f016825c0aaba3feb0e",
"assets/assets/mainchef.png": "fa5c0c0784a6fc2f9c9a28e1f06122f2",
"assets/assets/scroll.json": "418b1d1e3bf7143bb0ecd279f911b334",
"assets/assets/whatwe3.png": "a1314ba1b894edd9e7e5e3f14ce3cbb5",
"assets/assets/instagram.png": "77a75a5acc7b7a91a54b2f6e27b0bba7",
"assets/assets/whatwe2.png": "0533d809f9b16bd4e2fefcf1dc88e887",
"assets/assets/chef.png": "49f3f32a64c5dc6f6ad21b6e24c82a2a",
"assets/assets/girl.png": "8f4e5325396841bd0ad7aab604176f01",
"assets/assets/hamburger.png": "330b3ab81f4c8a2f95532cff7a3bb8d5",
"assets/assets/allnchef.png": "126200b2a81d34cf9c76b97f67193849",
"assets/assets/allchef.png": "13623b9deee5fe495aa2959eaa0a455f",
"assets/assets/delcom.png": "70d1cf8b877d0f49a1a4e2449dc90cda",
"assets/assets/whatwe.png": "28b329810d97aaed0c9698b55d7cb4e9",
"assets/assets/ourchefall.png": "d214db5d0ca960e4cf13c251f9f97744",
"assets/assets/rice.png": "1925df81cc4c6fee75dc4299d43651d6",
"assets/assets/ourchef3.png": "988b938171ad41935e8e5cbc17fbdfdd",
"assets/assets/ice.png": "121d347d61ff06e53bba5810bcd522b4",
"assets/assets/twitter.png": "c228a51f52d262f60b78c320bb8fb782",
"assets/assets/ourchef2.png": "25e8de4935e2a7b220fe0da531e3d899",
"assets/assets/google-plus.png": "5e2728143c7b800e33532c57500db7a6",
"assets/assets/video.png": "3499b37432ee8d3f584ac3a22ccdc3b9",
"assets/assets/footerlogo.png": "f01963fd2e809f3cc62b81db465c3433",
"assets/assets/cheftext.png": "73bd4f42b5828453c982092661d411ff",
"assets/assets/ourchef1.png": "33f4b31d8a0efb9e32e9d0573f630c3a",
"assets/assets/4.png": "9ffc68fd1bcc4281e76d36bb7ec8cf3a",
"assets/assets/pizza.png": "8dc7f7e73b8a85d01ae7dd1b0dae56d0",
"assets/assets/5.png": "9724f7b958bd3e95c520c4ee25b5707a",
"assets/assets/bur.png": "72a37a19ca32cbfaa15b314f999a6269",
"assets/assets/facebook.png": "8f5ce27564945d2c9a10ef827549a78c",
"assets/assets/2.png": "4479554343e51c3e8d7b489345b7addc",
"assets/assets/donut.png": "dd6b87a4dc15eccbad07ed153d823c82",
"assets/assets/3.png": "ddc6843b33c0ad9f3f3a27e771fc88a5",
"assets/assets/1.png": "8751b9dae7992e8232bc57f5bfc04e70",
"assets/assets/snapchat.png": "bc036f75f623254be32288b35484764b",
"assets/assets/juice.png": "f7a79f05ce80fd9e22a2670f05b2b84b",
"assets/assets/first.png": "c7031b678c0795d0601c005ecc5a22d4"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
