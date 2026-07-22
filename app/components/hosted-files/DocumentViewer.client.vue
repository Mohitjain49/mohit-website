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

            <div @contextmenu="onPdfContentMenu" :class="['mohit-rendered-pdf', ((pages > 1 && page.num != pages) ? 'multi-page' : '')]">
                <canvas :id="('pdf_canvas_' + page.num)"></canvas>
                <div v-if="annontations" class="textLayer" :id="('pdf_text_layer_' + page.num)"></div>
                <div v-if="(annontations && page.showAnnotations)" class="annotationLayer" :id="('pdf_annotation_layer_' + page.num)"></div>
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
    <PdfPageNavigationMenu v-if="documentStore.showPdfPageNav" />
    <DocMetadataMenu :objectUrl="url" />
    <slot></slot>
</main>
</template>

<script setup>
import workerSrcUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
const PDFJS_SCALE_CSS_PROPERTY = "--total-scale-factor";

const CUSTOM_ANNOTATION_HTML_CLASS = "mohit-pdf-linkAnnotation";
const CUSTOM_PDFJS_DEST_ATTRIBUTE = "mohit-data-pdfjs-dest";
const CUSTOM_PDFJS_PAGE_NUMBER_ATTRIBUTE = "mohit-data-pdfjs-page-number";
const CUSTOM_PDFJS_RAW_WIDTH_ATTRIBUTE = "mohit-pdfjs-raw-width";
const CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE = "mohit-pdfjs-raw-height";

var renderAbortController = new AbortController();
var resizeAbortController = new AbortController();

var renderTasks = { canvas: null, text: null, annontation: null }
var pdfDocLoadingTask = null;

const webData = useWebsiteDataStore();
const fullScreenSet = getFullScreenSet();
const documentStore = useDocumentStore();
const styleStore = useStyleStore();
const router = useRouter();
const { width: windowWidth, cssToWindowHeightRatio } = useMohitWindowSize();

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
const docPages = ref([{ loaded: false, num: 0, showAnnotations: true }]);

const showDocumentShareWidgets = computed(() => {
    return (props.addShare && documentStore.docLoaded.status && (props.shareMinWidth <= windowWidth.value));
});
const showFsWebCover = computed(() => {
    if(!fullScreenSet.value) { return false; }
    return (webData.showSharePopupImmediate || (webData.menuOpen >= DOCUMENT_MENU && webData.menuOpen < (DOCUMENT_MENU + 1)));
});

// These manage the PDF Viewer when it is mounted an unmounted.
onMountedAdvanced(async() => {
    styleStore.setHideOverflowArray(HideOverflow.LOADING_DOCUMENT, true);
    await renderPDF();
    window.addEventListener("animation-resize", () => { resizePdfViewer(); }, { signal: resizeAbortController.signal });
});
onBeforeUnmount(() => {
    renderAbortController.abort();
    resizeAbortController.abort();

    styleStore.setHideOverflowArray(HideOverflow.LOADING_DOCUMENT, false);
    cancelRenders();
    if(pdfDocLoadingTask != null) { pdfDocLoadingTask.destroy(); }
});

/**
 * This helper function returns a page element given its index.
 * @param {Number} index The index of the page.
 */
function getPageElement(index = 1) {
    return document.getElementById("page_" + index);
}

