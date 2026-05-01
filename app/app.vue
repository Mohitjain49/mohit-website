<template>
<NavigationMain />
<GamepadComponent />
<QrcodeTool v-if="showShare" />
<UpdateBox />

<NuxtPage />
<VitePwaManifest />
</template>

<script setup>
import "~/styles/mainstyles.css";
import '~build/console';

const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const fullScreenSet = getFullScreenSet();

const showShare = computed(() => { return (webData.showSharePopup && !fullScreenSet.value); });
onBeforeUnmount(() => { webData.removeEventListeners(); });
onMounted(async () => {
    webData.setEventListeners();
    await import("./gamepad-events.js");
});

useScriptTag("https://accounts.google.com/gsi/client",
    (el) => { documentStore.initGoogleTokenClient(); },
    { async: true, defer: true }
);
useScriptTag("https://apis.google.com/js/api.js",
    (el) => { documentStore.initGooglePickerAPI(); },
    { async: true, defer: true }
)
</script>