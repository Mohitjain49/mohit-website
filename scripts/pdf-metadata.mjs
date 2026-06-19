import path from "node:path";
import fs from "node:fs/promises";
import { PDF } from "@libpdf/core";

/** This array contains the arguments that can be passed in for this script. */
const args = process.argv.slice(2);

const DEFAULT_FILE = "Mohit_Jain_Resume.pdf";
const DEFAULT_DIRECTORY = "./public";

/** This function returns the PDF Object that the script should use. */
async function getPdfObject() {
    var filename = DEFAULT_FILE;
    var directory = DEFAULT_DIRECTORY;

    const filenameArgumentIndex = args.findIndex((item) => { return (item === "-f" || item === "--file" || item === "--filename"); });
    if(filenameArgumentIndex > -1 && filenameArgumentIndex < args.length - 1) { filename = args[filenameArgumentIndex + 1]; }

    const directoryArgumentIndex = args.findIndex((item) => { return (item === "-d" || item === "--directory"); });
    if(directoryArgumentIndex > -1 && directoryArgumentIndex < args.length - 1) { directory = args[directoryArgumentIndex + 1]; }

    const pdfBuffer = await fs.readFile(path.join(directory, filename));
    const pdfUInt8Array = new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength);
    return await PDF.load(pdfUInt8Array);
}

/**
 * This function reads and logs the metadata of a PDF.
 * @param {PDF} pdfObject The PDF Object to read the metadata from.
 * @param {Boolean} logData Logd the data on the console if true.
 */
function readMetadata(pdfObject = null, logData = true) {
    if(!pdfObject) { throw new Error("PDF Object Invalid"); }
    const metadata = pdfObject.getMetadata();

    if(logData) {
        console.log("Title:\t\t\t", metadata.title);
        console.log("Author:\t\t\t", metadata.author);
        console.log("Subject:\t\t", metadata.subject);
        console.log("Keywords:\t\t", metadata.keywords);
        console.log("Creator:\t\t", metadata.creator);
        console.log("Producer:\t\t", metadata.producer);
        console.log("Creation Date:\t\t", metadata.creationDate);
        console.log("Last Modified Date:\t", metadata.modificationDate);
        console.log("Trapped:\t\t", metadata.trapped);
        console.log("Language:\t\t", metadata.language);
        console.log("\n\n");
    }

    // Returns the metadata to the main function.
    return metadata;
}

/** This function runs through the main logic of this script. */
async function main() {
    const pdfObject = await getPdfObject();
    readMetadata(pdfObject, true);
}

// Runs the main function.
await main();