/** This function renders the PDF so it can be displayed. */
async function renderPDF() {
    scrollToTop(true, 0);
    cancelRenders();
    if(renderAborted()) { return; }

    const { getDocument, TextLayer, AnnotationLayer, GlobalWorkerOptions } = await import("pdfjs-dist");
    const { PDFLinkService, EventBus } = await import("pdfjs-dist/web/pdf_viewer.mjs");
    if(renderAborted()) { return; }

    if(!documentStore.workerSrcAdded) {
        GlobalWorkerOptions.workerSrc = workerSrcUrl;
        documentStore.workerSrcAdded = true;
    }

    pdfDocLoadingTask = getDocument({ url: props.url });
    pdfDoc.value = await pdfDocLoadingTask.promise;
    const numPages = pdfDoc.value.numPages;
    if(renderAborted()) { return; }

    pages.value = numPages;
    setInnerPagesArray(numPages);
    await nextTick();

    /** @type {Array<HTMLAnchorElement>} These elements are inner Annotation elements that scroll to other parts of the PDF. */
    const innerAnnotationElements = [];
    if(renderAborted()) { return; }

    /** This is a link service used by the annotation layers. */
    const defaultLinkService = new PDFLinkService({ eventBus: new EventBus(), externalLinkTarget: 2 });
    defaultLinkService.getDestinationHash = (string) => { return "#"; }
    defaultLinkService.goToDestination = (dest) => { return; }

    for(let i = 1; i <= numPages; i++) {
        if(renderAborted()) { return; }
        const page = await pdfDoc.value.getPage(i);
        const defaultViewport = page.getViewport({ scale: 1 });

        const pageElement = getPageElement(i);
        pageElement.setAttribute(CUSTOM_PDFJS_RAW_WIDTH_ATTRIBUTE, String(defaultViewport.width));
        pageElement.setAttribute(CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE, String(defaultViewport.height));

        // Sets a properly scaled viewport so it works on every necessary size.
        const viewport = page.getViewport({ scale: (documentStore.customPdfMaxWidth / defaultViewport.width) });
        resizePdfViewer(i);

        var canvas = document.getElementById("pdf_canvas_" + i);
        var context = canvas.getContext("2d");

        canvas.width = Math.floor(viewport.width * DEFAULT_PDF_OUTPUT_SCALE);
        canvas.height = Math.floor(viewport.height * DEFAULT_PDF_OUTPUT_SCALE);
        canvas.style.width = 'var(--mohit-custom-pdf-width)';
        canvas.style.height =  'var(--mohit-custom-pdf-height)';

        renderTasks.canvas = page.render({
            canvasContext: context,
            transform: [DEFAULT_PDF_OUTPUT_SCALE, 0, 0, DEFAULT_PDF_OUTPUT_SCALE, 0, 0],
            viewport: viewport
        });

        if(renderAborted()) { return; }
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
            
            if(renderAborted()) { return; }
            try { await renderTasks.text.render(); } catch(e) {}
            renderTasks.text = null;

            textLayerDiv.style.setProperty("--min-font-size", 1);
            const annotationLayerDiv = document.getElementById('pdf_annotation_layer_' + i);
            annotationLayerDiv.innerHTML = '';

            if(renderAborted()) { return; }
            const annotations = await page.getAnnotations({ intent: 'display' });

            if(annotations && annotations.length > 0) {
                const annotationLayer = new AnnotationLayer({
                    div: annotationLayerDiv,
                    viewport: viewport.clone({ dontFlip: true }),
                    page: page,
                    linkService: defaultLinkService
                });
                if(renderAborted()) { return; }

                // Renders the annotation layer.
                await annotationLayer.render({ annotations });
                annotationLayerDiv.style.setProperty("--min-font-size", 1);
                const annotationElements = annotationLayerDiv.children;

                if(renderAborted()) { return; }
                for(let j = 0; j < annotationElements.length; j++) {
                    const innerAnnotationElement = annotationElements.item(j).firstElementChild;
                    const annotationDataId = innerAnnotationElement.getAttribute("data-element-id");

                    if(!annotationDataId) { continue; }
                    const annotationDataObject = annotations.find((item) => { return (item.id === annotationDataId); });

                    if(!annotationDataObject || annotationDataObject.subtype !== "Link") { continue; }
                    innerAnnotationElement.classList.add(CUSTOM_ANNOTATION_HTML_CLASS);

                    if(annotationDataObject.dest) {
                        innerAnnotationElement.setAttribute(CUSTOM_PDFJS_DEST_ATTRIBUTE, JSON.stringify(annotationDataObject.dest));
                        innerAnnotationElements.push(innerAnnotationElement);

                        // This event listener watches out for click events to direct the user to the proper location when clicked.
                        innerAnnotationElement.addEventListener("click",
                            (event) => { onAnnotationClick(event); },
                            { signal: resizeAbortController.signal }
                        );
                    } else if(annotationDataObject.url && annotationDataObject.url.startsWith(PERSONAL_WEBSITE_LINK)) {
                        const annotationUrl = annotationDataObject.url;
                        const finalUrl = annotationUrl.substring((PERSONAL_WEBSITE_LINK.length - 1), annotationUrl.length);

                        innerAnnotationElement.setAttribute("href", finalUrl);
                        innerAnnotationElement.setAttribute("target", "_self");
                        innerAnnotationElement.setAttribute("aria-current", "page");

                        // This event listener watches out for click events to direct the user to the proper webpage when clicked.
                        innerAnnotationElement.addEventListener("click",
                            (event) => { onInnerWebsiteAnnotationClick(event); },
                            { signal: resizeAbortController.signal }
                        );
                    }
                }
            } else {
                // The annotation layer element for a specific page is hidden if that page does not need an annotation layer.
                docPages.value[i - 1].showAnnotations = false;
            }
        }

        // This sets that the page is fully loaded on the website. It holds the last page to add one more HTML attribute to annotations.
        if(numPages > i) { setSingleDocLoaded(i - 1); }
    }

    // This adds an attribute to every inner annotation that tells it the page to navigate to.
    for(let k = 0; k < innerAnnotationElements.length; k++) {
        const innerAnnotationElement = innerAnnotationElements[k];
        const innerAnnotationDest = JSON.parse(innerAnnotationElement.getAttribute(CUSTOM_PDFJS_DEST_ATTRIBUTE));
        if(!innerAnnotationDest) { continue; }

        const innerAnnotationPageNumber = ((await pdfDoc.value.getPageIndex(innerAnnotationDest[0])) + 1);
        innerAnnotationElement.setAttribute(CUSTOM_PDFJS_PAGE_NUMBER_ATTRIBUTE, String(innerAnnotationPageNumber));
        innerAnnotationElement.setAttribute("href", `?page=${innerAnnotationPageNumber}&y=${innerAnnotationDest[3]}`);
    }

    // This sets the last page as loaded for the user.
    styleStore.setHideOverflowArray(HideOverflow.LOADING_DOCUMENT, false);
    setSingleDocLoaded(numPages - 1);
    if(renderAborted()) { return; }

    try {
        await documentStore.getPdfAsImages();
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/** This function checks if the render abort signal has been sent or not. */
function renderAborted() {
    const aborted = renderAbortController.signal.aborted;
    if(aborted) { cancelRenders(); }
    return aborted;
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
        for(let i = 1; i <= pages.value; i++) { setPdfPageScaleFactor(i); }
    } else {
        setPdfPageScaleFactor(index);
    }
}

