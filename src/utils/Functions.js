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
 * This function reloads the website.
 */
export function reloadPage() {
    window.location.reload();
}

/**
 * This function returns whether or not the app is rendering on the server or not.
 */
export function checkSSR() {
    return import.meta.env.SSR;
}

/**
 * This scrolls to the section the visitor requested.
 * @param {String} id The element ID of the section.
 */
export function goToPageSection(id = "start") {
    const top = (document.getElementById(id).getBoundingClientRect().y + window.scrollY);
    window.scrollTo({ top: top, left: 0, behavior: "smooth" });
}

/**
 * This function cuts a string to ensure it has the max length of characters.
 */
export function truncate(str = "", maxLength = 80) {
    return ((str.length > maxLength) ? (str.substring(0, (maxLength - 3)) + '...') : str);
}