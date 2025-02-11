<template>
<NavigationMain />
<NavigationHome />

<div id="homepage" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <StartSection />
    <SkillsSection />
    <ExperienceSection />

    <div id="copyright" class="center-flex-display">
        <font-awesome-icon icon="fa-copyright" />
        <span> {{ COPYRIGHT_TEXT }} </span>
    </div>
    <div class="scroll-topBtn center-flex-display" @click="scrollToTop()" title="Scroll To Start">
        <font-awesome-icon icon="fa-arrow-up" />
    </div>
</div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import NavigationHome from '../components/home/NavigationHome.vue';

import StartSection from '../components/home/StartSection.vue';
import ExperienceSection from '../components/home/ExperienceSection.vue';
import SkillsSection from '../components/home/SkillsSection.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
const COPYRIGHT_TEXT = (new Date().getFullYear() + " Mohit Jain");

onMounted(() => {
    document.title = "Mohit Jain";
    webData.mountWebData();
});

/**
 * This scrolls to the top of the webpage.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
</script>

<style scoped>
#homepage {
    background: var(--webpage-static-background);
    top: 0px;
}
#copyright {
    background-color: black;
    width: calc(100% - 20px);
    height: 75px;
    padding: 0px 10px;
    color: var(--blue-cobalt);
    font-size: 25px;
    border: none;
    text-align: center;
}
#copyright span {
    font-size: 28px;
    font-family: 'Lexend', sans-serif;
    margin-left: 6px;
}

.scroll-topBtn {
    cursor: pointer;
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    background-color: var(--blue-one);
    border-radius: 10px;
    transition: var(--default-transition);
    color: black;
    font-size: 25px;
}
.scroll-topBtn:hover {
    background-color: var(--blue-three);
}

@media (max-width: 600px) {
    #copyright {
        justify-content: flex-start;
    }
}
</style>