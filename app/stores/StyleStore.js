/** This store manages everything related to dynamically changing the styles of the website with JavaScript. */
export const useStyleStore = defineStore("style-store", () => {
    const ZOOM_CSS_PROPERTY = "--webpage-zoom-factor";
    const TRUE_100VH_CSS_PROPERTY = "--true-100vh";

    const { height: vHeight } = useWindowSize();
    const mounted = ref(false);
    const zoomFactor = ref(1.0);

    const hideOverflowArray = ref([false, false, false]);
    const hideOverflow = computed(() => { return (-1 != hideOverflowArray.value.findIndex((item) => { return item; })); });

    // This manages the document overflow. If any website component needs the overflow css property to be set to hidden,
    // this watch function does that.
    watch(hideOverflow, (newValue) => {
        if(!validateClientMode()) { return; }
        document.documentElement.style.overflow = (newValue ? "hidden" : "");
    });

    // This changes the Zoom CSS Property for the webpage when the viewport height changes properly.
    watch(vHeight, (newValue) => {
        changeZoomFactor(((newValue > 450) ? 1.0 : 0.55));
        setTrue100vh(newValue, zoomFactor.value);
    });

    /** This function mounts the style store to ensure it is ready to use. */
    function mountStyleStore() {
        if(mounted.value) { return; }
        mounted.value = true;

        nextTick(() => {
            const windowHeight = window.innerHeight;
            const startZoomFactor = ((windowHeight > 450) ? 1.0 : 0.55);

            setTrue100vh(windowHeight, startZoomFactor);
            changeZoomFactor(startZoomFactor);
        });
    }

    /**
     * This function sets whether or not a specific element needs the webpage overflow to be hidden.
     * @param {Number} index The specific field to set for the array. 
     * @param {Boolean} status The status of whether or not to hide the webpage overflow.
     */
    function setHideOverflowArray(index = 0, status = false) {
        if(index < 0 || index >= hideOverflowArray.value.length) { return; }
        if(typeof status !== "boolean") { return; }
        hideOverflowArray.value[index] = status;
    }

    /**
     * This function changes the zoom factor for the webpage.
     * @param {Number} newFactor This is the new zoom factor for the webpage.
     * @param {Number} oldFactor This is the old zoom factor to reverse changes for the webpage.
     */
    function changeZoomFactor(newFactor = 1.0, oldFactor = 1.0) {
        if(!validateClientMode()) { return; }
        document.documentElement.style.setProperty(ZOOM_CSS_PROPERTY, newFactor);
        zoomFactor.value = newFactor;
    }

    /**
     * This function sets the "true" 100% viewport height of the screen in pixels.
     * @param {Number} vHeight The new viewport height.
     * @param {Number} zoomFactor The zoom factor to divide the viewport height by.
     */
    function setTrue100vh(vHeight = 0, zoomFactor = 1.0) {
        if(!validateClientMode()) { return; }
        const vhNum = (Math.round((vHeight * 100) / zoomFactor) / 100);
        document.documentElement.style.setProperty(TRUE_100VH_CSS_PROPERTY, (String(vhNum) + "px"));
    }

    /** This function returns whether the website is able to use client-only features like the DOM. */
    function validateClientMode() { return (import.meta.client && document && document.documentElement); }

    return { mounted, hideOverflow, zoomFactor, mountStyleStore, setHideOverflowArray }
});

/** This function returns a computed variable of the zoom factor implemeneted by the website. */
export function getCurrentZoomFactor() {
    const { zoomFactor } = storeToRefs(useStyleStore());
    return computed(() => { return zoomFactor.value; });
}