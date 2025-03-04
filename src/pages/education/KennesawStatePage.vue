<template>
<client-only>
    <NavigationMain />
    <vue-particles id="particlests" :options="KSU_BACKGROUND"></vue-particles>

    <div id="ksu-page" class="personal-web-body" @click="closeNavBarDropdown()">
        <div id="start" class="ksu-page-section" v-observe-visibility="(isVisible) => { manageKennesawVisibilityTransition(isVisible, 'start') }">
            <a :href="KSU_LINK" target="_blank" class="ksu-page-header-img">
                <img :src="ksu_banner" draggable="false" />
            </a>
            <div class="ksu-page-header-caption"> {{ PAGE_DESC }} </div>
        </div>
        <WebFooter />
    </div>

    <div class="ksu-credits-link" @click="closeNavBarDropdown()">
        <template v-if="webData.pageView == 0">
            Credits To
            <span><a :href="KSU_STYLES_LINK" target="_blank"> {{ KSU_STYLES_LINK }} </a></span>
            For All KSU Images.
        </template>
        <template v-if="webData.pageView != 0">
            <span><a :href="KSU_STYLES_LINK" target="_blank"> Credits </a></span>
        </template>
    </div>
</client-only>
</template>

<script setup>
import ksu_banner from "@/assets/ksu/Kennesaw_State_Banner.svg";

import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from "@/components/WebFooter.vue";

import { KSU_BACKGROUND } from '@/stores/ParticlesConfig.js';
import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { KSU_LINK } from "@/stores/Objects.js";

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
const KSU_STYLES_LINK = "https://styleguide.kennesaw.edu/";

const WEBSITE_PATH = "https://mohit-jain.com/ksu-edu";
const PAGE_TITLE = "Mohit Jain | Kennesaw State University";
const PAGE_DESC = "As I pursue a Bachelor's Degree of Computer Science at Kennesaw State University, I have taken numerous courses " +
    "that help shape my understanding and practice of software development.";

onMounted(() => { webData.mountWebData(); })

/**
 * This function closes the Navigation Bar Dropdown.
 */
function closeNavBarDropdown() {
    webData.setNavBarDropdown(-1);
}

/**
 * This manages the transition that appears when the visibility of a section changes.
 * @param {String} id The id of the page section.
 */
function manageKennesawVisibilityTransition(isVisible, id = "start") {
    console.log
    const children = document.getElementById(id).children;
    const transition = (leftTransition = true) => {
        return (leftTransition ? "animate__lightSpeedInLeft" : "animate__lightSpeedInRight");
    }

    for(let i = 0; i < children.length; i++) {
        if(isVisible) {
            children[i].classList.add("animate__animated", transition((i % 2) == 0));
        } else {
            children[i].classList.remove("animate__animated", transition((i % 2) == 0));
        }
    }
}

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: WEBSITE_PATH },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: WEBSITE_PATH },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})
</script>

<style scoped>
#ksu-page {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}

.ksu-page-section {
    padding-top: 50px;
    height: fit-content;
    min-height: var(--body-height);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.ksu-page-header-caption {
    height: fit-content;
    width: calc(100% - 50px);
    max-width: 1150px;
    border-radius: 10px;
    color: black;
    font-family: 'Montserrat', sans-serif;
    font-size: 33px;
    text-align: center;
    padding-bottom: 100px;
}

.ksu-page-header-img {
    width: 750px;
    height: fit-content;
    padding: 10px 25px;
    margin: 10px 0px;
    border-radius: 10px;
    transition: var(--default-transition);
}
.ksu-page-header-img:hover {
    background-color: rgba(0, 0, 0, 0.25);
}
.ksu-page-header-img img {
    width: 100%;
    height: auto;
    user-select: none;
}

.ksu-credits-link {
    position: fixed;
    width: fit-content;
    height: fit-content;
    top: 60px;
    left: 15px;
    color: black;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 10px;
    z-index: 10;
}
.ksu-credits-link a {
    color: var(--blue-five);
    transition: var(--default-transition);
    border-bottom: var(--thin-empty-border);
    padding-top: 2px;
    padding-bottom: 1px;
}
.ksu-credits-link a:hover {
    border-color: var(--blue-five);
}

@media (max-width: 1200px) {
    #ksu-page {
        padding: 0px;
        width: 100%;
    }
}

@media (max-width: 900px) {
    .ksu-page-header-caption {
        font-size: 25px;
    }
    .ksu-page-header-img {
        width: calc(100% - 75px);
        padding: 5px 15px;
    }
}

@media (max-width: 600px) {
    .ksu-page-header-caption {
        font-size: 17px;
    }
}
</style>