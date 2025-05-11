import 'joypad.js';
import { useGamepadStore } from './stores/GamepadStore.js';

joypad.on("connect", (e) => {
    console.log(e.gamepad);
})

joypad.on("button_press", (e) => {
    let direction = "";
    const buttonName = e.detail.buttonName;

    if(buttonName === "button_12") { direction = "up"; }
    if(buttonName === "button_13") { direction = "down"; }
    if(direction !== "") { useGamepadStore().setScrollInterval(direction); }

    if(buttonName === "button_8" || buttonName === "button_9") {
        useWebsiteDataStore().toggleNavMenu();
    }
})

joypad.on("button_release", (e) => {
    // console.log(e.detail);
    const buttonName = e.detail.buttonName;

    if(buttonName === "button_12" || buttonName === "button_13") {
        useGamepadStore().stopScrollInterval();
    }
})