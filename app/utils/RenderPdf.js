/**
 * This function takes a PDF and renders it into an iframe for printing.
 * @param {String} url The URL of the PDF.
 * @param {AbortSignal} signal A signal to abort rendering the iframe.
 */
export async function renderCustomPrintIframe(url = "", signal = null) {
    if(!import.meta.client || !url || url === "") { throw new Error("URL Invalid."); }
    if(!(signal instanceof AbortSignal)) { signal = null; }

    /** @type {HTMLIFrameElement} This is the IFrame where the HTML should be rendered onto. */
    var printIframe = null;

    /** This returns a boolean determining whether the iframe render was aborted or not. */
    function renderAborted() {
        const abortStatus = (!signal ? false : signal.aborted);
        if(abortStatus && printIframe != null) { printIframe.remove(); }
        return abortStatus;
    }

    if(renderAborted()) { return null; }
    const documentStore = useDocumentStore();
    await documentStore.checkPdfjsWorker();

    if(renderAborted()) { return null; }
    const PRINT_IFRAME_ID = "mohit-doc-customPrint";
    const PRINT_IFRAME_PAGE_CLASS = "mohit-doc-customPrint-page";
    const PRINT_IFRAME_PAGE_ID_PREFIX = "mohit-customPrint-page_";
    const LETTER_WIDTH = 816;

    /** This is the IFrame where the HTML should be rendered onto. */
    printIframe = await createIFrameForPrint({ id: PRINT_IFRAME_ID, attribute: "none", value: "" });

    if(renderAborted()) { return null; }
    const { getDocument, TextLayer, AnnotationLayer } = await import("pdfjs-dist");
    const { PDFLinkService, EventBus } = await import("pdfjs-dist/web/pdf_viewer.mjs");

    const defaultLinkService = new PDFLinkService({ eventBus: new EventBus(), externalLinkTarget: 2 });
    const imageOutputScale = 2;
    const imageType = "image/png";

    if(renderAborted()) { return null; }
    const pdfLoadingTask = getDocument({ url });
    const pdf = await pdfLoadingTask.promise;
    const numPages = pdf.numPages;

    if(renderAborted()) { return null; }
    const printIframeDocument = (printIframe.contentDocument || printIframe.contentWindow.document);
    const iframeStyle = printIframeDocument.createElement("style");
    const pdfjsStylesheet = printIframeDocument.createElement("style");

    const customPrintStyles = await fetch("/printstyles.css");
    if(!customPrintStyles.ok) { throw new Error("Failed To Load Print CSS Stylesheet."); }

    iframeStyle.textContent = await customPrintStyles.text();
    pdfjsStylesheet.textContent = documentStore.getPdfjsStylesheet();

    printIframeDocument.body.appendChild(iframeStyle);
    printIframeDocument.head.appendChild(pdfjsStylesheet);
    if(renderAborted()) { return null; }

    // Creates Containers for each page.
    for(let i = 1; i <= numPages; i++) {
        const printPageContainer = printIframeDocument.createElement("div");
        printPageContainer.classList.add(PRINT_IFRAME_PAGE_CLASS);
        printPageContainer.id = (PRINT_IFRAME_PAGE_ID_PREFIX + String(i));

        printIframeDocument.body.appendChild(printPageContainer);
        await waitTwoFrames();
    }

    /** This function renders a single page for print.  */
    async function renderPrintPage(pageNum = 1) {
        if(renderAborted()) { return; }
        const printPageContainer = printIframeDocument.getElementById(PRINT_IFRAME_PAGE_ID_PREFIX + String(pageNum));
        if(!printPageContainer) { throw new Error("Page Container Not Found."); }

        const pdfPage = await pdf.getPage(pageNum);
        const defaultViewport = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: (LETTER_WIDTH / defaultViewport.width) });

        if(renderAborted()) { return; }
        printPageContainer.style.setProperty("--mohit-customPrint-pdfjs-raw-width", String(defaultViewport.width));
        printPageContainer.style.setProperty("--mohit-customPrint-pdfjs-raw-height", String(defaultViewport.height));
        printPageContainer.style.setProperty("--min-font-size", 1);
        printPageContainer.style.setProperty("--total-scale-factor", String(viewport.scale));

        const canvasElement = document.createElement("canvas");
        const canvasContext = canvasElement.getContext("2d");

        const imageWidth = Math.floor(viewport.width * imageOutputScale);
        const imageHeight = Math.floor(viewport.height * imageOutputScale);

        canvasElement.height = imageHeight;
        canvasElement.width = imageWidth;

        const canvasRenderTask = pdfPage.render({
            viewport: viewport,
            transform: [imageOutputScale, 0, 0, imageOutputScale, 0, 0],
            canvasContext
        });

        if(renderAborted()) { return; }
        await canvasRenderTask.promise;

        const printPageImage = printIframeDocument.createElement("img");
        printPageImage.src = canvasElement.toDataURL(imageType, 1);

        printPageImage.width = imageWidth;
        printPageImage.height = imageHeight
        printPageImage.draggable = false;

        if(renderAborted()) { return; }
        printPageContainer.appendChild(printPageImage);

        // This awaits for the image to load with proper error handling.
        await new Promise(async (resolve, reject) => {
            if(printPageImage.complete) { return resolve(); }
            var msPassed = 0;
            var resolved = 0;

            printPageImage.onload = () => {
                resolved = 1;
                resolve();
            }
            printPageImage.onerror = () => {
                resolved = 2;
                if(renderAborted()) {
                    resolve();
                } else {
                    reject(new Error("Error Loading Image"));
                }
            }

            while(msPassed < 7000 && resolved == 0 && !renderAborted()) {
                await sleep(50);
                msPassed += 50;
            }


            if(resolved == 1 || renderAborted()) {
                resolve();
            } else if(resolved == 0) {
                reject(new Error("Timeout Error"));
            }
        });

        if(renderAborted()) { return; }
        const printPageText = document.createElement("div");
        printPageText.classList.add("textLayer");
        printPageContainer.appendChild(printPageText);

        await waitTwoFrames();
        const textContent = await pdfPage.getTextContent({ includeMarkedContent: true });

        const textRenderTask = new TextLayer({
            textContentSource: textContent,
            container: printPageText,
            viewport: viewport
        });
        
        if(renderAborted()) { return; }
        await textRenderTask.render();
        const annotations = await pdfPage.getAnnotations({ intent: 'print' });

        if(annotations && annotations.length > 0) {
            const printPageAnnotations = document.createElement("div");
            printPageAnnotations.classList.add("annotationLayer");
            printPageContainer.appendChild(printPageAnnotations);

            const annotationLayer = new AnnotationLayer({
                div: printPageAnnotations,
                viewport: viewport.clone({ dontFlip: true }),
                page: pdfPage,
                linkService: defaultLinkService
            });

            if(renderAborted()) { return; }
            await waitTwoFrames();
            await annotationLayer.render({ annotations });
        }
    }

    // Returns null if the render was aborted.
    if(renderAborted()) { return null; }

    /** @type {Array<Array<Promise>>} A 2D Array of page render tasks. */
    const pageRenderPromises = create2dPromiseArray(numPages, DOCUMENT_RENDER_TASK_PARTITION_SIZE);
    const numPromiseArrays = pageRenderPromises.length;

    // This fills all the numbers in the Array with Promises.
    for(let i = 0; i < numPromiseArrays; i++) {
        const numPromiseForIArray = pageRenderPromises[i].length;
        for(let j = 0; j < numPromiseForIArray; j++) {
            pageRenderPromises[i][j] = renderPrintPage(pageRenderPromises[i][j]);
        }
    }

    // This runs all the arrays of promises and returns the print iframe.
    for(let k = 0; k < numPromiseArrays; k++) { await Promise.all(pageRenderPromises[k]); }
    return (renderAborted() ? null : printIframe);
}