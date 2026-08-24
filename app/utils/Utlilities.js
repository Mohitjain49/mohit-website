/** This returns an object similar to "useWindowSize", but it records the css layout over the inner layout dimensions. */
export function useMohitWindowSize() {
    const styleStoreRefs = storeToRefs(useStyleStore());
    const width = computed(() => { return styleStoreRefs.cssViewportWidth.value });
    const height = computed(() => { return styleStoreRefs.cssViewportHeight.value });

    const cssToWindowWidthRatio = computed(() => { return styleStoreRefs.cssToWindowWidthRatio.value });
    const cssToWindowHeightRatio = computed(() => { return styleStoreRefs.cssToWindowHeightRatio.value });
    return { width, height, cssToWindowWidthRatio, cssToWindowHeightRatio }
}

/**
 * This utility sets the necessary event listeners to enable any HTML element to use the pulse loop animation.
 * @param {import('vue').ShallowRef<HTMLElement>} container This is the main container to which the utility will apply to.
 */
export function usePulseLoopAnimation(container = null) {
    const styleStore = useStyleStore();

    /** @type {MutationObserver} This mutation observer watches elements' attributes. */
    var observer = null;

    /** @type {AbortController} This abort controller deletes event listeners when a change is necessary. */
    var controller = null;
    var interval = null;

    /**
     * @type {import('vue').Ref<Array<HTMLElement>>}
     * A list of all the elements that's given the specific event listeners for this utility.
     */
    const animatedElements = ref([]);
    const enabled = ref(false);
    const numElements = ref(0);

    /** This function enables the pulse loop HTML Attribute. */
    async function enable() {
        if(enabled.value || container.value == null) { return; }
        await sleep(750);
        await setEventListeners();
        
        if(container.value == null) { return; }
        if(observer == null) { observer = new MutationObserver(() => { setEventListeners(); }); }
        observer.observe(container.value, { childList: true, subtree: true })
        enabled.value = true;
    }

    /** This function disables the pulse loop HTML Attribute. */
    function disable() {
        if(!enabled.value) { return; }
        if(controller != null) { controller.abort(); }
        if(observer != null) { observer.disconnect(); }

        clearVerifyInterval();
        controller = null;
        observer = null;

        numElements.value = 0;
        animatedElements.value = [];
        enabled.value = false;
    }

    /** This function runs the disable and then the enable function. Useful for if new elements are added. */
    async function reset() {
        disable();
        await enable();
    }

    /**
     * This function sets a pulse animation for any element for an infinite amount of time.
     * @param {PointerEvent} event The event where the user hovers over or leaves the button.
     */
    function animate(event) {
        /** @type {HTMLElement} This is the element that classes are being added and removed from. */
        const element = event.target;
        const listIndex = animatedElements.value.findIndex((item) => { return (element === item); });
        if(listIndex <= -1) { return; }

        if(event.type === "pointerenter" && event.pointerType === "mouse") {
            if(element.classList.contains('animate__animated')) { return; }
            element.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        } else {
            if(!element.classList.contains('animate__pulse')) { return; }
            element.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
        }
    }

    /** This function sets the necessary event listeners for those with the pulse-loop HTML Attribute. */
    async function setEventListeners() {
        if(controller != null) { controller.abort(); }
        controller = new AbortController();

        clearVerifyInterval();
        await nextTick();
        await sleep(5);
        if(!container.value) { return; }

        const signal = controller.signal;
        const querySelectorExists = (typeof container.value.querySelectorAll === "function");
        const elements = (querySelectorExists ? Array.from(container.value.querySelectorAll('[pulse-loop]')) : []);
        numElements.value = elements.length;

        // This adds event listeners to the element this utility is applied to if it have the "pulse-loop" attribute.
        if(container.value.hasAttribute("pulse-loop")) {
            numElements.value++;
            animatedElements.value.push(container.value);
            container.value.addEventListener("pointerenter", (event) => { animate(event); }, { signal });
            container.value.addEventListener("pointerleave", (event) => { animate(event); }, { signal });
        }

        // This adds event listeners that is a descendant of the element this utility is applied to if they have the "pulse-loop" attribute.
        elements.forEach((element) => {
            animatedElements.value.push(element);
            element.addEventListener("pointerenter", (event) => { animate(event); }, { signal });
            element.addEventListener("pointerleave", (event) => { animate(event); }, { signal });
        });

        // This sets an interval that iterates through the pulse loop elements twice a second to see if classes need to be removed.
        interval = setInterval(() => { verifyAnimatedElements(); }, 500);

        // This creates an event listener for the abort controller signal that clears the interval when aborted.
        signal.addEventListener("abort", () => { clearVerifyInterval(); }, { once: true });
    }

    /** This function verifies that only the elements that the user is hovering over have the pulse loop class. */
    function verifyAnimatedElements() {
        try {
            const xVal = (styleStore.mouseX / styleStore.cssToWindowWidthRatio);
            const yVal = (styleStore.mouseY / styleStore.cssToWindowHeightRatio);
            const currentElementOnMouse = document.elementFromPoint(xVal, yVal);

            for(let i = 0; i < animatedElements.value.length; i++) {
                const element = animatedElements.value[i];
                if(!element || !element.classList.contains('animate__pulse')) { continue; }
                if(element === currentElementOnMouse || element.contains(currentElementOnMouse)) { continue; }
                element.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
            }
        } catch(e) {}
    }

    /** This clears the verify interval used by this utility. */
    function clearVerifyInterval() {
        if(interval != null) { clearInterval(interval); }
        interval = null;
    }

    onMountedAdvanced(async() => { await enable(); });
    onBeforeUnmount(() => { disable(); });
    watch(container, () => { reset(); });
    return { enabled, numElements, animatedElements, enable, disable, reset, animate, verifyAnimatedElements }
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

/**
 * This utility adds a few extra features to a Website Menu.
 * @param {import('vue').ShallowRef<HTMLElement>} menu This is the main container to which the utility will apply to.
 */
export function useWebsiteMenuUtility(menu) {
    const SCROLL_CLASS_TOP = "vertical-overflow-atTop";
    const SCROLL_CLASS_BOTTOM = "vertical-overflow-atBottom";
    const SWIPE_THRESHOLD = 50;
    const SCROLLBAR_EGDE_CUTOFF = 16;

    const { cssToWindowHeightRatio } = useMohitWindowSize();
    const webData = useWebsiteDataStore();

    const menuScrollable = shallowRef(false);
    const menuScrolledToTop = shallowRef(false)
    const menuScrolledToBottom = shallowRef(false);

    const swipeEnabled = shallowRef(false);
    const menuTouched = shallowRef(false);

    /** @type {AbortController} This abort controller can disable the swipe event listeners for a website menu. */
    var controller = null;
    var startY = 0;

    /** This function closes the website menu. */
    function closeMenu() {
        useWebsiteDataStore().closeNavMenu();
        triggerClickSound();
    }

    /** This function checks whether the menu is scrollable or not and sets the overflow class accordingly. */
    function checkMenu() {
        const element = menu.value;
        if(element == null) {
            menuScrollable.value = false;
            menuScrolledToTop.value = false;
            menuScrolledToBottom.value = false;
            return;
        }

        const totalHeight = element.scrollHeight;
        const visibleHeight = element.clientHeight;
        const currentScrollTop = element.scrollTop;

        menuScrollable.value = (totalHeight > visibleHeight);
        menuScrolledToTop.value = (currentScrollTop < SCROLLBAR_EGDE_CUTOFF);
        menuScrolledToBottom.value = (Math.abs(totalHeight - visibleHeight - currentScrollTop) < SCROLLBAR_EGDE_CUTOFF);

        if(!menuScrollable.value) {
            element.classList.remove(SCROLL_CLASS_TOP, SCROLL_CLASS_BOTTOM);
            return; // Ends the function as classes should only be added if menu is scrollable.
        }

        if(menuScrolledToTop.value) {
            element.classList.add(SCROLL_CLASS_TOP);
        } else {
            element.classList.remove(SCROLL_CLASS_TOP);
        }

        if(menuScrolledToBottom.value) {
            element.classList.add(SCROLL_CLASS_BOTTOM);
        } else {
            element.classList.remove(SCROLL_CLASS_BOTTOM);
        }
    }

    /** This function enables the swipe feature. */
    async function enableSwipe() {
        if(swipeEnabled.value) { return; }
        if(controller != null) { controller.abort(); }

        await nextTick();
        await sleep(5);

        controller = new AbortController();
        const element = menu.value;
        if(!element || !window || element == null) { return; }

        const signal = controller.signal;
        element.addEventListener("pointerdown", (event) => { onMenuPointerEvent(event); }, { signal });
        window.addEventListener("pointerup", (event) => { onMenuPointerEvent(event); }, { signal });

        element.addEventListener("touchstart", (event) => { onMenuTouchEvent(event); }, { signal });
        window.addEventListener("touchend", (event) => { onMenuTouchEvent(event); }, { signal });
        swipeEnabled.value = true;
    }

    /** This function disables the swipe feature. */
    function disableSwipe() {
        if(!swipeEnabled.value) { return; }
        if(controller != null) { controller.abort(); }

        controller = null;
        swipeEnabled.value = false;
    }

    /** This function resets the swipe feature. */
    async function resetSwipe() {
        disableSwipe();
        await enableSwipe();
    }

    /**
     * This function is triggered when the user enacts a pointer event on a website menu.
     * @param {PointerEvent} event The Pointer Event. 
     */
    function onMenuPointerEvent(event = new PointerEvent()) {
        if(event.pointerType !== "mouse" || typeof event.clientY !== "number") { return; }
        if(event.type === "pointerdown" && !menuTouched.value) {
            webData.bypassBodyClick();
            if(cancelMenuCloseOnSwipe(event.target, false)) { return; }

            startY = event.clientY;
            menuTouched.value = true;
        } else if(event.type === "pointerup" && menuTouched.value) {
            if((startY - event.clientY) > (SWIPE_THRESHOLD / cssToWindowHeightRatio.value)) { closeMenu(); }
            menuTouched.value = false;
        }
    }

    /**
     * This function is triggered when the user enacts a touch event on a website menu.
     * @param {TouchEvent} event The Touch Event. 
     */
    function onMenuTouchEvent(event = new TouchEvent()) {
        if(event.type === "touchstart" && !menuTouched.value) {
            webData.bypassBodyClick();
            if(cancelMenuCloseOnSwipe(event.target, true)) { return; }

            const firstTouch = event.touches.item(0);
            if(typeof firstTouch?.clientY !== 'number') { return; }
            startY = firstTouch.clientY;
            menuTouched.value = true;
        } else if(event.type === "touchend" && menuTouched.value) {
            const firstTouch = event.changedTouches.item(0);
            if(typeof firstTouch?.clientY !== 'number') { return; }
            if((startY - firstTouch.clientY) > (SWIPE_THRESHOLD / cssToWindowHeightRatio.value)) { closeMenu(); }
            menuTouched.value = false;
        }
    }

    /**
     * This function cancels a close on swipe if it returns true.
     * @param {HTMLDivElement} element The element the user swiped on.
     * @param {Boolean} isTouchEvent If true, the event is a touch event. 
     */
    function cancelMenuCloseOnSwipe(element = null, isTouchEvent = false) {
        if(!element) { return true; }
        const scrollable = menuScrollable.value;

        if(!element.classList.contains("mohit-navMenu-top") && scrollable) { return true; }
        if(scrollable && isTouchEvent) { return true; }
        return false;
    }

    useRafFn(() => { checkMenu(); }, { immediate: true, fpsLimit: 30, once: false });
    onMountedAdvanced(() => { enableSwipe(); });
    onBeforeUnmount(() => { disableSwipe(); });
    watch(menu, () => { resetSwipe(); });

    return { menuScrollable, menuScrolledToTop, menuScrolledToBottom, swipeEnabled, menuTouched,
        checkMenu, enableSwipe, disableSwipe, resetSwipe
    }
}

/**
 * This function returns void only when Nuxt is ready for the website. It takes in a function as well.
 * @param {Function} callback The callback function that is triggered when Nuxt is ready.
 */
export async function onNuxtReadyAdvanced(callback = () => {}) {
    return new Promise((resolve, reject) => {
        try {
            onNuxtReady(() => { callback(); });
            onNuxtReady(() => { resolve(null); });
        } catch(e) {
            reject(e);
        }
    })
}

/**
 * This function awaits the Next Tick and for Nuxt to be ready before running the callback function.
 * @param {Function} callback The callback function that is triggered.
 * @returns A reference boolean that can be used to tell the user that the component is mounted.
 */
export function onMountedAdvanced(callback = () => {}) {
    /** A boolean that tells the developer if the component is fully mounted. */
    const isMounted = shallowRef(false);

    onMounted(async() => {
        try {
            await onNuxtReadyAdvanced();
            await nextTick();
        } catch(e) {}

        isMounted.value = true;
        callback();
    });

    // Returns a boolean that tracks if the component is mounted.
    return isMounted;
}

/** This function returns a computed instance of the route path with the query string. */
export function useRoutePathWithQuery() {
    const documentStore = useDocumentStore();
    const router = useRouter();

    const rawRoutePath = computed(() => { return router.currentRoute.value.path; });
    const rawRouteQuery = computed(() => { return router.currentRoute.value.query; });
    const queryEnd = ref("");

    /** This is the final parsed path returned for the website to use. */
    const path = computed(() => { return (rawRoutePath.value + ((queryEnd.value.length <= 0) ? "" : ("?" + queryEnd.value))); });

    /** This function updates the Query End parameter. */
    function updateQueryEnd() {
        if(!documentStore.onDocumentRoute) {
            const searchParamsStr = new URLSearchParams(rawRouteQuery.value).toString();
            queryEnd.value = searchParamsStr;
            return searchParamsStr;
        } else {
            var searchParams = new URLSearchParams(rawRouteQuery.value);
            if(searchParams.has("page")) { searchParams.delete("page"); }
            if(searchParams.has("y")) { searchParams.delete("y"); }

            const searchParamsStr = searchParams.toString();
            queryEnd.value = searchParamsStr;
            return searchParamsStr;
        }
    }

    updateQueryEnd();
    watch(rawRouteQuery, () => { updateQueryEnd(); }, { deep: true });
    return path;
}