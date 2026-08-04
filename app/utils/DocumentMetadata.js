import { PDF } from "@libpdf/core";
import prettyBytes from "pretty-bytes";
import dayjs from "dayjs"

/**
 * This utility gathers the metadata for a PDF and ensures that the website can use it.
 * @param {import('vue').ShallowRef<String>} objectUrl A reference Object URL representing the document.
 * @param {Boolean} onMounted If true (which is by default), this function runs the "parsePDF" function when initialized.
 */
export function usePdfMetadata(objectUrl = shallowRef(null), onMounted = true) {
    const metadataReceived = shallowRef(false);
    const parsingPdf = shallowRef(false);

    const title = shallowRef("");
    const author = shallowRef("");
    const subject = shallowRef("");
    const application = shallowRef("");
    const producer = shallowRef("");
    const keywords = ref([""]);
    const keywordsAsOne = shallowRef("");

    const pageCount = shallowRef(0);
    const pageCountAsString = shallowRef("");

    const pageWidth = shallowRef(0);
    const pageHeight = shallowRef(0);
    const pageHeightToWidthRatio = shallowRef(1);
    const pageOrientation = shallowRef("");
    const pageSize = shallowRef("");

    const dateCreated = shallowRef("");
    const dateModified = shallowRef("");

    const pdfVersion = shallowRef("");
    const fileSize = shallowRef("");
    const fileSizeBinary = shallowRef("");
    const fileSizeInBytes = shallowRef(0);

    /**
     * This function parses the PDF and its metadata.
     * @returns A boolean indicating if the function could successfully parse the PDF.
     */
    async function parsePdf() {
        try {
            parsingPdf.value = true;
            if(import.meta.server || !objectUrl.value || objectUrl.value === "") { throw new Error("Object URL Not Ready."); }
            const pdfBlob = await (await fetch(objectUrl.value)).blob(); // The blob fetched with the Object URL.

            if(!pdfBlob || pdfBlob == null || !(pdfBlob instanceof Blob)) { throw new Error("Blob Parsed By Object URL Not Ready."); }
            const pdf = await PDF.load(new Uint8Array(await pdfBlob.arrayBuffer())); // The PDF parsed by @libpdf/core.

            title.value = (pdf.getTitle() ?? "");
            author.value = (pdf.getAuthor() ?? "");
            subject.value = (pdf.getSubject() ?? "");
            application.value = (pdf.getCreator() ?? "");
            producer.value = (pdf.getProducer() ?? "");
            keywords.value = (pdf.getKeywords() ?? []);
            keywordsAsOne.value = keywords.value.join(', ');

            pageCount.value = pdf.getPageCount();
            pageCountAsString.value = String(pageCount.value);
            pageWidth.value = ((pageCount.value <= 0) ? 0 : (pdf.getPage(0).width / 72));
            pageHeight.value = ((pageCount.value <= 0) ? 0 : (pdf.getPage(0).height / 72));
            pageHeightToWidthRatio.value = (Math.round((pageHeight.value * 1000) / pageWidth.value) / 1000);
            pageOrientation.value = ((pageCount.value <= 0) ? "" : (pdf.getPage(0).isPortrait ? "Portrait" : "Landscape"));
            pageSize.value = String(pageWidth.value + " × " + pageHeight.value + " in (" + pageOrientation.value + ")");

            const DATE_FORMAT = "M/D/YY, h:mm:ss A";
            const creationDate = pdf.getCreationDate();
            const modificationDate = pdf.getModificationDate();

            dateCreated.value = (creationDate ? dayjs(creationDate).format(DATE_FORMAT) : "");
            dateModified.value = (modificationDate ? dayjs(modificationDate).format(DATE_FORMAT) : "");

            pdfVersion.value = pdf.version;
            const blobSize = pdfBlob.size;

            fileSize.value = prettyBytes(blobSize);
            fileSizeBinary.value = prettyBytes(blobSize, { binary: true });
            fileSizeInBytes.value = blobSize;
            
            metadataReceived.value = true;
            parsingPdf.value = false;
            return true;
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
            metadataReceived.value = false;
            parsingPdf.value = false;
            return false;
        }
    }

    /** This function sets the variables here to their original state. */
    function setDefaultValues() {
        title.value = "";
        author.value = "";
        subject.value = "";
        application.value = "";
        producer.value = "";
        keywords.value = [""];
        keywordsAsOne.value = "";

        pageCount.value = 0;
        pageCountAsString.value = "";

        pageWidth.value = 0;
        pageHeight.value = 0;
        pageHeightToWidthRatio.value = 1;
        pageOrientation.value = "";
        pageSize.value = "";

        dateCreated.value = "";
        dateModified.value = "";

        pdfVersion.value = "";
        fileSize.value = "";
        fileSizeBinary.value = "";
        fileSizeInBytes.value = 0;
        metadataReceived.value = false;
    }

    /**
     * This function resets the values and parses the PDF again.
     * @returns A boolean indicating if the function could successfully parse the PDF.
     */
    async function reset() {
        setDefaultValues();
        if(!objectUrl.value || objectUrl.value === "") { return; }
        return await parsePdf();
    }

    // Sets Hooks that will run the parse function.
    if(onMounted) { parsePdf(); }
    watch(objectUrl, () => { reset(); });
    if(getCurrentInstance() && onMounted) { onMountedAdvanced(() => { parsePdf(); }); }

    return { parsePdf, setDefaultValues, reset, metadataReceived, parsingPdf, title, author, subject,
        dateCreated, dateModified, application, producer, keywords, keywordsAsOne, pdfVersion, pageCount,  pageCountAsString,
        pageWidth, pageHeight, pageHeightToWidthRatio, pageOrientation, pageSize, fileSize, fileSizeBinary, fileSizeInBytes
    }
}