/**
 * This function sets the scale factor for a specific rendered Pdf Page.
 * @param {Number} index The index of the page to set.
 */
function setPdfPageScaleFactor(index = 1) {
    if(index < 1 || index > pages.value) { return; }
    try {
        const pageElement = getPageElement(index);
        const newScaleFactor = (documentStore.customPdfWidth / parseFloat(pageElement.getAttribute(CUSTOM_PDFJS_RAW_WIDTH_ATTRIBUTE)));
        if(newScaleFactor >= 0) { pageElement.style.setProperty(PDFJS_SCALE_CSS_PROPERTY, newScaleFactor); }
    } catch(e) {}
}

/**
 * This function sets the internal array that records crucial data for each page in the PDF.
 * @param {Number} numPages The Number of pages.
 */
function setInnerPagesArray(numPages = 0) {
    if(numPages < 1) { return; }
    documentStore.docLoaded.totalPages = numPages;
    docPages.value = Array.from({ length: numPages }, (_, i) => { return { loaded: false, num: (i + 1), showAnnotations: true }; });
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
    if(numPagesLoaded < totalPages) { return; }
    documentStore.docLoaded = { status: true, totalPages, loadedPages: totalPages }

    const linkUrl = new URL(router.currentRoute.value.fullPath.substring(1), PERSONAL_WEBSITE_LINK);
    const searchParams = linkUrl.searchParams;
    const hashPageNumber = parseInt(linkUrl.hash.replaceAll("#page_", ""));

    const pageQuery = (searchParams.has("page") ? parseInt(searchParams.get("page")) : NaN);
    const validPageQuery = !Number.isNaN(pageQuery);
    const yQuery = (searchParams.has("y") ? parseFloat(searchParams.get("y")) : NaN);

    if(linkUrl.hash === "#footer") {
        goToPageSection("footer");
    } else if(validPageQuery && !Number.isNaN(yQuery)) {
        scrollToPdfDest(pageQuery, yQuery, false);
    } else if(validPageQuery) {
        documentStore.scrollToPage(pageQuery);
    } else if(!Number.isNaN(hashPageNumber)) {
        documentStore.scrollToPage(hashPageNumber);
    }
}

