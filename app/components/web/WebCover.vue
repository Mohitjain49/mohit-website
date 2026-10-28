<template>
<div ref="mohit-website-cover" class="webpage-cover" :style="webpageCoverStyle">
    <Transition name="fade-transition" appear>
        <div v-if="!showProgressRing" class="webpage-cover-closeMsg"> Hold Cover To Close </div>
    </Transition>
    <Transition name="fade-transition" appear>
        <div v-if="showProgressRing" class="webpage-cover-progressBar">
            <div class="inner" :style="{ 'width': ((counter * 100 / FINAL_COUNT) + '%') }"></div>
        </div>
    </Transition>
</div>

<div v-show="showProgressRing" class="webpage-cover-progressRing-container" :style="progressRingPosition">
    <svg class="webpage-cover-progressRing" viewBox="0 0 30 30">
        <circle class="webpage-cover-progressRing-track" cx="15" cy="15" r="13.5"></circle>
        <circle class="webpage-cover-progressRing-indicator" :style="progressRingInnerFill" cx="15" cy="15" r="13.5"></circle>
    </svg>
    <FontAwesomeIcon icon="fa-xmark" :spinSnap4="animateProgressRing" class="webpage-cover-progressRing-xmark" />
</div>
</template>

<script setup>
const CIRCUMFERENCE = 84.82;
const FINAL_COUNT = 125;

/** @type {AbortController} This manages the event listeners needed for this component. */
var eventsAbortController = null;
var closeInterval = null;

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const props = defineProps({
    zIndex: { type: Number, default: 500 },
    closeWebCover: { type: [Object, Function], default: null }
});

const coverRef = useTemplateRef('mohit-website-cover');
const coverPressed = ref(false);
const counter = ref(0);

const { mouseX: x, mouseY: y, cssToWindowHeightRatio, cssToWindowWidthRatio } = storeToRefs(styleStore);
const webpageCoverStyle = computed(() => { return { zIndex: props.zIndex, touchAction: 'none' } });
const showProgressRing = computed(() => { return (counter.value > 0); });
const animateProgressRing = computed(() => { return (counter.value > (FINAL_COUNT / 4)); });

const progressRingPosition = computed(() => {
    const leftVal = String((x.value - 15) * cssToWindowWidthRatio.value);
    const topVal = String((y.value - 15) * cssToWindowHeightRatio.value);
    return { left: (leftVal + 'px'), top: (topVal + 'px') }
});
const progressRingInnerFill = computed(() => {
    return { strokeDashoffset: (CIRCUMFERENCE - ((counter.value / FINAL_COUNT) * CIRCUMFERENCE)) }
});

// This sets the necessary event listeners for this component.
onAfterMounted(() => {
    if(!Boolean(coverRef.value) || !('PointerEvent' in window)) { return; }
    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;

    document.addEventListener("visibilitychange", () => { resetCounter(); }, { signal, passive: true });
    window.addEventListener("mohit-mouse-leave", () => { resetCounter(); }, { signal, passive: true });
    window.addEventListener("pointerup", () => { resetCounter(); }, { signal, passive: true });
    window.addEventListener("pointercancel", () => { resetCounter(); }, { signal, passive: true });
    coverRef.value.addEventListener("pointerdown", () => { onWebpageCoverPointerDown(); }, { signal, passive: true });
});

// This aborts all the event listeners before the component is unmounted.
onBeforeUnmount(() => {
    setStyles(false);
    resetCounter();
    if(eventsAbortController != null) { eventsAbortController.abort(); }
});

/** This closes any active popup that is on the screen at the moment. */
function closePopup() {
    if(typeof props.closeWebCover === "function") {
        props.closeWebCover();
    } else if(!webData.noMenuOpen) {
        webData.closeNavMenu();
        triggerClickSound();
    } else if(webData.showSharePopupImmediate) {
        webData.setQRCodePopup('quit');
        triggerClickSound();
    }
}

/** This function resets the interval and its counter. */
function resetCounter() {
    coverPressed.value = false;
    counter.value = 0;
    setStyles(false);

    if(closeInterval != null) {
        clearInterval(closeInterval);
        closeInterval = null;
    }
}

/** This function runs whenever the user holds down their pointer on the Webpage Cover. */
function onWebpageCoverPointerDown() {
    if(coverPressed.value) { return; }
    coverPressed.value = true;
    counter.value = 0;

    if(closeInterval != null) { clearInterval(closeInterval); }
    closeInterval = setInterval(() => { onIntervalCallback(); }, 10);
    setStyles(true);

    if(!Boolean(coverRef.value)) { return; }
    coverRef.value.dispatchEvent(new PointerEvent("click", { bubbles: true, cancelable: true }));
}

/**
 * This function sets universal styles that the progress ring needs to be set when active.
 * @param {Boolean} ringActive If true, the ring is active and the styles should be set.
 */
function setStyles(ringActive = true) {
    styleStore.setHideCursorArray(HideCursor.WEBSITE_COVER, ringActive);
    styleStore.setDisableUserSelectArray(DisableUserSelect.WEBSITE_COVER, ringActive);
}

/** This function runs whenever the interval callback is called by the closing interval. */
function onIntervalCallback() {
    counter.value++;
    if(counter.value >= FINAL_COUNT) {
        closePopup();
        resetCounter();
    }
}
</script>

<style scoped lang="scss">
.webpage-cover-progressBar {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 3px;
    background-color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
}
.webpage-cover-progressBar > .inner {
    height: 100%;
    width: 100%;
    background-color: red;
}

.webpage-cover-closeMsg {
    cursor: default;
    position: absolute;
    user-select: none;
    top: 0px;
    left: 0px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: white;
    padding: 5px 0px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.webpage-cover-progressRing-container {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 35px;
    height: 35px;
    transform: rotate(-90deg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: none !important;
    z-index: 10000;
}

.webpage-cover-progressRing {
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border-radius: 15px;
}
.webpage-cover-progressRing-xmark {
    position: relative;
    color: red;
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    --fa-animation-duration: 1.25s;
}

.webpage-cover-progressRing-track {
    fill: none;
    stroke: white;
    stroke-width: 5;
    stroke-linecap: round;
}
.webpage-cover-progressRing-indicator {
    fill: none;
    stroke: red;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 84.82;
    stroke-dashoffset: 84.82;
}
</style>