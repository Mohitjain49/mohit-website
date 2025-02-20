<template>
<client-only>
    <NavigationMain />
    <div id="skills-page" class="personal-web-body" @click="closeNavBarDropdown()">
        <div class="main-nav-page-container">
            <div id="skills-title" class="nav-page-title">My Skills</div>
            <div class="main-nav-page">
                <NavPageCard :sectorObj="NAV_CARDS[8]" :skillsCard="true" />
                <NavPageCard :sectorObj="NAV_CARDS[2]" :skillsCard="true" />
                <NavPageCard :sectorObj="NAV_CARDS[6]" :skillsCard="true" id="third-nav-card" />
            </div>
            <div class="main-sector-bottom-linkBtn-container" style="padding-bottom: 30px;">
                <RouterLink to="/" class="main-sector-bottom-linkBtn main-sector-bottom-linkBtn-blue">Back to Home</RouterLink>
            </div>
        </div>
        <WebFooter class="footer-nav-page" />
    </div>
</client-only>
</template>

<script setup>
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import NavPageCard from '@/components/body-components/NavPageCard.vue';
import { NAV_CARDS } from '@/stores/Objects.js';
import "@/styles/navpage.css";

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => { initWebData(); });

const WEBSITE_PATH = "https://mohit-jain.com/skills/";
const PAGE_TITLE = "Mohit Jain | My Skills";
const PAGE_DESC = "Since 2021, I have successfully designed, developed, and deployed numerous websites, " +
    "web applications, and projects by utilizing multiple programming languages, " +
    "frontend frameworks, web services, and modules."

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
#skills-page {
    background: var(--blue-zero);
}

#skills-title {
    background: var(--blue-cobalt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: bold;
}
</style>