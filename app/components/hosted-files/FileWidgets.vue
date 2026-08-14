<template>
<div class="file-widgets-container" ref="file-widgets-container">
    <Transition name="file-widgets-transition" appear>
        <button v-if="showMinimizeWidget" id="minimizeScreen-widget" @click="exitFS()" :title="minimizeTitle" pulse-loop>
            <FontAwesomeIcon icon="fa-compress" />
        </button>
    </Transition>
    <Transition name="file-widgets-transition" appear>
        <button v-if="!fullScreenSet" id="download-file-widget" @click="openOptions()" :title="fileOptionsTitle" pulse-loop>
            <FontAwesomeIcon :icon="(onDocumentRoute ? 'fa-file-pdf' : 'fa-file-export')" />
        </button>
    </Transition>

    <Transition name="file-widgets-transition" appear>
        <div v-if="showPageNavigationWidget" class="page-navigation-widget">
            <button :class="['page-nav-side-button', (onFirstPage ? 'inactive' : '')]" @click="navigatePage('down')" :title="previousPageScrollTitle">
                <FontAwesomeIcon icon="fa-chevron-left" />
            </button>
            <div class="page-nav-center">
                <input id="page-number-mohit" type="text" readonly v-model="currentObservedPage" />
                <span>{{ ('/ ' + documentStore.docLoaded.totalPages) }}</span>  
            </div>
            <button :class="['page-nav-side-button', (onLastPage ? 'inactive' : '')]" @click="navigatePage('up')" :title="nextPageScrollTitle">
                <FontAwesomeIcon icon="fa-chevron-right" />
            </button>
        </div>
    </Transition>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const scriptsStore = useScriptsStore();

const fullScreenSet = getFullScreenSet();
const { width: windowWidth } = useMohitWindowSize();
const { onDocumentRoute, onMarkdownRoute, currentObservedPage } = storeToRefs(documentStore);
const { isAutoScrolling } = storeToRefs(useScrollStore());

const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });
const fileOptionsTitle = computed(() => { return (onDocumentRoute.value ? "Open Document Options" : "Open Script Options"); });

const hfBottomBarVisible = useState("hosted-file-bottom-bar-visible", () => { return false; });
const largeWindowWidth = computed(() => { return (onDocumentRoute.value && !onMarkdownRoute.value && (windowWidth.value > documentStore.customPdfWidth + 150)); });
const showMinimizeWidget = computed(() => { return (fullScreenSet.value && (!hfBottomBarVisible.value || largeWindowWidth.value)); });
const showPageNavigationWidget = computed(() => {
    return (onDocumentRoute.value && !onMarkdownRoute.value && documentStore.docLoaded.status && (documentStore.docLoaded.totalPages > 1));
});

const onFirstPage = computed(() => { return (currentObservedPage.value <= 1); });
const onLastPage = computed(() => { return (currentObservedPage.value >= documentStore.docLoaded.totalPages); });

const previousPageScrollTitle = computed(() => {
    return (onFirstPage.value ? 'Cannot Scroll Before Page 1.' : ('Scroll To Page ' + (currentObservedPage.value - 1)));
});
const nextPageScrollTitle = computed(() => {
    return (onLastPage.value ? ('Cannot Scroll After Page ' + currentObservedPage.value + '.') : ('Scroll To Page ' + (currentObservedPage.value + 1)));
});

const fileWidgets = useTemplateRef('file-widgets-container');
usePulseLoopAnimation(fileWidgets);

/** This function opens the options for the file. */
function openOptions() {
    webData.bypassBodyClick();
    webData.setMenuOpen((onDocumentRoute.value ? DOCUMENT_MENU : SCRIPTS_MENU), true);
}

/** This function exits out of full screen mode for a hosted file. */
function exitFS() {
    if(!fullScreenSet.value) { return; }
    if(onDocumentRoute.value) {
        documentStore.toggleDocumentFullScreen();
    } else {
        scriptsStore.toggleScriptFullScreen();
    }
}

/**
 * This function navigates a page either up or down one page.
 * @param {"up" | "down"} direction The direction to go.
 */
function navigatePage(direction = "up") {
    if(isAutoScrolling.value) { return; }
    if(direction === "up" && !onLastPage.value) {
        documentStore.scrollToPage(Math.max(1, (currentObservedPage.value + 1)));
    } else if(direction === "down" && !onFirstPage.value) {
        documentStore.scrollToPage(Math.min(documentStore.docLoaded.loadedPages, (currentObservedPage.value - 1)));
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

.page-navigation-widget {
    position: fixed;
    bottom: 12px;
    left: calc((100% - 125px) / 2);
    height: 25px;
    width: 125px;
    background-color: black;
    border: 2px solid white;
    color: white;
    border-radius: 10px;
    overflow: hidden;
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 20px;
    box-shadow: 0px 0px 10px 2px black;
    overflow: hidden;
}
.page-nav-center {
    width: 73px;
    border-left: 1px solid white;
    border-right: 1px solid white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: inherit;
    font-family: 'lexend', sans-serif;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
}

.page-nav-center input {
    all: unset;
    width: 25px;
    text-align: center;
    background-color: rgb(71, 71, 71);
    margin-right: 3px;
    border-radius: 4px;
    border: 1px solid white;
    user-select: none;
}

.page-nav-side-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 25px;
    height: 100%;
    transition: var(--default-transition);
    color: white;
    background-color: transparent;
}
.page-nav-side-button svg {
    width: 15px;
    height: 15px;
}

.page-nav-side-button.inactive { color: grey; }
.page-nav-side-button.inactive:hover { background-color: transparent; }
.page-nav-side-button:hover { background-color: rgba(255, 255, 255, 0.25); }

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