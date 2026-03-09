<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div id="mohit-scriptsBar" ref="mohit-script-bar">
    <div class="mohit-scriptsBar-bottom">
        <button class="mohit-navBar-icon light" title="Navigate To Last Page" @click="router.back()" pulse-loop>
            <font-awesome-icon icon="fa-arrow-left" />
        </button>
        <div class="mohit-navBar-bottom-separator scriptBar"></div>

        <a v-if="(scriptsStore.currentScriptLink != '')" pulse-loop
            :href="scriptsStore.currentScriptLink" target="_blank"
            class="mohit-navBar-icon white" title="See Code On Github">

            <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <button class="mohit-navBar-icon" title="Download Code Script" pulse-loop
            :style="getColorStyles('var(--blue-one)')"
            @click="scriptsStore.downloadScript()">

            <font-awesome-icon :icon="scriptsStore.downloadIcon"
                :spin-pulse="scriptsStore.scriptDownloadStatus.pending"
            />
        </button>
        <button v-if="scriptsStore.saveAsSupported" pulse-loop
            class="mohit-navBar-icon" title="Save Code Script"
            :style="getColorStyles('var(--blue-three)')"
            @click="scriptsStore.saveScript()">

            <font-awesome-icon :icon="scriptsStore.saveScriptIcon"
                :spin-pulse="scriptsStore.scriptSaveStatus.pending"
            />
        </button>
        <button class="mohit-navBar-icon" title="Copy Raw Code Script"
            @click="scriptsStore.copyScript()" pulse-loop
            :style="getColorStyles('var(--blue-one)')">

            <font-awesome-icon :icon="scriptsStore.copyIcon"
                :spin-pulse="scriptsStore.scriptCopyStatus.pending"
            />
        </button>
        <div class="mohit-navBar-bottom-separator scriptBar"></div>

        <button class="mohit-navBar-icon light" title="Share Webpage" @click="webData.openQRCodePopup()" pulse-loop>
            <font-awesome-icon icon="fa-share-from-square" />
        </button>
        <button class="mohit-navBar-icon light" pulse-loop
            :title="fullScreenStore.docElementTitle"
            @click="scriptsStore.toggleScriptFullScreen()">

            <font-awesome-icon :icon="fullScreenStore.faIcon" />
        </button>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const scriptsStore = useScriptsStore();
const fullScreenStore = useFullScreenStore();
const router = useRouter();

const scriptBar = useTemplateRef('mohit-script-bar');
usePulseLoopAnimation(scriptBar);

onMounted(() => { scriptsStore.mountScriptPage(); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });
</script>