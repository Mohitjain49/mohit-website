<template>
<RouterView :key="$route.path" />
</template>

<script setup>
import "./styles/mainstyles.css";
// import 'cesium/Build/Cesium/Widgets/widgets.css';

import { useWebsiteDataStore } from "./stores/WebsiteData.js";
import { onMounted, onUnmounted } from "vue";

const webData = useWebsiteDataStore();
onMounted(() => {webData.setEventListeners()})
onUnmounted(() => {webData.removeEventListeners()}) 
</script>