<template>
<ParticlesBackground :particlesOptions="GREEN_BACKGROUND" />
<main id="project-page" class="personal-web-body transparent">
    <div class="main-nav-page-container" ref="mohit-projects-page">
        <h1 class="nav-page-title project"> My Projects </h1>
        <RouterLink id="main-projects-features-btn" to="/features/" title="Explore this Website's Unique Capabilities" pulse-loop>
            <FontAwesomeIcon icon="fa-bolt-lightning" />
            <span> Website Features </span>
        </RouterLink>

        <div class="main-nav-page">
            <MNDCard />
            <PizzaProjectCard />
            <GlobeNavCard />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" class="linkBtn-green" pulse-loop> Back To Home </RouterLink>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const projectsRef = useTemplateRef('mohit-projects-page');
usePulseLoopAnimation(projectsRef);

onMounted(() => {
    initWebData();
    setNavCardAnimation("main-projects-features-btn");
});
useHead(getMeta("Mohit Jain | My Projects", "projects/",
    "On this page, I go into depth on the projects that I have made.",
    "rgb(0, 100, 0)"
));
</script>

<style scoped>
@import "~/styles/navpage.css";
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