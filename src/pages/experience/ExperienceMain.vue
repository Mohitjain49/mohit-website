<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="ORANGE_BACKGROUND"></vue-particles>
</client-only>

<div id="exp-page" class="personal-web-body" @click="closeNavBarDropdown()">
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
</template>

<script setup>
import "@/styles/navpage.css";
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import NavPageCard from '@/components/body-components/NavPageCard.vue';
import { NAV_CARDS } from '@/stores/Objects.js';
import { ORANGE_BACKGROUND } from "@/stores/ParticlesConfig.js";
import { getMeta } from "@/stores/GetMeta.js";

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | My Experience", "experience/",
    "On this page, I go into depth about my work experience."
));
</script>

<style scoped>
#exp-page {
    background: transparent;
}
</style>