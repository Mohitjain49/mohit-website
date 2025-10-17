export const useInstallStore = defineStore("install-store", () => {
    const pwaCreated = ref(false);
    const deferredPrompt = ref(null);

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
    })

    /**
     * This function mounts the install store.
     */
    function mountInstallStore() {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt.value = e;
        });
        window.addEventListener('appinstalled', () => {
            setPwaCreated();
        });
    }

    /**
     * Handles installation or opening the app if already installed.
     */
    function installApp() {
        if(deferredPrompt.value == null || pwaCreated.value) { return; }
        deferredPrompt.value.prompt();
        deferredPrompt.value.userChoice.then(() => {
            deferredPrompt.value = null;
        });
    }

    /**
     * This function sets that the website is cached and ready to be used offline.
     */
    function setPwaCreated() {
        pwaCreated.value = true;
    }

    return { installIcon, installText,
        mountInstallStore, installApp, setPwaCreated
    }
});