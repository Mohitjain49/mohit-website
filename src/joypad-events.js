import 'joypad.js';

joypad.set({
    axisMovementThreshold: 0.05,
})

joypad.on("connect", (e) => {
    useGamepadStore().startGamepadConnectedInterval();
    if(import.meta.env.DEV) { console.log(e); }
})

joypad.on("button_press", (e) => {
    const buttonIndex = parseInt(e.detail.buttonName.split('_')[1], 10);
    // if(import.meta.env.DEV) { console.log(buttonIndex); }

    if(buttonIndex == 12 || buttonIndex == 13) {
        useGamepadStore().setCursorYInterval(buttonIndex == 12);
    }
    if(buttonIndex == 14 || buttonIndex == 15) {
        useGamepadStore().setCursorXInterval(buttonIndex == 14);
    }

    if(buttonIndex >= 0 && buttonIndex <= 3) {
        useGamepadStore().emitClick();
    }
    if(buttonIndex == 8 || buttonIndex == 9) {
        useWebsiteDataStore().toggleNavMenu();
        triggerClickSound();
    }

    if(buttonIndex == 5) {
        useGamepadStore().startCursorSpeedInterval(true);
    }
    if(buttonIndex == 4) {
        useGamepadStore().startCursorSpeedInterval(false);
    }

    if(buttonIndex == 7) {
        useAudioStore().setVolumeInterval(1);
    }
    if(buttonIndex == 6) {
        useAudioStore().setVolumeInterval(-1);
    }
});

joypad.on("button_release", (e) => {
    const buttonIndex = parseInt(e.detail.buttonName.split('_')[1], 10);
    // if(import.meta.env.DEV) { console.log(buttonIndex); }

    if(buttonIndex == 12 || buttonIndex == 13) {
        useGamepadStore().stopCursorInterval("y")
    }
    if(buttonIndex == 14 || buttonIndex == 15) {
        useGamepadStore().stopCursorInterval("x")
    }

    if(buttonIndex == 4 || buttonIndex == 5) {
        useGamepadStore().stopCursorSpeedInterval();
    }
    if(buttonIndex == 6 || buttonIndex == 7) {
        useAudioStore().stopVolumeInterval();
    }
});

joypad.on("axis_move", (e) => {
    const event = e.detail;
    // if(import.meta.env.DEV) { console.log(event); }

    if(event.stickMoved === "left_stick") {
        useGamepadStore().manageCustomCursor(event);
    } else if(event.axis == 3) {
        useGamepadStore().initScrollYBy('bottom',
            (30 * event.axisMovementValue)
        );
    }
})