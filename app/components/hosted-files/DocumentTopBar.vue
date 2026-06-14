<template>
<div ref="document-options" :class="['mohit-document-topBar', (documentStore.onMarkdownRoute ? 'markdown' : '')]">
    <div class="mohit-document-topBar-sideSection">
        <button class="lightblue" @click="documentStore.downloadDoc()" title="Download Document" pulse-loop>
            <font-awesome-icon :icon="documentStore.downloadIcon" :spin-pulse="documentStore.documentDownloadStatus.pending" />
        </button>
        <button class="blue" v-if="documentStore.saveAsSupported" @click="documentStore.saveDoc()" title="Save Document" pulse-loop>
            <font-awesome-icon :icon="documentStore.saveDocIcon" :spin-pulse="documentStore.documentSaveStatus.pending" />
        </button>
        <button class="lightblue" @click="documentStore.printDoc()" title="Print Document" pulse-loop>
            <font-awesome-icon :icon="documentStore.printIcon" :spin-pulse="documentStore.documentPrintStatus.pending" />
        </button>
        <button class="blue" v-if="webData.shareSupported" @click="documentStore.shareDoc()" title="Share Document" pulse-loop>
            <font-awesome-icon :icon="documentStore.shareIcon" :spin-pulse="documentStore.documentShareStatus.pending" />
        </button>
        <a class="white" v-if="(documentStore.documentLink !== '')"
            :href="documentStore.documentLink" target="mohit-document"
            title="Open Document In New Tab" pulse-loop>

            <font-awesome-icon icon="fa-up-right-from-square" />
        </a>
    </div>
    <div class="mohit-document-topBar-sideSection">
        <button class="flame" v-if="documentStore.onMainResumeRoute" @click="openWebsiteMenu(3.1)" title="Edit Resume Components" pulse-loop>
            <FontAwesomeIcon icon="fa-gears" />
        </button>
        <button class="flame" v-if="documentStore.onCreateGithubRepoRoute" @click="documentStore.scrollToPage(2)" title="Scroll To Table Of Contents" pulse-loop>
            <FontAwesomeIcon icon="fa-list" />
        </button>
        <button @click="openWebsiteMenu(3)" title="Open Document Options" pulse-loop>
            <FontAwesomeIcon icon="fa-file-export" />
        </button>
        <button @click="documentStore.toggleDocumentFullScreen()" :title="fullScreenStore.elementTitle" pulse-loop>
            <FontAwesomeIcon :icon="fullScreenStore.faIcon" />
        </button>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const documentStore = useDocumentStore();

const pdfViewerOptionsBar = useTemplateRef('document-options');
usePulseLoopAnimation(pdfViewerOptionsBar);

/** This function opens the document menu. */
function openWebsiteMenu(index = 3) {
    webData.bypassBodyClick();
    webData.setMenuOpen(index, true);
}
</script>