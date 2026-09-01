<template>
<div ref="document-options" :class="['mohit-document-topBar', (documentStore.onMarkdownRoute ? 'markdown' : '')]">
    <div class="mohit-document-topBar-sideSection">
        <button class="doc-save-opt" @click="documentStore.downloadDoc()" :title="documentStore.documentDownloadTitle" v-pulse-loop>
            <font-awesome-icon :icon="documentStore.downloadIcon" :spin-pulse="documentStore.downloadPending" />
        </button>
        <button class="doc-save-opt" v-if="webData.saveAsSupported" @click="documentStore.saveDoc()" title="Save Document" v-pulse-loop>
            <font-awesome-icon :icon="documentStore.saveDocIcon" :spin-pulse="documentStore.savePending" />
        </button>
        <button class="doc-save-opt" v-if="iframeSupported" @click="documentStore.printDoc(false)" :style="printButtonCursor" title="Print Document" v-pulse-loop>
            <font-awesome-icon :icon="documentStore.printIcon" :spin-pulse="documentStore.printPending" />
        </button>
        <button class="doc-save-opt" v-if="webData.shareSupported" @click="documentStore.shareDoc()" title="Share Document" v-pulse-loop>
            <font-awesome-icon :icon="documentStore.shareIcon" :spin-pulse="documentStore.sharePending" />
        </button>
        <button class="doc-save-opt" v-if="iframeSupported" @click="documentStore.printDoc(true)" :style="printButtonCursor" title="Print Document (Screenshots)" v-pulse-loop>
            <font-awesome-icon :icon="documentStore.customPrintIcon" :spin-pulse="documentStore.customPrintPending" />
        </button>
    </div>
    <div class="mohit-document-topBar-sideSection">
        <button class="flame" v-if="documentStore.onMainResumeRoute" @click="openWebsiteMenu(RESUME_MENU)" title="Edit Resume Components" v-pulse-loop>
            <FontAwesomeIcon icon="fa-gears" />
        </button>
        <button class="flame" v-if="documentStore.onCreateGithubRepoRoute" @click="documentStore.scrollToPage(2)" title="Scroll To Table Of Contents" v-pulse-loop>
            <FontAwesomeIcon icon="fa-list" />
        </button>
        <button @click="openWebsiteMenu(DOCUMENT_MENU)" title="Open Document Options" v-pulse-loop>
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

const { printInProgress, iframeSupported } = storeToRefs(useDocumentStore());
const printButtonCursor = computed(() => { return { cursor: (printInProgress.value ? "default" : "") }});

/** This function opens the document menu. */
function openWebsiteMenu(index = 3) {
    webData.bypassBodyClick();
    webData.setMenuOpen(index, true);
}
</script>