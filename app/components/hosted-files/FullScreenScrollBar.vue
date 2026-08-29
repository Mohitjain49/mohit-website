<template>
<Transition name="fade-exit-transition" fade>
    <div class="mohit-fs-autoscroll-progressBar" v-if="scrollProgress.show">
        <div class="inner" :style="('width:' + scrollProgress.pct + '%')"></div>
    </div>
</Transition>

<div v-if="showScrollBar" class="mohit-scrollBar">
    <button class="top" @click="scrollFsElement(-10)" title="Click Here To Scroll Up!"> <FontAwesomeIcon icon="fa-caret-up" /> </button>
    <div class="mohit-scrollBar-body"> <div :class="innerScrollBarClasses" ref="scrollbar-inner" :style="vScrollbarStyle"></div> </div>
    <button class="bottom" @click="scrollFsElement(10)" title="Click Here To Scroll Down!"> <FontAwesomeIcon icon="fa-caret-down" /> </button>
</div>
</template>

<script setup>
const styleStore = useStyleStore();
const props = defineProps({ fsElementId: { type: String, required: true } });
const interactiveScroll = useTemplateRef('scrollbar-inner');

const { vScrollbarStyle, vertical } = useScrollPercentage(props.fsElementId);
const { pressed: mousePressed } = useMousePressed({ target: interactiveScroll, touch: false });
const { scrollProgress } = storeToRefs(useScrollStore());
const { mouseY } = storeToRefs(styleStore);

const wholeFileInView = useState("whole-hosted-file-in-view", () => { return false; });
const showScrollBar = computed(() => { return (vertical.value.inView < 100); });
const innerScrollBarClasses = computed(() => { return ['inner', (mousePressed.value ? 'active' : '')]; });

watch(mouseY, (newY, oldY) => { if(mousePressed.value) { scrollFsElement((window.innerHeight - 26) / (newY - oldY)); } });
watch(mousePressed, () => { setUserSelect(mousePressed.value); });
watch(showScrollBar, (newValue) => { manageOverflowClass(!newValue); });

onMounted(() => { manageOverflowClass(!showScrollBar.value); });
onBeforeUnmount(() => { onExitFS(); });

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

/** This function runs when the user exits full screen mode. */
function onExitFS() {
    setUserSelect(false);
    manageOverflowClass(false);
}

/** This function returns the Full Screen element for it to be adjusted by the Full Screen Element. */
function getFsElement() { return document.getElementById(props.fsElementId); }
</script>

<style scoped lang="scss">
.mohit-scrollBar {
    position: fixed;
    z-index: 15;
    width: 12px;
    height: calc(100% - 2px);
    right: 0px;
    top: 0px;
    background-color: black;
    border: 1px solid white;
    border-radius: 0px;
    overflow: hidden;
}
.mohit-scrollBar-replacement {
    position: fixed;
    z-index: 15;
    width: 12px;
    height: calc(100% - 2px);
    right: 0px;
    top: 0px;
    background-color: var(--vibrant-flame);
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