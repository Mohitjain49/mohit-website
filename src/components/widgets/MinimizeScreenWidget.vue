<template>
<button v-if="fullScreenStore.fullScreenSet" @click="fullScreenStore.exitFullScreen()"
    class="minimizeScreen-widget animate__animated animate__fadeInUp"
    :title="fullScreenStore.docElementTitle">

    <FontAwesomeIcon :icon="fullScreenStore.faIcon" />
</button>
</template>

<script setup>
const fullScreenStore = useFullScreenStore();
</script>

<style scoped>
.minimizeScreen-widget {
    position: fixed;
    bottom: 15px;
    left: 15px;
    background-color: var(--dark-background);
    border: 2px solid var(--lightning-yellow);
    color: var(--lightning-yellow);
    height: 45px;
    width: 45px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    transition: var(--default-transition), scale 0.2s;
}
.minimizeScreen-widget:hover {
    box-shadow: 0px 0px 20px var(--lightning-yellow);
    scale: 1.1;
}
</style>