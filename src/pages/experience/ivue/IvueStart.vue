<template>
<client-only>
    <IvueWebSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="IVUE_WEBSITE_INFO_SECTORS[0]" class="info-sector-v3" />
    </div>
</client-only>
</template>

<script setup>
import IvueWebSidebar from "@/components/sidebars/IvueWebSidebar.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';
import { IVUE_WEBSITE_INFO_SECTORS } from '@/stores/Objects.js';

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => { initWebData(); });

const WEBSITE_PATH = "https://mohit-jain.com/experience/ivue/";
const PAGE_TITLE = "Mohit Jain | iVue";
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