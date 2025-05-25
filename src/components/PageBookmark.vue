<template>
<div class="mohit-bookmark" :title="bookmarkTitle">
    <client-only> <font-awesome-icon :icon="bookmarkItem" /> </client-only>
</div>
<div v-if="webData.wakeLock != null" class="mohit-bookmark lock active" title="Screen Wake Lock Set">
    <client-only> <font-awesome-icon icon="fa-lock" /> </client-only>
</div>

<client-only>
    <div v-if="showGamepadBookmark()" :class="getGamepadBookmarkClasses()" title="Use Your Gamepad!">
        <font-awesome-icon icon="fa-gamepad" />
    </div>
</client-only>
</template>

<script setup>
const webData = useWebsiteDataStore();
const gamepadStore = useGamepadStore();
const route = useRoute();

const bookmarkItem = computed(() => {
    const path = (route.path.endsWith("/") ? route.path.slice(0, -1) : route.path);
    const pathIndex = BOOKMARK_ITEMS.findIndex(item => path.includes(item.path));
    return ((pathIndex == -1) ? "fa-house" : BOOKMARK_ITEMS[pathIndex].icon);
})
const bookmarkTitle = computed(() => {
    return PERSONAL_WEBSITE_LINK + route.path.substring(1);
});

function getGamepadBookmarkClasses() {
    return ['mohit-bookmark', 'gamepad', (gamepadStore.gamepadConnected ? 'active' : '')]
};

/**
 * This returns whether or not the Gamepad Icon is good to show or not.
 */
function showGamepadBookmark() {
    return Boolean(navigator.getGamepads());
}

const BOOKMARK_ITEMS = [
    { path: "/skills", icon: "fa-code" },
    { path: "/experience", icon: "fa-file-code" },
    { path: "/projects", icon: "fa-cubes" },
    { path: "/resume", icon: "fa-file-lines" },
    { path: FCS_CERTIFICATE_ROUTE, icon: "fa-school-flag" },
    { path: "/contact", icon: "fa-paper-plane" },
    { path: "/qrcode", icon: "fa-qrcode" },
    { path: "/icon", icon: "fa-pen-fancy" },
    { path: "/copyright", icon: "fa-copyright" },
];
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
.mohit-bookmark.lock {
    bottom: 0px;
    top: auto;
clip-path: polygon(
        0 0,
        40% 25%,
        50% 30%,
        100% 0,
        100% 100%,
        0 100%
    );
}
.mohit-bookmark.lock svg {
    margin-bottom: 0px;
    margin-top: 15px;
}

.mohit-bookmark.gamepad {
    left: auto;
    right: 10px;
}
.mohit-bookmark.gamepad.active svg {
    font-size: 16px;
}

@media (max-width: 450px) {
    .mohit-bookmark {
        width: 20px;
        height: 50px;
    }
    .mohit-bookmark svg {
        font-size: 15px;
    }
    .mohit-bookmark.gamepad.active svg {
        font-size: 11px;
    }
}
@media (max-width: 350px) {
    .mohit-bookmark {
        position: absolute;
    }
    .mohit-bookmark.lock {
        position: fixed;
    }
}
</style>