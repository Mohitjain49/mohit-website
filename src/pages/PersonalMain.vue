<template>
<client-only>
    <NavigationMain />
    <NavigationHome />

    <div id="homepage" class="personal-web-body" @click="closeNavBarDropdown()">
        <StartSection />
        <SkillsSection />
        <ExperienceSection />
        <WebFooter />
    </div>
</client-only>
</template>

<script setup>
import { initWebData, closeNavBarDropdown } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

import NavigationMain from '../components/NavigationMain.vue';
import NavigationHome from '../components/home/NavigationHome.vue';
import WebFooter from '../components/WebFooter.vue';

import StartSection from '../components/home/StartSection.vue';
import ExperienceSection from '../components/home/ExperienceSection.vue';
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
    background: var(--webpage-static-background);
    top: 0px;
    min-height: 100%;
}
</style>