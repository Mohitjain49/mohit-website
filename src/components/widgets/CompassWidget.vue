<template>
<button id="compass-widget" ref="compass-widget" @click="openCompass()" title="Navigate This Page" pulse-loop>
    <font-awesome-icon icon="fa-compass" />
</button>
</template>

<script setup>
const webData = useWebsiteDataStore();
const compassWidgetRef = useTemplateRef('compass-widget');
usePulseLoopAnimation(compassWidgetRef);

/** This function opens the compass for this page. */
function openCompass() {
    webData.bypassBodyClick();
    webData.setMenuOpen(1);
}

onMounted(() => { nextTick(() => {
    document.getElementById("compass-widget")?.classList.add("animate__animated", "animate__fadeInUp");
    setTimeout(() => { document.getElementById("compass-widget")?.classList.remove("animate__animated", "animate__fadeInUp"); }, 1100);
}); });
</script>

<style scoped>
#compass-widget {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    bottom: 15px;
    left: 15px;
    background-color: black;
    color: var(--blue-one);
    border: 2px solid var(--blue-one);
    font-size: 28px;
    height: 50px;
    width: 50px;
    border-radius: 30px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), height 0.2s, width 0.2s;
}
#compass-widget:hover {
    background-color: var(--dark-background);
}

@media (max-width: 800px) {
    #compass-widget {
        bottom: 10px;
        left: 10px;
    }
}
</style>