// public/sw.js
/// <reference lib="webworker" />

/** @type {ServiceWorkerGlobalScope} */
const swSelf = self;

// When installed, The service worker immediately starts acting to delete all caches.
swSelf.addEventListener('install', (e) => { swSelf.skipWaiting(); });
swSelf.addEventListener('activate', (e) => {
    e.waitUntil((async() => {
        await swSelf.registration.unregister();
        const clients = await swSelf.clients.matchAll();

        clients.forEach((client) => {
            if(client instanceof WindowClient) { client.navigate(client.url); }
        });

        const cacheNames = await swSelf.caches.keys();
        await Promise.all(cacheNames.map((cacheName) => { return swSelf.caches.delete(cacheName); }));
    })());
});