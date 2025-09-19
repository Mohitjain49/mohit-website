export const useWebsiteDataStore = defineStore("web-data", () => {
    const router = useRouter();
    const controller = new AbortController();

    const gamepadStore = useGamepadStore();
    const documentStore = useDocumentStore();
    const installStore = useInstallStore();
    const audioStore = useAudioStore();
    const fullScreenStore = useFullScreenStore();
    const { share, isSupported: shareSupported } = useShare();

    /**
     * An reference integer that determines the Mode of the Nav Bar.
     * If it equals 0, it is on laptop mode, or the screen width is above 825px.
     * If it equals 1, it is on tablet mode, or the screen width is above 600px.
     * If it equals 2, it is on phone mode, or the screen width is at most 600px.
     */
    const pageView = ref(0);
    const menuOpen = ref(-1);
    const navFooterPresent = ref(false);

    const wakeLockAvailable = ref(false);
    const wakeLock = ref(null);

    const navMenuOpen = computed(() => { return (menuOpen.value == 0); });
    const documentMenuOpen = computed(() => { return (menuOpen.value == 1); });
    const qrPopup = ref({ open: false, truncateValue: 54 });

    const wakeLockIcon = computed(() => {
        return (wakeLockAvailable.value ? ((wakeLock.value == null) ? 'fa-lock' : 'fa-unlock') : 'fa-ban');
    });
    const wakeLockStatement = computed(() => {
        if(!wakeLockAvailable.value) {
            return "Feature Unavailable.";
        } else if(wakeLock.value == null) {
            return "Set Screen Wake Lock";
        } else {
            return "Release Screen Wake Lock";
        }
    });

    /**
     * This function adds event listeners to the website as soon as its loaded.
     */
    function setEventListeners() {
        const signal = controller.signal;
        audioStore.setupClickAudio();
        nextTick(() => { wakeLockAvailable.value = ('wakeLock' in navigator); }); // This checks whether the wakelock is avaliable or not.

        documentStore.mountDocumentStore();
        installStore.mountInstallStore();
        resizePageComponents();

        window.addEventListener("resize", () => { resizePageComponents(); }, { signal });
        window.addEventListener("scroll", () => { onWindowScroll(); }, { signal });
        window.addEventListener("mousemove", () => { gamepadStore.setCustomCursor(false); }, { signal });
        window.addEventListener("unhandledrejection", onUnhandledRejection, { signal });

        document.body.addEventListener("click", onDocumentBodyClick, { signal });
        document.body.addEventListener("mousedown", onDocumentBodyClick, { signal });
        document.body.addEventListener("touchstart", onDocumentBodyClick, { signal });
        document.body.addEventListener("keydown", onKeyDown, { signal });
        document.addEventListener("fullscreenchange", () => { fullScreenStore.setFullScreenStatus(); }, { signal });
    }

    /**
     * This function removes event listeners to the website as soon as its loaded.
     */
    function removeEventListeners() {
        controller.abort();
        gamepadStore.disableGamepadVibration();
        gamepadStore.stopGamepadConnectedInterval();
    }

    /**
     * This sets the size of crucial components within the website.
     */
    function resizePageComponents() {
        const windowWidth = window.innerWidth;
        gamepadStore.initCustomCursorPosition();
        qrPopup.value.truncateValue = ((windowWidth > 625) ? 54 : 47);
        
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

        if(documentStore.checkResumeRoute() || documentStore.checkFCSCertificateRoute()) {
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
        gamepadStore.setCursorClickElement();
    }

    /**
     * This function runs whenever the user hits a key.
     * @param {KeyboardEvent} event The event given by the listener.
     */
    function onKeyDown(event) {
        const key = event.key;
        if(event.ctrlKey && (key === "q" || key === "Q")) {
            setQRCodePopup("toggle");
            triggerClickSound();
        }

        if(!event.altKey) { return; }
        if(key === "m") {
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
     */
    function mountWebData() {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setQRCodePopup(false);
        closeNavMenu();
    }

    /**
     * This scrolls to the section the visitor requested.
     * @param {String} id The element ID of the section.
     */
    function goToPageSection(id = "start") {
        const top = (document.getElementById(id).getBoundingClientRect().y + window.scrollY);
        window.scrollTo({ top: top, left: 0, behavior: "smooth" });
    }

    /**
     * This function scrolls to the footer of the webpage if it exists.
     */
    function scrollToFooter() {
        if(!navFooterPresent.value) { return; }
        goToPageSection('footer');
        closeNavMenu();
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
     * @param {String | Boolean} status The new status. If it equals "toggle", the new status is the opposite of the current status.
     */
    function setQRCodePopup(status = "toggle") {
        qrPopup.value.open = ((status === "toggle") ? !qrPopup.value.open : status);
        closeNavMenu();
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
     * This adds and removes a flash animation for any element.
     */
    function setFlashAnimation(event = new MouseEvent("mouseenter")) {
        if(event.type === "mouseenter") {
            event.target.classList.add("animate__animated", "animate__flash");
        } else {
            event.target.classList.remove("animate__animated", "animate__flash");
        }
    }

    /**
     * This function adds or removes a heartbeat animation to any element.
     */
    function setHeartbeatAnimation(event = new MouseEvent("mouseenter")) {
        if(event.type === "mouseenter") {
            event.target.classList.add('animate__animated', 'animate__heartBeat');
        } else {
            event.target.classList.remove('animate__animated', 'animate__heartBeat');
        }
    }

    /**
     * This function sets a bounce animation for any element.
     */
    function setBounceAnimation(event = new MouseEvent("mouseenter")) {
        if(event.type === "mouseenter") {
            event.target.classList.add('animate__animated', 'animate__bounce');
        } else {
            event.target.classList.remove('animate__animated', 'animate__bounce');
        }
    }

    /**
     * This function sets a pulse animation for any element for an infinite amount of time.
     */
    function setPulseLoopAnimation(event = new MouseEvent("mouseenter")) {
        if(event.type === "mouseenter") {
            event.target.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        } else {
            event.target.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
        }
    }

    /**
     * This function adds the flash animation, then removes it after 0.8s.
     */
    function addFlashAnimation(event = new MouseEvent("click")) {
        event.target.classList.add('animate__animated', 'animate__flash');
        setTimeout(() => {
            event.target.classList.remove('animate__animated', 'animate__flash');
        }, 800)
    }

    /**
     * This function toggles the wake lock for the website.
     */
    async function toggleWakeLock() {
        if(!wakeLockAvailable.value) { return; }
        closeNavMenu();

        if(wakeLock.value != null) {
            await wakeLock.value.release();
            wakeLock.value = null;
        } else {
            try {
                wakeLock.value = await navigator.wakeLock.request("screen");
            } catch(e) {
                console.error(e);
                wakeLock.value = null;
            }
        }
    }

    return { pageView, menuOpen, navMenuOpen, documentMenuOpen, shareSupported,
        wakeLock, wakeLockIcon, wakeLockStatement, navFooterPresent, qrPopup,
        toggleNavMenu, toggleDocumentMenu, closeNavMenu, toggleWakeLock, setQRCodePopup, shareLink, shareFile,
        setEventListeners, removeEventListeners, mountWebData, goToPageSection, scrollToFooter,
        setFlashAnimation, setHeartbeatAnimation, setBounceAnimation, addFlashAnimation, setPulseLoopAnimation
    }
});

/**
 * This function reloads the website.
 */
export function reloadPage() {
    window.location.reload();
}

/**
 * This function returns whether or not the app is rendering on the server or not.
 */
export function checkSSR() {
    return import.meta.env.SSR;
}

/**
 * This function cuts a string to ensure it has the max length of characters.
 */
export function truncate(str = "", maxLength = 80) {
    return ((str.length > maxLength) ? (str.substring(0, (maxLength - 3)) + '...') : str);
}

/**
 * This function sets the initial transition for a Nav Card.
 * @param {String} cardId The element id for the card.
 */
export function setNavCardTransition(cardId = "#ivue-nav-newCard") {
    const navCard = document.getElementById(cardId).classList;
    navCard.add("animate__animated", "animate__jackInTheBox", "animate__slowLess");
    setTimeout(() => { navCard.remove("animate__animated", "animate__jackInTheBox", "animate__slowLess") }, 1500);
}

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 * @param {Boolean} isVisible This must be true for the function to run.
 * @param {Element} target The element gotten from the event.
 */
export function addCardTransition(target, isVisible = true) {
    if(!isVisible) { return; }
    target.classList.add("animate__animated", ((window.innerWidth > 450) ? "animate__zoomIn" : "animate__fadeIn"));
    setTimeout(() => { target.classList.remove("animate__animated", "animate__zoomIn", "animate__fadeIn"); }, 1000);
}

/**
 * This function mounts the website data pinia store on a page.
 */
export function initWebData() {
    useWebsiteDataStore().mountWebData();
}

/**
 * This function sets a bounce animation for any element.
 */
export function setBounceAnimation(event = new MouseEvent("mouseenter")) {
    useWebsiteDataStore().setBounceAnimation(event);
}

/**
 * This function sets a pulse animation for any element for an infinite number of time.
 */
export function setPulseLoopAnimation(event = new MouseEvent("mouseenter")) {
    useWebsiteDataStore().setPulseLoopAnimation(event);
}