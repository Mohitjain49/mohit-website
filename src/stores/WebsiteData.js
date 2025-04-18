import MJ_Resume from "/Mohit_Jain_Resume.pdf";

export const useWebsiteDataStore = defineStore("WebsiteData", () => {
    /**
     * An reference integer that determines the Mode of the Nav Bar.
     * If it equals 0, it is on laptop mode, or the screen width is above 825px.
     * If it equals 1, it is on tablet mode, or the screen width is above 600px.
     * If it equals 2, it is on phone mode, or the screen width is at most 600px.
     */
    const pageView = ref(0);
    const navMenuOpen = ref(false);

    /**
     * This function adds event listeners to the website as soon as its loaded.
     */
    function setEventListeners() {
        resizePageComponents();
        window.addEventListener("resize", () => { resizePageComponents(); });
        document.body.addEventListener("click", onDocumentBodyClick);
    }

    /**
     * This function removes event listeners to the website as soon as its loaded.
     */
    function removeEventListeners() {
        window.removeEventListener("resize", () => { resizePageComponents(); });
        document.body.removeEventListener("click", onDocumentBodyClick);
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
        navMenuOpen.value = ((pageView.value == 0) ? false : !navMenuOpen.value);
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
     * This sets the size of crucial components within the website.
     */
    function resizePageComponents() {
        const windowWidth = window.innerWidth;
        
        if(windowWidth <= 600) {
            pageView.value = 2;
        } else if(windowWidth <= 825) {
            pageView.value = 1;
        } else {
            pageView.value = 0;
            closeNavMenu();
        }
    }

    /**
     * This function closes the Nav Menu if the user clicks anywheere on the screen that isn't the Navigation bar.
     * @param event The event.
     */
    function onDocumentBodyClick(event = new MouseEvent("click")) {
        const navMenu = document.getElementById("mohit-navBar");
        const navMenuElements = Array.from(navMenu.querySelectorAll('*'));
        const srcElement = event.target;

        if(navMenu === srcElement || navMenuElements.includes(srcElement)) { return; }
        closeNavMenu();
    }

    return { pageView, navMenuOpen, toggleNavMenu, closeNavMenu,
        setEventListeners, removeEventListeners, mountWebData, goToPageSection,
        setFlashAnimation, setHeartbeatAnimation, setBounceAnimation,
        addFlashAnimation, setPulseLoopAnimation
    }
});

/**
 * This function mounts the website data pinia store on a page.
 */
export function initWebData() {
    useWebsiteDataStore().mountWebData();
}

/**
 * This function downloads my resume for the visitor to see.
 */
export function downloadResume() {
   const link = document.createElement('a');
   link.href = MJ_Resume;
   link.download = 'Mohit_Jain_Resume.pdf';
   link.click();
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