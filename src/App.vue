<template>
<NavigationMain />
<PageBookmark />

<RouterView :key="$route.path" />
<div v-if="webData.navMenuOpen" class="webpage-cover"></div>

<client-only>
    <font-awesome-icon icon="fa-arrow-pointer"
        class="mohit-custom-cursor"
        :style="gamepadStore.customCursor"
    />
</client-only>
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();
const gamepadStore = useGamepadStore();

onMounted(() => {webData.setEventListeners()})
onBeforeUnmount(() => {webData.removeEventListeners()})
</script>

<style>
.mohit-custom-cursor {
    font-size: 22px;
    color: red;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
}
</style>