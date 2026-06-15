<template>
<div ref="hosted-file-bottom-options" :class="['mohit-hostedFile-bottom', hostedFileClass]">
    <div class="mohit-document-topBar-sideSection">
        <button @click="setFS()" :title="minimizeTitle" :style="getColorStyles('var(--lightning-yellow)')" pulse-loop>
            <font-awesome-icon :icon="fullScreenStore.faIcon" />
        </button>
    </div>

    <div class="mohit-document-topBar-sideSection">
        <button v-show="(webData.wakeLock.isActive || webData.wakeLockChangeFresh)" pulse-loop
            @click="(event) => { onWakeLockButtonClick(event); }"
            :style="getColorStyles('var(--vibrant-flame)')"
            :title="webData.wakeLockTitle">

            <font-awesome-icon :flip="webData.wakeLockChangeFresh"
                :icon="(webData.wakeLock.isActive ? 'fa-lock' : 'fa-unlock')"
            />
        </button>
        <button @click="openWebsiteMenu()" :title="fileOptionsTitle" :style="getColorStyles('var(--website-light-text)')" pulse-loop>
            <FontAwesomeIcon icon="fa-file-export" />
        </button>
        <button v-if="!wholeFileInView" @click="scrollToTop(false, 0)" title="Scroll To The Top" pulse-loop>
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
const router = useRouter();

const { onDocumentRoute, onMarkdownRoute } = storeToRefs(documentStore);
const hfBottomBarVisible = useState("hosted-file-bottom-bar-visible", () => { return false; });
const wholeFileInView = useState("whole-hosted-file-in-view", () => { return false; });

const bottomOptionsBar = useTemplateRef('hosted-file-bottom-options');
const barVisible = useElementVisibility(bottomOptionsBar);
usePulseLoopAnimation(bottomOptionsBar);

// These two functions update the state on whether the hosted file bottom bar is visible or not.
onMountedAdvanced(() => { hfBottomBarVisible.value = barVisible.value; });
watch(barVisible, (newValue) => { hfBottomBarVisible.value = newValue; });

const hostedFileClass = computed(() => { return (onDocumentRoute.value ? (onMarkdownRoute.value ? "document-markdown" : "document") : "script"); });
const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });
const fileOptionsTitle = computed(() => { return (onDocumentRoute.value ? "Open Document Options" : "Open Script Options"); });

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
    webData.setMenuOpen((onDocumentRoute.value ? 3 : 2), true);
}

/**
 * This function triggers whenever someone clicks on the Wake Lock Button.
 * @param {PointerEvent} event The Click event to draw from.
 */
function onWakeLockButtonClick(event) {
    const routePath = router.currentRoute.value.path;
    if(event.ctrlKey && routePath !== "/wakelock" && routePath !== "/wakelock/") {
        router.push("/wakelock/");
    } else {
        webData.toggleWakeLock();
    }
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

.mohit-hostedFile-bottom.document-markdown {
    width: calc(100% - 40px);
    max-width: 1030px;
}
:fullscreen .mohit-hostedFile-bottom.document-markdown {
    max-width: none;
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
</style>