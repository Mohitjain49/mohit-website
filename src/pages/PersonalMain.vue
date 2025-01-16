<template>
    <NavigationMain />
    <div class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}"
        style="background: var(--webpage-static-background)">

        <div class="web-main-mediaSection">
            <div class="web-main-half" :style="getAlignment()">
                <div class="web-main-basic-text center-flex-display" v-html="MAIN_DESC"></div>
            </div>
            <div class="web-main-half" :style="getAlignment()">
                <img :src="headshot" class="web-main-headshot" />
            </div>
        </div>

        <SkillsSection />

        <PageSector :sectorObj="PAGE_SECTORS[1]" />
        <PageSector :sectorObj="PAGE_SECTORS[2]" />
        <PageSector :sectorObj="PAGE_SECTORS[0]" />
    </div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import SkillsSection from '../components/home/SkillsSection.vue';

// import MainSector from '../components/body-components/MainSector.vue';
import PageSector from '../components/body-components/PageSector.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

import { MAIN_SKILLS_SECTOR, PAGE_SECTORS } from '../stores/Objects.js';
import headshot from "../assets/Mohit_Headshot.jpeg";
import "../styles/mainpage.css";

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain";
    webData.mountWebData();
})

/**
 * This returns the slingment for the media section half.
 */
function getAlignment() {
    return { 'align-items': ((webData.pageView == 2) ? 'center' : 'flex-start') }
}

/**
 * The main description of who I am.
 */
const MAIN_DESC = "Hi! I'm Mohit Jain, a software developer that seeks to inspire everyone in today's world, " +
    "designing, developing, and organizing intuitive and colorful User Interfaces for apps and websites alike." +
    "<br><br>Change the color of my website at the top left of the window!";
</script>

<style>

</style>