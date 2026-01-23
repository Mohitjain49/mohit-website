export const useWebsiteDataStore = defineStore("web-data", () => {
    const router = useRouter();
    const controller = new AbortController();

    const gamepadStore = useGamepadStore();
    const documentStore = useDocumentStore();
    const installStore = useInstallStore();
    const audioStore = useAudioStore();
    const fullScreenStore = useFullScreenStore();

    const { share, isSupported: shareSupported } = useShare();
    const wakeLock = useWakeLock();

    /** @type {Ref<HTMLElement>} This represents the website footer. */
    const webFooter = ref(null);
    const webFooterVisibility = useElementVisibility(webFooter);
    const onFirstMount = ref(true);

    /**
     * An reference integer that determines the Mode of the Nav Bar.
     * If it equals 0, it is on laptop mode, or the screen width is above 825px.
     * If it equals 1, it is on tablet mode, or the screen width is above 600px.
     * If it equals 2, it is on phone mode, or the screen width is at most 600px.
     */
    const pageView = ref(0);
    const menuOpen = ref(-1);
    const navFooterPresent = ref(false);

    const navMenuOpen = computed(() => { return (menuOpen.value == 0); });
    const documentMenuOpen = computed(() => { return (menuOpen.value == 1); });
    const showSharePopup = computed(() => {
        const data = (router.currentRoute.value.query.qrdata ?? null);
        return (data != null && typeof data === "string");
    });

    const wakeLockIcon = computed(() => {
        return (wakeLock.isSupported.value ? (wakeLock.isActive.value ? 'fa-unlock' : 'fa-lock') : 'fa-ban');
    });
    const wakeLockStatement = computed(() => {
        if(!wakeLock.isSupported.value) {
            return "Feature Unavailable.";
        } else if(wakeLock.isActive.value) {
            return "Release Screen Wake Lock";
        } else {
            return "Set Screen Wake Lock";
        }
    });

    /**
     * This function adds event listeners to the website as soon as its loaded.
     */
    function setEventListeners() {
        const signal = controller.signal;
        audioStore.setupClickAudio();

        documentStore.mountDocumentStore();
        installStore.mountInstallStore();
        resizePageComponents();

        window.addEventListener("resize", () => { resizePageComponents(); }, { signal });
        window.addEventListener("scroll", () => { onWindowScroll(); }, { signal });
        window.addEventListener("mousemove", () => { gamepadStore.hideAllCursors(); }, { signal });
        window.addEventListener("unhandledrejection", onUnhandledRejection, { signal });

        document.body.addEventListener("click", onDocumentBodyClick, { signal });
        document.body.addEventListener("mousedown", onDocumentBodyClick, { signal });
        document.body.addEventListener("touchstart", onDocumentBodyClick, { signal });
        document.body.addEventListener("keydown", onKeyDown, { signal });
        document.addEventListener("fullscreenchange", () => { fullScreenStore.setFullScreenStatus(); }, { signal });

        // This makes sure that the website doesn't scroll with the swipe events made for the navigation bar.
        const mohitNavBar = document.getElementById("mohit-navBar");
        if(mohitNavBar == null) { return; }

        mohitNavBar.addEventListener("touchmove", (e) => {
            const target = e.target;
            if(!(target instanceof HTMLInputElement) || target.type !== "range") { e.preventDefault(); }
        }, { passive: false, signal });
    }

    /**
     * This function removes event listeners to the website as soon as its loaded.
     */
    function removeEventListeners() {
        controller.abort();
        gamepadStore.stopAllCursors();
    }

    /**
     * This sets the size of crucial components within the website.
     */
    function resizePageComponents() {
        const windowWidth = window.innerWidth;
        gamepadStore.resetCursorPositions();
        
        if(windowWidth <= 600) {
            pageView.value = 2;
        } else if(windowWidth <= 825) {
            pageView.value = 1;
        } else {
            pageView.value = 0;
        }
    }

    /**
     * This function closes the Nav Menu if the user clicks anywhere on the screen that isn't the Navigation bar.
     * @param event The event.
     */
    function onDocumentBodyClick(event = new MouseEvent("click")) {
        const navMenu = document.getElementById("mohit-navBar");
        const navMenuElements = Array.from(navMenu.querySelectorAll('*'));
        const srcElement = event.target;

        audioStore.confirmClickSound(event);
        const elementInNavMenu = (navMenu === srcElement || navMenuElements.includes(srcElement));

        if(documentStore.onDocumentRoute) {
            var elementInDocumentMenu = false;
            nextTick(() => {
                const documentMenu = document.getElementById("mohit-documentBar");
                const documentMenuElements = Array.from(documentMenu.querySelectorAll('*'));
                elementInDocumentMenu = (documentMenu === srcElement || documentMenuElements.includes(srcElement));
                if(!elementInDocumentMenu && !elementInNavMenu) { closeNavMenu(); }
            });
        } else {
            audioStore.confirmClickSound(event);
            if(!elementInNavMenu) { closeNavMenu(); }
        }
    }

    /**
     * This function runs whenever the window scroll event is triggered.
     */
    function onWindowScroll() {
        closeNavMenu();
    }

    /**
     * This function runs whenever the user hits a key.
     * @param {KeyboardEvent} event The event given by the listener.
     */
    function onKeyDown(event) {
        const key = event.key;
        if(event.ctrlKey && event.altKey) {
            if(key === "w" || key === "W") {
                toggleWakeLock();
                triggerClickSound();
            } else if(key === "q" || key === "Q") {
                setQRCodePopup("toggle");
                triggerClickSound();
            }
        } else if(event.altKey) {
            if(key === "q" || key === "Q") {
                setQRCodePopup("toggle");
                triggerClickSound();
            } else if(key === "m") {
                toggleNavMenu();
                triggerClickSound();
            } else if(key === "w") {
                router.push("/wakelock");
                triggerClickSound();
            } else if(key === "i") {
                router.push("/install");
                triggerClickSound();
            } else if(key === "r" || key === "c") {
                router.push("/code-scanner");
                triggerClickSound();
            }
        } else if(key === "Escape") {
            if(fullScreenStore.fullScreenSet) { triggerClickSound(); }
            else if(showSharePopup.value) { setQRCodePopup("quit"); triggerClickSound(); }
            else { toggleNavMenu(); triggerClickSound(); }
        }
    }

    /**
     * This function handles unhandled rejections.
     */
    function onUnhandledRejection(event) {
        if(event.reason?.name === "AbortException") {
            event.preventDefault();
        }
    }

    /**
     * This runs whenever a page is opened.
     * @param {Number} pixelOffset The offset for scrolling to a particular section.
     */
    function mountWebData(pixelOffset = 0) {
        closeNavMenu();
        if(onFirstMount.value) {
            onFirstMount.value = false;
        } else {
            setQRCodePopup("quit");
        }

        nextTick(() => {
            const hashStr = router.currentRoute.value.hash.substring(1);
            window.scrollTo({ top: ((hashStr === "documents") ? document.body.scrollHeight : 0), left: 0, behavior: "instant" });
            if(hashStr === "" || documentStore.onDocumentRoute) { return; }

            try {
                goToPageSection(hashStr, pixelOffset);
            } catch(e) {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }
        });
    }

    /**
     * This function scrolls to the footer of the webpage if it exists.
     */
    function scrollToAndFromFooter() {
        if(!navFooterPresent.value) { return; }
        closeNavMenu();

        if(webFooterVisibility.value) {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            goToPageSection('footer');
        }
    }

    /**
     * The toggles the status of the home navigation menu.
     */
    function toggleNavMenu() {
        menuOpen.value = ((menuOpen.value == 0) ? -1 : 0);
    }

    /**
     * The toggles the status of the document menu.
     */
    function toggleDocumentMenu() {
        menuOpen.value = ((menuOpen.value == 1) ? -1 : 1);
    }

    /**
     * This function closes the Navigation Menu.
     */
    function closeNavMenu() {
        menuOpen.value = -1;
    }

    /**
     * This function sets a new status for the QR Code Popup.
     * @param {String} qrdata The URL or mode to pass into the QR Code Popup.
     */
    function setQRCodePopup(qrdata = "") {
        const route = router.currentRoute.value;
        closeNavMenu();

        if(qrdata === "quit" || qrdata === "") {
            router.push({ path: route.path, hash: route.hash });
        } else if(qrdata === "toggle") {
            setQRCodePopup(showSharePopup.value ? "quit" : "main");
        } else {
            router.push({ path: route.path, hash: route.hash, query: { qrdata } });
        }
    }

    /**
     * This function opens the QR Code popup.
     */
    function openQRCodePopup() {
        setQRCodePopup('main');
    }

    /**
     * This function triggers the browser to share a link.
     * @param {String} link The link to share.
     */
    function shareLink(link = PERSONAL_WEBSITE_LINK) {
        if(!shareSupported) { return; }
        share({ url: link, text: ("Sharing Link From " + PERSONAL_WEBSITE_LINK), title: "Sharing Link..." })
    }

    /**
     * This function triggers the browser to share a file
     * @param {File} file The file to share.
     */
    function shareFile(file) {
        if(!shareSupported) { return; }
        share({ files: [file], text: ("Sharing File From " + PERSONAL_WEBSITE_LINK), title: "Sharing File..." })
    }

    /**
     * This function toggles the wake lock for the website.
     */
    async function toggleWakeLock() {
        if(!wakeLock.isSupported.value) { return; }
        closeNavMenu();

        if(wakeLock.isActive.value) {
            await wakeLock.release();
        } else {
            try {
                await wakeLock.request("screen");
            } catch(e) {
                console.error(e);
            }
        }
    }

    return { pageView, onFirstMount, menuOpen, navMenuOpen, documentMenuOpen, shareSupported, showSharePopup,
        wakeLock, wakeLockIcon, wakeLockStatement, navFooterPresent, webFooter, webFooterVisibility,
        toggleNavMenu, toggleDocumentMenu, closeNavMenu, toggleWakeLock, setQRCodePopup, openQRCodePopup,
        shareLink, shareFile, setEventListeners, removeEventListeners, mountWebData, scrollToAndFromFooter,
        setFlashAnimation, setHeartbeatAnimation, setBounceAnimation, addFlashAnimation, setPulseLoopAnimation
    }
});

/**
 * This function mounts the website data pinia store on a page.
 * @param {Number} pixelOffset The offset for scrolling to a particular section.
 */
export function initWebData(pixelOffset = 0) {
    useWebsiteDataStore().mountWebData(pixelOffset);
}