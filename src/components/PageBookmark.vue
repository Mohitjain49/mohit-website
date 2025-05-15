<template>
<div class="mohit-bookmark" :title="bookmarkTitle">
    <client-only> <font-awesome-icon :icon="bookmarkItem" /> </client-only>
</div>
<div v-if="webData.wakeLock != null" class="mohit-bookmark lock" title="Screen Wake Lock Set">
    <client-only> <font-awesome-icon icon="fa-lock" /> </client-only>
</div>
<div v-if="gamepadUsuable" class="mohit-bookmark gamepad" title="Use Your Gamepad!">
    <client-only> <font-awesome-icon icon="fa-gamepad" /> </client-only>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const route = useRoute();

const gamepadUsuable = ref(false);
onMounted(() => { gamepadUsuable.value = Boolean(navigator.getGamepads()); })

const bookmarkItem = computed(() => {
    const path = (route.path.endsWith("/") ? route.path.slice(0, -1) : route.path);
    const pathIndex = BOOKMARK_ITEMS.findIndex(item => path.includes(item.path));
    return ((pathIndex == -1) ? "fa-house" : BOOKMARK_ITEMS[pathIndex].icon);
})
const bookmarkTitle = computed(() => {
    return PERSONAL_WEBSITE_LINK + route.path.substring(1);
});

const BOOKMARK_ITEMS = [
    { path: "/skills", icon: "fa-code" },
    { path: "/experience", icon: "fa-file-code" },
    { path: "/projects", icon: "fa-cubes" },
    { path: "/resume", icon: "fa-file-lines" },
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

.mohit-bookmark.lock {
    left: auto;
    right: 10px;
    background: linear-gradient(to right, black 0%, var(--vibrant-flame) 10%, var(--vibrant-flame) 90%, black 100%);
    color: white;
}
.mohit-bookmark.gamepad {
    top: auto;
    bottom: 0px;
    clip-path: polygon(
        0 0,
        40% 25%,
        50% 30%,
        100% 0,
        100% 100%,
        0 100%
    );
}
.mohit-bookmark.gamepad svg {
    margin-bottom: 0px;
    margin-top: 15px;
}

@media (max-width: 450px) {
    .mohit-bookmark {
        width: 20px;
        height: 50px;
    }
    .mohit-bookmark svg {
        font-size: 15px;
    }
    .mohit-bookmark.gamepad {
        display: none;
    }
}
@media (max-width: 350px) {
    .mohit-bookmark {
        position: absolute;
    }
}
</style>