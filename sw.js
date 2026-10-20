// ========================================================
// SERVICE WORKER - LE PETIT MARCHÉ DE MON ESTOMAC
// VERSION DU CACHE : v11.10 (À incrémenter à chaque mise à jour !)
// ========================================================

const CACHE_NAME = 'marche-cache-v11.10';

// Fichiers vitaux à stocker pour que l'app fonctionne 100% hors-ligne
const URLS_A_METTRE_EN_CACHE = [
    './',
    './index.html',
    './app.html',
    './manifest.json',
    './logo.png',
    './icon.png'
];

// 1. INSTALLATION : Téléchargement des fichiers essentiels
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_A_METTRE_EN_CACHE);
        }).then(() => self.skipWaiting()) // Force l'activation immédiate sans attendre
    );
});

// 2. ACTIVATION : Nettoyage automatique des vieux caches obsolètes (v10.0, v8, etc.)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((listeCaches) => {
            return Promise.all(
                listeCaches.map((nomCache) => {
                    // Si un cache ne s'appelle pas 'marche-cache-v10.5', on le supprime !
                    if (nomCache !== CACHE_NAME) {
                        console.log('🧹 Suppression de l\'ancien cache obsolète :', nomCache);
                        return caches.delete(nomCache);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Prend le contrôle immédiat de tous les onglets
    );
});

// 3. DISTRIBUTION (STRATÉGIE "RÉSEAU D'ABORD, CACHE EN SECOURS") :
// Tente de récupérer la version la plus fraîche sur internet, 
// et bascule automatiquement sur le cache si on est hors-ligne / dans le métro !
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((reponseReseau) => {
                // Si la connexion marche, on met à jour le cache à la volée
                if (reponseReseau && reponseReseau.status === 200) {
                    const copieReponse = reponseReseau.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, copieReponse);
                    });
                }
                return reponseReseau;
            })
            .catch(() => {
                // Si pas d'internet (mode avion/hors-ligne), on sert les fichiers du cache
                return caches.match(event.request).then((reponseEnCache) => {
                    if (reponseEnCache) {
                        return reponseEnCache;
                    }
                    // Si l'utilisateur demande une page HTML hors-ligne, on lui ouvre le marché
                    if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('./app.html');
                    }
                });
            })
    );
});