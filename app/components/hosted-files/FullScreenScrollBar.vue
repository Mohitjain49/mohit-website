<template>
<Transition name="fade-exit-transition" fade>
    <div class="mohit-fs-autoscroll-progressBar" v-if="scrollProgress.show">
        <div class="inner" :style="('width:' + scrollProgress.pct + '%')"></div>
    </div>
</Transition>

<div v-show="fsScrollable" :class="mainScrollbarClasses" @contextmenu="(event) => { onScrollBarContextMenu(event); }">
    <button :id="SCROLLBAR_TOP_BUTTON_ID" :class="topArrowClasses" no-sound>
        <FontAwesomeIcon icon="fa-play" :rotation="'270'" />
    </button>
    <div class="mohit-scrollBar-body">
        <div :id="SCROLLBAR_THUMB_ID" :class="thumbClasses" :style="scrollbarThumbStyle"></div>
    </div>
    <button :id="SCROLLBAR_BOTTOM_BUTTON_ID" :class="bottomArrowClasses" no-sound>
        <FontAwesomeIcon icon="fa-play" :rotation="'90'" />
    </button>
</div>
</template>

<script setup>
const SCROLLBAR_THUMB_ID = "fs-scrollbar-thumb";
const SCROLLBAR_TOP_BUTTON_ID = "fs-scrollbar-top-button";
const SCROLLBAR_BOTTOM_BUTTON_ID = "fs-scrollbar-bottom-button";
const NO_OVERFLOW_CLASS = "fullscreen-noOverflow";

const styleStore = useStyleStore();
const scrollStore = useScrollStore();

const { scrollProgress, isScrolling } = storeToRefs(scrollStore);
const { mouseY, onTouchScreen } = storeToRefs(styleStore);

/** @type {AbortController} The Abort controller for this component's events. */
var eventsAbortController = null;
var scrollAnimationFrame = null;
var pointerHoldTimeout = null;
var lastTime = -1;

/** @type {ShallowRef<HTMLElement>} This is the HTML Element in Full Screen Mode. */
const fsElement = shallowRef(null);
const mousePressedOnThumb = ref(false);
const mousePressedOnArrow = ref(0);

const fsScrollable = ref(false);
const fsAtTop = ref(false);
const fsAtBottom = ref(false);
const verticalScrollPercent = ref(0);
const fsClientInView = ref(0);

const props = defineProps({ fsElementId: { type: String, required: true } });
const wholeFileInView = useState("whole-hosted-file-in-view", () => { return false; });

/** This sets the style for the scrollbar's thumb based on how far the user scrolled down. */
const scrollbarThumbStyle = computed(() => {
    const inView = fsClientInView.value;
    const topNum = String(fsScrollable.value ? ((verticalScrollPercent.value / inView) * (100 - inView)) : 0);
    return { height: (inView + "%"), transform: ("translateY(" + topNum + "%)") }
});

const mainScrollbarClasses = computed(() => {
    return ['mohit-scrollBar', (onTouchScreen.value ? 'touch' : '')];
});
const thumbClasses = computed(() => {
    return ['inner', (mousePressedOnThumb.value ? 'active' : ''), (isScrolling.value ? 'is-scrolling' : '')];
});
const topArrowClasses = computed(() => {
    return ['top', ((mousePressedOnArrow.value == -1) ? 'active' : ''), (fsAtTop.value ? 'no-action' : '')];
});
const bottomArrowClasses = computed(() => {
    return ['bottom', ((mousePressedOnArrow.value == 1) ? 'active' : ''), (fsAtBottom.value ? 'no-action' : '')];
});

/** This manages a Raf Loop that sets certain elements in this component given the Full Screen Element's Properties. */
const fsElementDimensionsRaf = useRafFn(() => { onFsElementDimensionsChange(false); }, { immediate: false, fpsLimit: 20 });

/** This watcher watches the mouse Y position so the Full Screen Element can be scrolled on a mouse move. */
watch(mouseY, (newY, oldY) => { scrollFsElementOnMouseMove(newY, oldY); });

