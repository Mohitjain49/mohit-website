<template>
<RouterLink to="/#ivue" @click="goToIvueSection" class="ivue-widget animate__animated animate__fadeInUp" :title="IVUE_WIDGET_TITLE">
    <img :src="ivue_logo" draggable="false" />
</RouterLink>
<a :href="KSU_CCSE_LINK" target="mohit-ksu" class="ksu-widget animate__animated animate__fadeInUp" :title="KSU_WIDGET_TITLE">
    <img :src="ksu_logo" draggable="false" />
</a>
</template>

<script setup>
import ksu_logo from "@/assets/Kennesaw_Logo.png";
import ivue_logo from "@/assets/ivue/iVue_White_Text.png";

const KSU_CCSE_LINK = "https://www.kennesaw.edu/ccse/";
const KSU_WIDGET_TITLE = "I'm A Proud Computer Science Student Of Kennesaw State University!";
const IVUE_WIDGET_TITLE = "See My Experience With iVue!";

/** This function takes the visitor to the ivue section of my website. */
function goToIvueSection() {
    try { goToPageSection('ivue'); } catch(e) {}
}
</script>

<style scoped>
.ivue-widget {
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
.ivue-widget:hover {
    border-color: #48A548;
    box-shadow: 0px 0px 10px white;
}
.ivue-widget img {
    height: 75px;
    user-select: none;
}

.ksu-widget {
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
.ksu-widget:hover {
    border-color: #FEC52E;
}
.ksu-widget img {
    height: 32px;
    user-select: none;
}

@media (max-width: 525px) {
    .ivue-widget {
        height: 45px;
        width: 68px;
    }
    .ivue-widget img {
        height: 62px;
    }

    .ksu-widget {
        height: 45px;
        width: 45px;
    }
    .ksu-widget img {
        height: 23px;
    }
}
</style>