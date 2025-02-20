<template>
<client-only>
    <NavigationMain />
    <div class="personal-web-body" @click="closeNavBarDropdown()">
        <div class="main-nav-page-container">
            <div class="nav-page-title center-flex-display gradient-text">My Experience</div>
            <div class="main-nav-page">
                <NavPageCard :sectorObj="NAV_CARDS[3]" />
                <NavPageCard :sectorObj="NAV_CARDS[4]" />
                <NavPageCard :sectorObj="NAV_CARDS[5]" id="third-nav-card" />
            </div>
            <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
                <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Back to Home</RouterLink>
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

const WEBSITE_PATH = "https://mohit-jain.com/experience/";
const PAGE_TITLE = "Mohit Jain | My Experience";
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