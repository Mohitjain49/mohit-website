<template>
<Transition name="mohit-bookmark-transition" appear>
    <RouterLink to="/gamepad" v-if="checkGamepadsSupported()"
        :class="getGamepadBookmarkClasses()"
        :title="GAMEPAD_BOOKMARK_TITLE">

        <font-awesome-icon icon="fa-gamepad" />
    </RouterLink>
</Transition>

<Transition name="mohit-bookmark-transition" appear>
    <button v-if="webData.wakeLock.isActive" @click="webData.toggleWakeLock()"
        class="mohit-bookmark lock active"
        :title="WAKE_LOCK_BOOKMARK_TITLE">

        <font-awesome-icon icon="fa-lock" />
    </button>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const gamepadStore = useGamepadStore();

/**
 * This returns the classes for the gamepad bookmark.
 */
function getGamepadBookmarkClasses() {
    return ['mohit-bookmark', 'gamepad', ((gamepadStore.gamepadConnected != -1) ? 'active' : '')]
}

const GAMEPAD_BOOKMARK_TITLE = "Use your gamepad/video game controller on my website!";
const WAKE_LOCK_BOOKMARK_TITLE = "Screen Wake Lock Set. Click here to remove it.";
</script>

<style scoped>
.mohit-bookmark {
    position: fixed;
    top: 0;
    left: 10px;
    height: 50px;
    width: 30px;
    background-color: var(--blue-one);
    color: black;
    z-index: 514;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        100% 100%,
        50% 70%,
        40% 75%,
        0 100%
    );
}
.mohit-bookmark svg {
    font-size: 19px;
    margin-bottom: 15px;
}

.mohit-bookmark.active {
    background: linear-gradient(to right, black 0%, var(--vibrant-flame) 10%, var(--vibrant-flame) 90%, black 100%);
    color: white;
}
.mohit-bookmark.gamepad.active svg {
    font-size: 16px;
}

.mohit-bookmark.lock {
    left: auto;
    right: 10px;
}

.mohit-sideRoute {
    position: fixed;
    left: 10px;
    top: calc(50% - 25px);
    background-color: black;
    height: 55px;
    width: 55px;
    border: 2px dotted;
    border-radius: 20%;
    z-index: 9000;
    font-size: 10px;
    transition: scale 0.2s, box-shadow 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}
.mohit-sideRoute:hover {
    scale: 1.1;
    box-shadow: 0px 0px 10px 1px;
}

.mohit-sideRoute svg {
    font-size: 22px;
    margin-top: 1px;
    margin-bottom: 4px;
}
.mohit-sideRoute span {
    font-size: inherit;
    font-family: 'Lexend', sans-serif;
    text-align: center;
    font-weight: bold;
    line-height: inherit;
    letter-spacing: 0.6px;
}

.mohit-sideRoute.left {
    right: auto;
    left: 10px;
}
.mohit-sideRoute.right {
    left: auto;
    right: 10px;
}

@media (max-width: 450px) {
    .mohit-sideRoute {
        display: none;
    }
    .mohit-bookmark {
        width: 20px;
        height: 50px;
    }
    .mohit-bookmark svg {
        font-size: 15px;
    }

    .mohit-bookmark.gamepad svg {
        font-size: 13px;
    }
    .mohit-bookmark.gamepad.active svg {
        font-size: 11px;
    }
}
@media (max-width: 350px) {
    .mohit-bookmark {
        position: absolute;
    }
}

.mohit-bookmark-transition-enter-active, .mohit-bookmark-transition-leave-active {
    transition: top 0.5s;
}
.mohit-bookmark-transition-enter-from, .mohit-bookmark-transition-leave-to {
    top: -50px;
}
.mohit-bookmark-transition-enter-to, .mohit-bookmark-transition-leave-from {
    top: 0px;
}

.mohit-sideRoute-left-transition-enter-active, .mohit-sideRoute-left-transition-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.mohit-sideRoute-left-transition-enter-from, .mohit-sideRoute-left-transition-leave-to {
    transform: translateX(-70px);
    opacity: 0;
}
.mohit-sideRoute-left-transition-enter-to, .mohit-sideRoute-left-transition-leave-from {
    transform: translateX(0px);
    opacity: 1;
}

.mohit-sideRoute-right-transition-enter-active, .mohit-sideRoute-right-transition-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.mohit-sideRoute-right-transition-enter-from, .mohit-sideRoute-right-transition-leave-to {
    transform: translateX(70px);
    opacity: 0;
}
.mohit-sideRoute-right-transition-enter-to, .mohit-sideRoute-right-transition-leave-from {
    transform: translateX(0px);
    opacity: 1;
}
</style>