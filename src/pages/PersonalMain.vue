<template>
<NavigationMain />
<NavigationHome />

<div id="homepage" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <StartSection />
    <SkillsSection />
    <ExperienceSection />

    <div id="credits" class="main-sector-bottom-linkBtn-container center-flex-display">
        <RouterLink to="/credits" class="main-sector-bottom-linkBtn center-flex-display">Go To Credits</RouterLink>
    </div>
    <div id="copyright" class="center-flex-display">
        <font-awesome-icon icon="fa-copyright" />
        <span> {{ COPYRIGHT_TEXT }} </span>
    </div>
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
const COPYRIGHT_TEXT = (new Date().getFullYear() + " Mohit Jain");

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
#credits {
    padding-top: 30px;
    padding-bottom: 10px;
}

#copyright {
    position: relative;
    left: calc(50% - 125px);
    width: 250px;
    height: 45px;
    margin-bottom: 30px;
    color: var(--blue-five);
    font-size: 19px;
    border: 2px solid var(--blue-five);
    border-radius: 15px;
    background-color: var(--blue-one);
}
#copyright span {
    font-size: 22px;
    font-family: 'Lexend', sans-serif;
    margin-left: 6px;
}
</style>