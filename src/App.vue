<template>
<NavigationMain />
<GamepadComponent />
<PageBookmark v-if="!checkSSR()" />
<QrcodeTool v-if="webData.showSharePopup" />
<UpdateBox v-if="!checkSSR()" />

<RouterView :key="$route.path" />
<div v-if="(webData.menuOpen != -1)" class="webpage-cover"></div>
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();

onMounted(() => { webData.setEventListeners(); });
onBeforeUnmount(() => { webData.removeEventListeners(); });
</script>