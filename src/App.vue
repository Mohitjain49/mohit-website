<template>
<NavigationMain v-if="showNav" />
<PageBookmark />
<GamepadComponent />

<RouterView :key="$route.path" />
<div v-if="webData.navMenuOpen" class="webpage-cover"></div>
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();
const route = useRoute();

onMounted(() => {webData.setEventListeners()})
onBeforeUnmount(() => {webData.removeEventListeners()})

const showNav = computed(() => {
    return (route.path !== "/gamepad" && route.path !== "/gamepad/");
})
</script>