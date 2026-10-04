<template>
<div ref="document-options" class="mohit-document-topBar">
    <div class="mohit-document-topBar-sideSection">
        <button class="doc-save-opt" @click="documentStore.downloadDoc()"
            :style="documentStore.downloadCursor"
            :title="documentStore.downloadTitle" v-pulse-loop>

            <FontAwesomeActionIcon :baseIcon="DOCUMENT_DOWNLOAD_BASE_ICON" :status="documentStore.documentDownloadStatus" />
        </button>
        <button class="doc-save-opt" v-if="webData.saveAsSupported"
            @click="documentStore.saveDoc()"
            :style="documentStore.saveDocCursor"
            :title="documentStore.saveDocTitle" v-pulse-loop>

            <FontAwesomeActionIcon :baseIcon="DOCUMENT_SAVE_BASE_ICON" :status="documentStore.documentSaveStatus" />
        </button>
        <button class="doc-save-opt" v-if="webData.shareSupported"
            @click="documentStore.shareDoc()"
            :style="documentStore.shareCursor"
            :title="documentStore.shareTitle" v-pulse-loop>

            <FontAwesomeActionIcon :baseIcon="DOCUMENT_SHARE_BASE_ICON" :status="documentStore.documentShareStatus" />
        </button>

        <button class="doc-save-opt" v-if="iframeSupported"
            @click="documentStore.callCustomPrint()"
            :style="documentStore.customPrintCursor"
            :title="documentStore.customPrintTitle" v-pulse-loop>

            <FontAwesomeActionIcon :baseIcon="DOCUMENT_PRINT_BASE_ICON" :status="documentStore.documentCustomPrintStatus" />
        </button>
        <button class="doc-save-opt" v-if="(iframeSupported && documentStore.browserPdfViewerPresent)"
            :title="documentStore.printTitle"
            @click="documentStore.printDoc(false)"
            :style="documentStore.printCursor" v-pulse-loop>

            <FontAwesomeActionIcon :baseIcon="DOCUMENT_PRINT_BASE_ICON" :status="documentStore.documentPrintStatus" :browserPrint="true" />
        </button>
    </div>
    <div class="mohit-document-topBar-sideSection">
        <button class="flame largeSvg" v-if="documentStore.onResumeRoute" @click="openWebsiteMenu(RESUME_MENU)" title="Edit Resume Components" v-pulse-loop>
            <FontAwesomeIcon icon="fa-gears" />
        </button>
        <button class="flame" v-if="documentStore.onCreateGithubRepoRoute" @click="documentStore.scrollToPage(2)" title="Scroll To Table Of Contents" v-pulse-loop>
            <FontAwesomeIcon icon="fa-list" />
        </button>
        <button class="largeSvg" @click="openWebsiteMenu(DOCUMENT_MENU)" title="Open Document Options" v-pulse-loop>
            <FontAwesomeIcon icon="fa-file-pdf" />
        </button>
        <button @click="documentStore.toggleDocumentFullScreen()" :title="fullScreenStore.elementTitle" v-pulse-loop>
            <FontAwesomeIcon :icon="fullScreenStore.faIcon" />
        </button>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const documentStore = useDocumentStore();
const { iframeSupported } = storeToRefs(documentStore);

/** This function opens the document menu. */
function openWebsiteMenu(index = 3) {
    webData.bypassBodyClick();
    webData.setMenuOpen(index, true);
}
</script>