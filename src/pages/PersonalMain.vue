<template>
    <NavigationMain />
    <NavigationHome />

    <div id="homepage" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
        <StartSection />
        <SkillsSection />
        <ExperienceSection />
    </div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import NavigationHome from '../components/home/NavigationHome.vue';

import StartSection from '../components/home/StartSection.vue';
import SkillsSection from '../components/home/SkillsSection.vue';
import ExperienceSection from '../components/home/ExperienceSection.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain";
    webData.mountWebData();
})
</script>

<style scoped>
#homepage {
    background: var(--webpage-static-background);
    top: 0px;
}
</style>