export const useWebsiteDataStore = defineStore("web-data", () => {
    const router = useRouter();
    const controller = new AbortController();
    var wakeLockTimeout = null;

    const gamepadStore = useGamepadStore();
    const scriptsStore = useScriptsStore();
    const installStore = useInstallStore();
    const audioStore = useAudioStore();
    const fullScreenStore = useFullScreenStore();
    const scrollStore = useScrollStore();

    const onHostedFileRoute = getOnHostedFileRoute();
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
    const compassMenuAvailable = ref(false);
    const wakeLockChangeFresh = ref(false);
    const nullifyBodyClick = ref(false);

    const navMenuOpen = computed(() => { return (menuOpen.value == 0); });
    const compassMenuOpen = computed(() => { return (menuOpen.value == 1); });
    const scriptsMenuOpen = computed(() => { return (menuOpen.value == 2); });
    const documentMenuOpen = computed(() => { return (menuOpen.value == 3); });

    const showSharePopup = computed(() => {
        const data = (router.currentRoute.value.query.qrdata ?? null);
        return (data != null && typeof data === "string");
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

    // This hides and reveals the main website scrollbar based on if a website menu is open or not.
    watch(menuOpen, () => {
        const newWidth = ((menuOpen.value == -1) ? '10px' : '0px');
        try { document.documentElement.style.setProperty('--main-scrollbar-width', newWidth); } catch(e) {}
    });

    // This is used to track if the wake lock was freshly changed or not.
    watch(wakeLock.isActive, () => {
        if(wakeLockTimeout != null) { clearTimeout(wakeLockTimeout); }
        wakeLockChangeFresh.value = true;
        wakeLockTimeout = setTimeout(() => { wakeLockChangeFresh.value = false; }, 3000);
    });

    /**
     * This function adds event listeners to the website as soon as its loaded.
     */
    function setEventListeners() {
        const signal = controller.signal;
        history.scrollRestoration = "manual";

        audioStore.setupClickAudio();
        scrollStore.mountScrollStore();
        scriptsStore.mountScriptsStore();
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

        // This sets a new function in the window object to let static HTML elements access the share popup.
        window.openShareMenu = (param = "") => { setQRCodePopup(param); }

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
        scriptsStore.setLineOptions(-1);
        
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
        audioStore.confirmClickSound(event);
        const element = event.target;
        if(!checkNavigationElement(element)) { closeNavMenu(); }

        const lineOptions = document.getElementById("mohit-line-options");
        if(lineOptions != null) {
            const lineOptionsElements = Array.from(lineOptions.querySelectorAll('*'));
            const pattern = new RegExp("^L" + "\\d+$");

            const lineId = element.closest("span")?.id
            if(lineOptions === element || lineOptionsElements.includes(element) || pattern.test(lineId)) { return; }
            scriptsStore.setLineOptions(-1);
        }
    }

    /**
     * This function returns whether an element is in any navigation menu within the website.
     * @param {HTMLElement} element The element.
     */
    function checkNavigationElement(element) {
        if(nullifyBodyClick.value) {
            nullifyBodyClick.value = false;
            return true;
        }

        const navBar = document.getElementById("mohit-navBar");
        const navBarElements = Array.from(navBar.querySelectorAll('*'));
        if(navBar === element || navBarElements.includes(element)) { return true; }

        const navMenu = document.getElementById("mohit-navMenu");
        const navMenuElements = Array.from(navMenu.querySelectorAll('*'));
        if(navMenu === element || navMenuElements.includes(element)) { return true; }

        const compassMenu = document.getElementById("mohit-compassMenu");
        if(compassMenu != null) {
            const compassMenuElements = Array.from(compassMenu.querySelectorAll('*'));
            if(compassMenu === element || compassMenuElements.includes(element)) { return true; }
        }

        const scriptsMenu = document.getElementById("mohit-scriptsMenu");
        if(scriptsMenu != null) {
            const scriptsMenuElements = Array.from(scriptsMenu.querySelectorAll('*'));
            if(scriptsMenu === element || scriptsMenuElements.includes(element)) { return true; }
        }

        const docMenu = document.getElementById("mohit-docMenu");
        if(docMenu != null) {
            const docMenuElements = Array.from(docMenu.querySelectorAll('*'));
            if(docMenu === element || docMenuElements.includes(element)) { return true; }
        }

        // Returns false if element was not found in any menu.
        return false;
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
            if(hashStr === "" || onHostedFileRoute.value) { return; }

            allImagesReady().then(() => {
                try {
                    goToPageSection(hashStr, ((hashStr === "footer") ? 50 : pixelOffset), 10);
                } catch(e) {
                    scrollToTop(true, 0);
                }
            });
        });
    }

    /** This function runs to ensure that all the images in a webpage are loaded before the scroll event takes place. */
    async function allImagesReady() {
        const images = Array.from(document.documentElement.querySelectorAll('img'));
        const promises = images.map(async(img) => {
            if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
            try { return await img.decode(); } catch (err) {}
        });
        return Promise.all(promises);
    };

    /**
     * This function scrolls to the footer of the webpage if it exists.
     */
    function scrollToAndFromFooter() {
        if(!navFooterPresent.value) { return; }
        closeNavMenu();

        if(webFooterVisibility.value) {
            scrollToTop(false, 0);
        } else {
            goToFooter();
        }
    }

    /** The toggles the status of the home navigation menu. */
    function toggleNavMenu() {
        setMenuOpen((menuOpen.value == 0) ? -1 : 0);
    }

    /** The toggles the status of the home navigation menu. */
    function toggleScriptsMenu() {
        setMenuOpen((menuOpen.value == 2) ? -1 : 2);
    }

    /**
     * This function sets the status of whether a website menu is open or not.
     * @param {Number} index The index of what menu should be open.
     */
    function setMenuOpen(index = -1) {
        menuOpen.value = index;
    }

    /** This function closes any open Navigation Menu. */
    function closeNavMenu() { setMenuOpen(-1); }

    /**
     * This function bypasses the "onDocumentBodyClick" function that closes any Navigation Menu if an element outside the menus are clicked.
     */
    function bypassBodyClick() {
        nullifyBodyClick.value = true;
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

    /**
     * This function toggles the wake lock for the website.
     */
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

    return { pageView, onFirstMount, menuOpen, navMenuOpen, compassMenuOpen, documentMenuOpen, scriptsMenuOpen, shareSupported, showSharePopup,
        wakeLock, wakeLockIcon, wakeLockStatement, wakeLockTitle, wakeLockChangeFresh, navFooterPresent, compassMenuAvailable, webFooter, webFooterVisibility,
        toggleNavMenu, toggleScriptsMenu, setMenuOpen, closeNavMenu, toggleWakeLock, setQRCodePopup, openQRCodePopup,
        shareLink, shareFile, setEventListeners, removeEventListeners, mountWebData, scrollToAndFromFooter, bypassBodyClick
    }
});

/**
 * This function mounts the website data pinia store on a page.
 * @param {Number} pixelOffset The offset for scrolling to a particular section.
 */
export function initWebData(pixelOffset = 0) {
    useWebsiteDataStore().mountWebData(pixelOffset);
}

/**
 * This function returns a reactive computed value on whether the user is on a hosted file page or not.
 */
export function getOnHostedFileRoute() {
    const { onDocumentRoute } = storeToRefs(useDocumentStore());
    const { onScriptRoute } = storeToRefs(useScriptsStore());
    return computed(() => { return (onDocumentRoute.value || onScriptRoute.value) })
}