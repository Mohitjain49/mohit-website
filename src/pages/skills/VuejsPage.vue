<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="VUEJS_BACKGROUND"></vue-particles>
</client-only>

<div id="vuejs-page" class="personal-web-body" @click="webData.setNavBarDropdown(-1)">
    <client-only>
        <div id="title" class="vuejs-page-section"
            v-observe-visibility="(isVisible) => {manageVisibilityTransition(isVisible, 'title')}">

            <div class="vuejs-page-title">
                <img :src="vuejs_icon" draggable="false"
                    :title="VUEJS_WEBSITE_LINK"
                    @click="goToVuejsWebsite()"
                    @mouseenter="webData.setFlashAnimation"
                    @mouseleave="webData.setFlashAnimation"
                />
                <span>ue.js</span>
            </div>
            <div class="vuejs-page-mainDesc">
                Vue.js is my go-to web development framework. It's lightweight 
                compared to React and Angular and incredibly simple for developers to use.
            </div>
            <div class="vuejs-page-mainLink" @click="goToVuejsWebsite()" :title="VUEJS_WEBSITE_LINK"
                @mouseenter="webData.setFlashAnimation"
                @mouseleave="webData.setFlashAnimation">

                <span> {{ VUEJS_WEBSITE_LINK }} </span>
            </div>
        </div>
        <div id="nuxt" class="vuejs-page-section"
            v-observe-visibility="(isVisible) => {manageVisibilityTransition(isVisible, 'nuxt')}">

            <div class="vuejs-page-title">
                <img :src="nuxt_icon" draggable="false"
                    :title="NUXT_WEBSITE_LINK"
                    @click="goToNuxtWebsite()"
                    @mouseenter="webData.setFlashAnimation"
                    @mouseleave="webData.setFlashAnimation"
                />
                <span>Nuxt</span>
            </div>
            <div class="vuejs-page-mainDesc">
                Nuxt is a framework that is built off of Vue.js that introduces features 
                for enabling Server-Side Rendering (SSR) and Static Site Generation (SSG) 
                on Vue.js Websites and Web Apps.
            </div>
            <div class="vuejs-page-mainLink" @click="goToNuxtWebsite()" :title="NUXT_WEBSITE_LINK"
                @mouseenter="webData.setFlashAnimation"
                @mouseleave="webData.setFlashAnimation">

                <span> {{ NUXT_WEBSITE_LINK }} </span>
            </div>
        </div>
        <div id="projects" class="vuejs-page-section"
            v-observe-visibility="(isVisible) => {manageVisibilityTransition(isVisible, 'projects')}">

            <div class="vuejs-page-title vuejs-projects-title"> My Projects </div>
            <div class="vuejs-page-mainDesc vuejs-projects-desc">
                Most of my projects have been developed using Vue.js and Nuxt. 
                Here's a list for you.
            </div>
            <a v-for="link in PROJECT_LINKS" :title="link"
                class="vuejs-page-mainLink vuejs-projects-link"
                :href="link" target="_blank"
                @mouseenter="webData.setFlashAnimation"
                @mouseleave="webData.setFlashAnimation">

                <span> {{ link }} </span>
            </a>
        </div>
    </client-only>
    <WebFooter />
</div>
</template>

<script setup>
import vuejs_icon from "@/assets/Vuejs_Icon.png";
import nuxt_icon from "@/assets/Nuxt_Icon.png";

import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';
import { getMeta } from "@/stores/GetMeta.js";

import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { VUEJS_BACKGROUND } from '@/stores/ParticlesConfig.js';
import { VUEJS_WEBSITE_LINK,
    NUXT_WEBSITE_LINK,
    WORLDS_IVUE_LINK,
    MAIN_IVUE_WEBSITE_LINK,
    IVUE_MEDIA_WEBSITE_LINK,
    IVUE_ROBOTICS_WEBSITE_LINK,
    IVUE_NEWS_WEBSITE_LINK,
    PERSONAL_GLOBE_LINK
} from '@/stores/Objects.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => { webData.mountWebData(); });
const webData = useWebsiteDataStore();
const ANIMATE_DURATION = 1000; // The time spent for the duration in milliseconds.

