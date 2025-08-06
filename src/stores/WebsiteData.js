import click_sound from "@/assets/sounds/click_sound_effect.wav";

export const useWebsiteDataStore = defineStore("web-data", () => {
    const controller = new AbortController();
    const gamepadStore = useGamepadStore();
    const documentStore = useDocumentStore();
    const installStore = useInstallStore();
    const audioStore = useAudioStore();

    /**
     * An reference integer that determines the Mode of the Nav Bar.
     * If it equals 0, it is on laptop mode, or the screen width is above 825px.
     * If it equals 1, it is on tablet mode, or the screen width is above 600px.
     * If it equals 2, it is on phone mode, or the screen width is at most 600px.
     */
    const pageView = ref(0);
    const navMenuOpen = ref(false);

    const wakeLockAvailable = ref(false);
    const wakeLock = ref(null);

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

        documentStore.checkTTSAvailable();
        installStore.mountInstallStore();
        resizePageComponents();

        window.addEventListener("resize", () => { resizePageComponents(); }, { signal });
        window.addEventListener("scroll", () => { onWindowScroll(); }, { signal });
        window.addEventListener("mousemove", () => { gamepadStore.setCustomCursor(false); }, { signal });

        document.body.addEventListener("click", onDocumentBodyClick, { signal });
        document.body.addEventListener("mousedown", onDocumentBodyClick, { signal });
        document.body.addEventListener("touchstart", onDocumentBodyClick, { signal });
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
        if(navMenu !== srcElement && !navMenuElements.includes(srcElement)) { closeNavMenu(); }
    }

    /**
     * This function runs whenever the window scroll event is triggered.
     */
    function onWindowScroll() {
        closeNavMenu();
        gamepadStore.setCursorClickElement();
    }

    /**
     * This runs whenever a page is opened.
     */
    function mountWebData() {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
     * The toggles the status of the home navigation menu.
     */
    function toggleNavMenu() {
        navMenuOpen.value = !navMenuOpen.value;
    }

    /**
     * This function closes the Navigation Menu.
     */
    function closeNavMenu() {
        navMenuOpen.value = false;
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

    return { pageView, navMenuOpen, wakeLock, wakeLockIcon, wakeLockStatement,
        toggleNavMenu, closeNavMenu, toggleWakeLock,
        setEventListeners, removeEventListeners, mountWebData, goToPageSection,
        setFlashAnimation, setHeartbeatAnimation, setBounceAnimation,
        addFlashAnimation, setPulseLoopAnimation
    }
});

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