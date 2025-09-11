<template>
<DocumentNavigation />
<main id="resume-container" :class="['iframe-page', (PDF_PAGE ? 'nativePdf' : 'google')]">
    <iframe v-if="PDF_PAGE" src="/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf" height="100%" width="100%"></iframe>
    <iframe v-else :src="VIEWER_URL" height="100%" width="100%"></iframe>
    <MinimizeScreenWidget />
</main>
</template>

<script setup>
const docStore = useDocumentStore();
const PDF_PAGE = docStore.checkPDFRoute();
const VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent(FCS_CERTIFICATE_LINK)}&embedded=true`;

useHead(getMeta("Mohit Jain | Fulton Internship Program Appreciation Certificate Spring 2025",
    ("Fulton_Internship_Program_Appreciation_Certificate_Spring_2025" + (PDF_PAGE ? "/pdf" : "/google")),
    "This is my Fulton Internship Program Appreciation Certificate from Spring 2025."
));
</script>