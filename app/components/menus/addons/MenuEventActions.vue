<template>
<div ref="addon-reference" class="mohit-navMenu-addon-child-element"></div>
</template>

<script setup>
const WEBSITE_MENU_CLASS_NAME = "mohit-navMenu";
const OVERFLOW_SCROLL_CLASS = "webMenu-vertical-overflow";
const SWIPE_THRESHOLD = 75;

const webData = useWebsiteDataStore();
const { mouseY, cssToWindowHeightRatio } = storeToRefs(useStyleStore());

/** @type {ShallowRef<HTMLDivElement>} This is the main website menu element to use for this component. */
const websiteMenuElement = shallowRef(null);
const websiteMenuElementChild = useTemplateRef('addon-reference');

const webMenuTouched = ref(false);
const webMenuSwipeWithTouch = ref(false);

const webMenuScrollable = ref(false);
const hasTouchEvents = ref(false);

/** @type {AbortController} This abort controller manages aborting the event listeners for this component. */
var eventsAbortController = null;

const startY = ref(0);
const closeSwipeThreshold = computed(() => { return Math.ceil(SWIPE_THRESHOLD / cssToWindowHeightRatio.value); });
const closeSwipePercent = computed(() => {
    const rawDecimal = ((startY.value - mouseY.value) / closeSwipeThreshold.value);
    return Math.max(0, Math.min(1, (Math.round(rawDecimal * 100) / 100)));
});

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
    window.addEventListener("dragstart", (event) => { onMenuPointerEvent(event); }, { signal });
    if(hasTouchEvents.value) { window.addEventListener("touchend", (event) => { onMenuPointerEvent(event); }, { signal }); }
});

// This aborts all event listeners and stops the Raf Loop when the component unmounts.
onBeforeUnmount(() => { if(eventsAbortController != null) { eventsAbortController.abort(); }});

// This watches the close swipe progress to set the style of the website menu.
watch(closeSwipePercent, (newValue) => {
    if(!import.meta.client || !webMenuTouched.value) { return; }
    newValue = (newValue / 2);
    webData.setWebsiteMenuTransitionStyles((1 - newValue), (newValue * -10));
});

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
function onMenuPointerEvent(event = null) {
    if(!event || !event.type || !websiteMenuElement.value) { return; }
    const eType = event.type;

    if(eType === "pointerdown" && !webMenuTouched.value) {
        webMenuSwipeWithTouch.value = (event.pointerType === "touch");
        if(webMenuSwipeWithTouch.value && !hasTouchEvents.value) { return; }
        webData.bypassBodyClick();

        /** @type {HTMLDivElement} This is the exact element the user pressed down on for this event. */
        const elementPressed = event.target;
        if(webMenuScrollable.value && (webMenuSwipeWithTouch.value || !elementPressed.closest(".mohit-navMenu-top"))) { return; }

        startY.value = (event.clientY || mouseY.value);
        webMenuTouched.value = true;
    } else if((eType === "dragstart") && webMenuTouched.value) {
        // Sets the website menu as not being touched any more.
        webMenuTouched.value = false;
        webMenuSwipeWithTouch.value = false;
        webData.setWebsiteMenuTransitionStyles();
    } else if((eType === "pointerup" || eType === "touchend") && webMenuTouched.value) {
        if(closeSwipePercent.value >= 0.9) {
            webData.closeNavMenu();
            triggerClickSound();
        } else {
            webData.setWebsiteMenuTransitionStyles();
        }

        // Sets the website menu as not being touched any more.
        webMenuTouched.value = false;
        webMenuSwipeWithTouch.value = false;
    }
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