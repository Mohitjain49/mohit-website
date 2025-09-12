self.addEventListener('install', () => {
    console.log('[SW] Notification SW installed');
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    console.log('[SW] Notification SW activated');
});

// Listen for messages from your main app
self.addEventListener('message', event => {
    const { title, body, icon } = event.data;
    console.log(event.data);
    self.registration.showNotification(title, { body, icon });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // opens your site if clicked
    );
});
