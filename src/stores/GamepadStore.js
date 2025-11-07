export const useGamepadStore = defineStore("gamepad-store", () => {
    const fullScreenStore = useFullScreenStore();
    const showCursorSpeedMenu = ref(false);
    const maxCursorSpeed = ref(10);

    /** These are the gamepad cursors that can be used with the website. */
    const gamepadCursors = [useGamepadCursor(0), useGamepadCursor(1), useGamepadCursor(2), useGamepadCursor(3)];
    const gamepadConnected = computed(() => { return (-1 != gamepadCursors.findIndex(item => item.connected.value)); });
    const cursorVisible = computed(() => { return (-1 != gamepadCursors.findIndex(item => item.showCursor.value)); });

    const cursorElementTitle = computed(() => {
        const index = gamepadCursors.findIndex(item => (item.elementTitle.value !== ""));
        return ((index == -1) ? "" : getCursor(index).elementTitle.value);
    });

    watch(cursorVisible, () => {
        if(checkSSR() || !document) { return; }
        document.body.style.cursor = (cursorVisible.value ? "none" : "");
    });
    watch(maxCursorSpeed, () => {
        for(let i = 0; i < gamepadCursors.length; i++) {
            gamepadCursors[i].setMaxCursorSpeed(maxCursorSpeed.value);
        }
    });

    /**
     * This function sets the max number of pixels that the cursor can travel per millisecond.
     * @param {Number} newMax The max speed to set the cursor to. Default Value is 10.
     */
    function setMaxCursorSpeed(newMax = 10) {
        maxCursorSpeed.value = Math.min(30, Math.max(newMax, 1));
    }

    /**
     * This function adds a value to the total cursor max speed. Use only with Gamepad Event.
     * @param {Number} amount The amount to add to the cursor speed.
     */
    function addToMaxCursorSpeed(amount = 1) {
        showCursorSpeedMenu.value = true;
        setMaxCursorSpeed(maxCursorSpeed.value + amount);
    }

    /** This returns an object representing a gamepad cursor. */
    function getCursor(index) {
        if(index < 0 || index >= gamepadCursors.length) { return null; }
        return gamepadCursors[index];
    }

    /** This function runs whenever the visitor clicks on a typical gamepad menu button. */
    function onGamepadMenuClick() {
        if(fullScreenStore.fullScreenSet && document.fullscreenElement !== document.body) { return; }
        useWebsiteDataStore().toggleNavMenu();
        triggerClickSound();
    }

    /**
     * This function hides all the gamepad cursors on the website.
     */
    function resetCursorPositions() {
        for(let i = 0; i < gamepadCursors.length; i++) {
            gamepadCursors[i].initCursorPosition();
        }
    }

    /**
     * This function hides all the gamepad cursors on the website.
     */
    function hideAllCursors() {
        for(let i = 0; i < gamepadCursors.length; i++) {
            gamepadCursors[i].setCustomCursor(false);
        }
    }

    /**
     * This function fully stops all the gamepad cursors on the website.
     */
    function stopAllCursors() {
        for(let i = 0; i < gamepadCursors.length; i++) {
            gamepadCursors[i].stop();
        }
    }

    return { gamepadCursors, gamepadConnected, cursorElementTitle, maxCursorSpeed, showCursorSpeedMenu,
        getCursor, onGamepadMenuClick, resetCursorPositions, hideAllCursors, stopAllCursors, addToMaxCursorSpeed
    }
});

/**
 * This function creates a Gamepad Cursor object for the Gamepad Store to use.
 * @param {Number} index The index of the gamepad object.
 * @returns {GamepadCursorComposable}
 */
