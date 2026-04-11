<template>
<DocumentMenu />
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar v-if="documentStore.hostedDocuments[0].blobCreated" />
        <ResumeMarkdownComponent />
    </div>

    <template v-if="fullScreenSet">
        <GamepadComponent />
        <WebScrollBar :fs-element-id="'resume-container'" />
        <QrcodeTool v-if="webData.showSharePopup" />
    </template>

    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenSet" />
    <FileWidgets />
</main>
</template>

<script setup>
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const fullScreenSet = getFullScreenSet();

onMounted(() => { documentStore.mountDocumentPage(); });
onBeforeUnmount(() => { documentStore.unmountDocumentPage(); });

useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format.",
    "#464646", "resume-extra"
));
</script>