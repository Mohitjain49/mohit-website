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
    router.afterEach(async(to, from) => {
        if(window) { window.dispatchEvent(new Event("router-after-change", { cancelable: false })); }
        if(to.path !== from.path) { webData.closeNavMenu(); }
        return true;
    });
});