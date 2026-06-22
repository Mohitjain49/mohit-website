<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar v-if="documentStore.hostedDocuments[0].blobCreated" />
        <ContentRenderer class="markdown-body" v-if="home" :value="home" />
        <HostedFileBottomBar v-if="fullScreenSet" />
    </div>

    <template v-if="fullScreenSet">
        <GamepadComponent />
        <FullScreenScrollBar :fs-element-id="'resume-container'" />
        <QrcodeTool v-if="webData.showSharePopup" />
    </template>

    <WebCover v-if="showFsWebCover" :zIndex="500" />
    <WebFooter v-if="!fullScreenSet" />
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />

    <FileWidgets />
    <DocumentMenu />
</main>
</template>

<script setup>
const { data: home } = await useAsyncData(() => queryCollection('content').path('/resume-markdown').first());

const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const resumeStore = useResumeStore();
const fullScreenSet = getFullScreenSet();

onMountedAdvanced(() => { documentStore.mountDocumentPage(); });
onBeforeUnmount(() => { resumeStore.unmountResumePage(); });

/** This determines if the Full Screen Web Cover should be visible or not. */
const showFsWebCover = computed(() => {
    if(!fullScreenSet.value) { return false; }
    return (webData.showSharePopupImmediate || (webData.menuOpen >= 3 && webData.menuOpen < 4));
});

useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format.",
    "#464646", "resume-extra"
));
</script>