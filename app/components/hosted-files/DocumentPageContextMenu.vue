<template>
<Transition name="fade-context-menu-transition">
    <div v-show="showDocumentContextMenu" :style="contextMenuPosition" :id="CONTEXT_MENU_ID" class="mohit-hostedDoc-contextMenu">
        <div class="mohit-hostedDoc-contextMenu-top">
            <h3> Page <span id="mohit-document-contextMenu-pageNum" v-html="viewablePageNumber"></span> </h3>
            <div class="mohit-hostedDoc-contextMenu-topOpts">
                <button class="web-menu" @click="openDocumentMenu()" ref="options-open-web-menu-btn" title="Open Document Menu">
                    <FontAwesomeIcon icon="fa-file-export" :jello="animateWebMenuButton" />
                </button>
                <button @click="closeDocumentContextMenu()" ref="options-close-btn" title="Close Context Menu">
                    <FontAwesomeIcon icon="fa-xmark" :jello="animateCloseButton" />
                </button>
            </div>
        </div>
        <button @click="copyPageLink()">
            <span> Copy Permalink </span> <FontAwesomeIcon :icon="COPY_STATUS_ICON[copyStatus]" :spin-pulse="(copyStatus == 1)" />
        </button>
        <button class="share" @click="sharePageLink()">
            <span> Share Permalink </span> <FontAwesomeIcon icon="fa-share-from-square" />
        </button>
    </div>
</Transition>
</template>

<script setup>
const CONTEXT_MENU_ID = "mohit-document-contextMenu";
const COPY_STATUS_ICON = ["fa-copy", "fa-spinner", "fa-check", "fa-ban"];
const router = useRouter();

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const documentStore = useDocumentStore();
const { contextMenuPageNumber } = storeToRefs(documentStore);

const closeButton = useTemplateRef('options-close-btn');
const webMenuButton = useTemplateRef('options-open-web-menu-btn');
const hoverOnCloseButton = useElementHover(closeButton);
const hoverOnWebMenuButton = useElementHover(webMenuButton);

/** @type {AbortController} The abort controller for the event listeners here. */
var docContextMenuAbortController = null;
const showDocumentContextMenu = computed(() => { return (contextMenuPageNumber.value > 0); });
const contextMenuPosition = ref({ left: "0px", top: "0px" });

const viewablePageNumber = ref(1);
const copyStatus = ref(0);
const animateCloseButton = ref(false);
const animateWebMenuButton = ref(false);

watch(hoverOnCloseButton, (newValue) => { animateCloseButton.value = newValue; });
watch(hoverOnWebMenuButton, (newValue) => { animateWebMenuButton.value = newValue; });
watch(contextMenuPageNumber, () => { onContextMenuPageNumberChange(); });

/** This function is the permalink for a specific page. */
const pagePermalink = computed(() => {
    var routePath = router.currentRoute.value.path.substring(1);
    if(routePath.endsWith("/")) { routePath = routePath.substring(0, routePath.length - 1); }
    return (PERSONAL_WEBSITE_LINK + routePath + "/#page_" + viewablePageNumber.value);
})

// This mounts a few event listeners that help close the hosted document context menu if the proper HTML Element is not clicked.
onMountedAdvanced(() => {
    docContextMenuAbortController = new AbortController();
    const signal = docContextMenuAbortController.signal;

    window.addEventListener("pointerdown", (event) => { checkComponentStayVisible(event); }, { signal });
    window.addEventListener("mousedown", (event) => { checkComponentStayVisible(event); }, { signal });
    window.addEventListener("touchstart", (event) => { checkComponentStayVisible(event); }, { signal });
});

// This aborts the event listeners when the user leaves the webpage.
onBeforeUnmount(() => { if(docContextMenuAbortController != null) { docContextMenuAbortController.abort(); }});

/** This function opens the main hosted Document menu. */
function openDocumentMenu() {
    closeDocumentContextMenu();
    webData.bypassBodyClick();
    webData.setMenuOpen(DOCUMENT_MENU, false);
}

/** This function closes the hosted document context menu. */
function closeDocumentContextMenu() {
    stopButtonAnimations();
    documentStore.setContextMenuPageNumber(0);
}

/** This function stops animations for all buttons in this menu. */
function stopButtonAnimations() {
    animateCloseButton.value = false;
    animateWebMenuButton.value = false;
}

/** This function is triggered every time the page number for the context menu changes. */
function onContextMenuPageNumberChange() {
    stopButtonAnimations();
    setContextMenuPosition();

    const newNumber = contextMenuPageNumber.value;
    if(newNumber >= 1 && newNumber <= documentStore.docLoaded.totalPages) { viewablePageNumber.value = newNumber; }
}

/**
 * Given an element, this closes the Hosted Document Context Menu if the element is not a valid element to click.
 * @param {Event} event The event fired from the window event listener.
 */
function checkComponentStayVisible(event = null) {
    // console.log(event);
    if(!event || !event.target) { return; }

    /** @type {Element} The element target from the event. */
    const element = event.target;
    const docContextMenu = document.getElementById(CONTEXT_MENU_ID);

    if(docContextMenu == null || !(element instanceof Element)) { return; }
    if(docContextMenu === element || docContextMenu.contains(element)) { return; }
    documentStore.setContextMenuPageNumber(0);
}

/** This function sets the current position of the context menu based on the position of the user's mouse. */
async function setContextMenuPosition() {
    if(!showDocumentContextMenu.value || !import.meta.client) { return; }
    const mouseX = (styleStore.mouseX + 2);
    const mouseY = (styleStore.mouseY + 2);

    /** The new position for the context menu. */
    const newPosition = {
        left: (String(mouseX * styleStore.cssToWindowWidthRatio) + "px"),
        top: (String(mouseY * styleStore.cssToWindowHeightRatio) + "px")
    }

    await nextTick();
    const docContextMenuRect = document.getElementById(CONTEXT_MENU_ID).getBoundingClientRect();

    if((mouseX + docContextMenuRect.width) > (window.innerWidth - 20)) {
        newPosition.left = (String((mouseX - docContextMenuRect.width) * styleStore.cssToWindowWidthRatio) + "px");
    }
    if((mouseY + docContextMenuRect.height) > (window.innerHeight - 20)) {
        newPosition.top = (String((mouseY - docContextMenuRect.height) * styleStore.cssToWindowHeightRatio) + "px");
    }

    // Sets the new context menu position.
    contextMenuPosition.value = newPosition;
}

/** This function opens the share popup for the page link. */
function sharePageLink() {
    closeDocumentContextMenu();
    webData.setQRCodePopup(pagePermalink.value);
}

/** This function lets the user copy the Page Link. */
async function copyPageLink() {
    if(copyStatus.value != 0) { return; }
    copyStatus.value = 1;

    try {
        await navigator.clipboard.writeText(pagePermalink.value);
        copyStatus.value = 2;
    } catch(e) {
        copyStatus.value = 3;
    } finally {
        setTimeout(() => { copyStatus.value = 0; }, 3000);
    }
}
</script>