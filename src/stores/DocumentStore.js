import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Fulton_Internship_Program_Appreciation_Certificate_Spring_2025 from "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";
import Create_Github_Repo from "/Create_Github_Repo.pdf";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCodeStyling from "qr-code-styling";

export const useDocumentStore = defineStore("document-store", () => {
    const router = useRouter();
    const fullScreenStore = useFullScreenStore();

    const mounted = ref(false);
    const docLoaded = ref(false);

    const customPdfWidth = ref(800);
    const customPdfHeight = ref(1100);
    const customPdfScaleFactor = ref(1.375);

    const customPdfMaxWidth = ref(800);
    const customPdfMinWidth = ref(320);

    /** @type {HTMLIFrameElement} This variable stores the iframe element used for printing a document. */
    var printIframe = null;
    const downloadingDocument = ref(false);
    const printingDocument = ref(false);
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

    /** @type {Ref<usePDFObject>} } */
    const resumePdfObj = ref(null);

    /** @type {Ref<usePDFObject>} } */
    const resumePdfWithQrcodeObj = ref(null);

    /** @type {Ref<usePDFObject>} } */
    const fultonInternshipAppreciationPdfObj = ref(null);

    /** @type {Ref<usePDFObject>} } */
    const createGithubRepoPdfObj = ref(null);

    const routePath = computed(() => { return router.currentRoute.value.path; });
    const onResumeRoute = computed(() => { return routePath.value.includes("/resume"); });
    const onFCSCertificateRoute = computed(() => { return routePath.value.includes(FCS_CERTIFICATE_ROUTE); });
    const onCreateGithubRepoRoute = computed(() => { return (routePath.value === "/create-github-repo" || routePath.value === "/create-github-repo/"); });

    const onMarkdownRoute = computed(() => { return (routePath.value.includes("markdown") || routePath.value.includes("md")); });
    const onResumeQrcodeRoute = computed(() => {
        return (routePath.value === "/resume/qr" ||
            routePath.value === "/resume/qrcode" ||
            routePath.value === "/resume/qrcode/" ||
            routePath.value === "/resume/qr/"
        );
    });

    const onDocumentRoute = computed(() => {
        return (onFCSCertificateRoute.value || onCreateGithubRepoRoute.value ||
            onResumeQrcodeRoute.value || onMarkdownRoute.value ||
            (routePath.value === "/resume") || (routePath.value === "/resume/")
        );
    })

    /**
     * This function downloads a document for the visitor to see.
     */
    async function downloadDoc() {
        downloadingDocument.value = true;
        const documentPdf = await getCurrentPDFObject();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(documentPdf.blob);
        link.download = (documentPdf.name + ".pdf");
    
        link.click();
        link.remove();
        downloadingDocument.value = false;
    }

    /**
     * This function opens the browser's print doucment so the user can print a document.
     */
    async function printDoc() {
        if(printIframe != null) { document.body.removeChild(printIframe); }
        printIframe = null;

        printingDocument.value = true;
        const documentPdf = await getCurrentPDFObject();

        printIframe = document.createElement("iframe");
        const url = URL.createObjectURL(documentPdf.blob);

        printIframe.style.position = "absolute";
        printIframe.style.width = "0";
        printIframe.style.height = "0";
        printIframe.style.border = "none";
        printIframe.src = url;

        document.body.append(printIframe);
        printIframe.onload = () => {
            const win = printIframe.contentWindow;
            win.focus();
            win.print();
            printingDocument.value = false;
        }
    }

    /**
     * This function shares the document with someone using the OS's built in share popup.
     */
    async function shareDoc() {
        sharingDocument.value = true;
        const documentPdf = await getCurrentPDFObject();

        useWebsiteDataStore().shareFile(new File([documentPdf.blob], (documentPdf.name + '.pdf'), { type: 'application/pdf' }));
        sharingDocument.value = false;
    }

    /**
     * This function returns the PDF Object the website is currently using.
     */
    async function getCurrentPDFObject() {
        if(onResumeQrcodeRoute.value) {
            return { obj: resumePdfWithQrcodeObj.value, blob: qrcodeResume.value, name: "Mohit_Jain_Resume_With_QR_Code" }
        } else if(onResumeRoute.value) {
            const obj = resumePdfObj.value;
            const docData = await obj.pdf.getData();
            const blob = new Blob([docData], { type: 'application/pdf' });

            return { obj, blob, name: "Mohit_Jain_Resume" }
        } else if(onFCSCertificateRoute.value) {
            const obj = fultonInternshipAppreciationPdfObj.value;
            const docData = await obj.pdf.getData();
            const blob = new Blob([docData], { type: 'application/pdf' });

            return { obj, blob, name: "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025" }
        } else if(onCreateGithubRepoRoute.value) {
            const obj = createGithubRepoPdfObj.value;
            const docData = await obj.pdf.getData();
            const blob = new Blob([docData], { type: 'application/pdf' });

            return { obj, blob, name: "Create_Github_Repo" }
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
                createGithubRepoPdfObj.value = result.usePDF(Create_Github_Repo);
                fultonInternshipAppreciationPdfObj.value = result.usePDF(Fulton_Internship_Program_Appreciation_Certificate_Spring_2025);
                mounted.value = true;
            });
        });
    }

    /**
     * This function mounts a page that hosts a document.
     */
    function mountDocumentPage() {
        initWebData();
        if(onMarkdownRoute.value) { return; }
        nextTick(() => { mountCustomDocumentPage(800, 320, (onFCSCertificateRoute ? 0.79875 : 1.375)); })
    }

    /**
     * This function unmounts a page that hosts a document.
     */
    function unmountDocumentPage() {
        document.body.style.overflowY = "";
        docLoaded.value = false;
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
     * This sets a boolean to indicate that the document is loaded on the screen. Also handles the automatic scroll to a page.
     */
    function setDocLoaded() {
        docLoaded.value = true;
        const hashStr = router.currentRoute.value.hash.substring(1);
        if(hashStr === "") { return; }

        try {
            goToPageSection(hashStr, ((hashStr === "footer") ? 0 : -70));
        } catch(e) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }

    /**
     * This function is triggered whenever someone clicks on a link on the custom PDF.
     */
    function onAnnotationClick(event = { type: "link", data: { url: "", unsafeUrl: "" } }) {
        const url = event.data.url;
        if(url === PERSONAL_WEBSITE_LINK) {
            router.push("/");
        } else {
            window.open(url, "_blank");
        }
    }

    return { mounted, docLoaded, sharingDocument, downloadingDocument, printingDocument, qrcodeResumeUrl,
        customPdfWidth, customPdfHeight, customPdfMaxWidth, customPdfMinWidth,
        pdfComponent, resumePdfObj, resumePdfWithQrcodeObj, fultonInternshipAppreciationPdfObj, createGithubRepoPdfObj,
        onDocumentRoute, onResumeRoute, onMarkdownRoute, onResumeQrcodeRoute, onCreateGithubRepoRoute, onFCSCertificateRoute,
        downloadDoc, printDoc, shareDoc, toggleDocumentFullScreen, setPdfSize,
        mountDocumentStore, mountDocumentPage, unmountDocumentPage, setDocLoaded, onAnnotationClick
    }
});

/**
 * This function creates and returns a document using pdf-lib where my resume has a QR Code embedded on its top right.
 */
async function createQrcodeResume() {
    try {
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
    } catch(e) {
        return new Blob([new Uint8Array(), { type: "application/pdf" }]);
    }
}