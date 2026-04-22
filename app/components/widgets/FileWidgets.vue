<template>
<div class="file-widgets-container" ref="file-widgets-container">
    <button v-if="fullScreenSet" id="minimizeScreen-widget" @click="fullScreenStore.exitFullScreen()" :title="minimizeTitle" pulse-loop>
        <FontAwesomeIcon :icon="fullScreenStore.faIcon" />
    </button>
    <button v-if="!fullScreenSet" id="download-file-widget" @click="openOptions()" :title="fileOptionsTitle" pulse-loop>
        <FontAwesomeIcon icon="fa-file-export" />
    </button>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const fullScreenSet = getFullScreenSet();

const { onDocumentRoute } = storeToRefs(useDocumentStore());
const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });
const fileOptionsTitle = computed(() => { return (onDocumentRoute.value ? "Open Document Options" : "Open Script Options"); });

var animationTimeout = null;
watch(fullScreenSet, () => { setWidgetAnimations(); });
onMounted(() => { setWidgetAnimations(); })

const fileWidgets = useTemplateRef('file-widgets-container');
usePulseLoopAnimation(fileWidgets);

/** This function opens the options for the file. */
function openOptions() {
    webData.bypassBodyClick();
    webData.setMenuOpen(onDocumentRoute.value ? 3 : 2);
}

/** This function manages the string animations for both widgets. */
function setWidgetAnimations() {
    if(animationTimeout != null) { clearTimeout(animationTimeout); }
    const id = (fullScreenSet.value ? "minimizeScreen-widget" : "download-file-widget");

    nextTick(() => {
        document.getElementById(id)?.classList.add("animate__animated", "animate__fadeInUp");
        animationTimeout = setTimeout(() => {
            document.getElementById(id)?.classList.remove("animate__animated", "animate__fadeInUp");
        }, 1100);
    });
}
</script>

<style scoped>
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
    transition: var(--default-transition), scale 0.2s;
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
    transition: var(--default-transition), scale 0.2s;
}
#download-file-widget:hover {
    box-shadow: 0px 0px 10px 1px var(--website-light-text);
    scale: 1.1;
}
</style>