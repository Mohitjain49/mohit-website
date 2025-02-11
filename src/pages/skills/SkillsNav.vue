<template>
<NavigationMain />
<div id="skills-page" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
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
</div>
</template>

<script setup>
import NavigationMain from '../../components/NavigationMain.vue';
import NavPageCard from '../../components/body-components/NavPageCard.vue';
import "../../styles/navpage.css";

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { NAV_CARDS } from '../../stores/Objects.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | Skills";
    webData.mountWebData();
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