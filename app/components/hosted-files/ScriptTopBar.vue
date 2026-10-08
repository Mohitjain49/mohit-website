<template>
<div v-if="scriptsStore.scriptBlobCreated" ref="script-options" class="mohit-main-script-top">
    <div class="mohit-main-script-top-sideSection">
        <div class="mohit-main-script-top-group">
            <button class="script-save-opt" @click="scriptsStore.downloadScript()"
                :title="scriptsStore.downloadTitle"
                v-action-cursor="scriptsStore.scriptDownloadStatus" v-pulse-loop>

                <FontAwesomeActionIcon :baseIcon="SCRIPT_DOWNLOAD_BASE_ICON" :status="scriptsStore.scriptDownloadStatus" />
            </button>
            <button class="script-save-opt" v-if="webData.saveAsSupported"
                @click="scriptsStore.saveScript()"
                :title="scriptsStore.saveScriptTitle"
                v-action-cursor="scriptsStore.scriptSaveStatus" v-pulse-loop>
                
                <FontAwesomeActionIcon :baseIcon="SCRIPT_SAVE_BASE_ICON" :status="scriptsStore.scriptSaveStatus" />
            </button>
            <button class="script-save-opt" @click="scriptsStore.copyScript()"
                :title="scriptsStore.copyTitle"
                v-action-cursor="scriptsStore.scriptCopyStatus" v-pulse-loop>

                <FontAwesomeActionIcon :baseIcon="SCRIPT_COPY_BASE_ICON" :status="scriptsStore.scriptCopyStatus" />
            </button>
        </div>
        <a class="white" v-if="(scriptsStore.currentScriptLink != '')" :href="scriptsStore.currentScriptLink" title="See Code On Github" v-pulse-loop>
            <font-awesome-icon icon="fa-brands fa-github" />
        </a>
    </div>
    <div class="mohit-main-script-top-sideSection">
        <button @click="openScriptsMenu()" title="Open Script Options" v-pulse-loop>
            <FontAwesomeIcon icon="fa-file-export" />
        </button>
        <button class="flame" @click="scriptsStore.setCodeWrapping('toggle')" :title="scriptsStore.wrapStatement" v-pulse-loop>
            <FontAwesomeIcon :icon="scriptsStore.wrapIcon" />
        </button>
        <button @click="scriptsStore.toggleScriptFullScreen()" :title="fullScreenStore.elementTitle" v-pulse-loop>
            <FontAwesomeIcon :icon="fullScreenStore.faIcon" />
        </button>
    </div>
</div>
</template>

<script setup>
const scriptsStore = useScriptsStore();
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();

/** This function opens the scripts menu. */
function openScriptsMenu() {
    webData.bypassBodyClick();
    webData.setMenuOpen(SCRIPTS_MENU, true);
}
</script>