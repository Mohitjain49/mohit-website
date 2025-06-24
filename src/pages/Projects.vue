<template>
<client-only>
    <vue-particles id="particlests" :options="GREEN_BACKGROUND"></vue-particles>
</client-only>

<main id="project-page" class="personal-web-body transparent">
    <div class="main-nav-page-container">
        <h1 class="nav-page-title project"> My Projects </h1>
        <div class="main-nav-page">
            <MNDCard />
            <PizzaProjectCard />
            <GlobeNavCard />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" class="linkBtn-green" v-html="'Back to Home'"
                @mouseenter="webData.setHeartbeatAnimation"
                @mouseleave="webData.setHeartbeatAnimation"
            />
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import "@/styles/navpage.css";
const webData = useWebsiteDataStore();

onMounted(() => { webData.mountWebData(); });
useHead(getMeta("Mohit Jain | My Projects", "projects/",
    "On this page, I go into depth on the projects that I have made."
));
</script>