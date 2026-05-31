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
    /** @type {MutationObserver} */
    var observer = null;

    /** @type {AbortController} */
    var controller = null;

    const enabled = ref(false);
    const numElements = ref(0);

    /** This function enables the pulse loop HTML Attribute. */
    async function enable() {
        if(enabled.value || container.value == null) { return; }
        await sleep(750);
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
        await sleep(5);
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

/**
 * This utility adds a few extra features to a Website Menu.
 * @param {import('vue').ShallowRef<HTMLElement>} menu This is the main container to which the utility will apply to.
 */
export function useWebsiteMenuUtility(menu) {
    const OVERFLOW_CLASS = "vertical-overflow";
    const SWIPE_THRESHOLD = 50;

    const menuScrollable = shallowRef(false);
    const swipeEnabled = shallowRef(false);

    const overflowClassAdded = shallowRef(false);
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
        const noElementPresent = (element == null);

        menuScrollable.value = (noElementPresent ? false : (element.scrollHeight > element.clientHeight));
        if(noElementPresent) { return; }

        if(menuScrollable.value) {
            element.classList.add(OVERFLOW_CLASS);
            overflowClassAdded.value = true;
        } else {
            element.classList.remove(OVERFLOW_CLASS);
            overflowClassAdded.value = false;
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
        if(typeof event.clientY !== "number") { return; }
        if(event.type === "pointerdown" && !menuTouched.value) {
            startY = event.clientY;
            menuTouched.value = true;
        } else if(event.type === "pointerup" && menuTouched.value) {
            if((startY - event.clientY) > SWIPE_THRESHOLD) { closeMenu(); }
            menuTouched.value = false;
        }
    }

    /**
     * This function is triggered when the user enacts a touch event on a website menu.
     * @param {TouchEvent} event The Touch Event. 
     */
    function onMenuTouchEvent(event = new TouchEvent()) {
        if(event.type === "touchstart" && !menuTouched.value) {
            const firstTouch = event.touches.item(0);
            if(typeof firstTouch?.clientY !== 'number') { return; }
            startY = firstTouch.clientY;
            menuTouched.value = true;
        } else if(event.type === "touchend" && menuTouched.value) {
            const firstTouch = event.changedTouches.item(0);
            if(typeof firstTouch?.clientY !== 'number') { return; }
            if((startY - firstTouch.clientY) > SWIPE_THRESHOLD) { closeMenu(); }
            menuTouched.value = false;
        }
    }

    useRafFn(() => { checkMenu(); }, { immediate: true, fpsLimit: 30, once: false });
    onMounted(() => { enableSwipe(); });
    onBeforeUnmount(() => { disableSwipe(); });
    watch(menu, () => { resetSwipe(); });

    return { menuScrollable, swipeEnabled, overflowClassAdded, menuTouched,
        checkMenu, enableSwipe, disableSwipe, resetSwipe
    }
}