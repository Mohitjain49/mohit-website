<template>
<div ref="addon-reference" class="mohit-navMenu-addon-child-element"></div>
<div v-show="webMenuScrollable" class="mohit-webMenu-scrollBar" @contextmenu="(event) => { onScrollBarContextMenu(event); }">
    <div class="mohit-webMenu-scrollBar-body">
        <div ref="web-menu-scrollbar-thumb" :class="thumbClasses" :style="scrollbarThumbStyle"></div>
    </div>
</div>
</template>

<script setup>
const OVERFLOW_SCROLL_CLASS = "webMenu-vertical-overflow";
const SWIPE_THRESHOLD = 75;

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();

const { websiteMenuMode } = storeToRefs(webData);
const { mouseY, cssToWindowHeightRatio } = storeToRefs(styleStore);

const websiteMenuElementChild = useTemplateRef('addon-reference');
const websiteMenuScrollbarThumb = useTemplateRef('web-menu-scrollbar-thumb');

/** @type {ShallowRef<HTMLDivElement>} This is the main website menu element to use for this component. */
const websiteMenuElement = shallowRef(null);

/** @type {ShallowRef<HTMLDivElement>} This is the website menu element that stores its contents. */
const websiteMenuContents = shallowRef(null);

const startY = ref(0);
const webMenuTouched = ref(false);
const webMenuSwipeWithTouch = ref(false);
const scrollbarThumbPressed = ref(false);

const hasTouchEvents = ref(false);
const webMenuScrollable = ref(false);
const verticalScrollPercent = ref(0);
const menuClientInView = ref(0);

/** @type {AbortController} This abort controller manages aborting the event listeners for this component. */
var eventsAbortController = null;

const closeSwipeThreshold = computed(() => { return Math.ceil(SWIPE_THRESHOLD / cssToWindowHeightRatio.value); });
const thumbClasses = computed(() => { return ['inner', (scrollbarThumbPressed.value ? 'active' : '')]; });

const closeSwipePercent = computed(() => {
    const rawDecimal = ((startY.value - mouseY.value) / closeSwipeThreshold.value);
    return Math.max(0, Math.min(1, (Math.round(rawDecimal * 100) / 100)));
});

/** This is the style for the website menu scrollbar thumb. */
const scrollbarThumbStyle = computed(() => {
    const inView = menuClientInView.value;
    const topNum = String(webMenuScrollable.value ? ((verticalScrollPercent.value / inView) * (100 - inView)) : 0);
    return { height: (String(inView) + "%"), transform: ("translateY(" + topNum + "%)") }
});

/** This manages a Raf Loop that sets certain elements in this component given the Website Menu's Properties. */
const menuDimensionsRaf = useRafFn(() => { changeElementsOnMenuDimensions(false); }, { immediate: false, fpsLimit: 20 });

// This sets up the component so that it can find its website menu and set its actions based on website and browser events.
onAfterMounted(() => {
    if(!Boolean(websiteMenuElementChild.value)) { throw new Error("Website Menu Reference Not Found.") }
    websiteMenuElement.value = websiteMenuElementChild.value.closest(".mohit-navMenu");

    if(!Boolean(websiteMenuElement.value)) { throw new Error("Website Menu Element Not Found."); }
    const webMenu = websiteMenuElement.value;

    websiteMenuContents.value = webMenu.querySelector(".mohit-navMenu-contents");
    if(!Boolean(websiteMenuContents.value)) { throw new Error("Website Menu Contents Element Not Found."); }

    hasTouchEvents.value = checkTouchEndExists();
    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;

    // This starts an Raf Loop that sets certain elements in this component given the Website Menu's Properties.
    changeElementsOnMenuDimensions(true);
    menuDimensionsRaf.resume();
    signal.addEventListener("abort", () => { menuDimensionsRaf.pause(); }, { once: true });

    // This sets a group of event listeners that can close the website menu on a swipe.
    webMenu.addEventListener("pointerdown", (event) => { onMenuPointerEvent(event); }, { signal });
    window.addEventListener("pointerup", (event) => { onMenuPointerEvent(event); }, { signal });
    window.addEventListener("pointermove", (event) => { onMenuPointerEvent(event); }, { signal, passive: false });
    window.addEventListener("dragstart", (event) => { onMenuPointerEvent(event); }, { signal });

    if(hasTouchEvents.value) {
        window.addEventListener("touchend", (event) => { onMenuPointerEvent(event); }, { signal });
        window.addEventListener("touchmove", (event) => { onMenuPointerEvent(event); }, { signal, passive: false });
    }

    if(Boolean(websiteMenuScrollbarThumb.value)) {
        websiteMenuScrollbarThumb.value.addEventListener("pointerdown", (event) => { onWebsiteMenuScrollbarPointerEvent(event); }, { signal });
        window.addEventListener("pointerup", (event) => { onWebsiteMenuScrollbarPointerEvent(event); }, { signal });
        window.addEventListener("dragstart", () => { onWebsiteMenuScrollbarPointerEvent(); }, { signal });
    }
});

// This aborts all event listeners and stops the Raf Loop when the component unmounts.
onBeforeUnmount(() => {
    setUserSelect(false);
    if(eventsAbortController != null) { eventsAbortController.abort(); }
});

