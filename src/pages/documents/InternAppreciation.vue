<template>
<DocumentViewer v-if="documentStore.mounted"
    :annontations="false"
    :addShare="false"
    :url="documentStore.hostedDocuments[3].objectUrl"
    :id="'tato-pdf-certificate'"
/>
<div id="resume-container" class="center-flex-display" v-else>
    <div class="loading-spinner"></div>
</div>
</template>

<script setup>
const documentStore = useDocumentStore();
useHead(getMeta("Mohit Jain | Fulton Internship Program Appreciation Certificate Spring 2025",
    ("Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"),
    "This is my Fulton Internship Program Appreciation Certificate from Spring 2025."
));
</script>