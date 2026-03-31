<template>
<NavigationMain />
<GamepadComponent />
<QrcodeTool v-if="showShare" />
<UpdateBox />

<RouterView :key="$route.path" />
<div v-if="(webData.menuOpen != -1)" class="webpage-cover"></div>
</template>

<script setup>
import "./styles/mainstyles.css";
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const fullScreenSet = getFullScreenSet();

const showShare = computed(() => { return (webData.showSharePopup && !fullScreenSet.value); });
onMounted(() => { webData.setEventListeners(); });
onBeforeUnmount(() => { webData.removeEventListeners(); });

useScriptTag("https://accounts.google.com/gsi/client",
    (el) => { documentStore.initGoogleTokenClient(); },
    { async: true, defer: true }
);
useScriptTag("https://apis.google.com/js/api.js",
    (el) => { documentStore.initGooglePickerAPI(); },
    { async: true, defer: true }
)
</script>