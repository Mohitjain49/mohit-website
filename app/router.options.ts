import type { RouterConfig } from "nuxt/schema";

// This accounts for any url changes not triggered by the website itself, 
// such as clicking on the browser back and forward buttons.
export default {
    async scrollBehavior(to, from, savedPosition) {
        // console.log({ to, from, savedPosition });
        if(to.fullPath === from.fullPath) { return false; }
        window.history.scrollRestoration = "manual";

        const hash = to.hash.substring(1);
        const hashExists = (hash.length > 0);
        const differentPage = (to.name !== from.name);

        if(!hashExists && differentPage) {
            return { top: 0, left: 0, behavior: "instant" };
        } else if(differentPage) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }

        const { $pinia } = useNuxtApp();
        const scrollStore = useScrollStore($pinia);

        await nextTick();
        await onNuxtReadyAdvanced();

        const NO_SCROLL_CONDITIONS = [
            !hashExists, scrollStore.isAutoScrolling,
            (JSON.stringify(to.query) !== JSON.stringify(from.query))
        ]

        if(-1 != NO_SCROLL_CONDITIONS.findIndex((item) => { return item; })) { return; }
        while(!scrollStore.mounted) { await sleep(50); }
        try { await goToPageSection(hash, 0, 0); } catch(e) {}
    }
} satisfies RouterConfig