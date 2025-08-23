<template>
<DocumentWidgets />
<main id="resume-container" class="iframe-page">
    <iframe v-if="!docStore.checkPDFRoute()" :src="VIEWER_URL" height="100%" width="100%"></iframe>
    <iframe v-if="docStore.checkPDFRoute()" src="/Mohit_Jain_Resume.pdf" height="100%" width="100%"></iframe>
</main>
</template>

<script setup>
const docStore = useDocumentStore();
const VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent(PERSONAL_RESUME_LINK)}&embedded=true`;

useHead(getMeta(
    ("Mohit Jain | My Resume | " + (docStore.checkPDFRoute() ? "Web Viewer" : "Google PDF Viewer")), 
    (docStore.checkPDFRoute() ? "resume/pdf" : "resume/google"),
    "Feel free to take a look at my resume."
));
</script>