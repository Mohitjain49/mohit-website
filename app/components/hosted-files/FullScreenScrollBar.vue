<template>
<Transition name="fade-exit-transition" fade>
    <div class="mohit-fs-autoscroll-progressBar" v-if="scrollProgress.show">
        <div class="inner" :style="('width:' + scrollProgress.pct + '%')"></div>
    </div>
</Transition>

<div v-if="showScrollBar" class="mohit-scrollBar">
    <button :id="SCROLLBAR_TOP_BUTTON_ID" :class="['top', ((mousePressedOnArrow == -1) ? 'active' : ''), (atTop ? 'no-action' : '')]" no-sound>
        <FontAwesomeIcon icon="fa-play" :rotation="'270'" />
    </button>
    <div class="mohit-scrollBar-body">
        <div :id="SCROLLBAR_THUMB_ID" :class="innerScrollBarClasses" :style="vScrollbarStyle"></div>
    </div>
    <button :id="SCROLLBAR_BOTTOM_BUTTON_ID" :class="['bottom', ((mousePressedOnArrow == 1) ? 'active' : ''), (atBottom ? 'no-action' : '')]" no-sound>
        <FontAwesomeIcon icon="fa-play" :rotation="'90'" />
    </button>
</div>
</template>

<script setup>
const SCROLLBAR_THUMB_ID = "fs-scrollbar-thumb";
const SCROLLBAR_TOP_BUTTON_ID = "fs-scrollbar-top-button";
const SCROLLBAR_BOTTOM_BUTTON_ID = "fs-scrollbar-bottom-button";

const styleStore = useStyleStore();
const scrollStore = useScrollStore();

const { scrollProgress } = storeToRefs(scrollStore);
const { mouseY } = storeToRefs(styleStore);

/** @type {AbortController} The Abort controller for this component's events. */
var eventsAbortController = null;
var scrollAnimationFrame = null;
var pointerHoldTimeout = null;
var lastTime = -1;

const mousePressedOnThumb = ref(false);
const mousePressedOnArrow = ref(0);

const props = defineProps({ fsElementId: { type: String, required: true } });
const wholeFileInView = useState("whole-hosted-file-in-view", () => { return false; });
const { vScrollbarStyle, vertical, atTop, atBottom } = useScrollPercentage(props.fsElementId);

const showScrollBar = computed(() => { return (vertical.value.inView < 100); });
const innerScrollBarClasses = computed(() => { return ['inner', (mousePressedOnThumb.value ? 'active' : '')]; });

watch(mouseY, (newY, oldY) => { scrollFsElementOnMouseMove(newY, oldY); });
watch(mousePressedOnThumb, (newValue) => { setUserSelect(newValue); });
watch(showScrollBar, (newValue) => { manageOverflowClass(!newValue); });

// This sets a few variables after the component is mounted.
onAfterMounted(() => {
    manageOverflowClass(!showScrollBar.value);
    getFsElement()?.scrollTo({ top: 0, left: 0, behavior: "instant" });

    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;

    const thumbElement = document.getElementById(SCROLLBAR_THUMB_ID);
    const arrowDownElement = document.getElementById(SCROLLBAR_BOTTOM_BUTTON_ID);
    const arrowUpElement = document.getElementById(SCROLLBAR_TOP_BUTTON_ID);

    if(Boolean(thumbElement)) { thumbElement.addEventListener("pointerdown", (event) => { onFsThumbDown(event); }, { signal }); }
    if(Boolean(arrowDownElement)) { arrowDownElement.addEventListener("pointerdown", (event) => { onArrowButtonPointerDown(event, "down"); }, { signal }); }
    if(Boolean(arrowUpElement)) { arrowUpElement.addEventListener("pointerdown", (event) => { onArrowButtonPointerDown(event, "up"); }, { signal }); }

    window.addEventListener("pointerup", (event) => { onFsPointerUp(event); }, { signal });
    window.addEventListener("keydown", (event) => { onFsKeydown(event); }, { signal })
});

// This unsets a few variables before removing the component.
onBeforeUnmount(() => {
    onFsPointerUp("bypass")
    manageOverflowClass(false);
    if(eventsAbortController != null) { eventsAbortController.abort(); }
});

/** This function returns the Full Screen element for it to be adjusted by the Full Screen Element. */
function getFsElement() { return document.getElementById(props.fsElementId); }

/**
 * This function scrolls within the Full Screen element.
 * @param {Number} divisor The number to divide the full screen element's total height by.
 */
function scrollFsElement(divisor = 10) {
    const element = getFsElement();
    const newValue = (element.scrollTop + (element.scrollHeight / divisor));
    element.scrollTop = Math.max(0, Math.min(element.scrollHeight, newValue));
}

/**
 * This function scrolls the FS Element when the mouse moves.
 * @param {Number} newY The new Y position of the mouse.
 * @param {Number} oldY The old Y position of the mouse.
 */
function scrollFsElementOnMouseMove(newY = 0, oldY = 0) {
    if(!mousePressedOnThumb.value) { return; }
    scrollFsElement((styleStore.viewportHeight - (26 / styleStore.cssToWindowHeightRatio)) / (newY - oldY));
}

/**
 * This function enables and disables vistors from selecting text on the full screen element.
 * @warn This has no effect if there isn't a full screen element active.
 * @param {Boolean} disable Whether to disable user text selection or not.
 */
