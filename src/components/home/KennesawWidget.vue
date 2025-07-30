<template>
<a :href="KSU_CCSE_LINK" target="mohit-ksu" class="ksu-widget" :title="WIDGET_TITLE">
    <img :src="ksu_logo" draggable="false" />
</a>
</template>

<script setup>
import ksu_logo from "@/assets/Kennesaw_Logo.png";
const KSU_CCSE_LINK = "https://www.kennesaw.edu/ccse/";
const WIDGET_TITLE = "I'm a proud Computer Science Student of Kennesaw State University!";
</script>

<style scoped>
.ksu-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-text);
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 9900;
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
</style>