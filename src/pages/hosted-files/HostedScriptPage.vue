<template>
<ScriptsMenu />
<main id="script-page" class="personal-web-body transparent">
    <div v-if="scriptsStore.scripts[index].htmlLoaded.status" class="mohit-main-script">
        <div ref="script-options" class="mohit-main-script-top">
            <div class="mohit-main-script-top-sideSection">
                <button class="lightblue" @click="scriptsStore.downloadScript()" title="Download Code Script" pulse-loop>
                    <font-awesome-icon :icon="scriptsStore.downloadIcon" :spin-pulse="scriptsStore.scriptDownloadStatus.pending" />
                </button>
                <button class="blue" v-if="scriptsStore.saveAsSupported" @click="scriptsStore.saveScript()" title="Save Code Script" pulse-loop>
                        <font-awesome-icon :icon="scriptsStore.saveScriptIcon" :spin-pulse="scriptsStore.scriptSaveStatus.pending" />
                </button>
                <button class="lightblue" @click="scriptsStore.copyScript()" title="Copy Raw Code Script" pulse-loop>
                    <font-awesome-icon :icon="scriptsStore.copyIcon" :spin-pulse="scriptsStore.scriptCopyStatus.pending" />
                </button>
                <a class="white" v-if="(scriptsStore.currentScriptLink != '')" :href="scriptsStore.currentScriptLink" title="See Code On Github" pulse-loop>
                    <font-awesome-icon icon="fa-brands fa-github" />
                </a>
            </div>
            <div class="mohit-main-script-top-sideSection">
                <button @click="openScriptsMenu()" title="Open Script Options" pulse-loop>
                    <FontAwesomeIcon icon="fa-file-export" />
                </button>
                <button class="flame" @click="scriptsStore.setCodeWrapping('toggle')" :title="scriptsStore.wrapStatement" pulse-loop>
                    <FontAwesomeIcon :icon="scriptsStore.wrapIcon" />
                </button>
                <button @click="scriptsStore.toggleScriptFullScreen()" :title="fullScreenStore.elementTitle" pulse-loop>
                    <FontAwesomeIcon :icon="fullScreenStore.faIcon" />
                </button>
            </div>
        </div>
        <div ref="script-html" class="code-file-inHTML" v-html="scriptsStore.scripts[index].html"></div>
    </div>
    <template v-else-if="scriptsStore.scripts[index].htmlLoaded.error">
        <div class="code-file-loadingBar-container">
            <FontAwesomeIcon class="code-file-loadingError" icon="fa-square-xmark" />
        </div>
    </template>
    <template v-else>
        <div class="code-file-loadingBar-container">
            <div class="code-file-loadingBar">
                <div class="inner" :style="{ 'width': scriptsStore.scripts[index].progressStr }"></div>
            </div>
            <p> {{ scriptsStore.scripts[index].progressStr }} </p>
        </div>
    </template>

    <ParticlesBackground :particles-options="CODE_ICON_BACKGROUND" />
    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <GamepadComponent v-if="fullScreenStore.fullScreenSet" />
    <FileWidgets />
    <FullScreenScrollBar :fs-element-id="'script-page'" />
</main>
</template>

<script setup>
const scriptsStore = useScriptsStore();
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();

const props = defineProps({ index: { type: Number, required: true } });
const scriptHTML = useTemplateRef('script-html');
const scriptOptions = useTemplateRef('script-options');
const { reset: resetPulseLoop } = usePulseLoopAnimation(scriptOptions);

onMounted(() => { scriptsStore.mountScriptPage(); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });

watch(scriptHTML, () => {
    if(scriptHTML.value) { scriptsStore.setWrapCodeStyles(); }
    resetPulseLoop();
});

/** This function opens the scripts menu. */
function openScriptsMenu() {
    webData.bypassBodyClick();
    webData.setMenuOpen(2);
}

const PAGE_METADATA = [
    {
        title: "Mohit Jain | My AWS Deployment Script",
        route: "aws-deploy-script",
        desc: "This page shows my AWS deployment script that I use for my websites and web applications.",
        type: "default"
    },
    {
        title: "Mohit Jain | Gamepad Controls | Pinia Store and Gamepad Utility Code",
        route: "gamepad/store-and-utility",
        desc: "This page shows the main code that this website uses to implement Gamepad functionality.",
        type: "gamepad-extra"
    },
    {
        title: "Mohit Jain | Gamepad Controls | Vue.js Component Code",
        route: "gamepad/vuejs-component",
        desc: "This page shows the code that displays the gamepad cursor and other components activated by the gamepad on this website.",
        type: "gamepad-extra"
    },
    {
        title: "Mohit Jain | Gamepad Controls | Custom Events",
        route: "gamepad/custom-events",
        desc: "This page shows the code that fires and handles the custom gamepad events I made on my website.",
        type: "gamepad-extra"
    },
];

