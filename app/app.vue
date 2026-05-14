<template>
<NavigationMain />
<GamepadComponent />
<QrcodeTool v-if="showShare" />
<UpdateBox />

<NuxtPage />
<VitePwaManifest />
<div class="webpage-cover" v-if="useWebpageCover"></div>
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

const documentElementRef = shallowRef(null);
useMohitBreakpoints(documentElementRef, [
    '<-w-1200', '<-w-1100', '<-w-1050', '<-w-975', '<-w-940', '<-w-850',
    '<-w-825', '<-w-750', '<-w-700', '<-w-680', '<-w-640', '<-w-625',
    '<-w-600', '<-w-550', '<-w-525', '<-w-500', '<-w-450', '<-w-400',
    '<-w-375', '>-w-1450', '>-w-650', '>-w-750', '<-h-625'
]);

onMounted(async() => {
    await webData.setEventListeners();
    documentElementRef.value = document.documentElement;
});
onBeforeUnmount(() => { webData.removeEventListeners(); });

useScriptTag("https://accounts.google.com/gsi/client",
    (el) => { documentStore.initGoogleTokenClient(); },
    { async: true, defer: true }
);
useScriptTag("https://apis.google.com/js/api.js",
    (el) => { documentStore.initGooglePickerAPI(); },
    { async: true, defer: true }
);
</script>