// ========================================================
// SERVICE WORKER - LE PETIT MARCHÉ DE MON ESTOMAC
// VERSION DU CACHE : v17.70 (Intégration des 10 Classeurs Recettes Maison)
// ========================================================

const CACHE_NAME = 'marche-cache-v17.70';

// Fichiers vitaux à stocker pour le fonctionnement 100% hors-ligne
const urlsToCache = [
  './',
  './app.html',
  './index.html',
  './manifest.json',
  './icones/logo.png',
  './icones/icon.png',
  './icones/coeur.png',
  './icones/favoris_02.png',
  './icones/recommandes_02.png',
  './icones/icn-192.png',
  './icones/icn-512.png',

  // LE CLASSEUR OFFICIEL UNIQUE DE RECETTES MAISON
  './donnees/recettes_maison.js',
];

// 1. INSTALLATION : Téléchargement des fichiers essentiels (avec sécurité tolérante)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                urlsToCache.map(url => 
                    cache.add(url).catch(err => console.log('⚠️ Fichier ignoré au cache :', url))
                )
            );
        }).then(() => self.skipWaiting()) // Force l'activation immédiate
    );
});

// 2. ACTIVATION : Nettoyage automatique des anciens caches (v13.05, v12, etc.)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((listeCaches) => {
            return Promise.all(
                listeCaches.map((nomCache) => {
                    if (nomCache !== CACHE_NAME) {
                        console.log('🧹 Suppression du vieux cache obsolète :', nomCache);
                        return caches.delete(nomCache);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Prend le contrôle immédiat des onglets
    );
});

// 3. DISTRIBUTION (RÉSEAU D'ABORD, CACHE EN SECOURS + MISE EN CACHE AUTOMATIQUE DES PHOTOS)
self.addEventListener('fetch', (event) => {
    // Sécurité : Ignorer les requêtes non-GET ou externes non-HTTP
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .then((reponseReseau) => {
                // Dès qu'une photo de recette est vue, elle est stockée en cache hors-ligne !
                if (reponseReseau && reponseReseau.status === 200) {
                    const copieReponse = reponseReseau.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, copieReponse);
                    });
                }
                return reponseReseau;
            })
            .catch(() => {
                // Si pas d'internet (hors-ligne/métro), on sert la réserve du cache
                return caches.match(event.request).then((reponseEnCache) => {
                    if (reponseEnCache) {
                        return reponseEnCache;
                    }
                    if (event.request.headers.get('accept')?.includes('text/html')) {
                        return caches.match('./app.html');
                    }
                });
            })
    );
});