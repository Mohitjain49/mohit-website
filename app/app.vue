<template>
<NavigationMain />
<GamepadComponent />
<QrcodeTool v-if="showShare" />
<UpdateBox />

<NuxtPage />
<VitePwaManifest />

<NuxtLoadingIndicator :color="LOADING_BAR_COLOR" :height="2" />
<WebCover v-if="useWebpageCover" :zIndex="500" />
<div id="invisible-css-layout"></div>
</template>

<script setup>
import "~/styles/mainstyles.scss";
import '~build/console';
const LOADING_BAR_COLOR = "linear-gradient(to right, var(--blue-one) 0%, var(--blue-two) 100%)";

const webData = useWebsiteDataStore();
const fullScreenSet = getFullScreenSet();

const showShare = computed(() => { return (webData.showSharePopup && !fullScreenSet.value); });
const showShareImmediate = computed(() => { return (webData.showSharePopupImmediate && !fullScreenSet.value); });
const useWebpageCover = computed(() => { return (showShareImmediate.value || (webData.menuOpen != -1 && webData.websiteMenuMode == 1)); });

onMounted(async() => { await webData.setEventListeners(); });
onBeforeUnmount(() => { webData.removeEventListeners(); });
</script>