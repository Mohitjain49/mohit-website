import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import { PDF, StandardFonts, rgb } from "@libpdf/core";
import QRCodeStyling from "qr-code-styling";

/** This pinia store is used to customize my resume. */
export const useResumeStore = defineStore("resume-store", () => {
    const documentStore = useDocumentStore();
    const blobCreated = ref(0);

    /** @type {import('vue').ShallowRef<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = shallowRef(null);
    const objectUrl = shallowRef("");

    /** This function initializes a blob and its object url for my resume. */
    async function initBlob() {
        if(blobCreated.value != 0) { return; }
        blobCreated.value = 1;

        blob.value = await fetch(Mohit_Jain_Resume).then((res) => res.blob());
        documentStore.hostedDocuments[0].blob = blob.value;
        objectUrl.value = URL.createObjectURL(blob.value);

        await sleep(5);
        blobCreated.value = 2;
    }
   
    return { blob, objectUrl, blobCreated, initBlob }
});