// This watches the close swipe progress to set the style of the website menu.
watch(closeSwipePercent, () => { updateMenuTransitionStyles(); });
watch(websiteMenuMode, () => { updateMenuTransitionStyles(); });
watch(webMenuTouched, () => { updateMenuTransitionStyles(); });

// This scrolls the website menu when the mosue moves and the user is holding the custom scrollbar.
watch(mouseY, (newY, oldY) => { scrollWebMenuOnMouseMove(newY, oldY); });

/**
 * This function changes elements in this component based on menu dimensions.
 * @param {Boolean} firstRun This marks the function as its first time being run for the component.
 */
function changeElementsOnMenuDimensions(firstRun = false) {
    if(!Boolean(websiteMenuElement.value) || !Boolean(websiteMenuContents.value)) { return; }
    const webMenuContents = websiteMenuContents.value;

    const scrollHeight = webMenuContents.scrollHeight;
    const clientHeight = webMenuContents.clientHeight;

    const oldScrollStatus = webMenuScrollable.value;
    webMenuScrollable.value = (scrollHeight > clientHeight);
    const diffStatus = ((webMenuScrollable.value != oldScrollStatus) || firstRun);

    if(webMenuScrollable.value) {
        if(diffStatus) { websiteMenuElement.value.classList.add(OVERFLOW_SCROLL_CLASS); }
        verticalScrollPercent.value = (Math.round((webMenuContents.scrollTop * 10000) / (scrollHeight - clientHeight)) / 100);
        menuClientInView.value = (Math.round((clientHeight / scrollHeight) * 10000) / 100);
    } else if(!webMenuScrollable.value && diffStatus) {
        websiteMenuElement.value.classList.remove(OVERFLOW_SCROLL_CLASS);
        verticalScrollPercent.value = 0;
        menuClientInView.value = 100;
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

        if(webMenuScrollable.value) {
            if(webMenuSwipeWithTouch.value) {
                const webMenuContents = websiteMenuContents.value;
                if(webMenuContents.scrollTop < (webMenuContents.scrollHeight - webMenuContents.clientHeight)) { return; }
            } else {
                /** @type {Element} This is the exact element the user pressed down on for this event. */
                const elementPressed = event.target;
                if(!elementPressed.closest(".mohit-navMenu-top")) { return; }
            }
        }

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
    } else if((eType === "pointermove" || eType === "touchmove") && webMenuTouched.value) {
        event.preventDefault();
    }
}

/** This function updates the website menu transition styles based on how the user is swiping. */
function updateMenuTransitionStyles() {
    if(!webMenuTouched.value) { return; }
    const newValue = (closeSwipePercent.value / 2);
    const transformMultiple = ((websiteMenuMode.value == 1) ? (-1 * SWIPE_THRESHOLD) : -10);
    webData.setWebsiteMenuTransitionStyles((1 - newValue), (newValue * transformMultiple));
}

/**
 * This function enables and disables vistors from selecting text on a website menu.
 * @param {Boolean} disable Whether to disable user text selection or not.
 */
function setUserSelect(disable = true) {
    styleStore.setDisableUserSelectArray(DisableUserSelect.WEBSITE_MENU_SCROLL_BAR, disable);
}

/**
 * This function runs when a pointer event is fired with the scrollbar.
 * @param {PointerEvent} event The pointer event.
 */
function onWebsiteMenuScrollbarPointerEvent(event = null) {
    if(event && (event.type === "pointerdown") && (event.pointerType === "mouse")) {
        scrollbarThumbPressed.value = true;
        setUserSelect(true);
    } else {
        scrollbarThumbPressed.value = false;
        setUserSelect(false);
    }
}

/**
 * This function scrolls the Website Menu when the mouse moves.
 * @param {Number} newY The new Y position of the mouse.
 * @param {Number} oldY The old Y position of the mouse.
 */
function scrollWebMenuOnMouseMove(newY = 0, oldY = 0) {
    if(!scrollbarThumbPressed.value || !Boolean(websiteMenuContents.value)) { return; }
    const webMenuContents = websiteMenuContents.value;
    const contentsRect = webMenuContents.getBoundingClientRect();

    if(newY >= contentsRect.bottom) {
        webMenuContents.scrollTop = (webMenuContents.scrollHeight - webMenuContents.clientHeight);
        return;
    } else if(newY <= contentsRect.top) {
        webMenuContents.scrollTop = 0;
        return;
    }

    const divisor = ((styleStore.viewportHeight - (26 / styleStore.cssToWindowHeightRatio)) / (newY - oldY));
    const newValue = (webMenuContents.scrollTop + (webMenuContents.scrollHeight / divisor));
    webMenuContents.scrollTop = Math.max(0, Math.min((webMenuContents.scrollHeight - webMenuContents.clientHeight), newValue));
}

/**
 * This function runs when the user right clicks on the scrollbar.
 * @param {PointerEvent} event The event fired with the right click.
 */
function onScrollBarContextMenu(event) {
    if(event && !event.ctrlKey) { event.preventDefault(); }
}
</script>