export const useInstallStore = defineStore("install-store", () => {
    const pwaCreated = ref(false);
    const deferredPrompt = ref(null);
    const showUpdateBox = ref(false);
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

    /**
     * This function sets the status of the update box given a boolean.
     * @param {Boolean} status THe new status of the update box.
     */
    function setUpdateBox(status = false) {
        showUpdateBox.value = status;
    }

    return { installIcon, installText, showUpdateBox, swRegistered,
        mountInstallStore, installApp, setPwaCreated, setUpdateBox
    }
});