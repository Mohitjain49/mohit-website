import type { RouterConfig } from "nuxt/schema";
import type { RouteLocationNormalizedGeneric } from "vue-router";

const QUERY_NO_SCROLL_PARAMS = ["qrdata", "qrcodeAdded", "linksRemoved"];
const QUERY_DOCUMENT_SCROLL_PARAMS = ["page", "y"];
const SCROLL_STORE_WAIT_SECONDS = 1.5;

/**
 * This function is a generic sleep function that lets a function wait before performing the next act.
 * @param ms The number of milliseconds you want the function to sleep.
 */
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(() => { resolve(null); }, ms));
}

/** This function determines if a scroll should be disabled based off a query change. */
function disableScrollOnQueryChange(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) {
    const queryChanged = (-1 != QUERY_NO_SCROLL_PARAMS.findIndex((item) => { return (to.query[item] !== from.query[item]); }));
    const differentPage = (to.path !== from.path);
    const differentHash = (to.hash !== from.hash);
    return (queryChanged && !(differentPage || differentHash));
}

/** This function determines if the next autoscroll should be based off of certain scroll params on a hosted document page. */
async function checkDocumentScrollParams(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) {
    const { $pinia } = useNuxtApp();
    const documentStore = (await import('~/stores/DocumentStore.js')).useDocumentStore($pinia);
    if(!documentStore.onDocumentRoute || documentStore.onMarkdownRoute || !documentStore.docLoaded.status) { return false; }

    const documentQueryChanged = (-1 != QUERY_DOCUMENT_SCROLL_PARAMS.findIndex((item) => { return (to.query[item] !== from.query[item]); }));
    return (documentQueryChanged && (to.path === from.path));
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

        // These are modules required from the nuxt app itself.
        const { $pinia, hooks } = useNuxtApp();

        // This waits for the page to load before triggering any scroll.
        if(differentPage) {
            await new Promise<void>((resolve, reject) => {
                hooks.hookOnce('page:loading:end', () => { resolve(); });
                sleep(1000).then(() => { resolve(); });
            });
        }

        // This function instant scrolls to the top of the page if certain conditions are met. 
        if(!hashExists && differentPage) {
            return { top: 0, left: 0, behavior: "instant" };
        } else if(differentPage) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }

        // Wait for all elements and itself to be properly rendered in.
        await nextTick();
        if(differentPage) { await new Promise<void>((resolve) => { onNuxtReady(() => { resolve(); }); }); }

        // These are two stores required for making a unique autoscroll
        const scrollStore = (await import('~/stores/ScrollStore.js')).useScrollStore($pinia);
        const documentStore = (await import('~/stores/DocumentStore.js')).useDocumentStore($pinia);

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
        } else if(await checkDocumentScrollParams(to, from)) {
            try { window.dispatchEvent(new Event("mohit-pdf-destination-scroll", { cancelable: false })); } catch(e) {}
        } else if(!differentPage) {
            try { await scrollStore.scrollToTop(false, 0); } catch(e) {}
        }
    }
} satisfies RouterConfig