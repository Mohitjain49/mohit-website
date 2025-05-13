<template>
<div id="mohit-bookmark" :title="bookmarkTitle">
    <client-only> <font-awesome-icon :icon="bookmarkItem" /> </client-only>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const route = useRoute();

const bookmarkItem = computed(() => {
    const path = (route.path.endsWith("/") ? route.path.slice(0, -1) : route.path);
    const pathIndex = BOOKMARK_ITEMS.findIndex(item => path.includes(item.path));
    return ((pathIndex == -1) ? "fa-house" : BOOKMARK_ITEMS[pathIndex].icon);
})
const bookmarkTitle = computed(() => {
    return PERSONAL_WEBSITE_LINK + route.path.substring(1);
});

const BOOKMARK_ITEMS = [
    { path: "/skills", icon: "fa-code", title: "My skills" },
    { path: "/experience", icon: "fa-file-code", color: "var(--website-text)" },
    { path: "/projects", icon: "fa-cubes", color: "var(--globe-green-opaque)" },
    { path: "/resume", icon: "fa-file-lines", color: "var(--website-text)" },
    { path: "/contact", icon: "fa-paper-plane", color: "var(--website-text)" },
    { path: "/qrcode", icon: "fa-qrcode", color: "var(--website-light-text)" },
];
</script>

<style scoped>
#mohit-bookmark {
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
#mohit-bookmark svg {
    font-size: 19px;
    margin-bottom: 15px;
}

@media (max-width: 450px) {
    #mohit-bookmark {
        display: none;
    }
}
</style>