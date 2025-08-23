<template>
<DocumentWidgets />
<client-only>
    <main id="resume-container" v-if="pdf != null">
        <br>
        <component :is="pdfComponent" id="tato-pdf-certificate" :pdf="pdf.value" width="800" height="639" />
        <div class="markdown-doc-bottom"></div>
    </main> 
</client-only>
</template>

<script setup>
const pdfComponent = ref(null);
const pdf = ref(null);

onMounted(() => { nextTick(() => {
    import('@tato30/vue-pdf').then((h) => {
        pdfComponent.value = h.VuePDF;
        pdf.value = h.usePDF('/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf').pdf;
    });
})});

useHead(getMeta("Mohit Jain | Fulton Internship Program Appreciation Certificate Spring 2025",
    ("Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"),
    "This is my Fulton Internship Program Appreciation Certificate from Spring 2025."
));
</script>