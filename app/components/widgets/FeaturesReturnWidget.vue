<template>
<RouterLink to="/features/" id="features-return-widget" title="Return To Features Page" v-pulse-loop>
    <FontAwesomeIcon icon="fa-bolt-lightning" />
</RouterLink>
</template>

<script setup>
onMountedAdvanced(() => { setBottomCornerWidgetAnimation("features-return-widget"); });
</script>

<style scoped lang="scss">
#features-return-widget {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: var(--dark-background);
    border: 2px solid var(--lightning-yellow);
    color: var(--lightning-yellow);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    transition: var(--default-transition), scale 0.2s;
}
#features-return-widget:hover {
    box-shadow: 0px 0px 20px var(--lightning-yellow);
    scale: 1.1;
}
</style>