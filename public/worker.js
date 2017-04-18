const CACHE_NAME = "rover-data-v1";
const ROVER_NAMES = ['curiosity', 'spirit', 'opportunity'];

this.addEventListener('install', function (event) {
  console.log('install event');
  // event.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
this.addEventListener('fetch', function (event) {
  // console.log('fetch event');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  event.respondWith(fromCache(event.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  event.waitUntil(update(event.request));
});

function precache() {
  let manifestUrls = ROVER_NAMES.map((rover) => "/mars/manifest/" + rover);
  console.log(manifestUrls)
  caches.open(CACHE_NAME).then((cache) => {
    Promise.all(
      manifestUrls.map(
        (m) => fetch(m)
          .then((res) => res.json())
          .then((json) => {
            let name = json.name.toLowerCase();
            let solUrls = json.photos.map((j) => "/mars/photos/"+name+"/sol/"+j.sol);
            console.log(solUrls);
            cache.addAll(manifestUrls.concat(solUrls));
          })
      )
    )
    .catch((err) => console.log("Precache error", err))
  })
}

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching;
    });
  });
}

// open the cache, performing a network request and store the new data.
function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
