<template>
<NavigationMain />
<div id="credits" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <div id="top"></div>
</div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | Credits";
    webData.mountWebData();
});

const CREDIT_ENTITIES = [];
</script>

<style scoped>
.personal-web-body#credits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--webpage-static-background);
    top: 0px;
    min-height: 100%;
}
#top {
    height: 50px;
    width: 100%;
    background: var(--webpage-static-background);
}
</style>