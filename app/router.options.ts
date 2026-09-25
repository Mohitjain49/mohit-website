import type { RouterConfig } from "nuxt/schema";
import type { RouteLocationNormalizedGeneric } from "vue-router";

const QUERY_NO_SCROLL_PARAMS = ["qrdata", "qrcodeAdded", "linksRemoved"];
const QUERY_DOCUMENT_SCROLL_PARAMS = ["page", "y"];
const TASKS_PENDING_WAIT_SECONDS = 1.5;

/** If true, a call to the scrol behavior function is waiting for the page:finish hook to be resolved. */
const pageFinishHookRunning = ref(false);

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
function checkDocumentScrollParams(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric, documentStore: any) {
    if(!documentStore.onDocumentRoute || documentStore.onMarkdownRoute || !documentStore.docLoaded.status) { return false; }
    const documentQueryChanged = (-1 != QUERY_DOCUMENT_SCROLL_PARAMS.findIndex((item) => { return (to.query[item] !== undefined); }));
    return (documentQueryChanged && (to.path === from.path));
}

// This accounts for the majority of all auto-scrolling functionality across the website.
// Anytime the route changes, this function runs and has the app maually scroll to the next section.
export default {
    async scrollBehavior(to, from, savedPosition) {
        try {
            // console.log({ to, from, savedPosition });
            if(!import.meta.client) { return (savedPosition || { top: 0, left: 0, behavior: "instant" }); }
            window.history.scrollRestoration = "manual";

            // Initialize Stores, Variables, and Conditions.
            const hash = to.hash.substring(1);
            const hashExists = (hash.length > 0);
            const differentPage = (to.path !== from.path);

            // These are modules required from the nuxt app itself.
            const { $pinia, hooks } = useNuxtApp();

            // This waits for the new webpage to load before instantly scrolling to the top of that webpage.
            if(differentPage) {
                await new Promise<String>((resolve, reject) => {
                    pageFinishHookRunning.value = true;
                    hooks.hookOnce('page:finish', () => { resolve("finished"); });
                    sleep(1000).then(() => { resolve("timeout"); });
                });

                pageFinishHookRunning.value = false;
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }

            var secondsTasksPending = 0;
            while(pageFinishHookRunning.value && secondsTasksPending < TASKS_PENDING_WAIT_SECONDS) {
                await sleep(50);
                secondsTasksPending += 0.05;
            }

            // If the page:finish hook is still running on one call of this function, this stops this call of the function.
            if(pageFinishHookRunning.value) { return false; }

            // Wait for all elements and itself to be properly rendered in.
            await nextTick();
            await new Promise<void>((resolve) => { onNuxtReady(() => { resolve(); }); });

            // These are two stores required for making a unique autoscroll
            const scrollStore = (await import('~/stores/ScrollStore.js')).useScrollStore($pinia);
            const documentStore = (await import('~/stores/DocumentStore.js')).useDocumentStore($pinia);

            /** An array of conditions where if one is true, no smooth auto-scroll takes place. */
            const NO_SCROLL_CONDITIONS = [
                (documentStore.onDocumentRoute && !documentStore.onMarkdownRoute && !documentStore.docLoaded.status),
                disableScrollOnQueryChange(to, from)
            ];

            // Checks the conditions and waits for the scroll store to be mounted.
            if(-1 != NO_SCROLL_CONDITIONS.findIndex((item) => { return item; })) { return false; }
            secondsTasksPending = 0;

            while(!scrollStore.mounted && secondsTasksPending < TASKS_PENDING_WAIT_SECONDS) {
                await sleep(50);
                secondsTasksPending += 0.05;
            }

            // If the scroll store is not mounted yet, this function does not do anything.
            if(!scrollStore.mounted) { return false; }

            // This function cancels any ongoing autoscroll.
            if(scrollStore.isAutoScrolling) { scrollStore.cancelAutoscroll(); }

            if(hashExists) {
                await scrollStore.scrollToId(hash, 0, 0);
            } else if(checkDocumentScrollParams(to, from, documentStore)) {
                window.dispatchEvent(new CustomEvent("mohit-pdf-destination-scroll", { cancelable: false }));
            } else if(!hashExists && differentPage) {
                await scrollStore.scrollToTop(true, 0);
            } else if(!differentPage) {
                await scrollStore.scrollToTop(false, 0);
            }
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
            pageFinishHookRunning.value = false;
            return false;
        }
    }
} satisfies RouterConfig