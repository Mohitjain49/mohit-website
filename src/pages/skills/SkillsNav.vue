<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="BLUE_BACKGROUND"></vue-particles>
</client-only>

<div id="skills-page" class="personal-web-body" @click="webData.setNavBarDropdown(-1)">
    <div class="main-nav-page-container">
        <div id="skills-title" class="nav-page-title">My Skills</div>
        <div class="main-nav-page twoColumn-nav-page">
            <NavPageCard :sectorObj="NAV_CARDS[0]" :skillsCard="true" />
            <NavPageCard :sectorObj="NAV_CARDS[8]" :skillsCard="true" />
            <NavPageCard :sectorObj="NAV_CARDS[2]" :skillsCard="true" />
            <NavPageCard :sectorObj="NAV_CARDS[6]" :skillsCard="true" />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" class="linkBtn-blue" v-html="'Back to Home'"
                @mouseenter="webData.setHeartbeatAnimation"
                @mouseleave="webData.setHeartbeatAnimation"
            />
        </div>
    </div>
    <WebFooter class="footer-nav-page" />
</div>
</template>

<script setup>
import "@/styles/navpage.css";
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import NavPageCard from '@/components/body-components/NavPageCard.vue';
import { NAV_CARDS } from '@/stores/Objects.js';
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
</script>

<style scoped>
#skills-page {
    background: transparent;
}

#skills-title {
    background: var(--blue-cobalt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: bold;
}
</style>