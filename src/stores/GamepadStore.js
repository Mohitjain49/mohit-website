export const useGamepadStore = defineStore("gamepad-store", () => {
    const router = useRouter();
    const route = useRoute();

    var cursorXInterval = null;
    var cursorYInterval = null;
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
     * This function sets the Cursor X Interval.
     * @param {Boolean} negative If true, multiplies the speed by -1.
     */
    function setCursorXInterval(negative = false) {
        if(cursorXInterval != null) { return; }
        setCustomCursor(true);

        cursorXInterval = setInterval(() => {
            cursorX.value += (5 * (negative ? -1 : 1));
            if(cursorX.value < 30) { cursorX.value = 30; }
            if(cursorX.value > (window.innerWidth - 30)) { cursorX.value = (window.innerWidth - 30); }
        }, 20);
    }

    /**
     * This function sets the Cursor Y Interval.
     * @param {Boolean} negative If true, multiplies the speed by -1.
     */
    function setCursorYInterval(negative = false) {
        if(cursorYInterval != null) { return; }
        setCustomCursor(true);

        cursorYInterval = setInterval(() => {
            cursorY.value += (5 * (negative ? -1 : 1));
            if(cursorY.value < 30) { cursorY.value = 30; }
            if(cursorY.value > (window.innerHeight - 30)) { cursorY.value = (window.innerHeight - 30); }
        }, 20);
    }

    /**
     * This function stops any of the cursor intervals.
     * @param {String} direction If "x", stops the cursor x interval. If "y", stops the cursor y interval.
     */
    function stopCursorInterval(direction = "x") {
        if(direction === "x" && cursorXInterval != null) {
            clearInterval(cursorXInterval);
            cursorXInterval = null;
        } else if(direction === "y" && cursorYInterval != null) {
            clearInterval(cursorYInterval);
            cursorYInterval = null;
        }
    }

    /**
     * This function will scroll on the page vertically depending on which button is held down.
     * @param {String} direction The direction to scroll.
     * @param {Number} speed The number of pixels to scroll.
     */
    function initScrollYBy(direction = 'top', speed = 10) {
        window.scrollBy(window.scrollX, (speed * ((direction === "top") ? -1 : 1)));
    }

    /**
     * This function will scroll on the page horizontally depending on which button is held down.
     * @param {String} direction The direction to scroll.
     * @param {Number} speed The number of pixels to scroll.
     */
    function initScrollXBy(direction = 'left', speed = 10) {
        window.scrollBy((speed * ((direction === "left") ? -1 : 1)), window.scrollY);
    }

    /**
     * Using the directional pad on a controller, this function will create an interval for scrolling on the page.
     * @param {String} direction The direction to scroll.
     */
    function setScrollInterval(direction = 'top') {
        if(scrollInterval != null || route.path.includes("resume")) { return; }
        scrollInterval = setInterval(() => { initScrollYBy(direction, 7); }, 1);
    }

    /**
     * This function stops the scroll interval.
     */
    function stopScrollInterval() {
        if(scrollInterval == null) { return; }
        clearInterval(scrollInterval);
        scrollInterval = null;
    }

    return { customCursor, showCursor, emitClick, navigatePages,
        setCustomCursor, manageCustomCursor, initCustomCursorPosition,
        setCursorXInterval, setCursorYInterval, stopCursorInterval,
        initScrollYBy, initScrollXBy, setScrollInterval, stopScrollInterval
    }
});