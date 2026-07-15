import type { RouterConfig } from "nuxt/schema";
import type { RouteLocation } from "vue-router";

const QUERY_NO_SCROLL_PARAMS = ["qrdata", "qrcodeAdded", "linksRemoved"];
const SCROLL_STORE_WAIT_SECONDS = 1.5;

/** This function determines if a scroll should be disabled based off a query change. */
function disableScrollOnQueryChange(to: RouteLocation, from: RouteLocation) {
    const queryChanged = (-1 != QUERY_NO_SCROLL_PARAMS.findIndex((item) => { return (to.query[item] !== from.query[item]); }));
    const differentPage = (to.path !== from.path);
    const differentHash = (to.hash !== from.hash);
    return (queryChanged && !(differentPage || differentHash));
}

// This accounts for the majority of all auto-scrolling functionality across the website.
// Anytime the route changes, this function runs and has the app maually scroll to the next section.
export default {
    async scrollBehavior(to, from, savedPosition) {
        // console.log({ to, from, savedPosition });
        window.history.scrollRestoration = "manual";

        // Initialize Stores, Variables, and Conditions.
        const hash = to.hash.substring(1);
        const hashExists = (hash.length > 0);
        const differentPage = (to.path !== from.path);

        const { $pinia, hooks } = useNuxtApp();
        const scrollStore = useScrollStore($pinia);
        const documentStore = useDocumentStore($pinia);

        // This waits for the page to load before triggering any scroll.
        await new Promise<void>((resolve, reject) => {
            hooks.hookOnce('page:loading:end', () => { resolve(); });
            sleep(300).then(() => { resolve(); });
        });

        // This function instant scrolls to the top of the page if certain conditions are met. 
        if(!hashExists && differentPage) {
            return { top: 0, left: 0, behavior: "instant" };
        } else if(differentPage) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }

        // Wait for all elements and itself to be properly rendered in.
        await nextTick();
        if(differentPage) { await onNuxtReadyAdvanced(); }

        /** An array of conditions where if one is true, no smooth auto-scroll takes place. */
        const NO_SCROLL_CONDITIONS = [
            scrollStore.isAutoScrolling,
            (documentStore.onDocumentRoute && !documentStore.onMarkdownRoute && !documentStore.docLoaded.status),
            disableScrollOnQueryChange(to, from)
        ];

        // Checks the conditions and waits for the scroll store to be mounted.
        if(-1 != NO_SCROLL_CONDITIONS.findIndex((item) => { return item; })) { return; }
        var secondsScrollStoreNotMounted = 0;

        while(!scrollStore.mounted && secondsScrollStoreNotMounted < SCROLL_STORE_WAIT_SECONDS) {
            await sleep(50);
            secondsScrollStoreNotMounted += 0.05;
        }

        // If the scroll store takes too long to mount, the function stops.
        // Smooth scrolls to a section if there is a hash, else it smooth scrolls to the top of the page.
        if(!scrollStore.mounted) {
            return false;
        } else if(hashExists) {
            try { await scrollStore.scrollToId(hash, 0, 0); } catch(e) {}
        } else if(!differentPage) {
            try { await scrollStore.scrollToTop(false, 0); } catch(e) {}
        }
    }
} satisfies RouterConfig