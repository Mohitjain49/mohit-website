<template>
<client-only>
    <NavigationMain />
    <div class="personal-web-body" @click="closeNavBarDropdown()">
        <div class="redirect-statement"> {{ REDIRECT_TEXT }} </div>
    </div>
</client-only>
</template>

<script setup>
import NavigationMain from '../NavigationMain.vue';
import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { onMounted } from 'vue';

const props = defineProps({
    websiteLink: { type: String, required: true }
});

const REDIRECT_TEXT = ("Redirecting You To " + props.websiteLink);

onMounted(() => {
    initWebData();
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