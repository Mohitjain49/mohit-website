<template>
<ParticlesBackground :particlesOptions="LIBRARY_BACKGROUND" />
<CompassMenu :routes="LIBRARY_COMPASS" />
<CompassWidget :htmlClass="'main'" />

<main id="files-page" class="personal-web-body" ref="mohit-files-page">
    <DocumentsSection />
    <ScriptsSection />
    <WebFooter />
</main>
</template>

<script setup>
const DEFAULT_TITLE = "Mohit Jain | My Library";
const PAGE_DESC = ("I host a few documents and scripts on my website to showcase my expertise in software development and engineering. " +
    "Whether you are here to take a quick look or want to keep a copy for yourself, feel free to grab whatever helps you out!"
);

const router = useRouter();
const reactiveMeta = useReactiveMeta(DEFAULT_TITLE, "library", PAGE_DESC);
const routerHash = computed(() => { return router.currentRoute.value.hash; });

const filesPageRef = useTemplateRef('mohit-files-page');
usePulseLoopAnimation(filesPageRef);

onMountedAdvanced(() => { changePageTitle(); });
watch(routerHash, () => { changePageTitle(); });
useHead(reactiveMeta.metaObjectRef);

/** This function changes the document title of the library page based of the URL Hash. */
function changePageTitle() {
    const hash = routerHash.value;
    if(hash === "#documents") {
        reactiveMeta.changeTitle("Mohit Jain | My Documents");
    } else if(hash === "#scripts") {
        reactiveMeta.changeTitle("Mohit Jain | My Code");
    } else if(hash === "#c") {
        reactiveMeta.changeTitle("Mohit Jain | My Code (C)");
    } else {
        reactiveMeta.changeTitle(DEFAULT_TITLE);
    }
}
</script>

<style scoped lang="scss">
#files-page {
    background: rgba(0, 0, 0, 0.25);
}
</style>