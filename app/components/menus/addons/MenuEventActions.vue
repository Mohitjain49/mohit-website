<template>
<div ref="addon-reference" class="mohit-navMenu-addon-child-element"></div>
<div v-show="webMenuScrollable" class="mohit-webMenu-scrollBar" @contextmenu="(event) => { onScrollBarContextMenu(event); }">
    <div class="mohit-webMenu-scrollBar-body">
        <div ref="web-menu-scrollbar-thumb" :class="thumbClasses" :style="scrollbarThumbStyle"></div>
    </div>
</div>
</template>

<script setup>
const SWIPE_THRESHOLD = 75;
var transitionRafId = null;

const emit = defineEmits({
    /** @param {Boolean} status The new status on whether the website menu is scrollable or not. */
    scrollableChange: (status) => { return (typeof status === "boolean"); }
});

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const scrollStore = useScrollStore();

const { websiteMenuMode } = storeToRefs(webData);
const { mouseY, cssToWindowHeightRatio } = storeToRefs(styleStore);

const websiteMenuElementChild = useTemplateRef('addon-reference');
const websiteMenuScrollbarThumb = useTemplateRef('web-menu-scrollbar-thumb');

/** @type {ShallowRef<HTMLDivElement>} This is the main website menu element to use for this component. */
const websiteMenuElement = shallowRef(null);

/** @type {ShallowRef<HTMLDivElement>} This is the website menu element that stores its contents. */
const websiteMenuContents = shallowRef(null);

/** @type {ShallowRef<DOMRect>} This is the DOM Rect of the website menu element that stores its contents. */
const websiteMenuContentsRect = shallowRef(null);

/** @type {Ref<"any" | "up" | "down">} The swipe direction that the menu is allowed to use. */
const swipeDirectionAllowed = ref("any");
const startY = ref(0);
const closeSwipePercent = ref(0);

const webMenuTouched = ref(false);
const scrollbarThumbPressed = ref(false);
const hasTouchEvents = ref(false);

const webMenuScrollable = ref(false);
const contentsClientHeight = ref(0);
const verticalScrollPercent = ref(0);
const menuClientInView = ref(0);

/** @type {AbortController} This abort controller manages aborting the event listeners for this component. */
var eventsAbortController = null;

/** The classes for the custom scrollbar thumb. */
const thumbClasses = computed(() => { return ['inner', (scrollbarThumbPressed.value ? 'active' : '')]; });

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
    setWebsiteMenuTransitionStyles();

    websiteMenuContents.value = webMenu.querySelector(".mohit-navMenu-contents");
    if(!Boolean(websiteMenuContents.value)) { throw new Error("Website Menu Contents Element Not Found."); }

    websiteMenuContents.value.tabIndex = -1;
    websiteMenuContents.value.scrollTo({ top: 0, left: 0, behavior: "instant" });
    websiteMenuContentsRect.value = websiteMenuContents.value.getBoundingClientRect();
    contentsClientHeight.value = websiteMenuContents.value.clientHeight;

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
    window.addEventListener("pointermove", (event) => { onMenuPointerMove(event); }, { signal, passive: false });

    if(hasTouchEvents.value) {
        window.addEventListener("touchend", (event) => { onMenuPointerEvent(event); }, { signal });
        window.addEventListener("touchmove", (event) => { onMenuPointerMove(event); }, { signal, passive: false });
    } else {
        window.addEventListener("pointercancel", (event) => { onMenuPointerEvent(event); }, { signal });
    }

    window.addEventListener("dragstart", (event) => { onMenuPointerEvent(event); }, { signal });
    window.addEventListener("blur", (event) => { onMenuPointerEvent(event); }, { signal });

    // This sets a group of event listeners that can let the user interact with the menu's custom scrollbar.
    if(!Boolean(websiteMenuScrollbarThumb.value)) { throw new Error("Website Menu Scrollbar Thumb Element Not Found."); }
    websiteMenuScrollbarThumb.value.addEventListener("pointerdown", (event) => { onWebsiteMenuScrollbarPointerDown(event); }, { signal });

    window.addEventListener("pointerup", () => { cancelWebsiteMenuScrollbarActions(); }, { signal });
    window.addEventListener("pointercancel", () => { cancelWebsiteMenuScrollbarActions(); }, { signal });
    window.addEventListener("dragstart", () => { cancelWebsiteMenuScrollbarActions(); }, { signal });
    window.addEventListener("blur", () => { cancelWebsiteMenuScrollbarActions(); }, { signal });
});

// This aborts all event listeners and stops the Raf Loop when the component unmounts.
onBeforeUnmount(() => {
    cancelWebsiteMenuScrollbarActions();
    cancelMenuTransitionStyleUpdate();
    if(eventsAbortController != null) { eventsAbortController.abort(); }
});

