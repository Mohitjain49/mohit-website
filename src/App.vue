<template>
<RouterView :key="$route.path" />
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();

onMounted(() => {webData.setEventListeners()})
onBeforeUnmount(() => {webData.removeEventListeners()})
</script>