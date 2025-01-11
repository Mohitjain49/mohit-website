import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import MJ_Resume from "../assets/documents/Mohit_Jain_Resume.pdf";

export const useWebsiteDataStore = defineStore("WebsiteData", () => {
    const route = useRoute();

    const colorHandler = ref(new ColorHandler());
    const routeHandler = ref(new RouteHandler());

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
        colorHandler.value.setCurrentNavCards([]);
        colorHandler.value.getStoredColor();
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
            if(navBarDropdown.value == 1) { setNavBarDropdown(-1); }
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

    return { colorHandler, routeHandler, sectorTextWidth, navBarDropdown, pageView, mobileSidebarOpen,
        setEventListeners, removeEventListeners, mountWebData,
        setNavBarDropdown, toggleMobileSidebar, closeMobileSidebar, downloadResume
    }
});

export class ColorHandler {
    /**
     * This class handles the color of this website.
     * This also uses the Web Local Storage class to store which color was previously used.
     */
    constructor() {
        this.PERSONAL_WEBSITE_COLOR_KEY = "A7F9K3M2B8X1Q4L5T2J6N8H9P9J2X6N0M4A1S8E7G3U5R4B1";
        this.color = "Gold/Orange";
        this.currentNavCards = [{ id: "", titleId: "" }];

        Object.freeze(this.COLOR_PRESETS);
        Object.freeze(this.PERSONAL_WEBSITE_COLOR_KEY);
    }

    /**
     * This function sets which colors are used for the app.
     * @param {String} newColor The string that represents the new color of the website and globe.
     */
    setColor(newColor = undefined) {
        if(newColor == undefined) { return; }
        const colorIndex = this.COLOR_PRESETS.findIndex(presetColor => presetColor.name === newColor);

        if(colorIndex != -1) {
            let documentElement = document.body;
            const colorPreset = this.COLOR_PRESETS[colorIndex];

            documentElement.style.setProperty('--website-text', colorPreset.text);
            documentElement.style.setProperty('--website-light-text', colorPreset.lightText);
            documentElement.style.setProperty('--website-gradient-text', colorPreset.gradientText);
            documentElement.style.setProperty('--nav-bar-background', colorPreset.navBarBackground);
            documentElement.style.setProperty('--nav-bar-border', colorPreset.navBarBorder);
            documentElement.style.setProperty('--webpage-background', colorPreset.webBackground);
            documentElement.style.setProperty('--webpage-static-background', colorPreset.webStaticBackground);
            documentElement.style.setProperty('--translucent-background', colorPreset.translucentBackground);
            documentElement.style.setProperty('--sector-background', colorPreset.sectorBackground);
            documentElement.style.setProperty('--footer-text-shadow', colorPreset.footerTextShadow);

            this.color = newColor;
            this.storeColor();

            for(let i = 0; i < this.currentNavCards.length; i++) {
                const currentIds = this.currentNavCards[i];
                this.onNavCardLeave(currentIds.id, currentIds.titleId);
            }
        }
    }

    /**
     * This sets the ids of the current nav cards on the app
     * @param {Array} arrayIds The objects containing the Ids.
     */
    setCurrentNavCards(arrayIds = [{ id: "", titleId: "" }]) {
        this.currentNavCards = arrayIds;
    }

    /**
     * This changes the borders of a nav card when visitors hover over it.
     * @param {String} id The ID of the Nav Card.
     * @param {String} titleId The ID of the Nav Card Title.
     * @param {String} cssColor The CSS color to use.
     */
    onNavCardHover(id, titleId, cssColor) {
        document.getElementById(id).style.borderColor = cssColor;
        document.getElementById(titleId).style.borderColor = cssColor;
    }

    /**
     * This changes the borders of a nav card when visitors leaves it.
     * @param {String} id The ID of the Nav Card.
     * @param {String} titleId The ID of the Nav Card Title.
     */
    onNavCardLeave(id, titleId) {
        let navCard = document.getElementById(id);
        const navBarBorder = getComputedStyle(navCard).getPropertyValue('--nav-bar-border').trim();

        navCard.style.borderColor = navBarBorder;
        document.getElementById(titleId).style.borderColor = navBarBorder;
    }

    /**
     * This properly calls the Web Local Storage "setItem" function.
     */
    storeColor() {
        window.localStorage.setItem(this.PERSONAL_WEBSITE_COLOR_KEY, this.color);
    }

    /**
     * This accesses any stored color and sets it with the app.
     */
    getStoredColor() {
        const storedColor = window.localStorage.getItem(this.PERSONAL_WEBSITE_COLOR_KEY);
        if(storedColor != null) { this.setColor(storedColor); }
    }

    /**
     * If necessary, this will remove the currently stored color.
     */
    removeStoredColor() {
        window.localStorage.removeItem(this.PERSONAL_WEBSITE_COLOR_KEY);
    }

