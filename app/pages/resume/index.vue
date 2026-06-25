<template>
<DocumentViewer v-if="(resumeStore.blobCreated == 2)"
    :url="resumeStore.objectUrl"
    :shareMinWidth="0"
    :addShare="false"
    :annontations="true"
    :templateIndex="0">

    <ResumeMenu />
</DocumentViewer>

<main id="resume-container" v-else>
    <div class="document-loading-static">
        <div class="loading-spinner"></div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const resumeStore = useResumeStore();
onMountedAdvanced(() => { resumeStore.mountResumePage(); });
onBeforeUnmount(() => { resumeStore.unmountResumePage(); });

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume.",
    "#464646", "default"
));
</script>