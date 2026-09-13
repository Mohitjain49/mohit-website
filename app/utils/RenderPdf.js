/**
 * This function takes a PDF and renders it as an array of PNGs, one for each page.
 * @param {String} url The URL of the PDF.
 * @param {Number} width The Width Of The PDF.
 * @param {Boolean} usePixelRatio If true, this function incorporates the device pixel ratio to enhance the rendered image.
 */
export async function renderPdfAsPng(url = "", width = DEFAULT_PDF_MAX_WIDTH, usePixelRatio = false) {
    if(!import.meta.client || !url || url === "") { throw new Error("URL Invalid."); }
    const pdfBlob = await (await fetch(url)).blob(); // The blob fetched with the URL.

    if(!pdfBlob || pdfBlob == null || !(pdfBlob instanceof Blob)) { throw new Error("Blob Parsed By URL Invalid."); }
    await useDocumentStore().checkPdfjsWorker();

    const pdfLoadingTask = (await import("pdfjs-dist")).getDocument({ url });
    const pdf = await pdfLoadingTask.promise;
    const numPages = pdf.numPages;

    /** @type {Array<String>} An array of Object URLs representing every page as a PNG. */
    const imageObjectUrls = Array.from({ length: numPages }, () => { return null; });
    const outputScale = (usePixelRatio ? useStyleStore().recordedDevicePixelRatio : 1);

    /** This function renders a specific page in the PDF as a PNG. */
    async function renderPageAsPng(pageNum = 1) {
        const pdfPage = await pdf.getPage(pageNum);
        const defaultViewport = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: (width / defaultViewport.width) });

        const canvasElement = document.createElement("canvas");
        const canvasContext = canvasElement.getContext("2d");

        canvasElement.height = Math.floor(viewport.height * outputScale);
        canvasElement.width = Math.floor(viewport.width * outputScale);

        const canvasRenderTask = pdfPage.render({
            viewport: viewport,
            transform: [outputScale, 0, 0, outputScale, 0, 0],
            canvasContext
        });

        // Renders the PDF Image in a canvas first.
        await canvasRenderTask.promise;

        /** @type {Blob} The image blob gotten from paring the canvas. */
        const imgBlob = await new Promise((resolve, reject) => {
            if(!canvasElement) { resolve(null); }
            canvasElement.toBlob((result) => { resolve(result); }, "image/png", 1);
        });

        if(!imgBlob) {
            throw new Error("Image Fetch Failed For Page " + i + ".");
        } else {
            imageObjectUrls[pageNum - 1] = URL.createObjectURL(imgBlob);
        }
    }

    /** @type {Array<Array<Promise>>} A 2D Array of page render tasks. */
    const pageRenderPromises = create2dPromiseArray(numPages, DOCUMENT_RENDER_TASK_PARTITION_SIZE);
    const numPromiseArrays = pageRenderPromises.length;

    // This fills all the numbers in the Array with Promises.
    for(let i = 0; i < numPromiseArrays; i++) {
        const numPromiseForIArray = pageRenderPromises[i].length;
        for(let j = 0; j < numPromiseForIArray; j++) {
            pageRenderPromises[i][j] = renderPageAsPng(pageRenderPromises[i][j]);
        }
    }

    // This runs all the arrays of promises and returns the Array of Images.
    for(let k = 0; k < numPromiseArrays; k++) { await Promise.all(pageRenderPromises[k]); }
    return imageObjectUrls;
}

/**
 * This function takes a PDF and renders it into an iframe for printing.
 * @param {String} url The URL of the PDF.
 */
