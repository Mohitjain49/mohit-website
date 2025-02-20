<template>
<client-only>
    <NavigationMain />
    <div class="personal-web-body" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="SUBLO_INFO_SECTOR" />
    </div>
</client-only>
</template>

<script setup>
import NavigationMain from "@/components/NavigationMain.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';
import { SUBLO_INFO_SECTOR } from '@/stores/Objects.js';

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); })

const WEBSITE_PATH = "https://mohit-jain.com/experience/sublo";
const PAGE_TITLE = "Mohit Jain | Sublo";
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