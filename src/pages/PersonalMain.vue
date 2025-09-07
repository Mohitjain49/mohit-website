<template>
<client-only>
    <vue-particles id="particlests" :options="HOME_BACKGROUND"></vue-particles>
</client-only>
<KennesawWidget />

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
useHead(getMeta());
</script>

<style scoped>
#homepage {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
</style>