<template>
<NavigationMain />
<PageBookmark />

<RouterView :key="$route.path" />
<div v-if="webData.navMenuOpen" class="webpage-cover"></div>

<client-only>
    <font-awesome-icon v-if="gamepadStore.showCursor"
        id="mohit-custom-cursor"
        :icon="gamepadStore.cursorIcon"
        :class="gamepadStore.cursorAnimation"
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