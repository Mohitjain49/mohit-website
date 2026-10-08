<style lang="scss">
@use "@/styles/scriptpage";
</style>

<template>
<main id="script-page" class="personal-web-body transparent">
    <div class="mohit-main-script" id="mohit-main-script">
        <ScriptTopBar />
        <div ref="script-html" class="code-file-inHTML" v-html="html"></div>
        <HostedFileBottomBar v-if="fullScreenStore.fullScreenSet" />
    </div>

    <template v-if="fullScreenStore.fullScreenSet">
        <QrcodeTool v-if="(webData.showSharePopup)" />
        <FullScreenScrollBar :fs-element-id="'script-page'" />
    </template>

    <template v-if="scriptsStore.scriptBlobCreated">
        <FileWidgets />
        <ScriptLineOptions />
        <ScriptsMenu />
    </template>

    <WebCover v-if="showFsWebCover" :zIndex="500" />
    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <ParticlesBackground :particles-options="CODE_ICON_BACKGROUND" />
</main>
</template>

<script setup>
const scriptsStore = useScriptsStore();
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();

const props = defineProps({ index: { type: Number, required: true } });
const scriptHTML = useTemplateRef('script-html');

onMountedAdvanced(() => { scriptsStore.mountScriptPage(numLines); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });
watch(scriptHTML, (newValue) => { if(newValue) { scriptsStore.setWrapCodeStyles(); } });

const script = scriptsStore.scripts[props.index];
const { html, success, numLines } = await renderCodeScript(script.code, script.suffix, script.path);

// This throws an error if the HTML could not be rendered properly for the script.
if(!success) { throw createError({ status: 500, message: "Could Not Render HTML For Script." }); }

/** This determines if the Full Screen Web Cover should be visible or not. */
const showFsWebCover = computed(() => {
    if(!fullScreenStore.fullScreenSet) { return false; }
    return (webData.scriptsMenuOpen || webData.showSharePopupImmediate);
});

const PAGE_METADATA = [
    {
        title: "Mohit Jain | My AWS Deployment Script",
        route: "aws-deploy-script",
        desc: "This page shows my AWS deployment script that I use for my websites and web applications.",
        type: "default"
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