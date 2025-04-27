<template>
<RouterView :key="$route.path" />
<div v-if="webData.navMenuOpen" class="webpage-cover"></div>
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();

onMounted(() => {webData.setEventListeners()})
onBeforeUnmount(() => {webData.removeEventListeners()})
</script>