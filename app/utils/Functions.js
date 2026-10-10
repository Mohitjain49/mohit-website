/**
 * This function returns a Font Awesome Icon as a usuable SVG.
 * @param {import('@fortawesome/fontawesome-svg-core').IconDefinition} faIcon The Font Awesome Icon. 
 * @param {String} color The color for the icon.
 */
export function getFontAwesomeSvg(faIcon, color = "#FFFFFF") {
    const [width, height, ligatures, unicode, svgPathData] = faIcon.icon;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 ${width} ${height}" fill="${color}"> 
        <path d="${svgPathData}"></path>
    </svg>`
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * This function is a generic sleep function that lets a function wait before performing the next act.
 * @param {Number} ms The number of milliseconds you want the function to sleep.
 */
export async function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => { resolve(null); }, ms));
}

/** This async function can be used to have a function wait two animation frames before performing its next task. */
export async function waitTwoFrames() {
    return new Promise((resolve) => { requestAnimationFrame(() => { requestAnimationFrame(() => { resolve(null); }); }); });
}

/** This function cuts a string to ensure it has the max length of characters. */
export function truncate(str = "", maxLength = 80) {
    return ((str.length > maxLength) ? (str.substring(0, (maxLength - 3)) + '...') : str);
}

/**
 * This sets the color and border color of an icon.
 * @param {String} color The color to use.
 */
export function getColorStyles(color = "var(--website-text)") {
    return { color, borderColor: color }
}

/** This returns the css inner width. */
export function getMohitInnerWidth() {
    if(!import.meta.client || !document) { return 0; }
    const element = document.getElementById("invisible-css-layout");
    return (element == null ? 0 : (element.clientWidth + (window.innerWidth - document.documentElement.clientWidth)));
}

/** This returns the css inner height. */
export function getMohitInnerHeight() {
    if(!import.meta.client || !document) { return 0; }
    const element = document.getElementById("invisible-css-layout");
    return (element == null ? 0 : (element.clientHeight + (window.innerHeight - document.documentElement.clientHeight)));
}

/**
 * This function removes all animation classes from a specific element.
 * @param {HTMLElement} element The element to remove the classes from.
 */
export function removeAnimationClasses(element = null) {
    if(!element) { return; }
    const elementClassList = Array.from(element.classList);
    
    for(let i = 0; i < elementClassList.length; i++) {
        const className = elementClassList[i];
        if(className.startsWith("animate__")) { element.classList.remove(className); }
    }
}

/**
 * This function returns an 2D array of "slots" where each slot should hold a Promise.
 * Each slot represents the promise each number should carry out. For instance [0][0] has the number "1" for the first promise.
 * @param {Number} totalPromises The total number of promises for the 2D Array.
 * @param {Number} maxPromisesPerArray The total number of promises that should be run at once.
 */
export function create2dPromiseArray(totalPromises = 1, maxPromisesPerArray = DOCUMENT_RENDER_TASK_PARTITION_SIZE) {
    /** @type {Array<Array<Number>>} A 2D Array of numbers representing the promise each should complete. */
    const pageRenderPromises = [];
    const numPromiseArrays = Math.ceil(totalPromises / maxPromisesPerArray);
    const numPromisesPerArray = Math.floor(totalPromises / numPromiseArrays);

    var numPromisesRemainder = (totalPromises % numPromiseArrays);
    var pagesAccountedFor = 0;

    // This divides the tasks into separate arrays to ensure the website does not crash or something.
    for(let i = 0; i < numPromiseArrays; i++) {
        const length = (numPromisesPerArray + ((numPromisesRemainder > 0) ? 1 : 0));
        const tempPromiseArray = Array.from({ length }, (_, j) => { return (j + 1 + pagesAccountedFor) });

        pageRenderPromises.push(tempPromiseArray);
        pagesAccountedFor += length;
        numPromisesRemainder--;
    }

    // Returns the 2D Array.
    return pageRenderPromises;
}

/**
 * This function creates an Iframe for printing out a document.
 * @param {Object} params A set of parameters for creating the new iframe.
 * @param {String} params.id The ID of the iframe.
 * @param {"src" | "srcdoc" | "none"} params.attribute An attribute to set before appending the document to the DOM.
 * @param {String} params.value The value to fill into the specified parameter attribute.
 * @param {AbortSignal} params.signal An optional abort signal that can be used to abort loading the iframe.
 */
export async function createIFrameForPrint(params = { id: "", attribute: "none", value: "", signal: null }) {
    if(!import.meta.client) { return null; }
    if(!params) { params = { id: "", attribute: "src", value: "", signal: null }; }

    if(!params.id || typeof params.id !== "string") { params.id = ""; }
    if(!params.attribute || typeof params.attribute !== "string") { params.attribute = "none"; }
    if(!params.value || typeof params.attribute !== "string") { params.value = ""; }
    if(!params.signal || !(params.signal instanceof AbortSignal)) { params.signal = null; }

    const printIFrame = document.createElement("iframe");
    if(params.id !== "") {
        printIFrame.id = params.id;
        printIFrame.classList.add(params.id);
        await waitTwoFrames();
    }

    if(params.attribute === "src") {
        printIFrame.src = params.value;
        await waitTwoFrames();
    } else if(params.attribute === "srcdoc") {
        printIFrame.srcdoc = params.value;
        await waitTwoFrames();
    }

    /** This returns whether loading the IFrame has been aborted or not. */
    function renderAborted() { return (params.signal ? params.signal.aborted : false); }

    // This waits for the IFrame to be loaded in before giving it to the print action.
    await new Promise(async (resolve, reject) => {
        if(renderAborted()) { return resolve("Aborted"); }
        document.body.append(printIFrame);

        const tempIframeDocument = (printIFrame.contentDocument || printIFrame.contentWindow?.document);
        if(!tempIframeDocument) { return reject("IFrame DOM Does Not Exist."); }
        if(tempIframeDocument.readyState === "complete") { return resolve("IFrame Loaded"); }

        var msPassed = 0;
        var resolved = 0;

        printIFrame.onload(() => {
            resolved = 1;
            resolve("IFrame Loaded");
        });
        printIFrame.onerror(() => {
            resolved = 2;
            if(renderAborted()) {
                resolve("Aborted");
            } else {
                reject("Error Loading IFrame");
            }
        });

        while(msPassed < 7000 && resolved == 0 && !renderAborted()) {
            await sleep(50);
            msPassed += 50;
        }

        if(resolved == 1 || tempIframeDocument.readyState === "complete" || renderAborted()) {
            resolve();
        } else if(resolved == 0) {
            reject(new Error("Timeout Error"));
        }
    });

    // This returns the now fully appended IFrame that is ready to be printed.
    return (renderAborted() ? null : printIFrame);
}

/**
 * This function can be used to wait for an image to be loaded into the DOM before continuing with other tasks.
 * @param {HTMLImageElement} imageEl The Image Element to be loaded into the DOM.
 * @param {Number} timeout The amount of time in milliseconds to wait before passing in a timeout error (Default is 7000).
 * @param {AbortSignal} signal An optional signal that can be used to abort the process if necessary.
 */
export async function waitForImageLoad(imageEl = null, timeout = 7000, signal = null) {
    /** This function checks if the waiting for the image to load is aborted or not. */
    function imageLoadAborted() { return ((signal == null || !(signal instanceof AbortSignal)) ? false : signal.aborted); }
    
    await new Promise(async (resolve, reject) => {
        if(!imageEl || imageEl.tagName !== "IMG") { return reject(new Error("Image Not Passed In")); }
        if(imageEl.complete || imageLoadAborted()) { return resolve(); }

        var msPassed = 0;
        var resolved = 0;

        imageEl.onload = () => {
            resolved = 1;
            resolve();
        }
        imageEl.onerror = () => {
            resolved = 2;
            if(renderAborted()) {
                resolve();
            } else {
                reject(new Error("Error Loading Image"));
            }
        }

        while(msPassed < timeout && resolved == 0 && !imageLoadAborted()) {
            await sleep(50);
            msPassed += 50;
        }

        if(resolved == 1 || imageEl.complete || imageLoadAborted()) {
            resolve();
        } else if(resolved == 0) {
            reject(new Error("Timeout Error"));
        }
    });
}