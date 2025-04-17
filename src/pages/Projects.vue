<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="GREEN_BACKGROUND"></vue-particles>
</client-only>

<div id="project-page" class="personal-web-body">
    <div class="main-nav-page-container">
        <div class="nav-page-title project">My Projects</div>
        <div class="main-nav-page">
            <WIVNavCard />
            <IvueNavCard />
            <SubloNavCard />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" class="linkBtn-green" v-html="'Back to Home'"
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
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
onMounted(() => { webData.mountWebData(); });

useHead(getMeta("Mohit Jain | My Projects", "projects/",
    "On this page, I go into depth on the projects that I have made."
));
</script>

<style scoped>
#project-page {
    background: transparent;
}
</style>