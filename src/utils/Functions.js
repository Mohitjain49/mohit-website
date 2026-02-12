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
 * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
 */
export function goToPageSection(id = "start", offset = 0) {
    const top = (document.getElementById(id).getBoundingClientRect().y + window.scrollY - offset);
    window.scrollTo({ top: top, left: 0, behavior: "smooth" });
}

/**
 * This function cuts a string to ensure it has the max length of characters.
 */
export function truncate(str = "", maxLength = 80) {
    return ((str.length > maxLength) ? (str.substring(0, (maxLength - 3)) + '...') : str);
}

/**
 * This function returns how much an element has scrolled from its starting point to its end both horizontally and vertically.
 * @param {String} elementId The id of the element.
 */
export function useScrollPercentage(elementId = "") {
    var animationFrame = null;
    const horizontal = ref(0);
    const vertical = ref(0);
    const active = ref(false);

    /** A simple object that can be used by custom scrollbars. */
    const scrollbarStyle = computed(() => {
        return { height: (vertical.value + "%"), width: (horizontal.value + "%") }
    });

    /** This function calculates both the horizontal and vertical percentages. */
    function calculate() {
        if(!document || !document.getElementById) { return; }
        const element = document.getElementById(elementId);
        if(element == null) { return; }

        // This section calculates the scroll percentage from the element. 
        vertical.value = element.scrollTop / (element.scrollHeight - element.clientHeight);
        horizontal.value = element.scrollLeft / (element.scrollWidth - element.clientWidth);

        // This section simplifies the calculations into "clean" numbers for other JS code.
        vertical.value = (Number.isNaN(vertical.value) ? 100 : (Math.round(vertical.value * 10000) / 100));
        horizontal.value = (Number.isNaN(horizontal.value) ? 100 : (Math.round(horizontal.value * 10000) / 100));
        return { horizontal: horizontal.value, vertical: vertical.value }
    }

    /** This function is used by the start function to call the "calculate" function repeatedly. */
    function calculateWithAnimation() {
        calculate();
        animationFrame = requestAnimationFrame(() => { calculateWithAnimation(); });
    }

    /** This starts the animation frame loop to calculate the scroll percentages. */
    function start() {
        if(animationFrame != null || active.value) { return; }
        active.value = true;
        animationFrame = requestAnimationFrame(() => { calculateWithAnimation(); });
    }

    /** This stops the animation frame loop. */
    function stop() {
        if(animationFrame == null || !active.value) { return; }
        active.value = false;
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }

    /** This toggles whether the animation frame loop is running or not. */
    function toggle() {
        if(active.value) { stop(); } else { start(); }
    }

    // This mounts and unmounts the necessary event listeners for this utility.
    onMounted(() => { nextTick().then(() => { calculate(); start(); }); });
    onBeforeUnmount(() => { stop(); });
    return { horizontal, vertical, scrollbarStyle, calculate, start, stop, toggle }
}