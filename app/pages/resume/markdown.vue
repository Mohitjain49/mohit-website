<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar v-if="documentStore.hostedDocuments[0].blobCreated" />
        <ContentRenderer class="markdown-body" v-if="home" :value="home" />
    </div>

    <template v-if="fullScreenSet">
        <GamepadComponent />
        <FullScreenScrollBar :fs-element-id="'resume-container'" />
        <QrcodeTool v-if="webData.showSharePopup" />
    </template>

    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenSet" />
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

useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format.",
    "#464646", "resume-extra"
));
</script>