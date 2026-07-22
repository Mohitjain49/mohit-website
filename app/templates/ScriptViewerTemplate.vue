<style lang="scss">
@use "@/styles/scriptpage";
</style>

<template>
<main id="script-page" class="personal-web-body transparent">
    <div class="mohit-main-script" id="mohit-main-script">
        <div ref="script-options" class="mohit-main-script-top">
            <div class="mohit-main-script-top-sideSection">
                <div class="mohit-main-script-top-group">
                    <button class="script-save-opt" @click="scriptsStore.downloadScript()" title="Download Code Script" pulse-loop>
                        <font-awesome-icon :icon="scriptsStore.downloadIcon" :spin-pulse="scriptsStore.downloadPending" />
                    </button>
                    <button class="script-save-opt" v-if="(scriptsStore.saveAsSupported && isMounted)" @click="scriptsStore.saveScript()" title="Save Code Script" pulse-loop>
                            <font-awesome-icon :icon="scriptsStore.saveScriptIcon" :spin-pulse="scriptsStore.savePending" />
                    </button>
                    <button class="script-save-opt" @click="scriptsStore.copyScript()" title="Copy Raw Code Script" pulse-loop>
                        <font-awesome-icon :icon="scriptsStore.copyIcon" :spin-pulse="scriptsStore.copyPending" />
                    </button>
                </div>
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

        <div ref="script-html" class="code-file-inHTML" v-html="html"></div>
        <HostedFileBottomBar v-if="fullScreenStore.fullScreenSet" />
    </div>

    <template v-if="fullScreenStore.fullScreenSet">
        <QrcodeTool v-if="(webData.showSharePopup)" />
        <FullScreenScrollBar :fs-element-id="'script-page'" />
        <GamepadComponent />
    </template>

    <WebCover v-if="showFsWebCover" :zIndex="500" />
    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <ParticlesBackground :particles-options="CODE_ICON_BACKGROUND" />

    <FileWidgets />
    <ScriptLineOptions />
    <ScriptsMenu />
</main>
</template>

<script setup>
const scriptsStore = useScriptsStore();
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();

const props = defineProps({ index: { type: Number, required: true } });
const scriptHTML = useTemplateRef('script-html');
const scriptOptions = useTemplateRef('script-options');
usePulseLoopAnimation(scriptOptions);

const isMounted = onMountedAdvanced(() => { scriptsStore.mountScriptPage(); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });
watch(scriptHTML, (newValue) => { if(newValue) { scriptsStore.setWrapCodeStyles(); } });

const script = scriptsStore.scripts[props.index];
const { html } = await renderCodeScript(script.code, script.suffix, script.path);

/** This determines if the Full Screen Web Cover should be visible or not. */
const showFsWebCover = computed(() => {
    if(!fullScreenStore.fullScreenSet) { return false; }
    return (webData.scriptsMenuOpen || webData.showSharePopupImmediate);
})

/** This function opens the scripts menu. */
function openScriptsMenu() {
    webData.bypassBodyClick();
    webData.setMenuOpen(SCRIPTS_MENU, true);
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
        desc: "I developed a lightweight Unix shell that uses system calls like \"fork\" and \"pipe\" to run basic user commands like \"ls\", \"cd\", and \"grep\".",
        type: "default"
    },
    {
        title: "Mohit Jain | My Upgrade Script",
        route: "upgrade-script",
        desc: "This page shows my upgrade script that I use manage my web projects.",
        type: "default"
    },
    {
        title: "Mohit Jain | My Thread Pool Implementation",
        route: "threadpool",
        desc: "I developed a lightweight Unix shell that uses concepts like Mutexes to create a functioning thread pool.",
        type: "default"
    },
    {
        title: "Mohit Jain | My Docker Utility Script",
        route: "use-docker-script",
        desc: "I developed a script that allows me and other users to easily use Docker with my website and other web applications.",
        type: "default"
    },
];

const CURRENT_METADATA = PAGE_METADATA[props.index];
useHead(getMeta(CURRENT_METADATA.title, CURRENT_METADATA.route, CURRENT_METADATA.desc, "#4d3e3e", CURRENT_METADATA.type));
</script>