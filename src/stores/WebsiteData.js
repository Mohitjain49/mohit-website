import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

import MJ_Resume from "../assets/documents/Mohit_Jain_Resume.pdf";

export const useWebsiteDataStore = defineStore("WebsiteData", () => {
    const route = useRoute();

    /**
     * An reference integer that determines the Mode of the Nav Bar.
     * If it equals 0, it is on laptop mode, or the screen width is above 800px.
     * If it equals 1, it is on tablet mode, or the screen width is above 600px.
     * If it equals 2, it is on phone mode, or the screen width is at most 600px.
     */
    const pageView = ref(0);
    const sectorTextWidth = ref({ width: "50%" });

    const navBarDropdown = ref(-1);
    const mobileSidebarOpen = ref(false);

    /**
     * This function adds event listeners to the website as soon as its loaded.
     */
    function setEventListeners() {
        resizePageComponents();
        window.addEventListener("resize", () => { resizePageComponents(); });
        setColorKeybind();
    }

    /**
     * This function removes event listeners to the website as soon as its loaded.
     */
    function removeEventListeners() {
        window.removeEventListener("resize", () => { resizePageComponents(); });
        removeColorKeybind();
    }

    /**
     * This runs whenever a page is opened.
     */
    function mountWebData() {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setNavBarDropdown(-1);
    }

    /**
     * This sets which Navigation Bar dropdown is open.
     * @param {Number} newIndex The index of the dropdown.
     */
    function setNavBarDropdown(newIndex = -1) {
        navBarDropdown.value = ((newIndex == navBarDropdown.value) ? -1 : newIndex);
    }

    /**
     * This toggles the status of the mobile sidebar for a skills or experience page.
     */
    function toggleMobileSidebar() {
        mobileSidebarOpen.value = ((pageView.value != 2) ? false : !mobileSidebarOpen.value);
        document.body.style.overflowY = (mobileSidebarOpen.value ? 'hidden' : '');
    }

    /**
     * This closes the mobile sidebar for a skills or experience page.
     */
    function closeMobileSidebar() {
        mobileSidebarOpen.value = false;
        document.body.style.overflowY = '';
    }

    /**
     * This sets the color keybind.
     */
    function setColorKeybind() {
        document.addEventListener("keydown", (event) => {onColorKeybind(event)});
    }

    /**
     * This removes the color keybind.
     */
    function removeColorKeybind() {
        document.removeEventListener("keydown", (event) => {onColorKeybind(event)});
    }

    /**
     * This function runs everytime "Alt + C" is pressed when the Keybind is active.
     */
    function onColorKeybind(event) {
        if(event.altKey && (event.key === "c" || event.key === "C")) {
            setNavBarDropdown(0);
        }
    }

    /**
     * This sets the size of crucial components within the website.
     */
    function resizePageComponents() {
        const largeScreen = ((route.path != "/") ? 1300 : 800);
        const windowWidth = window.innerWidth;
        sectorTextWidth.value.width = ((windowWidth < largeScreen) ? '100%' : '50%');
        
        if(windowWidth <= 600) {
            pageView.value = 2;
        } else if(windowWidth <= 800) {
            pageView.value = 1;
            closeMobileSidebar();
        } else {
            pageView.value = 0;
            closeMobileSidebar();
            if(navBarDropdown.value == 0) { setNavBarDropdown(-1); }
        }
    }

    /**
     * This function downloads my resume for the visitor to see.
     */
    function downloadResume() {
        const link = document.createElement('a');
        link.href = MJ_Resume;
        link.download = 'Mohit_Jain_Resume.pdf';
        link.click();
    }

    return { sectorTextWidth, navBarDropdown, pageView, mobileSidebarOpen,
        setEventListeners, removeEventListeners, mountWebData,
        setNavBarDropdown, toggleMobileSidebar, closeMobileSidebar, downloadResume
    }
});