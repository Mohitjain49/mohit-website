export const useGamepadStore = defineStore("gamepad-store", () => {
    const router = useRouter();
    const route = useRoute();
    var scrollInterval = null;

    const customCursor = ref({
        display: "none",
        left: "0px", top: "0px"
    });

    /**
     * This converts any number to pixels that can be used by HTML elements.
     * @param {Number} num The number to convert.
     */
    function convertNumToPixels(num = 0) {
        return (String(num) + "px");
    }

    /**
     * This function moves onto the next page.
     * @param {Boolean} forward If true, moves onto the next page.
     */
    function navigatePages(forward = true) {
        const NAV_PAGES = ["/", "/skills", "/experience", "/projects", "/resume", "/contact", "/qrcode"];
        const currentPath = NAV_PAGES.findIndex((navPath) => (navPath === route.path || (navPath + "/") === route.path));
        const lastIndex = (NAV_PAGES.length - 1);

        var navIndex = 0;
        if(forward) {
            navIndex = ((currentPath == lastIndex) ? 0 : currentPath + 1);
        } else {
            navIndex = ((currentPath == 0) ? lastIndex : currentPath - 1);
        }

        if(currentPath == -1) { navIndex = 0; }
        router.push(NAV_PAGES[navIndex]);
    }

    /**
     * This function manages the custom cursor based on an event.
     */
    function manageCustomCursor(event) {
        if(event.stickMoved !== "left_stick") { return; }
        document.body.style.cursor = "none";
        customCursor.value.display = "block";

        customCursor.value.left = convertNumToPixels(window.innerWidth / 2);
        customCursor.value.top = convertNumToPixels(window.innerHeight / 2);
    }

    /**
     * This function hides the Custom Cursor.
     */
    function hideCustomCursor() {
        customCursor.value = { display: "none", left: "0px", top: "0px" };
        document.body.style.cursor = "";
    }

    /**
     * Using the directional pad on a controller, this function will scroll on the page depending on which button is held down.
     * @param {String} direction The direction to scroll.
     */
    function setScrollInterval(direction = 'up') {
        if(scrollInterval != null || route.path.includes("resume")) { return; }
        scrollInterval = setInterval(() => {
            window.scrollBy(0, ((direction === "up") ? -10 : 10));
        }, 1);
    }

    /**
     * This function stops the scroll interval.
     */
    function stopScrollInterval() {
        if(scrollInterval == null) { return; }
        clearInterval(scrollInterval);
        scrollInterval = null;
    }

    return { customCursor,
        navigatePages, manageCustomCursor, hideCustomCursor,
        setScrollInterval, stopScrollInterval
    }
});