/**
 * This manages the transition that appears when the visibility of a section changes.
 * @param {String} id The id of the page section.
 */
function manageVisibilityTransition(isVisible, id = "start") {
    if(!isVisible || window.innerWidth <= 450) { return; }
    const children = document.getElementById(id).children;

    for(let i = 0; i < children.length; i++) {
        const animation = (((i % 2) == 0) ? "animate__lightSpeedInLeft" : "animate__lightSpeedInRight");
        children[i].classList.add("animate__animated", animation);
    }

    setTimeout(() => {
        const children = document.getElementById(id).children;
        for(let i = 0; i < children.length; i++) {
            const animation = (((i % 2) == 0) ? "animate__lightSpeedInLeft" : "animate__lightSpeedInRight");
            children[i].classList.remove("animate__animated", animation);
        }
    }, ANIMATE_DURATION);
}

/**
 * This function navigates the user to the Vue.js Website.
 */
function goToVuejsWebsite() {
    window.open(VUEJS_WEBSITE_LINK, "vuejs-website")
}

/**
 * This function navigates the user to the Nuxt Website.
 */
function goToNuxtWebsite() {
    window.open(NUXT_WEBSITE_LINK, "nuxt-website");
}

const PAGE_DESC = "As a frontend developer, Vue.js is my go-to web development framework, " +
    "offering simplicity, quick performance, and a vast ecosystem to all developers.";

useHead(getMeta("Mohit Jain | Vue.js", "vuejs", PAGE_DESC));

const PROJECT_LINKS = [
    WORLDS_IVUE_LINK,
    MAIN_IVUE_WEBSITE_LINK,
    IVUE_MEDIA_WEBSITE_LINK,
    IVUE_ROBOTICS_WEBSITE_LINK,
    IVUE_NEWS_WEBSITE_LINK,
    PERSONAL_GLOBE_LINK
]
</script>

<style scoped>
#vuejs-page {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
.vuejs-page-section {
    padding: 50px 0px 70px 0px;
    height: fit-content;
    min-height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#title {
    height: 600px;
}
#nuxt {
    height: 600px;
}
#projects {
    height: 1000px;
}

.vuejs-page-title {
    width: 100%;
    height: fit-content;
    padding: 30px 0px;
    text-align: center;
    color: white;
    font-size: 120px;
    font-family: 'Lexend', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    --animate-duration: 1s;
}
.vuejs-page-title img {
    cursor: pointer;
    width: 100px;
    user-select: none;
    margin-right: 10px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    border-radius: 12px;
    transition: var(--default-transition);
}
.vuejs-page-title img:hover {
    background-color: rgba(43, 43, 43, 0.5);
}

.vuejs-page-mainDesc {
    color: white;
    height: fit-content;
    width: 800px;
    padding: 0px calc(50% - 400px);
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    text-align: center;
    --animate-duration: 1s;
}
.vuejs-page-mainLink {
    cursor: pointer;
    width: 750px;
    height: fit-content;
    padding: 15px 25px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    border-radius: 15px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    margin-top: 40px;
    color: var(--blue-five);
    font-weight: bold;
    --animate-duration: 1s;
}

.vuejs-page-mainLink span {
    border-bottom: var(--empty-border);
    padding-top: 2px;
    padding-bottom: 1px;
    transition: var(--default-transition);
}
.vuejs-page-mainLink:hover span {
    border-color: var(--blue-five);
}

.vuejs-projects-title {
    color: var(--blue-one);
}
.vuejs-projects-desc {
    color: var(--blue-one);
    margin-bottom: 20px;
}
.vuejs-projects-link {
    margin-top: 15px;
}

@media (max-width: 800px) {
    .vuejs-projects-title {
        font-size: 70px;
    }
    .vuejs-page-mainDesc {
        width: calc(100% - 20px);
        padding: 0px 10px;
    }

    .vuejs-page-mainLink {
        width: calc(100% - 100px);
        font-size: 18px;
    }
    .vuejs-projects-desc {
        font-size: 20px;
    }
}

@media (max-width: 600px) {
    .vuejs-page-title {
        font-size: 70px;
    }
    .vuejs-page-title img {
        width: 70px;
    }
    .vuejs-page-mainDesc {
        font-size: 20px;
    }
}
</style>