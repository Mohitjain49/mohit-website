<template>
<div class="mohit-bookmark" :title="bookmarkTitle">
    <client-only> <font-awesome-icon :icon="bookmarkItem" /> </client-only>
</div>
<div v-if="gamepadUsuable" class="mohit-bookmark right" title="Use Your Gamepad!">
    <client-only> <font-awesome-icon icon="fa-gamepad" /> </client-only>
</div>
</template>

<script setup>
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
    z-index: 515;
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
.mohit-bookmark.right {
    left: auto;
    right: 10px;
}

@media (max-width: 450px) {
    .mohit-bookmark {
        display: none;
    }
}
</style>