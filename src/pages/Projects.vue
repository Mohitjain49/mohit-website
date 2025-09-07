<template>
<client-only>
    <vue-particles id="particlests" :options="GREEN_BACKGROUND"></vue-particles>
</client-only>

<main id="project-page" class="personal-web-body transparent">
    <div class="main-nav-page-container">
        <h1 class="nav-page-title project"> My Projects </h1>
        <RouterLink id="main-projects-features-btn" to="/features" title="Explore this Website's Unique Capabilities">
            <FontAwesomeIcon icon="fa-bolt-lightning" />
            Website Features
        </RouterLink>

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
const webData = useWebsiteDataStore();
onMounted(() => {
    webData.mountWebData();
    setNavCardTransition("main-projects-features-btn");
});
useHead(getMeta("Mohit Jain | My Projects", "projects/",
    "On this page, I go into depth on the projects that I have made."
));
</script>

<style scoped>
@import "@/styles/navpage.css";
#main-projects-features-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 3px;
    width: 90%;
    min-width: 290px;
    max-width: 400px;
    margin: 20px auto 0px;
    padding: 10px 0px;
    font-size: 25px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    border: 2px solid var(--lightning-yellow);
    border-radius: 15px;
    background-color: var(--dark-background);
    color: var(--lightning-yellow);
    transition: var(--default-transition);
}
#main-projects-features-btn:hover {
    box-shadow: 0px 0px 20px var(--lightning-yellow);
}
</style>