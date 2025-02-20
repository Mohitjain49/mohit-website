<template>
<client-only>
    <NavigationMain />
    <div id="invalid" class="personal-web-body" @click="closeNavBarDropdown()">
        <div class="gradient-text incomplete-title"> {{ message }} </div>
        <div class="incomplete-subtitle"> {{ subtitle }} </div>
        <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
            <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Go to Home</RouterLink>
        </div>
    </div>
</client-only>
</template>

<script setup>
import "@/styles/navpage.css";
import NavigationMain from '../NavigationMain.vue';

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { onMounted } from "vue";

onMounted(() => { initWebData(); });

const props = defineProps({
    pageTitle: String,
    message: String,
    subtitle: String
});
</script>