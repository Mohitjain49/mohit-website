<template>
<DocumentViewer v-if="documentStore.mounted"
    :annontations="true"
    :url="url"
    :shareMinWidth="500"
    :addShare="true"
    :id="'tato-pdf-resume'"
/>
<div id="resume-container" class="center-flex-display" v-else>
    <div class="loading-spinner"></div>
</div>
</template>

<script setup>
const documentStore = useDocumentStore();
const url = computed(() => { return documentStore.hostedDocuments[(documentStore.onResumeQrcodeRoute ? 1 : 0)].objectUrl; });

useHead(getMeta(
    ("Mohit Jain | My Resume" + (documentStore.onResumeQrcodeRoute ? " (With Qrcode)" : "")),
    (documentStore.onResumeQrcodeRoute ? "resume/qrcode" : "resume"),
    ("Feel free to take a look at my resume." + (documentStore.onResumeQrcodeRoute ? " This version has a QR Code at the top right." : ""))
));
</script>