<template>
<div class="file-widgets-container" ref="file-widgets-container">
    <Transition name="file-widgets-transition" appear>
        <button v-if="(fullScreenSet && !hfBottomBarVisible)" id="minimizeScreen-widget" @click="exitFS()" :title="minimizeTitle" pulse-loop>
            <FontAwesomeIcon icon="fa-compress" />
        </button>
    </Transition>
    <Transition name="file-widgets-transition" appear>
        <button v-if="!fullScreenSet" id="download-file-widget" @click="openOptions()" :title="fileOptionsTitle" pulse-loop>
            <FontAwesomeIcon icon="fa-file-export" />
        </button>
    </Transition>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const scriptsStore = useScriptsStore();

const fullScreenSet = getFullScreenSet();
const { onDocumentRoute } = storeToRefs(documentStore);

const hfBottomBarVisible = useState("hosted-file-bottom-bar-visible", () => { return false; });
const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });
const fileOptionsTitle = computed(() => { return (onDocumentRoute.value ? "Open Document Options" : "Open Script Options"); });

const fileWidgets = useTemplateRef('file-widgets-container');
usePulseLoopAnimation(fileWidgets);

/** This function opens the options for the file. */
function openOptions() {
    webData.bypassBodyClick();
    webData.setMenuOpen((onDocumentRoute.value ? 3 : 2), true);
}

/** This function exits out of full screen mode for a hosted file. */
function exitFS() {
    if(onDocumentRoute.value) {
        documentStore.toggleDocumentFullScreen();
    } else {
        scriptsStore.toggleScriptFullScreen();
    }
}
</script>

<style scoped lang="scss">
#minimizeScreen-widget {
    position: fixed;
    bottom: 12px;
    left: 12px;
    background-color: var(--dark-background);
    border: 2px solid var(--lightning-yellow);
    color: var(--lightning-yellow);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    transition: var(--default-transition), scale 0.2s, opacity 0.25s, bottom 0.25s;
}
#minimizeScreen-widget:hover {
    box-shadow: 0px 0px 10px 1px var(--lightning-yellow);
    scale: 1.1;
}

#download-file-widget {
    position: fixed;
    bottom: 12px;
    left: 12px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-light-text);
    color: var(--website-light-text);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    transition: var(--default-transition), scale 0.2s, opacity 0.5s, bottom 0.5s;
}
#download-file-widget:hover {
    box-shadow: 0px 0px 10px 1px var(--website-light-text);
    scale: 1.1;
}

.file-widgets-transition-enter-active, .file-widgets-transition-leave-active {
    transition: opacity 0.5s, bottom 0.5s !important;
}
.file-widgets-transition-enter-from, .file-widgets-transition-leave-to {
    opacity: 0;
    bottom: -64px !important;
}   
.file-widgets-transition-enter-to, .file-widgets-transition-leave-from {
    opacity: 1;
    bottom: 12px !important;
}
</style>