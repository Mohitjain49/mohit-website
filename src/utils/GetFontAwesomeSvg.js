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