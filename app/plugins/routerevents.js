// This fires a window event for every route change.
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    router.beforeEach((to, from) => {
        if(window) { window.dispatchEvent(new Event("router-before-change", { cancelable: false })); }
        return true;
    });
    router.afterEach((to, from) => {
        if(window) { window.dispatchEvent(new Event("router-after-change", { cancelable: false })); }
        return true;
    });
});