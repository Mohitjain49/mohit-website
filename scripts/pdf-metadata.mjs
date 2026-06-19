import path from "node:path";
import fs from "node:fs/promises";
import readline from 'node:readline/promises';

import { PDF } from "@libpdf/core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from 'dayjs/plugin/timezone.js';

/** This array contains the arguments that can be passed in for this script. */
const args = process.argv.slice(2);
const numArgs = args.length;

/** This records user input in the terminal so users can choose options as they progress through the function. */
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/** A list of formats that the user can enter in to change the Time Metadata for their PDF. */
const DAYJS_FORMATS = ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'MMMM D, YYYY', 'D-M-YYYY'];
var dayjsPluginsAdded = false;

// Static variables that help set a default state for the script.
const DEFAULT_FILE = "Mohit_Jain_Resume.pdf";
const DEFAULT_DIRECTORY = "./public";
const EDIT_SKIP_STRING = "___skip___";

/**
 * This function checks to see if an argument or list of arguments have been passed into the command.
 * @param {Array<String> | String} commandArgs The argument(s) to check for.
 * @returns The index where the argument has been found.
 */
function findCommandArgument(commandArgs = "") {
    if(typeof commandArgs === "string") { commandArgs = [commandArgs]; }
    const searchResult = args.findIndex((item) => { return (-1 != commandArgs.findIndex((value) => { return (item === value); })); });
    return { index: searchResult, found: (searchResult != -1) }
}

/** This function returns the PDF Object that the script should use. */
async function getPdfObject() {
    var filename = DEFAULT_FILE;
    var directory = DEFAULT_DIRECTORY;

    const filenameArgumentIndex = findCommandArgument(["-f", "--file", "--filename"]).index;
    if(filenameArgumentIndex > -1 && filenameArgumentIndex < args.length - 1) { filename = args[filenameArgumentIndex + 1]; }
    if(!filename.endsWith(".pdf")) { filename = (filename + ".pdf"); }

    const directoryArgumentIndex = findCommandArgument(["-d", "--directory"]).index;
    if(directoryArgumentIndex > -1 && directoryArgumentIndex < args.length - 1) { directory = args[directoryArgumentIndex + 1]; }

    const filePath = path.join(directory, filename);
    const pdfBuffer = await fs.readFile(filePath);
    const pdfObject = await PDF.load(new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength));

    // Returns the PDF Object and its file path.
    return { pdfObject, filePath }
}

/**
 * This function saves a PDF object and edits the file.
 * @param {PDF} pdfObject The PDF Object to read the metadata from.
 * @param {String} filePath The file path to save it at.
 */
async function savePdf(pdfObject = null, filePath = "") {
    if(!pdfObject || !(pdfObject instanceof PDF)) { throw new Error("PDF Object Invalid"); }
    const pdfBytes = await pdfObject.save();
    await fs.writeFile(filePath, pdfBytes);
}

/**
 * This function gets a formatted date to pass in as metadata.
 * @param {String} dateStr The string passed in as user input.
 */
function getFormattedDate(dateStr = "") {
    if(dateStr.toLowerCase() === "today") { return new Date(); }
    if(!dayjsPluginsAdded) {
        dayjs.extend(timezone);
        dayjs.extend(customParseFormat);
        dayjsPluginsAdded = true;
    }

    const dayjsObj = dayjs(dateStr, DAYJS_FORMATS, true);
    if(!dayjsObj.isValid()) { throw new Error("Invalid Date Format."); }
    return dayjsObj.toDate();
}