export async function renderCustomPrintIframe(url = "") {
    if(!import.meta.client || !url || url === "") { throw new Error("URL Invalid."); }
    const pdfBlob = await (await fetch(url)).blob(); // The blob fetched with the URL.

    if(!pdfBlob || pdfBlob == null || !(pdfBlob instanceof Blob)) { throw new Error("Blob Parsed By URL Invalid."); }
    const documentStore = useDocumentStore();
    await documentStore.checkPdfjsWorker();

    const PRINT_IFRAME_ID = "mohit-doc-customPrint";
    const PRINT_IFRAME_PAGE_CLASS = "mohit-doc-customPrint-page";
    const PRINT_IFRAME_PAGE_ID_PREFIX = "mohit-customPrint-page_";
    const LETTER_WIDTH = 816;

    var printIframe = document.createElement("iframe");
    printIframe.id = PRINT_IFRAME_ID;
    printIframe.classList.add(PRINT_IFRAME_ID);

    await new Promise(async (resolve, reject) => {
        document.body.append(printIframe);
        const tempIframeDocument = (printIframe.contentDocument || printIframe.contentWindow?.document);

        if(tempIframeDocument && tempIframeDocument.readyState === "complete") {
            resolve("IFrame Loaded");
        } else {
            printIframe.onload = () => { resolve("IFrame Loaded"); }
            sleep(7000).then(() => { reject(new Error("Timeout Error")); });
        }
    });

    const { getDocument, TextLayer, AnnotationLayer } = await import("pdfjs-dist");
    const { PDFLinkService, EventBus } = await import("pdfjs-dist/web/pdf_viewer.mjs");
    const defaultLinkService = new PDFLinkService({ eventBus: new EventBus(), externalLinkTarget: 2 });

    const pdfLoadingTask = getDocument({ url });
    const pdf = await pdfLoadingTask.promise;
    const numPages = pdf.numPages;

    const printIframeDocument = (printIframe.contentDocument || printIframe.contentWindow.document);
    const iframeStyle = printIframeDocument.createElement("style");
    const pdfjsStylesheet = printIframeDocument.createElement("style");

    const customPrintStyles = await fetch("/printstyles.css");
    if(!customPrintStyles.ok) { throw new Error("Failed To Load Print CSS Stylesheet."); }

    iframeStyle.textContent = await customPrintStyles.text();
    pdfjsStylesheet.textContent = documentStore.getPdfjsStylesheet();

    printIframeDocument.body.appendChild(iframeStyle);
    printIframeDocument.head.appendChild(pdfjsStylesheet);

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
        const printPageContainer = printIframeDocument.getElementById(PRINT_IFRAME_PAGE_ID_PREFIX + String(pageNum));
        if(!printPageContainer) { throw new Error("Page Container Not Found."); }

        const pdfPage = await pdf.getPage(pageNum);
        const defaultViewport = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: (LETTER_WIDTH / defaultViewport.width) });

        printPageContainer.style.setProperty("--mohit-customPrint-pdfjs-raw-width", String(defaultViewport.width));
        printPageContainer.style.setProperty("--mohit-customPrint-pdfjs-raw-height", String(defaultViewport.height));
        printPageContainer.style.setProperty("--min-font-size", 1);
        printPageContainer.style.setProperty("--total-scale-factor", String(viewport.scale));

        const canvasElement = document.createElement("canvas");
        const canvasContext = canvasElement.getContext("2d");

        const imageWidth = Math.floor(viewport.width * 2);
        const imageHeight = Math.floor(viewport.height * 2);

        canvasElement.height = imageHeight;
        canvasElement.width = imageWidth;

        const canvasRenderTask = pdfPage.render({
            viewport: viewport,
            transform: [2, 0, 0, 2, 0, 0],
            canvasContext
        });

        // This renders the PDF so it can be converted into an image.
        await canvasRenderTask.promise;

        /** @type {Blob} The image blob gotten from creating the canvas. */
        const imgBlob = await new Promise((resolve, reject) => {
            if(!canvasElement) { resolve(null); }
            canvasElement.toBlob((result) => { resolve(result); }, "image/png", 1);
        });

        const printPageImage = printIframeDocument.createElement("img");
        const printPageImageSrc = URL.createObjectURL(imgBlob);
        printPageImage.src = printPageImageSrc;

        printPageImage.width = imageWidth;
        printPageImage.height = imageHeight
        printPageImage.draggable = false;

        printPageContainer.appendChild(printPageImage);
        await new Promise((resolve, reject) => {
            if(printPageImage.complete) {
                URL.revokeObjectURL(printPageImageSrc);
                resolve();
            } else {
                printPageImage.onload = () => {
                    URL.revokeObjectURL(printPageImageSrc);
                    resolve();
                }
            }
        });

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
        
        await textRenderTask.render();
        const annotations = await pdfPage.getAnnotations({ intent: 'print' });
        // console.log(annotations);

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

            await waitTwoFrames();
            await annotationLayer.render({ annotations });
        }
    }

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

    // This runs all the arrays of promises and returns the Array of Images.
    for(let k = 0; k < numPromiseArrays; k++) { await Promise.all(pageRenderPromises[k]); }
    return printIframe;
}