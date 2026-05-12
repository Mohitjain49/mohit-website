<style lang="scss">
@use "@/styles/scriptpage";
</style>

<template>
<main id="script-page" class="personal-web-body transparent">
    <div v-if="(scriptsStore.scripts[index].htmlLoaded == 2)" class="mohit-main-script" id="mohit-main-script">
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

    <div v-else-if="(scriptsStore.scripts[index].htmlLoaded == 3)" class="code-file-loading-container">
        <FontAwesomeIcon class="code-file-loadingError" icon="fa-square-xmark" />
    </div>
    <div v-else class="code-file-loading-container">
        <FontAwesomeIcon class="code-file-loadingSpinner" icon="fa-spinner" :spin-pulse="isMounted" />
    </div>

    <template v-if="fullScreenStore.fullScreenSet">
        <QrcodeTool v-if="(webData.showSharePopup)" />
        <WebScrollBar :fs-element-id="'script-page'" />
        <GamepadComponent />
    </template>

    <ParticlesBackground :particles-options="CODE_ICON_BACKGROUND" />
    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <FileWidgets />
    <ScriptLineOptions />
    <ScriptsMenu />
</main>
</template>

<script setup>
const scriptsStore = useScriptsStore();
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const isMounted = useMounted();

const props = defineProps({ index: { type: Number, required: true } });
const scriptHTML = useTemplateRef('script-html');
const scriptOptions = useTemplateRef('script-options');
usePulseLoopAnimation(scriptOptions);

onMounted(() => { scriptsStore.mountScriptPage(); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });
watch(scriptHTML, (newValue) => { if(newValue) { scriptsStore.setWrapCodeStyles(); } });

/** This function opens the scripts menu. */
function openScriptsMenu() {
    webData.bypassBodyClick();
    webData.setMenuOpen(2, true);
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
    {
        title: "Mohit Jain | My Unix Shell",
        route: "unix-shell",
        desc: "I developed a lightweight Unix shell that uses system calls like \"fork\" and \"pipe\" to run basic user commands like \"ls\", \"cd\", and \"grep\"",
        type: "default"
    },
];

const CURRENT_METADATA = PAGE_METADATA[props.index];
useHead(getMeta(CURRENT_METADATA.title, CURRENT_METADATA.route, CURRENT_METADATA.desc, "#4d3e3e", CURRENT_METADATA.type));
</script>