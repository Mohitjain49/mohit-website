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
            pwaCreated.value = true;
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

    return { installIcon, installText,
        mountInstallStore, installApp
    }
});

class InstallHandler {
    /**
     * -----------------------------------------------------------------------------------------------------------
     * This class handles event listeners and certain objects that let the app run as a Progressive Web App (PWA).
     * Only useful for when the user is on Google Chrome, Microsoft Edge, or Opera.
     * -----------------------------------------------------------------------------------------------------------
     */
    constructor() {
        this.elMounted = false;
        this.icon = "fa-up-right-from-square"
        this.statement = "Open App As PWA";
        this.showBtn = true;

        this.pwaCreated = false;
        this.pwaOpen = false;

        deferredPrompt = null;
        this.checkPWAOpen();
    }

    /**
     * This function mounts the class's event listeners.
     */
    mountInstallHandler() {
        if(!this.elMounted) {
            this.setInstallPromptEL();
            this.setAppInstalledEL();
            this.elMounted = true;
        }

        this.checkPWAOpen();
        this.handleInstallDisplay();
    }
}