export default defineNuxtPlugin((nuxtApp) => {
    const OVERFLOW_SCROLL_CLASS = "webMenu-vertical-overflow";
    const SWIPE_THRESHOLD = 50;

    const webData = useWebsiteDataStore();
    const styleStore = useStyleStore();

    const overflowChecker = useRafFn(() => { setMenuOverflowClass(); }, { immediate: false });
    watch(() => webData.mounted, () => { manageOverflowChecker(); }, { deep: true });

    /**
     * @type {Array<{ el: HTMLElement, animatonFrame: number, controller: AbortController }>}
     * A list of the website menu elements.
     */
    const webMenuElements = [];
    const webMenuTouched = ref(false);
    var startY = 0;

    /**
     * This function finds an element in the list of website menu elements.
     * @param {HTMLElement} el The HTML Element that acts as a key here.
     */
    function findElement(el = null) {
        return webMenuElements.findIndex((item) => { return (item.el === el); });
    }

    /** This function manages if the overflow checker should be active or not. */
    function manageOverflowChecker() {
        if(overflowChecker.isActive.value) { overflowChecker.pause(); }
        if(webData.checkPartiallyMounted()) { overflowChecker.resume(); }
    }

    /** This function checks every menu to see if it is scrollable or not and sets the overflow class accordingly. */
    function setMenuOverflowClass() {
        for(let i = 0; i < webMenuElements.length; i++) {
            const el = webMenuElements[i].el;
            if(!el || !(el instanceof Element)) { continue; }

            if(el.scrollHeight > el.clientHeight) {
                el.classList.add(OVERFLOW_SCROLL_CLASS);
            } else {
                el.classList.remove(OVERFLOW_SCROLL_CLASS);
            }
        }
    }

    /** This function closes the website menu. */
    function closeMenu() {
        webData.closeNavMenu();
        triggerClickSound();
    }

    /**
     * This function is triggered when the user enacts a pointer event on a website menu.
     * @param {PointerEvent} event The Pointer Event. 
     */
    function onMenuPointerEvent(event = new PointerEvent()) {
        if(event.pointerType !== "mouse" || typeof event.clientY !== "number") { return; }
        if(event.type === "pointerdown" && !webMenuTouched.value) {
            webData.bypassBodyClick();
            if(cancelMenuCloseOnSwipe(event.target, false)) { return; }

            startY = event.clientY;
            webMenuTouched.value = true;
        } else if(event.type === "pointerup" && webMenuTouched.value) {
            if((startY - event.clientY) > (SWIPE_THRESHOLD / styleStore.cssToWindowHeightRatio)) { closeMenu(); }
            webMenuTouched.value = false;
        }
    }

    /**
     * This function is triggered when the user enacts a mouse event on a website menu.
     * @param {MouseEvent} event The Pointer Event. 
     */
    function onMenuMouseEvent(event = new PointerEvent()) {
        if(typeof event.clientY !== "number") { return; }
        if(event.type === "mousedown" && !webMenuTouched.value) {
            webData.bypassBodyClick();
            if(cancelMenuCloseOnSwipe(event.target, false)) { return; }

            startY = event.clientY;
            webMenuTouched.value = true;
        } else if(event.type === "mouseup" && webMenuTouched.value) {
            if((startY - event.clientY) > (SWIPE_THRESHOLD / styleStore.cssToWindowHeightRatio)) { closeMenu(); }
            webMenuTouched.value = false;
        }
    }

    /**
     * This function is triggered when the user enacts a touch event on a website menu.
     * @param {TouchEvent} event The Touch Event. 
     */
    function onMenuTouchEvent(event = new TouchEvent()) {
        if(event.type === "touchstart" && !webMenuTouched.value) {
            webData.bypassBodyClick();
            if(cancelMenuCloseOnSwipe(event.target, true)) { return; }

            const firstTouch = event.touches.item(0);
            if(typeof firstTouch?.clientY !== 'number') { return; }
            startY = firstTouch.clientY;
            webMenuTouched.value = true;
        } else if(event.type === "touchend" && webMenuTouched.value) {
            const firstTouch = event.changedTouches.item(0);
            if(typeof firstTouch?.clientY !== 'number') { return; }
            if((startY - firstTouch.clientY) > (SWIPE_THRESHOLD / styleStore.cssToWindowHeightRatio)) { closeMenu(); }
            webMenuTouched.value = false;
        }
    }

    /**
     * This function is ran to set the event listeners for the Website Menu.
     * @param {HTMLElement} el The HTML Element used in the directive.
     * @param {import("vue").DirectiveBinding<any>} binding The Binding with the directive.
     */
    function setWebsiteMenuELs(el, binding) {
        if(findElement(el) != -1) { removeWebsiteMenuEls(el, binding); }
        const eventsAbortController = new AbortController();
        const signal = eventsAbortController.signal;

        webMenuElements.push({ el, controller: eventsAbortController });
        el.addEventListener("pointerdown", (event) => { onMenuPointerEvent(event); }, { signal });
        el.addEventListener("mousedown", (event) => { onMenuMouseEvent(event); }, { signal });
        el.addEventListener("touchstart", (event) => { onMenuTouchEvent(event); }, { signal });

        window.addEventListener("pointerup", (event) => { onMenuPointerEvent(event); }, { signal });
        window.addEventListener("mouseup", (event) => { onMenuMouseEvent(event); }, { signal });
        window.addEventListener("touchend", (event) => { onMenuTouchEvent(event); }, { signal });
    }

    /**
     * This function cancels a close on swipe if it returns true.
     * @param {HTMLDivElement} element The element the user swiped on.
     * @param {Boolean} isTouchEvent If true, the event is a touch event. 
     */
    function cancelMenuCloseOnSwipe(element = null, isTouchEvent = false) {
        if(!element) { return true; }
        const scrollable = Boolean(element.closest("." + OVERFLOW_SCROLL_CLASS));
        return (scrollable && (isTouchEvent || !element.closest(".mohit-navMenu-top")));
    }

    /**
     * This function is ran to remove the event listeners for the Website Menu.
     * @param {HTMLElement} el The HTML Element used in the directive. 
     * @param {import("vue").DirectiveBinding<any>} binding The Binding with the directive.
     */
    function removeWebsiteMenuEls(el, binding) {
        const itemIndex = findElement(el);
        if(itemIndex == -1) { return; }

        webMenuElements[itemIndex].controller.abort();
        webMenuElements.splice(itemIndex, 1);
    }

    // This makes a new directive for website menus that add extra functionality for them.
    nuxtApp.vueApp.directive('web-menu', {
        mounted(el, binding) { setWebsiteMenuELs(el, binding); },
        beforeUnmount(el, binding) { removeWebsiteMenuEls(el, binding); }
    });
});