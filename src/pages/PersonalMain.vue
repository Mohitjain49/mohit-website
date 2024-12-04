<template>
    <NavigationMain />
    <div class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
        <div class="web-main-mediaSection">
            <div class="web-main-half" :style="{ 'align-items': mobileView ? 'center' : 'flex-start'}">
                <div class="web-main-basic-text center-flex-display" v-html="MAIN_DESC"></div>
            </div>
            <div class="web-main-half" :style="{ 'align-items': mobileView ? 'center' : 'flex-start'}">
                <img :src="headshot" class="web-main-headshot" />
            </div>
        </div>

        <MainSector :sectorObj="MAIN_SKILLS_SECTOR" />
        <div class="web-main-pageBreak"></div>
        <div class="web-main-pageBreak"></div>

        <PageSector :sectorObj="PAGE_SECTORS[1]" />
        <PageSector :sectorObj="PAGE_SECTORS[2]" />
        <PageSector :sectorObj="PAGE_SECTORS[0]" />
    </div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import MainSector from '../components/body-components/MainSector.vue';
import PageSector from '../components/body-components/PageSector.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { ref, onMounted, onUnmounted } from 'vue';

import { MAIN_SKILLS_SECTOR, PAGE_SECTORS } from '../stores/Objects.js';
import headshot from "../assets/Mohit_Headshot.jpeg";
import "../styles/mainpage.css";

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain";
    webData.mountWebData();

    setMainPage();
    window.addEventListener("resize", setMainPage);
})
onUnmounted(() => {
    window.removeEventListener("resize", setMainPage);
})

const mobileView = ref(false);

/**
 * This sets some styles of the main page.
 */
const setMainPage = () => {
    mobileView.value = (window.innerWidth < 601);
}

/**
 * The main description of who I am.
 */
const MAIN_DESC = "Hi! I'm Mohit Jain, a software developer that seeks to inspire everyone in today's world, " +
    "designing, developing, and organizing intuitive and colorful User Interfaces for apps and websites alike." +
    "<br><br>Change the color of my website at the top left of the window!";
</script>