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
import PageSector from '../components/body-components/PageSector.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

import { PAGE_SECTORS } from '../stores/Objects.js';
import headshot from "../assets/Mohit_Headshot.jpeg";

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

<style scoped>
.web-main-mediaSection {
    height: 40vw;
    min-height: 600px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.web-main-half {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.web-main-basic-text {
    position: relative;
    height: auto;
    top: 10%;
    width: 90%;
    font-size: 25px;
    font-family: monospace;
    color: var(--website-text);
}
.web-main-headshot {
    position: relative;
    width: 50%;
    top: 10%;
}

.web-main-pageBreak {
    height: 25px;
    width: 100%;
    background: var(--sector-background);
}

.incomplete-background {
    background: var(--webpage-background);
    flex-direction: column;
}
.incomplete-title {
    font-size: 50px;
    margin-bottom: 25px;
}

@media (max-width: 600px) {
    .web-main-mediaSection {
        grid-template-columns: 1fr;
        height: auto;
        min-height: auto;
    }
    .web-main-basic-text {
        top: 0%;
        padding-top: 20px;
    }
    .web-main-headshot {
        top: 0%;
    }
    .web-main-half {
        margin-bottom: 50px;
    }
}
</style>