<template>
<div class="file-widgets-container" ref="file-widgets-container">
    <Transition name="file-widgets-transition" appear>
        <AnimatedIconButton v-if="showMinimizeWidget" id="minimizeScreen-widget" :title="minimizeTitle" :faIcon="'fa-compress'"
            :handleClick="() => { exitFS(); }"
        />
    </Transition>
    <Transition name="file-widgets-transition" appear>
        <AnimatedIconButton v-if="!fullScreenSet" id="download-file-widget" :title="fileOptionsTitle"
            :faIcon="(onDocumentRoute ? 'fa-file-pdf' : 'fa-file-export')"
            :handleClick="() => { openOptions(); }"
        />
    </Transition>

    <Transition name="file-widgets-transition" appear>
        <div v-if="showPageNavigationWidget" class="page-navigation-widget">
            <AnimatedIconButton :faIcon="'fa-chevron-left'" :size="NAV_ARROWS_SIZE" :title="previousPageScrollTitle"
                :disableHover="leftArrowDisabled"
                :style="{ cursor: (leftArrowDisabled ? 'default' : 'pointer') }"
                :class="['page-nav-side-button', (leftArrowDisabled ? 'inactive' : '')]"
                :handleClick="() => { navigatePage('down'); }"
            />
            <div class="page-nav-center">
                <input id="page-number-mohit" type="text" inputmode="numeric" autocomplete="off" enterkeyhint="done"
                    v-model="widgetPageNumber"
                    :readonly="isAutoScrolling"
                    @input="() => { onWidgetPageNumberChange(); }"
                    @keydown="(event) => { onPageNumberKeydown(event); }"
                />
                <span>{{ ('/ ' + documentStore.docTotalPages) }}</span>  
            </div>
            <AnimatedIconButton :faIcon="'fa-chevron-right'" :size="NAV_ARROWS_SIZE" :title="nextPageScrollTitle"
                :disableHover="rightArrowDisabled"
                :style="{ cursor: (rightArrowDisabled ? 'default' : 'pointer') }"
                :class="['page-nav-side-button', (rightArrowDisabled ? 'inactive' : '')]"
                :handleClick="() => { navigatePage('up'); }"
            />
        </div>
    </Transition>
</div>
</template>

<script setup>
const PAGE_NUMBER_REGEX = /^[0-9]*$/;
const NAV_ARROWS_SIZE = 15;

const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const scriptsStore = useScriptsStore();
const styleStore = useStyleStore();

const fullScreenSet = getFullScreenSet();
const { onDocumentRoute, currentObservedPage } = storeToRefs(documentStore);
const { isAutoScrolling } = storeToRefs(useScrollStore());

const widgetPageNumber = ref("1");
const minimizeTitle = computed(() => { return (onDocumentRoute.value ? "Minimize Document" : "Minimize Script"); });
const fileOptionsTitle = computed(() => { return (onDocumentRoute.value ? "Open Document Options" : "Open Script Options"); });

const hfBottomBarVisible = useState("hosted-file-bottom-bar-visible", () => { return false; });
const largeWindowWidth = computed(() => { return (onDocumentRoute.value && (styleStore.cssViewportWidth > (documentStore.customPdfWidth + 150))); });
const showMinimizeWidget = computed(() => { return (fullScreenSet.value && (!hfBottomBarVisible.value || largeWindowWidth.value)); });
const showPageNavigationWidget = computed(() => { return (onDocumentRoute.value && documentStore.docLoaded && (documentStore.docTotalPages > 1)); });

const onFirstPage = computed(() => { return (currentObservedPage.value <= 1); });
const onLastPage = computed(() => { return (currentObservedPage.value >= documentStore.docTotalPages); });

const leftArrowDisabled = computed(() => { return (onFirstPage.value || isAutoScrolling.value); });
const rightArrowDisabled = computed(() => { return (onLastPage.value || isAutoScrolling.value); });

const previousPageScrollTitle = computed(() => {
    if(isAutoScrolling.value) { return "Waiting For Autoscroll to finish..." }
    return (onFirstPage.value ? 'Cannot Scroll Before Page 1.' : ('Scroll To Page ' + (currentObservedPage.value - 1)));
});
const nextPageScrollTitle = computed(() => {
    if(isAutoScrolling.value) { return "Waiting For Autoscroll to finish..." }
    return (onLastPage.value ? ('Cannot Scroll After Page ' + currentObservedPage.value + '.') : ('Scroll To Page ' + (currentObservedPage.value + 1)));
});

// This sets the widget page number to the last observed page when it changes.
watch(currentObservedPage, () => { resetWidgetPageNumber(); });

/** This function opens the options for the file. */
function openOptions() {
    webData.bypassBodyClick();
    webData.setMenuOpen((onDocumentRoute.value ? DOCUMENT_MENU : SCRIPTS_MENU), true);
}

/** This function exits out of full screen mode for a hosted file. */
function exitFS() {
    if(!fullScreenSet.value) { return; }
    if(onDocumentRoute.value) {
        documentStore.toggleDocumentFullScreen();
    } else {
        scriptsStore.toggleScriptFullScreen();
    }
}

/** This function resets the widget page number to the current observed page. */
function resetWidgetPageNumber() {
    widgetPageNumber.value = String(currentObservedPage.value);
}

