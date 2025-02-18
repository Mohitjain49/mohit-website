<template>
<InitPage :pageTitle="'Mohit Jain | Skills'" />
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
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';
import { closeNavBarDropdown } from '@/stores/WebsiteData.js';

import "@/styles/navpage.css";
import NavPageCard from '@/components/body-components/NavPageCard.vue';
import { NAV_CARDS } from '@/stores/Objects.js';
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