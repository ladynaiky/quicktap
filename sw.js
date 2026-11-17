/*
 * QuickTap TPV — service worker
 * Permite abrir la app sin conexión y la deja instalable.
 *
 * Al publicar una versión nueva de index.html, cambia CACHE_VERSION
 * (por ejemplo, de 'quicktap-v2' a 'quicktap-v3') para que todos los dispositivos la reciban.
 */
const CACHE_VERSION = 'quicktap-v2';
const FONT_CACHE = 'quicktap-fonts-v1';

const APP_SHELL = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/maskable-512.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-32.png',
    './icons/favicon.svg',
    './fonts/qt-sans-sc-medium.woff',
    './fonts/qt-sans-sc-bold.woff'
];

// Instalación: guarda la app completa en la caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

// Activación: borra cachés de versiones anteriores (las fuentes se conservan)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key !== CACHE_VERSION && key !== FONT_CACHE)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Fuentes e iconos de Google Fonts: se sirven de la caché y se actualizan en segundo plano
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
        return;
    }

    // Solo gestionamos archivos de la propia app
    if (url.origin !== self.location.origin) return;

    // Página principal: primero la red (para recibir actualizaciones); sin conexión, la copia guardada
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    // Iconos, fuente china y manifiesto: primero la caché
    event.respondWith(cacheFirst(request));
});

async function networkFirst(request) {
    const cache = await caches.open(CACHE_VERSION);
    try {
        const response = await fetch(request);
        if (response && response.ok) {
            cache.put('./index.html', response.clone());
        }
        return response;
    } catch (error) {
        return (await cache.match(request, { ignoreSearch: true }))
            || (await cache.match('./index.html'))
            || (await cache.match('./'))
            || Response.error();
    }
}

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    const network = fetch(request)
        .then((response) => {
            if (response && (response.ok || response.type === 'opaque')) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached || Response.error());
    return cached || network;
}
