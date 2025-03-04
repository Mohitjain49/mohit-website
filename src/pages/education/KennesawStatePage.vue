<template>
<client-only>
    <NavigationMain />
    <vue-particles id="particlests" :options="KSU_BACKGROUND"></vue-particles>

    <div id="ksu-page" class="personal-web-body" @click="closeNavBarDropdown()">
        <div id="start"></div>
        <div class="ksu-page-header">
            <a :href="KSU_LINK" target="_blank" class="ksu-page-header-img">
                <img :src="ksu_banner" draggable="false" />
            </a>
            <div class="ksu-page-header-caption"> {{ PAGE_DESC }} </div>
        </div>
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
import { KSU_BACKGROUND } from '@/stores/ParticlesConfig.js';
import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { KSU_LINK } from "@/stores/Objects.js";

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
const KSU_STYLES_LINK = "https://styleguide.kennesaw.edu/";

const WEBSITE_PATH = "https://mohit-jain.com/ksu-edu";
const PAGE_TITLE = "Mohit Jain | Kennesaw State University";
const PAGE_DESC = "As an undergraduate at Kennesaw State University, I have taken numerous courses " +
    "that help shape my understanding and practice of software development.";

onMounted(() => { webData.mountWebData(); })

/**
 * This function closes the Navigation Bar Dropdown.
 */
function closeNavBarDropdown() {
    webData.setNavBarDropdown(-1);
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
    width: 1200px;
    padding: 0px calc(50% - 600px);
}
#start {
    height: 50px;
    width: 100%;
}

.ksu-page-header {
    height: fit-content;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
}
.ksu-page-header-caption {
    height: fit-content;
    width: calc(100% - 70px);
    margin-left: 35px;
    border-radius: 10px;
    color: black;
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    text-align: center;
}

.ksu-page-header-img {
    position: relative;
    left: calc(50% - 275px);
    width: 500px;
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
    bottom: 10px;
    right: 15px;
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

@media (max-width: 640px) {
    .ksu-page-header-caption {
        font-size: 20px;
    }
    .ksu-page-header-img {
        width: calc(100% - 75px);
        left: 20px;
        padding: 5px 15px;
    }
}
@media (max-width: 450px) {
    .ksu-page-header-caption {
        font-size: 16px;
    }
}

@media (max-width: 375px) {
    .ksu-credits-link {
        position: absolute;
    }
}
</style>