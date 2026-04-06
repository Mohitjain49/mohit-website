<template>
<CompassWidget />
<a :href="KSU_CCSE_LINK" target="mohit-ksu" id="ksu-widget" :title="KSU_WIDGET_TITLE" pulse-loop>
    <img :src="ksu_logo" draggable="false" />
</a>
</template>

<script setup>
import ksu_logo from "@/assets/Kennesaw_Logo.png";
const KSU_CCSE_LINK = "https://www.kennesaw.edu/ccse/";
const KSU_WIDGET_TITLE = "I'm A Proud Computer Science Student Of Kennesaw State University!";

onMounted(() => { nextTick(() => {
    document.getElementById("ivue-widget")?.classList.add("animate__animated", "animate__fadeInUp");
    document.getElementById("ksu-widget")?.classList.add("animate__animated", "animate__fadeInUp");

    setTimeout(() => {
        document.getElementById("ivue-widget")?.classList.remove("animate__animated", "animate__fadeInUp");
        document.getElementById("ksu-widget")?.classList.remove("animate__animated", "animate__fadeInUp");
    }, 1100);
}); });
</script>

<style scoped>
#ivue-widget {
    position: fixed;
    bottom: 15px;
    left: 15px;
    background-color: var(--dark-background);
    border: 2px solid white;
    height: 55px;
    width: 75px;
    border-radius: 32px;
    overflow: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition);
}
#ivue-widget:hover {
    border-color: #48A548;
    box-shadow: 0px 0px 10px white;
}
#ivue-widget img {
    height: 75px;
    user-select: none;
}

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
    transition: var(--default-transition);
}
#ksu-widget:hover {
    border-color: #FEC52E;
}
#ksu-widget img {
    height: 32px;
    user-select: none;
}

@media (max-width: 525px) {
    #ivue-widget {
        height: 45px;
        width: 68px;
    }
    #ivue-widget img {
        height: 62px;
    }

    #ksu-widget {
        height: 45px;
        width: 45px;
    }
    #ksu-widget img {
        height: 23px;
    }
}
</style>