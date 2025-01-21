<template>
<NavigationMain />
<div id="update-body" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <UpdateMenu />

    <div v-if="webData.pageView == 0" class="update-content center-flex-display" style="flex-direction: column;">
        <div class="gradient-text incomplete-title"> Choose An Update </div>
        <div class="main-sector-bottom-linkBtn-container center-flex-display">
            <RouterLink to="/updates/1-3-0" class="main-sector-bottom-linkBtn center-flex-display">See Update 1.3.0</RouterLink>
        </div>
    </div>
</div>
</template>

<script setup>
import "../../styles/update.css";
import "../../styles/navpage.css";

import UpdateMenu from "../../components/sidebars/UpdateMenu.vue";
import NavigationMain from '../../components/NavigationMain.vue';

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { onMounted } from 'vue';
const webData = useWebsiteDataStore();

onMounted(() => {
    document.title = "Mohit Jain | Updates";
    webData.mountWebData();
});
</script>