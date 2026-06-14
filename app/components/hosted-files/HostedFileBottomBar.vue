<template>
<div ref="hosted-file-bottom-options" :class="['mohit-hostedFile-bottom', hostedFileClass]">
    <div class="mohit-document-topBar-sideSection">
        <button @click="setFS()" :title="minimizeTitle" :style="getColorStyles('var(--lightning-yellow)')" pulse-loop>
            <font-awesome-icon :icon="fullScreenStore.faIcon" />
        </button>
    </div>
    <div class="mohit-document-topBar-sideSection">
        <button @click="scrollToTop(false, 0)" title="Scroll To The Top" pulse-loop>
            <font-awesome-icon icon="fa-turn-up" />
        </button>
    </div>
</div>
</template>

<script setup>
const fullScreenStore = useFullScreenStore();
const documentStore = useDocumentStore();
const scriptsStore = useScriptsStore();

const { onDocumentRoute, onMarkdownRoute } = storeToRefs(documentStore);
const bottomOptionsBar = useTemplateRef('hosted-file-bottom-options');
usePulseLoopAnimation(bottomOptionsBar);

const hostedFileClass = computed(() => { return (onDocumentRoute.value ? (onMarkdownRoute.value ? "document-markdown" : "document") : "script"); });
const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });

/** This function sets the full screen mode for a hosted file. */
function setFS() {
    if(onDocumentRoute.value) {
        documentStore.toggleDocumentFullScreen();
    } else {
        scriptsStore.toggleScriptFullScreen();
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