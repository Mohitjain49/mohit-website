export const useGamepadStore = defineStore("gamepad-store", () => {
    const router = useRouter();
    const route = useRoute();
    const gamepadConnected = ref(false);

    var gamepadConnectedInterval = null;
    var cursorXInterval = null;
    var cursorYInterval = null;
    var scrollInterval = null;

    /**
     * @type {import('vue').Ref<HTMLButtonElement>} This is the element that the cursor is hovering over that can be clicked on.
     */
    const cursorClickElement = ref(null);
    const showCursor = ref(false);
    const maxCursorSpeed = ref(10);

    const cursorX = ref(0);
    const cursorY = ref(0);

    const customCursor = computed(() => {
        return {
            left: (String(cursorX.value) + "px"),
            top: (String(cursorY.value) + "px")
        }
    });

    const cursorIcon = computed(() => {
        return (cursorClickElement.value != null ? 'fa-hand-pointer' : 'fa-arrow-pointer');
    })

    /**
     * This function starts an interval for checking if any gamepad is connected or not.
     */
    function startGamepadConnectedInterval() {
        if(gamepadConnectedInterval != null) { return; }
        gamepadConnectedInterval = setInterval(() => {
            const gamepads = navigator.getGamepads();
            gamepadConnected.value = Array.from(gamepads).some(gp => gp && gp.connected);
            if(!gamepadConnected.value) { stopGamepadConnectedInterval(); }
        }, 10);
    }

    /**
     * This function stops the interval for checking if any gamepad is connected or not.
     */
    function stopGamepadConnectedInterval() {
        if(gamepadConnectedInterval == null) { return; }
        clearInterval(gamepadConnectedInterval);

        setCustomCursor(false);
        gamepadConnectedInterval = null;
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
     * This finds the element that the cursor is hovering over. If they hover over a button or a link, it returns that element.
     */
    function setCursorClickElement() {
        const foundElement = document.elementFromPoint(cursorX.value, cursorY.value);
        const usuableLink = foundElement?.closest('a');
        const usuableButton = foundElement?.closest('button');

        if(usuableLink) { cursorClickElement.value = usuableLink; }
        else if(usuableButton) { cursorClickElement.value = usuableButton; }
        else { cursorClickElement.value = null; }
    }

    /**
     * This function emits a click event at the cursor's location.
     */
    function emitClick() {
        if(cursorClickElement.value) { cursorClickElement.value.click(); }
    }

    /**
     * This function sets the visibility of the custom cursor.
     * @param {Boolean} reset If true, this function displays the cursor, else it hides the cursor.
     */
    function setCustomCursor(visible = false) {
        document.body.style.cursor = (visible ? "none" : "");
        showCursor.value = visible;
        if(!visible) { cursorClickElement.value = null; }
    }

    /**
     * This function sets the max number of pixels that the cursor can travel per millisecond.
     * @param {Number} maxSpeed The max speed to set the cursor to. Default Value is 10.
     */
    function setMaxCursorSpeed(maxSpeed = 10) {
        maxCursorSpeed.value = maxSpeed;
    }

    /**
     * This function initializes the custom cursor position.
     */
    function initCustomCursorPosition() {
        cursorX.value = (window.innerWidth / 2);
        cursorY.value = (window.innerHeight / 2);
    }

    /**
     * This function manages the custom cursor based on an event.
     */
    function manageCustomCursor(event) {
        if(event.stickMoved !== "left_stick") { return; }
        setCustomCursor(true);

        if(event.axis == 0) {
            cursorX.value += (maxCursorSpeed.value * event.axisMovementValue);
            if(cursorX.value < 30) { cursorX.value = 30; }
            if(cursorX.value > (window.innerWidth - 30)) { cursorX.value = (window.innerWidth - 30); }
        } else {
            cursorY.value += (maxCursorSpeed.value * event.axisMovementValue);
            if(cursorY.value < 30) { cursorY.value = 30; }
            if(cursorY.value > (window.innerHeight - 30)) { cursorY.value = (window.innerHeight - 30); }
        }

        setCursorClickElement();
    }

    /**
     * This function sets the Cursor X Interval.
     * @param {Boolean} negative If true, multiplies the speed by -1.
     */
    function setCursorXInterval(negative = false) {
        if(cursorXInterval != null) { return; }
        setCustomCursor(true);

        cursorXInterval = setInterval(() => {
            cursorX.value += (maxCursorSpeed.value * (negative ? -1 : 1));
            if(cursorX.value < 30) { cursorX.value = 30; }
            if(cursorX.value > (window.innerWidth - 30)) { cursorX.value = (window.innerWidth - 30); }
            setCursorClickElement();
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
            cursorY.value += (maxCursorSpeed.value * (negative ? -1 : 1));
            if(cursorY.value < 30) { cursorY.value = 30; }
            if(cursorY.value > (window.innerHeight - 30)) { cursorY.value = (window.innerHeight - 30); }
            setCursorClickElement();
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
        if(disableScrollYBy()) { return; }
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
        if(scrollInterval != null || disableScrollYBy()) { return; }
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

    /**
     * This returns whether or not to disable vertical scrolling.
     */
    function disableScrollYBy() {
        const path = route.path;
        return (path.includes("resume") || path.includes(FCS_CERTIFICATE_ROUTE));
    }

    return { customCursor, showCursor, cursorIcon, gamepadConnected,
        emitClick, navigatePages, startGamepadConnectedInterval, stopGamepadConnectedInterval,
        setCustomCursor, setMaxCursorSpeed, manageCustomCursor, initCustomCursorPosition,
        setCursorXInterval, setCursorYInterval, stopCursorInterval,
        initScrollYBy, initScrollXBy, setScrollInterval, stopScrollInterval
    }
});