<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar />
        <div class="pdf-page-innerContainer" v-for="(page, index) in docPages" :id="('page_' + page.num)">
            <div v-if="!documentStore.docLoaded.status" class="pdf-doc-loadingCover">
                <FontAwesomeIcon icon="fa-spinner" spin-pulse />
            </div>
            <button v-if="showDocumentShareWidgets" @click="openShare(page.num)" class="pdf-doc-linkBtn" :title="('Get A Link For This Document!')">
                <FontAwesomeIcon icon="fa-link" />
            </button>

            <VuePDF :class="id" :id="class" :pdf="pdf" :ref="(el) => {docPagesRefs[index] = el}"
                :text-layer="annontations" :annotation-layer="annontations"
                @loaded="() => {setSingleDocLoaded(index)}"
                @annotation="(event) => {documentStore.onAnnotationClick(event)}"
                :width="documentStore.customPdfWidth"
                :height="documentStore.customPdfHeight"
                :page="page.num"
            />
        </div>
    </div>
    
    <template v-if="fullScreenSet">
        <GamepadComponent />
        <FullScreenScrollBar :fs-element-id="'resume-container'" />
        <QrcodeTool v-if="webData.showSharePopup" />
    </template>

    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenSet" />
    <FileWidgets />

    <DocumentMenu />
    <ResumeMenu v-if="templateIndex < 2" />
</main>
</template>

<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf';
const webData = useWebsiteDataStore();
const fullScreenSet = getFullScreenSet();
const documentStore = useDocumentStore();
const router = useRouter();

const props = defineProps({
    templateIndex: { type: Number, required: true },
    url: { type: String, required: true },
    annontations: { type: Boolean, default: true },
    addShare: { type: Boolean, default: true },
    shareMinWidth: { type: Number, default: 0 },
    class: { type: String,  default: "" },
    id: { type: String,  default: "" }
});

const { pdf, pages } = usePDF(props.url);
const { width: windowWidth } = useMohitWindowSize();

const docPages = ref([{ loaded: false, num: 0 }]);
const docPagesRefs = ref([]);

const showDocumentShareWidgets = computed(() => {
    return (props.addShare && documentStore.docLoaded.status && (props.shareMinWidth <= windowWidth.value));
});

onBeforeUnmount(() => { cancelAllRendering(); });
watch(pages, (numPages) => {
    if(numPages < 1) { return; }
    documentStore.docLoaded.totalPages = numPages;
    docPages.value = Array.from({ length: numPages }, (_, i) => { return { loaded: false, num: (i + 1) }; });
});

/**
 * This function sets a particular document component as loaded and only runs the main function once every doc is loaded.
 * @param {Number} index The index of the page being loaded starting from 0.
 */
function setSingleDocLoaded(index = 1) {
    docPages.value[index].loaded = true;
    const totalPages = documentStore.docLoaded.totalPages;
    var numPagesLoaded = 0;

    for(let i = 0; i < docPages.value.length; i++) {
        if(docPages.value[i].loaded) { numPagesLoaded++; }
    }

    documentStore.docLoaded.loadedPages = numPagesLoaded;
    if(numPagesLoaded == totalPages) { documentStore.setDocLoaded(); }
}

/**
 * This function opens the share popup.
 * @param {Number} pageNum The page number.
 */
function openShare(pageNum = 1) {
    var path = router.currentRoute.value.path.substring(1);
    if(path.endsWith("/")) { path = path.substring(0, path.length - 1); }
    useWebsiteDataStore().setQRCodePopup(PERSONAL_WEBSITE_LINK + path + "/#page_" + pageNum);
}

/** This function cancels all pages from rendering fully. Called with "onBeforeUnmount". */
function cancelAllRendering() {
    if(documentStore.docLoaded.status) { return; }
    for(let i = 0; i < docPagesRefs.value.length; i++) {
        try { docPagesRefs.value[i].cancel(); } catch(e) {}
    }
}
</script>

<style scoped lang="scss">
.pdf-doc-linkBtn {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgb(225, 225, 225);
    height: 40px;
    width: 40px;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--website-light-text);
    border: 2px solid;
    border-radius: 15px;
    font-size: 22px;
    overflow: hidden;
    transition: box-shadow 0.2s, scale 0.2s;
}
.pdf-doc-linkBtn:hover {
    box-shadow: 0px 0px 10px 1px;
    scale: 1.1;
}

.pdf-doc-loadingCover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    font-size: 90px;
    color: var(--blue-two);
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
}

@include dynamic-less-equal-width-rule(600) {
    .pdf-doc-linkBtn {
        width: 25px;
        height: 25px;
        font-size: 16px;
        border-radius: 8px;
    }
}
</style>