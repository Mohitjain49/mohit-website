<template>
<div v-if="showScrollBar" class="mohit-scrollBar">
    <button class="top" @click="scrollFsElement(-10)" title="Click Here To Scroll Up!"> <FontAwesomeIcon icon="fa-caret-up" /> </button>
    <div class="mohit-scrollBar-body"> <div :class="innerScrollBarClasses" ref="scrollbar-inner" :style="vScrollbarStyle"></div> </div>
    <button class="bottom" @click="scrollFsElement(10)" title="Click Here To Scroll Down!"> <FontAwesomeIcon icon="fa-caret-down" /> </button>
</div>
</template>

<script setup>
const props = defineProps({ fsElementId: { type: String, required: true } });
const { vScrollbarStyle, vertical } = useScrollPercentage(props.fsElementId);

const interactiveScroll = useTemplateRef('scrollbar-inner');
const { pressed: mousePressed } = useMousePressed({ target: interactiveScroll, touch: false });
const { y: mouseY } = useMouse();

const showScrollBar = computed(() => { return (vertical.value.inView < 100); });
const innerScrollBarClasses = computed(() => { return ['inner', (mousePressed.value ? 'active' : '')]; });

watch(mouseY, (newY, oldY) => { if(mousePressed.value) { scrollFsElement((window.innerHeight - 26) / (newY - oldY)); } });
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

/**
 * This function enables and disables vistors from selecting text on the full screen element.
 * @warn This has no effect if there isn't a full screen element active.
 * @param {Boolean} enable Whether to enable user text selection or not.
 */
function setUserSelect(enable = true) {
    const element = document.getElementById(props.fsElementId);
    if(element) { element.style.userSelect = (enable ? "" : "none"); }
}
</script>

<style scoped>
.mohit-scrollBar {
    position: fixed;
    z-index: 15;
    width: 12px;
    height: 100%;
    right: 0px;
    top: 0px;
    background-color: black;
    border: 1px solid white;
    border-radius: 0px;
    overflow: hidden;
}
.mohit-scrollBar-body {
    height: calc(100% - 26px);
    width: 100%;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}

.mohit-scrollBar-body .inner {
    width: 100% !important;
    background-color: var(--vibrant-flame);
    transition: var(--default-transition);
    position: relative;
    border-radius: 20px;
}
.mohit-scrollBar-body .inner.active,
.mohit-scrollBar-body .inner:hover {
    background-color: var(--vibrant-flame-dark);
}

.mohit-scrollBar button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12px;
    color: white;
    font-size: 12px;
    transition: var(--default-transition);
}
.mohit-scrollBar button:hover {
    background-color: #474747;
    color: var(--vibrant-flame);
}

.mohit-scrollBar button.top svg {
    position: relative;
    top: 1px;
}
.mohit-scrollBar button.bottom svg {
    position: relative;
    bottom: 1px;
}
</style>