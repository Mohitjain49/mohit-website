// This fires a window event for every route change.
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    const scrollStore = useScrollStore();

    const pagesChanging = ref(0);
    const pagesLoading = computed(() => { return (pagesChanging.value > 0); });

    router.beforeEach((to, from) => {
        if(window) { window.dispatchEvent(new Event("router-before-change", { cancelable: false })); }
        scrollStore.cancelAutoscroll();
        if(to.name !== from.name) { pagesChanging.value++; }
        return true;
    });
    router.afterEach((to, from) => {
        if(window) { window.dispatchEvent(new Event("router-after-change", { cancelable: false })); }
        if(to.name !== from.name) {
            pagesChanging.value--;
            if(pagesChanging.value < 0) { pagesChanging.value = 0; }
        }
        return true;
    });

    // This returns if a page is loading or not for the entire website to use.
    return { provide: { pagesChanging, pagesLoading }}
});