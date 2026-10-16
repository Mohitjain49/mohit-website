<template>
<Teleport :to="teleportQuery">
    <Transition name="fade-context-menu-transition">
        <div v-show="showLineOptions" :id="LINE_OPTIONS_ELEMENT_ID" :class="['mohit-script-lineOptions', lineOptions.extraClass]">
            <div class="mohit-script-lineOptions-top" ref="mohit-line-options-top">
                <h3> Line <span id="lineOptions-num" v-html="viewableLineOptionsNum"></span> </h3>
                <div class="mohit-script-lineOptions-topOpts">
                    <button class="web-menu" @click="openScriptsMenu()" ref="options-open-web-menu-btn" title="Open Scripts Menu">
                        <FontAwesomeIcon icon="fa-file-export" :jello="animateWebMenuButton" />
                    </button>
                    <button @click="closeLineOptionsMenu()" ref="options-close-btn" :title="('Close Options For Line ' + viewableLineOptionsNum)">
                        <FontAwesomeIcon icon="fa-xmark" :jello="animateCloseButton" />
                    </button>
                </div>
            </div>
            <button @click="scriptsStore.copyLineAttribute('text')" v-action-cursor="(copyingText ? lineOptions.copyStatus : 0)">
                <span> Copy Text </span>
                <FontAwesomeActionIcon v-if="copyingText" :baseIcon="SCRIPT_COPY_BASE_ICON" :status="lineOptions.copyStatus" />
                <FontAwesomeIcon v-else :icon="SCRIPT_COPY_BASE_ICON" />
            </button>
            <button @click="scriptsStore.copyLineAttribute('link')" v-action-cursor="(copyingLink ? lineOptions.copyStatus : 0)">
                <span> Copy Permalink </span>
                <FontAwesomeActionIcon v-if="copyingLink" :baseIcon="SCRIPT_PERMALINK_COPY_BASE_ICON" :status="lineOptions.copyStatus" />
                <FontAwesomeIcon v-else :icon="SCRIPT_PERMALINK_COPY_BASE_ICON" />
            </button>
            <button class="share" @click="openSharePopupForPermalink()">
                <span> Share Permalink </span> <FontAwesomeIcon icon="fa-share-from-square" />
            </button>
        </div>
    </Transition>
</Teleport>
</template>

<script setup>
const LINE_OPTIONS_ELEMENT_ID = "mohit-line-options";

const webData = useWebsiteDataStore();
const scriptsStore = useScriptsStore();
const { lineOptions } = storeToRefs(scriptsStore);

const closeButton = useTemplateRef('options-close-btn');
const webMenuButton = useTemplateRef('options-open-web-menu-btn');
const hoverOnCloseButton = useElementHover(closeButton);
const hoverOnWebMenuButton = useElementHover(webMenuButton);

const viewableLineOptionsNum = ref(1);
const animateCloseButton = ref(false);
const animateWebMenuButton = ref(false);

/** This is the teleport query that should be used by the Vue.js Teleport Component. */
const teleportQuery = computed(() => { return ("#L" + String(viewableLineOptionsNum.value) + " .mohit-scriptPage-code-lineNum"); });

/** @type {AbortController} The abort controller for the event listeners here. */
var lineOptionsAbortController = null;
const lineOptionsNum = computed(() => { return lineOptions.value.num; });
const showLineOptions = computed(() => { return scriptsStore.checkLineNumber(lineOptionsNum.value); });

const copyingText = computed(() => { return (lineOptions.value.lastCopied === "text"); });
const copyingLink = computed(() => { return (lineOptions.value.lastCopied === "link"); });

watch(hoverOnCloseButton, (newValue) => { animateCloseButton.value = newValue; });
watch(hoverOnWebMenuButton, (newValue) => { animateWebMenuButton.value = newValue; });
watch(lineOptionsNum, () => { onLineOptionsNumChange(); });

// This mounts a few event listeners that help close the line options menu if the proper HTML Element is not clicked.
onMountedAdvanced(() => {
    lineOptionsAbortController = new AbortController();
    const signal = lineOptionsAbortController.signal;

    if('onpointerdown' in window){
        window.addEventListener("pointerdown", (event) => { checkComponentStayVisible(event); }, { signal });
    } else {
        window.addEventListener("mousedown", (event) => { checkComponentStayVisible(event); }, { signal });
        window.addEventListener("touchstart", (event) => { checkComponentStayVisible(event); }, { signal, passive: false });
    }

    // This manages what happens if the user right clicks on the Line Options Menu.
    document.getElementById(LINE_OPTIONS_ELEMENT_ID).addEventListener("contextmenu", (event) => { onMenuRightClick(event); }, { signal });
});

// This aborts the event listeners when the user leaves the webpage.
onBeforeUnmount(() => { if(lineOptionsAbortController != null) { lineOptionsAbortController.abort(); }});

/** This function opens the scripts menu. */
function openScriptsMenu() {
    closeLineOptionsMenu();
    webData.bypassBodyClick();
    webData.setMenuOpen(SCRIPTS_MENU, false);
}

/** This opens the share popup for the Line Permalink. */
function openSharePopupForPermalink() {
    const currentLineNum = lineOptionsNum.value;
    closeLineOptionsMenu();
    scriptsStore.shareLinePermalink(currentLineNum);
}

/** This function closes the line options menu. */
function closeLineOptionsMenu() {
    stopButtonAnimations();
    scriptsStore.closeLineOptions();
}

/** This function stops animations for all buttons in this menu. */
function stopButtonAnimations() {
    animateCloseButton.value = false;
    animateWebMenuButton.value = false;
}

/** This function runs whenever the number for what code line the menu represents changes. */
function onLineOptionsNumChange() {
    stopButtonAnimations();
    const newNum = lineOptionsNum.value;
    if(scriptsStore.checkLineNumber(newNum)) { viewableLineOptionsNum.value = newNum; }
}

/**
 * Given an element, this closes the Line Options Menu if the element is not a valid element to click.
 * @param {PointerEvent} event The event fired from the window event listener.
 */
function checkComponentStayVisible(event = null) {
    // console.log(event);
    if(!event || !event.target) { return; }

    /** @type {Element} The element target from the event. */
    const element = event.target;
    const lineOptionsElement = document.getElementById(LINE_OPTIONS_ELEMENT_ID);

    if(lineOptionsElement == null || !(element instanceof Element)) { return; }
    if(lineOptionsElement === element || lineOptionsElement.contains(element)) { return; }

    const clickOnLine = Boolean(element.closest("#L" + lineOptionsNum.value));
    const eventType = event.type;

    if(clickOnLine) {
        if((eventType === "pointerdown") && (event.pointerType !== "mouse" || event.buttons == 1)) { return; }
        if(eventType === "mousedown" && event.buttons == 1) { return; }
        if(eventType === "touchstart") { return; }
    }

    // Closes the line options menu if all conditions have been met.
    scriptsStore.closeLineOptions();
}

/**
 * This function runs whenever the user right clicks on the line options menu.
 * @param {PointerEvent} event The emitted event.
 */
function onMenuRightClick(event) {
    if(!event || !event.target || event.ctrlKey) { return; }
    event.preventDefault();
    
    /** @type {HTMLElement} The element right clicked on. */
    const element = event.target;
    if(!(element instanceof Element)) { return; }

    const closestButton = element.closest("button, a, link");
    if(!closestButton) { return; }

    closestButton.click();
    triggerClickSound();
}
</script>