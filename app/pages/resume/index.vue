<template>
<DocumentViewer v-if="(resumeStore.blobCreated == 2)"
    :url="resumeStore.objectUrl"
    :shareMinWidth="0"
    :addShare="false"
    :annontations="true"
    :class="'tato-pdf-resume'"
    :templateIndex="0"
/>
<main id="resume-container" v-else>
    <div class="document-loading-static">
        <div class="loading-spinner"></div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const documentStore = useDocumentStore();
const resumeStore = useResumeStore();

onMounted(() => { documentStore.mountDocumentPage(); });
onBeforeUnmount(() => { documentStore.unmountDocumentPage(); });

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume.",
    "#464646", "default"
));
</script>