/** A catalog of all the website menus that can be open. */
export const WEBSITE_MENUS = [
    { id: "mohit-navMenu", num: NAVIGATION_MENU },
    { id: "mohit-compassMenu", num: COMPASS_MENU },
    { id: "mohit-scriptsMenu", num: SCRIPTS_MENU },
    { id: "mohit-docMenu", num: DOCUMENT_MENU },
    { id: "mohit-resumeMenu", num: RESUME_MENU },
    { id: "mohit-metadata-docMenu", num: DOCUMENT_METADATA_MENU },
    { id: "mohit-docMenu-pdfNav", num: PDF_NAVIGATION_MENU }
];

/** This is the general pinia store for the website that manages general components like the website menus. */
export const useWebsiteDataStore = defineStore("web-data", () => {
    const router = useRouter();
    const nuxtReady = ref(false);

    var controller = new AbortController();
    var wakeLockTimeout = null;
    var saveAsSupportedCheckInterval = null;

    const gamepadStore = useGamepadStore();
    const scriptsStore = useScriptsStore();
    const documentStore = useDocumentStore();
    const installStore = useInstallStore();
    const audioStore = useAudioStore();
    const fullScreenStore = useFullScreenStore();
    const scrollStore = useScrollStore();
    const styleStore = useStyleStore();

    const { share, isSupported: shareSupported } = useShare();
    const { width: windowWidth } = useMohitWindowSize();
    const wakeLock = useWakeLock();

    /** @type {Ref<HTMLElement>} This represents the website footer. */
    const webFooter = ref(null);
    const webFooterVisibility = useElementVisibility(webFooter);

    const mounted = ref(0);
    const menuOpen = ref(-1);
    const previousMenuOpen = ref(-1);

    const openShareOnMount = ref(true);
    const navFooterPresent = ref(false);
    const compassMenuAvailable = ref(false);
    const wakeLockChangeFresh = ref(false);
    const copyImageSupported = ref(false);
    const nullifyBodyClick = ref(false);
    const saveAsSupported = ref(false);

    const noMenuOpen = computed(() => { return (menuOpen.value == NO_MENU); });
    const navMenuOpen = computed(() => { return (menuOpen.value == NAVIGATION_MENU); });
    const compassMenuOpen = computed(() => { return (menuOpen.value == COMPASS_MENU); });
    const scriptsMenuOpen = computed(() => { return (menuOpen.value == SCRIPTS_MENU); });
    const documentMenuOpen = computed(() => { return (menuOpen.value == DOCUMENT_MENU); });
    const resumeMenuOpen = computed(() => { return (menuOpen.value == RESUME_MENU); });
    const documentMetadataMenuOpen = computed(() => { return (menuOpen.value == DOCUMENT_METADATA_MENU); });
    const pdfNavMenuOpen = computed(() => { return (menuOpen.value == PDF_NAVIGATION_MENU); });

    const websiteMenuMode = computed(() => { return ((windowWidth.value > 600 && !fullScreenStore.fullScreenSet) ? 0 : 1); });
    const websiteMenuTransition = computed(() => { return ("navMenu-transition_" + String(websiteMenuMode.value + 1)); });
    const websiteMenuHideOverflow = computed(() => { return (!noMenuOpen.value && websiteMenuMode.value == 1); });

    const showSharePopup = ref(false);
    const sharePopupClosing = ref(false);
    const showSharePopupImmediate = computed(() => {
        const data = (router.currentRoute.value.query.qrdata ?? null);
        return (nuxtReady.value && data != null && typeof data === "string");
    });

    const wakeLockIcon = computed(() => {
        const active = wakeLock.isActive.value;
        const fresh = wakeLockChangeFresh.value;
        return (wakeLock.isSupported.value ? (((active && fresh) || (!active && !fresh)) ? 'fa-lock' : 'fa-unlock') : 'fa-ban');
    });
    const wakeLockTitle = computed(() => {
        if(!wakeLock.isSupported.value) {
            return "Feature Unavailable.";
        } else if(wakeLock.isActive.value) {
            return "Screen Wake Lock Set! Click Here To Release It.";
        } else {
            return "Screen Wake Lock Released. Click Here To Set It.";
        }
    });
    const wakeLockStatement = computed(() => {
        if(!wakeLock.isSupported.value) {
            return "Feature Unavailable.";
        } else if(wakeLock.isActive.value) {
            return (wakeLockChangeFresh.value ? "Wake Lock Set!" : "Release Screen Wake Lock");
        } else {
            return (wakeLockChangeFresh.value ? "Wake Lock Released!" : "Set Screen Wake Lock");
        }
    });

    // This hides the screen overflow if a website menu is open and it uses it's second mode.
    watch(websiteMenuHideOverflow, (newValue) => {
        styleStore.setHideOverflowArray(HideOverflow.WEBSITE_MENU, newValue);
    });

    // This is used to track if the wake lock was freshly changed or not.
    watch(wakeLock.isActive, () => {
        if(wakeLockTimeout != null) { clearTimeout(wakeLockTimeout); }
        wakeLockChangeFresh.value = true;
        wakeLockTimeout = setTimeout(() => { wakeLockChangeFresh.value = false; }, 3000);
    });

    // This sets how the share popup should behave as opposed to its webpage cover.
    watch(showSharePopupImmediate, async (newValue) => {
        if(newValue) {
            if(sharePopupClosing.value) { return; }
            showSharePopup.value = true;
        } else {
            sharePopupClosing.value = true;
            await sleep(505);
            showSharePopup.value = false;
            await sleep(5);
            sharePopupClosing.value = false;
        }
    });

    // This lets the website menu track the previous website menu open before the current website menu open.
    watch(menuOpen, (newValue, oldValue) => { previousMenuOpen.value = oldValue; });

    /** This function adds event listeners to the website as soon as its loaded. */
    async function setEventListeners() {
        if(mounted.value != 0) { return; }
        mounted.value = 1;
        window.history.scrollRestoration = "manual";

        await nextTick();
        await onNuxtReadyAdvanced();
        setSaveAsSupported();

        nuxtReady.value = true;
        copyImageSupported.value = ClipboardItem.supports("image/png");
        const signal = controller.signal;

        audioStore.setupClickAudio();
        scrollStore.mountScrollStore();
        documentStore.mountDocumentStore();
        await styleStore.mountStyleStore();
        scriptsStore.mountScriptsStore();
        installStore.mountInstallStore();
        resizePageComponents();

        window.addEventListener("animation-resize", () => { resizePageComponents(); }, { signal });
        window.addEventListener("mousemove", () => { gamepadStore.hideAllCursors(); }, { signal });
        window.addEventListener("unhandledrejection", (event) => { onUnhandledRejection(event); }, { signal });

        document.body.addEventListener("click", (event) => { onDocumentBodyClick(event); }, { signal });
        document.body.addEventListener("keydown", (event) => { onKeyDown(event); }, { signal });
        document.addEventListener("fullscreenchange", () => { fullScreenStore.setFullScreenStatus(); }, { signal });

        // This sets a new function in the window object to let static HTML elements access the share popup.
        window.openShareMenu = (param = "") => { setQRCodePopup(param); }
        saveAsSupportedCheckInterval = setInterval(() => { setSaveAsSupported(); }, 1000);
        signal.addEventListener("abort", () => { clearInterval(saveAsSupportedCheckInterval); }, { once: true });

        // This imports the gamepad-events JS file to make sure gamepads work on the website.
        await import("~/gamepad-events.js");
        mounted.value = 2;
    }

    /** This function removes event listeners to the website as soon as its loaded. */
    function removeEventListeners() {
        if(mounted.value != 2) { return; }
        controller.abort();
        controller = new AbortController();

        gamepadStore.stopAllCursors();
        mounted.value = 0;
    }

    /** This sets the size of crucial components within the website. */
    function resizePageComponents() {
        gamepadStore.resetCursorPositions();
        scriptsStore.closeLineOptions();
        documentStore.setContextMenuPageNumber(0);
    }

    /**
     * This function closes the Nav Menu if the user clicks anywhere on the screen that isn't the Navigation bar.
     * @param {PointerEvent} event The event.
     */
    function onDocumentBodyClick(event = null) {
        if(!event || !event.target) { return; }
        audioStore.confirmClickSound(event);
        checkNavigationElement(event.target).then((result) => { if(!result) { closeNavMenu(); }});
    }

    /**
     * This function returns whether an element is in any navigation menu or webpage cover within the website.
     * @param {HTMLElement} element The element.
     */
    async function checkNavigationElement(element = null) {
        await nextTick();
        if(nullifyBodyClick.value) {
            nullifyBodyClick.value = false;
            return true;
        }

        if(element == null) { return false; }
        if(element.classList.contains("webpage-cover")) { return true; }

        // A list of website menu elements where the menu should not close when normally clicked.
        const WEBSITE_MENU_ELEMENTS = [
            document.getElementById("mohit-navBar"),
            getWebsiteMenuElement("current"),
            getWebsiteMenuElement("previous"),
        ];

        for(let i = 0; i < WEBSITE_MENU_ELEMENTS.length; i++) {
            const webMenu = WEBSITE_MENU_ELEMENTS[i];
            if(webMenu && (webMenu === element || webMenu.contains(element))) { return true; }
        }

        // Returns false if element was not found in any menu.
        return false;
    }

    /**
     * This function runs whenever the user hits a key.
     * @param {KeyboardEvent} event The event given by the listener.
     */
    function onKeyDown(event) {
        const key = event.key;
        if(event.repeat) { return; }

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
                router.push("/wakelock/");
                triggerClickSound();
            } else if(key === "i") {
                router.push("/install/");
                triggerClickSound();
            }
        } else if(key === "Escape") {
            if(fullScreenStore.fullScreenSet) { triggerClickSound(); }
            else if(showSharePopup.value) { setQRCodePopup("quit"); triggerClickSound(); }
            else { toggleNavMenu(); triggerClickSound(); }
        }
    }

    /** This function handles unhandled rejections. */
    function onUnhandledRejection(event) {
        if(event.reason?.name === "AbortException") { event.preventDefault(); }
    }

    /** This function scrolls to the footer of the webpage if it exists. */
    function scrollToAndFromFooter() {
        if(!navFooterPresent.value) { return; }
        closeNavMenu();
        if(webFooterVisibility.value) { scrollToTop(false, 0); }
    }

    /**
     * This function gets the HTML Element representing the current website menu open.
     * @param {"current" | "previous"} mode The website menu to obtain.
     */
    function getWebsiteMenuElement(mode = "current") {
        const menuIndex = ((mode === "current") ? menuOpen.value : ((mode === "previous") ? previousMenuOpen.value : NO_MENU));
        const websiteMenuCatalogIndex = WEBSITE_MENUS.findIndex((item) => { return (item.num === menuIndex); });
        return ((websiteMenuCatalogIndex == -1) ? null : document.getElementById(WEBSITE_MENUS[websiteMenuCatalogIndex].id));
    }

    /** The toggles the status of the home navigation menu. */
    function toggleNavMenu() {
        setMenuOpen((menuOpen.value == NAVIGATION_MENU) ? NO_MENU : NAVIGATION_MENU);
    }

    /**
     * This function sets the status of whether a website menu is open or not.
     * @param {Number} index The index of what menu should be open.
     * @param {Boolean} toggle If true AND the menu to be opened is already open, this function wil then close the menu.
     */
    function setMenuOpen(index = NO_MENU, toggle = false) {
        const setMenuClosed = (scrollStore.isAutoScrolling || (toggle && menuOpen.value == index));
        menuOpen.value = (setMenuClosed ? NO_MENU : index);
    }

    /** This function closes any open Navigation Menu. */
    function closeNavMenu() { setMenuOpen(NO_MENU, false); }

    /** This function bypasses the "onDocumentBodyClick" function that closes any Navigation Menu if an element outside the menus are clicked. */
    function bypassBodyClick() { nullifyBodyClick.value = true; }

    /**
     * This function sets a new status for the QR Code Popup.
     * @param {String} qrdata The URL or mode to pass into the QR Code Popup.
     */
    function setQRCodePopup(qrdata = "") {
        if(sharePopupClosing.value) { return; }
        const route = router.currentRoute.value;

        if(qrdata === "quit" || qrdata === "") {
            router.push({ path: route.path, hash: route.hash, query: { ...route.query, qrdata: undefined }});
        } else if(qrdata === "toggle") {
            setQRCodePopup(showSharePopup.value ? "quit" : "main");
        } else {
            router.push({ path: route.path, hash: route.hash, query: { ...route.query, qrdata }}).then(() => {
                sleep(10).then(() => { closeNavMenu(); });
            });
        }
    }

    /** This function opens the QR Code popup. */
    function openQRCodePopup() { setQRCodePopup('main'); }

    /**
     * This function triggers the browser to share text To The User.
     * @param {String} link The text to share.
     */
    async function shareText(text = PERSONAL_WEBSITE_LINK) {
        if(!shareSupported) { return; }
        await share({ text: ("Sharing Link From " + PERSONAL_WEBSITE_LINK + "\n" + text), title: "Sharing Text..." });
    }

    /**
     * This function triggers the browser to share a link.
     * @param {String} link The link to share.
     */
    async function shareLink(link = PERSONAL_WEBSITE_LINK) {
        if(!shareSupported) { return; }
        await share({ url: link, text: ("Sharing Link From " + PERSONAL_WEBSITE_LINK), title: "Sharing Link..." })
    }

    /**
     * This function triggers the browser to share a file
     * @param {File} file The file to share.
     */
    async function shareFile(file) {
        if(!shareSupported) { return; }
        await share({ files: [file], text: ("Sharing File From " + PERSONAL_WEBSITE_LINK), title: "Sharing File..." })
    }

    /** This function toggles the wake lock for the website. */
    async function toggleWakeLock() {
        if(!wakeLock.isSupported.value) { return; }
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

    /** This function sets whether "Save As" buttons are supported in their browser or not. */
    function setSaveAsSupported() {
        const newStatus = (window.isSecureContext && typeof window.showSaveFilePicker === 'function');
        if(saveAsSupported.value !== newStatus) { saveAsSupported.value = newStatus; }
    }

    return { mounted, websiteMenuMode, websiteMenuTransition, navFooterPresent, compassMenuAvailable, copyImageSupported, saveAsSupported,
        menuOpen, noMenuOpen, navMenuOpen, compassMenuOpen, documentMenuOpen, scriptsMenuOpen, resumeMenuOpen,
        documentMetadataMenuOpen, pdfNavMenuOpen, openShareOnMount, shareSupported, showSharePopup, showSharePopupImmediate, sharePopupClosing,
        wakeLock, wakeLockIcon, wakeLockStatement, wakeLockTitle, wakeLockChangeFresh, webFooter, webFooterVisibility,
        toggleNavMenu, setMenuOpen, closeNavMenu, toggleWakeLock, setQRCodePopup, openQRCodePopup, getWebsiteMenuElement,
        shareText, shareLink, shareFile, setEventListeners, removeEventListeners, scrollToAndFromFooter, bypassBodyClick
    }
});

/** This function returns a computed value of whether "Save As" buttons are supported on the browser or not. */
export function getSaveAsSupported() {
    const { saveAsSupported } = storeToRefs(useWebsiteDataStore());
    return computed(() => { return saveAsSupported.value; });
}