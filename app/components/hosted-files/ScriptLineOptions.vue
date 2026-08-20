<template>
<Transition name="fade-context-menu-transition">
    <div v-show="showLineOptions" :style="lineOptions.style" :id="LINE_OPTIONS_ELEMENT_ID" class="mohit-script-lineOptions">
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
        <button @click="scriptsStore.copyLineAttribute('text')">
            <span> Copy Text </span> <FontAwesomeIcon :icon="scriptsStore.copyCodeTextIcon" />
        </button>
        <button @click="scriptsStore.copyLineAttribute('link')">
            <span> Copy Permalink </span> <FontAwesomeIcon :icon="scriptsStore.copyCodePermalinkIcon" />
        </button>
        <button class="share" @click="scriptsStore.shareLinePermalink()">
            <span> Share Permalink </span> <FontAwesomeIcon icon="fa-share-from-square" />
        </button>
    </div>
</Transition>
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

/** @type {AbortController} The abort controller for the event listeners here. */
var lineOptionsAbortController = null;
const lineOptionsNum = computed(() => { return lineOptions.value.num; });
const showLineOptions = computed(() => { return (lineOptionsNum.value > 0); });

const viewableLineOptionsNum = ref(1);
const animateCloseButton = ref(false);
const animateWebMenuButton = ref(false);

watch(hoverOnCloseButton, (newValue) => { animateCloseButton.value = newValue; });
watch(hoverOnWebMenuButton, (newValue) => { animateWebMenuButton.value = newValue; });
watch(lineOptionsNum, () => { onLineOptionsNumChange(); });

// This mounts a few event listeners that help close the line options menu if the proper HTML Element is not clicked.
onMountedAdvanced(() => {
    lineOptionsAbortController = new AbortController();
    const signal = lineOptionsAbortController.signal;

    window.addEventListener("pointerdown", (event) => { checkComponentStayVisible(event); }, { signal });
    window.addEventListener("mousedown", (event) => { checkComponentStayVisible(event); }, { signal });
    window.addEventListener("touchstart", (event) => { checkComponentStayVisible(event); }, { signal });
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
    if(newNum > 0 && newNum < Number.POSITIVE_INFINITY) { viewableLineOptionsNum.value = newNum; }
}

/**
 * Given an element, this closes the Line Options Menu if the element is not a valid element to click.
 * @param {Event} event The event fired from the window event listener.
 */
function checkComponentStayVisible(event = null) {
    // console.log(event);
    if(!event || !event.target) { return; }

    /** @type {Element} The element target from the event. */
    const element = event.target;
    const lineOptionsElement = document.getElementById(LINE_OPTIONS_ELEMENT_ID);

    if(lineOptionsElement == null || !(element instanceof Element)) { return; }
    if(lineOptionsElement === element || lineOptionsElement.contains(element)) { return; }
    scriptsStore.closeLineOptions();
}

/**
 * This function runs whenever the user right clicks on the line options menu.
 * @param {PointerEvent} event The emitted event.
 */
function onMenuRightClick(event) {
    if(!event) { return; }
    event.preventDefault();
    
    /** @type {HTMLElement} The element right clicked on. */
    const element = event.target;
    const closestButton = element.closest("button");
    const closestLink = element.closest("link");

    if(closestButton) { closestButton.click(); }
    if(closestLink) { closestLink.click(); }
}
</script>