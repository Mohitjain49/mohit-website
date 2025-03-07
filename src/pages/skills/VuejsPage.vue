<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="VUEJS_BACKGROUND"></vue-particles>
</client-only>

<div id="vuejs-page" class="personal-web-body" @click="closeNavBarDropdown()">

</div>
</template>

<script setup>
import NavigationMain from '@/components/NavigationMain.vue';
import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { VUEJS_BACKGROUND } from '@/stores/ParticlesConfig.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => { initWebData(); })

const WEBSITE_PATH = "https://mohit-jain.com/vue";
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
</style>