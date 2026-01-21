<template>
<NavigationMain />
<GamepadComponent />
<PageBookmark />
<QrcodeTool v-if="webData.showSharePopup" />
<UpdateBox />

<RouterView :key="$route.path" />
<div v-if="(webData.menuOpen != -1)" class="webpage-cover"></div>
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();

onMounted(() => { webData.setEventListeners(); });
onBeforeUnmount(() => { webData.removeEventListeners(); });

useScriptTag("https://accounts.google.com/gsi/client",
    (el) => { documentStore.initGoogleTokenClient() },
);
</script>