function setUserSelect(disable = true) {
    styleStore.setDisableUserSelectArray(DisableUserSelect.FS_SCROLL_BAR, disable);
}

/**
 * This function sets a class for a full screen element based on whether there is vertical overflow or not.
 * @param {Boolean} noOverflow The status on whether there is no overflow for the full screen element.
 */
function manageOverflowClass(noOverflow = false) {
    // Also sets the website state variable.
    wholeFileInView.value = noOverflow;

    const element = getFsElement();
    const className = "fullscreen-noOverflow";
    if(element == null) { return; }

    if(noOverflow && !element.classList.contains(className)) {
        element.classList.add(className);
    } else if(!noOverflow) {
        element.classList.remove(className);
    }
}

/** This function has te website scroll by an increment each farme while the user presses down an arrow. */
function scrollRepeatedly() {
    const currentTime = performance.now();
    const deltaTime = ((currentTime - lastTime) * 0.25);
    lastTime = currentTime;

    scrollStore.scrollByIncrement(mousePressedOnArrow.value * deltaTime);
    scrollAnimationFrame = requestAnimationFrame(() => { scrollRepeatedly(); });
}

/**
 * This function is triggered when the user holds down the FS scrollbar thumb.
 * @param {PointerEvent} event The event on holding the button down.
 */
function onFsThumbDown(event) {
    if(!event || event.pointerType !== "mouse") { return; }
    mousePressedOnThumb.value = true;
    setUserSelect(true);
}

/**
 * This function is triggered whenever the user holds down on a arrow key on the pointer event.
 * @param {PointerEvent} event The event by holding down on the arrow button.
 * @param {"up" | "down"} type The direction of the arrow bing held.
 */
function onArrowButtonPointerDown(event, type = "up") {
    if(!event || event.pointerType !== "mouse" || mousePressedOnArrow.value != 0) { return; }
    mousePressedOnArrow.value = ((type === "up") ? -1 : ((type === "down") ? 1 : 0));
    scrollStore.scrollByIncrement((mousePressedOnArrow.value * 40), true);

    pointerHoldTimeout = setTimeout(() => {
        pointerHoldTimeout = null;
        if(scrollAnimationFrame != null) { cancelAnimationFrame(scrollAnimationFrame); }
        lastTime = performance.now();
        scrollRepeatedly();
    }, 500);
}

/**
 * This function is triggered when the user stops holding down a button on the full screen element.
 * @param {PointerEvent | "bypass"} event The event on holding the button down. It it is "bypass", the function runs without interruption.
 */
function onFsPointerUp(event = "bypass") {
    if(event !== "bypass" && (!event || event.pointerType !== "mouse")) { return; }
    mousePressedOnThumb.value = false;
    mousePressedOnArrow.value = 0;

    if(scrollAnimationFrame != null) { cancelAnimationFrame(scrollAnimationFrame); }
    if(pointerHoldTimeout != null) { clearTimeout(pointerHoldTimeout); }

    scrollAnimationFrame = null;
    pointerHoldTimeout = null;
    setUserSelect(false);
}

/**
 * This function runs when the user presses down a key while focused on a Script Line Number.
 * @param {KeyboardEvent} event The event from clicking the button.
 */
function onFsKeydown(event = null) {
    if(!event || !event.key || (mousePressedOnArrow.value == 0 && !mousePressedOnThumb.value)) { return; }
    const key = event.key.toLowerCase();
    if(key === "arrowup" || key === "arrowdown") { event.preventDefault(); }
}
</script>

<style scoped lang="scss">
.mohit-scrollBar {
    position: fixed;
    z-index: 15;
    width: 15px;
    height: 100%;
    right: 0px;
    top: 0px;
    background-color: #1C1C1C;
    border-radius: 0px;
    overflow: hidden;
}

.mohit-scrollBar-body {
    height: calc(100% - 40px);
    width: 100%;
    padding: 5px 0px;
    position: relative;
}
.mohit-scrollBar-body .inner {
    width: 60% !important;
    background-color: var(--website-text);
    transition: var(--default-transition);
    position: relative;
    left: 20% !important;
    border-radius: 30px;
}

.mohit-scrollBar-body .inner.active,
.mohit-scrollBar-body .inner:hover {
    background-color: var(--website-light-text);
}

.mohit-scrollBar button {
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15px;
    color: var(--website-text);
    transition: var(--default-transition);
}
.mohit-scrollBar button svg {
    position: relative;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mohit-scrollBar button.no-action { color: var(--website-text) !important; }
.mohit-scrollBar button:hover, .mohit-scrollBar button.active { color: var(--website-light-text); }

.mohit-scrollBar button.top svg { top: 1px; }
.mohit-scrollBar button.bottom svg { bottom: 1px; }

.mohit-fs-autoscroll-progressBar {
    position: fixed;
    top: 10px;
    right: calc(50% - 102px);
    width: 200px;
    height: 10px;
    background-color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    border: 2px solid white;
    border-radius: 7px;
    box-shadow: 0px 0px 10px 2px black;
    overflow: hidden;
    z-index: 3000;
}
.mohit-fs-autoscroll-progressBar > .inner {
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, white 0%, var(--vibrant-flame) 100%);
}
</style>