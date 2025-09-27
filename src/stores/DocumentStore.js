import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Fulton_Internship_Program_Appreciation_Certificate_Spring_2025 from "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCodeStyling from "qr-code-styling";

export const QRCODE_RESUME_PATH = { path: "/resume/qrcode" }
export const useDocumentStore = defineStore("document-store", () => {
    const router = useRouter();
    const mounted = ref(false);
    const fullScreenStore = useFullScreenStore();

    const customPdfWidth = ref(800);
    const customPdfHeight = ref(1100);
    const customPdfScaleFactor = ref(1.375);

    const customPdfMaxWidth = ref(800);
    const customPdfMinWidth = ref(320);

    const downloadingDocument = ref(false);
    const sharingDocument = ref(false);

    /**
     * @type {ShallowRef<Component>} The VuePDF component dynamically imported for the website.
     */
    const pdfComponent = shallowRef(null);

    /**
     * @type {Ref<Blob>} My resume with a Qr Code at the top right.
     */
    const qrcodeResume = ref(null);
    const qrcodeResumeUrl = useObjectUrl(qrcodeResume);

    /** @type {Ref<import('@types/PDFObject').usePDFObject>} } */
    const resumePdfObj = ref(null);

    /** @type {Ref<import('@types/PDFObject').usePDFObject>} } */
    const resumePdfWithQrcodeObj = ref(null);

    /** @type {Ref<import('@types/PDFObject').usePDFObject>} } */
    const fultonInternshipAppreciationPdfObj = ref(null);

    const routePath = computed(() => { return router.currentRoute.value.path; });
    const onResumeRoute = computed(() => { return routePath.value.includes("/resume"); });
    const onFCSCertificateRoute = computed(() => { return routePath.value.includes(FCS_CERTIFICATE_ROUTE); });

    const onMarkdownRoute = computed(() => { return (routePath.value.includes("markdown") || routePath.value.includes("md")); });
    const onResumeQrcodeRoute = computed(() => {
        return (routePath.value === "/resume/qr" ||
            routePath.value === "/resume/qrcode" ||
            routePath.value === "/resume/qrcode/" ||
            routePath.value === "/resume/qr/"
        );
    });

    /**
     * This function downloads a document for the visitor to see.
     */
    async function downloadDoc() {
        downloadingDocument.value = true;
        const documentPdf = getCurrentPDFObject();

        const docData = await documentPdf.obj.pdf.getData()
        const blob = new Blob([docData], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = (documentPdf.name + ".pdf");
    
        link.click();
        link.remove();
        downloadingDocument.value = false;
    }

    /**
     * This function opens the browser's print doucment for the visitor.
     */
    function printDoc() {
        const documentPdf = getCurrentPDFObject();
        documentPdf.obj.print(250, (documentPdf.name + ".pdf"));
    }

    /**
     * This function shares the document with someone using the OS's built in share popup.
     */
    async function shareDoc() {
        sharingDocument.value = true;
        const documentPdf = getCurrentPDFObject();

        const docData = await documentPdf.obj.pdf.getData();
        const blob = new Blob([docData], { type: 'application/pdf' });

        useWebsiteDataStore().shareFile(new File([blob], (documentPdf.name + '.pdf'), { type: 'application/pdf' }));
        sharingDocument.value = false;
    }

    /**
     * This function returns the PDF Object the website is currently using.
     */
    function getCurrentPDFObject() {
        if(onResumeQrcodeRoute.value) {
            return { obj: resumePdfWithQrcodeObj.value, name: "Mohit_Jain_Resume_With_QR_Code" }
        } else if(onResumeRoute.value) {
            return { obj: resumePdfObj.value, name: "Mohit_Jain_Resume" }
        } else if(onFCSCertificateRoute.value) {
            return { obj: fultonInternshipAppreciationPdfObj.value, name: "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025" }
        } else {
            throw new Error("No document is currently in use.");
        }
    }

    /**
     * This function mounts the document store for the website.
     */
    function mountDocumentStore() {
        nextTick(() => {
            import('@tato30/vue-pdf').then(async (result) => {
                qrcodeResume.value = await createQrcodeResume();
                const qrcodeResumeArrayBuffer = await qrcodeResume.value.arrayBuffer();
                pdfComponent.value = result.VuePDF;

                resumePdfObj.value = result.usePDF(Mohit_Jain_Resume);
                resumePdfWithQrcodeObj.value = result.usePDF(qrcodeResumeArrayBuffer);
                fultonInternshipAppreciationPdfObj.value = result.usePDF(Fulton_Internship_Program_Appreciation_Certificate_Spring_2025);
                mounted.value = true;
            });
        })
    }

    /**
     * This function mounts a page that hosts a document.
     */
    function mountDocumentPage() {
        initWebData();
        if(onMarkdownRoute.value) { return; }
        nextTick(() => { mountCustomDocumentPage(800, 320, (onResumeRoute ? 1.375 : 0.79875)); })
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

    return { mounted, sharingDocument, downloadingDocument, qrcodeResumeUrl,
        customPdfWidth, customPdfHeight, customPdfMaxWidth, customPdfMinWidth,
        pdfComponent, resumePdfObj, resumePdfWithQrcodeObj, fultonInternshipAppreciationPdfObj,
        onResumeRoute, onMarkdownRoute, onResumeQrcodeRoute, onFCSCertificateRoute,
        downloadDoc, printDoc, shareDoc, toggleDocumentFullScreen, setPdfSize,
        mountDocumentStore, mountDocumentPage, unmountDocumentPage,
    }
});

/**
 * This function creates and returns a document using pdf-lib where my resume has a QR Code embedded on its top right.
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