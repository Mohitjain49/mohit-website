<template>
<a :href="KSU_CCSE_LINK" target="mohit-ksu" class="ksu-widget animate__animated animate__fadeInUp" :title="WIDGET_TITLE">
    <img :src="ksu_logo" draggable="false" />
</a>
</template>

<script setup>
import ksu_logo from "@/assets/Kennesaw_Logo.png";
const KSU_CCSE_LINK = "https://www.kennesaw.edu/ccse/";
const WIDGET_TITLE = "I'm A Proud Computer Science Student Of Kennesaw State University!";
</script>

<style scoped>
.ksu-widget {
    position: fixed;
    bottom: 15px;
    right: 15px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-text);
    height: 60px;
    width: 60px;
    border-radius: 50%;
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
    height: 37px;
    user-select: none;
}

@media (max-width: 525px) {
    .ksu-widget {
        height: 50px;
        width: 50px;
    }
    .ksu-widget img {
        height: 27px;
    }
}
</style>