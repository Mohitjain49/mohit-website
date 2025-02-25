<template>
<client-only>
    <NavigationMain />
    <NavigationHome />

    <vue-particles id="particlests" :options="HOME_BACKGROUND"></vue-particles>
    <div id="homepage" class="personal-web-body" @click="closeNavBarDropdown()">
        <StartSection />
        <SkillsSection />
        <IvueSection />
        <WebFooter />
    </div>
</client-only>
</template>

<script setup>
import { HOME_BACKGROUND } from '../stores/ParticlesConfig.js';
import { initWebData, closeNavBarDropdown } from '../stores/WebsiteData.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

import NavigationMain from '../components/NavigationMain.vue';
import NavigationHome from '../components/home/NavigationHome.vue';
import WebFooter from '../components/WebFooter.vue';

import StartSection from '../components/home/StartSection.vue';
import IvueSection from '../components/home/IvueSection.vue';
import SkillsSection from '../components/home/SkillsSection.vue';

onMounted(() => { initWebData(); })

const WEBSITE_PATH = "https://mohit-jain.com/";
const PAGE_TITLE = "Mohit Jain | My Portfolio";
const PAGE_DESC = "My personal website extensively displays my skills as a software developer " +
    "and the experience I have gathered through working with multiple companies. Made With Vue.js.";

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
#homepage {
    background: transparent;
    top: 0px;
    min-height: 100%;
}
</style>