// This sets a few variables after the component is mounted.
onAfterMounted(() => {
    removeOverflowClass();
    fsElement.value = getFsElement();

    if(!checkRecordedFsElement()) { throw new Error("Full Screen Element Not Detected."); }
    fsElement.value.scrollTo({ top: 0, left: 0, behavior: "instant" });
    fsElement.value.tabIndex = -1;

    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;

    // This starts a Raf Loop that sets certain elements in this component given the Full Screen Element's Properties.
    onFsElementDimensionsChange(true);
    fsElementDimensionsRaf.resume();
    signal.addEventListener("abort", () => { fsElementDimensionsRaf.pause(); }, { once: true });

    // This section sets up the event listeners so that users can use the scroll bar like a normal website scroll bar.
    const thumbElement = document.getElementById(SCROLLBAR_THUMB_ID);
    const arrowDownElement = document.getElementById(SCROLLBAR_BOTTOM_BUTTON_ID);
    const arrowUpElement = document.getElementById(SCROLLBAR_TOP_BUTTON_ID);

    if(Boolean(thumbElement)) {
        thumbElement.addEventListener("pointerdown", (event) => { onFsThumbDown(event); }, { signal });
    }
    if(Boolean(arrowDownElement)) {
        arrowDownElement.addEventListener("pointerdown", (event) => { onArrowButtonPointerDown(event, "down"); }, { signal });
    }
    if(Boolean(arrowUpElement)) {
        arrowUpElement.addEventListener("pointerdown", (event) => { onArrowButtonPointerDown(event, "up"); }, { signal });
    }

    window.addEventListener("pointerup", (event) => { onFsPointerUp(event); }, { signal });
    window.addEventListener("dragstart", () => { onFsPointerUp("bypass"); }, { signal });
    window.addEventListener("keydown", (event) => { onFsKeydown(event); }, { signal, capture: true });
});

// This unsets a few variables before removing the component.
onBeforeUnmount(() => {
    onFsPointerUp("bypass");
    removeOverflowClass();
    if(eventsAbortController != null) { eventsAbortController.abort(); }
});

/** This function returns the Full Screen element for it to be adjusted by the Full Screen Element. */
function getFsElement() { return document.getElementById(props.fsElementId); }

/** This returns a boolean on whether the Full Screen Element is Present and Connected. */
function checkRecordedFsElement() { return (Boolean(fsElement.value) && Boolean(fsElement.value.isConnected)); }

/**
 * This function scrolls the FS Element when the mouse moves.
 * @param {Number} newY The new Y position of the mouse.
 * @param {Number} oldY The old Y position of the mouse.
 */
