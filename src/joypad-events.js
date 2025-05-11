import 'joypad.js';

joypad.on("connect", (e) => {
    console.log(e.gamepad);
})

joypad.on("button_press", (e) => {
    console.log(e.detail);
})