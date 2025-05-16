<template>
<client-only>
    <vue-particles id="particlests" :options="HOME_BACKGROUND"></vue-particles>
</client-only>

<div id="homepage" class="personal-web-body">
    <client-only>
        <StartSection />
        <SkillsSection />
        <IvueSection />
        <ProjectsSection />
    </client-only>
    
    <WebFooter />
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
const webData = useWebsiteDataStore();

onMounted(() => { webData.mountWebData(); });
useHead(getMeta());
</script>

<style scoped>
#homepage {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
</style>