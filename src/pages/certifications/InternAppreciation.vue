<template>
<DocumentWidgets />
<client-only>
    <main id="resume-container" v-if="documentStore.fultonInternshipAppreciationPdfObj != null">
        <br>
        <component :is="documentStore.pdfComponent" id="tato-pdf-certificate"
            :pdf="documentStore.fultonInternshipAppreciationPdfObj.value"
            :width="documentStore.customPdfWidth"
            :height="documentStore.customPdfHeight"
        />
        <div class="markdown-doc-bottom"></div>
    </main> 
</client-only>
</template>

<script setup>
const documentStore = useDocumentStore();
useHead(getMeta("Mohit Jain | Fulton Internship Program Appreciation Certificate Spring 2025",
    ("Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"),
    "This is my Fulton Internship Program Appreciation Certificate from Spring 2025."
));
</script>