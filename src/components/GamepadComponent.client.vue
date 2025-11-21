<script setup>
const gamepadStore = useGamepadStore();
const audioStore = useAudioStore();
</script>

<template>
<template v-for="cursor in gamepadStore.gamepadCursors">
    <font-awesome-icon v-if="cursor.showCursor"
        class="mohit-custom-cursor"
        :icon="cursor.icon"
        :class="cursor.animation"
        :style="cursor.style"
    />
</template>

<Transition name="gamepad-volumeMeter-transition" fade>
    <div class="new-volume-meter" v-if="audioStore.showVolumeGamepadMenu">
        <button @click="audioStore.setAudioMuted('toggle')" :title="audioStore.volumeInputTitle">
            <FontAwesomeIcon :icon="audioStore.volumeInputIcon" />
        </button>
        <input type="range" min="0" max="100" title="Volume Meter for the click sound."
            v-model="audioStore.volumeInput" disabled
            @input="audioStore.changeAudioVolume()"
        />
        <span> {{ (audioStore.volumeInput + '%') }} </span>
    </div>
</Transition>

<Transition name="cursorTitle-transition" fade>
    <div v-if="gamepadStore.cursorElementTitle !== ''" class="custom-cursor-titlePopup">
        {{ truncate(gamepadStore.cursorElementTitle, 70) }}
    </div>
</Transition>

<Transition name="cursorSense-transition" fade>
    <div v-if="gamepadStore.showCursorSpeedMenu" class="custom-cursor-sensitivity">
        <h1> Cursor Speed </h1>
        <input type="range" v-model="gamepadStore.maxCursorSpeed" min="1" max="30" disabled />
        <p> {{ (gamepadStore.maxCursorSpeed + 'px per frame') }} </p>
    </div>
</Transition>

<!-- <Transition name="cursorSense-transition" fade>
    <div v-if="audioStore.showVolumeGamepadMenu" class="custom-cursor-sensitivity volume">
        <h1> Volume </h1>
        <input type="range" v-model="audioStore.volumeInput" min="1" max="100" disabled />
        <p> {{ (audioStore.volumeInput + '%') }} </p>
    </div>
</Transition> -->
</template>

<style scoped>
.mohit-custom-cursor {
    font-size: 27px;
    color: var(--vibrant-flame);
    padding: 5px;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    border: var(--empty-border);
    border-radius: 10px;
    transition: var(--default-transition);
}

.new-volume-meter {
    position: fixed;
    top: 5px;
    left: calc(50% - 152px);
    z-index: 9000;
    width: 300px;
    height: 40px;
    background-color: var(--blue-one);
    border: 2px solid var(--blue-cobalt);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px var(--blue-zero);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: black
}
.new-volume-meter input {
    width: calc(100% - 110px);
}

.new-volume-meter button {
    font-size: 15px;
    width: 35px;
    margin-left: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 0.5px;
    color: inherit;
}
.new-volume-meter span {
    position: relative;
    bottom: 0.5px;
    cursor: default;
    user-select: none;
    font-family: 'Lexend', sans-serif;
    font-size: 15px;
    width: 55px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
}

.custom-cursor-sensitivity {
    position: fixed;
    left: calc(50% - 225px);
    top: calc(50% - 125px);
    width: 450px;
    height: 250px;
    border: 2px solid white;
    color: white;
    border-radius: 25px;
    z-index: 9000;
    box-shadow: 0px 0px 20px 20px black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    background: repeating-linear-gradient(
        45deg,
        var(--blue-cobalt) 0,
        var(--blue-cobalt) 30px,
        black 30px,
        black 60px
    );
}

.custom-cursor-sensitivity input {
    width: 175px;
}
.custom-cursor-sensitivity h1 {
    color: white;
    font-family: 'Lexend', sans-serif;
    margin-bottom: 12px;
    width: fit-content;
    height: fit-content;
    border-bottom: 3px dotted white;
    border-radius: 10px;
    padding-bottom: 2px;
}
.custom-cursor-sensitivity p {
    color: white;
    font-family: 'Lexend', sans-serif;
    font-size: 17px;
}

.custom-cursor-sensitivity.volume h1 {
    color: var(--lightning-yellow) !important;
    border-color: var(--lightning-yellow) !important;
}
.custom-cursor-sensitivity.volume p {
    color: var(--lightning-yellow) !important;
}

.custom-cursor-titlePopup {
    position: fixed;
    z-index: 9998;
    bottom: 0px;
    left: 0px;
    background-color: black;
    color: white;
    width: fit-content;
    height: fit-content;
    padding: 2px 5px;
    font-size: 11px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.cursorSense-transition-enter-active, .cursorSense-transition-leave-active {
    transition: opacity 1.25s;
}
.cursorSense-transition-leave-to {
    opacity: 0
}
.cursorSense-transition-leave-from {
    opacity: 1;
}

.cursorTitle-transition-enter-active, .cursorTitle-transition-leave-active {
    transition: opacity 0.75s;
}
.cursorTitle-transition-enter-from, .cursorTitle-transition-leave-to {
    opacity: 0
}
.cursorTitle-transition-enter-to, .cursorTitle-transition-leave-from {
    opacity: 1;
}

.gamepad-volumeMeter-transition-leave-active {
    transition: opacity 0.75s, top 0.75s;
    transition-delay: 0.75s;
}
.gamepad-volumeMeter-transition-enter-from, .gamepad-volumeMeter-transition-leave-to {
    opacity: 0;
    top: -70px;
}
.gamepad-volumeMeter-transition-enter-to, .gamepad-volumeMeter-transition-leave-from {
    opacity: 1;
    top: 5px;
}

@media (max-width: 500px) {
    .custom-cursor-sensitivity {
        left: calc(50% - 150px);
        top: calc(50% - 75px);
        width: 300px;
        height: 150px;
    }
    .custom-cursor-sensitivity h1 {
        font-size: 22px;
    }
}
</style>