// This watches the website menu mode so it can reset the styles if necessary.
watch(websiteMenuMode, () => { undoMenuSwipe(false); });

// This scrolls the website menu when the mouse moves and the user is holding the custom scrollbar.
watch(mouseY, (newY, oldY) => { scrollWebMenuOnMouseMove(newY, oldY); });

/**
 * This function changes elements in this component based on menu dimensions.
 * @param {Boolean} firstRun This marks the function as its first time being run for the component.
 */
function changeElementsOnMenuDimensions(firstRun = false) {
    if(!Boolean(websiteMenuElement.value) || !Boolean(websiteMenuContents.value)) { return; }
    const webMenuContents = websiteMenuContents.value;
    const scrollHeight = webMenuContents.scrollHeight;

    const oldClientHeight = contentsClientHeight.value;
    const clientHeight = webMenuContents.clientHeight;
    const getNewClientRect = ((oldClientHeight != clientHeight) || firstRun);

    // If the client height changes for the website menu contents, the function records its new Client Rect.
    if(getNewClientRect) {
        websiteMenuContentsRect.value = websiteMenuContents.value.getBoundingClientRect();
        contentsClientHeight.value = clientHeight;
    }

    // This obtains the new scroll status of the website menu and sees if it has changed or not.
    const oldScrollStatus = webMenuScrollable.value;
    webMenuScrollable.value = (scrollHeight > clientHeight);
    const diffStatus = ((webMenuScrollable.value != oldScrollStatus) || firstRun);

    // This calculates certain numbers and sets a class for the website menu based on its scroll status.
    if(webMenuScrollable.value) {
        if(diffStatus) { emit("scrollableChange", true); }
        verticalScrollPercent.value = convertDecimalToPercent(webMenuContents.scrollTop / (scrollHeight - clientHeight));
        menuClientInView.value = convertDecimalToPercent(clientHeight / scrollHeight);
    } else if(!webMenuScrollable.value && diffStatus) {
        emit("scrollableChange", false);
        verticalScrollPercent.value = 0;
        menuClientInView.value = 100;
    }
}

/**
 * This function is triggered when the user enacts a pointer event on a website menu.
 * @param {PointerEvent | TouchEvent} event The Pointer Event. 
 */
function onMenuPointerEvent(event = null) {
    if(!event || !event.type || !websiteMenuElement.value || !websiteMenuContents.value) { return; }
    const eType = event.type;

    if(eType === "pointerdown" && !webMenuTouched.value) {
        const webMenuSwipeWithTouch = (event.pointerType !== "mouse");
        if(webMenuSwipeWithTouch && !hasTouchEvents.value) { return; }
        webData.bypassBodyClick();

        if(webMenuScrollable.value) {
            if(webMenuSwipeWithTouch) {
                const contentsScrollTop = websiteMenuContents.value.scrollTop;
                const contentsScrollMax = (websiteMenuContents.value.scrollHeight - websiteMenuContents.value.clientHeight - 2);

                if(contentsScrollTop <= 2) {
                    swipeDirectionAllowed.value = "down";
                } else if(contentsScrollTop >= contentsScrollMax) {
                    swipeDirectionAllowed.value = "up";
                } else {
                    undoMenuSwipe(false);
                    return;
                }
            } else {
                /** @type {Element} This is the exact element the user pressed down on for this event. */
                const elementPressed = event.target;
                if(!elementPressed.closest(".mohit-navMenu-top")) { return; }
            }
        }

        resetWebsiteMenuTransitionStyles(false);
        if(!webMenuSwipeWithTouch) { swipeDirectionAllowed.value = "any"; }
        startY.value = (event.clientY || mouseY.value);
        webMenuTouched.value = true;
    } else if(webMenuTouched.value) {
        if(eType === "pointerup" || eType === "touchend") {
            webMenuTouched.value = false;

            if(closeSwipePercent.value >= 0.9) {
                webData.closeNavMenu();
                triggerClickSound();
            } else {
                undoMenuSwipe(true);
            }
        } else if(eType === "dragstart" || eType === "blur" || eType === "pointercancel") {
            undoMenuSwipe(true);
        }
    }
}

/**
 * This function runs on a "pointermove" or "touchmove" event for the website menu swipe functionality. 
 * @param {PointerEvent} event The event fired with the pointer or finger move.
 */