/**
 * This function returns the classes for a navigation arrow.
 * @param {Boolean} isInactive If true OR if the website is auto-scrolling, the "inactive" class is added.
 */
function getNavArrowClasses(isInactive = false) {
    return ['page-nav-side-button', ((isInactive || isAutoScrolling.value) ? 'inactive' : '')];
}

/**
 * This function navigates a page either up or down one page.
 * @param {"up" | "down"} direction The direction to go.
 */
function navigatePage(direction = "up") {
    if(isAutoScrolling.value) { return; }
    if(direction === "up" && !onLastPage.value) {
        documentStore.scrollToPage(Math.max(1, (currentObservedPage.value + 1)));
    } else if(direction === "down" && !onFirstPage.value) {
        documentStore.scrollToPage(Math.min(documentStore.docTotalPages, (currentObservedPage.value - 1)));
    }
}

/**
 * This function runs when the widget page number changes.
 * @param {Boolean} strict If true, the number must be no more than the max number of pages in the document. 
 */
function onWidgetPageNumberChange(strict = false) {
    if(widgetPageNumber.value === "") { return; }
    const editedNumber = Number(widgetPageNumber.value);
    const maxNum = (strict ? documentStore.docTotalPages : 999);

    if(!PAGE_NUMBER_REGEX.test(widgetPageNumber.value) || isNaN(editedNumber) || editedNumber > maxNum) {
        resetWidgetPageNumber();
    } else {
        widgetPageNumber.value = clampNumber(editedNumber, 1, maxNum).toFixed(0);
    }
}

/**
 * This functions whenever the user presses a key on the page number input.
 * @param {KeyboardEvent} event The event fired by clicking a key.
 */
function onPageNumberKeydown(event) {
    if(!event || !event.key) { return; }
    const key = event.key.toLowerCase();

    if(key === "enter" && !event.repeat) {
        onWidgetPageNumberChange();
        const editedNumber = parseInt(widgetPageNumber.value, 10);

        if(editedNumber === currentObservedPage.value) { return; }
        document.getElementById("page-number-mohit")?.blur();

        if(widgetPageNumber.value === "" || !documentStore.checkValidPageNumber(editedNumber)) {
            resetWidgetPageNumber();
        } else {
            documentStore.scrollToPage(editedNumber);
            triggerClickSound();
        }
    } else if((key === "arrowup" || key === "w" || key === "arrowright" || key === "d") && !event.ctrlKey) {
        event.preventDefault();
        if(widgetPageNumber.value < documentStore.docTotalPages) { widgetPageNumber.value++; }
        onWidgetPageNumberChange(false);
    } else if((key === "arrowdown" || key === "s" || key === "arrowleft" || key === "a")  && !event.ctrlKey) {
        event.preventDefault();
        if(widgetPageNumber.value > 1) { widgetPageNumber.value--; }
        onWidgetPageNumberChange(false);
    }
}
</script>

<style scoped lang="scss">
#minimizeScreen-widget {
    position: fixed;
    bottom: 12px;
    left: 12px;
    background-color: var(--dark-background);
    border: 2px solid var(--lightning-yellow);
    color: var(--lightning-yellow);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    transition: var(--default-transition), scale 0.2s, opacity 0.5s, transform 0.5s;
}
#minimizeScreen-widget:hover {
    box-shadow: 0px 0px 10px 1px var(--lightning-yellow);
    scale: 1.1;
}

#download-file-widget {
    position: fixed;
    bottom: 12px;
    left: 12px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-light-text);
    color: var(--website-light-text);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    transition: var(--default-transition), scale 0.2s, opacity 0.5s, transform 0.5s;
}
#download-file-widget:hover {
    box-shadow: 0px 0px 10px 1px var(--website-light-text);
    scale: 1.1;
}

.page-navigation-widget {
    position: fixed;
    bottom: 12px;
    left: calc((100% - 125px) / 2);
    height: 25px;
    width: 125px;
    background-color: black;
    border: 2px solid white;
    color: white;
    border-radius: 10px;
    overflow: hidden;
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 20px;
    box-shadow: 0px 0px 10px 2px black;
    overflow: hidden;
}
.page-nav-center {
    width: 73px;
    border-left: 1px solid white;
    border-right: 1px solid white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: inherit;
    font-family: 'lexend', sans-serif;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
}

.page-nav-center input {
    all: unset;
    width: 25px;
    text-align: center;
    background-color: rgb(71, 71, 71);
    margin-right: 3px;
    border-radius: 4px;
    border: 1px solid white;
}

.page-nav-side-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 25px;
    height: 100%;
    transition: background-color 0.2s;
    color: white;
    background-color: transparent;
}
.page-nav-side-button:hover {
    background-color: rgba(255, 255, 255, 0.25);
}

.page-nav-side-button.inactive { color: grey; }
.page-nav-side-button.inactive:hover { background-color: transparent; }

.file-widgets-transition-enter-active, .file-widgets-transition-leave-active {
    transition: opacity 0.5s, transform 0.5s !important;
}
.file-widgets-transition-enter-from, .file-widgets-transition-leave-to {
    opacity: 0;
    transform: translateY(74px);
    user-select: none;
    pointer-events: none;
    touch-action: none;
    interactivity: inert;
}   
.file-widgets-transition-enter-to, .file-widgets-transition-leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>