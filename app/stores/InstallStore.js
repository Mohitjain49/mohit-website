const PWA_CACHE_ID_STATIC = "mohit-website-pwa-cache-id";
import { ofetch } from "ofetch";

export const useInstallStore = defineStore("install-store", () => {
    const pwaCreated = ref(false);
    const deferredPrompt = ref(null);
    const showUpdateBox = ref(false);

    const updateNeeded = ref(false);
    const swUpdating = ref(false);
    const swRegistered = ref(false);

    const installIcon = computed(() => {
        return ((deferredPrompt.value == null || pwaCreated.value) ? 'fa-ban' : 'fa-download');
    })
    const installText = computed(() => {
        if(pwaCreated.value) {
            return "Website Installed";
        } else if(deferredPrompt.value == null) {
            return "Website Not Ready";
        } else {
            return "Install My Website";
        }
    });

    /** This function mounts the install store. */
    function mountInstallStore() {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt.value = e;
        });
        window.addEventListener('appinstalled', () => {
            setPwaCreated();
        });

        // Checks manually if an update is needed.
        checkUpdateNeededManually();
    }

    /** This function checks manually if an update is needed and sets and returns the result. */
    async function checkUpdateNeededManually() {
        try {
            const cacheNames = await window.caches.keys();
            const workboxPrecacheKeys = cacheNames.filter((name) => { return name.includes(PWA_CACHE_ID_STATIC); });

            // If there is more than one precache key, then the service worker needs to be updated.
            if(workboxPrecacheKeys.length > 1) {
                setUpdateNeeded(true);
                return true;
            }

            /* This object represents the options for an ofetch call. */
            const fetchOptions = { cache: "no-store",
                query: { _nocache: new Date().getTime() },
                headers: { "Cache-Control": "no-cache, no-store, must-revalidate", "Pragma": "no-cache" }
            }

            const newVersionNum = await ofetch("/version.json", fetchOptions);
            const staleVersionNum = await getPrecachedFile("/version.json");

            if(newVersionNum && staleVersionNum && newVersionNum.version !== staleVersionNum.version) {
                setUpdateNeeded(true);
                return true;
            }

            // Returns false if the website does not manually find a reason that an update is needed.
            setUpdateNeeded(false);
            return false;
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
            return null;
        }
    }

    /** Given a path, this function gets the data for a precached file.  */
    async function getPrecachedFile(path = "") {
        if (!('caches' in window)) { return null; }
        const cacheNames = await window.caches.keys();
        const workboxCacheName = cacheNames.find((name) => { return name.includes(PWA_CACHE_ID_STATIC); });
        if(!workboxCacheName) { return null; }

        const cache = await window.caches.open(workboxCacheName);
        const requests = await cache.keys();
        const targetRequest = requests.find((req) => { return req.url.includes(path); });
        if(!targetRequest) { return null; }

        const response = await cache.match(targetRequest);
        return (response ? await response.json() : null);
    }

    /** This function deletes the cache, unregisters service workers, and updates the website. */
    async function resetWebsiteVersion() {
        if(swUpdating.value) { return; }
        swUpdating.value = true;

        if('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for(const reg of regs) { await reg.unregister(); }
        }
        if('caches' in window) {
            const keys = await caches.keys();
            for(const key of keys) { await caches.delete(key); }
        }

        await useNuxtApp().$pwa.updateServiceWorker(true);
        window.location.reload(true);
    }

    /** Handles installation or opening the app if already installed. */
    function installApp() {
        if(deferredPrompt.value == null || pwaCreated.value) { return; }
        deferredPrompt.value.prompt();
        deferredPrompt.value.userChoice.then(() => { deferredPrompt.value = null; });
    }

    /** This function sets that the website is cached and ready to be used offline. */
    function setPwaCreated() { pwaCreated.value = true; }

    /** This function sets the status of if an update is needed given a boolean. */
    function setUpdateNeeded(status = true) {
        updateNeeded.value = status;
        if(status) { setUpdateBox(true); }
    }

    /**
     * This function sets the status of the update box given a boolean.
     * @param {Boolean} status THe new status of the update box.
     */
    function setUpdateBox(status = false) {
        showUpdateBox.value = status;
    }

    return { installIcon, installText, updateNeeded, showUpdateBox, swRegistered, swUpdating,
        mountInstallStore, installApp, setPwaCreated, setUpdateBox, setUpdateNeeded, resetWebsiteVersion
    }
});