function onMenuPointerMove(event = null) {
    if(!event || !webMenuTouched.value) { return; }
    const allowedDirection = swipeDirectionAllowed.value;

    // Stops the swipe action if move events cannot be canceled.
    if(!event.cancelable) {
        undoMenuSwipe(false);
        return;
    }

    if(allowedDirection === "down" && mouseY.value < startY.value) { return; }
    if(allowedDirection === "up" && mouseY.value > startY.value) { return; }

    event.preventDefault();
    closeSwipePercent.value = roundNumber(((startY.value - mouseY.value) / (SWIPE_THRESHOLD / cssToWindowHeightRatio.value)), 2);
    if(transitionRafId != null) { return; }

    const newValue = Math.min(0.5, (closeSwipePercent.value / 2));
    const opacityNum = Math.min(1, (1 - newValue));
    var transformNum = 0;

    if(websiteMenuMode.value == 1) {
        transformNum = Math.min(SWIPE_THRESHOLD, ((mouseY.value - startY.value) * cssToWindowHeightRatio.value));
    } else {
        transformNum = Math.min(0, (newValue * -10));
    }

    // This sets the transition styles. It is wrapped in a Raf Loop to ensure it does not lag the website.
    transitionRafId = requestAnimationFrame(() => { setWebsiteMenuTransitionStyles(opacityNum, transformNum); });
}

/** This cancels the current animation frame request to set the transition styles if one exists. */
function cancelMenuTransitionStyleUpdate() {
    if(transitionRafId != null) { cancelAnimationFrame(transitionRafId); }
    transitionRafId = null;
}

/**
 * This function sets the transition styles for any website menu. Passing in no parameters resets it to their default places.
 * @param {Number} opacity The opacity of the website menu.
 * @param {Number} transform The translate Y value for the transform attribute.
 */
function setWebsiteMenuTransitionStyles(opacity = 1, transform = 0) {
    websiteMenuElement.value.style.setProperty("--nav-menu-opacity", String(opacity));
    websiteMenuElement.value.style.setProperty("--nav-menu-transform", "translateY(" + String(transform) + "px)");
    transitionRafId = null;
}

/**
 * This resets the website menu's transition styles.
 * @param {Boolean} addTransitionToReset If true, this adds a transition to the reset.
 */
function resetWebsiteMenuTransitionStyles(addTransitionToReset = false) {
    if(!import.meta.client || !Boolean(websiteMenuElement.value)) { return; }
    websiteMenuElement.value.style.setProperty("--nav-menu-transition-seconds", (addTransitionToReset ? "0.25s" : "0s"));
    cancelMenuTransitionStyleUpdate();
    setWebsiteMenuTransitionStyles();
}

/**
 * This undoes any effect of a website menu swipe.
 * @param {Boolean} addTransitionToReset If true, this adds a transition to the reset.
 */
function undoMenuSwipe(addTransitionToReset = false) {
    swipeDirectionAllowed.value = "any";
    webMenuTouched.value = false;
    resetWebsiteMenuTransitionStyles(addTransitionToReset);
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
function onWebsiteMenuScrollbarPointerDown(event = null) {
    if(!event || event.pointerType !== "mouse") { return; }
    scrollbarThumbPressed.value = true;
    setUserSelect(true);
    webData.bypassBodyClick();

    if(Boolean(websiteMenuContents.value)) { websiteMenuContents.value.focus(); }
    event.preventDefault();
    event.stopPropagation();
}

/** This cancels the website menu's scrollbar actions. */
function cancelWebsiteMenuScrollbarActions() {
    scrollbarThumbPressed.value = false;
    setUserSelect(false);
}

/**
 * This function scrolls the Website Menu when the mouse moves.
 * @param {Number} newY The new Y position of the mouse.
 * @param {Number} oldY The old Y position of the mouse.
 */
function scrollWebMenuOnMouseMove(newY = 0, oldY = 0) {
    if(!scrollbarThumbPressed.value || !Boolean(websiteMenuContents.value) || scrollStore.scrollKeyPressed) { return; }
    const webMenuContents = websiteMenuContents.value;
    const contentsRect = webMenuContents.getBoundingClientRect();

    if(newY <= contentsRect.top) {
        webMenuContents.scrollTop = 0;
    } else if(newY >= contentsRect.bottom) {
        webMenuContents.scrollTop = (webMenuContents.scrollHeight - webMenuContents.clientHeight);
    } else {
        const divisor = ((styleStore.viewportHeight - (26 / styleStore.cssToWindowHeightRatio)) / (newY - oldY));
        const newValue = roundNumber(webMenuContents.scrollTop + (webMenuContents.scrollHeight / divisor));
        webMenuContents.scrollTop = clampNumber(newValue, 0, (webMenuContents.scrollHeight - webMenuContents.clientHeight));
    }
}

/**
 * This function runs when the user right clicks on the scrollbar.
 * @param {PointerEvent} event The event fired with the right click.
 */
function onScrollBarContextMenu(event) {
    if(event && !event.ctrlKey) { event.preventDefault(); }
}
</script>