const CURRENT_METADATA = PAGE_METADATA[props.index];
useHead(getMeta(CURRENT_METADATA.title, CURRENT_METADATA.route, CURRENT_METADATA.desc, "#4d3e3e", CURRENT_METADATA.type));
</script>

<style>
.mohit-main-script {
    padding: 10px 20px;
    margin: 20px auto;
    border-radius: 10px;
    max-width: 1250px;
    width: calc(100% - 70px);
    height: fit-content;
    min-height: var(--body-height);
    background-color: #121212 !important;
}
#mohit-scriptPage-code {
    width: 100%;
    height: fit-content;
    overflow-y: hidden;
    overflow-x: auto;
    border-top-left-radius: 10px;
    border-color: #121212 !important;
    background-color: #121212 !important;
}
#mohit-scriptPage-code-inner {
    width: 100%;
    display: flex !important;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}

.mohit-scriptPage-code-line {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: row;
    scroll-margin-top: 90px;
}
.mohit-scriptPage-code-line-content {
    width: calc(100% - 45px);
    height: fit-content;
    padding-bottom: 2px;
}

.mohit-scriptPage-code-lineNum {
    height: auto;
    width: 32px;
    display: inline-block;
    text-align: right;
    margin-right: 5px;
    background-color: rgba(255, 255, 255, 0.1);
}
.mohit-scriptPage-code-lineNum a, .mohit-scriptPage-code-lineNum button {
    width: 27px;
    height: 100%;
    font-size: 12px;
    text-align: right;
    display: inline-block;
    padding-right: 5px;
    padding-bottom: 2px;
    border-right: 1px solid lightgray;
    transition: var(--default-transition);
}
.mohit-scriptPage-code-lineNum a:hover, .mohit-scriptPage-code-lineNum button:hover {
    color: var(--website-light-text);
    border-right: 3px solid var(--website-light-text);
    background-color: rgba(255, 255, 255, 0.25);
}

.mohit-main-script-top {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}
.mohit-main-script-top-sideSection {
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 10px;
    gap: 5px;
}

.mohit-main-script-top button, .mohit-main-script-top a {
    color: var(--website-light-text);
    border: 1px solid var(--website-light-text);
    border-radius: 7px;
    font-size: 12px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: scale 0.2s, background-color 0.2s;
}
.mohit-main-script-top button:hover, .mohit-main-script-top a:hover {
    scale: 1.1;
    background-color: black;
}

.mohit-main-script-top button.flame, .mohit-main-script-top a.flame {
    color: var(--vibrant-flame);
    border-color: var(--vibrant-flame);
}
.mohit-main-script-top button.white, .mohit-main-script-top a.white {
    color: white;
    border-color: white;
}
.mohit-main-script-top button.lightblue, .mohit-main-script-top a.lightblue {
    color: var(--blue-one);
    border-color: var(--blue-one);
}
.mohit-main-script-top button.blue, .mohit-main-script-top a.blue {
    color: var(--blue-three);
    border-color: var(--blue-three);
}

.code-file-inHTML ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border: 1px solid white;
    background: var(--blue-zero);
}
.code-file-inHTML ::-webkit-scrollbar-thumb {
    background-color: var(--website-text);
    transition: background-color 0.2s;
}
.code-file-inHTML ::-webkit-scrollbar-thumb:hover {
    background-color: var(--website-dark-text);
}
.code-file-inHTML ::-webkit-scrollbar-button {
    display: none;
}

.code-file-loadingBar-container {
    max-width: 1000px;
    width: calc(100% - 70px);
    height: fit-content;
    min-height: var(--body-height);
    overflow-y: hidden;
    overflow-x: auto;
    left: 10px;
    padding: 30px 0px;
    border-left: 20px solid;
    border-right: 20px solid;
    border-color: #121212 !important;
    border-radius: 15px;
    margin: 20px auto;
    background-color: #121212 !important;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
}
.code-file-loadingBar-container p {
    color: var(--globe-green-light);
    font-family: 'Lexend', sans-serif;
    font-size: 18px;
    margin-left: 7px;
}

.code-file-loadingBar {
    height: 20px;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    box-shadow: 0px 0px 3px 0px white;
    border-radius: 20px;
    overflow: hidden;
    animation: border-pulse 0.2s linear infinite alternate;
}
.code-file-loadingBar .inner {
    width: 0%;
    height: 100%;
    background-color: var(--globe-green-light);
    border-radius: 20px;
}

.code-file-loadingError {
    color: red;
    font-size: 50px;
}

@keyframes border-pulse {
    from {
        border-color: white;
        box-shadow: 0px 0px 3px 0px white;
    }
    to {
        border-color: var(--lightning-yellow);
        box-shadow: 0px 0px 8px 0px var(--lightning-yellow);
    }
}
</style>