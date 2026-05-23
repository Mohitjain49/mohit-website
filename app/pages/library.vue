<template>
<ParticlesBackground :particlesOptions="HOME_BACKGROUND" />

<main id="files-page" class="personal-web-body" ref="mohit-files-page">
    <DocumentsSection />
    <ScriptsSection />
    <WebFooter />
</main>
</template>

<script setup>
const filesPageRef = useTemplateRef('mohit-files-page');
usePulseLoopAnimation(filesPageRef);
useHead(getMeta("Mohit Jain | My Library", "library"));
onMounted(() => { initWebData(); });
</script>

<style scoped lang="scss">
#files-page {
    background: rgba(0, 0, 0, 0.25);
}
</style>