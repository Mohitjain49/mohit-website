<template>
    <NavigationMain />
    <div class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
        <div class="main-nav-page-container">
            <div class="nav-page-title center-flex-display gradient-text">My Skills</div>
            <div class="main-nav-page">
                <NavPageCard :sectorObj="NAV_CARDS[8]" />
                <NavPageCard :sectorObj="NAV_CARDS[2]" />
                <NavPageCard :sectorObj="NAV_CARDS[6]" id="third-nav-card" />
            </div>
            <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
                <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Back to Home</RouterLink>
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