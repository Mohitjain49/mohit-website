<style lang="scss">
@use "pdfjs-dist/web/pdf_viewer.css";
</style>

<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar />
        <div class="pdf-page-innerContainer" v-for="page in docPages" :id="('page_' + page.num)">
            <div v-if="!documentStore.docLoaded.status" class="pdf-doc-loadingCover">
                <FontAwesomeIcon icon="fa-spinner" spin-pulse />
            </div>
            <button v-if="showDocumentShareWidgets" @click="openShare(page.num)" class="pdf-doc-linkBtn" :title="('Get A Link For This Document!')">
                <FontAwesomeIcon icon="fa-link" />
            </button>

            <div :class="['mohit-rendered-pdf', ((pages > 1 && page.num != pages) ? 'multi-page' : '')]">
                <canvas :id="('pdf_canvas_' + page.num)"></canvas>
                <div v-if="annontations" class="textLayer" :id="('pdf_text_layer_' + page.num)"></div>
                <div v-if="annontations" class="annotationLayer" :id="('pdf_annotation_layer_' + page.num)"></div>
            </div>
        </div>
        <HostedFileBottomBar v-if="fullScreenSet" />
    </div>
    
    <template v-if="fullScreenSet">
        <GamepadComponent />
        <FullScreenScrollBar :fs-element-id="'resume-container'" />
        <QrcodeTool v-if="webData.showSharePopup" />
    </template>

    <WebCover v-if="showFsWebCover" :zIndex="500" />
    <WebFooter v-if="!fullScreenSet" />
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />

    <FileWidgets />
    <DocumentMenu />
    <DocMetadataMenu :objectUrl="url" />
    <slot></slot>
</main>
</template>

<script setup>
import { getDocument, TextLayer, AnnotationLayer, GlobalWorkerOptions } from "pdfjs-dist";
import { PDFLinkService, EventBus } from "pdfjs-dist/web/pdf_viewer.mjs";
import workerSrcUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

const DEFAULT_OUTPUT_SCALE = 2;
const PDFJS_SCALE_CSS_PROPERTY = "--total-scale-factor";

var resizeAbortController = new AbortController();
var renderTasks = { canvas: null, text: null, annontation: null }
var pdfDocLoadingTask = null;
const { width: windowWidth } = useMohitWindowSize();

const webData = useWebsiteDataStore();
const fullScreenSet = getFullScreenSet();
const documentStore = useDocumentStore();
const router = useRouter();

const props = defineProps({
    templateIndex: { type: Number, required: true },
    url: { type: String, required: true },
    annontations: { type: Boolean, default: true },
    addShare: { type: Boolean, default: true },
    shareMinWidth: { type: Number, default: 0 }
});

/** @type {import('vue').ShallowRef<import('pdfjs-dist').PDFDocumentProxy>} The pdf document loaded in by the viewer. */
const pdfDoc = shallowRef(null);
const pages = ref(0);
const docPages = ref([{ loaded: false, num: 0, rawWidth: -1 }]);

const showDocumentShareWidgets = computed(() => {
    return (props.addShare && documentStore.docLoaded.status && (props.shareMinWidth <= windowWidth.value));
});
const showFsWebCover = computed(() => {
    if(!fullScreenSet.value) { return false; }
    return (webData.showSharePopupImmediate || (webData.menuOpen >= 3 && webData.menuOpen < 4));
});

// These manage the PDF Viewer when it is mounted an unmounted.
onMountedAdvanced(async() => {
    await renderPDF();
    window.addEventListener("animation-resize", () => { resizePdfViewer(); }, { signal: resizeAbortController.signal });
})
onBeforeUnmount(() => {
    cancelRenders();
    if(pdfDocLoadingTask != null) { pdfDocLoadingTask.destroy(); }
    resizeAbortController.abort();
});

