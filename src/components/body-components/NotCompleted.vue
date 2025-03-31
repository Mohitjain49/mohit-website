<template>
<NavigationMain />
<div id="invalid" class="personal-web-body" @click="webData.setNavBarDropdown(-1)">
    <div class="gradient-text incomplete-title"> {{ message }} </div>
    <div class="incomplete-subtitle"> {{ subtitle }} </div>
    
    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" v-html="'Go to Home'"
            @mouseenter="webData.setHeartbeatAnimation"
            @mouseleave="webData.setHeartbeatAnimation"
        />
    </div>
</div>
</template>

<script setup>
import "@/styles/navpage.css";
import NavigationMain from '../NavigationMain.vue';

import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { onMounted } from "vue";

const webData = useWebsiteDataStore();
onMounted(() => { webData.mountWebData(); });

const props = defineProps({
    pageTitle: String,
    message: String,
    subtitle: String
});
</script>