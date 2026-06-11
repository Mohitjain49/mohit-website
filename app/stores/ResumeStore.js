import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import { PDF, StandardFonts, rgb } from "@libpdf/core";
import QRCodeStyling from "qr-code-styling";

/** This pinia store is used to customize my resume. */
export const useResumeStore = defineStore("resume-store", () => {
    const documentStore = useDocumentStore();
    const blobCreated = ref(0);

    const qrcodeAdded = ref(false);
    const linksRemoved = ref(false);
    const fontFlattened = ref(false);

    /** @type {import('vue').ShallowRef<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = shallowRef(null);
    const objectUrl = shallowRef("");

    /**
     * This function initializes a blob and its object url for my resume.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.flattenFont If true, this turns all text to black.
     */
    async function initBlob(options) {
        if(blobCreated.value != 0) { return; }
        blobCreated.value = 1;

        blob.value = await createNewBlob(options);
        objectUrl.value = URL.createObjectURL(blob.value);

        documentStore.hostedDocuments[0].setNewBlob(blob.value);
        const newLink = ((qrcodeAdded.value || linksRemoved.value || fontFlattened.value) ? objectUrl.value : PERSONAL_RESUME_LINK);
        documentStore.hostedDocuments[0].changeLink(newLink);

        await sleep(5);
        blobCreated.value = 2;
    }

    /** This functio deletes the current blob and object URL for my resume. */
    function deleteCurrentBlob() {
        if(blobCreated.value != 2) { return; }
        blobCreated.value = 1.1;

        blob.value = null;
        documentStore.hostedDocuments[0].deleteBlob();
        objectUrl.value = "";
        blobCreated.value = 0;
    }

    /**
     * This function resets the resume blob.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.flattenFont If true, this turns all text to black.
     */
    async function resetBlob(options) {
        deleteCurrentBlob();
        documentStore.unmountDocumentPage();

        await sleep(100);
        await initBlob(options);
        documentStore.mountCustomDocumentPage(800, 320, 1.375);
    }

    /**
     * This function creates a new blob for the resume to be rendered into.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.flattenFont If true, this turns all text to black.
     * @returns The blob of the new resume.
     */
    async function createNewBlob(options = {}) {
        if(options?.addQrcode == undefined) { options.addQrcode = false; }
        if(options?.removeLinks == undefined) { options.removeLinks = false; }
        if(options?.flattenFont == undefined) { options.flattenFont = false; }
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
                width: 60,
                height: 60,
            });

            page.drawText("My Website!", {
                x: (width - 70),
                y: (height - 82),
                size: 10,
                color: NULL_COLOR,
                font: StandardFonts.HelveticaBold
            });

            // This saves the PDF and returns a blob representing the new PDF.
            const modifiedPdfBytes = await pdfDoc.save();
            newResumeBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
        }

        if(options.removeLinks) {
            // If desired, this section removes all the links from my resume.
        }

        if(options.flattenFont) {
            // If desired, this section flatten the fonts to black for the entire resume.
        }

        qrcodeAdded.value = options.addQrcode;
        linksRemoved.value = options.removeLinks;
        fontFlattened.value = options.flattenFont;
        return newResumeBlob;
    }
   
    return { blob, objectUrl, blobCreated, qrcodeAdded, linksRemoved, fontFlattened,
        initBlob, deleteCurrentBlob, resetBlob
    }
});