/** This function renders the PDF so it can be displayed. */
async function renderPDF() {
    cancelRenders();
    if(!documentStore.workerSrcAdded) {
        GlobalWorkerOptions.workerSrc = workerSrcUrl;
        documentStore.workerSrcAdded = true;
    }

    pdfDocLoadingTask = getDocument({ url: props.url });
    pdfDoc.value = await pdfDocLoadingTask.promise;
    const numPages = pdfDoc.value.numPages;

    pages.value = numPages;
    setInnerPagesArray(numPages);
    await nextTick();

    /** This is a link service used by the annotation layers. */
    const defaultLinkService = new PDFLinkService({ eventBus: new EventBus(), externalLinkTarget: 2 });
    defaultLinkService.getDestinationHash = (string) => { return "#"; }
    defaultLinkService.goToDestination = (dest) => { onAnnotationClick(dest); }

    for(let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.value.getPage(i);
        const defaultViewport = page.getViewport({ scale: 1 });

        docPages.value[i - 1].rawWidth = defaultViewport.width;
        const viewport = page.getViewport({ scale: (documentStore.customPdfMaxWidth / defaultViewport.width) });
        resizePdfViewer(i);

        var canvas = document.getElementById("pdf_canvas_" + i);
        var context = canvas.getContext("2d");

        canvas.width = Math.floor(viewport.width * DEFAULT_OUTPUT_SCALE);
        canvas.height = Math.floor(viewport.height * DEFAULT_OUTPUT_SCALE);
        canvas.style.width = 'var(--mohit-custom-pdf-width)';
        canvas.style.height =  'var(--mohit-custom-pdf-height)';

        renderTasks.canvas = page.render({
            canvasContext: context,
            transform: [DEFAULT_OUTPUT_SCALE, 0, 0, DEFAULT_OUTPUT_SCALE, 0, 0],
            viewport: viewport
        });

        try { await renderTasks.canvas.promise; } catch(e) {}
        renderTasks.canvas = null;

        if(props.annontations) {
            const textLayerDiv = document.getElementById('pdf_text_layer_'+ i);
            textLayerDiv.innerHTML = '';
            const textContent = await page.getTextContent({ includeMarkedContent: true });
            
            renderTasks.text = new TextLayer({
                textContentSource: textContent,
                container: textLayerDiv,
                viewport: viewport
            });
            
            try { await renderTasks.text.render(); } catch(e) {}
            renderTasks.text = null;

            const annotationLayerDiv = document.getElementById('pdf_annotation_layer_' + i);
            annotationLayerDiv.innerHTML = '';

            const annotations = await page.getAnnotations({ intent: 'display' });
            if (annotations && annotations.length > 0) {
                const annotationLayer = new AnnotationLayer({
                    div: annotationLayerDiv,
                    viewport: viewport.clone({ dontFlip: true }),
                    page: page,
                    linkService: defaultLinkService
                });

                // Renders the annotation layer.
                await annotationLayer.render({ annotations });
            }
        }

        // This sets that the page is fully loaded on the website.
        setSingleDocLoaded(i - 1);
    }
}

/** This function cancels all PDF Rendering when called. */
function cancelRenders() {
    if(renderTasks.canvas != null) { renderTasks.canvas.cancel(); }
    if(renderTasks.text != null) { renderTasks.text.cancel(); }
    renderTasks = { canvas: null, text: null, annontation: null }
}

/**
 * This function resizes all necessary styles for the PDF Viewer when called.
 * @param {Number} index "null" if the user wants to update ALL the pages, or the index of the page.
 */
function resizePdfViewer(index = null) {
    if(!index || index < 1 || index > pages.value) {
        for(let i = 1; i <= pages.value; i++) {
            try {
                const newScaleFactor = (documentStore.customPdfWidth / docPages.value[i - 1].rawWidth);
                if(newScaleFactor < 0) { continue; }
                document.getElementById("page_" + i).style.setProperty(PDFJS_SCALE_CSS_PROPERTY, newScaleFactor);
            } catch(e) {
                continue;
            }
        }
    } else {
        const newScaleFactor = (documentStore.customPdfWidth / docPages.value[index - 1].rawWidth);
        if(newScaleFactor >= 0) { document.getElementById("page_" + index).style.setProperty( PDFJS_SCALE_CSS_PROPERTY, newScaleFactor); }
    }
}

/**
 * This function sets the internal array that records crucial data for each page in the PDF.
 * @param {Number} numPages The Number of pages.
 */
function setInnerPagesArray(numPages = 0) {
    if(numPages < 1) { return; }
    documentStore.docLoaded.totalPages = numPages;
    docPages.value = Array.from({ length: numPages }, (_, i) => { return { loaded: false, num: (i + 1), rawWidth: 1 }; });
}

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

/** This function scrolls to a specific page on an annotation internal link click. */
async function onAnnotationClick(dest) {
    if(!dest || !dest[0] || !pdfDoc.value) { return; }
    const pageNumber = await pdfDoc.value.getPageIndex(dest[0]);
    documentStore.scrollToPage(pageNumber + 1);
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
</script>