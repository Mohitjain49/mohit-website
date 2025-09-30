<template>
<ParticlesBackground :particlesOptions="ORANGE_BACKGROUND" />
<main id="exp-page" class="personal-web-body transparent">
    <div class="main-nav-page-container">
        <div class="nav-page-title">My Experience</div>
        <div class="main-nav-page">
            <WIVNavCard />
            <IvueNavCard />
            <SubloNavCard />
        </div>
        <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
            <RouterLink to="/" v-html="'Back to Home'"
                @mouseenter="setHeartbeatAnimation"
                @mouseleave="setHeartbeatAnimation"
            />
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import "@/styles/navpage.css";
onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | My Experience", "experience/",
    "On this page, I go into depth about my work experience."
));
</script>