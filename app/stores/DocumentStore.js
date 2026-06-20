import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Fulton_Internship_Program_Appreciation_Certificate_Spring_2025 from "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";
import Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper from "/Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper.pdf"
import Create_Github_Repo from "/Create_Github_Repo.pdf";

import { ofetch } from 'ofetch';
const GOOGLE_CLOUD_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLOUD_CLIENT_ID;
const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
const GOOGLE_CLOUD_APP_ID = import.meta.env.VITE_GOOGLE_CLOUD_APP_ID;

/** This store manages multiple files and documents (not to be confused with the Document Object Model) that I showcase on my website. */
export const useDocumentStore = defineStore("document-store", () => {
    const PDF_WIDTH_CSS_PROPERTY = "--mohit-custom-pdf-width";
    const PDF_HEIGHT_CSS_PROPERTY = "--mohit-custom-pdf-height";

    const hostedDocuments = [
        useHostedDocument("/resume", Mohit_Jain_Resume, "Mohit_Jain_Resume", ".pdf", PERSONAL_RESUME_LINK, false, true),
        useHostedDocument("/create-github-repo", Create_Github_Repo, "Create_Github_Repo", ".pdf", CREATE_GITHUB_REPO_DOC_LINK, false, false),
        useHostedDocument(FCS_CERTIFICATE_ROUTE, Fulton_Internship_Program_Appreciation_Certificate_Spring_2025,
            "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025", ".pdf", FCS_CERTIFICATE_LINK, false, false
        ),
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

    const docLoaded = ref({ status: false, totalPages: 0, loadedPages: 0 });
    const fsStateChanging = ref(false);
    const windowSizeWatchersEnabled = ref(false);

    const customPdfWidth = ref(800);
    const customPdfHeight = ref(1100);
    const customPdfScaleFactor = ref(1.375);

    const customPdfMaxWidth = ref(800);
    const customPdfMinWidth = ref(320);

    /** @type {HTMLIFrameElement} This variable stores the iframe element used for printing a document. */
    var printIframe = null;
    var printFunctionTimeout = null;
    var chooseGoogleDriveFolderForUpload = false;

    const documentDownloadStatus = ref({ pending: false, fresh: false });
    const documentSaveStatus = ref({ pending: false, fresh: false, error: false });
    const documentPrintStatus = ref({ pending: false, fresh: false, timeoutError: false });
    const documentShareStatus = ref({ pending: false, fresh: false });
    const documentUploadToGoogleDriveStatus = ref({ pending: false, fresh: false, cancel: false, error: false });

    const routePath = computed(() => { return router.currentRoute.value.path; });
    const onMarkdownRoute = computed(() => { return (routePath.value.includes("markdown")); });

    const onDocumentRoute = computed(() => { return (-1 != currentDocumentRoute.value); });
    const currentDocumentRoute = computed(() => { return hostedDocuments.findIndex((item) => { return item.checkPath(routePath.value) }); });
    const currentDocumentBlobCreated = computed(() => { return (onDocumentRoute.value ? hostedDocuments[currentDocumentRoute.value].blobCreated.value : false); });
    const documentLink = computed(() => { return (onDocumentRoute.value ? hostedDocuments[currentDocumentRoute.value].link.value : ""); });

    const onResumeRoute = computed(() => { return hostedDocuments[0].onRoute.value; });
    const onCreateGithubRepoRoute = computed(() => { return hostedDocuments[1].onRoute.value; });
    const onFCSCertificateRoute = computed(() => { return hostedDocuments[2].onRoute.value; });
    const onResearchPaperRoute = computed(() => { return hostedDocuments[3].onRoute.value; });

    const onMainResumeRoute = computed(() => { return (onResumeRoute.value && !onMarkdownRoute.value); });
    const saveAsSupported = computed(() => { return (import.meta.client && window.isSecureContext && typeof window.showSaveFilePicker === 'function'); });

    const downloadIcon = computed(() => {
        const downloadObj = documentDownloadStatus.value;
        return (downloadObj.fresh ? "fa-check" : (downloadObj.pending ? "fa-spinner" : "fa-file-download"));
    });
    const saveDocIcon = computed(() => {
        const saveObj = documentSaveStatus.value;
        return (saveObj.error ? "fa-ban" : (saveObj.fresh ? "fa-check" : (saveObj.pending ? "fa-spinner" : "fa-floppy-disk")));
    });
    const printIcon = computed(() => {
        const printObj = documentPrintStatus.value;
        return (printObj.timeoutError ? "fa-ban" : (printObj.fresh ? "fa-check" : (printObj.pending ? "fa-spinner" : "fa-print")));
    });
    const shareIcon = computed(() => {
        const shareObj = documentShareStatus.value;
        return (shareObj.fresh ? "fa-check" : (shareObj.pending ? "fa-spinner" : "fa-share"));
    });
    const uploadToGoogleDriveIcon = computed(() => {
        const uploadObj = documentUploadToGoogleDriveStatus.value;
        const uploadPending = (uploadObj.pending || googleDriveOptAvailable.value == 1)
        return (uploadObj.fresh ? "fa-check" : (uploadPending ? "fa-spinner" : "fa-brands fa-google-drive"));
    });

    /**
     * ---------------------------------------------------------------------------
     * These functions are for fetching and exporting files present on my website.
     * ---------------------------------------------------------------------------
     */

    /**
     * This function downloads a document for the visitor to see.
     */
    async function downloadDoc() {
        if(documentDownloadStatus.value.pending) { return; }
        documentDownloadStatus.value.pending = true;
        const documentFile = getCurrentPDFObject();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(documentFile.blob);
        link.download = (documentFile.name + documentFile.suffix);
    
        link.click();
        link.remove();

        documentDownloadStatus.value.pending = false;
        documentDownloadStatus.value.fresh = true;
        setTimeout(() => { documentDownloadStatus.value.fresh = false; }, 3000);
    }

    /**
     * This function opens a "Save File Picker" so the user can save my document at their preferred location.
     */
    async function saveDoc() {
        if(!saveAsSupported.value || documentSaveStatus.value.pending) { return; }
        try {
            documentSaveStatus.value.pending = true;
            const documentFile = getCurrentPDFObject();

            const saveHandle = await window.showSaveFilePicker({
                suggestedName: documentFile.name,
                types: [{ description: "PDF Document", accept: { 'application/pdf': ['.pdf'] } }]
            });

            const writable = await saveHandle.createWritable();
            await writable.write(documentFile.blob);
            await writable.close();

            documentSaveStatus.value.pending = false;
            documentSaveStatus.value.fresh = true;
            setTimeout(() => { documentSaveStatus.value.fresh = false; }, 4000);
        } catch(err) {
            documentSaveStatus.value.pending = false;
            documentSaveStatus.value.error = true;
            setTimeout(() => { documentSaveStatus.value.error = false; }, 4000);
        }
    }

    /**
     * This function opens the browser's print doucment so the user can print a document.
     */
    async function printDoc() {
        if(printIframe != null) { document.body.removeChild(printIframe); }
        if(printFunctionTimeout != null) { clearTimeout(printFunctionTimeout); }
        if(documentPrintStatus.value.timeoutError || documentPrintStatus.value.pending) { return; }

        printIframe = null;
        documentPrintStatus.value.pending = true;
        
        printFunctionTimeout = setTimeout(() => {
            if(documentPrintStatus.value.pending) {
                documentPrintStatus.value.pending = false;
                documentPrintStatus.value.timeoutError = true;
            }
            printFunctionTimeout = null;
        }, 7000);
        
        const documentFile = getCurrentPDFObject();
        const url = URL.createObjectURL(documentFile.blob);
        printIframe = document.createElement("iframe");

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

            documentPrintStatus.value.pending = false;
            documentPrintStatus.value.fresh = true;

            setTimeout(() => { documentPrintStatus.value.fresh = false; }, 3000);
            clearTimeout(printFunctionTimeout);
        }
    }

    /**
     * This function shares the document with someone using the OS's built in share popup.
     */
    async function shareDoc() {
        if(documentShareStatus.value.pending) { return; }
        documentShareStatus.value.pending = true;

        const documentFile = getCurrentPDFObject();
        await webData.shareFile(new File([documentFile.blob], (documentFile.name + documentFile.suffix), { type: 'application/pdf' }));

        documentShareStatus.value.pending = false;
        documentShareStatus.value.fresh = true;
        setTimeout(() => { documentShareStatus.value.fresh = false; }, 3000);
    }

    /**
     * This function returns the PDF Object the website is currently using.
     */
    function getCurrentPDFObject() {
        if(!onDocumentRoute.value) { return null; }
        const index = currentDocumentRoute.value;
        return { blob: hostedDocuments[index].blob.value, name: hostedDocuments[index].name, suffix: hostedDocuments[index].suffix }
    }

    /**
     * ----------------------------------------------------------------------------------------
     * These functions are used for saving a document Here To the user's personal Google Drive.
     * ----------------------------------------------------------------------------------------
     */

    /**
     * This function opens a view that lets the user pick the folder they want to upload my document to.
     */
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
            styleStore.setHideOverflowArray(2, true);
        } else if(data.action === "cancel") {
            styleStore.setHideOverflowArray(2, false);
            webData.setMenuOpen(3);

            documentUploadToGoogleDriveStatus.value.cancel = true;
            setTimeout(() => { documentUploadToGoogleDriveStatus.value.cancel = false; }, 3000);
        } else if(data.action === "picked") {
            styleStore.setHideOverflowArray(2, false);
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
        webData.setMenuOpen(3);
        chooseGoogleDriveFolderForUpload = false;
        documentUploadToGoogleDriveStatus.value.pending = true;

        const documentFile = getCurrentPDFObject();
        const form = new FormData();

        const metadata = { name: documentFile.name, mimeType: 'application/pdf' }
        if(folderId !== "") { metadata.parents = [folderId]; }

        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', documentFile.blob);

        const GOOGLE_API_LINK = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
        const headers = new Headers({ 'Authorization': 'Bearer ' + googleAPIAccessToken });

        ofetch.raw(GOOGLE_API_LINK, { method: 'POST', headers, body: form }).then((response) => {
            documentUploadToGoogleDriveStatus.value.pending = false;
            documentUploadToGoogleDriveStatus.value.fresh = true;
            setTimeout(() => { documentUploadToGoogleDriveStatus.value.fresh = false; }, 3000);

        }).catch((e) => {
            console.error(e);
            documentUploadToGoogleDriveStatus.value.pending = false;
            documentUploadToGoogleDriveStatus.value.error = true;
            setTimeout(() => { documentUploadToGoogleDriveStatus.value.error = false; }, 3000);
        })
    }

    /**
     * This function requests the google token client to upload their document to google drive.
     * @param {Boolean} chooseFolder If true, this function will activate the Google Picker API to let a user choose the folder on their drive.
     */
    async function requestGoogleToUploadDoc(chooseFolder = false) {
        try {
            if(documentUploadToGoogleDriveStatus.value.pending || googleDriveOptAvailable.value == 1 || googleDriveOptAvailable.value < 0) { return; }
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

    /** This checks to ensure that the Google IDs and Keys are properly passed in. */
    function mountDocumentStore() {
        if(!GOOGLE_CLOUD_CLIENT_ID || GOOGLE_CLOUD_CLIENT_ID === "") { googleDriveOptAvailable.value = -1; }
        if(!GOOGLE_CLOUD_API_KEY || GOOGLE_CLOUD_API_KEY === "") { googleDriveOptAvailable.value = -1; }
        if(!GOOGLE_CLOUD_APP_ID || GOOGLE_CLOUD_APP_ID === "") { googleDriveOptAvailable.value = -1; }
    }

    /** This function mounts a page that hosts a document. */
    async function mountDocumentPage() {
        webData.mountWebData();
        await nextTick();

        if(onResumeRoute.value && !onMarkdownRoute.value) {
            await resumeStore.initBlob();
        } else if(!hostedDocuments[currentDocumentRoute.value].blobCreated.value) {
            await hostedDocuments[currentDocumentRoute.value].initBlob();
        }

        if(onMarkdownRoute.value) { return; }
        mountCustomDocumentPage(800, 320, (onFCSCertificateRoute.value ? 0.79875 : 1.375));
    }

    /**
     * This function unmounts a page that hosts a document.
     */
    function unmountDocumentPage() {
        styleStore.setHideOverflowArray(2, false);
        docLoaded.value = { status: false, totalPages: 0, loadedPages: 0 };
        fullScreenStore.exitFullScreen();
        setWindowSizeWatchers(false, false);
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
        setWindowSizeWatchers(true, false);
    }

    /**
     * This function initializes a token client for OAuth 2 necessary for the "Save To Google Drive" Feature.
     */
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
        googleDriveUploadSupported.value = true;
    }

    /**
     * This function initializes an API that will be used to let users choose the folder they want to save one of my documents to.
     */
    function initGooglePickerAPI() {
        gapi.load("picker", () => { googleDrivePickerAPILoaded.value = true; });
    }

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
        if(fsStateChanging.value) { return; }
        fsStateChanging.value = true;

        webData.bypassBodyClick();
        await fullScreenStore.setFullScreen(document.getElementById("resume-container"));

        await sleep(50);
        await nextTick();
        await sleep(50);

        webData.closeNavMenu();
        fsStateChanging.value = false;
    }

    /**
     * This sets a boolean to indicate that the document is loaded on the screen. Also handles the automatic scroll to a page.
     */
    function setDocLoaded() {
        const totalPages = docLoaded.value.totalPages;
        docLoaded.value = { status: true, totalPages, loadedPages: totalPages };

        const hashStr = router.currentRoute.value.hash.substring(1);
        if(hashStr === "") { return; }

        try {
            goToPageSection(hashStr, ((hashStr === "footer") ? 50 : 70), 10);
        } catch(e) {
            scrollToTop(true, 0);
        }
    }

    /**
     * This function is triggered whenever someone clicks on an annotation on the custom PDF.
     * @param event The object returned from clicking on an annotation. Go to the following link for more:
     * @see {@link https://tato30.github.io/vue-pdf/guide/events.html#annotation}
     */
    function onAnnotationClick(event = { type: "link", data: { url: "", unsafeUrl: "" } }) {
        const type = event.type;
        if(type === "internal-link") {
            scrollToPage(event.data.referencedPage);
        }
    }

    /**
     * This function scrolls to any page on a document webpage.
     * @param {Number} pageNum The number of the specified page.
     */
    function scrollToPage(pageNum = 1) {
        const id = ("page_" + pageNum);
        if(document.getElementById(id) == null) { return; }
        router.push(routePath.value + "#" + id);
        try { goToPageSection(id, 70); } catch(e) {}
    }

    return { hostedDocuments, docLoaded, googleDriveOptionAvailable, saveAsSupported, currentDocumentBlobCreated,
        documentDownloadStatus, documentSaveStatus, documentPrintStatus, documentShareStatus, documentUploadToGoogleDriveStatus,
        downloadIcon, saveDocIcon, printIcon, shareIcon, uploadToGoogleDriveIcon,
        customPdfWidth, customPdfHeight, customPdfMaxWidth, customPdfMinWidth, documentLink, onDocumentRoute, onMainResumeRoute,
        onResumeRoute, onMarkdownRoute, onCreateGithubRepoRoute, onFCSCertificateRoute, onResearchPaperRoute,
        downloadDoc, saveDoc, printDoc, shareDoc, requestGoogleToUploadDoc, toggleDocumentFullScreen, setPdfSize, onAnnotationClick, scrollToPage,
        mountDocumentStore, mountDocumentPage, mountCustomDocumentPage, unmountDocumentPage, setDocLoaded, initGoogleTokenClient, initGooglePickerAPI
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

    /** @type {import('vue').ShallowRef<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = shallowRef(null);
    const objectUrl = shallowRef("");
    const router = useRouter();

    const blobCreated = shallowRef(false);
    const link = shallowRef("");
    const onRoute = computed(() => { return checkPath(router.currentRoute.value.path); });


    /** This functions initializes the blob value for this hosted document. */
    async function initBlob() {
        if(blobCreated.value) { return; }
        blob.value = await fetch(file).then((res) => res.blob());

        objectUrl.value = URL.createObjectURL(blob.value);
        blobCreated.value = true;
        changeLink("default");
    }

    /** This function deletes the current blob used by the website. */
    function deleteBlob() {
        if(!blobCreated.value) { return; }
        blob.value = null;
        objectUrl.value = "";

        blobCreated.value = false;
        changeLink("default");
    }

    /**
     * This function lets external stores and components set the blob itself for the hosted document.
     * @param {Blob} newBlob The new Blob that represents the hosted document.
     */
    function setNewBlob(newBlob) {
        blob.value = newBlob;
        objectUrl.value = URL.createObjectURL(blob.value);
        blobCreated.value = true;
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

    return { path, onRoute, file, name, suffix, link, blob, blobCreated, objectUrl, originLink, withMd,
        initBlob, setNewBlob, deleteBlob, checkPath, changeLink
    }
}