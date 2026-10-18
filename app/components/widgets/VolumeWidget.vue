<script setup>
const audioStore = useAudioStore();
const { volumeInput, volumeInputAsNum } = storeToRefs(audioStore);

const numDigits = computed(() => { return volumeInput.value.length; });
const textWidth = computed(() => { return { width: (String(parseInt(13 + (numDigits.value * 10))) + "px") }});
const barWidth = computed(() => { return { width: (String(parseInt(200 - (numDigits.value * 10))) + "px") }});

const barBallPosition = computed(() => {
    const leftStr = (volumeInputAsNum.value * (0.95 + (volumeInputAsNum.value * 0.00075)));
    return { left: "calc(" + String(leftStr) + "% - 10px)" }
});
</script>

<template>
<Transition name="volume-widget-transition" appear>
    <div class="mohit-volume-widget" v-if="audioStore.showVolumeWidget">
        <div class="left-icon"> <FontAwesomeIcon :icon="audioStore.volumeInputIcon" /> </div>
        <div class="mohit-volume-input-section" :style="barWidth">
            <div class="inner-ball" :style="barBallPosition"></div>
            <div class="inner" :style="{ width: (volumeInput + '%') }"></div>
        </div>
        <span :style="textWidth"> {{ (volumeInput + '%') }} </span>
    </div>
</Transition>
</template>

<style scoped lang="scss">
.mohit-volume-widget {
    overflow: hidden;
    position: fixed;
    top: 15px;
    left: calc(50% - 140px);
    height: 36px;
    width: 276px;
    z-index: 9000;
    background-color: var(--blue-one);
    border: 2px solid var(--blue-cobalt);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px var(--blue-zero);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.mohit-volume-input-section {
    position: relative;
    width: 170px;
    height: 8px;
    background-color: black;
    border-radius: 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
}
.mohit-volume-input-section .inner {
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--blue-three);
    box-shadow: 0px 0px 7px 1px black;
    border-radius: 4px;
}
.mohit-volume-input-section .inner-ball {
    position: absolute;
    z-index: 5;
    left: 0px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: white;
}

.mohit-volume-widget .left-icon {
    font-size: 15px;
    margin-right: 12px;
    width: 25px;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    position: relative;
    bottom: 0.5px;
    color: inherit;
}
.mohit-volume-widget span {
    position: relative;
    bottom: 0.5px;
    cursor: default;
    user-select: none;
    font-family: 'Lexend', sans-serif;
    font-size: 15px;
    width: 40px;
    margin-left: 15px;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: inherit;
}

.volume-widget-transition-enter-active {
    transition: opacity 0.25s, transform 0.25s;
}
.volume-widget-transition-leave-active {
    transition: opacity 0.75s, transform 0.75s;
}
.volume-widget-transition-enter-from, .volume-widget-transition-leave-to {
    opacity: 0;
    transform: translateY(-85px);
}
.volume-widget-transition-enter-to, .volume-widget-transition-leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>