<template>
<CompassWidget />
<a :href="KSU_CCSE_LINK" target="mohit-ksu" id="ksu-widget" :title="KSU_WIDGET_TITLE" pulse-loop>
    <img :src="ksu_logo" draggable="false" />
</a>
</template>

<script setup>
import ksu_logo from "~/assets/Kennesaw_Logo.png";
const KSU_CCSE_LINK = "https://www.kennesaw.edu/ccse/";
const KSU_WIDGET_TITLE = "I'm A Proud Computer Science Student Of Kennesaw State University!";

onMounted(async() => {
    await nextTick();
    document.getElementById("ksu-widget")?.classList.add("animate__animated", "animate__fadeInUp");
    await sleep(1100);
    document.getElementById("ksu-widget")?.classList.remove("animate__animated", "animate__fadeInUp");
});
</script>

<style scoped>
#ksu-widget {
    position: fixed;
    bottom: 15px;
    right: 15px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-text);
    height: 55px;
    width: 55px;
    border-radius: 30px;
    overflow: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition), scale 0.2s;
}
#ksu-widget:hover {
    scale: 1.1;
    border-color: #FEC52E;
    box-shadow: 0px 0px 10px 1px #FEC52E;
}
#ksu-widget img {
    height: 32px;
    user-select: none;
}

@media (max-width: 525px) {
    #ksu-widget {
        height: 45px;
        width: 45px;
    }
    #ksu-widget img {
        height: 23px;
    }
}
</style>