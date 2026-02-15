<template>
<DocumentNavigation />
<main id="resume-container" v-if="documentStore.mounted">
    <div class="pdf-doc-mohit-container">
        <div class="pdf-page-innerContainer" v-for="(page, index) in docPages" :id="('page_' + page.num)">
            <div v-if="!documentStore.docLoaded" class="pdf-doc-loadingCover">
                <FontAwesomeIcon icon="fa-spinner" spin-pulse />
            </div>
            <button v-if="showShare" @click="openShare(page.num)" class="pdf-doc-linkBtn" :title="('Get A Link For This Document!')">
                <FontAwesomeIcon icon="fa-link" />
            </button>

            <VuePDF :id="id" :class="class" :pdf="pdf" :ref="(el) => {docPagesRefs[index] = el}"
                :text-layer="annontations" :annotation-layer="annontations"
                @loaded="() => {setSingleDocLoaded(index)}"
                @annotation="(event) => {documentStore.onAnnotationClick(event)}"
                :width="documentStore.customPdfWidth"
                :height="documentStore.customPdfHeight"
                :page="page.num"
            />
        </div>>
    </div>
    
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenSet" />
    <GamepadComponent v-if="fullScreenSet" />
    <MinimizeScreenWidget />
    <FullScreenScrollBar :fs-element-id="'resume-container'" />
</main>
</template>

<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf';
const fullScreenSet = getFullScreenSet();
const documentStore = useDocumentStore();
const router = useRouter();

const props = defineProps({
    url: { type: String, required: true },
    annontations: { type: Boolean, default: true },
    addShare: { type: Boolean, default: true },
    shareMinWidth: { type: Number, default: 0 },
    class: { type: String,  default: "" },
    id: { type: String,  default: "" }
});

const { pdf, pages } = usePDF(props.url);
const { width: windowWidth } = useWindowSize();

const docPages = ref([{ loaded: false, num: 0 }]);
const docPagesRefs = ref([]);

const showShare = computed(() => {
    const goodWidth = (props.shareMinWidth <= windowWidth.value);
    return (props.addShare && documentStore.docLoaded && !fullScreenSet.value && goodWidth);
});

onBeforeUnmount(() => { cancelAllRendering(); });
watch(pages, () => {
    if(pages.value < 1) { return; }
    docPages.value = Array.from({ length: pages.value }, (_, i) => { return { loaded: false, num: (i + 1) }; });
});

/**
 * This function sets a particular document component as loaded and only runs the main function once every doc is loaded.
 * @param {Number} index The index of the page being loaded starting from 0.
 */
function setSingleDocLoaded(index = 1) {
    docPages.value[index].loaded = true;
    const notLoaded = docPages.value.findIndex(item => { return !item.loaded; });
    if(notLoaded == -1) { documentStore.setDocLoaded(); }
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
    if(documentStore.docLoaded) { return; }
    for(let i = 0; i < docPagesRefs.value.length; i++) {
        try { docPagesRefs.value[i].cancel(); } catch(e) {}
    }
}
</script>

<style scoped>
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

@media (max-width: 600px) {
    .pdf-doc-linkBtn {
        width: 25px;
        height: 25px;
        font-size: 16px;
        border-radius: 8px;
    }
}
</style>