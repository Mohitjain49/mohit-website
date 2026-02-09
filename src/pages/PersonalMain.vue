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
const pageTitle = ref(WEBSITE_TITLE);
const router = useRouter();

const headTags = computed(() => { return getHomeMeta(pageTitle.value); });
const routerHash = computed(() => { return router.currentRoute.value.hash; });

onMounted(() => { initWebData(); changePageTitle(); });
watch(routerHash, () => { changePageTitle(); })
useHead(headTags);

/** This function changes the document title of the homepage based of the URL Hash. */
function changePageTitle() {
    const hash = routerHash.value;
    if(hash === "#ivue") {
        pageTitle.value = "Mohit Jain | My Role Within iVue"
    } else if(hash === "#documents") {
        pageTitle.value = "Mohit Jain | My Documents"
    } else if(hash === "#footer") {
        pageTitle.value = "Mohit Jain | WebPages"
    } else {
        pageTitle.value = WEBSITE_TITLE;
    }
}
</script>

<style scoped>
#homepage {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
</style>