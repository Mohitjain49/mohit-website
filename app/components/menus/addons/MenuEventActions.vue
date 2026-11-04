<template>
<div ref="addon-reference" class="mohit-navMenu-addon-child-element"></div>
</template>

<script setup>
const WEBSITE_MENU_CLASS_NAME = "mohit-navMenu";
const OVERFLOW_SCROLL_CLASS = "webMenu-vertical-overflow";
const SWIPE_THRESHOLD = 50;

const styleStore = useStyleStore();
const webData = useWebsiteDataStore();

/** @type {ShallowRef<HTMLDivElement>} This is the main website menu element to use for this component. */
const websiteMenuElement = shallowRef(null);
const websiteMenuElementChild = useTemplateRef('addon-reference');

const webMenuScrollable = ref(false);
const webMenuTouched = ref(false);
const hasTouchEvents = ref(false);

/** @type {AbortController} This abort controller manages aborting the event listeners for this component. */
var eventsAbortController = null;
var startY = 0;

/** This manages a Raf Loop that sets certain elements in this component given the Website Menu's Properties. */
const menuDimensionsRaf = useRafFn(() => { changeElementsOnMenuDimensions(); }, { immediate: false });

// This sets up the component so that it can find its website menu and set its actions based on website and browser events.
onAfterMounted(() => {
    if(!Boolean(websiteMenuElementChild.value)) { throw new Error("Website Menu Reference Not Found.") }
    websiteMenuElement.value = websiteMenuElementChild.value.closest("." + WEBSITE_MENU_CLASS_NAME);

    if(!Boolean(websiteMenuElement.value)) { throw new Error("Website Menu Element Not Found."); }
    const webMenu = websiteMenuElement.value;

    hasTouchEvents.value = checkTouchEndExists();
    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;

    // This starts an Raf Loop that sets certain elements in this component given the Website Menu's Properties.
    menuDimensionsRaf.resume();
    signal.addEventListener("abort", () => { menuDimensionsRaf.pause(); }, { once: true });

    // This sets a group of event listeners that can close the website menu on a swipe.
    webMenu.addEventListener("pointerdown", (event) => { onMenuPointerEvent(event); }, { signal });
    window.addEventListener("pointerup", (event) => { onMenuPointerEvent(event); }, { signal });
    if(hasTouchEvents.value) { window.addEventListener("touchend", (event) => { onMenuPointerEvent(event); }, { signal }); }
});

// This aborts all event listeners and stops the Raf Loop when the component unmounts.
onBeforeUnmount(() => { if(eventsAbortController != null) { eventsAbortController.abort(); }});

/** This function changes elements in this component based on menu dimensions. */
function changeElementsOnMenuDimensions() {
    if(!Boolean(websiteMenuElement.value)) { return; }
    const webMenu = websiteMenuElement.value;

    if(webMenu.scrollHeight > webMenu.clientHeight) {
        webMenuScrollable.value = true;
        webMenu.classList.add(OVERFLOW_SCROLL_CLASS);
    } else {
        webMenuScrollable.value = false;
        webMenu.classList.remove(OVERFLOW_SCROLL_CLASS);
    }
}

/**
 * This function is triggered when the user enacts a pointer event on a website menu.
 * @param {PointerEvent | TouchEvent} event The Pointer Event. 
 */
function onMenuPointerEvent(event) {
    if(event.type === "pointerdown" && !webMenuTouched.value) {
        const touchPointer = (event.pointerType === "touch");
        if((typeof event.clientY !== "number") || (touchPointer && !hasTouchEvents.value)) { return; }
        webData.bypassBodyClick();

        /** @type {HTMLDivElement} This is the exact element the user pressed down on for this event. */
        const elementPressed = event.target;
        if(webMenuScrollable.value && (touchPointer || !elementPressed.closest(".mohit-navMenu-top"))) { return; }

        startY = event.clientY;
        webMenuTouched.value = true;
    } else if(event.type === "pointerup" && webMenuTouched.value) {
        if(typeof event.clientY !== "number") { return; }
        if((startY - event.clientY) > (SWIPE_THRESHOLD / styleStore.cssToWindowHeightRatio)) { closeMenu(); }
        webMenuTouched.value = false;
    } else if(event.type === "touchend" && webMenuTouched.value) {
        const firstTouch = event.changedTouches.item(0);
        if(typeof firstTouch?.clientY !== 'number') { return; }

        if((startY - firstTouch.clientY) > (SWIPE_THRESHOLD / styleStore.cssToWindowHeightRatio)) { closeMenu(); }
        webMenuTouched.value = false;
    }
}

/** This function closes the website menu. */
function closeMenu() {
    webData.closeNavMenu();
    triggerClickSound();
}
</script>

<style lang="scss">
.mohit-navMenu-addon-child-element {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    background: transparent;
}
</style>