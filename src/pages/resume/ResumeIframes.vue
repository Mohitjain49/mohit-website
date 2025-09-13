<template>
<DocumentNavigation />
<main id="resume-container" :class="['iframe-page', (PDF_PAGE ? 'nativePdf' : 'google')]">
    <iframe v-if="PDF_PAGE" src="/Mohit_Jain_Resume.pdf" height="100%" width="100%"></iframe>
    <iframe v-else :src="VIEWER_URL" height="100%" width="100%"></iframe>
    <MinimizeScreenWidget />
</main>
</template>

<script setup>
const docStore = useDocumentStore();
const PDF_PAGE = docStore.checkPDFRoute();
const VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent(PERSONAL_RESUME_LINK)}&embedded=true`;

useHead(getMeta("Mohit Jain | My Resume", 
    (PDF_PAGE ? "resume/pdf" : "resume/google"),
    "Feel free to take a look at my resume."
));
</script>