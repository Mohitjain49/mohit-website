<template>
<div v-if="showScrollBar" class="fullScreen-scrollBar">
    <button class="top" @click="scrollFsElement(-10)" title="Click Here To Scroll Up!"> <FontAwesomeIcon icon="fa-caret-up" /> </button>
    <div class="fullScreen-scrollBar-body"> <div :class="innerScrollBarClasses" ref="scrollbar-inner" :style="vScrollbarStyle"></div> </div>
    <button class="bottom" @click="scrollFsElement(10)" title="Click Here To Scroll Down!"> <FontAwesomeIcon icon="fa-caret-down" /> </button>
</div>
</template>

<script setup>
const props = defineProps({ fsElementId: { type: String, required: true } });
const { vScrollbarStyle, vertical } = useScrollPercentage(props.fsElementId);
const fullScreenSet = getFullScreenSet();

const interactiveScroll = useTemplateRef('scrollbar-inner');
const { pressed: mousePressed } = useMousePressed({ target: interactiveScroll });
const { y: mouseY } = useMouse();

const showScrollBar = computed(() => { return (fullScreenSet.value && vertical.value.inView < 100); });
const innerScrollBarClasses = computed(() => { return ['inner', (mousePressed.value ? 'active' : '')]; });

watch(mouseY, (newY, oldY) => { if(mousePressed.value) { scrollFsElement(170 / (newY - oldY)); } });
watch(mousePressed, () => { setUserSelect(!mousePressed.value); });
onBeforeUnmount(() => { setUserSelect(true); });

/**
 * This function scrolls within the Full Screen element.
 * @param {Number} divisor The number to divide the full screen element's total height by.
 */
function scrollFsElement(divisor = 10) {
    const element = document.getElementById(props.fsElementId);
    const newValue = (element.scrollTop + (element.scrollHeight / divisor));
    element.scrollTop = Math.max(0, Math.min(element.scrollHeight, newValue));
}

/** This function enables and disables vistors from selecting text on the full screen element. */
function setUserSelect(enable = true) {
    const element = document.getElementById(props.fsElementId);
    if(element) { element.style.userSelect = (enable ? "" : "none"); }
}
</script>

<style scoped>
.fullScreen-scrollBar {
    position: fixed;
    z-index: 15;
    width: 12px;
    height: 200px;
    right: 5px;
    top: calc(50% - 100px);
    background-color: black;
    border: 1px solid white;
    border-radius: 15px;
    overflow: hidden;
}
.fullScreen-scrollBar-body {
    height: calc(100% - 26px);
    width: 100%;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}

.fullScreen-scrollBar-body .inner {
    width: 100% !important;
    background-color: var(--vibrant-flame);
    transition: var(--default-transition);
    position: relative;
    border-radius: 20px;
}
.fullScreen-scrollBar-body .inner.active,
.fullScreen-scrollBar-body .inner:hover {
    background-color: var(--vibrant-flame-dark);
}

.fullScreen-scrollBar button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12px;
    color: white;
    font-size: 12px;
    transition: var(--default-transition);
}
.fullScreen-scrollBar button:hover {
    background-color: #474747;
    color: var(--vibrant-flame);
}

.fullScreen-scrollBar button.top svg {
    position: relative;
    top: 1px;
}
.fullScreen-scrollBar button.bottom svg {
    position: relative;
    bottom: 1px;
}
</style>