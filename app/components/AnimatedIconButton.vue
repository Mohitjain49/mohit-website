<template>
<component :is="(props.isAnchor ? 'a' : 'button')" ref="animate-icon-on-hover-button">
    <FontAwesomeIcon :icon="iconToDisplay" :[hoverAnimation]="(isHovering && hoverEnabled)" :style="iconSize" />
</component>
</template>

<script setup>
const props = defineProps({
    isAnchor: { type: Boolean, default: false },
    disableHover: { type: Boolean, default: false },
    handleClick: { type: Function, default: (event) => {} },
    faIcon: { type: String, default: "fa-question" },
    hoverAnimation: { type: String, default: "jello" },
    hoverIcon: { type: String, default: "" },
    size: { type: Number, default: -1 }
});

/** @type {AbortController} This is the abort controller that manages stopping the abort controller. */
var eventsAbortController = null;
var checkHoverInterval = null;

/** @type {ShallowRef<HTMLButtonElement | HTMLAnchorElement>} This is the reference variable that represents the icon button. */
const buttonRef = useTemplateRef('animate-icon-on-hover-button');
const { mouseElement } = storeToRefs(useStyleStore());

const eventListenersSet = ref(0);
const isHovering = ref(false);
const hoverEnabled = computed(() => { return !Boolean(props.disableHover); });

/** This sets styles for the icon's size. */
const iconSize = computed(() => {
    if(props.size < 0) { return {}; }
    const sizePx = (String(props.size) + "px");
    return { width: sizePx, height: sizePx }
});

/** This determines what icon to display. */
const iconToDisplay = computed(() => {
    if(isHovering.value && hoverEnabled.value && Boolean(props.hoverIcon) && (props.hoverIcon !== "")) {
        return props.hoverIcon;
    } else {
        return props.faIcon;
    }
});

onMounted(async() => { await setIconButtonEventListeners(); });
onBeforeUnmount(() => { stopIconButtonEventListeners(true); });
watch(buttonRef, () => { resetIconButtonEventListeners(); });

/** This function sets the Icon Button's event listeners. */
async function setIconButtonEventListeners() {
    if(eventListenersSet.value != 0) { return; }
    eventListenersSet.value = 1;

    if(checkButtonNonexistent()) {
        await nextTick();
        if(checkButtonNonexistent()) { return; }
    }

    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;
    const mainButton = buttonRef.value;
    
    mainButton.addEventListener("click", (event) => { props.handleClick(event); }, { signal });
    mainButton.addEventListener("pointerenter", (event) => { onButtonHover(event); }, { signal, passive: true });
    mainButton.addEventListener("pointerleave", (event) => { onButtonHover(event); }, { signal, passive: true });

    // This sets an interval that uses the recorded mouse element to stop the animation if necessary.
    setHoverInterval(true);
    signal.addEventListener("abort", () => { setHoverInterval(false); }, { once: true });
    eventListenersSet.value = 2;
}

/**
 * This function stops all the icon button's event listeners.
 * @param {Boolean} force If true, this will stop the event listeners even if they are not set yet.
 */
function stopIconButtonEventListeners(force = false) {
    if(!force && eventListenersSet.value != 0) { return; }
    isHovering.value = false;

    setHoverInterval(false);
    if(eventsAbortController != null) { eventsAbortController.abort(); }
    eventListenersSet.value = 0;
}

/** This function resets the icon button's event listeners. */
async function resetIconButtonEventListeners() {
    stopIconButtonEventListeners();
    await setIconButtonEventListeners();
}

/** This function returns true if the main button here DOES NOT exist, false otherwise. */
function checkButtonNonexistent() { return (!Boolean(buttonRef.value)); }

/**
 * This function runs when the user either hovers over the button or stops hovering over the button.
 * @param {PointerEvent} event The event to listen to.
 */
function onButtonHover(event) {
    if(!event || event.pointerType !== "mouse") { return; }
    isHovering.value = (event.type === "pointerenter");
}

/**
 * This function sets an interval that uses the recorded mouse element to stop the animation if necessary.
 * @param {Boolean} status The new status of the Hover Interval.
 */
function setHoverInterval(status = false) {
    if(checkHoverInterval != null) { clearInterval(checkHoverInterval); }
    if(status) {
        checkHoverInterval = setInterval(() => {
            const mouseNotOnElement = (checkButtonNonexistent() || !buttonRef.value.contains(mouseElement.value));
            if(mouseNotOnElement) { isHovering.value = false; }
        }, 500);
    } else {
        checkHoverInterval = null;
        isHovering.value = false;
    }
}
</script>