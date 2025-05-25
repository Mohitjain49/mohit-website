import 'joypad.js';

joypad.set({
    axisMovementThreshold: 0.05,
})

joypad.on("connect", (e) => {
    useGamepadStore().startGamepadConnectedInterval();
})

joypad.on("button_press", (e) => {
    const buttonIndex = parseInt(e.detail.buttonName.split('_')[1], 10);
    // console.log(buttonIndex);

    if(buttonIndex == 12 || buttonIndex == 13) {
        useGamepadStore().setCursorYInterval(buttonIndex == 12);
    }
    if(buttonIndex == 14 || buttonIndex == 15) {
        useGamepadStore().setCursorXInterval(buttonIndex == 14);
    }

    if(buttonIndex == 0 || buttonIndex == 1) {
        useGamepadStore().emitClick();
    }
    if(buttonIndex == 8 || buttonIndex == 9) {
        useWebsiteDataStore().toggleNavMenu();
    }

    if(buttonIndex == 5 || buttonIndex == 7) {
        useGamepadStore().navigatePages(true);
    }
    if(buttonIndex == 4 || buttonIndex == 6) {
        useGamepadStore().navigatePages(false);
    }
});

joypad.on("button_release", (e) => {
    const buttonIndex = parseInt(e.detail.buttonName.split('_')[1], 10);
    // console.log(buttonIndex);

    if(buttonIndex == 12 || buttonIndex == 13) {
        useGamepadStore().stopCursorInterval("y")
    }
    if(buttonIndex == 14 || buttonIndex == 15) {
        useGamepadStore().stopCursorInterval("x")
    }
});

joypad.on("axis_move", (e) => {
    const event = e.detail;
    // console.log(event);

    if(event.stickMoved === "left_stick") {
        useGamepadStore().manageCustomCursor(event);
    } else if(event.axis == 3) {
        useGamepadStore().initScrollYBy('bottom',
            (30 * event.axisMovementValue)
        );
    }
})