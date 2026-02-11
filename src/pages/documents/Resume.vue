<template>
<DocumentNavigation />
<main id="resume-container" v-if="(documentStore.mounted && !checkSSR())">
    <div class="pdf-doc-mohit-container">
        <div id="resume" class="pdf-page-innerContainer">
            <DocumentViewerAddons :linkButtonMinWidth="500" titleEnd="My Resume!" />
            <component :is="documentStore.pdfComponent" id="tato-pdf-resume"
                :pdf="(documentStore.onResumeQrcodeRoute ? documentStore.resumePdfWithQrcodeObj.pdf : documentStore.resumePdfObj.pdf)"
                text-layer annotation-layer
                @loaded="() => {documentStore.setDocLoaded()}"
                @annotation="(event) => {documentStore.onAnnotationClick(event)}"
                :width="documentStore.customPdfWidth"
                :height="documentStore.customPdfHeight"
            />
        </div>
    </div>
    
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <GamepadComponent v-else />
    <MinimizeScreenWidget />
</main>
<div id="resume-container" class="center-flex-display" v-else>
    <div class="loading-spinner"></div>
</div>
</template>

<script setup>
const documentStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();

useHead(getMeta(
    ("Mohit Jain | My Resume" + (documentStore.onResumeQrcodeRoute ? " (With Qrcode)" : "")),
    (documentStore.onResumeQrcodeRoute ? "resume/qrcode" : "resume"),
    ("Feel free to take a look at my resume." + (documentStore.onResumeQrcodeRoute ? " This version has a QR Code at the top right." : ""))
));
</script>