<template>
<client-only>
    <Transition name="mohit-bookmark-transition" appear>
        <div v-if="showGamepadBookmark()" :class="getGamepadBookmarkClasses()" :title=GAMEPAD_BOOKMARK_TITLE>
            <font-awesome-icon icon="fa-gamepad" />
        </div>
    </Transition>
</client-only>

<Transition name="mohit-bookmark-transition" appear>
    <div v-if="webData.wakeLock != null" class="mohit-bookmark lock active" title="Screen Wake Lock Set">
        <client-only> <font-awesome-icon icon="fa-lock" /> </client-only>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const gamepadStore = useGamepadStore();

function getGamepadBookmarkClasses() {
    return ['mohit-bookmark', 'gamepad', (gamepadStore.gamepadConnected ? 'active' : '')]
};

/**
 * This returns whether or not the Gamepad Icon is good to show or not.
 */
function showGamepadBookmark() {
    return Boolean(navigator.getGamepads());
}

const GAMEPAD_BOOKMARK_TITLE = "Use your gamepad/video game controller on my website!"
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

@media (max-width: 450px) {
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
</style>