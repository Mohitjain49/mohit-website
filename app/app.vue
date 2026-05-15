<template>
<NavigationMain />
<GamepadComponent />
<QrcodeTool v-if="showShare" />
<UpdateBox />

<NuxtPage />
<VitePwaManifest />

<div class="webpage-cover" v-if="useWebpageCover"></div>
<div id="invisible-css-layout"></div>
</template>

<script setup>
import "~/styles/mainstyles.scss";
import '~build/console';

const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const fullScreenSet = getFullScreenSet();

const showShare = computed(() => { return (webData.showSharePopup && !fullScreenSet.value); });
const showShareImmediate = computed(() => { return (webData.showSharePopupImmediate && !fullScreenSet.value); });
const useWebpageCover = computed(() => { return (showShareImmediate.value || (webData.menuOpen != -1 && webData.websiteMenuMode == 1)); });

onMounted(async() => { await webData.setEventListeners(); });
onBeforeUnmount(() => { webData.removeEventListeners(); });

useScriptTag("https://accounts.google.com/gsi/client", (el) => { documentStore.initGoogleTokenClient(); }, { async: true, defer: true });
useScriptTag("https://apis.google.com/js/api.js", (el) => { documentStore.initGooglePickerAPI(); }, { async: true, defer: true });
</script>