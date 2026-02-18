<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div id="mohit-scriptsBar">
    <div class="mohit-scriptsBar-bottom">
        <a v-if="(scriptsStore.currentScriptLink != '')"
            :href="scriptsStore.currentScriptLink" target="_blank"
            class="mohit-navBar-icon white" title="See Code On Github"
            @pointerenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <button class="mohit-navBar-icon" title="Download Code Script"
            :style="getColorStyles('var(--blue-one)')"
            @click="scriptsStore.downloadScript()"
            @pointerenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <font-awesome-icon :icon="scriptsStore.downloadIcon"
                :spin-pulse="scriptsStore.scriptDownloadStatus.pending"
            />
        </button>
        <button v-if="scriptsStore.saveAsSupported"
            class="mohit-navBar-icon" title="Save Code Script"
            :style="getColorStyles('var(--blue-three)')"
            @click="scriptsStore.saveScript()"
            @pointerenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <font-awesome-icon :icon="scriptsStore.saveScriptIcon"
                :spin-pulse="scriptsStore.scriptSaveStatus.pending"
            />
        </button>
        <button class="mohit-navBar-icon"
            @click="scriptsStore.copyScript()"
            title="Copy Raw Code Script"
            :style="getColorStyles('var(--blue-one)')"
            @pointerenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <font-awesome-icon :icon="scriptsStore.copyIcon"
                :spin-pulse="scriptsStore.scriptCopyStatus.pending"
            />
        </button>
        <div class="mohit-navBar-bottom-separator scriptBar"></div>

        <button class="mohit-navBar-icon light" title="Share Webpage"
            @click="webData.openQRCodePopup()"
            @pointerenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <font-awesome-icon icon="fa-share-from-square" />
        </button>
        <button class="mohit-navBar-icon light"
            :title="fullScreenStore.docElementTitle"
            @click="scriptsStore.toggleScriptFullScreen()"
            @pointerenter="setPulseLoopAnimation"
            @mouseleave="setPulseLoopAnimation">

            <font-awesome-icon :icon="fullScreenStore.faIcon" />
        </button>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const scriptsStore = useScriptsStore();
const fullScreenStore = useFullScreenStore();

onMounted(() => { scriptsStore.mountScriptPage(); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });
</script>