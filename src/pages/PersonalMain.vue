<template>
<NavigationMain @click="closeHomeNav()" />
<NavigationHome />

<client-only>
    <vue-particles id="particlests" :options="HOME_BACKGROUND"></vue-particles>
</client-only>

<div id="homepage" class="personal-web-body" @click="closeHomeNav()">
    <client-only>
        <StartSection />
        <SkillsSection />
        <IvueSection />
        <KennesawSection />
        <ExtrasSection />
    </client-only>
    
    <WebFooter />
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
const webData = useWebsiteDataStore();

onMounted(() => { webData.mountWebData(); });
useHead(getMeta());

/**
 * This function closes the home navigation menu.
 */
function closeHomeNav() {
    webData.homeNavExpanded = false;
}
</script>

<style scoped>
#homepage {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
</style>