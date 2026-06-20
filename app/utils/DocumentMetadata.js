import { PDF } from "@libpdf/core";
import prettyBytes from "pretty-bytes";
import dayjs from "dayjs"

/**
 * This utility gathers the metadata for a PDF and ensures that the website can use it.
 * @param {import('vue').ShallowRef<String>} objectUrl A reference Object URL representing the document.
 */
export function usePdfMetadata(objectUrl = shallowRef(null)) {
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
    const pageOrientation = shallowRef("");
    const pageSize = shallowRef("");

    const dateCreated = shallowRef("");
    const dateModified = shallowRef("");

    const pdfVersion = shallowRef("");
    const fileSize = shallowRef("");
    const fileSizeInBytes = shallowRef(0);

    /**
     * This function parses the PDF and its metadata.
     * @returns A boolean indicating if the function could successfully parse the PDF.
     */
    async function parsePdf() {
        try {
            if(import.meta.server || !objectUrl.value || objectUrl.value === "") { return false; }
            const pdfBlob = await (await fetch(objectUrl.value)).blob(); // The blob fetched with the Object URL.

            if(!pdfBlob || pdfBlob == null || !(pdfBlob instanceof Blob)) { return false; }
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
            pageOrientation.value = ((pageCount.value <= 0) ? "" : (pdf.getPage(0).isPortrait ? "Portrait" : "Landscape"));
            pageSize.value = String(pageWidth.value + " × " + pageHeight.value + " in (" + pageOrientation.value + ")");

            const DATE_FORMAT = "M/D/YY, h:mm:ss A";
            const creationDate = pdf.getCreationDate();
            const modificationDate = pdf.getModificationDate();

            dateCreated.value = (creationDate ? dayjs(creationDate).format(DATE_FORMAT) : "");
            dateModified.value = (modificationDate ? dayjs(modificationDate).format(DATE_FORMAT) : "");

            pdfVersion.value = pdf.version;
            fileSize.value = prettyBytes(pdfBlob.size);
            fileSizeInBytes.value = pdfBlob.size;
            
            // Returns true to indicate that the parsing was a success.
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }

    // Sets Hooks that will run the parse function.
    parsePdf();
    watch(objectUrl, () => { parsePdf(); });
    onMountedAdvanced(() => { parsePdf(); });

    return { parsePdf, title, author, subject, dateCreated, dateModified, application, producer, keywords, keywordsAsOne,
        pdfVersion, pageCount, pageCountAsString, pageWidth, pageHeight, pageOrientation, pageSize, fileSize, fileSizeInBytes
    }
}