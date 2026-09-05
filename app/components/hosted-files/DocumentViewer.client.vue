<style lang="scss">
@use "pdfjs-dist/web/pdf_viewer.css";
</style>

<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <DocumentTopBar />
        <div class="pdf-page-innerContainer" v-for="page in docPages" :id="('page_' + page.num)" :page-num="page.num" ref="pageRefs">
            <div v-if="!documentStore.docLoaded.status" class="pdf-doc-loadingCover">
                <FontAwesomeIcon icon="fa-spinner" spin-pulse />
            </div>
            <button v-if="showDocumentShareWidgets" @click="openShare(page.num)" class="pdf-doc-linkBtn" :title="('Get A Link For Page ' + page.num + '.')">
                <FontAwesomeIcon icon="fa-link" />
            </button>

            <div :class="['mohit-rendered-pdf', ((pages > 1 && page.num != pages) ? 'multi-page' : '')]"
                @contextmenu="(event) => { onPdfContentMenu(event, page.num); }">

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
    <DocumentPageContextMenu />

    <DocumentMenu />
    <PdfPageNavigationMenu v-if="documentStore.showPdfPageNav" />
    <DocMetadataMenu :objectUrl="url" />
    <slot></slot>
</main>
</template>

<script setup>
const PDFJS_SCALE_CSS_PROPERTY = "--total-scale-factor";
const CUSTOM_ANNOTATION_HTML_CLASS = "mohit-pdf-linkAnnotation";
const CUSTOM_PDFJS_DEST_ATTRIBUTE = "mohit-data-pdfjs-dest";
const CUSTOM_PDFJS_PAGE_NUMBER_ATTRIBUTE = "mohit-data-pdfjs-page-number";
const CUSTOM_PDFJS_RAW_WIDTH_ATTRIBUTE = "mohit-pdfjs-raw-width";
const CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE = "mohit-pdfjs-raw-height";
const CUSTOM_PARENT_PAGE_NUMBER_ATTRIBUTE = "page-num";

var renderAbortController = new AbortController();
var eventAbortController = new AbortController();

var pdfDocLoadingTask = null;
var resizeTimeout = null;
var bestPageRatio = 0;

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

/** @type {import('vue').Ref<Array<HTMLElement>>} The array of references to the Page elemnets. */
const pageRefs = ref([]);
const currentDocumentSize = ref(0);
const currentPixelRatio = ref(1);

