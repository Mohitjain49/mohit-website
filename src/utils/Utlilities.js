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

/**
 * This utility sets the necessary event listeners to enable any HTML element to use the pulse loop animation.
 * @param {ShallowRef<HTMLElement>} container This is the main container to which the utility will apply to.
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

    /** This function sets the necessary event listeners for those with the pulse-loop HTML Attribute. */
    async function setEventListeners() {
        if(controller != null) { controller.abort(); }
        controller = new AbortController();

        await nextTick();
        if(!container.value) { return; }

        const signal = controller.signal;
        const elements = container.value.querySelectorAll('[pulse-loop]');
        numElements.value = elements.length;

        elements.forEach((element) => {
            element.addEventListener("pointerenter", (event) => { setPulseLoopAnimation(event); }, { signal });
            element.addEventListener("mouseleave", (event) => { setPulseLoopAnimation(event); }, { signal });
        });
    }

    /** This function disables the pulse loop HTML Attribute. */
    function disable() {
        if(!enabled.value) { return; }
        if(controller != null) { controller.abort(); }

        controller = null;
        observer.disconnect();
        numElements.value = 0;
        enabled.value = false;
    }

    /** This function runs the disable and then the enable function. Useful for if new elements are added. */
    async function reset() {
        disable();
        await enable();
    }

    onMounted(async() => { await enable(); });
    onBeforeUnmount(() => { disable(); });
    return { enabled, numElements, enable, disable, reset }
}