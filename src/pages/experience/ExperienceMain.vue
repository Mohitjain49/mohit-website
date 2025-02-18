<template>
<InitPage :pageTitle="'Mohit Jain | Experience'" />
<NavigationMain />

<div class="personal-web-body" @click="closeNavBarDropdown()">
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
import InitPage from '@/components/InitPage.vue';
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import NavPageCard from '@/components/body-components/NavPageCard.vue';
import { NAV_CARDS } from '@/stores/Objects.js';
import "@/styles/navpage.css";
</script>