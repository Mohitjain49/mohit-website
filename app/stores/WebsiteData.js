/** A catalog of all the website menus that can be open. */
export const WEBSITE_MENUS = [
    { id: "mohit-navMenu", num: NAVIGATION_MENU },
    { id: "mohit-compassMenu", num: COMPASS_MENU },
    { id: "mohit-scriptsMenu", num: SCRIPTS_MENU },
    { id: "mohit-docMenu", num: DOCUMENT_MENU },
    { id: "mohit-resumeMenu", num: RESUME_MENU },
    { id: "mohit-metadata-docMenu", num: DOCUMENT_METADATA_MENU }
];

/** This is the general pinia store for the website that manages general components like the website menus. */
export const useWebsiteDataStore = defineStore("web-data", () => {
    const router = useRouter();

    var controller = new AbortController();
    var wakeLockTimeout = null;
    var sharePopupClosingTimeout = null;
    var saveAsSupportedCheckInterval = null;

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
    const wakeLockChanging = ref(false);

    const openShareOnMount = ref(true);
    const navFooterPresent = ref(false);
    const compassMenuAvailable = ref(false);
    const wakeLockChangeFresh = ref(false);
    const copyImageSupported = ref(false);
    const copySvgSupported = ref(false);
    const nullifyBodyClick = ref(false);
    const saveAsSupported = ref(false);

    const noMenuOpen = computed(() => { return (menuOpen.value == NO_MENU); });
    const navMenuOpen = computed(() => { return (menuOpen.value == NAVIGATION_MENU); });
    const compassMenuOpen = computed(() => { return (menuOpen.value == COMPASS_MENU); });
    const scriptsMenuOpen = computed(() => { return (menuOpen.value == SCRIPTS_MENU); });
    const documentMenuOpen = computed(() => { return (menuOpen.value == DOCUMENT_MENU); });
    const resumeMenuOpen = computed(() => { return (menuOpen.value == RESUME_MENU); });
    const documentMetadataMenuOpen = computed(() => { return (menuOpen.value == DOCUMENT_METADATA_MENU); });

    const websiteMenuMode = computed(() => { return ((windowWidth.value > 600 && !fullScreenStore.fullScreenSet) ? 0 : 1); });
    const websiteMenuTransition = computed(() => { return ("navMenu-transition_" + String(websiteMenuMode.value + 1)); });
    const websiteMenuHideOverflow = computed(() => { return (!noMenuOpen.value && websiteMenuMode.value == 1); });

    const showSharePopup = ref(false);
    const sharePopupClosing = ref(false);
    const showSharePopupImmediate = computed(() => {
        const data = (router.currentRoute.value.query.qrdata ?? null);
        return (mounted.value >= 1.25 && data != null && typeof data === "string");
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
        if(sharePopupClosingTimeout != null) { clearTimeout(sharePopupClosingTimeout); }

        if(newValue) {
            showSharePopup.value = true;
            sharePopupClosing.value = false;
        } else {
            sharePopupClosing.value = true;
            sharePopupClosingTimeout = setTimeout(() => {
                showSharePopup.value = false;
                sharePopupClosing.value = false;
                sharePopupClosingTimeout = null;
            }, 505);
        }
    });

    // This lets the website menu track the previous website menu open before the current website menu open.
    watch(menuOpen, (newValue, oldValue) => { previousMenuOpen.value = oldValue; });

    /** This function mounts the website data store. */
    async function mountStore() {
        if(mounted.value != 0) { return; }
        mounted.value = 1;
        window.history.scrollRestoration = "manual";

        await nextTick();
        await onNuxtReadyAdvanced();
        setSaveAsSupported();

        mounted.value = 1.25;
        copyImageSupported.value = ClipboardItem.supports("image/png");
        copySvgSupported.value = ClipboardItem.supports("image/svg+xml");
        const signal = controller.signal;

        await styleStore.mountStyleStore();
        mounted.value = 1.5;

        audioStore.setupClickAudio();
        scrollStore.mountScrollStore();
        documentStore.mountDocumentStore();
        scriptsStore.mountScriptsStore();
        installStore.mountInstallStore();

        resizePageComponents();
        window.addEventListener("animation-resize", () => { resizePageComponents(); }, { signal });
        window.addEventListener("unhandledrejection", (event) => { onUnhandledRejection(event); }, { signal });

        document.body.addEventListener("click", (event) => { onDocumentBodyClick(event); }, { signal });
        document.body.addEventListener("keydown", (event) => { onKeyDown(event); }, { signal });
        document.addEventListener("fullscreenchange", () => { fullScreenStore.setFullScreenStatus(); }, { signal });

        mounted.value = 1.75;
        saveAsSupportedCheckInterval = setInterval(() => { setSaveAsSupported(); }, 1000);
        signal.addEventListener("abort", () => { clearInterval(saveAsSupportedCheckInterval); }, { once: true });

        // This sets the website stores as mounted and ready for use.
        mounted.value = 2;
    }

    /** This function unmounts the website data store. */
    function unmountStore() {
        if(mounted.value != 2) { return; }
        controller.abort();
        controller = new AbortController();
        mounted.value = 0;
    }

    /** This function checks if the website data store is partially mounted. */
    function checkPartiallyMounted() { return (mounted.value >= 1.25); }

    /** This sets the size of crucial components within the website. */
    function resizePageComponents() {
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
            triggerClickSound();
            event.preventDefault();

            if(fullScreenStore.fullScreenSet) {
                fullScreenStore.exitFullScreen();
            } else if(showSharePopup.value) {
                setQRCodePopup("quit");
            } else {
                toggleNavMenu();
            }
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
        const setMenuClosed = (scrollStore.isAutoScrolling || documentStore.checkDocNotLoaded() || (toggle && menuOpen.value == index));
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
        if(qrdata === "quit" || qrdata === "") {
            const route = router.currentRoute.value;
            router.push({ path: route.path, hash: route.hash, query: { ...route.query, qrdata: undefined }});
        } else if(qrdata === "toggle") {
            setQRCodePopup(showSharePopup.value ? "quit" : "main");
        } else {
            const route = router.currentRoute.value;
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
        if(!wakeLock.isSupported.value || wakeLockChanging.value) { return; }
        wakeLockChanging.value = true;

        try {
            if(wakeLock.isActive.value) {
                await wakeLock.release();
            } else {
                await wakeLock.request("screen");
            } 
        } catch(e) {
            console.error(e);
        } finally {
            wakeLockChanging.value = false;
        }
    }

    /**
     * This function is ran when the user clicks on a button that can set the screen wake lock.
     * @param {PointerEvent} event The event from clicking the button.
     */
    async function onWakeLockButtonClick(event = null) {
        try {
            const routePath = router.currentRoute.value.path;
            const properEvent = (event && event.ctrlKey && event.type === "click");

            if(properEvent && routePath !== "/wakelock" && routePath !== "/wakelock/") {
                await router.push("/wakelock/");
            } else {
                await toggleWakeLock();
            }
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
        }
    }

    /** This function sets whether "Save As" buttons are supported in their browser or not. */
    function setSaveAsSupported() {
        const newStatus = (Boolean(window.isSecureContext) && typeof window.showSaveFilePicker === 'function');
        if(saveAsSupported.value !== newStatus) { saveAsSupported.value = newStatus; }
    }

    return { mounted, websiteMenuMode, websiteMenuTransition, navFooterPresent, compassMenuAvailable,
        copyImageSupported, copySvgSupported, saveAsSupported, menuOpen, noMenuOpen, navMenuOpen,
        compassMenuOpen, documentMenuOpen, scriptsMenuOpen, resumeMenuOpen, documentMetadataMenuOpen,
        openShareOnMount, shareSupported, showSharePopup, showSharePopupImmediate, sharePopupClosing,
        wakeLock, wakeLockIcon, wakeLockStatement, wakeLockTitle, wakeLockChangeFresh, webFooter, webFooterVisibility,
        toggleNavMenu, setMenuOpen, closeNavMenu, toggleWakeLock, onWakeLockButtonClick,
        setQRCodePopup, openQRCodePopup, getWebsiteMenuElement, scrollToAndFromFooter, bypassBodyClick,
        shareText, shareLink, shareFile, mountStore, unmountStore, checkPartiallyMounted
    }
});

/** This function returns a computed value of whether "Save As" buttons are supported on the browser or not. */
export function getSaveAsSupported() {
    const { saveAsSupported } = storeToRefs(useWebsiteDataStore());
    return computed(() => { return saveAsSupported.value; });
}