function scrollFsElementOnMouseMove(newY = 0, oldY = 0) {
    if(!mousePressedOnThumb.value) { return; }
    if(!checkRecordedFsElement()) { fsElement.value = getFsElement(); }

    const element = (checkRecordedFsElement() ? fsElement.value : getFsElement());
    if(!Boolean(element)) { return; }

    const divisor = ((styleStore.viewportHeight - (26 / styleStore.cssToWindowHeightRatio)) / (newY - oldY));
    const newValue = (element.scrollTop + (element.scrollHeight / divisor));
    element.scrollTop = Math.max(0, Math.min((element.scrollHeight - element.clientHeight), newValue));
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
 * This function runs when the Full Screen Element has a new size.
 * @param {Boolean} firstRun This marks the function as its first time being run for the component.
 */
function onFsElementDimensionsChange(firstRun = false) {
    if(!checkRecordedFsElement()) { fsElement.value = getFsElement(); }
    if(!checkRecordedFsElement()) { return; }

    const fsElementRaw = fsElement.value;
    const clientHeight = fsElementRaw.clientHeight;
    const scrollHeight = fsElementRaw.scrollHeight;
    const scrollTop = fsElementRaw.scrollTop;

    const oldScrollStatus = fsScrollable.value;
    fsScrollable.value = (scrollHeight > clientHeight);
    const diffStatus = ((fsScrollable.value != oldScrollStatus) || firstRun);

    if(fsScrollable.value) {
        if(diffStatus) {
            wholeFileInView.value = false;
            fsElement.value.classList.remove(NO_OVERFLOW_CLASS);
        }

        fsAtTop.value = (scrollTop <= 0);
        fsAtBottom.value = (scrollTop >= (scrollHeight - clientHeight));

        verticalScrollPercent.value = (Math.round((scrollTop * 10000) / (scrollHeight - clientHeight)) / 100);
        fsClientInView.value = (Math.round((clientHeight / scrollHeight) * 10000) / 100);
    } else if(!fsScrollable.value && diffStatus) {
        wholeFileInView.value = true;
        fsElementRaw.classList.add(NO_OVERFLOW_CLASS);

        fsAtTop.value = true;
        fsAtBottom.value = true;

        verticalScrollPercent.value = 0;
        fsClientInView.value = 100;
    }
}

/** This function removes the overflow class for the full screen element. */
function removeOverflowClass() {
    wholeFileInView.value = false;
    const element = getFsElement();
    if(Boolean(element)) { element.classList.remove(NO_OVERFLOW_CLASS); }
}

/** This function has the webpage scroll by an increment each frame while the user presses down an arrow. */
function scrollRepeatedly() {
    const currentTime = performance.now();
    const deltaTime = ((currentTime - lastTime) * 0.8);
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
    focusOnFsElement(event);
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
    focusOnFsElement(event);

    pointerHoldTimeout = setTimeout(() => {
        pointerHoldTimeout = null;
        if(scrollAnimationFrame != null) { cancelAnimationFrame(scrollAnimationFrame); }
        lastTime = performance.now();
        scrollRepeatedly();
    }, 500);
}

/**
 * This function is triggered when the user stops holding down a button on the full screen element.
 * @param {PointerEvent | "bypass"} event The event on holding the button down.
 *  It it is "bypass", the function runs without interruption.
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

/**
 * On a Pointer Down event, this function lets the user focus on the full screen element so keydown events still work.
 * @param {PointerEvent} event The Pointer Down event.
 */
function focusOnFsElement(event = null) {
    if(!Boolean(event)) { return; }
    const element = getFsElement();
    if(!Boolean(element)) { return; }

    element.focus();
    event.preventDefault();
}

/**
 * This function runs when the user right clicks on the scrollbar.
 * @param {PointerEvent} event The event fired with the right click.
 */
function onScrollBarContextMenu(event) {
    if(event && !event.ctrlKey) { event.preventDefault(); }
}
</script>

<style scoped lang="scss">
.mohit-scrollBar {
    position: fixed;
    z-index: 15;
    width: var(--custom-fs-scrollbar-width);
    height: 100%;
    right: 0px;
    top: 0px;
    background-color: #1C1C1C;
    border-radius: 0px;
    overflow: hidden;
}
.mohit-scrollBar.touch {
    background-color: #1C1C1C00;
    width: 10px;
}

.mohit-scrollBar-body {
    height: calc(100% - (var(--custom-fs-scrollbar-width) * 2.67));
    width: 100%;
    padding: 5px 0px;
    position: relative;
}
.mohit-scrollBar.touch .mohit-scrollBar-body {
    height: calc(100% - 10px);
}

.mohit-scrollBar-body .inner {
    width: 60% !important;
    background-color: var(--website-text);
    transition: var(--default-transition);
    position: relative;
    left: 20% !important;
    border-radius: 30px;
}
.mohit-scrollBar.touch .mohit-scrollBar-body .inner {
    opacity: 0;
    transition: opacity 0.1s;
}

.mohit-scrollBar.touch .mohit-scrollBar-body .inner.is-scrolling { opacity: 1; }
.mohit-scrollBar.touch .mohit-scrollBar-body .inner:not(.is-scrolling) { transition: opacity 0.4s; }

.mohit-scrollBar-body .inner.active,
.mohit-scrollBar-body .inner:hover {
    background-color: var(--website-light-text);
}

.mohit-scrollBar.touch button {
    display: none !important;
}
.mohit-scrollBar button {
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: var(--custom-fs-scrollbar-width);
    color: var(--website-text);
    transition: var(--default-transition);
}
.mohit-scrollBar button svg {
    position: relative;
    height: calc(var(--custom-fs-scrollbar-width) * 0.67);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: scale 0.15s;
}

.mohit-scrollBar button.no-action { color: var(--website-text) !important; }
.mohit-scrollBar button:hover, .mohit-scrollBar button.active { color: var(--website-light-text); }

.mohit-scrollBar button.top svg { top: 1px; }
.mohit-scrollBar button.bottom svg { bottom: 1px; }
.mohit-scrollBar button.active svg { scale: 0.8; }

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