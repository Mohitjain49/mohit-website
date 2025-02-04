<template>
<NavigationMain />
<div class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <div class="redirect-statement"> {{ REDIRECT_TEXT }} </div>
</div>
</template>

<script setup>
import NavigationMain from '../NavigationMain.vue';
import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { onMounted } from 'vue';

const props = defineProps({
    websiteLink: { type: String, required: true }
});

const webData = useWebsiteDataStore();
const REDIRECT_TEXT = ("Redirecting You To " + props.websiteLink);

onMounted(() => {
    document.title = REDIRECT_TEXT;
    webData.mountWebData();
    window.location.assign(props.websiteLink);
});
</script>

<style scoped>
.redirect-statement {
    width: calc(100% - 24px);
    height: fit-content;
    padding: 25px 12px 0px 12px;
    font-size: 25px;
    font-family: 'Lexend', 'Roboto', sans-serif;
    color: var(--website-text);
    text-align: center;
}
</style>