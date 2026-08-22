/**
 * This function takes a PDF and renders it as an array of PNGs, one for each page.
 * @param {String} url The URL of the PDF.
 * @param {Number} width The Width Of The PDF.
 */
export async function renderPdfAsPng(url = "", width = DEFAULT_PDF_MAX_WIDTH) {
    if(import.meta.server || !url || url === "") { throw new Error("URL Invalid."); }
    const pdfBlob = await (await fetch(url)).blob(); // The blob fetched with the URL.

    if(!pdfBlob || pdfBlob == null || !(pdfBlob instanceof Blob)) { throw new Error("Blob Parsed By URL Invalid."); }
    await useDocumentStore().checkPdfjsWorker();

    const pdfLoadingTask = (await import("pdfjs-dist")).getDocument({ url });
    const pdf = await pdfLoadingTask.promise;
    const numPages = pdf.numPages;

    /** @type {Array<String>} An array of Object URLs representing every page as a PNG. */
    const imageObjectUrls = Array.from({ length: numPages }, () => { return null; });

    /** This function renders a specific page in the PDF as a PNG. */
    async function renderPageAsPng(pageNum = 1) {
        const pdfPage = await pdf.getPage(pageNum);
        const defaultViewport = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: (width / defaultViewport.width) });

        const canvasElement = document.createElement("canvas");
        const canvasContext = canvasElement.getContext("2d");

        canvasElement.height = Math.floor(viewport.height * DEFAULT_PDF_OUTPUT_SCALE);
        canvasElement.width = Math.floor(viewport.width * DEFAULT_PDF_OUTPUT_SCALE);

        const canvasRenderTask = pdfPage.render({
            viewport: viewport,
            transform: [DEFAULT_PDF_OUTPUT_SCALE, 0, 0, DEFAULT_PDF_OUTPUT_SCALE, 0, 0],
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
    const pageRenderPromises = [];
    const numPromiseArrays = Math.ceil(numPages / 10);
    const numPromisesPerArray = (numPages / numPromiseArrays);

    // This divides the tasks into separate arrays to ensure the website does not crash or something.
    for(let i = 0; i < numPromiseArrays; i++) {
        const tempPromiseArray = [];
        for(let j = 1; j <= numPromisesPerArray; j++) { tempPromiseArray.push(renderPageAsPng(j + (i * numPromisesPerArray))); }
        pageRenderPromises.push(tempPromiseArray);
    }

    // This runs all the arrays of promises and returns the Array of Images.
    for(let k = 0; k < numPromiseArrays; k++) { await Promise.all(pageRenderPromises[k]); }
    return imageObjectUrls;
}