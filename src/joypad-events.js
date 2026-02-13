let prevButtons = [];
let holdTimes = [];

/**
 * This function polls the gamepad each frame to check for if any change occurred on the controller.
 * If something did move, then it releases an event.
 */
function pollGamepad() {
    const gamepads = navigator.getGamepads();
    if(!gamepads) { return };

    for (const gp of gamepads) {
        if(!gp) { continue };

        gp.buttons.forEach((btn, index) => {
            const wasPressed = (prevButtons[gp.index]?.[index] || false);
            const isPressed = btn.pressed;

            // This releases an event for if a button was just pressed.
            if(isPressed && !wasPressed) {
                const event = new CustomEvent("gamepadbuttondown", {
                    detail: new GamepadButtonStatusEvent(gp, index, "down", 0)
                });
                window.dispatchEvent(event);
            }

            // This releases an event for if a button was just released.
            if(!isPressed && wasPressed) {
                const event = new CustomEvent("gamepadbuttonup", {
                    detail: new GamepadButtonStatusEvent(gp, index, "up", -1)
                });
                window.dispatchEvent(event);
            }

            // This releases an event for if a button is being held down.
            if(isPressed && wasPressed) {
                const holdTime = holdTimes[gp.index][index];
                const event = new CustomEvent("gamepadbuttonhold", {
                    detail: new GamepadButtonStatusEvent(gp, index, "hold", holdTime)
                });
                window.dispatchEvent(event);
            }
        });

        // This releases an event every frame a joystick is moving passed the threshold.
        gp.axes.forEach((axis, index) => {
            const eventDetails = new GamepadAxisMoveEvent(gp, index, axis);
            if(!eventDetails.validEvent) { return; }

            const event = new CustomEvent("gamepadaxismove", { detail: eventDetails });
            window.dispatchEvent(event);
        });

        // This sets the current frame button status as the previous buttons for the next frame.
        const newButtons = gp.buttons.map(b => b.pressed);
        prevButtons[gp.index] = newButtons;

        if(!holdTimes[gp.index]) {
            holdTimes[gp.index] = newButtons.map(pressed => { return (pressed ? 0 : 1) })
        } else {
            for(let i = 0; i < newButtons.length; i++) {
                holdTimes[gp.index][i] = (newButtons[i] ? (holdTimes[gp.index][i] + 1) : -1);
            }
        }
    }

    // Loops the function to continue reading the gamepad each frame.
    requestAnimationFrame(pollGamepad);
}

/**
 * This event runs whenever a new gamepad is connected.
 */
window.addEventListener("gamepadconnected", (e) => {
    useGamepadStore().gamepadCursors[e.gamepad.index].start();
    if(import.meta.env.DEV) { console.log(e); }
});

/**
 * This event runs whenever a button is pressed down.
 */
window.addEventListener("gamepadbuttondown", (e) => {
    /** @type {GamepadButtonStatusEvent} */
    const event = e.detail;
    const buttonIndex = event.button;
    const gpIndex = event.gpIndex;
    const gamepadStore = useGamepadStore();
    // if(import.meta.env.DEV) { console.log(buttonIndex); }

    if(buttonIndex >= 12 && buttonIndex <= 15) {
        gamepadStore.getCursor(gpIndex).manageCursorWithDpad(buttonIndex - 12);
    }

    if(buttonIndex == 0 || buttonIndex == 1) { gamepadStore.getCursor(gpIndex).emitClick(); }
    if(buttonIndex == 3 || buttonIndex == 2) { useWebsiteDataStore().scrollToTop(true); triggerClickSound(); }
    if(buttonIndex == 8 || buttonIndex == 9) { gamepadStore.onGamepadMenuClick(); }

    if(buttonIndex == 5) { gamepadStore.getCursor(gpIndex).addToMaxCursorSpeed(1); }
    if(buttonIndex == 4) { gamepadStore.getCursor(gpIndex).addToMaxCursorSpeed(-1); }

    if(buttonIndex == 7) { useAudioStore().addToVolume(1); }
    if(buttonIndex == 6) { useAudioStore().addToVolume(-1); }
});

/**
 * This event runs whenever a button is released.
 */
window.addEventListener("gamepadbuttonup", (e) => {
    /** @type {GamepadButtonStatusEvent} */
    const event = e.detail;
    const buttonIndex = event.button;
    const gpIndex = event.gpIndex;
    const gamepadStore = useGamepadStore();
    // if(import.meta.env.DEV) { console.log(buttonIndex); }

    if(buttonIndex == 6 || buttonIndex == 7) {
        useAudioStore().volumeChangingWithGamepad = false;
    }
    if(buttonIndex == 4 || buttonIndex == 5) {
        gamepadStore.getCursor(gpIndex).stopChangingMaxCursorSpeed();
    }
});

/**
 * This event runs whenever a button is held down during a frame.
 */
window.addEventListener("gamepadbuttonhold", (e) => {
    /** @type {GamepadButtonStatusEvent} */
    const event = e.detail;
    const buttonIndex = event.button;
    const gpIndex = event.gpIndex;
    const holdFrames = event.framesHeld;
    const gamepadStore = useGamepadStore();
    // if(import.meta.env.DEV) { console.log(event); }

    if(buttonIndex >= 12 && buttonIndex <= 15) {
        gamepadStore.getCursor(gpIndex).manageCursorWithDpad(buttonIndex - 12);
    }

    if(event.secondsHeld < 0.8) { return; }
    if(buttonIndex == 5 && holdFrames % 5 == 0) {
        gamepadStore.getCursor(gpIndex).addToMaxCursorSpeed(1);
    }
    if(buttonIndex == 4 && holdFrames % 5 == 0) {
        gamepadStore.getCursor(gpIndex).addToMaxCursorSpeed(-1);
    }

    if(buttonIndex == 7 && holdFrames % 3 == 0) {
        useAudioStore().addToVolume(1);
    }
    if(buttonIndex == 6 && holdFrames % 3 == 0) {
        useAudioStore().addToVolume(-1);
    }
});

/**
 * This event runs whenever a joystick is moved far enough from its initial position.
 */
window.addEventListener("gamepadaxismove", (e) => {
    /** @type {GamepadAxisMoveEvent} */
    const event = e.detail;
    const gpIndex = event.gpIndex;
    const gamepadStore = useGamepadStore();
    // if(import.meta.env.DEV) { console.log(event); }

    if(event.stick === "left_stick") {
        gamepadStore.getCursor(gpIndex).manageCursor(event);
    } else if(event.axisIndex == 3) {
        gamepadStore.getCursor(gpIndex).initScrollYBy('bottom', (30 * event.movement));
    }
});

// Starts the process of sending events.
requestAnimationFrame(pollGamepad);