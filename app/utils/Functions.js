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
    return (element == null ? 0 : element.clientWidth);
}

/** This returns the css inner height. */
export function getMohitInnerHeight() {
    if(!import.meta.client || !document) { return 0; }
    const element = document.getElementById("invisible-css-layout");
    return (element == null ? 0 : element.clientHeight);
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