<template>
<div ref="hosted-file-bottom-options" :class="['mohit-hostedFile-bottom', hostedFileClass]">
    <div class="mohit-document-topBar-sideSection">
        <button @click="setFS()" class="yellow" :title="minimizeTitle" v-pulse-loop>
            <font-awesome-icon :icon="fullScreenStore.faIcon" />
        </button>
        <button v-show="showUpdateWebsite" @click="openUpdateBox()" v-pulse-loop
            :class="['yellow', (installStore.updateNeeded ? '' : 'noAction')]"
            :title="(installStore.swUpdating ? 'Updating Website...' : 'This Is An Old Version Of My Website. Click Here To Update It.')">

            <font-awesome-icon v-if="!installStore.swUpdating" icon="fa-triangle-exclamation" />
            <font-awesome-icon v-else icon="fa-spinner" spin-pulse />
        </button>
        <button v-show="(webData.wakeLock.isActive || webData.wakeLockChangeFresh)"
            @click="(event) => { webData.onWakeLockButtonClick(event); }"
            :style="getColorStyles('var(--vibrant-flame)')"
            :title="webData.wakeLockTitle" v-pulse-loop>

            <font-awesome-icon :flip="webData.wakeLockChangeFresh"
                :icon="(webData.wakeLock.isActive ? 'fa-lock' : 'fa-unlock')"
            />
        </button>
    </div>

    <div class="mohit-document-topBar-sideSection">
        <button @click="openWebsiteMenu()" :title="fileOptionsTitle" :style="getColorStyles('var(--website-light-text)')" v-pulse-loop>
            <FontAwesomeIcon :icon="(onDocumentRoute ? 'fa-file-pdf' : 'fa-file-export')" />
        </button>
        <button v-if="!wholeFileInView" @click="scrollToTop(false, 0)" title="Scroll To The Top" v-pulse-loop>
            <font-awesome-icon icon="fa-turn-up" />
        </button>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const documentStore = useDocumentStore();
const scriptsStore = useScriptsStore();
const installStore = useInstallStore();

const { onDocumentRoute } = storeToRefs(documentStore);
const hfBottomBarVisible = useState("hosted-file-bottom-bar-visible", () => { return false; });
const wholeFileInView = useState("whole-hosted-file-in-view", () => { return false; });

const bottomOptionsBar = useTemplateRef('hosted-file-bottom-options');
const barVisible = useElementVisibility(bottomOptionsBar);

// These two functions update the state on whether the hosted file bottom bar is visible or not.
onMountedAdvanced(() => { hfBottomBarVisible.value = barVisible.value; });
watch(barVisible, (newValue) => { hfBottomBarVisible.value = newValue; });

const hostedFileClass = computed(() => { return (onDocumentRoute.value ? "document" : "script"); });
const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });
const fileOptionsTitle = computed(() => { return (onDocumentRoute.value ? "Open Document Options" : "Open Script Options"); });
const showUpdateWebsite = computed(() => {
    return (!installStore.showUpdateBox || fullScreenStore.fullScreenSet) && (installStore.updateNeeded || installStore.swUpdating);
});

/** This function sets the full screen mode for a hosted file. */
function setFS() {
    if(onDocumentRoute.value) {
        documentStore.toggleDocumentFullScreen();
    } else {
        scriptsStore.toggleScriptFullScreen();
    }
}

/** This function opens the options for the file. */
function openWebsiteMenu() {
    webData.bypassBodyClick();
    webData.setMenuOpen((onDocumentRoute.value ? DOCUMENT_MENU : SCRIPTS_MENU), true);
}

/** This opens the update box only if an update is needed. */
function openUpdateBox() {
    if(!installStore.updateNeeded) { return; }
    if(fullScreenStore.fullScreenSet) { setFS(); }
    installStore.setUpdateBox(true);
}
</script>

<style scoped lang="scss">
.mohit-hostedFile-bottom {
    width: 100%;
    height: 30px;
    margin: 10px auto 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}
.mohit-hostedFile-bottom-sideSection {
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 10px;
    gap: 5px;
}

.mohit-hostedFile-bottom.document {
    width: var(--mohit-custom-pdf-width, calc(100% - 70px));
    background-color: rgb(28, 28, 28);
}
.mohit-hostedFile-bottom.script {
    width: 100%;
}

.mohit-hostedFile-bottom button, .mohit-hostedFile-bottom a {
    color: var(--website-text);
    border: 1px solid var(--website-text);
    border-radius: 7px;
    font-size: 12px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: scale 0.2s, background-color 0.2s;
}
.mohit-hostedFile-bottom button:hover, .mohit-hostedFile-bottom a:hover {
    scale: 1.1;
    background-color: black;
}

.mohit-hostedFile-bottom button.yellow, .mohit-hostedFile-bottom a.yellow {
    color: var(--lightning-yellow);
    border-color: var(--lightning-yellow);
}
.mohit-hostedFile-bottom button.noAction {
    cursor: default !important;
}
</style>