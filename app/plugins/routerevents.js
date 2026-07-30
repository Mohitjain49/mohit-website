// This manages events for every router change directly before it happens and after it happens.
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    const webData = useWebsiteDataStore();
    const scrollStore = useScrollStore();

    // Fires a window event before the route is about to change.
    // It will also cancel an autoscroll if the page is being changed.
    router.beforeEach((to, from) => {
        if(window) { window.dispatchEvent(new Event("router-before-change", { cancelable: false })); }
        if(to.path !== from.path) { scrollStore.cancelAutoscroll(); }
        return true;
    });

    // Fires a window event directly after the route has changed.
    // If the page is changed, it also closes the QR Code Popup if "openShareOnMount" is false.
    router.afterEach(async(to, from) => {
        if(window) { window.dispatchEvent(new Event("router-after-change", { cancelable: false })); }
        if(to.path === from.path) { return true; }

        await nextTick();
        await onNuxtReadyAdvanced();
        webData.closeNavMenu();

        if(webData.openShareOnMount) {
            webData.openShareOnMount = false;
            await sleep(50);
            if(webData.showSharePopupImmediate) { webData.showSharePopup = true; }
        } else {
            setQRCodePopup("quit");
        }

        // Tells the website that the navigation was good.
        return true;
    });
});