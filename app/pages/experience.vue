<template>
<ParticlesBackground :particlesOptions="ORANGE_BACKGROUND" />
<main id="exp-page" class="personal-web-body transparent">
    <div class="main-nav-page-container" ref="mohit-exp-page">
        <div class="nav-page-title">My Experience</div>
        <div class="main-nav-page">
            <WIVNavCard />
            <IvueNavCard />
            <SubloNavCard />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" pulse-loop> Back To Home </RouterLink>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const experienceRef = useTemplateRef('mohit-exp-page');
usePulseLoopAnimation(experienceRef);

onMountedAdvanced(() => { initWebData(); });
useHead(getMeta("Mohit Jain | My Experience", "experience/",
    "On this page, I go into depth about my work experience.",
    "rgb(248, 206, 171)"
));
</script>

<style scoped lang="scss">
@use "~/styles/navpage";
</style>