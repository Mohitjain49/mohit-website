<template>
<client-only>
    <FrontendSidebar />
    <vue-particles id="particlests" :options="VUEJS_BACKGROUND"></vue-particles>

    <div id="vue-page" class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="VUE_INFO_SECTOR" class="info-sector-v3" />
    </div>
</client-only>
</template>

<script setup>
import FrontendSidebar from "@/components/sidebars/FrontendSidebar.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';

import { VUE_INFO_SECTOR } from '@/stores/Objects.js';
import { VUEJS_BACKGROUND } from "@/stores/ParticlesConfig.js";

import { initWebData, closeNavBarDropdown } from "@/stores/WebsiteData.js";
import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); });

const WEBSITE_PATH = "https://mohit-jain.com/skills/frontend/vuejs";
const PAGE_TITLE = "Mohit Jain | Vue.js";
const PAGE_DESC = "Vue.js sits at the core of my software development journey, " +
    "as I developed Worlds iVue, iVue's Company Websites, and my portfolio website with the framework.";

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
#vue-page {
    background: transparent;
}
</style>