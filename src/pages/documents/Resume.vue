<template>
<DocumentNavigation />
<client-only>
    <main id="resume-container" v-if="documentStore.mounted">
        <div class="pdf-doc-mohit-container">
            <component :is="documentStore.pdfComponent" id="tato-pdf-resume"
                :pdf="(documentStore.onResumeQrcodeRoute ? documentStore.resumePdfWithQrcodeObj.pdf : documentStore.resumePdfObj.pdf)"
                text-layer annotation-layer
                @annotation="onAnnotation"
                :width="documentStore.customPdfWidth"
                :height="documentStore.customPdfHeight"
            />
        </div>
        
        <WebFooter v-if="!fullScreenStore.fullScreenSet" />
        <GamepadComponent v-else />
        <MinimizeScreenWidget />
    </main>
    <div id="resume-container" class="center-flex-display" v-else>
        <div class="loading-spinner"></div>
    </div>
</client-only>
</template>

<script setup>
const documentStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();
const router = useRouter();

/**
 * This function is triggered whenever someone clicks on a link on the custom PDF.
 */
function onAnnotation(event = { type: "link", data: { url: "", unsafeUrl: "" } }) {
    const url = event.data.url;
    if(url === PERSONAL_WEBSITE_LINK) {
        router.push("/");
    } else {
        window.open(url, "_blank");
    }
}

useHead(getMeta(
    ("Mohit Jain | My Resume" + (documentStore.onResumeQrcodeRoute ? " (With Qrcode)" : "")),
    (documentStore.onResumeQrcodeRoute ? "resume/qrcode" : "resume"),
    ("Feel free to take a look at my resume." + (documentStore.onResumeQrcodeRoute ? " This version has a QR Code at the top right." : ""))
));
</script>