/** This function runs through the main logic of this script. */
async function main() {
    try {
        const { pdfObject, filePath } = await getPdfObject();
        const metadata = pdfObject.getMetadata();

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

        if(findCommandArgument(["-ro", "--read-only"]).found) { return; }
        console.log("For the following sections, please enter \"" + EDIT_SKIP_STRING +"\" to not set the metadata for that section.\n");

        // Sets the PDF's Title.
        const newTitle = await rl.question("Enter The New Title For Your PDF: ");
        if(newTitle !== EDIT_SKIP_STRING) { pdfObject.setTitle(newTitle, { showInWindowTitleBar: true }); }
        console.log();

        // Sets the PDF's Author.
        const newAuthor = await rl.question("Enter The New Author For Your PDF: ");
        if(newAuthor !== EDIT_SKIP_STRING) { pdfObject.setAuthor(newAuthor); }
        console.log();

        // Sets the PDF's Subject.
        const newSubject = await rl.question("Enter The New Subject For Your PDF: ");
        if(newSubject !== EDIT_SKIP_STRING) { pdfObject.setSubject(newSubject); }
        console.log();

        // Sets the PDF's Keywords.
        const newKeywords = [""];
        newKeywords.splice(0, 1);
        var keyboardInput = "";

        console.log("Enter Keywords Below...");
        while(keyboardInput !== EDIT_SKIP_STRING) {
            keyboardInput = await rl.question("Enter A New Keyword For Your PDF, or \"" + EDIT_SKIP_STRING + "\" to stop: ");
            if(keyboardInput !== EDIT_SKIP_STRING) { newKeywords.push(keyboardInput); }
        }

        if(newKeywords.length > 0) { pdfObject.setKeywords(newKeywords); }
        console.log();

        // Sets the PDF's Creator.
        const newCreator = await rl.question("Enter The New Creator For Your PDF: ");
        if(newSubject !== EDIT_SKIP_STRING) { pdfObject.setCreator(newCreator); }
        console.log();

        // Sets the PDF's Producer.
        const newProducer = await rl.question("Enter The New Producer For Your PDF: ");
        if(newProducer !== EDIT_SKIP_STRING) { pdfObject.setProducer(newProducer); }
        console.log();

        // Sets the PDF's Creation Date.
        var newCreationDate = await rl.question("Enter The New Creation Date For Your PDF: ");
        var newCreationDateValid = false;

        while(!newCreationDateValid) {
            try {
                if(newCreationDate !== EDIT_SKIP_STRING) { newCreationDate = getFormattedDate(newCreationDate); }
                newCreationDateValid = true;
            } catch(e) {
                newCreationDate = await rl.question("\"" + newCreationDate + "\" Is An Invalid Date. Please Enter Another Creation Date For Your PDF: ");
            }
        }

        if(newCreationDate !== EDIT_SKIP_STRING) { pdfObject.setCreationDate(newCreationDate); }
        console.log();

        // Sets the PDF's Last Modified Date.
        var newModificationDate = await rl.question("Enter The New \"Last Modified\" Date For Your PDF: ");
        var newModificationDateValid = false;

        while(!newModificationDateValid) {
            try {
                if(newModificationDate !== EDIT_SKIP_STRING) { newModificationDate = getFormattedDate(newModificationDate); }
                newModificationDateValid = true;
            } catch(e) {
                newModificationDate = await rl.question("\"" + newModificationDate + "\" Is An Invalid Date. Please Enter Another \"Last Modified\" Date For Your PDF: ");
            }
        }

        if(newModificationDate !== EDIT_SKIP_STRING) { pdfObject.setModificationDate(newModificationDate); }
        console.log();

        // Sets the PDF's Trapped Status.
        var newTrapped = await rl.question("Enter The New Trapped Status For Your PDF (True, False, or Unknown): ");
        newTrapped = (newTrapped.charAt(0).toUpperCase() + newTrapped.slice(1));

        while(newTrapped !== "True" && newTrapped !== "False" && newTrapped !== "Unknown" && newTrapped !== EDIT_SKIP_STRING) {
            newTrapped = await rl.question("Invalid Input. Please Enter The New Trapped Status For Your PDF (True, False, or Unknown): ");
            newTrapped = (newTrapped.charAt(0).toUpperCase() + newTrapped.slice(1));
        }
        if(newTrapped !== EDIT_SKIP_STRING) { pdfObject.setTrapped(newTitle); }
        console.log();

        // Sets the PDF's Language.
        var newLanguage = await rl.question("Enter The New Language For Your PDF: ");
        var newLanguageValid = false;

        while(!newLanguageValid) {
            try {
                if(newLanguage !== EDIT_SKIP_STRING) { Intl.getCanonicalLocales(newLanguage); }
                newLanguageValid = true;
            } catch(e) {
                newLanguage = await rl.question("\"" + newLanguage + "\" Is An Invalid Language. Please Enter Another Language For Your PDF: ");
            }
        }

        if(newLanguage !== EDIT_SKIP_STRING) { pdfObject.setLanguage(newLanguage); }
        console.log();

        // Saves the PDF.
        console.log("\nSaving PDF...");
        await savePdf(pdfObject, filePath);
        console.log("PDF Saved!");
        process.exit(0);
    } catch(e) {
        console.log("\n")
        console.error(e);
        process.exit(1);
    }
}

/** This function automatically sets the metadata for my resume. */
async function setResumeMetadata() {
    try {
        // This replaces the arguments with artificial ones that the script should use instead.
        args.splice(0);
        const RESUME_ARGUMENTS = ["-f", "Mohit_Jain_Resume.pdf", "-d", "./public"];
        RESUME_ARGUMENTS.forEach((item) => { args.push(item); });

        // Gets the PDF Object and sets the metadata.
        const { pdfObject, filePath } = await getPdfObject();
        const date = new Date();

        pdfObject.setTitle("Mohit Jain's Resume", { showInWindowTitleBar: true });
        pdfObject.setAuthor("Mohit Jain");
        pdfObject.setSubject("Mohit Jain's Resume");
        pdfObject.setKeywords(["Resume", "Tech Resume"]);
        pdfObject.setCreator("Google Docs");
        pdfObject.setCreationDate(date);
        pdfObject.setModificationDate(date);
        pdfObject.setTrapped("Unknown");
        pdfObject.setLanguage("en-US");

        // Saves the PDF.
        await savePdf(pdfObject, filePath);
        console.log("✅ Resume Metadata Updated!")
        process.exit(0);
    } catch(e) {
        console.log("\n")
        console.error(e);
        console.log();
        process.exit(1);
    }
}

// If a certain argument is passed in, this sets the resume metadata. Otherwise, it runs the main function.
if(findCommandArgument(["-a", "--auto", "-ra", "--resume-auto", "-ar", "--auto-resume"])) {
    await setResumeMetadata();
} else {
    await main();
}