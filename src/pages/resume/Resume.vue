<template>
<DocumentNavigation />
<client-only>
    <main id="resume-container" v-if="documentStore.resumePdfObj != null">
        <br>
        <component :is="documentStore.pdfComponent" id="tato-pdf-resume"
            :pdf="documentStore.resumePdfObj.value"
            text-layer annotation-layer
            @annotation="onAnnotation"
            :width="documentStore.customPdfWidth"
            :height="documentStore.customPdfHeight"
        />
        <div class="markdown-doc-bottom"></div>
        <WebFooter />
    </main>
    <div id="resume-container" class="center-flex-display" v-else>
        <div class="loading-spinner"></div>
    </div>
</client-only>
</template>

<script setup>
const documentStore = useDocumentStore();

/**
 * This function is triggered whenever someone clicks on a link on teh custom PDF.
 */
function onAnnotation(event = { type: "link", data: { url: "", unsafeUrl: "" } }) {
    window.open(event.data.url, "_blank");
}

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume."
));
</script>