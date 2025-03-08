<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="VUEJS_BACKGROUND"></vue-particles>
</client-only>

<div id="vuejs-page" class="personal-web-body" @click="closeNavBarDropdown()">
    <div class="vuejs-page-title">
        <img :src="vuejs_icon" draggable="false"
            title="Go To The Vue.js Website"
            @click="goToVuejsWebsite()"
            @mouseenter="setStartIconAnimation"
            @mouseleave="setStartIconAnimation"
        />
        <span>ue.js</span>
    </div>
</div>
</template>

<script setup>
import NavigationMain from '@/components/NavigationMain.vue';
import vuejs_icon from "@/assets/Vuejs_Icon.png";

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { VUEJS_BACKGROUND } from '@/stores/ParticlesConfig.js';
import { VUEJS_WEBSITE_LINK } from '@/stores/Objects.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => { initWebData(); });

/**
 * This adds and removes the animation for the start icon on the title.
 */
function setStartIconAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add("animate__animated", "animate__flash");
    } else {
        event.target.classList.remove("animate__animated", "animate__flash");
    }
}

/**
 * This function navigates the user to the Vue.js Website.
 */
function goToVuejsWebsite() {
    window.open(VUEJS_WEBSITE_LINK, "vuejs-website")
}

const WEBSITE_PATH = "https://mohit-jain.com/vuejs/";
const PAGE_TITLE = "Mohit Jain | Vue.js";
const PAGE_DESC = "As a frontend developer, Vue.js is my go-to web development framework, " +
    "offering simplicity, quick performance, and a vast ecosystem to all developers.";

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
#vuejs-page {
    background: rgba(0, 0, 0, 0.25);
}
.vuejs-page-title {
    width: 100%;
    height: fit-content;
    padding: 30px 0px 60px 0px;
    text-align: center;
    color: white;
    font-size: 120px;
    font-family: 'Lexend', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
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

@media (max-width: 600px) {
    .vuejs-page-title {
        font-size: 70px;
    }
    .vuejs-page-title img {
        width: 70px
    }
}
</style>