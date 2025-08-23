<template>
<DocumentWidgets />
<client-only>
    <main id="resume-container">
        <br>
        <VuePDF id="tato-pdf-resume" :pdf="pdf"
            text-layer annotation-layer
            @annotation="onAnnotation"
            :width="800" :height="1100"
        />
        <div class="markdown-doc-bottom"></div>
    </main> 
</client-only>
</template>

<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
const { pdf } = usePDF('/Mohit_Jain_Resume.pdf')

function onAnnotation(event = { type: "link", data: { url: "", unsafeUrl: "" } }) {
    console.log(event);
    window.open(event.data.url, "_blank");
}

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume."
));
</script>