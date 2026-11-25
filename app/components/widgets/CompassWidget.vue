<template>
<Transition name="compass-widget-transition" appear>
    <AnimatedIconButton v-if="webData.compassMenuMounted" title="Navigate This Page" :faIcon="'fa-compass'"
        :class="['compass-widget', props.htmlClass]"
        :handleClick="() => { openCompass(); }"
    />
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const props = defineProps({ htmlClass: { type: String, default: "main" } });

/** This function opens the compass for this page. */
function openCompass() {
    webData.bypassBodyClick();
    webData.setMenuOpen(COMPASS_MENU, true);
}
</script>

<style scoped lang="scss">
.compass-widget {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    bottom: 12px;
    left: 12px;
    background-color: black;
    color: var(--website-light-text);
    border: 2px solid var(--website-light-text);
    font-size: 20px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), scale 0.2s;
}
.compass-widget:hover {
    scale: 1.1;
    background-color: var(--dark-background);
    box-shadow: 0px 0px 10px 1px;
}

.compass-widget.main {
    color: var(--website-light-text);
    border-color: var(--website-light-text);
}
.compass-widget.blue {
    color: var(--blue-one);
    border-color: var(--blue-one);
}

.compass-widget-transition-enter-active, .compass-widget-transition-leave-active {
    transition: opacity 0.5s, transform 0.5s !important;
}
.compass-widget-transition-enter-from, .compass-widget-transition-leave-to {
    opacity: 0;
    transform: translateY(74px);
    user-select: none;
    pointer-events: none;
    touch-action: none;
    interactivity: inert;
}   
.compass-widget-transition-enter-to, .compass-widget-transition-leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>