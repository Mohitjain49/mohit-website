/** This function returns whether the Web Gamepad API is supported or not. */
export function checkGamepadsSupported() {
    return Boolean((typeof navigator !== 'undefined') && (typeof navigator.getGamepads === 'function'));
}

export const leftAxisMovementThreshold = ref(0.05);
export const rightAxisMovementThreshold = ref(0.05);
export const fps = useFps();

/**
 * This function changes a specified threshold where joystick movements are recorded.
 * @param {Number} newValue The new value. It must be between 0 and 1, and setting this to 1 disables the Gamepad Joysticks.
 * @param {Boolean} left If true, changes the left axis threshold,otherwise it changes the right axis threshold.
 */
export function changeAxisMovementThreshold(newValue = 0.05, left = true) {
    newValue = Math.min(1, Math.max(0, newValue));
    if(left) {
        leftAxisMovementThreshold.value = newValue;
    } else {
        rightAxisMovementThreshold.value = newValue;
    }
}

/**
 * This class represents a event that indicates the current state of a button on a connected gamepad.
 */
export class GamepadButtonStatusEvent {
    /**
     * @param {Gamepad} gamepad The gamepad where the button originates from.
     * @param {Number} buttonIndex The index of the button on the gamepad relative to other buttons.
     * @param {String} status The string that represents the status of a button on a gamepad.
     * @param {Number} holdFrames The number of frames the button was held down. 
     */
    constructor(gamepad, buttonIndex = -1, status = "down", holdFrames = 0) {
        this.gamepad = gamepad;
        this.button = buttonIndex;
        this.status = status;
        this.framesHeld = holdFrames;
        this.secondsHeld = ((holdFrames < 1) ? 0 :  Number((this.framesHeld / fps.value).toFixed(4)));
    }
}

/**
 * This class represents a event that indicates when a joystick is moving on a connected gamepad.
 */
export class GamepadAxisMoveEvent {
    /**
     * @param {Gamepad} gamepad The gamepad where the button originates from.
     * @param {Number} index The index of the axis on the gamepad relative to the other axes.
     * @param {Number} movement A number that represents the amount the joystick moved from its original position.
     */
    constructor(gamepad, index = -1, movement = 0) {
        this.gamepad = gamepad;
        this.axisIndex = index;
        this.movement = movement;
        this.stick = ((index < 2) ? 'left_stick' : 'right_stick');

        const leftStickInvalid = (this.stick === "left_stick" && (this.movement <= leftAxisMovementThreshold.value && this.movement >= -leftAxisMovementThreshold.value));
        const rightStickInvalid = (this.stick === "right_stick" && (this.movement <= rightAxisMovementThreshold.value && this.movement >= -rightAxisMovementThreshold.value));
        this.validEvent = !(leftStickInvalid || rightStickInvalid);
    }
}