<template>
<DocumentWidgets />
<client-only>
    <main id="resume-container" v-if="pdf != null">
        <br>
        <component :is="pdfComponent" id="tato-pdf-resume" :pdf="pdf.value"
            text-layer annotation-layer
            @annotation="onAnnotation"
            :width="800" :height="1100"
        />
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
        pdf.value = h.usePDF('/Mohit_Jain_Resume.pdf').pdf;
    });
})});

function onAnnotation(event = { type: "link", data: { url: "", unsafeUrl: "" } }) {
    console.log(event);
    window.open(event.data.url, "_blank");
}

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume."
));
</script>