/**
 * This function uses Vue Router to navigate to internal pages on a inner link click.
 * @param {PointerEvent} event The click event emitted by the pointer event that was clicked.
 */
function onInnerWebsiteAnnotationClick(event) {
    try {
        /** @type {HTMLAnchorElement} The element that was clicked on. */
        const element = event.target;
        if(!element || event.defaultPrevented || (element.getAttribute('target') === '_blank')) { return; }
        if(event.ctrlKey || event.metaKey || event.shiftKey) { return; }

        event.preventDefault();
        router.push(element.getAttribute("href"));
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function scrolls to a specific page on an annotation internal link click.
 * @param {PointerEvent} event The click event emitted by the pointer event that was clicked.
 */
function onAnnotationClick(event) {
    try {
        // This ensures that clicking on the annotation does not trigger its own scroll functionality.
        event.preventDefault();

        /** @type {HTMLAnchorElement} The element that was clicked on. */
        const element = event.target;
        const dest = JSON.parse(element.getAttribute(CUSTOM_PDFJS_DEST_ATTRIBUTE));

        if(!dest) { return; }
        const pageNumber = parseInt(element.getAttribute(CUSTOM_PDFJS_PAGE_NUMBER_ATTRIBUTE));

        if(dest[1].name !== "XYZ") {
            documentStore.scrollToPage(pageNumber);
        } else {
            scrollToPdfDest(pageNumber, dest[3], true);
        }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This event should trigger whenever someone right clicks on a rendered PDF.
 * @param {PointerEvent} event The event fired by the action.
 */
async function onPdfContentMenu(event) {
    event.preventDefault();
    webData.setMenuOpen(DOCUMENT_MENU, true);
    triggerClickSound();
}

/**
 * This function has the website scroll to a specific destination in the PDF.
 * @param {Number} pageNumber The page number to scroll to.
 * @param {Number} y The Y coordinate in the page to scroll to.
 * @param {Boolean} setRoute If true, this sets query parameters indicating the route to the specific coords to scroll at.
 */
function scrollToPdfDest(pageNumber = 1, y = 0, setRoute = true) {
    if(pageNumber < 1 || pageNumber > pages.value || y < 0) { return; }
    const pageElement = getPageElement(pageNumber);
    const destY = (Math.abs(y - parseFloat(pageElement.getAttribute(CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE))));
    const destScalar = parseFloat(getComputedStyle(pageElement).getPropertyValue(PDFJS_SCALE_CSS_PROPERTY));

    const scrollY = (fullScreenSet.value ? document.fullscreenElement.scrollTop : window.scrollY);
    const top = (pageElement.getBoundingClientRect().top + scrollY + (((destY * destScalar) - 90) / cssToWindowHeightRatio.value));
    scrollToTarget(top);

    if(setRoute) {
        const route = router.currentRoute.value;
        router.push({ path: route.path, hash: "", query: { ...route.query, page: pageNumber, y }});
    }
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