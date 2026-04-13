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
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * This function reloads the website.
 */
export function reloadPage() {
    window.location.reload();
}

/**
 * This function returns whether or not the app is rendering on the server or not.
 */
export function checkSSR() {
    return import.meta.server;
}

/**
 * This function cuts a string to ensure it has the max length of characters.
 */
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