/**
 * This utility sets breakpoints for any element so that its child elements can use more dynamic media rules.
 * @param {import('vue').ShallowRef<HTMLElement>} element This is the element that will hold the breakpoints.
 * @param {Array<String>} breakpoints An array of breakpoints to use. It should be in the format "<-w-650".
 */
export function useMohitBreakpoints(element, breakpoints) {
    if(typeof breakpoints === "string") { breakpoints = [breakpoints]; }
    const zoomFactor = getCurrentZoomFactor();
    const enabled = ref(false);

    /** @type {AbortController} */
    var controller = null;

    /** @type {Array<String>} This contains a list of classes that will be added if their corresponding condition is satisfied. */
    const breakpointClasses = [];
    const numBreakpoints = breakpoints.length;

    // This section creates classes out of the breakpoints passed in.
    for(let i = 0; i < numBreakpoints; i++) {
        var bpClass = "";
        const bpFields = breakpoints[i].split("-");

        const bpSign = bpFields[0];
        const bpDimension = bpFields[1];

        if(bpSign !== "<" && bpSign !== ">") {
            throw new Error("Breakpoint \"" + breakpoints[i] + "\" does not have a proper math sign.");
        } else if(bpDimension !== "w" && bpDimension !== "h") {
            throw new Error("Breakpoint \"" + breakpoints[i] + "\" does not have a proper dimension.");
        } else if(Number.isNaN(parseInt(bpFields[2]))) {
            throw new Error("Breakpoint \"" + breakpoints[i] + "\" does not have a proper number.");
        }

        if(bpSign === "<") {
            bpClass += "less-equal";
        } else {
            bpClass += "greater-equal";
        }

        if(bpDimension === "w") {
            bpClass += "__width__";
        } else {
            bpClass += "__height__";
        }

        bpClass += (String(bpFields[2]) + "px");
        breakpointClasses.push(bpClass);
    }

    /** This function enables the utility and lets it start adding breakpoints to the element. */
    async function enable() {
        if(enabled.value) { return; }
        await setEventListeners();
        enabled.value = true;
    }

    /** This function disables the utility and removes all breakpoints added to the element. */
    function disable() {
        if(!enabled.value) { return; }
        if(controller != null) { controller.abort(); }
        controller = null;

        if(element.value) {
            for(let i = 0; i < numBreakpoints; i++) {
                element.value.classList.remove(breakpointClasses[i]);
            }
        }
        enabled.value = false;
    }

    /** This function runs the disable and then the enable function. Useful for if the passed in element changes. */
    async function reset() {
        disable();
        await enable();
    }

    /** This function sets the necessary event listeners for those with the pulse-loop HTML Attribute. */
    async function setEventListeners() {
        if(controller != null) { controller.abort(); }
        controller = new AbortController();

        await nextTick();
        if(!window) { return; }

        window.addEventListener("resize", () => { setBreakpointClasses(); }, { signal: controller.signal });
        await sleep(50);
        setBreakpointClasses();
    }

    /** This function sets the breakpoint classes after looking at the window width and height. */
    function setBreakpointClasses() {
        if(!element.value) { return; }
        for(let i = 0; i < numBreakpoints; i++) {
            const bpFields = breakpoints[i].split("-");
            const vDimension = (((bpFields[1] === "w") ? window.innerWidth : window.innerHeight) / zoomFactor.value);
            console.log(vDimension);
            const conditionSatisfied = ((bpFields[0] === "<") ? (parseInt(bpFields[2]) >= vDimension) : (parseInt(bpFields[2]) <= vDimension));

            if(conditionSatisfied) {
                element.value.classList.add(breakpointClasses[i]);
            } else {
                element.value.classList.remove(breakpointClasses[i]);
            }
        }
    }

    onMounted(async() => { await enable(); });
    onBeforeUnmount(() => { disable(); });
    watch(element, () => { reset(); });
    return { enabled, enable, disable, reset }
}

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
    var animationFrame = null;
    const active = ref(false);

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
    return { horizontal, vertical, vScrollbarStyle, hScrollbarStyle, calculate, start, stop, toggle }
}