<template>
<ParticlesBackground :particlesOptions="HOME_BACKGROUND" />
<HomeWidgets />

<main id="homepage" class="personal-web-body">
    <StartSection />
    <SkillsSection />
    <IvueSection />
    <ProjectsSection />
    <DocumentsSection />
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
useHead(getHomeMeta());
</script>

<style scoped>
#homepage {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
</style>