<template>
<div v-if="fullScreenSet" class="fullScreen-scrollBar">
    <button class="top" @click="scrollFsElement(true)" title="Click Here To Scroll Up!"> <FontAwesomeIcon icon="fa-caret-up" /> </button>
    <div class="fullScreen-scrollBar-body"> <div class="inner" :style="scrollbarStyle"></div> </div>
    <button class="bottom" @click="scrollFsElement(false)" title="Click Here To Scroll Down!"> <FontAwesomeIcon icon="fa-caret-down" /> </button>
</div>
</template>

<script setup>
const props = defineProps({ fsElementId: { type: String, required: true } });
const fullScreenSet = getFullScreenSet();
const { scrollbarStyle } = useScrollPercentage(props.fsElementId);

/**
 * This function scrolls within the Full Screen element.
 * @param {Boolean} up If true, scrolls up, otherwise it scrolls down.
 */
function scrollFsElement(up) {
    const value = (up ? -30 : 30);
    const element = document.getElementById(props.fsElementId);
    element.scrollTop = Math.max(0, Math.min(element.scrollHeight, (element.scrollTop + value)));
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