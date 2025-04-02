<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="BLUE_BACKGROUND"></vue-particles>
</client-only>

<div id="skills-page" class="personal-web-body" @click="webData.setNavBarDropdown(-1)">
    <div class="skills-body">
        <div id="vuejs" class="skills-category">
            <h1 class="skills-category-header vue"> Vue.js </h1>

            <client-only>
                <div v-for="entity in VUEJS_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </client-only>
        </div>

        <div id="frontend" class="skills-category">
            <h1 class="skills-category-header vue"> Frontend </h1>

            <client-only>
                <div v-for="entity in VUEJS_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">
                    
                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </client-only>
        </div>
    </div>

    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" class="linkBtn-blue" v-html="'Back to Home'"
            @mouseenter="webData.setHeartbeatAnimation"
            @mouseleave="webData.setHeartbeatAnimation"
        />
    </div>
    <WebFooter class="footer-nav-page" />
</div>
</template>

<script setup>
import "@/styles/navpage.css";
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';
import SkillNote from "@/components/body-components/SkillNote.vue";

import { VUEJS_SKILL_NOTES } from "@/stores/Objects.js";
import { BLUE_BACKGROUND } from "@/stores/ParticlesConfig.js";
import { getMeta } from "@/stores/GetMeta.js";

import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
const PAGE_DESC = "Since 2021, I have successfully designed, developed, and deployed numerous websites, " +
    "web applications, and projects by utilizing multiple programming languages, " +
    "frontend frameworks, web services, and modules."

onMounted(() => { webData.mountWebData(); });
useHead(getMeta("Mohit Jain | My Skills", "skills/", PAGE_DESC));

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 */
function setCardTransition(isVisible, entry) {
    if(isVisible) {
        entry.target.classList.add("animate__animated", "animate__rotateIn");
    } else {
        entry.target.classList.remove("animate__animated", "animate__rotateIn");
    }
}
</script>

<style scoped>
#skills-page {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
.skills-body {
    height: fit-content;
    min-height: 100vh;
    width: 100%;
}

.skills-category {
    height: fit-content;
    width: 1200px;
    padding: 50px calc(50% - 600px);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.skills-entity-container {
    height: 475px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.skills-category-header {
    width: fit-content;
    height: fit-content;
    margin-left: 20px;
    margin-top: 20px;
    padding: 5px;
    font-size: 90px;
    font-family: 'Lexend', sans-serif;
    grid-column: span 3;
    text-shadow:
        -1px -1px 0 #34495E, /* Top-left shadow */
        1px -1px 0 #34495E,  /* Top-right shadow */
        -1px 1px 0 #34495E,  /* Bottom-left shadow */
        1px 1px 0 #34495E;   /* Bottom-right shadow */
}
.skills-category-header.vue {
    color: #41B883;
}

@media (max-width: 1200px) {
    .skills-category {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 50px calc(50% - 400px);
    }
}

@media (max-width: 825px) {
    .skills-category {
        grid-template-columns: 1fr;
        width: calc(100% - 20px);
        padding: 50px 10px;
    }
    .skills-entity-container {
        min-width: 0px;
    }
}
</style>