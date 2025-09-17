export const useGamepadStore = defineStore("gamepad-store", () => {
    const docStore = useDocumentStore();
    const route = useRoute();

    const gamepadConnected = ref(false);
    const showCursorSpeedMenu = ref(false);

    var gamepadConnectedInterval = null;
    var scrollInterval = null;

    /**
     * @type {import('vue').Ref<HTMLElement>} This is the element that the cursor is hovering over that can be clicked on.
     */
    const cursorClickElement = ref(null);
    const cursorOnInput = ref(false);

    const showCursor = ref(false);
    const maxCursorSpeed = ref(10);

    const cursorX = ref(0);
    const cursorY = ref(0);

    const customCursor = computed(() => {
        return {
            left: (String(cursorX.value) + "px"),
            top: (String(cursorY.value) + "px"),
            fontSize: ((cursorClickElement.value != null) ? '32px' : ''),
        }
    });

    const cursorIcon = computed(() => {
        return ((cursorClickElement.value != null) ? (cursorOnInput.value ? 'fa-i-cursor' : 'fa-hand-pointer') : 'fa-arrow-pointer');
    });
    const cursorAnimation = computed(() => {
        return ((cursorClickElement.value != null) ? ['animate__animated', 'animate__pulse', 'animate__infinite'] : []);
    });
    const cursorElementTitle = computed(() => {
        return ((cursorClickElement.value != null) ?
            (cursorClickElement.value instanceof HTMLAnchorElement ? cursorClickElement.value.href : cursorClickElement.value.title)
            : ''
        );
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
     * This finds the element that the cursor is hovering over. If they hover over a button or a link, it returns that element.
     */
    function setCursorClickElement() {
        const foundElement = document.elementFromPoint((cursorX.value + 15), (cursorY.value + 15));
        const usuableLink = foundElement?.closest('a');
        const usuableButton = foundElement?.closest('button');
        const usuableTextArea = foundElement?.closest('textarea');

        var usuableInput = foundElement?.closest('input');
        usuableInput = ((usuableInput && usuableInput.type !== "range") ? usuableInput : undefined);
        cursorOnInput.value = Boolean(usuableInput || usuableTextArea);

        if(usuableLink) { cursorClickElement.value = usuableLink; }
        else if(usuableButton) { cursorClickElement.value = usuableButton; }
        else if(usuableInput) { cursorClickElement.value = usuableInput; }
        else if(usuableTextArea) { cursorClickElement.value = usuableTextArea; }
        else { cursorClickElement.value = null; }
    }

    /**
     * This function emits a click event at the cursor's location.
     */
    function emitClick() {
        const element = cursorClickElement.value;
        if(!element) { return; }

        (cursorOnInput.value ? element.focus() : element.click());
        triggerClickSound();
        nextTick(() => { setCursorClickElement(); });
    }

    /**
     * This function sets the max number of pixels that the cursor can travel per millisecond.
     * @param {Number} maxSpeed The max speed to set the cursor to. Default Value is 10.
     */
    function setMaxCursorSpeed(maxSpeed = 10) {
        maxCursorSpeed.value = Math.min(30, Math.max(maxSpeed, 1));
    }

    /**
     * This function adds a value to the total cursor max speed. Use only with Gamepad Event.
     * @param {Number} amount The amount to add to the cursor speed.
     */
    function addToMaxCursorSpeed(amount = 1) {
        showCursorSpeedMenu.value = true;
        setMaxCursorSpeed(maxCursorSpeed.value + amount);
    }

    /**
     * This function sets the visibility of the custom cursor.
     * @param {Boolean} reset If true, this function displays the cursor, else it hides the cursor.
     */
    function setCustomCursor(visible = false) {
        document.body.style.cursor = (visible ? "none" : "");
        showCursor.value = visible;

        if(!visible) {
            cursorClickElement.value = null;
            cursorOnInput.value = false;
        }
    }

    /**
     * This function initializes the custom cursor position.
     */
    function initCustomCursorPosition() {
        cursorX.value = (window.innerWidth / 2);
        cursorY.value = (window.innerHeight / 2);
        if(showCursor.value) { setCursorClickElement(); }
    }

    /**
     * This function manages the custom cursor based on an event.
     * @param {GamepadAxisMoveEvent} event The object returned by moving the axis.
     */
    function manageCustomCursor(event) {
        if(event.stick !== "left_stick") { return; }
        setCustomCursor(true);

        if(event.axisIndex == 0) {
            cursorX.value += (maxCursorSpeed.value * event.movement);
            if(cursorX.value < 0) { cursorX.value = 0; }
            if(cursorX.value > (window.innerWidth - 35)) { cursorX.value = (window.innerWidth - 35); }
        } else {
            cursorY.value += (maxCursorSpeed.value * event.movement);
            if(cursorY.value < 0) { cursorY.value = 0; }
            if(cursorY.value > (window.innerHeight - 35)) { cursorY.value = (window.innerHeight - 35); }
        }
        setCursorClickElement();
    }

    /**
     * This function manages the custom cursor based on what button the user pressed on their gamepad.
     * @param {Number} directionIndex The direction to move the cursor based on a number. Up is 0, Down is 1, Left is 2, and Right is 3.
     */
    function manageCustomCursorWithDpad(directionIndex = 0) {
        setCustomCursor(true);
        if(directionIndex > 1) {
            cursorX.value += (maxCursorSpeed.value * ((directionIndex == 2) ? -0.75 : 0.75));
            if(cursorX.value < 0) { cursorX.value = 0; }
            if(cursorX.value > (window.innerWidth - 35)) { cursorX.value = (window.innerWidth - 35); }
        } else {
            cursorY.value += (maxCursorSpeed.value * ((directionIndex == 0) ? -0.75 : 0.75));
            if(cursorY.value < 0) { cursorY.value = 0; }
            if(cursorY.value > (window.innerHeight - 35)) { cursorY.value = (window.innerHeight - 35); }
        }
        setCursorClickElement();
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
        return ((path.includes("resume") || path.includes(FCS_CERTIFICATE_ROUTE)) &&
            (docStore.checkGoogleDocRoute() || docStore.checkPDFRoute())
        );
    }

    return { customCursor, showCursor, cursorIcon, cursorAnimation, cursorElementTitle,
        maxCursorSpeed, showCursorSpeedMenu, gamepadConnected,
        emitClick, startGamepadConnectedInterval, stopGamepadConnectedInterval,
        setCustomCursor, setCursorClickElement, setMaxCursorSpeed, addToMaxCursorSpeed,
        manageCustomCursor, manageCustomCursorWithDpad, initCustomCursorPosition,
        initScrollYBy, initScrollXBy, setScrollInterval, stopScrollInterval
    }
});