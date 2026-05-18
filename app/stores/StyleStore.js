/** This store manages everything related to dynamically changing the styles of the website with JavaScript. */
export const useStyleStore = defineStore("style-store", () => {
    const ZOOM_CSS_PROPERTY = "--webpage-zoom-factor";
    const TRUE_100VH_CSS_PROPERTY = "--true-100vh";

    const fullScreenStore = useFullScreenStore();
    const fullScreenSet = getFullScreenSet();
    const { height: vHeight } = useWindowSize();

    /** @type {MutationObserver} This observer is designed to read any changes that occur to the document element's CSS Variables. */
    var cssVarObserver = null;

    /** @type {AbortController} This abort controller is designed to properly disable this pinia store's resize event listener. */
    var styleController = null;

    const mounted = ref(false);
    const breakpointsEnabled = ref(false);
    const zoomFactor = ref(1.0);

    const hideOverflowArray = ref([false, false, false, false]);
    const hideCursorArray = ref([false, false]);
    const disableUserSelectArray = ref([false, false]);

    const hideOverflow = computed(() => { return (-1 != hideOverflowArray.value.findIndex((item) => { return item; })); });
    const hideCursor = computed(() => { return (-1 != hideCursorArray.value.findIndex((item) => { return item; })); });
    const disableUserSelect = computed(() => { return (-1 != disableUserSelectArray.value.findIndex((item) => { return item; })); });

    // This watcher manages hiding or enabling the document overflow if a website component needs it.
    watch(hideOverflow, (newValue) => { setHideOverflowClass(newValue); });

    // This watcher manages hiding or showing the website cursor if a website component needs it.
    watch(hideCursor, (newValue) => { setHideCursorClass(newValue); });

    // This watcher manages disabling and enabling user select across the website if a component needs it.
    watch(disableUserSelect, (newValue) => { setDisableUserSelectClass(newValue); });
    watch(fullScreenSet, () => { setDisableUserSelectClass(disableUserSelect.value); });

    // This changes the Zoom CSS Property for the webpage when the viewport height changes properly.
    watch(vHeight, (newValue) => {
        changeZoomFactor(((newValue > 450) ? 1.0 : 0.5));
        setTrue100vh(newValue, zoomFactor.value);
    });

    /** This function returns whether the website is able to use client-only features like the DOM. */
    function validateClientMode() { return (import.meta.client && document && document.documentElement); }

    /** This function mounts the style store to ensure it is ready to use. */
    async function mountStyleStore() {
        if(mounted.value) { return; }
        await nextTick();

        const windowHeight = window.innerHeight;
        const startZoomFactor = ((windowHeight > 450) ? 1.0 : 0.55);

        setTrue100vh(windowHeight, startZoomFactor);
        changeZoomFactor(startZoomFactor);
        await enableBreakpoints();

        if(validateClientMode()) { document.documentElement.classList.add("js__active"); }
        mounted.value = true;
    }

    /**
     * This function changes the zoom factor for the webpage.
     * @param {Number} newFactor This is the new zoom factor for the webpage.
     */
    function changeZoomFactor(newFactor = 1.0) {
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

    /**
     * -------------------------------------------------------------------------------------------------
     * These functions are responsible for setting certain styles that are universal across the website.
     * -------------------------------------------------------------------------------------------------
     */

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
     * This function sets whether or not a specific element needs the website cursor to be hidden.
     * @param {Number} index The specific field to set for the array.
     * @param {Boolean} status The status of whether or not to hide the website cursor.
     */
    function setHideCursorArray(index = 0, status = false) {
        if(index < 0 || index >= hideCursorArray.value.length) { return; }
        if(typeof status !== "boolean") { return; }
        hideCursorArray.value[index] = status;
    }

    /**
     * This function sets whether or not a specific element needs to disable user select.
     * @param {Number} index The specific field to set for the array.
     * @param {Boolean} status The status of whether or not to disable user select.
     */
    function setDisableUserSelectArray(index = 0, status = false) {
        if(index < 0 || index >= disableUserSelectArray.value.length) { return; }
        if(typeof status !== "boolean") { return; }
        disableUserSelectArray.value[index] = status;
    }

    /**
     * This function sets a class for the document element that hides the webpage overflow.
     * @param {Boolean} hide If true, it hides the overflow, else it enables it.
     */
    function setHideOverflowClass(hide = false) {
        if(!validateClientMode()) { return; }
        if(hide) {
            document.documentElement.classList.add('hide-overflow');
        } else {
            document.documentElement.classList.remove('hide-overflow');
        }
    }

    /**
     * This function sets a class for the document element that hides the webpage cursor.
     * @param {Boolean} hide If true, it hides the cursor, else it enables it.
     */
    function setHideCursorClass(hide = false) {
        if(!validateClientMode()) { return; }
        if(hide) {
            document.documentElement.classList.add('hide-cursor');
        } else {
            document.documentElement.classList.remove('hide-cursor');
        }
    }

    /**
     * This function sets a class for the document body that disables the user from selecting text, images, etc.
     * @param {Boolean} hide If true, it disables user select, else it enables it.
     */
    function setDisableUserSelectClass(hide = false) {
        if(!validateClientMode()) { return; }
        if(hide) {
            document.body.classList.add('disable-user-select');
            if(fullScreenSet.value) { fullScreenStore.element.classList.add('disable-user-select'); }
        } else {
            document.body.classList.remove('disable-user-select');
            if(fullScreenSet.value) { fullScreenStore.element.classList.remove('disable-user-select'); }
        }

        if(!fullScreenSet.value && fullScreenStore.oldElement != null) {
            fullScreenStore.oldElement.classList.remove('disable-user-select');
        }
    }

    /**
     * ----------------------------------------------------------------------------------------
     * These function are specifically made for setting the dynamic breakpoints on the website.
     * ----------------------------------------------------------------------------------------
     */

    /** This function enables the website's dynamic breakpoints. */
    async function enableBreakpoints() {
        if(breakpointsEnabled.value) { return; }
        await setDynamicBreakpointsEventListener();
        breakpointsEnabled.value = true;
    }

    /** This function disables the website's dynamic breakpoints. */
    function disableBreakpoints() {
        if(!breakpointsEnabled.value) { return; }
        if(styleController != null) { styleController.abort(); }
        if(cssVarObserver != null) { cssVarObserver.disconnect(); }

        styleController = null;
        cssVarObserver = null;
        breakpointsEnabled.value = false;
    }

    /** This function runs the disableBreakpoints and then the enableBreakpoints function. */
    async function resetBreakpoints() {
        disableBreakpoints();
        await enableBreakpoints();
    }

    /** This sets the resize event listener that sets all the breakpoint attributes for the website's document element. */
    async function setDynamicBreakpointsEventListener() {
        if(styleController != null) { styleController.abort(); }
        if(cssVarObserver != null) { cssVarObserver.disconnect(); }
        styleController = new AbortController();

        await nextTick();
        await sleep(10);
        if(!validateClientMode()) { return; }

        const signal = styleController.signal;
        window.addEventListener("resize", () => { setDynamicBreakpoints(); }, { signal });
        window.addEventListener("orientationchange", () => { setDynamicBreakpoints(); }, { signal });
        document.addEventListener("fullscreenchange", () => { setDynamicBreakpoints }, { signal });

        cssVarObserver = new MutationObserver(() => { setDynamicBreakpoints(); });
        cssVarObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

        await sleep(50);
        setDynamicBreakpoints();
    }

    /** This function sets breakpoints on the website as attributes for the website's document element based on the window's dimensions. */
    function setDynamicBreakpoints() {
        if(!validateClientMode()) { return; }
        const htmlDocumentElement = document.documentElement;
        const htmlStyles = getComputedStyle(htmlDocumentElement);

        const lessEqualWidthVars = [-1];
        const greaterEqualWidthVars = [-1];
        const lessEqualHeightVars = [-1];
        const greaterEqualHeightVars = [-1];

        const scalar = zoomFactor.value;
        var windowWidth = (window.innerWidth / scalar);
        var windowHeight = (window.innerHeight / scalar);
        
        for(let i = 0; i < htmlStyles.length; i++) {
            const property = htmlStyles.item(i);
            if(property.startsWith("--less-equal-width-bp")) {
                lessEqualWidthVars.push(htmlStyles.getPropertyValue(property));
            } else if(property.startsWith("--greater-equal-width-bp")) {
                greaterEqualWidthVars.push(htmlStyles.getPropertyValue(property));
            } else if(property.startsWith("--less-equal-height-bp")) {
                lessEqualHeightVars.push(htmlStyles.getPropertyValue(property));
            } else if(property.startsWith("--greater-equal-height-bp")) {
                greaterEqualHeightVars.push(htmlStyles.getPropertyValue(property));
            }
        }

        // This sets the attributes to mimic the "max-width" media rule.
        for(let j = 1; j < lessEqualWidthVars.length; j++) {
            const dimensionNum = lessEqualWidthVars[j];
            const dimensionAttribute = ("less-equal-width-bp-" + String(dimensionNum));

            if(dimensionNum >= windowWidth) {
                htmlDocumentElement.setAttribute(dimensionAttribute, "");
            } else {
                htmlDocumentElement.removeAttribute(dimensionAttribute);
            }
        }

        // This sets the attributes to mimic the "min-width" media rule.
        for(let j = 1; j < greaterEqualWidthVars.length; j++) {
            const dimensionNum = greaterEqualWidthVars[j];
            const dimensionAttribute = ("greater-equal-width-bp-" + String(dimensionNum));

            if(dimensionNum <= windowWidth) {
                htmlDocumentElement.setAttribute(dimensionAttribute, "");
            } else {
                htmlDocumentElement.removeAttribute(dimensionAttribute);
            }
        }

        // This sets the attributes to mimic the "max-height" media rule.
        for(let j = 1; j < lessEqualHeightVars.length; j++) {
            const dimensionNum = lessEqualHeightVars[j];
            const dimensionAttribute = ("less-equal-height-bp-" + String(dimensionNum));

            if(dimensionNum >= windowHeight) {
                htmlDocumentElement.setAttribute(dimensionAttribute, "");
            } else {
                htmlDocumentElement.removeAttribute(dimensionAttribute);
            }
        }

        // This sets the attributes to mimic the "min-height" media rule.
        for(let j = 1; j < greaterEqualHeightVars.length; j++) {
            const dimensionNum = greaterEqualHeightVars[j];
            const dimensionAttribute = ("greater-equal-height-bp-" + String(dimensionNum));

            if(dimensionNum <= windowHeight) {
                htmlDocumentElement.setAttribute(dimensionAttribute, "");
            } else {
                htmlDocumentElement.removeAttribute(dimensionAttribute);
            }
        }
    }

    return { mounted, hideOverflow, hideCursor, disableUserSelect, zoomFactor, breakpointsEnabled,
        mountStyleStore, setHideOverflowArray, setHideCursorArray, setDisableUserSelectArray,
        enableBreakpoints, disableBreakpoints, resetBreakpoints
    }
});

/** This function returns a computed variable of the zoom factor implemeneted by the website. */
export function getCurrentZoomFactor() {
    const { zoomFactor } = storeToRefs(useStyleStore());
    return computed(() => { return zoomFactor.value; });
}