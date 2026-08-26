<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar v-if="(resumeStore.blobCreated == 2)" />
        <Markdown class="markdown-body"> {{ resumeMdFile }} </Markdown>
        <HostedFileBottomBar v-if="fullScreenSet" />
    </div>

    <template v-if="fullScreenSet">
        <GamepadComponent />
        <FullScreenScrollBar :fs-element-id="'resume-container'" />
        <QrcodeTool v-if="webData.showSharePopup" />
    </template>

    <template v-if="(resumeStore.blobCreated == 2)">
        <DocumentMenu />
        <DocMetadataMenu :objectUrl="resumeStore.objectUrl" />
        <FileWidgets />
    </template>

    <WebCover v-if="showFsWebCover" :zIndex="500" />
    <WebFooter v-if="!fullScreenSet" />
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
</main>
</template>

<script setup>
import resumeMdFile from "~/markdown/resume-markdown.md?raw";
var keybindAbortController = null;

const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const resumeStore = useResumeStore();
const fullScreenSet = getFullScreenSet();

onMountedAdvanced(() => {
    documentStore.mountDocumentPage();
    keybindAbortController = new AbortController();

    // Adds keybind commands for exporting the resume as a PDF.
    window.addEventListener("keydown",
        (event) => { documentStore.onHostedDocumentPageKeydown(event); },
        { signal: keybindAbortController.signal }
    );
});
onBeforeUnmount(() => {
    if(keybindAbortController != null) { keybindAbortController.abort(); }
    resumeStore.unmountResumePage();
});

/** This determines if the Full Screen Web Cover should be visible or not. */
const showFsWebCover = computed(() => {
    if(!fullScreenSet.value) { return false; }
    return (webData.showSharePopupImmediate || (webData.menuOpen >= DOCUMENT_MENU && webData.menuOpen < (DOCUMENT_MENU + 1)));
});

useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format.",
    "#464646", "resume-extra"
));
</script>