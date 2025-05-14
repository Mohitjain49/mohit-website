import 'joypad.js';

joypad.on("connect", (e) => {
    console.log(e.gamepad);
})

joypad.on("button_press", (e) => {
    let direction = "";
    const buttonName = e.detail.buttonName;
    // console.log(buttonName);

    if(buttonName === "button_12") { direction = "top"; }
    if(buttonName === "button_13") { direction = "bottom"; }
    if(direction !== "") { useGamepadStore().setScrollInterval(direction); }

    if(buttonName === "button_0" || buttonName === "button_1") {
        useGamepadStore().emitClick();
    }
    if(buttonName === "button_8" || buttonName === "button_9") {
        useWebsiteDataStore().toggleNavMenu();
    }

    if(buttonName === "button_5" || buttonName === "button_7") {
        useGamepadStore().navigatePages(true);
    }
    if(buttonName === "button_4" || buttonName === "button_6") {
        useGamepadStore().navigatePages(false);
    }
});

joypad.on("button_release", (e) => {
    const buttonName = e.detail.buttonName;
    // console.log(buttonName);

    if(buttonName === "button_12" || buttonName === "button_13") {
        useGamepadStore().stopScrollInterval();
    }
});

joypad.on("axis_move", (e) => {
    const event = e.detail;
    if(event.stickMoved === "left_stick") {
        useGamepadStore().manageCustomCursor(event);
    } else {
        useGamepadStore().initScrollBy(event.directionOfMovement, 15);
    }
})