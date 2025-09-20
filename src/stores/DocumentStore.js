import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Fulton_Internship_Program_Appreciation_Certificate_Spring_2025 from "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCodeStyling from "qr-code-styling";

export const useDocumentStore = defineStore("document-store", () => {
    const route = useRoute();
    const fullScreenStore = useFullScreenStore();

    const customPdfWidth = ref(800);
    const customPdfHeight = ref(1100);
    const customPdfScaleFactor = ref(1.375);

    const customPdfMaxWidth = ref(800);
    const customPdfMinWidth = ref(320);

    /**
     * @type {import('vue').ShallowRef<import('vue').Component>} The VuePDF component dynamically imported for the website.
     */
    const pdfComponent = shallowRef(null);

    /**
     * @type {import('vue').Ref<Blob>} My resume with a Qr Code at the top right.
     */
    const qrcodeResume = ref(null);

    const resumePdfObj = ref(null);
    const resumePDFWithQrcodeObj = ref(null);
    const fultonInternshipAppreciationPdfObj = ref(null);
    const sharingDocument = ref(false);

    /**
     * This function downloads a document for the visitor to see.
     */
    function downloadDoc() {
        const docIndex = (checkResumeRoute() ? 0 : 1);
        const DOCUMENTS = [Mohit_Jain_Resume, Fulton_Internship_Program_Appreciation_Certificate_Spring_2025];
        const DOCUMENT_NAMES = ["Mohit_Jain_Resume", "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"];
    
        const link = document.createElement('a');
        link.href = DOCUMENTS[docIndex];
        link.download = (DOCUMENT_NAMES[docIndex] + '.pdf');
    
        link.click();
        link.remove();
    }

    /**
     * This function downloads the resume with the QR Code.
     */
    function downloadQrcodeResume() {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(qrcodeResume.value);
        link.download = "Mohit_Jain_Resume_With_QR_Code.pdf";
        link.click();
        URL.revokeObjectURL(link.href);
    }

    /**
     * This function opens the browser's print doucment for the visitor.
     */
    function printDoc() {
        const win = window.open(checkResumeRoute() ? Mohit_Jain_Resume : Fulton_Internship_Program_Appreciation_Certificate_Spring_2025);
        win.addEventListener("load", () => { win.print(); });
    }

    /**
     * This function shares the document with someone using the OS's built in share popup.
     */
    async function shareDoc() {
        sharingDocument.value = true;
        const docIndex = (checkResumeRoute() ? 0 : 1);

        const DOCUMENTS = [Mohit_Jain_Resume, Fulton_Internship_Program_Appreciation_Certificate_Spring_2025];
        const DOCUMENT_NAMES = ["Mohit_Jain_Resume", "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"];

        const foundDoc = await fetch(DOCUMENTS[docIndex]);
        const blob = await foundDoc.blob();

        useWebsiteDataStore().shareFile(new File([blob], (DOCUMENT_NAMES[docIndex] + '.pdf'), { type: 'application/pdf' }));
        sharingDocument.value = false;
    }

    /**
     * This function mounts the document store for the website.
     */
    function mountDocumentStore() {
        nextTick(() => {
            import('@tato30/vue-pdf').then(async (result) => {
                qrcodeResume.value = await createQrcodeResume();
                pdfComponent.value = result.VuePDF;

                resumePdfObj.value = result.usePDF(Mohit_Jain_Resume).pdf;
                resumePDFWithQrcodeObj.value = result.usePDF(qrcodeResume.value).pdf;
                fultonInternshipAppreciationPdfObj.value = result.usePDF(Fulton_Internship_Program_Appreciation_Certificate_Spring_2025).pdf;
            });
        })
    }

    /**
     * This function mounts a page that hosts a document.
     */
    function mountDocumentPage() {
        initWebData();
        if(checkMarkdownRoute()) { return; }
        nextTick(() => { mountCustomDocumentPage(800, 320, (checkResumeRoute() ? 1.375 : 0.79875)); })
    }

    /**
     * This function unmounts a page that hosts a document.
     */
    function unmountDocumentPage() {
        document.body.style.overflowY = "";
        fullScreenStore.exitFullScreen();
        window.removeEventListener("resize", setPdfSize);
    }

    /**
     * This mounts the custom document page for the 
     * @param {Number} minWidth The Minimum width for the custom pdf.
     * @param {Number} maxWidth The Maximum width for the custom pdf.
     * @param {Number} scaleFactor the scale factor to get height pixels.
     */
    function mountCustomDocumentPage(maxWidth = 800, minWidth = 320, scaleFactor = 1.375) {
        customPdfMaxWidth.value = maxWidth;
        customPdfMinWidth.value = minWidth;
        customPdfScaleFactor.value = scaleFactor;

        setPdfSize();
        window.addEventListener("resize", setPdfSize);
    }
    /**
     * Based on the current width, height, scale factor, and viewport, this function sets the size of the pdf.
     */
    function setPdfSize() {
        customPdfWidth.value = Math.min(customPdfMaxWidth.value, Math.max(customPdfMinWidth.value, (window.innerWidth - 30)));
        customPdfHeight.value = (customPdfWidth.value * customPdfScaleFactor.value);
    }

    /**
     * This function sets the full screen for the "resume-container" element.
     */
    function toggleDocumentFullScreen() {
        fullScreenStore.setFullScreen(document.getElementById("resume-container"));
        useWebsiteDataStore().closeNavMenu();
    }

    /**
     * This function returns true if the user is looking at any resume page on the website.
     */
    function checkResumeRoute() {
        return route.path.includes("resume");
    }

    /**
     * This function returns true if the user is looking at any certificate page on the website.
     */
    function checkFCSCertificateRoute() {
        return route.path.includes(FCS_CERTIFICATE_ROUTE);
    }
    /**
     * This function returns when the route is using a markdown file.
     */
    function checkMarkdownRoute() {
        return (route.path.includes('markdown') || route.path.includes('md'));
    }

    return { customPdfWidth, customPdfHeight, customPdfMaxWidth, customPdfMinWidth, sharingDocument,
        pdfComponent, resumePdfObj, resumePDFWithQrcodeObj, fultonInternshipAppreciationPdfObj,
        downloadDoc, printDoc, shareDoc, toggleDocumentFullScreen, setPdfSize, downloadQrcodeResume,
        mountDocumentStore, mountDocumentPage, unmountDocumentPage,
        checkResumeRoute, checkFCSCertificateRoute, checkMarkdownRoute
    }
});

/**
 * This function creates a document using pdf-lib where my resume has a QR Code embedded on its top right.
 */
async function createQrcodeResume() {
    // This fetches and loads the PDF file.
    const existingPdfBytes = await fetch(Mohit_Jain_Resume).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // This generates the QR Code and makes into a usuable image for pdf-lib.
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
    const qrImage = await pdfDoc.embedPng(arrayBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.getPage(0);

    const NULL_COLOR = rgb(0.2665, 0.3143, 0.4191);
    const BLUE_COLOR = rgb(0.184, 0.325, 0.792);

    const { width, height } = page.getSize();
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
        font
    });

    // This saves the PDF and returns a blob representing the new PDF.
    const modifiedPdfBytes = await pdfDoc.save();
    return new Blob([modifiedPdfBytes], { type: "application/pdf" });
}