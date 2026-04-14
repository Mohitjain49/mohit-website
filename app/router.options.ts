import type { RouterConfig } from "nuxt/schema";

// This accounts for any url changes not triggered by the website itself, 
// such as clicking on the browser back and forward buttons.
export default {
    async scrollBehavior(to, from, savedPosition) {
        const { $pinia } = useNuxtApp();
        const scrollStore = useScrollStore($pinia);
        const queryChanged = (JSON.stringify(to.query) !== JSON.stringify(from.query));

        await sleep(50);
        if(scrollStore.isAutoScrolling || queryChanged) { return; }
        const hash = to.hash;

        if(hash.length > 0) {
            try { goToPageSection(hash.substring(1), 0, 0) } catch(e) {}
        } else if(to.name === from.name) {
            scrollToTop(false, 0);
        }
    }
} satisfies RouterConfig