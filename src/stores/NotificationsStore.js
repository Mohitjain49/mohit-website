export const useNotificationsStore = defineStore("notifications-store", () => {
    const available = ref(false);
    const swAvailable = ref(false);
    const permissionStatus = ref("default");

    /**
     * At the start of the application, this will check if the Notifications API exists and request Notifications.
     */
    function requestPermission() {
        swAvailable.value = ("serviceWorker" in navigator);
        if(!swAvailable.value || "") { return; }

        navigator.serviceWorker.register("/notificationsSW.js").then((reg) => {
            console.log("Service Worker Registered:", reg);
            available.value = ("Notification" in window);
            if(!available.value) { return; }

            Notification.requestPermission().then(permission => {
                permissionStatus.value = permission;
                console.log("Permission Status: " + permissionStatus.value);
                setTimeout(() => { sendNewMessage() }, 2000)

                navigator.serviceWorker.ready.then((registration) => {
                    console.log("Hello")
                    registration.showNotification("Vibration Sample", {
                        body: "Buzz! Buzz!",
                    });
                });
            });
        });
    }

    function sendNewMessage(title = "Test", body = "This is a test message") {
        if(!navigator.serviceWorker.controller) { console.log("hi"); return; }
        console.log("hello")
        navigator.serviceWorker.controller.postMessage({ title, body, icon: '/static-icons/Personal_Icon_Expanded_Rounded.png' });
    }

    return { available, permissionStatus, requestPermission }
});