// This observer tracks which page the user is currently viewing.
useIntersectionObserver(pageRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const entryItem = entry[i];
        const itemRatio = entryItem.intersectionRatio;
        const newPageNumber = parseInt(entryItem.target.getAttribute(CUSTOM_PARENT_PAGE_NUMBER_ATTRIBUTE));

        if(itemRatio <= bestPageRatio && (newPageNumber != documentStore.currentObservedPage)) { continue; }
        bestPageRatio = itemRatio;
        documentStore.setCurrentObservedPage(newPageNumber);
    }
}, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] });

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
    try {
        if(renderAborted()) { return; }
        styleStore.setHideOverflowArray(HideOverflow.LOADING_DOCUMENT, true);
        await renderPDF();

        const signal = eventAbortController.signal;
        window.addEventListener("animation-resize", (event) => { resizePdfViewer(event); }, { signal });
        window.addEventListener("mohit-pdf-destination-scroll", () => { scrollToCurrentPdfDest(); }, { signal });
        window.addEventListener("keydown", (event) => { documentStore.onHostedDocumentPageKeydown(event); }, { signal });
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
});
onBeforeUnmount(() => {
    renderAbortController.abort();
    eventAbortController.abort();

    renderAbortController = null;
    eventAbortController = null;

    styleStore.setHideOverflowArray(HideOverflow.LOADING_DOCUMENT, false);
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
    if(renderAborted()) { return; }

    const { getDocument, TextLayer, AnnotationLayer } = await import("pdfjs-dist");
    const { PDFLinkService, EventBus } = await import("pdfjs-dist/web/pdf_viewer.mjs");
    await documentStore.checkPdfjsWorker();
    if(renderAborted()) { return; }

    pdfDocLoadingTask = getDocument({ url: props.url });
    pdfDoc.value = await pdfDocLoadingTask.promise;
    const numPages = pdfDoc.value.numPages;
    if(renderAborted()) { return; }

    pages.value = numPages;
    setInnerPagesArray(numPages);
    await nextTick();
    if(renderAborted()) { return; }

    /** This is a link service used by the annotation layers. */
    const defaultLinkService = new PDFLinkService({ eventBus: new EventBus(), externalLinkTarget: 2 });
    defaultLinkService.getDestinationHash = (string) => { return "#"; }
    defaultLinkService.goToDestination = (dest) => { return; }

    // This sets the initial document size for each PDF Page.
    currentDocumentSize.value = documentStore.customPdfWidth;
    currentPixelRatio.value = styleStore.recordedDevicePixelRatio;

    /**
     * This function renders a singular page.
     * @param {Number} i The page number.
     */
    async function renderSingularPage(i = 1) {
        if(renderAborted()) { return; }
        const page = await pdfDoc.value.getPage(i);
        const defaultViewport = page.getViewport({ scale: 1 });

        const pageElement = getPageElement(i);
        pageElement.setAttribute(CUSTOM_PDFJS_RAW_WIDTH_ATTRIBUTE, String(defaultViewport.width));
        pageElement.setAttribute(CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE, String(defaultViewport.height));

        // Sets a properly scaled viewport so it works on every necessary size.
        const viewport = page.getViewport({ scale: (currentDocumentSize.value / defaultViewport.width) });
        setPdfPageScaleFactor(i);

        /** @type {HTMLCanvasElement} This is the canvas element that stores the image layer of a rendered PDF page. */
        var canvas = document.getElementById("pdf_canvas_" + i);
        var context = canvas.getContext("2d");

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        canvas.width = Math.floor(viewport.width * currentPixelRatio.value);
        canvas.height = Math.floor(viewport.height * currentPixelRatio.value);
        canvas.style.width = 'var(--mohit-custom-pdf-width)';
        canvas.style.height =  'var(--mohit-custom-pdf-height)';

        const canvasRenderTask = page.render({
            canvasContext: context,
            transform: [currentPixelRatio.value, 0, 0, currentPixelRatio.value, 0, 0],
            viewport: viewport
        });

        if(renderAborted()) { return; }
        try { await canvasRenderTask.promise; } catch(e) {}

        if(props.annontations) {
            const textLayerDiv = document.getElementById('pdf_text_layer_'+ i);
            textLayerDiv.innerHTML = '';
            const textContent = await page.getTextContent({ includeMarkedContent: true });
            
            const textRenderTask = new TextLayer({
                textContentSource: textContent,
                container: textLayerDiv,
                viewport: viewport
            });
            
            if(renderAborted()) { return; }
            try { await textRenderTask.render(); } catch(e) {}

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
                        const innerAnnotationDest = annotationDataObject.dest;
                        const innerAnnotationPageNumber = ((await pdfDoc.value.getPageIndex(annotationDataObject.dest[0])) + 1);

                        innerAnnotationElement.setAttribute(CUSTOM_PDFJS_DEST_ATTRIBUTE, JSON.stringify(innerAnnotationDest));
                        innerAnnotationElement.setAttribute(CUSTOM_PDFJS_PAGE_NUMBER_ATTRIBUTE, String(innerAnnotationPageNumber));
                        innerAnnotationElement.setAttribute("href", `?page=${innerAnnotationPageNumber}&y=${innerAnnotationDest[3]}`);

                        // This event listener watches out for click events to direct the user to the proper location when clicked.
                        innerAnnotationElement.addEventListener("click",
                            (event) => { onAnnotationClick(event); },
                            { signal: eventAbortController.signal }
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
                            { signal: eventAbortController.signal }
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

    /** @type {Array<Array<Promise>>} A 2D Array of page render tasks. */
    const pageRenderPromises = create2dPromiseArray(numPages, DOCUMENT_RENDER_TASK_PARTITION_SIZE);
    const numPromiseArrays = pageRenderPromises.length;

    // This fills all the numbers in the Array with Promises.
    for(let i = 0; i < numPromiseArrays; i++) {
        const numPromiseForIArray = pageRenderPromises[i].length;
        for(let j = 0; j < numPromiseForIArray; j++) {
            pageRenderPromises[i][j] = renderSingularPage(pageRenderPromises[i][j]);
        }
    }

    // This runs all the arrays of promises.
    for(let k = 0; k < numPromiseArrays; k++) { await Promise.all(pageRenderPromises[k]); }

    // This sets the last page as loaded for the user.
    styleStore.setHideOverflowArray(HideOverflow.LOADING_DOCUMENT, false);
    documentStore.setCurrentObservedPage(1);
    setSingleDocLoaded(numPages - 1);
    if(renderAborted()) { return; }

    try {
        await documentStore.getPdfAsImages();
        await rerenderCanvases();
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/** This function rerenders the canvases for the PDF. */
async function rerenderCanvases() {
    resizeTimeout = null;
    const documentSizeUnchanged = (currentDocumentSize.value == documentStore.customPdfWidth);
    const pixelRatioUnchanged = (currentPixelRatio.value == styleStore.recordedDevicePixelRatio);

    if(documentSizeUnchanged && pixelRatioUnchanged) { return; }
    if(renderAbortController != null) { renderAbortController.abort(); }
    renderAbortController = new AbortController();

    currentDocumentSize.value = documentStore.customPdfWidth;
    currentPixelRatio.value = styleStore.recordedDevicePixelRatio;

    /** This function renders a singular canvas  */
    async function renderSingularCanvas(i = 1) {
        if(renderAborted()) { return; }
        const page = await pdfDoc.value.getPage(i);
        const defaultViewport = page.getViewport({ scale: 1 });

        const pageElement = getPageElement(i);
        pageElement.setAttribute(CUSTOM_PDFJS_RAW_WIDTH_ATTRIBUTE, String(defaultViewport.width));
        pageElement.setAttribute(CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE, String(defaultViewport.height));

        // Sets a properly scaled viewport so it works on every necessary size.
        const viewport = page.getViewport({ scale: (currentDocumentSize.value / defaultViewport.width) });
        setPdfPageScaleFactor(i);

        /** @type {HTMLCanvasElement} This is the canvas element that stores the image layer of a rendered PDF page. */
        var canvas = document.getElementById("pdf_canvas_" + i);
        var context = canvas.getContext("2d");

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        canvas.width = Math.floor(viewport.width * currentPixelRatio.value);
        canvas.height = Math.floor(viewport.height * currentPixelRatio.value);
        canvas.style.width = 'var(--mohit-custom-pdf-width)';
        canvas.style.height =  'var(--mohit-custom-pdf-height)';

        const canvasRenderTask = page.render({
            canvasContext: context,
            transform: [currentPixelRatio.value, 0, 0, currentPixelRatio.value, 0, 0],
            viewport: viewport
        });

        if(renderAborted()) { return; }
        try { await canvasRenderTask.promise; } catch(e) {}
    }

    /** @type {Array<Array<Promise>>} A 2D Array of page render tasks. */
    const pageRenderPromises = create2dPromiseArray(pages.value, DOCUMENT_RENDER_TASK_PARTITION_SIZE);
    const numPromiseArrays = pageRenderPromises.length;

    // This fills all the numbers in the Array with Promises.
    for(let i = 0; i < numPromiseArrays; i++) {
        const numPromiseForIArray = pageRenderPromises[i].length;
        for(let j = 0; j < numPromiseForIArray; j++) {
            pageRenderPromises[i][j] = renderSingularCanvas(pageRenderPromises[i][j]);
        }
    }

    // This runs all the arrays of promises.
    for(let k = 0; k < numPromiseArrays; k++) { await Promise.all(pageRenderPromises[k]); }
    if(!pixelRatioUnchanged) { await documentStore.getPdfAsImages(); }
}

/** This function checks if the render abort signal has been sent or not. */
function renderAborted() {
    return ((renderAbortController == null) ? false : renderAbortController.signal.aborted);
}

/**
 * This function resizes all necessary components for the PDF Viewer when called.
 * @param {Event} event The event fired by resizing the screen.
 */
function resizePdfViewer(event) {
    if(webData.pdfNavMenuOpen && event && event.detail.type === "pixel-ratio") { webData.closeNavMenu(); }
    if(resizeTimeout != null) { clearTimeout(resizeTimeout); }
    resizeTimeout = setTimeout(() => { rerenderCanvases(); }, 250);
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

    documentStore.docLoaded = { status: (numPagesLoaded >= totalPages), totalPages, loadedPages: numPagesLoaded }
    if(documentStore.docLoaded.status) { scrollToCurrentPdfDest(); }
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
            const route = router.currentRoute.value;
            router.push({ path: route.path, hash: "", query: { ...route.query, page: pageNumber, y: dest[3] }});
        }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This event should trigger whenever someone right clicks on a rendered PDF.
 * @param {PointerEvent} event The event fired by the action.
 * @param {Number} pageNum The number of the page that was clicked on.
 */
async function onPdfContentMenu(event, pageNum = 1) {
    /** @type {HTMLElement} The element that was clicked on. */
    const element = event.target;
    const selection = window.getSelection();
    const selectedText = (selection ? selection.toString().trim() : "");

    // If the user does not right click on selected text or a link or holds the control key down, this function does nothing.
    if(event.ctrlKey || element.closest("a")) { return; }
    if(selection && selectedText.length > 0 && selection.containsNode(element, true)) { return; }

    // This opens the custom hosted document context menu.
    event.preventDefault();
    if(documentStore.contextMenuPageNumber > 0 && pageNum != 0) {
        documentStore.setContextMenuPageNumber(0);
        sleep(100).then(() => { documentStore.setContextMenuPageNumber(pageNum); });
    } else {
        documentStore.setContextMenuPageNumber(pageNum);
    }
}

/**
 * This function has the website scroll to a specific destination in the PDF.
 * @param {Number} pageNumber The page number to scroll to.
 * @param {Number} y The Y coordinate in the page to scroll to.
 */
function scrollToPdfDest(pageNumber = 1, y = 0) {
    if(pageNumber < 1 || pageNumber > pages.value || y < 0) { return; }
    const pageElement = getPageElement(pageNumber);
    const destY = (Math.abs(y - parseFloat(pageElement.getAttribute(CUSTOM_PDFJS_RAW_HEIGHT_ATTRIBUTE))));
    const destScalar = parseFloat(getComputedStyle(pageElement).getPropertyValue(PDFJS_SCALE_CSS_PROPERTY));

    const scrollY = (fullScreenSet.value ? document.fullscreenElement.scrollTop : window.scrollY);
    const destPixels = (((destY * destScalar) - (fullScreenSet.value ? 20 : 90)) / cssToWindowHeightRatio.value);
    const top = (pageElement.getBoundingClientRect().top + scrollY + destPixels);
    scrollToTarget(top);
}

/** This function lets the user scroll to the current PDF Destination using the URL. */
function scrollToCurrentPdfDest() {
    const linkUrl = new URL(router.currentRoute.value.fullPath.substring(1), PERSONAL_WEBSITE_LINK);
    const searchParams = linkUrl.searchParams;
    const hashPageNumber = parseInt(linkUrl.hash.replaceAll("#page_", ""));

    const pageQuery = (searchParams.has("page") ? parseInt(searchParams.get("page")) : NaN);
    const validPageQuery = !Number.isNaN(pageQuery);
    const yQuery = (searchParams.has("y") ? parseFloat(searchParams.get("y")) : NaN);

    if(linkUrl.hash === "#footer") {
        goToPageSection("footer");
    } else if(validPageQuery && !Number.isNaN(yQuery)) {
        scrollToPdfDest(pageQuery, yQuery);
    } else if(validPageQuery) {
        documentStore.scrollToPage(pageQuery);
    } else if(!Number.isNaN(hashPageNumber)) {
        documentStore.scrollToPage(hashPageNumber);
    } else {
        scrollToTop(false, 10);
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