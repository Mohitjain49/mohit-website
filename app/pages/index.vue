<template>
<ParticlesBackground :particlesOptions="HOME_BACKGROUND" />
<CompassMenu :routes="HOME_COMPASS" />

<main id="homepage" class="personal-web-body" ref="mohit-homepage">
    <StartSection />
    <SkillsSection />
    <IvueSection />
    <ProjectsSection />
    <LibrarySection />

    <HomeWidgets />
    <WebFooter />
</main>
</template>

<script setup>
const pageTitle = ref(WEBSITE_TITLE);
const router = useRouter();

const headTags = computed(() => { return getHomeMeta(pageTitle.value); });
const routerHash = computed(() => { return router.currentRoute.value.hash; });

const hompageRef = useTemplateRef('mohit-homepage');
usePulseLoopAnimation(hompageRef);

onMountedAdvanced(() => { changePageTitle(); });
watch(routerHash, () => { changePageTitle(); });
useHead(headTags);

/** This function changes the document title of the homepage based of the URL Hash. */
function changePageTitle() {
    const hash = routerHash.value;
    if(hash === "#ivue") {
        pageTitle.value = "Mohit Jain | My Role Within iVue"
    } else if(hash === "#footer") {
        pageTitle.value = "Mohit Jain | WebPages"
    } else {
        pageTitle.value = WEBSITE_TITLE;
    }
}
</script>

<style scoped lang="scss">
#homepage {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
</style>