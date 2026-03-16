<template>
<ScriptsMenu />
<main id="script-page" class="personal-web-body transparent">
    <template v-if="scriptsStore.scripts[index].htmlLoaded.status">
        <div class="code-file-inHTML" v-html="scriptsStore.scripts[index].html"></div>
    </template>
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
    <WebFooter v-if="!fullScreenSet" />
    <GamepadComponent v-if="fullScreenSet" />
    <FileWidgets />
    <FullScreenScrollBar :fs-element-id="'script-page'" />
</main>
</template>

<script setup>
const scriptsStore = useScriptsStore();
const fullScreenSet = getFullScreenSet();
const props = defineProps({ index: { type: Number, required: true } });

onMounted(() => { scriptsStore.mountScriptPage(); });
onBeforeUnmount(() => { scriptsStore.unmountScriptPage(); });

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

<style scoped>
.code-file-inHTML :deep(pre) {
    max-width: 1250px;
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
}

.code-file-inHTML ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border: 1px solid white;
    border-radius: 30px;
    background: var(--blue-zero);
}
.code-file-inHTML ::-webkit-scrollbar-thumb {
    background-color: var(--website-text);
    border-radius: 30px;
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

.download-file-widget {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-light-text);
    color: var(--website-light-text);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    transition: var(--default-transition), scale 0.2s;
}
.download-file-widget:hover {
    box-shadow: 0px 0px 20px var(--website-light-text);
    scale: 1.1;
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