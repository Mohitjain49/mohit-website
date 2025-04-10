<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="ORANGE_BACKGROUND"></vue-particles>
</client-only>

<div id="exp-page" class="personal-web-body">
    <div class="main-nav-page-container">
        <div class="nav-page-title">My Experience</div>
        <div class="main-nav-page">
            <WIVNavCard />
            <IvueNavCard />
            <SubloNavCard />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" v-html="'Back to Home'"
                @mouseenter="webData.setHeartbeatAnimation"
                @mouseleave="webData.setHeartbeatAnimation"
            />
        </div>
    </div>
    <WebFooter class="footer-nav-page" />
</div>
</template>

<script setup>
import "@/styles/navpage.css";
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import WIVNavCard from "@/components/cards/WIVNavCard.vue";
import IvueNavCard from "@/components/cards/IvueNavCard.vue";
import SubloNavCard from "@/components/cards/SubloNavCard.vue";

import { ORANGE_BACKGROUND } from "@/stores/ParticlesConfig.js";
import { getMeta } from "@/stores/GetMeta.js";

import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
onMounted(() => { webData.mountWebData(); });

useHead(getMeta("Mohit Jain | My Experience", "experience/",
    "On this page, I go into depth about my work experience."
));
</script>

<style scoped>
#exp-page {
    background: transparent;
}
</style>