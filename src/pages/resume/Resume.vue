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

<style>
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #4cafef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>