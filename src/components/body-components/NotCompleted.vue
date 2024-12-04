<template>
<NavigationMain />
<div class="personal-web-body incomplete-background center-flex-display"
    @click="() => {webData.setNavBarDropdown(-1)}">

    <div class="gradient-text incomplete-title">
        {{(invalidPage ? '404 - Page Not Found' : 'This Page Is Not Completed Yet.')}}
    </div>
    <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
        <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Back to Home</RouterLink>
    </div>
</div>
</template>

<script setup>
import NavigationMain from '../NavigationMain.vue';
import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { onMounted } from 'vue';

import "../../styles/nav/navpage.css";
import "../../styles/sectors/sectorstyles.css";

const props = defineProps({
    pageTitle: String,
    invalidPage: { type: Boolean, default: () => {false} }
});
const webData = useWebsiteDataStore();

onMounted(() => {
    document.title = props.pageTitle;
    webData.mountWebData();
})
</script>