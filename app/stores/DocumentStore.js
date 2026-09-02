import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper from "/Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper.pdf"
import Create_Github_Repo from "/Create_Github_Repo.pdf";

import { ofetch } from 'ofetch';
import workerSrcUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Bowser from "bowser";
import prettyBytes from "pretty-bytes";

const GOOGLE_CLOUD_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLOUD_CLIENT_ID;
const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
const GOOGLE_CLOUD_APP_ID = import.meta.env.VITE_GOOGLE_CLOUD_APP_ID;

const PDF_MIME_TYPE = "application/pdf";
const POSSIBLE_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif"];

export const DOCUMENT_ACTION_STATUS_ICONS = ["", "fa-spinner", "fa-check", "fa-ban", "fa-hourglass-end"];
export const DOCUMENT_ACTION_PENDING = 1;
export const DOCUMENT_RENDER_TASK_PARTITION_SIZE = 10;

export const DEFAULT_PDF_MAX_WIDTH = 850;
export const DEFAULT_PDF_MIN_WIDTH = 320;
export const PDF_LETTER_SCALE = 1.295;
export const PDF_CERTIFICATE_SCALE = 0.79875;

/** This store manages multiple files and documents (not to be confused with the Document Object Model) that I showcase on my website. */
export const useDocumentStore = defineStore("document-store", () => {
    const PDF_WIDTH_CSS_PROPERTY = "--mohit-custom-pdf-width";
    const PDF_HEIGHT_CSS_PROPERTY = "--mohit-custom-pdf-height";

    /** These are the hosted documents used to set the document pages. */
    const hostedDocuments = [
        useHostedDocument("/resume", Mohit_Jain_Resume, "Mohit_Jain_Resume", ".pdf", PERSONAL_RESUME_LINK, false, true),
        useHostedDocument("/create-github-repo", Create_Github_Repo, "Create_Github_Repo", ".pdf", CREATE_GITHUB_REPO_DOC_LINK, false, false),
        useHostedDocument(GEN_AI_APPLICATIONS_PAPER_ROUTE, Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper,
            "Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper", ".pdf", GEN_AI_APPLICATIONS_PAPER_LINK, false, false
        )
    ];

    const router = useRouter();
    const webData = useWebsiteDataStore();
    const resumeStore = useResumeStore();
    const styleStore = useStyleStore();
    const fullScreenStore = useFullScreenStore();
    const windowSize = useMohitWindowSize();

    const SCRIPT_TAG_OPTIONS = { async: true, defer: true, immediate: false, manual: true }
    const googleAccountsTag = useScriptTag("https://accounts.google.com/gsi/client", (el) => { initGoogleTokenClient(); }, SCRIPT_TAG_OPTIONS);
    const googleApiTag = useScriptTag("https://apis.google.com/js/api.js", (el) => { initGooglePickerAPI(); }, SCRIPT_TAG_OPTIONS);

    /** @type {AbortController} This abort controller manages the event listeners fired when the page resizes. */
    var pdfDimensionsController = null;
    var googleTokenClient = { requestAccessToken: () => {} };
    var googleAPIAccessToken = "";

    const googleDriveOptAvailable = ref(0);
    const googleDriveUploadSupported = ref(false);
    const googleDrivePickerAPILoaded = ref(false);
    const googleDriveOptionAvailable = computed(() => { return (googleDriveOptAvailable.value >= 0); });

    /**
     * @type {import('vue').ShallowRef<Array<String>>}
     * An array of the object URLs for the images representing the rendered PDF used by the PDF navigation menu.
     */
    const docImageUrls = shallowRef([]);

    /**
     * @type {import('vue').ShallowRef<Array<String>>}
     * An array of the object URLs for the images representing the rendered PDF used by the custom print functionality.
     */
    const docPrintImageUrls = shallowRef([]);

    const docLoaded = ref({ status: false, totalPages: 0, loadedPages: 0 });
    const currentObservedPage = ref(-1);
    const contextMenuPageNumber = ref(0);

    const workerSrcAdded = ref(false);
    const fsStateChanging = ref(false);
    const windowSizeWatchersEnabled = ref(false);
    const browserPdfViewerPresent = ref(false);
    const copyDocumentSupported = ref(false);
    const iframeSupported = ref(false);
    const confirmedImageTypes = ref(["image/png"]);

    const customPdfWidth = ref(DEFAULT_PDF_MAX_WIDTH);
    const customPdfMaxWidth = ref(DEFAULT_PDF_MAX_WIDTH);
    const customPdfMinWidth = ref(DEFAULT_PDF_MIN_WIDTH);
    const customPdfHeight = ref(1035);
    const customPdfScaleFactor = ref(1.295);

    /** @type {HTMLIFrameElement} This variable stores the iframe element used for printing a document. */
    var printIframe = null;
    var chooseGoogleDriveFolderForUpload = false;

    const documentDownloadStatus = ref(0);
    const documentSaveStatus = ref(0);
    const documentPrintStatus = ref(0);
    const documentCustomPrintStatus = ref(0);
    const documentShareStatus = ref(0);
    const documentCopyStatus = ref(0);

    const documentUploadToGoogleDriveStatus = ref(0);
    const documentUploadToGoogleDriveCanceled = ref(false);

    const routePath = computed(() => { return router.currentRoute.value.path; });
    const onMarkdownRoute = computed(() => { return (routePath.value.includes("markdown")); });
    const onDocumentRoute = computed(() => { return (-1 != currentDocumentRoute.value); });

    const currentDocumentRoute = computed(() => { return hostedDocuments.findIndex((item) => { return item.checkPath(routePath.value) }); });
    const currentDocumentBlobCreated = computed(() => { return (onDocumentRoute.value ? hostedDocuments[currentDocumentRoute.value].blobCreated.value : false); });
    const currentDocumentFileSize = computed(() => { return (onDocumentRoute.value ? hostedDocuments[currentDocumentRoute.value].fileSize.value : ""); });
    const documentLink = computed(() => { return (onDocumentRoute.value ? hostedDocuments[currentDocumentRoute.value].link.value : ""); });

    const onResumeRoute = computed(() => { return hostedDocuments[0].onRoute.value; });
    const onCreateGithubRepoRoute = computed(() => { return hostedDocuments[1].onRoute.value; });
    const onResearchPaperRoute = computed(() => { return hostedDocuments[2].onRoute.value; });
    const onMainResumeRoute = computed(() => { return (onResumeRoute.value && !onMarkdownRoute.value); });

    const documentDownloadTitle = computed(() => { return ("Download Document (" + currentDocumentFileSize.value + ")"); });
    const showPdfPageNav = computed(() => {
        return (!onMarkdownRoute.value && docLoaded.value.status && (docLoaded.value.totalPages > 1) && (docImageUrls.value.length > 0));
    });

    const downloadIcon = computed(() => {
        const downloadInt = documentDownloadStatus.value;
        return ((downloadInt == 0) ? 'fa-file-download' : DOCUMENT_ACTION_STATUS_ICONS[downloadInt]);
    });
    const saveDocIcon = computed(() => {
        const saveInt = documentSaveStatus.value;
        return ((saveInt == 0) ? 'fa-floppy-disk' : DOCUMENT_ACTION_STATUS_ICONS[saveInt]);
    });
    const printIcon = computed(() => {
        const printInt = documentPrintStatus.value;
        return ((printInt == 0) ? "fa-print" : DOCUMENT_ACTION_STATUS_ICONS[printInt]);
    });
    const customPrintIcon = computed(() => {
        const customPrintInt = documentCustomPrintStatus.value;
        return ((customPrintInt == 0) ? "fa-film" : DOCUMENT_ACTION_STATUS_ICONS[customPrintInt]);
    });
    const shareIcon = computed(() => {
        const shareInt = documentShareStatus.value;
        return ((shareInt == 0) ? "fa-share" : DOCUMENT_ACTION_STATUS_ICONS[shareInt]);
    });
    const copyIcon = computed(() => {
        const copyInt = documentCopyStatus.value;
        return ((copyInt == 0) ? "fa-copy" : DOCUMENT_ACTION_STATUS_ICONS[copyInt]);
    });
    const uploadToGoogleDriveIcon = computed(() => {
        const uploadInt = documentUploadToGoogleDriveStatus.value;
        const uploadPending = uploadToGoogleDrivePending.value;
        
        if(uploadPending) { return DOCUMENT_ACTION_STATUS_ICONS[DOCUMENT_ACTION_PENDING]; }
        return ((uploadInt == 0) ? "fa-brands fa-google-drive" : DOCUMENT_ACTION_STATUS_ICONS[uploadInt]);
    });

    const downloadPending = computed(() => { return (documentDownloadStatus.value == DOCUMENT_ACTION_PENDING); });
    const savePending = computed(() => { return (documentSaveStatus.value == DOCUMENT_ACTION_PENDING); });
    const printPending = computed(() => { return (documentPrintStatus.value == DOCUMENT_ACTION_PENDING); });
    const customPrintPending = computed(() => { return (documentCustomPrintStatus.value == DOCUMENT_ACTION_PENDING); });
    const sharePending = computed(() => { return (documentShareStatus.value == DOCUMENT_ACTION_PENDING); });
    const copyPending = computed(() => { return (documentCopyStatus.value == DOCUMENT_ACTION_PENDING); });

    const printInProgress = computed(() => { return (documentPrintStatus.value > 0 || documentCustomPrintStatus.value > 0); });
    const uploadToGoogleDrivePending = computed(() => {
        return (documentUploadToGoogleDriveStatus.value == DOCUMENT_ACTION_PENDING || googleDriveOptAvailable.value == DOCUMENT_ACTION_PENDING);
    });

    /**
     * ---------------------------------------------------------------------------
     * These functions are for fetching and exporting files present on my website.
     * ---------------------------------------------------------------------------
     */

    /** This function downloads a document for the visitor to see. */
    async function downloadDoc() {
        if(documentDownloadStatus.value != 0) { return; }
        documentDownloadStatus.value = 1;

        try {
            const documentFile = getCurrentPDFObject();
            if(!documentFile) { throw new Error("Document Does Not Exist."); }
            const link = document.createElement('a');

            link.href = documentFile.url;
            link.download = (documentFile.name + documentFile.suffix);
        
            link.click();
            link.remove();
            documentDownloadStatus.value = 2;
        } catch(e) {
            documentDownloadStatus.value = 3;
        } finally {
            setTimeout(() => { documentDownloadStatus.value = 0; }, 3000);
        }
    }

    /** This function opens a "Save File Picker" so the user can save my document at their preferred location. */
    async function saveDoc() {
        if(!webData.saveAsSupported || documentSaveStatus.value != 0) { return; }
        documentSaveStatus.value = 1;

        try {
            const documentFile = getCurrentPDFObject();
            if(!documentFile) { throw new Error("Document Does Not Exist."); }

            const saveHandle = await window.showSaveFilePicker({
                suggestedName: documentFile.name,
                types: [{ description: "PDF Document", accept: { 'application/pdf': ['.pdf'] } }]
            });

            const writable = await saveHandle.createWritable();
            await writable.write(documentFile.blob);
            await writable.close();

            // Sets the action as completed.
            documentSaveStatus.value = 2;
        } catch(err) {
            documentSaveStatus.value = 3;
        } finally {
            setTimeout(() => { documentSaveStatus.value = 0; }, 3000);
        }
    }

    /**
     * This function opens the browser's print popup so the user can print a document.
     * @param {Boolean} customPrint If true, this function forces the website to render the PDF into images instead of using the PDF Viewer.
     */
    async function printDoc(customPrint = false) {
        if(!iframeSupported.value || documentPrintStatus.value != 0 || documentCustomPrintStatus.value != 0) { return; }
        const customPrintRequired = !browserPdfViewerPresent.value;

        if(customPrintRequired) {
            documentPrintStatus.value = 1;
            documentCustomPrintStatus.value = 1;
        } else if(customPrint) {
            documentCustomPrintStatus.value = 1;
        } else {
            documentPrintStatus.value = 1;
        }

        const PRINT_IFRAME_ID = "mohit-doc-customPrint";
        const PRINT_IFRAME_IMG_CLASS = "mohit-doc-customPrint-img";
        const TEMP_IMG_WIDTH = 850;

        try {
            const documentFile = getCurrentPDFObject();
            if(!documentFile) { throw new Error("Document Does Not Exist."); }

            if(printIframe != null) { document.body.removeChild(printIframe); }
            printIframe = document.createElement("iframe");
            printIframe.id = PRINT_IFRAME_ID;
            printIframe.classList.add(PRINT_IFRAME_ID);

            if(browserPdfViewerPresent.value && !customPrint) {
                printIframe.src = documentFile.url;
                document.body.append(printIframe);

                await new Promise(async (resolve, reject) => {
                    const tempIframeDocument = (printIframe.contentDocument || printIframe.contentWindow?.document);
                    if(tempIframeDocument && tempIframeDocument.readyState === "complete") {
                        resolve("IFrame Loaded");
                    } else {
                        printIframe.onload = () => { resolve("IFrame Loaded"); }
                        sleep(7000).then(() => { reject(new Error("Timeout Error")); });
                    }
                });
            } else {
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

                // Renders the images for printing if they are not rendered already.
                if(docPrintImageUrls.value.length <= 0) {
                    docPrintImageUrls.value = await renderPdfAsPng(documentFile.url, TEMP_IMG_WIDTH);
                }

                const imagesForPrint = docPrintImageUrls.value;
                const numImages = imagesForPrint.length;
                const imgScaleFactor = hostedDocuments[currentDocumentRoute.value].metadata.pageHeightToWidthRatio.value;

                const printIframeDocument = (printIframe.contentDocument || printIframe.contentWindow.document);
                const iframeStyle = printIframeDocument.createElement("style");

                // The style rule here should match the one at the bottom for this same class.
                iframeStyle.textContent = `
                    .mohit-doc-customPrint-img {
                        width: 99vw;
                        height: 99vh;
                        max-height: 100vh;
                        margin: 0px;
                        padding: 0px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .mohit-doc-customPrint-img img {
                        width: 100%;
                        height: 100%;
                        margin: 0px;
                        padding: 0px;
                    }

                    @media print {
                        @page { margin: 0px; }
                    }
                `;

                // Adds styles to the iframe.
                printIframeDocument.body.appendChild(iframeStyle);

                for(let i = 0; i < numImages; i++) {
                    const newChild = printIframeDocument.createElement("div");
                    const newChildImg = printIframeDocument.createElement("img");

                    newChild.classList.add(PRINT_IFRAME_IMG_CLASS);
                    newChildImg.src = imagesForPrint[i];

                    newChildImg.width = TEMP_IMG_WIDTH;
                    newChildImg.height = (TEMP_IMG_WIDTH * imgScaleFactor);
                    newChildImg.draggable = false;

                    printIframeDocument.body.appendChild(newChild);
                    await new Promise((resolve, reject) => { requestAnimationFrame(() => { requestAnimationFrame(() => { resolve(); }); }); });

                    newChild.appendChild(newChildImg);
                    await new Promise((resolve, reject) => {
                        if(newChildImg.complete) {
                            resolve();
                        } else {
                            newChildImg.onload = () => { resolve(); }
                            sleep(7000).then(() => { reject(new Error("Timeout Error")); });
                        }
                    });
                }
            }

            // This triggers the print function at the end to open the popup.
            const printIframeWin = printIframe.contentWindow;
            printIframeWin.focus();
            printIframeWin.print();
            
            if(customPrintRequired) {
                documentPrintStatus.value = 2;
                documentCustomPrintStatus.value = 2;
            } else if(customPrint) {
                documentCustomPrintStatus.value = 2;
            } else {
                documentPrintStatus.value = 2;
            }
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
            const errorNum = ((e.message === "Timeout Error") ? 4 : 3);

            if(customPrintRequired) {
                documentPrintStatus.value = errorNum;
                documentCustomPrintStatus.value = errorNum;
            } else if(customPrint) {
                documentCustomPrintStatus.value = errorNum;
            } else {
                documentPrintStatus.value = errorNum;
            }
        } finally {
            setTimeout(() => {
                documentPrintStatus.value = 0;
                documentCustomPrintStatus.value = 0;
            }, 3000);
        }
    }

    /** This function shares the document with someone using the OS's built in share popup. */
    async function shareDoc() {
        if(documentShareStatus.value != 0) { return; }
        documentShareStatus.value = 1;

        try {
            const documentFile = getCurrentPDFObject();
            if(!documentFile) { throw new Error("Document Does Not Exist."); }

            await webData.shareFile(new File([documentFile.blob], (documentFile.name + documentFile.suffix), { type: 'application/pdf' }));
            documentShareStatus.value = 2;
        } catch(e) {
            documentShareStatus.value = 3;
        } finally {
            setTimeout(() => { documentShareStatus.value = 0; }, 3000);
        }
    }

    /** This function copies the document into the visitor's OS Clipboard. */
    async function copyDoc() {
        if(documentCopyStatus.value != 0) { return; }
        documentCopyStatus.value = 1;

        try {
            const documentFile = getCurrentPDFObject();
            if(!documentFile) { throw new Error("Document Does Not Exist."); }

            await navigator.clipboard.write([new ClipboardItem({ [documentFile.blob.type]: documentFile.blob })]);
            documentCopyStatus.value = 2;
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
            documentCopyStatus.value = 3;
        } finally {
            setTimeout(() => { documentCopyStatus.value = 0; }, 3000);
        }
    }

    /**
     * This function should run every time the user presses a key on their keyboard while on a Hosted Document Page.
     * @param {KeyboardEvent} event The Keyboard Event.
     */
    function onHostedDocumentPageKeydown(event = undefined) {
        try {
            if(!event || webData.showSharePopup || !currentDocumentBlobCreated.value) { return; }
            if(!event.ctrlKey || event.repeat) { return; }
            const keyLetter = event.key.toLowerCase();

            if(keyLetter === "p") {
                event.preventDefault();
                webData.setMenuOpen(DOCUMENT_MENU, false);
                printDoc(event.altKey);
            } else if(keyLetter === "s") {
                event.preventDefault();
                webData.setMenuOpen(DOCUMENT_MENU, false);

                if(webData.saveAsSupported && event.shiftKey) {
                    saveDoc();
                } else {
                    downloadDoc();
                }
            }
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
        }
    }

    /** This function returns the PDF Object the website is currently using. */
    function getCurrentPDFObject() {
        if(!onDocumentRoute.value) { return null; }
        const docActive = hostedDocuments[currentDocumentRoute.value];
        return { blob: docActive.blob.value, url: docActive.objectUrl.value, name: docActive.name, suffix: docActive.suffix }
    }

    /**
     * ----------------------------------------------------------------------------------------
     * These functions are used for saving a document Here To the user's personal Google Drive.
     * ----------------------------------------------------------------------------------------
     */

    /** This function opens a view that lets the user pick the folder they want to upload my document to. */
    async function openGoogleDrivePicker() {
        const docsView = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
            .setIncludeFolders(true)
            .setSelectFolderEnabled(true)
            .setOwnedByMe(true);

        const picker = new google.picker.PickerBuilder()
            .addView(docsView)
            .setTitle("Select A Folder Where You Would Like To Save This Document To.")
            .setOAuthToken(googleAPIAccessToken)
            .setDeveloperKey(GOOGLE_CLOUD_API_KEY)
            .setCallback((data) => { googleDrivePickerCallback(data); })
            .setAppId(GOOGLE_CLOUD_APP_ID)
            .build();
        picker.setVisible(true);
    }

    /**
     * This function is a callback that is performed once the user performs an action on the google drive picker UI.
     * @param {Object} data The data received by the picker to use for the callback.
     * @param {String} data.action The type of action the user took to save the file.
     */
    function googleDrivePickerCallback(data = { action: "loaded" }) {
        if(data.action === "loaded") {
            styleStore.setHideOverflowArray(HideOverflow.GOOGLE_DRIVE_PICKER, true);
        } else if(data.action === "cancel") {
            styleStore.setHideOverflowArray(HideOverflow.GOOGLE_DRIVE_PICKER, false);
            webData.setMenuOpen(DOCUMENT_MENU);

            documentUploadToGoogleDriveCanceled.value = true;
            setTimeout(() => { documentUploadToGoogleDriveCanceled.value = false; }, 3000);
        } else if(data.action === "picked") {
            styleStore.setHideOverflowArray(HideOverflow.GOOGLE_DRIVE_PICKER, false);
            const firstFolder = data.docs[0];

            if(firstFolder.type === "folder" && typeof firstFolder.id === "string") {
                uploadDocToGoogleDrive(firstFolder.id);
            }
        }
    }

    /**
     * This function shares the document with someone using the OS's built in share popup.
     * @param {String} folderId The ID of the google drive folder to save the document in.
     *      If this is blank, it saves the document to the user's "My Drive".
     */
    async function uploadDocToGoogleDrive(folderId = "") {
        documentUploadToGoogleDriveStatus.value = 1;
        chooseGoogleDriveFolderForUpload = false;

        try {
            webData.setMenuOpen(DOCUMENT_MENU);
            const documentFile = getCurrentPDFObject();
            const form = new FormData();

            const metadata = { name: documentFile.name, mimeType: 'application/pdf' }
            if(folderId !== "") { metadata.parents = [folderId]; }

            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', documentFile.blob);

            const GOOGLE_API_LINK = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
            const headers = new Headers({ 'Authorization': 'Bearer ' + googleAPIAccessToken });

            await ofetch.raw(GOOGLE_API_LINK, { method: 'POST', headers, body: form });
            documentUploadToGoogleDriveStatus.value = 2;
        } catch(e) {
            documentUploadToGoogleDriveStatus.value = 3;
        } finally {
            setTimeout(() => { documentUploadToGoogleDriveStatus.value = 0; }, 3000);
        }
    }

    /**
     * This function requests the google token client to upload their document to google drive.
     * @param {Boolean} chooseFolder If true, this function will activate the Google Picker API to let a user choose the folder on their drive.
     */
    async function requestGoogleToUploadDoc(chooseFolder = false) {
        try {
            if(documentUploadToGoogleDriveStatus.value != 0 || googleDriveOptAvailable.value == 1 || googleDriveOptAvailable.value < 0) { return; }
            if(googleDriveOptAvailable.value == 0) {
                googleDriveOptAvailable.value = 1;
                await googleAccountsTag.load(true);
                await googleApiTag.load(true);

                var secondsPassed = 0;
                while((!googleDriveUploadSupported.value || !googleDrivePickerAPILoaded.value) && secondsPassed < 10) {
                    await sleep(1000);
                    secondsPassed++;
                }
                googleDriveOptAvailable.value = ((!googleDriveUploadSupported.value || !googleDrivePickerAPILoaded.value) ? -2 : 2);
            }

            if(googleDriveOptAvailable.value < 0) { return; }
            chooseGoogleDriveFolderForUpload = chooseFolder;
            googleTokenClient.requestAccessToken();
        } catch(e) {
            googleDriveOptAvailable.value = -3;
        }
    }

    /**
     * ------------------------------------------------------------------------------------------
     * These functions are for initializing and disabling certain features provided by the store.
     * ------------------------------------------------------------------------------------------
     */

    /** This function sets certain variables in the document store to ensure it runs properly. */
    function mountDocumentStore() {
        // If certain Google Cloud API keys are not present, this function disables the Google Drive functionality.
        if(!GOOGLE_CLOUD_CLIENT_ID || GOOGLE_CLOUD_CLIENT_ID === "") { googleDriveOptAvailable.value = -1; }
        if(!GOOGLE_CLOUD_API_KEY || GOOGLE_CLOUD_API_KEY === "") { googleDriveOptAvailable.value = -1; }
        if(!GOOGLE_CLOUD_APP_ID || GOOGLE_CLOUD_APP_ID === "") { googleDriveOptAvailable.value = -1; }

        // This sets whether the user is able to print a document on the website using the native PDF Viewer.
        const notOnDesktop = ("userAgent" in navigator && Bowser.parse(navigator.userAgent).platform.type !== "desktop");
        browserPdfViewerPresent.value = ('pdfViewerEnabled' in navigator && navigator.pdfViewerEnabled && !notOnDesktop);
        copyDocumentSupported.value = ClipboardItem.supports(PDF_MIME_TYPE);
        iframeSupported.value = (!!document.createElement("iframe"));

        // This checks to see all possible image types a canvas can be converted into.
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 1;
        tempCanvas.height = 1;

        confirmedImageTypes.value = [];
        for(let i = 0; i < POSSIBLE_IMAGE_TYPES.length; i++) {
            const possibleMimeType = POSSIBLE_IMAGE_TYPES[i];
            const tempDataUrl = tempCanvas.toDataURL(possibleMimeType);
            if(tempDataUrl.startsWith(`data:${possibleMimeType}`)) { confirmedImageTypes.value.push(possibleMimeType); }
        }
    }

    /** This function mounts a page that hosts a document. */
    async function mountDocumentPage() {
        await nextTick();
        if(onResumeRoute.value) {
            await resumeStore.initBlob({ addQrcode: false, removeLinks: false, updateQuery: false });
        } else if(!hostedDocuments[currentDocumentRoute.value].blobCreated.value) {
            await hostedDocuments[currentDocumentRoute.value].initBlob();
        }

        if(onMarkdownRoute.value) { return; }
        const scaleFactor = hostedDocuments[currentDocumentRoute.value].metadata.pageHeightToWidthRatio.value;
        mountCustomDocumentPage(DEFAULT_PDF_MAX_WIDTH, DEFAULT_PDF_MIN_WIDTH, scaleFactor);
    }

    /** This function unmounts a page that hosts a document. */
    function unmountDocumentPage() {
        fullScreenStore.exitFullScreen();
        styleStore.setHideOverflowArray(HideOverflow.GOOGLE_DRIVE_PICKER, false);

        for(let i = 0; i < docImageUrls.value.length; i++) { URL.revokeObjectURL(docImageUrls.value[i]); }
        for(let j = 0; j < docPrintImageUrls.value.length; j++) { URL.revokeObjectURL(docPrintImageUrls.value[j]); }

        docImageUrls.value = [];
        docPrintImageUrls.value = [];

        docLoaded.value = { status: false, totalPages: 0, loadedPages: 0 };
        setWindowSizeWatchers(false, false);
    }

    /**
     * This mounts the custom document page for the 
     * @param {Number} minWidth The Minimum width for the custom pdf.
     * @param {Number} maxWidth The Maximum width for the custom pdf.
     * @param {Number} scaleFactor the scale factor to get height pixels.
     */
    function mountCustomDocumentPage(maxWidth = DEFAULT_PDF_MAX_WIDTH, minWidth = DEFAULT_PDF_MIN_WIDTH, scaleFactor = PDF_LETTER_SCALE) {
        customPdfMaxWidth.value = maxWidth;
        customPdfMinWidth.value = minWidth;
        customPdfScaleFactor.value = scaleFactor;

        setPdfSize();
        setWindowSizeWatchers(true, false);
    }

    /** This function checks if the PDF.js Worker Source has been added yet. If not, this function adds it. */
    async function checkPdfjsWorker() {
        if(workerSrcAdded.value) { return; }
        (await import("pdfjs-dist")).GlobalWorkerOptions.workerSrc = workerSrcUrl;
        workerSrcAdded.value = true;
    }

    /** This function renders a PDF as an array of images (PNGs) for anything using PDF.js. */
    async function getPdfAsImages() {
        if(!import.meta.client || !docLoaded.value.status) { return; }
        try {
            const documentFile = getCurrentPDFObject();
            if(!documentFile) { throw new Error("Document Does Not Exist."); }
            docImageUrls.value = await renderPdfAsPng(documentFile.url, 200);
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
        }
    }

    /** This function initializes a token client for OAuth 2 necessary for the "Save To Google Drive" Feature. */
    function initGoogleTokenClient() {
        googleTokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLOUD_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/drive.file',
            callback: (response) => {
                if(response.access_token) {
                    googleAPIAccessToken = response.access_token;
                    // uploadDocToGoogleDrive();
                    if(chooseGoogleDriveFolderForUpload) {
                        openGoogleDrivePicker();
                    } else {
                        uploadDocToGoogleDrive();
                    }
                }
            },
        });

        // Sets Upload supported as true for the website.
        googleDriveUploadSupported.value = true;
    }

    /** This function initializes an API that will be used to let users choose the folder they want to save one of my documents to. */
    function initGooglePickerAPI() { gapi.load("picker", () => { googleDrivePickerAPILoaded.value = true; }); }

    /**
     * ----------------------------------------------------------------------------------------------
     * These functions are extra functions such as event listeners or setters used by document pages.
     * ----------------------------------------------------------------------------------------------
     */

    /** Based on the current width, height, scale factor, and viewport, this function sets the size of the pdf. */
    function setPdfSize() {
        customPdfWidth.value = Math.min(customPdfMaxWidth.value, Math.max(customPdfMinWidth.value, (windowSize.width.value - 30)));
        customPdfHeight.value = (customPdfWidth.value * customPdfScaleFactor.value);

        if(!document || !document.documentElement) { return; }
        document.documentElement.style.setProperty(PDF_WIDTH_CSS_PROPERTY, (String(customPdfWidth.value) + "px"));
        document.documentElement.style.setProperty(PDF_HEIGHT_CSS_PROPERTY, (String(customPdfHeight.value) + "px"));
    }

    /**
     * This function sets the window size watchers that set the PDF size.
     * @param {Boolean | "toggle"} status The new status of the watchers. If "toggle", it flips the current state.
     * @param {Boolean} force If true, the function will ignore the current state of the watchers when pausing or resuming them.
     */
    function setWindowSizeWatchers(status = false, force = false) {
        if(status === "toggle") { status = !windowSizeWatchersEnabled.value; }
        if(status && (force || !windowSizeWatchersEnabled.value)) {
            windowSizeWatchersEnabled.value = true;
            if(pdfDimensionsController != null) { pdfDimensionsController.abort(); }

            pdfDimensionsController = new AbortController();
            const signal = pdfDimensionsController.signal;
            window.addEventListener("animation-resize", () => { setPdfSize(); }, { signal });
        } else if(!status && (force || windowSizeWatchersEnabled.value)) {
            windowSizeWatchersEnabled.value = false;
            if(pdfDimensionsController != null) { pdfDimensionsController.abort(); }
            pdfDimensionsController = null;
        }
    }

    /**
     * This function sets the full screen for the element containing the document or script.
     */
    async function toggleDocumentFullScreen() {
        if(!import.meta.client || (!onMarkdownRoute.value && !docLoaded.value.status) || fsStateChanging.value) { return; }
        const element = document.getElementById("resume-container");
        if(!element) { return; }

        fsStateChanging.value = true;
        webData.bypassBodyClick();
        await fullScreenStore.setFullScreen(element);

        await sleep(50);
        await nextTick();
        await sleep(50);

        webData.closeNavMenu();
        fsStateChanging.value = false;
    }

    /**
     * This function scrolls to any page on a document webpage.
     * @param {Number} pageNum The number of the specified page.
     */
    function scrollToPage(pageNum = 1) {
        const id = ("page_" + pageNum);
        if(document.getElementById(id) != null) { router.push(routePath.value + "#" + id); }
    }

    /**
     * This function sets the current observed page.
     * @param {Number} index The Page Number.
     */
    function setCurrentObservedPage(index = 1) {
        if(index >= 1 && index <= docLoaded.value.totalPages) { currentObservedPage.value = index; }
    }

    /**
     * This function sets the page number for the hosted document context menu.
     * @param {Number} index The Page Number. 0 by default means that the contextmenu should be hidden.
     */
    function setContextMenuPageNumber(index = 0) {
        if(index >= 0 && index <= docLoaded.value.totalPages) { contextMenuPageNumber.value = index; }
    }

    return { hostedDocuments, docImageUrls, docLoaded, currentObservedPage, contextMenuPageNumber, printInProgress,
        googleDriveOptionAvailable, copyDocumentSupported, browserPdfViewerPresent, workerSrcAdded, iframeSupported,
        currentDocumentBlobCreated, currentDocumentFileSize, documentLink, documentDownloadTitle,
        downloadIcon, saveDocIcon, customPrintIcon, printIcon, shareIcon, copyIcon, uploadToGoogleDriveIcon, documentUploadToGoogleDriveCanceled,
        downloadPending, savePending, printPending, customPrintPending, sharePending, copyPending, uploadToGoogleDrivePending,
        customPdfWidth, customPdfHeight, customPdfMaxWidth, customPdfMinWidth, showPdfPageNav,
        onDocumentRoute, onMainResumeRoute, onResumeRoute, onMarkdownRoute, onCreateGithubRepoRoute, onResearchPaperRoute,
        downloadDoc, saveDoc, printDoc, shareDoc, copyDoc, requestGoogleToUploadDoc, onHostedDocumentPageKeydown,
        toggleDocumentFullScreen, setPdfSize, scrollToPage, setCurrentObservedPage, setContextMenuPageNumber, initGoogleTokenClient, initGooglePickerAPI,
        mountDocumentStore, mountDocumentPage, mountCustomDocumentPage, unmountDocumentPage, checkPdfjsWorker, getPdfAsImages
    }
});

