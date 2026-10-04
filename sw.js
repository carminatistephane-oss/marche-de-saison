const CACHE_NAME = 'marche-saison-cache-v7';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installation du cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes pour le mode hors-ligne
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // 1. Si on a internet : on télécharge la dernière version depuis GitHub
                // et on met le cache à jour silencieusement en arrière-plan.
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // 2. Si on est hors-ligne (en forêt ou mode avion) : 
                // on affiche la version sauvegardée dans le cache.
                return caches.match(event.request);
            })
    );
});