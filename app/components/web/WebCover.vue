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

    <div v-if="showProgressRing" class="webpage-cover-progressRing-container" :style="progressRingPosition">
        <svg class="webpage-cover-progressRing" viewBox="0 0 30 30">
            <circle class="webpage-cover-progressRing-track" cx="15" cy="15" r="13.5"></circle>
            <circle class="webpage-cover-progressRing-indicator" :style="progressRingInnerFill" cx="15" cy="15" r="13.5"></circle>
        </svg>
        <FontAwesomeIcon icon="fa-xmark" :beat="(counter > (FINAL_COUNT / 4))" class="webpage-cover-progressRing-xmark" />
    </div>
</div>
</template>

<script setup>
const CIRCUMFERENCE = 84.82;
const FINAL_COUNT = 125;

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const props = defineProps({
    zIndex: { type: Number, default: 500 },
    closeWebCover: { type: [Object, Function], default: null }
});

const coverRef = useTemplateRef('mohit-website-cover');
const { pressed: coverPressed } = useMousePressed({ target: coverRef });
const { isOutside: mouseOutsideCover } = useMouseInElement(coverRef);
const { x, y } = useMouse({ type: 'client' });

const interval = useInterval(10, { controls: true, immediate: false });
const { cssToWindowHeightRatio, cssToWindowWidthRatio } = useMohitWindowSize();

const counter = computed(() => { return interval.counter.value; });
const showProgressRing = computed(() => { return (counter.value > 0); });
const webpageCoverStyle = computed(() => { return { zIndex: props.zIndex } });

const progressRingPosition = computed(() => {
    const leftVal = String((x.value - 15) * cssToWindowWidthRatio.value);
    const topVal = String((y.value - 15) * cssToWindowHeightRatio.value);
    return { left: (leftVal + 'px'), top: (topVal + 'px') }
});
const progressRingInnerFill = computed(() => {
    return { strokeDashoffset: (CIRCUMFERENCE - ((counter.value / FINAL_COUNT) * CIRCUMFERENCE)) }
});

// This sets the interval counter based on if the user is holding the webpage cover or not.
watch(coverPressed, (newValue) => { if(newValue) { interval.resume(); } else { resetCounter(); } });

// This resets the counter if the user's mouse moves outside the cover;
watch(mouseOutsideCover, (newValue) => { if(newValue) { resetCounter(); } });

// This closes the popup using the webpage cover if the user has clicked on the webpage cover for long enough.
watch(counter, (newValue) => { if(newValue == FINAL_COUNT) { closePopup(); } });

// This disables user select whenever the progress ring is open.
watch(showProgressRing, (newValue) => { styleStore.setDisableUserSelectArray(1, newValue); });
onBeforeUnmount(() => { styleStore.setDisableUserSelectArray(1, false); });

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
    interval.reset();
    interval.pause();
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
    position: absolute;
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
}
.webpage-cover-progressRing-xmark {
    position: relative;
    color: red;
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    --fa-animation-duration: 0.25s;
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