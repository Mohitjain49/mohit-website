import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import { PDF, StandardFonts, rgb } from "@libpdf/core";
import QRCodeStyling from "qr-code-styling";

export const RESUME_HOSTED_DOCUMENT_INDEX = 0;

/** This pinia store is used to customize my resume. */
export const useResumeStore = defineStore("resume-store", () => {
    const documentStore = useDocumentStore();
    const router = useRouter();
    const fullScreenSet = getFullScreenSet();

    const blobCreated = ref(0);
    const mountedOnce = ref(false);
    const queryOutOfSync = ref(false);

    const qrcodeAdded = ref(false);
    const linksRemoved = ref(false);

    /** @type {import('vue').ShallowRef<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = shallowRef(null);
    const objectUrl = shallowRef("");

    // This watcher runs a function to check if the resume customization options are in sync or not.
    watch(() => router.currentRoute.value.query, () => { checkQueryOutOfSync(); }, { deep: true });

    /** This function mounts the resume page. */
    async function mountResumePage() {
        await nextTick();
        await onNuxtReadyAdvanced();

        if(mountedOnce.value) {
            await setResumeQuery();
        } else {
            mountedOnce.value = true;
            const routeQuery = router.currentRoute.value.query;
            const onMainResumeRoute = documentStore.onMainResumeRoute;

            qrcodeAdded.value = (onMainResumeRoute && routeQuery.qrcodeAdded && routeQuery.qrcodeAdded === "true");
            linksRemoved.value = (onMainResumeRoute && routeQuery.linksRemoved && routeQuery.linksRemoved === "true");
        }

        await initBlob({ addQrcode: qrcodeAdded.value, removeLinks: linksRemoved.value, updateQuery: false });
        const scaleFactor = documentStore.hostedDocuments[RESUME_HOSTED_DOCUMENT_INDEX].metadata.pageHeightToWidthRatio;
        documentStore.mountCustomDocumentPage(DEFAULT_PDF_MAX_WIDTH, DEFAULT_PDF_MIN_WIDTH, scaleFactor);
    }

    /** This function unmounts the resume page. */
    function unmountResumePage() {
        deleteCurrentBlob();
        documentStore.unmountDocumentPage();
    }

    /**
     * This function initializes a blob and its object url for my resume.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.updateQuery If true (which is the default), this will update the URL to show the modifications.
     */
    async function initBlob(options = {}) {
        if(blobCreated.value != 0) { return; }
        blobCreated.value = 1;

        blob.value = await createNewBlob(options);
        objectUrl.value = URL.createObjectURL(blob.value);

        await documentStore.hostedDocuments[RESUME_HOSTED_DOCUMENT_INDEX].setNewBlob(blob.value);
        const newLink = ((qrcodeAdded.value || linksRemoved.value) ? objectUrl.value : PERSONAL_RESUME_LINK);
        documentStore.hostedDocuments[RESUME_HOSTED_DOCUMENT_INDEX].changeLink(newLink);

        await sleep(5);
        blobCreated.value = 2;
    }

    /** This functio deletes the current blob and object URL for my resume. */
    function deleteCurrentBlob() {
        if(blobCreated.value != 2) { return; }
        blobCreated.value = 1.1;

        blob.value = null;
        documentStore.hostedDocuments[RESUME_HOSTED_DOCUMENT_INDEX].deleteBlob();
        objectUrl.value = "";
        blobCreated.value = 0;
    }

    /**
     * This function resets the resume blob.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.updateQuery If true (which is the default), this will update the URL to show the modifications.
     */
    async function resetBlob(options) {
        const fullScreenSetBeforeReset = fullScreenSet.value;
        deleteCurrentBlob();
        documentStore.unmountDocumentPage();

        await sleep(100);
        await initBlob(options);

        const scaleFactor = documentStore.hostedDocuments[RESUME_HOSTED_DOCUMENT_INDEX].metadata.pageHeightToWidthRatio;
        documentStore.mountCustomDocumentPage(DEFAULT_PDF_MAX_WIDTH, DEFAULT_PDF_MIN_WIDTH, scaleFactor);
        if(fullScreenSetBeforeReset) { await documentStore.toggleDocumentFullScreen(); }
    }

    /** This function updates the query based on the resume customization options. */
    async function setResumeQuery() {
        const route = router.currentRoute.value;
        await router.push({ path: route.path, hash: route.hash, query: {
            ...route.query,
            qrcodeAdded: (qrcodeAdded.value ? "true" : undefined),
            linksRemoved: (linksRemoved.value ? "true" : undefined)
        }});
    }

    /** This function sets a flag that tells if the URL query parameters reflect the state of the resume. */
    function checkQueryOutOfSync() {
        queryOutOfSync.value = false;
        if(blobCreated.value != 2 || !documentStore.onMainResumeRoute) { return; }

        const routeQuery = router.currentRoute.value.query;
        if(qrcodeAdded.value !== (routeQuery?.qrcodeAdded === "true")) { queryOutOfSync.value = true; }
        if(linksRemoved.value !== (routeQuery?.linksRemoved === "true")) { queryOutOfSync.value = true; }
    }

    /**
     * This function creates a new blob for the resume to be rendered into.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.updateQuery If true (which is the default), this will update the URL to show the modifications.
     * @returns The blob of the new resume.
     */
    async function createNewBlob(options = {}) {
        if(options?.addQrcode == undefined) { options.addQrcode = false; }
        if(options?.removeLinks == undefined) { options.removeLinks = false; }
        if(options?.updateQuery == undefined) { options.updateQuery = true; }
        var newResumeBlob = await fetch(Mohit_Jain_Resume).then((res) => res.blob());

        // This section adds a QR Code to my resume if requested.
        if(options.addQrcode) {
            const existingPdfBytes = await newResumeBlob.arrayBuffer();
            const pdfDoc = await PDF.load(new Uint8Array(existingPdfBytes));

            // This generates the QR Code and makes into a usuable image for the PDF
            const qrCode = new QRCodeStyling({
                width: 300,
                height: 300,
                margin: 5,
                data: PERSONAL_WEBSITE_LINK,
                type: "canvas",
                dotsOptions: {
                    color: 'black',
                    type: "rounded"
                },
                cornersSquareOptions: {
                    color: 'black',
                    type: 'extra-rounded'
                },
                cornersDotOptions: {
                    color: 'black',
                    type: 'dot'
                },
                qrOptions: {
                    typeNumber: 0,
                    mode: 'Byte',
                    errorCorrectionLevel: 'Q',
                },
                backgroundOptions: { color: '#FFFFFF' },
            });

            const qrData = await qrCode.getRawData("png");
            const arrayBuffer = await qrData.arrayBuffer();

            // This embeds the Qrcode as an image into the PDF file and places it accordingly.
            const qrImage = pdfDoc.embedPng(new Uint8Array(arrayBuffer));
            const page = pdfDoc.getPage(0);

            const NULL_COLOR = rgb(0.2665, 0.3143, 0.4191);
            // const BLUE_COLOR = rgb(0.184, 0.325, 0.792);

            const { width, height } = page;
            page.drawImage(qrImage, {
                x: (width - 70),
                y: (height - 70),
                width: 61,
                height: 61,
            });

            page.drawText("My Website!", {
                x: (width - 69),
                y: (height - 80),
                size: 10,
                color: NULL_COLOR,
                font: StandardFonts.HelveticaBold
            });

            // This saves the PDF and returns a blob representing the new PDF.
            const modifiedPdfBytes = await pdfDoc.save();
            newResumeBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
        }

        // If desired, this section removes all the links from my resume.
        if(options.removeLinks) {
            const existingPdfBytes = await newResumeBlob.arrayBuffer();
            const pdfDoc = await PDF.load(new Uint8Array(existingPdfBytes));
            const page = pdfDoc.getPage(0);

            page.removeAnnotations();
            const findT = page.findText("• LinkedIn • GitHub");

            if(findT.length > 0) {
                const newBgBox = findT[0].bbox;
                page.drawRectangle({
                    x: (newBgBox.x - 2),
                    y: (newBgBox.y - 1),
                    width: (newBgBox.width + 4),
                    height: (newBgBox.height + 2),
                    color: rgb(1, 1, 1)
                });
            }

            const modifiedPdfBytes = await pdfDoc.save();
            newResumeBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
        }

        qrcodeAdded.value = options.addQrcode;
        linksRemoved.value = options.removeLinks;

        if(options.updateQuery) { await setResumeQuery(); }
        return newResumeBlob;
    }
   
    return { blob, objectUrl, blobCreated, queryOutOfSync, qrcodeAdded, linksRemoved,
        mountResumePage, unmountResumePage, initBlob, deleteCurrentBlob, resetBlob, setResumeQuery
    }
});