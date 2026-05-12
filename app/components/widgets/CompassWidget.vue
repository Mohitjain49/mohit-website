<template>
<button id="compass-widget" ref="compass-widget" :class="htmlClass" @click="openCompass()" title="Navigate This Page" pulse-loop>
    <font-awesome-icon icon="fa-compass" />
</button>
</template>

<script setup>
const props = defineProps({ htmlClass: { type: String, default: "main" } });
const webData = useWebsiteDataStore();
const compassWidgetRef = useTemplateRef('compass-widget');
usePulseLoopAnimation(compassWidgetRef);

/** This function opens the compass for this page. */
function openCompass() {
    webData.bypassBodyClick();
    webData.setMenuOpen(1, true);
}

onMounted(async() => {
    await nextTick();
    document.getElementById("compass-widget")?.classList.add("animate__animated", "animate__fadeInUp");
    await sleep(1100);
    document.getElementById("compass-widget")?.classList.remove("animate__animated", "animate__fadeInUp");
});
</script>

<style scoped lang="scss">
#compass-widget {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    bottom: 15px;
    left: 15px;
    background-color: black;
    color: var(--website-light-text);
    border: 2px solid var(--website-light-text);
    font-size: 28px;
    height: 50px;
    width: 50px;
    border-radius: 30px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), scale 0.2s;
}
#compass-widget:hover {
    scale: 1.1;
    background-color: var(--dark-background);
    box-shadow: 0px 0px 10px 1px;
}

#compass-widget.main {
    color: var(--website-light-text);
    border-color: var(--website-light-text);
}
#compass-widget.blue {
    color: var(--blue-one);
    border-color: var(--blue-one);
}

@media (max-width: 525px) {
    #compass-widget {
        height: 45px;
        width: 45px;
        font-size: 23px;
    }
}
</style>