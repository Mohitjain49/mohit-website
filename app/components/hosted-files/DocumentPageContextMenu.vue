<template>
<Transition name="fade-context-menu-transition">
    <div v-show="showDocumentContextMenu" :style="contextMenuPosition" :id="CONTEXT_MENU_ID" class="mohit-hostedDoc-contextMenu">
        <div class="mohit-hostedDoc-contextMenu-top">
            <h3 v-if="!onResumeRoute"> Page <span id="mohit-document-contextMenu-pageNum" v-html="viewablePageNumber"></span> </h3>
            <h3 v-if="onResumeRoute"> <span id="mohit-document-contextMenu-pageNum"> My Resume </span> </h3>

            <div class="mohit-hostedDoc-contextMenu-topOpts">
                <AnimatedIconButton class="resume-menu" @click="openWebsiteMenu(RESUME_MENU)" title="Edit Resume Components" :faIcon="'fa-gears'" />
                <AnimatedIconButton class="web-menu" @click="openWebsiteMenu(DOCUMENT_MENU)" title="Open Document Menu" :faIcon="'fa-file-pdf'" />
                <AnimatedIconButton @click="closeDocumentContextMenu()" title="Close Context Menu" :faIcon="'fa-xmark'" />
            </div>
        </div>

        <button @click="copyPageLink()" v-action-cursor="copyStatus">
            <span> Copy Page Link </span> <FontAwesomeActionIcon :baseIcon="'fa-copy'" :status="copyStatus" />
        </button>
        <button class="share" @click="sharePageLink()">
            <span> Share Page Link </span> <FontAwesomeIcon icon="fa-share-from-square" />
        </button>
    </div>
</Transition>
</template>

<script setup>
const CONTEXT_MENU_ID = "mohit-document-contextMenu";
const router = useRouter();

const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const documentStore = useDocumentStore();
const { contextMenuPageNumber, onResumeRoute } = storeToRefs(documentStore);

/** @type {AbortController} The abort controller for the event listeners here. */
var docContextMenuAbortController = null;
const showDocumentContextMenu = computed(() => { return (contextMenuPageNumber.value > 0); });
const contextMenuPosition = ref({ left: "0px", top: "0px" });

const viewablePageNumber = ref(1);
const copyStatus = ref(0);
watch(contextMenuPageNumber, () => { onContextMenuPageNumberChange(); });

// This mounts a few event listeners that help close the hosted document context menu if the proper HTML Element is not clicked.
onMountedAdvanced(() => {
    docContextMenuAbortController = new AbortController();
    const signal = docContextMenuAbortController.signal;

    window.addEventListener("pointerdown", (event) => { checkComponentStayVisible(event); }, { signal });
    window.addEventListener("mousedown", (event) => { checkComponentStayVisible(event); }, { signal });
    window.addEventListener("touchstart", (event) => { checkComponentStayVisible(event); }, { signal });
    document.getElementById(CONTEXT_MENU_ID).addEventListener("contextmenu", (event) => { onMenuRightClick(event); }, { signal });
});

// This aborts the event listeners when the user leaves the webpage.
onBeforeUnmount(() => { if(docContextMenuAbortController != null) { docContextMenuAbortController.abort(); }});

/**
 * This function opens a website menu
 * @param {Number} num The number of the website menu
 */
function openWebsiteMenu(num = DOCUMENT_MENU) {
    closeDocumentContextMenu();
    webData.bypassBodyClick();
    webData.setMenuOpen(num, false);
}

/** This function closes the hosted document context menu. */
function closeDocumentContextMenu() { documentStore.setContextMenuPageNumber(0); }

/** This function is triggered every time the page number for the context menu changes. */
function onContextMenuPageNumberChange() {
    setContextMenuPosition();
    const newNumber = contextMenuPageNumber.value;
    if(documentStore.checkValidPageNumber(newNumber)) { viewablePageNumber.value = newNumber; }
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

/**
 * This function runs whenever the user right clicks on the hosted document context menu.
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

    if((mouseX + docContextMenuRect.width) > (styleStore.viewportWidth - (20 / styleStore.cssToWindowWidthRatio))) {
        newPosition.left = (String((mouseX - docContextMenuRect.width) * styleStore.cssToWindowWidthRatio) + "px");
    }
    if((mouseY + docContextMenuRect.height) > (styleStore.viewportHeight - (20 / styleStore.cssToWindowWidthRatio))) {
        newPosition.top = (String((mouseY - docContextMenuRect.height) * styleStore.cssToWindowHeightRatio) + "px");
    }

    // Sets the new context menu position.
    contextMenuPosition.value = newPosition;
}

/** This function opens the share popup for the page link. */
function sharePageLink() {
    closeDocumentContextMenu();
    webData.setQRCodePopup(onResumeRoute.value ? "filter" : getPageLink());
}

/** This function lets the user copy the Page Link. */
async function copyPageLink() {
    if(copyStatus.value != 0) { return; }
    copyStatus.value = 1;

    try {
        await navigator.clipboard.writeText(getPageLink());
        copyStatus.value = 2;
    } catch(e) {
        copyStatus.value = 3;
    } finally {
        setTimeout(() => { copyStatus.value = 0; }, 3000);
    }
}

/** This function returns the permalink for a specific page. */
function getPageLink() {
    if(onResumeRoute.value) {
        return (PERSONAL_WEBSITE_LINK + "resume/");
    } else {
        var routePath = router.currentRoute.value.path.substring(1);
        if(routePath.endsWith("/")) { routePath = routePath.substring(0, routePath.length - 1); }
        return (PERSONAL_WEBSITE_LINK + routePath + "/#page_" + viewablePageNumber.value);
    }
}
</script>