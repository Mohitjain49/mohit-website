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
 */
export function usePulseLoopAnimation() {
    const controller = new AbortController();
    const enabled = ref(false);
    const numElements = ref(0);

    /** This function enables the pulse loop HTML Attribute. */
    async function enable() {
        if(enabled.value) { return; }
        await nextTick();

        const signal = controller.signal;
        const elements = document.querySelectorAll('[pulse-loop]');
        numElements.value = elements.length;

        elements.forEach((element) => {
            element.addEventListener("pointerenter", (event) => { setPulseLoopAnimation(event); }, { signal });
            element.addEventListener("mouseleave", (event) => { setPulseLoopAnimation(event); }, { signal });
        });
        enabled.value = true;
    }

    /** This function disables the pulse loop HTML Attribute. */
    function disable() {
        if(!enabled.value) { return; }
        controller.abort();
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