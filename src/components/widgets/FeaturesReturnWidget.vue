<template>
<RouterLink to="/features/" class="features-return-widget animate__animated animate__fadeInUp" title="Return To Features Page">
    <FontAwesomeIcon icon="fa-bolt-lightning" />
</RouterLink>
</template>

<style scoped>
.features-return-widget {
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
.features-return-widget:hover {
    box-shadow: 0px 0px 20px var(--lightning-yellow);
    scale: 1.1;
}
</style>