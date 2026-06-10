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
     * @param {Boolean} options.fontFlattened If true, this turns all text to black.
     */
    async function initBlob(options) {
        if(blobCreated.value != 0) { return; }
        blobCreated.value = 1;

        blob.value = await createNewBlob(options);
        objectUrl.value = URL.createObjectURL(blob.value);

        documentStore.hostedDocuments[0].blob = blob.value
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
        documentStore.hostedDocuments[0].blob = null;
        objectUrl.value = "";
        blobCreated.value = 0;
    }

    /**
     * This function creates a new blob for the resume to be rendered into.
     * @param {Object} options The options to set to render the blob.
     * @param {Boolean} options.addQrcode If true, this adds a QR Code to the top-right of my resume.
     * @param {Boolean} options.removeLinks If true, this removes all links from my resume.
     * @param {Boolean} options.fontFlattened If true, this turns all text to black.
     * @returns The blob of the new resume.
     */
    async function createNewBlob(options = {}) {
        if(options?.addQrcode == undefined) { options.addQrcode = false; }
        if(options?.removeLinks == undefined) { options.removeLinks = false; }
        if(options?.fontFlattened == undefined) { options.fontFlattened = false; }

        var newResumeBlob = await fetch(Mohit_Jain_Resume).then((res) => res.blob());
        if(!options.addQrcode && !options.fontFlattened && !options.removeLinks) {
            return newResumeBlob;
        } else {
            return newResumeBlob;
        }
    }
   
    return { blob, objectUrl, blobCreated, qrcodeAdded, linksRemoved, fontFlattened,
        initBlob, deleteCurrentBlob
    }
});