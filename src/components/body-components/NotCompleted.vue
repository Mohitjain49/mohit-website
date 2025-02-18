<template>
<InitPage :pageTitle="props.pageTitle" :pageDesc="props.message" />
<NavigationMain />

<div id="invalid" class="personal-web-body" @click="closeNavBarDropdown()">
    <div class="gradient-text incomplete-title"> {{ message }} </div>
    <div class="incomplete-subtitle"> {{ subtitle }} </div>
    <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
        <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Go to Home</RouterLink>
    </div>
</div>
</template>

<script setup>
import "../../styles/navpage.css";
import InitPage from "../InitPage.vue";
import NavigationMain from '../NavigationMain.vue';
import { closeNavBarDropdown } from '../../stores/WebsiteData.js';

const props = defineProps({
    pageTitle: String,
    message: String,
    subtitle: String
});
</script>