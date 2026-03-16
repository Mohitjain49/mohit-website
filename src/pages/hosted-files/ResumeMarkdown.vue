<template>
<DocumentMenu />
<main id="resume-container">
    <div class="pdf-doc-mohit-container"> <ResumeMarkdownComponent /> </div>

    <FullScreenScrollBar :fs-element-id="'resume-container'" />
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenSet" />
    <GamepadComponent v-if="fullScreenSet" />
    <FileWidgets />
</main>
</template>

<script setup>
const documentStore = useDocumentStore();
const fullScreenSet = getFullScreenSet();

onMounted(() => { documentStore.mountDocumentPage(); });
onBeforeUnmount(() => { documentStore.unmountDocumentPage(); });

useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format.",
    "#464646", "resume-extra"
));
</script>