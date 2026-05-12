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
    <div class="gamepad-volume-meter" v-if="audioStore.showVolumeGamepadMenu">
        <div class="gamepadComp-input-section">
            <div class="left-icon"> <FontAwesomeIcon :icon="audioStore.volumeInputIcon" /> </div>
            <input type="range" min="0" max="100" disabled v-model="audioStore.volumeInput" />
            <span> {{ (audioStore.volumeInput + '%') }} </span>
        </div>
    </div>
</Transition>

<Transition name="cursorTitle-transition" fade>
    <div v-if="gamepadStore.cursorElementTitle !== ''" class="custom-cursor-titlePopup">
        {{ truncate(gamepadStore.cursorElementTitle, 70) }}
    </div>
</Transition>

<Transition name="gamepad-cursorSpeed-transition">
    <div class="gamepad-cursorSpeed-menu" v-if="gamepadStore.showCursorSpeedMenu">
        <h1> Cursor Speeds </h1>
        <div v-for="cursor in gamepadStore.gamepadCursors" class="gamepadComp-input-section" :style="('color: ' + cursor.color + ';')">
            <div class="left-icon" style="margin-left: 5px;"> <FontAwesomeIcon icon="fa-gauge" /> </div>
            <input type="range" min="0" max="30" disabled v-model="cursor.maxSpeed" />
            <span> {{ (cursor.maxSpeed + 'px') }} </span>
        </div>
    </div>
</Transition>
</template>

<style scoped lang="scss">
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

.gamepad-volume-meter {
    overflow: hidden;
    position: fixed;
    top: 5px;
    left: calc(50% - 152px);
    height: 40px;
    width: 300px;
    z-index: 9000;
    background-color: var(--blue-one);
    border: 2px solid var(--blue-cobalt);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px var(--blue-zero);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}
.gamepad-cursorSpeed-menu {
    overflow: hidden;
    position: fixed;
    bottom: 10px;
    left: calc(50% - 152px);
    z-index: 9000;
    width: 300px;
    height: 160px;
    background-color: black;
    border: 2px solid var(--website-text);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px black;
}

.gamepad-cursorSpeed-menu h1 {
    margin: 5px auto 0px;
    height: 29px;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: var(--website-light-text);
    font-family: 'Lexend', sans-serif;
    border-bottom: 1px solid;
    border-radius: 3px;
    padding: 0px 2px;
    user-select: none;
}

.gamepadComp-input-section {
    width: 300px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: inherit;
}
.gamepadComp-input-section input {
    width: calc(100% - 110px);
}

.gamepadComp-input-section .left-icon {
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
.gamepadComp-input-section span {
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

.cursorTitle-transition-enter-active, .cursorTitle-transition-leave-active {
    transition: opacity 0.75s;
}
.cursorTitle-transition-enter-from, .cursorTitle-transition-leave-to {
    opacity: 0
}
.cursorTitle-transition-enter-to, .cursorTitle-transition-leave-from {
    opacity: 1;
}

.gamepad-volumeMeter-transition-enter-active {
    transition: opacity 0.25s, top 0.25s;
}
.gamepad-volumeMeter-transition-leave-active {
    transition: opacity 0.75s, top 0.75s;
}
.gamepad-volumeMeter-transition-enter-from, .gamepad-volumeMeter-transition-leave-to {
    opacity: 0;
    top: -70px;
}
.gamepad-volumeMeter-transition-enter-to, .gamepad-volumeMeter-transition-leave-from {
    opacity: 1;
    top: 5px;
}

.gamepad-cursorSpeed-transition-enter-active {
    transition: opacity 0.25s, bottom 0.25s;
}
.gamepad-cursorSpeed-transition-leave-active {
    transition: opacity 0.75s, bottom 0.75s;
}
.gamepad-cursorSpeed-transition-enter-from, .gamepad-cursorSpeed-transition-leave-to {
    opacity: 0;
    bottom: -220px !important;
}
.gamepad-cursorSpeed-transition-enter-to, .gamepad-cursorSpeed-transition-leave-from {
    opacity: 1;
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