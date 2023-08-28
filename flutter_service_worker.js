'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "android-chrome-192x192.png": "0e5e308790266f4694625a9107a15c5e",
"android-chrome-512x512.png": "e0fa1a296ff6a45d0594c3f73009d86c",
"apple-touch-icon.png": "3b115c94cef9431a09b95178f24351a5",
"assets/AssetManifest.json": "8ea65d29ff8af5e38ab3d9afafa164b0",
"assets/assets/fonts/Lato-Black.ttf": "d83ab24f5cf2be8b7a9873dd64f6060a",
"assets/assets/fonts/Lato-Bold.ttf": "24b516c266d7341c954cb2918f1c8f38",
"assets/assets/fonts/Lato-Regular.ttf": "122dd68d69fe9587e062d20d9ff5de2a",
"assets/assets/images/banner.png": "5f3ca49706055342e92708c7dd31849f",
"assets/assets/images/color-sharp.png": "d64094774a77a02c2c22356681131cb8",
"assets/assets/images/color-sharp2.png": "42c4dbf649597b4d4ceaf4c9792de60a",
"assets/assets/images/footer-bg.png": "e9228c17c13a87653f1b8ed01a3ff306",
"assets/assets/images/Layer%25201.png": "aee78b4d04f984e98cb283c50b5f8e26",
"assets/assets/images/logo.png": "481d4d4d526e53c36841c5dc955949d1",
"assets/assets/images/me.png": "27a0cb26d49f4ccc705b8a50ffe836ef",
"assets/assets/images/project_images/eCommerce.png": "532c133c4dd865ebe00d264c1fdc1d61",
"assets/assets/images/skill_icons/api.png": "a467aeeba2348740ef9845e11df8ddd8",
"assets/assets/images/skill_icons/db.png": "09e3ec53a48793180bf687ad588a8203",
"assets/assets/images/skill_icons/figma.png": "9bc61f2ebf5760f373ee359f646b5035",
"assets/assets/images/skill_icons/firebase.png": "4638e958d168b5f2e48ad2efb98f7032",
"assets/assets/images/skill_icons/flutter.png": "ddad06e437fc2d89d6a609efb2a5aee9",
"assets/assets/images/skill_icons/postman.png": "657dfc10a0c5616efad5764167483d45",
"assets/assets/images/skill_icons/responsive.png": "387b09b965ecded692ea0859f11a2741",
"assets/assets/images/social_icons/email.svg": "e2391aa5f68260f27366e2a06ac7660a",
"assets/assets/images/social_icons/github.svg": "0351d263b7c712b841d10cc7c6e61014",
"assets/assets/images/social_icons/linkedin.svg": "7f14fbc328c92caee58f92163eb4f51f",
"assets/FontManifest.json": "00beca3004f7edf9f925ec45f3bc46a6",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "85fe3fa1ba11197da2874b14a5d8584c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "2ad5fabd6a36a6deff087b8edfd0c1f8",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon-16x16.png": "f7f1b147a2a8e4f09da9c513cb01401a",
"favicon-32x32.png": "fe4b758babaeb8e5e2bdbcfba85ce15c",
"favicon.ico": "4cd6386293ed83b080bbd8a1ae5c67e8",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "8ae00b472ec3937a5bee52055d6bc8b4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "d608ca34781946ddee32259f3b96eb5b",
"/": "d608ca34781946ddee32259f3b96eb5b",
"main.dart.js": "80223b830e2b05a6676b71ec43673ec6",
"manifest.json": "ffaa0475e83ddb35d468303d3b1075d3",
"version.json": "dfa7d0ef13fc852513466093b6539970"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
