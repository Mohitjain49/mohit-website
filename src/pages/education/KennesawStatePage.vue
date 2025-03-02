<template>
<client-only>
    <NavigationMain />
    <vue-particles id="particlests" :options="KSU_BACKGROUND"></vue-particles>

    <div id="ksu-page" class="personal-web-body" @click="closeNavBarDropdown()">

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
import NavigationMain from '@/components/NavigationMain.vue';
import { KSU_BACKGROUND } from '@/stores/ParticlesConfig.js';
import { useWebsiteDataStore } from '@/stores/WebsiteData.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
const KSU_STYLES_LINK = "https://styleguide.kennesaw.edu/";

const WEBSITE_PATH = "https://mohit-jain.com/ksu-edu";
const PAGE_TITLE = "Mohit Jain | Kennesaw State University";
const PAGE_DESC = "Currently, I am pursuing a bachelor's degree in Computer Science at Kennesaw State University, " +
    "and I'm set to graduate on May 2027. This page shows how my education impacts my software development capabilities.";

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
    background: transparent;
    top: 0px;
    min-height: 100%;
}

.ksu-credits-link {
    position: fixed;
    width: fit-content;
    height: fit-content;
    bottom: 10px;
    right: 15px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.2);
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
    font-weight: bold;
}
.ksu-credits-link a:hover {
    border-color: var(--blue-five);
}

@media (max-width: 375px) {
    .ksu-credits-link {
        position: absolute;
    }
}
</style>