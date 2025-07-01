<template>
<DocumentWidgets />
<main id="resume-container">
    <iframe v-if="!docStore.checkPDFRoute()" :src="VIEWER_URL" height="100%" width="100%"></iframe>
    <iframe v-if="docStore.checkPDFRoute()" src="/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf" height="100%" width="100%"></iframe>
</main>
</template>

<script setup>
const docStore = useDocumentStore();
const VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent(FCS_CERTIFICATE_LINK)}&embedded=true`;

useHead(getMeta("Mohit Jain | Fulton Internship Program Appreciation Certificate Spring 2025",
    "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025",
    "This is my Fulton Internship Program Appreciation Certificate for Spring 2025."
));
</script>