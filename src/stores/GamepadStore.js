export const useGamepadStore = defineStore("gamepad-store", () => {
    const router = useRouter();
    const route = useRoute();
    var scrollInterval = null;

    const showCursor = ref(false);
    const cursorX = ref(0);
    const cursorY = ref(0);

    const customCursor = computed(() => {
        return {
            left: (String(cursorX.value) + "px"),
            top: (String(cursorY.value) + "px")
        }
    });

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
        setCustomCursor(true);

        if(event.axis == 0) {
            cursorX.value += (5 * event.axisMovementValue);
            if(cursorX.value < 30) { cursorX.value = 30; }
            if(cursorX.value > (window.innerWidth - 30)) { cursorX.value = (window.innerWidth - 30); }
        } else {
            cursorY.value += (5 * event.axisMovementValue);
            if(cursorY.value < 30) { cursorY.value = 30; }
            if(cursorY.value > (window.innerHeight - 30)) { cursorY.value = (window.innerHeight - 30); }
        }
    }

    /**
     * This function sets the visibility of the custom cursor.
     * @param {Boolean} reset If true, this function displays the cursor, else it hides the cursor.
     */
    function setCustomCursor(visible = false) {
        document.body.style.cursor = (visible ? "none" : "");
        showCursor.value = visible;
    }

    /**
     * This function initializes the custom cursor position.
     */
    function initCustomCursorPosition() {
        cursorX.value = (window.innerWidth / 2);
        cursorY.value = (window.innerHeight / 2);
    }

    /**
     * This function emits a click event at the cursor's location.
     */
    function emitClick() {
        const foundElement = document.elementFromPoint(cursorX.value, cursorY.value);
        const usuableElement = foundElement?.closest('a');
        const usuableButton = foundElement?.closest('button');

        if(usuableElement) { usuableElement.click(); }
        if(usuableButton) { usuableButton.click(); }
    }

    /**
     * Using the directional pad on a controller, this function will create an interval for scrolling on the page.
     * @param {String} direction The direction to scroll.
     */
    function setScrollInterval(direction = 'top') {
        if(scrollInterval != null || route.path.includes("resume")) { return; }
        scrollInterval = setInterval(() => { initScrollBy(direction, 7); }, 1);
    }

    /**
     * This function stops the scroll interval.
     */
    function stopScrollInterval() {
        if(scrollInterval == null) { return; }
        clearInterval(scrollInterval);
        scrollInterval = null;
    }

    /**
     * This function will scroll on the page depending on which button is held down.
     * @param {String} direction The direction to scroll.
     * @param {Number} speed The number of pixels to scroll.
     */
    function initScrollBy(direction = 'top', speed = 10) {
        window.scrollBy(0, (speed * ((direction === "top") ? -1 : 1)));
    }

    return { customCursor, showCursor, emitClick, navigatePages,
        setCustomCursor, manageCustomCursor, initCustomCursorPosition,
        initScrollBy, setScrollInterval, stopScrollInterval
    }
});