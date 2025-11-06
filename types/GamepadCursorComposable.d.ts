export {}

declare global {
    interface GamepadCursorComposable {
        /** The index of the gamepad being used. */
        index: number;

        /** Whether a gamepad is connected. */
        connected: Ref<boolean>;

        /** Whether the custom cursor is visible. */
        showCursor: Ref<boolean>;

        /** Max cursor movement speed (pixels per ms). */
        maxSpeed: Ref<number>;

        /** Cursor X position in pixels. */
        x: Ref<number>;

        /** Cursor Y position in pixels. */
        y: Ref<number>;

        /** The element currently hovered by the cursor (or null). */
        clickElement: Ref<HTMLElement | null>;

        /** Whether the cursor is hovering any clickable element. */
        onElement: ComputedRef<boolean>;

        /** Whether the cursor is over an input or textarea element. */
        onInputElement: ComputedRef<boolean>;

        /** Inline CSS style for cursor positioning. */
        style: ComputedRef<Record<string, string>>;

        /** FontAwesome icon class for cursor shape. */
        icon: ComputedRef<string>;

        /** CSS animation class names. */
        animation: ComputedRef<string[]>;

        /** Title or href of the hovered element. */
        elementTitle: ComputedRef<string>;

        /** Start checking for gamepad connections and cursor updates. */
        start: () => void;

        /** Stop updating the gamepad cursor. */
        stop: () => void;

        /** Emit a click at the cursor’s current position. */
        emitClick: () => void;

        /** Set the maximum cursor movement speed. */
        setMaxCursorSpeed: (newMax?: number) => void;

        /** Add to the current maximum cursor speed. */
        addToMaxCursorSpeed: (amount?: number) => void;

        /** Show or hide the custom cursor. */
        setCustomCursor: (visible?: boolean) => void;

        /** Update which element is currently under the cursor. */
        setClickElement: () => void;

        /** Initialize cursor position on screen. */
        initCursorPosition: () => void;

        /** Move the cursor based on analog stick movement. */
        manageCursor: (event: GamepadAxisMoveEvent) => void;

        /** Move the cursor using the D-pad. */
        manageCursorWithDpad: (directionIndex?: number) => void;

        /** Scroll vertically depending on held button direction. */
        initScrollYBy: (direction?: string, speed?: number) => void;
    }
}