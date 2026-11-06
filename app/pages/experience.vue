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
        <div class="experience-homepage-btn" style="padding-bottom: 30px;">
            <RouterLink to="/" v-pulse-loop> Back To Home </RouterLink>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
useHead(getMeta("Mohit Jain | My Experience", "experience/",
    "On this page, I go into depth about my work experience.",
    "rgb(248, 206, 171)"
));
</script>

<style lang="scss">
@use "~/styles/navpage";

.experience-homepage-btn {
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.experience-homepage-btn a {
    cursor: pointer;
    height: 45px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--website-text);
    font-size: 20px;
    font-weight: bold;
    font-family: 'Lexend', 'Roboto', sans-serif;
    border-radius: 10px;
    text-decoration: none;
    border: var(--empty-border);
    background-color: var(--website-light-text);
    transition: var(--default-transition), scale 0.2s;
}
.experience-homepage-btn a:hover {
    border-color: var(--website-text);
    scale: 1.1;
}
</style>