/**
 * This serves as a simple utility that contains all the necessary objects a hosted document needs for a document page.
 * @param {String} path The path in the website that displays this document.
 * @param {String} file The imported file to display.
 * @param {String} name The name of the file.
 * @param {".pdf" | ".docx"} suffix The suffix of the file being displayed.
 * @param {String} originLink The link where that file is stored online.
 * @param {Boolean} useBlobLink If true, this utility uses the blob object url as the link instead of the passed in link.
 * @param {Boolean} withMd If true, this utility treats (path + "/markdown") as a viable route as well.
 */
function useHostedDocument(path = "/", file = "", name = "", suffix = ".pdf", originLink = "", useBlobLink = false, withMd = false) {
    path = (path.endsWith("/") ? path.substring(0, (path.length - 1)) : path);
    const router = useRouter();

    /** @type {import('vue').ShallowRef<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = shallowRef(null);
    const objectUrl = shallowRef("");
    const link = shallowRef("");

    const onRoute = computed(() => { return checkPath(router.currentRoute.value.path); });
    const blobCreated = computed(() => { return (blob.value != null && objectUrl.value !== ""); });
    const fileSize = computed(() => { return (blobCreated.value ? prettyBytes(blob.value.size, { binary: true }) : ""); });

    /** This is the metadata provided by the document. */
    const metadata = usePdfMetadata(objectUrl, false);

    /** This functions initializes the blob value for this hosted document. */
    async function initBlob() {
        if(blobCreated.value) { return; }
        blob.value = await fetch(file).then((res) => res.blob());
        objectUrl.value = URL.createObjectURL(blob.value);

        changeLink("default");
        await metadata.parsePdf();
    }

    /** This function deletes the current blob used by the website. */
    function deleteBlob() {
        if(!blobCreated.value) { return; }
        URL.revokeObjectURL(objectUrl.value);

        blob.value = null;
        objectUrl.value = "";

        metadata.setDefaultValues();
        changeLink("default");
    }

    /**
     * This function lets external stores and components set the blob itself for the hosted document.
     * @param {Blob} newBlob The new Blob that represents the hosted document.
     */
    async function setNewBlob(newBlob) {
        if(blobCreated.value) { deleteBlob(); }
        blob.value = newBlob;
        objectUrl.value = URL.createObjectURL(blob.value);
        
        changeLink("default");
        await metadata.parsePdf();
    }

    /**
     * This function sets the link for this hosted document.
     * @param {String} newLink The new link or "default" if the website should set it itself.
     */
    function changeLink(newLink = "") {
        if(newLink === "default") {
            link.value = (useBlobLink ? objectUrl.value : originLink);
        } else {
            link.value = newLink;
        }
    }

    /**
     * This function checks whether the path associated with this hosted document is equivalent to another given path.
     * @param {String} pathname The path parameter.
     */
    function checkPath(pathname) {
        if(pathname.endsWith("/")) { pathname = pathname.substring(0, (pathname.length - 1)); }
        const mainCheck = (path === pathname || (path + "/") === pathname);
        return (mainCheck || (withMd && ((path + "/markdown") === pathname || (path + "/markdown/") === pathname)));
    }

    return { path, onRoute, file, fileSize, name, suffix, link, blob, blobCreated, objectUrl, metadata, originLink, withMd,
        initBlob, setNewBlob, deleteBlob, checkPath, changeLink
    }
}