// ATTENTION : À chaque fois que tu modifies ton code HTML/CSS/JS, 
// tu DOIS changer ce nom (ex: passer à 'r6-carnet-v6' puis v7, etc.)
// Sinon, les téléphones garderont l'ancienne version en mémoire !
const CACHE_NAME = 'r6-carnet-v44se.js'; 

// On ajoute les icônes locales pour qu'elles soient dispo hors-ligne
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icn-192.png',
  './icn-512.png'
];

// 1. Étape d'installation : On télécharge tout et on met en cache
self.addEventListener('install', event => {
  self.skipWaiting(); // Force le nouveau Service Worker à s'activer immédiatement
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Étape d'activation : TRÈS IMPORTANT pour nettoyer le passé
// Supprime les vieux caches (ex: supprime la v4 quand la v5 est installée)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Ancien cache supprimé :', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Étape d'utilisation (Fetch) : On sert le hors-ligne
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si on a le fichier en cache, on le donne. Sinon, on va le chercher sur internet.
      return response || fetch(event.request);
    })
  );
});