function useGamepadCursor(index = 0) {
    const webData = useWebsiteDataStore();
    const fullScreenStore = useFullScreenStore();
    var cursorAnimationFrameId = null;

    const connected = ref(false);
    const showCursor = ref(false);
    
    const maxSpeed = ref(10);
    const x = ref(0);
    const y = ref(0);

    /** @type {Ref<HTMLElement>} This is the element that the cursor is hovering over that can be clicked on. */
    const clickElement = ref(null);
    const onElement = computed(() => { return (clickElement.value != null); });

    // This detects whether the custom cursor is on an input or text area element.
    const onInputElement = computed(() => {
        const element = clickElement.value;
        return (onElement.value && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement));
    });

    const style = computed(() => { return {
        left: (String(x.value) + "px"),
        top: (String(y.value) + "px"),
        fontSize: (onElement.value ? '32px' : ''),
        color: CUSTOM_CURSOR_COLORS[index]
    }});

    const icon = computed(() => {
        return (onElement.value ? (onInputElement.value ? 'fa-i-cursor' : 'fa-hand-pointer') : 'fa-arrow-pointer');
    });
    const animation = computed(() => {
        return (onElement.value ? ['animate__animated', 'animate__pulse', 'animate__infinite'] : []);
    });
    const elementTitle = computed(() => {
        const element = clickElement.value;
        return (onElement.value ? (element instanceof HTMLAnchorElement ? element.href : element.title) : '');
    });

    /**
     * This function starts animation frames for checking if any gamepad is connected or not.
     */
    function start() {
        if(cursorAnimationFrameId != null) { return; }
        const checkGamepadConnected = () => {
            if(checkGamepadsSupported()) {
                const gamepads = navigator.getGamepads();
                connected.value = (gamepads[index] && gamepads[index].connected);

                if(connected.value) {
                    if(showCursor.value) { setClickElement(); }
                    cursorAnimationFrameId = requestAnimationFrame(checkGamepadConnected);
                } else {
                    stop();
                }
            } else {
                connected.value = false;
                showCursor.value = false;
                stop();
            }
        }
        cursorAnimationFrameId = requestAnimationFrame(checkGamepadConnected);
    }

    /**
     * This function stops the Gamepad Cursor object from updating.
     */
    function stop() {
        if(cursorAnimationFrameId == null) { return; }
        cancelAnimationFrame(cursorAnimationFrameId);

        setCustomCursor(false);
        cursorAnimationFrameId = null;
    }

    /**
     * This function emits a click event at the cursor's location.
     */
    function emitClick() {
        const element = clickElement.value;
        if(element == null) {
            document.body.click(); // Clicks on the document body if there is no button detected.
        } else {
            (onInputElement.value ? element.focus() : element.click());
            triggerClickSound();
            nextTick(() => { setClickElement(); });
        }
    }

    /**
     * This function sets the max number of pixels that the cursor can travel per millisecond.
     * @param {Number} newMax The max speed to set the cursor to. Default Value is 10.
     */
    function setMaxCursorSpeed(newMax = 10) {
        maxSpeed.value = Math.min(30, Math.max(newMax, 1));
    }

    /**
     * This function adds a value to the total cursor max speed. Use only with Gamepad Event.
     * @param {Number} amount The amount to add to the cursor speed.
     */
    function addToMaxCursorSpeed(amount = 1) {
        setMaxCursorSpeed(maxSpeed.value + amount);
    }

    /**
     * This function sets the visibility of the custom cursor.
     * @param {Boolean} reset If true, this function displays the cursor, else it hides the cursor.
     */
    function setCustomCursor(visible = false) {
        // document.body.style.cursor = (visible ? "none" : "");
        showCursor.value = visible;
        if(!visible) { clickElement.value = null; }
    }

    /**
     * This finds the element that the cursor is hovering over.
     */
    function setClickElement() {
        // This section stops the function if the gamepad or cursor is not enabled.
        if(!connected.value || !showCursor.value) {
            clickElement.value = null;
            return;
        }

        // This section finds the clickable element the custom cursor is on.
        const foundElement = document.elementFromPoint((x.value + 15), (y.value + 15));
        const usuableLink = foundElement?.closest('a');
        const usuableButton = foundElement?.closest('button');
        const usuableTextArea = foundElement?.closest('textarea');

        var usuableInput = foundElement?.closest('input');
        usuableInput = ((usuableInput && usuableInput.type !== "range") ? usuableInput : undefined);

        // This section assigns the clickable element to a reference object.
        if(usuableLink) { clickElement.value = usuableLink; }
        else if(usuableButton) { clickElement.value = usuableButton; }
        else if(usuableInput) { clickElement.value = usuableInput; }
        else if(usuableTextArea) { clickElement.value = usuableTextArea; }
        else { clickElement.value = null; }
    }

    /**
     * This function initializes the custom cursor position.
     */
    function initCursorPosition() {
        const xOffset = 30 * ((index % 2 == 1) ? -1 : 1);
        const yOffset = 30 * ((index < 3) ? -1 : 1);

        x.value = (window.innerWidth / 2) + xOffset;
        y.value = (window.innerHeight / 2) + yOffset;
        if(showCursor.value) { setClickElement(); }
    }

    /**
     * This function manages the custom cursor based on an event.
     * @param {GamepadAxisMoveEvent} event The object returned by moving the axis.
     */
    function manageCursor(event) {
        if(event.stick !== "left_stick") { return; }
        setCustomCursor(true);

        if(event.axisIndex == 0) {
            x.value += (maxSpeed.value * event.movement);
            if(x.value < 0) { x.value = 0; }
            if(x.value > (window.innerWidth - 35)) { x.value = (window.innerWidth - 35); }
        } else {
            y.value += (maxSpeed.value * event.movement);
            if(y.value < 0) { y.value = 0; }
            if(y.value > (window.innerHeight - 35)) { y.value = (window.innerHeight - 35); }
        }
        setClickElement();
    }

    /**
     * This function manages the custom cursor based on what button the user pressed on their gamepad.
     * @param {Number} directionIndex The direction to move the cursor based on a number. Up is 0, Down is 1, Left is 2, and Right is 3.
     */
    function manageCursorWithDpad(directionIndex = 0) {
        setCustomCursor(true);
        if(directionIndex > 1) {
            x.value += (maxSpeed.value * ((directionIndex == 2) ? -0.75 : 0.75));
            if(x.value < 0) { x.value = 0; }
            if(x.value > (window.innerWidth - 35)) { x.value = (window.innerWidth - 35); }
        } else {
            y.value += (maxSpeed.value * ((directionIndex == 0) ? -0.75 : 0.75));
            if(y.value < 0) { y.value = 0; }
            if(y.value > (window.innerHeight - 35)) { y.value = (window.innerHeight - 35); }
        }
        setClickElement();
    }

    /**
     * This function will scroll on the page vertically depending on which button is held down.
     * @param {String} direction The direction to scroll.
     * @param {Number} speed The number of pixels to scroll.
     */
    function initScrollYBy(direction = 'top', speed = 10) {
        const scrollElement = getScrollElement();
        const scrollValue = (speed * ((direction === "top") ? -1 : 1));

        if(scrollElement == undefined) {
            window.scrollBy(window.scrollX, scrollValue);
        } else {
            scrollElement.scrollBy(0, scrollValue);
        }
    }

    /**
     * This function checks whether the cursor is in the main navigation menu or not.
     */
    function getScrollElement() {
        if(fullScreenStore.fullScreenSet && document.fullscreenElement.id === "resume-container") {
            return document.fullscreenElement;
        }

        const navMenu = document.getElementById("mohit-navMenu");
        if(!webData.navMenuOpen || navMenu == null) { return undefined; }

        const rect = navMenu.getBoundingClientRect();
        const scrollable = (navMenu.scrollHeight > rect.height);
        if(!scrollable) { return undefined; }

        const xVal = x.value;
        const yVal = y.value;
        return ((xVal >= rect.left && xVal <= rect.right && yVal >= rect.top && yVal <= rect.bottom) ? navMenu : undefined);
    }

    return { index, connected, showCursor, maxSpeed, x, y, clickElement,
        onElement, onInputElement, style, icon, animation, elementTitle,
        start, stop, emitClick, setClickElement, initCursorPosition,
        setMaxCursorSpeed, addToMaxCursorSpeed, setCustomCursor,
        manageCursor, manageCursorWithDpad, initScrollYBy
    }
}

const CUSTOM_CURSOR_COLORS = [
    "#FF4040",
    "#4169E1",
    "#FFBF00",
    "#2E8B57"
];