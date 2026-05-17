<template>
<div ref="mohit-website-cover" class="webpage-cover" :style="webpageCoverStyle"></div>
<svg v-if="showProgressRing" class="webpage-cover-progressRing" :style="progressRingPosition" viewBox="0 0 30 30">
    <circle class="webpage-cover-progressRing-track" cx="15" cy="15" r="13.5"></circle>
    <circle class="webpage-cover-progressRing-indicator" :style="progressRingInnerFill" cx="15" cy="15" r="13.5"></circle>
</svg>
<FontAwesomeIcon v-if="showProgressRing" icon="fa-xmark" :beat="(counter > (FINAL_COUNT / 4))"
    class="webpage-cover-progressRing-xmark"
    :style="progressRingXmarkPosition"
/>
</template>

<script setup>
const CIRCUMFERENCE = 84.82;
const FINAL_COUNT = 125;

const webData = useWebsiteDataStore();
const props = defineProps({
    zIndex: { type: Number, default: 500 },
    closeWebCover: { type: [Object, Function], default: null }
});

const coverRef = useTemplateRef('mohit-website-cover');
const { pressed: coverPressed } = useMousePressed({ target: coverRef });
const { isOutside: mouseOutsideCover, x, y } = useMouseInElement(coverRef);

const interval = useInterval(10, { controls: true, immediate: false });
const counter = computed(() => { return interval.counter.value; });
const webpageCoverStyle = computed(() => { return { zIndex: props.zIndex } });

const showProgressRing = computed(() => { return (counter.value > 0); });
const progressRingPosition = computed(() => { return { left: ((x.value - 15) + 'px'), top: ((y.value - 15) + 'px') } });
const progressRingXmarkPosition = computed(() => { return { left: ((x.value - 6) + 'px'), top: ((y.value - 6) + 'px') } });
const progressRingInnerFill = computed(() => { return { strokeDashoffset: (CIRCUMFERENCE - ((counter.value / FINAL_COUNT) * CIRCUMFERENCE)) } });

// This sets the interval counter based on if the user is holding the webpage cover or not.
watch(coverPressed, (newValue) => { if(newValue) { interval.resume(); } else { resetCounter(); } });

// This resets the counter if the user's mouse moves outside the cover;
watch(mouseOutsideCover, (newValue) => { if(newValue) { resetCounter(); } });

// This closes the popup using the webpage cover if the user has clicked on the webpage cover for long enough.
watch(counter, (newValue) => { if(newValue == FINAL_COUNT) { closePopup(); } });

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
.webpage-cover-progressRing {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 30px;
    height: 30px;
    transform: rotate(-90deg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: none;
    user-select: none;
    z-index: 10000;
}
.webpage-cover-progressRing-xmark {
    position: fixed;
    top: 3px;
    left: 3px;
    z-index: 10000;
    color: red;
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: none;
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