    /**
     * This is an array containing all the color presets for the website.
     */
    COLOR_PRESETS = [
        {
            name: "Gold/Orange",
            cmClass: "navBar-dropdown-opt orangeGold-color-opt",
            text: "rgb(126, 90, 0)",
            lightText: "rgb(198, 147, 19)",
            gradientText: "linear-gradient(to left, rgb(126, 90, 0) 0%, rgb(198, 147, 19) 50%, rgb(126, 90, 0) 100%)",
            navBarBackground: "linear-gradient(to bottom, rgb(255, 115, 0) 0%, rgb(248, 206, 171) 100%)",
            navBarBorder: "rgb(255, 115, 0)",
            webBackground: "linear-gradient(to top, rgb(255, 115, 0) 0%, rgb(248, 206, 171) 100%)",
            webStaticBackground: "rgb(248, 206, 171)",
            translucentBackground: "rgba(255, 255, 255, 0.25)",
            sectorBackground: "rgba(0, 0, 0, 0.05)",
            footerTextShadow: "rgba(0, 0, 0, 0.25)"
        },
        {
            name: "Silver/Blue",
            cmClass: "navBar-dropdown-opt blueSilver-color-opt",
            text: "#d9d8d8",
            lightText: "rgb(155, 156, 160)",
            gradientText: "linear-gradient(to left, #d9d8d8 0%, rgb(155, 156, 160) 50%, #d9d8d8 100%)",
            navBarBackground: "linear-gradient(to bottom, rgb(30, 67, 255) 0%, rgb(80, 152, 230) 100%)",
            navBarBorder: "rgb(0, 110, 255)",
            webBackground: "linear-gradient(to top, rgb(30, 67, 255) 0%, rgb(80, 152, 230) 100%)",
            webStaticBackground: "rgb(80, 152, 230)",
            translucentBackground: "rgba(255, 255, 255, 0.1)",
            sectorBackground: "rgba(0, 0, 0, 0.5)",
            footerTextShadow: "rgba(0, 0, 0, 0.25)"
        },
        {
            name: "Forest",
            cmClass: "navBar-dropdown-opt forest-color-opt",
            text: "rgb(228, 81, 81)",
            lightText: "rgb(163, 216, 1)",
            gradientText: "linear-gradient(to left, rgb(228, 81, 81) 0%, rgb(163, 216, 1) 50%, rgb(228, 81, 81) 100%)",
            navBarBackground: "linear-gradient(to bottom, rgb(47, 170, 47) 0%, rgb(142, 255, 142) 100%)",
            navBarBorder: "rgb(47, 170, 47)",
            webBackground: "linear-gradient(to top, rgb(47, 170, 47) 0%, rgb(142, 255, 142) 100%)",
            webStaticBackground: "rgb(142, 255, 142)",
            translucentBackground: "rgba(255, 255, 255, 0.25)",
            sectorBackground: "rgba(255, 255, 255, 0.15)",
            footerTextShadow: "rgba(0, 0, 0, 0.25)"
        },
        {
            name: "Light",
            cmClass: "navBar-dropdown-opt light-color-opt",
            text: "black",
            lightText: "rgb(150, 150, 150)",
            gradientText: "linear-gradient(to left, black 0%, rgb(150, 150, 150) 50%, black 100%)",
            navBarBackground: "rgb(243, 243, 243)",
            navBarBorder: "black",
            webBackground: "rgb(243, 243, 243)",
            webStaticBackground: "rgb(243, 243, 243)",
            translucentBackground: "rgba(0, 0, 0, 0.25)",
            sectorBackground: "rgba(0, 0, 0, 0.1)",
            footerTextShadow: "rgba(255, 255, 255, 0.5)"
        },
        {
            name: "Dark",
            cmClass: "navBar-dropdown-opt dark-color-opt",
            text: "rgb(150, 150, 150)",
            lightText: "white",
            gradientText: "linear-gradient(to left, rgb(181, 181, 181) 0%, white 50%, rgb(181, 181, 181) 100%)",
            navBarBackground: "rgb(50, 50, 50)",
            navBarBorder: "rgb(150, 150, 150)",
            webBackground: "rgb(50, 50, 50)",
            webStaticBackground: "rgb(50, 50, 50)",
            translucentBackground: "rgba(0, 0, 0, 0.25)",
            sectorBackground: "rgba(0, 0, 0, 0.25)",
            footerTextShadow: "rgba(0, 0, 0, 0.25)"
        }
    ];
}

export class RouteHandler {
    /**
     * This class contains a series a functions for navigating between the different routes.
     * It acts primarily as a wrapper for the Vue Router instance.
     */
    constructor() {
        this.router = useRouter();
        Object.freeze(this.ROUTE_COLLECTION);
    }

    /**
     * This calls the "push" function within the router instance.
     * @param {String} routeStr The path to navigate to. 
     */
    navigateToRoute(routeStr) {
        const routeIndex = this.ROUTE_COLLECTION.findIndex(route => route.path === routeStr);
        if(routeIndex == -1) { return; }
        this.router.push(routeStr);
    }

    /**
     * This navigates to the update indicated by the path.
     * @param {String} versionPath The version path to navigate to.
     */
    navigateToUpdate(versionPath = "home") {
        this.router.push('/updates/' + versionPath);
    }

    /**
     * This navigates to the specific topi the user wants more info on.
     * @param {String} updatePath The update that contains the topic.
     * @param {String} id The id of the main element for this. 
     */
    navigateToUpdateTopic(updatePath = "1-1-0", id = "") {
        this.router.push({ path: ("/updates/" + updatePath), hash: ("#" + id) }).then(() => {
            const logPage = document.getElementById(updatePath);
            const top = (document.getElementById(id).getBoundingClientRect().y + logPage.scrollTop - 55);
            logPage.scrollTo({ top: top, left: 0, behavior: "smooth" });
        });
    }

    /**
     * This is a collection of all the routes in the server
     */
    ROUTE_COLLECTION = [
        { path: "/", title: "Home", classes: "web-navBar-opt" },
        { path: "/skills", title: "Skills", classes: "web-navBar-opt" },
        { path: "/experience", title: "Experience", classes: "web-navBar-opt" },
        { path: "/globe", title: "My Globe", classes: "web-navBar-opt" }
    ]
}