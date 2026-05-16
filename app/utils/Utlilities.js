/**
 * This utility sets the necessary event listeners to enable any HTML element to use the pulse loop animation.
 * @param {import('vue').ShallowRef<HTMLElement>} container This is the main container to which the utility will apply to.
 */
export function usePulseLoopAnimation(container = null) {
    /** @type {MutationObserver} */
    var observer = null;

    /** @type {AbortController} */
    var controller = null;

    const enabled = ref(false);
    const numElements = ref(0);

    /** This function enables the pulse loop HTML Attribute. */
    async function enable() {
        if(enabled.value || container.value == null) { return; }
        await setEventListeners();
        
        if(observer == null) { observer = new MutationObserver(() => { setEventListeners(); }); }
        observer.observe(container.value, { childList: true, subtree: true })
        enabled.value = true;
    }

    /** This function disables the pulse loop HTML Attribute. */
    function disable() {
        if(!enabled.value) { return; }
        if(controller != null) { controller.abort(); }
        if(observer != null) { observer.disconnect(); }

        controller = null;
        observer = null;

        numElements.value = 0;
        enabled.value = false;
    }

    /** This function runs the disable and then the enable function. Useful for if new elements are added. */
    async function reset() {
        disable();
        await enable();
    }

    /** This is a practical copy of {@link setPulseLoopAnimation}. */
    function animate(event) {
        if(event.type === "pointerenter" && event.pointerType === "mouse") {
            if(event.target.classList.contains('animate__animated')) { return; }
            event.target.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        } else {
            if(!event.target.classList.contains('animate__pulse')) { return; }
            event.target.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
        }
    }

    /** This function sets the necessary event listeners for those with the pulse-loop HTML Attribute. */
    async function setEventListeners() {
        if(controller != null) { controller.abort(); }
        controller = new AbortController();

        await nextTick();
        if(!container.value) { return; }

        const signal = controller.signal;
        const elements = container.value.querySelectorAll('[pulse-loop]');
        numElements.value = elements.length;

        if(container.value.hasAttribute("pulse-loop")) {
            container.value.addEventListener("pointerenter", (event) => { animate(event); }, { signal });
            container.value.addEventListener("mouseleave", (event) => { animate(event); }, { signal });
        }
        elements.forEach((element) => {
            element.addEventListener("pointerenter", (event) => { animate(event); }, { signal });
            element.addEventListener("mouseleave", (event) => { animate(event); }, { signal });
        });
    }

    onMounted(async() => { await enable(); });
    onBeforeUnmount(() => { disable(); });
    watch(container, () => { reset(); });
    return { enabled, numElements, enable, disable, reset, animate }
}

/**
 * This function returns how much an element has scrolled from its starting point to its end both horizontally and vertically.
 * @param {String} elementId The id of the element.
 */
export function useScrollPercentage(elementId = "") {
    const horizontal = ref({ main: 0, inView: 0 });
    const vertical = ref({ main: 0, inView: 0 });

    /** A simple object that can be used by vertical custom scrollbars. */
    const vScrollbarStyle = computed(() => {
        const topNum = ((vertical.value.inView >= 100) ? 0 : ((vertical.value.main / 100) * (100 - vertical.value.inView)));
        return { height: (vertical.value.inView + "%"), top: (topNum + "%") }
    });
    /** A simple object that can be used by horizontal custom scrollbars. */
    const hScrollbarStyle = computed(() => {
        const leftNum = ((horizontal.value.inView >= 100) ? 0 : ((horizontal.value.main / 100) * (100 - horizontal.value.inView)));
        return { width: (horizontal.value.inView + "%"), left: (leftNum + "%") }
    });

    /** This function calculates both the horizontal and vertical percentages. */
    function calculate() {
        if(!document || !document.getElementById) { return; }
        const element = document.getElementById(elementId);
        if(element == null) { return; }

        // This section calculates how far the user scrolled from the top of the element.
        vertical.value.main = (element.scrollTop / (element.scrollHeight - element.clientHeight));
        horizontal.value.main = (element.scrollLeft / (element.scrollWidth - element.clientWidth));

        // This section simplifies the calculations into "clean" numbers for other JS code.
        vertical.value.main = (Number.isNaN(vertical.value.main) ? 100 : (Math.round(vertical.value.main * 10000) / 100));
        horizontal.value.main = (Number.isNaN(horizontal.value.main) ? 100 : (Math.round(horizontal.value.main * 10000) / 100));

        // This calculates what percentage of the element is viewable on the viewport.
        vertical.value.inView = (Math.round((element.clientHeight / element.scrollHeight) * 10000) / 100);
        horizontal.value.inView = (Math.round((element.clientWidth / element.scrollWidth) * 10000) / 100);
        return { horizontal: horizontal.value, vertical: vertical.value }
    }

    useRafFn(() => { calculate(); }, { immediate: true, fpsLimit: 30, once: false });
    return { horizontal, vertical, vScrollbarStyle, hScrollbarStyle, calculate }
}

/** This returns an object similar to "useWindowSize", but it records the css layout over the inner layout dimensions. */
export function useMohitWindowSize() {
    const CSS_LAYOUT_ID = "invisible-css-layout";
    const width = shallowRef(Number.POSITIVE_INFINITY);
    const height = shallowRef(Number.POSITIVE_INFINITY);

    const cssToWindowWidthRatio = shallowRef(1.0);
    const cssToWindowHeightRatio = shallowRef(1.0);

    /**
     * This function sets the true width and height of the website, even with a custom zoom property enabled.
     * @returns A boolean on whether or not the dimensions could be updated.
     */
    function updateDimensions() {
        if(!document || !window) { return false; }
        const element = document.getElementById(CSS_LAYOUT_ID);
        if(element == null) { return false; }

        width.value = element.clientWidth;
        height.value = element.clientHeight;

        cssToWindowWidthRatio.value = (width.value / window.innerWidth);
        cssToWindowHeightRatio.value = (height.value / window.innerHeight);
        return true;
    }

    useRafFn(() => { updateDimensions(); }, { immediate: true, fpsLimit: 30, once: false });
    return { width, height, cssToWindowWidthRatio, cssToWindowHeightRatio, updateDimensions }
}