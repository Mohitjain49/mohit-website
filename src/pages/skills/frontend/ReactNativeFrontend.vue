<template>
<client-only>
    <FrontendSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="REACT_NATIVE_INFO_SECTOR" class="info-sector-v3" />
    </div>
</client-only>
</template>

<script setup>
import FrontendSidebar from "@/components/sidebars/FrontendSidebar.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';
import { REACT_NATIVE_INFO_SECTOR } from '@/stores/Objects.js';

import { initWebData, closeNavBarDropdown } from "@/stores/WebsiteData.js";
import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); });

const WEBSITE_PATH = "https://mohit-jain.com/skills/frontend/reactnative";
const PAGE_TITLE = "Mohit Jain | React Native";
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