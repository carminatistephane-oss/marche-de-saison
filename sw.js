// ========================================================
// SERVICE WORKER - LE PETIT MARCHÉ DE MON ESTOMAC
// VERSION DU CACHE : v12.09 (Nouvelle Refonte Cru/Cuit & Recettes)
// ========================================================

const CACHE_NAME = 'marche-cache-v12.09';

// Fichiers vitaux à stocker pour le fonctionnement 100% hors-ligne
const URLS_A_METTRE_EN_CACHE = [
    './',
    './app.html',
    './manifest.json',
    './logo.png',
    './logo_2.jpg',
    './icon.png',
    './coeur.png',
    './favoris_02.png',
    './recommandes_02.png'
];

// 1. INSTALLATION : Téléchargement des fichiers essentiels (avec sécurité tolérante)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                URLS_A_METTRE_EN_CACHE.map(url => 
                    cache.add(url).catch(err => console.log('⚠️ Fichier ignoré au cache :', url))
                )
            );
        }).then(() => self.skipWaiting()) // Force l'activation immédiate
    );
});

// 2. ACTIVATION : Nettoyage automatique des anciens caches (v11.11, v10, etc.)
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

// 3. DISTRIBUTION (RÉSEAU D'ABORD, CACHE EN SECOURS)
self.addEventListener('fetch', (event) => {
    // Sécurité : Ignorer les requêtes non-GET ou externes non-HTTP
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .then((reponseReseau) => {
                // Si la connexion marche, on met à jour le cache
                if (reponseReseau && reponseReseau.status === 200) {
                    const copieReponse = reponseReseau.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, copieReponse);
                    });
                }
                return reponseReseau;
            })
            .catch(() => {
                // Si pas d'internet (hors-ligne/métro), on sert le cache
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