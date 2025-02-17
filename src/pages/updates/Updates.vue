<template>
<InitPage :pageTitle="'Mohit Jain | Updates'" />
<NavigationMain />

<div id="update-body" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <UpdateMenu />

    <div v-if="webData.pageView == 0" class="update-content center-flex-display" style="flex-direction: column;">
        <div class="gradient-text incomplete-title"> Choose An Update </div>
        <div class="main-sector-bottom-linkBtn-container center-flex-display">
            <RouterLink :to="('/updates/' + LAST_UPDATE.versionPath)"
                class="main-sector-bottom-linkBtn center-flex-display"
                v-html="('See Update ' + LAST_UPDATE.version)">
            </RouterLink>
        </div>
    </div>
</div>
</template>

<script setup>
import "@/styles/update.css";
import "@/styles/navpage.css";

import InitPage from "@/components/InitPage.vue";
import NavigationMain from '@/components/NavigationMain.vue';
import UpdateMenu from "@/components/sidebars/UpdateMenu.vue";

import { Updates } from "@/stores/Updates.js";
import { useWebsiteDataStore } from '@/stores/WebsiteData.js';

const webData = useWebsiteDataStore();
const LAST_UPDATE = Updates[Updates.length - 1];
</script>