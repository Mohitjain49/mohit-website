<template>
<InitPage :pageTitle="'Mohit Jain | My Portfolio'" />
<NavigationMain />
<NavigationHome />

<div id="homepage" class="personal-web-body" @click="closeNavBarDropdown()">
    <StartSection />
    <SkillsSection />
    <ExperienceSection />
    <WebFooter />
</div>
</template>

<script setup>
import InitPage from '../components/InitPage.vue';
import { closeNavBarDropdown } from '../stores/WebsiteData.js';

import NavigationMain from '../components/NavigationMain.vue';
import NavigationHome from '../components/home/NavigationHome.vue';
import WebFooter from '../components/WebFooter.vue';

import StartSection from '../components/home/StartSection.vue';
import ExperienceSection from '../components/home/ExperienceSection.vue';
import SkillsSection from '../components/home/SkillsSection.vue';
</script>

<style scoped>
#homepage {
    background: var(--webpage-static-background);
    top: 0px;
    min-height: 100%;
}
</style>