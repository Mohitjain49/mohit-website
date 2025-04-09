<template>
<NavigationMain @click="closeHomeNav()" />
<NavigationHome />

<client-only>
    <vue-particles id="particlests" :options="HOME_BACKGROUND"></vue-particles>
</client-only>

<div id="homepage" class="personal-web-body" @click="closeHomeNav()">
    <client-only>
        <StartSection />
        <SkillsSection />
        <IvueSection />
        <KennesawSection />
    </client-only>
    <WebFooter />
</div>
</template>

<script setup>
import { HOME_BACKGROUND } from '../stores/ParticlesConfig.js';
import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { getMeta } from '../stores/GetMeta.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

import NavigationMain from '../components/NavigationMain.vue';
import NavigationHome from '../components/home/NavigationHome.vue';
import WebFooter from '../components/WebFooter.vue';

import StartSection from '../components/home/StartSection.vue';
import IvueSection from '../components/home/IvueSection.vue';
import SkillsSection from '../components/home/SkillsSection.vue';
import KennesawSection from '../components/home/KennesawSection.vue';

const webData = useWebsiteDataStore();
onMounted(() => { webData.mountWebData(); });
useHead(getMeta());

/**
 * This function closes the home navigation menu.
 */
function closeHomeNav() {
    webData.homeNavExpanded = false;
}
</script>

<style scoped>
#homepage {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
</style>