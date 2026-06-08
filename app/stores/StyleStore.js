/** This store manages everything related to dynamically changing the styles of the website with JavaScript. */
export const useStyleStore = defineStore("style-store", () => {
    const ZOOM_CSS_PROPERTY = "--webpage-zoom-factor";
    const TRUE_100VH_CSS_PROPERTY = "--true-100vh";
    const TRUE_100VW_CSS_PROPERTY = "--true-100vw";
    const CSS_LAYOUT_ID = "invisible-css-layout";
    var windowSizeAnimationFrame = null;

    const fullScreenStore = useFullScreenStore();
    const fullScreenSet = getFullScreenSet();

    const viewportRafEnabled = shallowRef(false);
    const viewportWidth = shallowRef(Number.POSITIVE_INFINITY);
    const viewportHeight = shallowRef(Number.POSITIVE_INFINITY);

    const cssViewportWidth = shallowRef(Number.POSITIVE_INFINITY);
    const cssViewportHeight = shallowRef(Number.POSITIVE_INFINITY);
    const cssToWindowWidthRatio = shallowRef(1.0);
    const cssToWindowHeightRatio = shallowRef(1.0);

    const mouseX = shallowRef(0);
    const mouseY = shallowRef(0);

    /** @type {MutationObserver} This observer is designed to read any changes that occur to the document element's CSS Variables. */
    var cssVarObserver = null;

    /** @type {MutationObserver} This observer is designed to read any changes that occur to the element that records the website's true CSS viewport dimensions. */
    var cssLayoutElementObserver = null;

    /** @type {AbortController} This abort controller is designed to properly disable the dynamic breakpoints' event listeners. */
    var breakpointsAbortController = null;

    /** @type {AbortController} This abort controller is designed to properly disable the viewport variables' event listeners. */
    var trueViewportVariablesController = null;

    /** @type {AbortController} This abort controller is designed to properly disable the mouse position event listeners. */
    var mousePositionController = null;

    const mounted = ref(false);
    const zoomFactor = ref(1.0);

    const breakpointsEnabled = ref(false);
    const cssLayoutObserverEnabled = ref(false);
    const trueViewportVariablesEnabled = ref(false);
    const mousePositionRecorderEnabled = ref(false);

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
    watch(viewportHeight, (newValue) => { changeZoomFactor(((newValue > 450) ? 1.0 : 0.5)); });

    /** This function returns whether the website is able to use client-only features like the DOM. */
    function validateClientMode() { return (import.meta.client && document && document.documentElement); }

    /** This function mounts the style store to ensure it is ready to use. */
    async function mountStyleStore() {
        if(mounted.value) { return; }
        await nextTick();

        changeZoomFactor((window.innerHeight > 450) ? 1.0 : 0.5);
        startViewportRaf();

        await enableCssLayoutObserver();
        await enableBreakpoints();
        await enableTrueViewportVariables();
        await enableMousePositionRecorder();

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
            window.getSelection()?.removeAllRanges();
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
     * ------------------------------------------------------------------------------------------------------------------------
     * These functions manage a mutation observer that regenerates a specific element that records the CSS viewport dimensions.
     * ------------------------------------------------------------------------------------------------------------------------
     */

    /** This function regenerates the CSS Layout Element should it be removed externally. */
    async function regenerateCssLayoutElement() {
        if(!validateClientMode()) { return; }
        const cssLayoutElement = document.getElementById(CSS_LAYOUT_ID);
        if(cssLayoutElement != null && cssLayoutElement.isConnected) { return; }

        const newCssLayoutElement = document.createElement("div");
        newCssLayoutElement.id = CSS_LAYOUT_ID;

        document.body.appendChild(newCssLayoutElement);
        recordViewportDimensions();
        await resetCssLayoutObserver();
    }

    /** This function enables the mutation observer that observes changes to the CSS Layout Element. */
    async function enableCssLayoutObserver() {
        if(cssLayoutObserverEnabled.value) { return; }
        var cssLayoutElement = document.getElementById(CSS_LAYOUT_ID);
        
        if(cssLayoutElement == null) {
            regenerateCssLayoutElement();
            cssLayoutElement = document.getElementById(CSS_LAYOUT_ID);
            if(cssLayoutElement == null) { throw new Error("CSS Layout Element Does Not Exist."); }
        }

        await nextTick();
        await sleep(10);
        if(!validateClientMode()) { return; }

        if(cssLayoutElementObserver != null) { cssLayoutElementObserver.disconnect(); }
        cssLayoutElementObserver = new MutationObserver(() => { regenerateCssLayoutElement(); });

        const cssLayoutParentElement = cssLayoutElement.parentElement;
        cssLayoutElementObserver.observe(cssLayoutParentElement, { childList: true });
        cssLayoutObserverEnabled.value = true;
    }

    /** This function disables the mutation observer that observes changes to the CSS Layout Element. */
    function disableCssLayoutObserver() {
        if(!cssLayoutObserverEnabled.value) { return; }
        if(cssLayoutElementObserver != null) { cssLayoutElementObserver.disconnect(); }

        cssLayoutElementObserver = null;
        cssLayoutObserverEnabled.value = false;
    }

    /** This function runs the disable and then the enable function for the CSS Layout Observer element. */
    async function resetCssLayoutObserver() {
        disableCssLayoutObserver();
        await enableCssLayoutObserver();
    }

    /**
     * -----------------------------------------------------------------------------------------------------------
     * These functions manage an animation frame loop that records the JS and CSS viewport inner width and height.
     * -----------------------------------------------------------------------------------------------------------
     */

    /** This function records the viewports' inner width and inner height (its dimensions). */
    function recordViewportDimensions() {
        if(!window) { return; }
        const oldViewportWidth = viewportWidth.value;
        const oldViewportHeight = viewportHeight.value;

        viewportWidth.value = window.innerWidth;
        viewportHeight.value = window.innerHeight;

        if(viewportWidth.value !== oldViewportWidth || viewportHeight.value !== oldViewportHeight) {
            window.dispatchEvent(new Event("animation-resize", { cancelable: false }));
        }

        if(!document || !document.getElementById) { return; }
        const cssLayoutElement = document.getElementById(CSS_LAYOUT_ID);
        if(!cssLayoutElement) { return; }

        const oldCssViewportWidth = cssViewportWidth.value;
        const oldCssViewportHeight = cssViewportHeight.value;

        cssViewportWidth.value = cssLayoutElement.clientWidth;
        cssViewportHeight.value = cssLayoutElement.clientHeight;
        cssToWindowWidthRatio.value = (cssViewportWidth.value / viewportWidth.value);
        cssToWindowHeightRatio.value = (cssViewportHeight.value / viewportHeight.value);

        if(cssViewportWidth.value !== oldCssViewportWidth || cssViewportHeight.value !== oldCssViewportHeight) {
            window.dispatchEvent(new Event("animation-resize", { cancelable: false }));
        }
    }

    /** This function records the viewport's dimensions and sets the animation frame loop. */
    function recordViewportDimensionsWithRaf() {
        recordViewportDimensions();
        windowSizeAnimationFrame = requestAnimationFrame(() => { recordViewportDimensionsWithRaf(); });
    }

    /** This function starts the animation frame loop that records the viewport's dimensions. */
    function startViewportRaf() {
        if(viewportRafEnabled.value) { return; }
        if(windowSizeAnimationFrame != null) { cancelAnimationFrame(windowSizeAnimationFrame); }
        viewportRafEnabled.value = true;
        recordViewportDimensionsWithRaf();
    }

    /** This function stops the animation frame loop that records the viewport's dimensions. */
    function stopViewportRaf() {
        if(!viewportRafEnabled.value) { return; }
        if(windowSizeAnimationFrame != null) { cancelAnimationFrame(windowSizeAnimationFrame); }
        windowSizeAnimationFrame = null;
        viewportRafEnabled.value = false;
    }

    /**
     * ----------------------------------------------------------------------------------
     * These functions are specifically made for setting the true viewport CSS variables.
     * ----------------------------------------------------------------------------------
     */

    /** This function enables the "true viewport" variables for the CSS to use. */
    async function enableTrueViewportVariables() {
        if(trueViewportVariablesEnabled.value) { return; }
        await setTrueViewportVariablesEventListener();
        trueViewportVariablesEnabled.value = true;
    }

    /** This function disables the website's dynamic breakpoints. */
    function disableTrueViewportVariables() {
        if(!trueViewportVariablesEnabled.value) { return; }
        if(trueViewportVariablesController != null) { trueViewportVariablesController.abort(); }

        trueViewportVariablesController = null;
        unsetTrueViewportVariables();
        trueViewportVariablesEnabled.value = false;
    }

    /** This function runs the disableTrueViewportVariables and then the enableTrueViewportVariables function. */
    async function resetTrueViewportVariables() {
        disableTrueViewportVariables();
        await enableTrueViewportVariables();
    }

    /** This function sets all the event listeners for the true viewport CSS variables so that they are set as the window changes. */
    async function setTrueViewportVariablesEventListener() {
        if(trueViewportVariablesController != null) { trueViewportVariablesController.abort(); }
        trueViewportVariablesController = new AbortController();

        await nextTick();
        await sleep(10);
        if(!validateClientMode()) { return; }

        const signal = trueViewportVariablesController.signal;
        window.addEventListener("animation-resize", () => { setTrueViewportVariables(); }, { signal });
        window.addEventListener("router-before-change", () => { setTrueViewportVariables(); }, { signal });
        window.addEventListener("router-after-change", () => { setTrueViewportVariables(); }, { signal });

        await sleep(50);
        setTrueViewportVariables();
    }

    /** This function sets the true viewport CSS variables. */
    function setTrueViewportVariables() {
        if(!validateClientMode()) { return; }
        const vhNum = (Math.round(cssViewportHeight.value * 100) / 100);
        const vwNum = (Math.round(cssViewportWidth.value * 100) / 100);

        document.documentElement.style.setProperty(TRUE_100VH_CSS_PROPERTY, (String(vhNum) + "px"));
        document.documentElement.style.setProperty(TRUE_100VW_CSS_PROPERTY, (String(vwNum) + "px"));
    }

    /** This function unsets the true viewport CSS variables and reverts them back to the css viewport values. */
    function unsetTrueViewportVariables() {
        if(!validateClientMode()) { return; }
        document.documentElement.style.setProperty(TRUE_100VH_CSS_PROPERTY, "100vh");
        document.documentElement.style.setProperty(TRUE_100VW_CSS_PROPERTY, "100vw");
    }

    /**
     * ---------------------------------------------------------------------------------------
     * These functions are specifically made for properly recording the user's mouse position.
     * ---------------------------------------------------------------------------------------
     */

    /** This function enables the mouse position's recorder. */
    async function enableMousePositionRecorder() {
        if(mousePositionRecorderEnabled.value) { return; }
        setMousePositionEventListeners();
        mousePositionRecorderEnabled.value = true;
    }

    /** This function sets the mouse position's event listeners. */
    async function setMousePositionEventListeners() {
        if(mousePositionController != null) { mousePositionController.abort(); }
        mousePositionController = new AbortController();

        await nextTick();
        await sleep(10);
        if(!validateClientMode()) { return; }

        const signal = mousePositionController.signal;
        window.addEventListener('click', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('contextmenu', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('pointermove', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('pointerdown', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('pointerup', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('dragover', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('dragstart', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('dragend', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('mousemove', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('mousedown', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('mouseup', (event) => { recordMousePosition(event); }, { signal });
        window.addEventListener('touchmove', (event) => { recordMousePositionWithTouch(event); }, { signal });
        window.addEventListener('touchstart', (event) => { recordMousePositionWithTouch(event); }, { signal });
        window.addEventListener('touchend', (event) => { recordMousePositionWithTouch(event); }, { signal });
    }

    /** This function disables the mouse position's event listeners. */
    function disableMousePositionRecorder() {
        if(!mousePositionRecorderEnabled.value) { return; }
        if(mousePositionController != null) { mousePositionController.abort(); }
        mousePositionController = null;

        mouseX.value = 0;
        mouseY.value = 0;
        mousePositionRecorderEnabled.value = false;
    }

    /** This function runs the disableMousePositionRecorder and then the enableMousePositionRecorder function. */
    async function resetMousePositionRecorder() {
        disableMousePositionRecorder();
        await enableMousePositionRecorder();
    }

    /**
     * This function records the mouse's current position.
     * @param {PointerEvent} event The new position of the mouse.
     */
    function recordMousePosition(event) {
        if(!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') { return; }
        mouseX.value = event.clientX;
        mouseY.value = event.clientY;
    }

    /**
     * This function records the mouse's current position with a touch event.
     * @param {TouchEvent} event The new position of the mouse.
     */
    function recordMousePositionWithTouch(event) {
        if(!event.touches) { return; }
        const firstTouch = event.touches.item(0);
        if(typeof firstTouch?.clientX !== 'number' || typeof firstTouch?.clientY !== 'number') { return; }

        mouseX.value = firstTouch.clientX;
        mouseY.value = firstTouch.clientY;
    }

    /**
     * -----------------------------------------------------------------------------------------
     * These functions are specifically made for setting the dynamic breakpoints on the website.
     * -----------------------------------------------------------------------------------------
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
        if(breakpointsAbortController != null) { breakpointsAbortController.abort(); }
        if(cssVarObserver != null) { cssVarObserver.disconnect(); }

        breakpointsAbortController = null;
        cssVarObserver = null;
        unsetDynamicBreakpoints();
        breakpointsEnabled.value = false;
    }

    /** This function runs the disableBreakpoints and then the enableBreakpoints function. */
    async function resetBreakpoints() {
        disableBreakpoints();
        await enableBreakpoints();
    }

    /** This sets the resize event listener that sets all the breakpoint attributes for the website's document element. */
    async function setDynamicBreakpointsEventListener() {
        if(breakpointsAbortController != null) { breakpointsAbortController.abort(); }
        if(cssVarObserver != null) { cssVarObserver.disconnect(); }
        breakpointsAbortController = new AbortController();

        await nextTick();
        await sleep(10);
        if(!validateClientMode()) { return; }

        const signal = breakpointsAbortController.signal;
        window.addEventListener("animation-resize", () => { setDynamicBreakpoints(); }, { signal });
        window.addEventListener("router-before-change", () => { setDynamicBreakpoints(); }, { signal });
        window.addEventListener("router-after-change", () => { setDynamicBreakpoints(); }, { signal });

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

        var windowWidth = (window.innerWidth * cssToWindowWidthRatio.value);
        var windowHeight = (window.innerHeight * cssToWindowHeightRatio.value);
        
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

    /** This function unsets any dynamic breakpoints as attributes on the website. */
    function unsetDynamicBreakpoints() {
        if(!validateClientMode()) { return; }
        const allDocumentElementAttrs = document.documentElement.attributes;
        const documentElementBpAttrs = [""];
        const BpAttrsPrefixes = ["less-equal-width-bp-", "greater-equal-width-bp-", "less-equal-height-bp-", "greater-equal-height-bp-"];

        for(let i = 0; i < allDocumentElementAttrs.length; i++) {
            const unparsedAttr = allDocumentElementAttrs.item(i).value;
            if(-1 == BpAttrsPrefixes.findIndex((item) => { return unparsedAttr.startsWith(item); })) { continue; }
            documentElementBpAttrs.push(documentElementBpAttrs);
        }
        for(let j = 1; j < documentElementBpAttrs.length; j++) {
            document.documentElement.removeAttribute(documentElementBpAttrs[j]);
        }
    }

    return { mounted, hideOverflow, hideCursor, disableUserSelect, zoomFactor, mouseX, mouseY,
        breakpointsEnabled, trueViewportVariablesEnabled, mousePositionRecorderEnabled, viewportRafEnabled, cssLayoutObserverEnabled,
        viewportWidth, viewportHeight, cssViewportWidth, cssViewportHeight, cssToWindowWidthRatio, cssToWindowHeightRatio, 
        mountStyleStore, setHideOverflowArray, setHideCursorArray, setDisableUserSelectArray,
        enableTrueViewportVariables, disableTrueViewportVariables, resetTrueViewportVariables,
        enableMousePositionRecorder, disableMousePositionRecorder, resetMousePositionRecorder,
        enableCssLayoutObserver, disableCssLayoutObserver, resetCssLayoutObserver,
        enableBreakpoints, disableBreakpoints, resetBreakpoints, startViewportRaf, stopViewportRaf
    }
});

/** This function returns a computed variable of the zoom factor implemeneted by the website. */
export function getCurrentZoomFactor() {
    const { zoomFactor } = storeToRefs(useStyleStore());
    return computed(() => { return zoomFactor.value; });
}