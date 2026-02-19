<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div id="mohit-documentBar" :class="[(webData.documentMenuOpen ? 'menu-open' : '')]" ref="docNavBar">
    <Transition name="documentMenu-transition">
        <div v-if="showMobileMenu" class="mohit-documentMenu">
            <div class="mohit-documentMenu-tools top">
                <button @click="docStore.downloadDoc()" title="Download Document" :style="getColorStyles('var(--blue-one)')">
                    <font-awesome-icon :icon="docStore.downloadIcon" :spin-pulse="docStore.documentDownloadStatus.pending" />
                </button>
                <button v-if="docStore.saveAsSupported" @click="docStore.saveDoc()" title="Save Document" :style="getColorStyles('var(--blue-three)')">
                    <font-awesome-icon :icon="docStore.saveDocIcon" :spin-pulse="docStore.documentSaveStatus.pending" />
                </button>
                <button @click="docStore.printDoc()" title="Print Document" :style="getColorStyles('var(--blue-one)')">
                    <font-awesome-icon :icon="(docStore.printIcon)"
                        :spin-pulse="(docStore.documentPrintStatus.pending && !docStore.documentPrintStatus.timeoutError)"
                    />
                </button>
                <button v-if="webData.shareSupported" @click="docStore.shareDoc()" title="Share Document" :style="getColorStyles('var(--blue-three)')">
                    <font-awesome-icon :icon="docStore.shareIcon" :spin-pulse="docStore.documentShareStatus.pending" />
                </button>
                <button v-if="docStore.googleDriveOptionAvailable"
                    @click="webData.setNestedMenu(1)"
                    title="Upload This Document To Your Google Drive!"
                    :style="getColorStyles('#34A853')">

                    <font-awesome-icon :spin-pulse="docStore.documentUploadToGoogleDriveStatus.pending"
                        :icon="docStore.uploadToGoogleDriveIcon"
                    />
                </button>
            </div>
            <div class="mohit-documentMenu-tools bottom">
                <button class="light" @click="webData.openQRCodePopup()" title="Share Webpage">
                    <font-awesome-icon icon="fa-share-from-square" />
                </button>
                <button @click="reloadPage()" title="Reload Page">
                    <font-awesome-icon icon="fa-rotate-right" />
                </button>
                <a class="light" :href="docStore.documentLink" target="mohit-document" title="Open Document in New Tab">
                    <font-awesome-icon icon="fa-arrow-up-right-from-square" />
                </a>
                <a class="white" :href="PDFJS_LINK" :title="PDFJS_TITLE">
                    <img :src="pdfjs_logo" draggable="false" width="18" style="user-select: none;" />
                </a>
            </div>
        </div>
    </Transition>

    <Transition name="documentMenu-transition">
        <div v-if="showGoogleDriveNestedMenu" class="mohit-documentMenu">
            <div class="mohit-documentMenu-bigOpt google top">
                <button @click="docStore.requestGoogleToUploadDoc(false)" :title="GOOGLE_DEFAULT_SAVE_TITLE" pulse-loop>
                    <span> Use Default Save Folder </span>
                    <font-awesome-icon icon="fa-folder" />
                </button>
            </div>
            <div class="mohit-documentMenu-bigOpt google">
                <button @click="docStore.requestGoogleToUploadDoc(true)" :title="GOOGLE_CHOOSE_FOLDER_TITLE" pulse-loop>
                    <span> Choose Folder In Your Drive </span>
                    <font-awesome-icon :icon="(docStore.documentUploadToGoogleDriveStatus.cancel ? 'fa-ban' : 'fa-folder-tree')" />
                </button>
            </div>
            <div class="mohit-documentMenu-bigOpt close bottom">
                <button @click="webData.setMenuOpen((laptopBar ? -1 : 1), 0)" pulse-loop>
                    <span> Close Google Docs Options </span>
                    <font-awesome-icon icon="fa-circle-arrow-down" />
                </button>
            </div>
        </div>
    </Transition>

    <Transition name="documentMenu-transition">
        <div v-if="showShareMenu" class="mohit-documentMenu">
            <div class="mohit-documentMenu-bigOpt top">
                <button @click="webData.openQRCodePopup()" pulse-loop>
                    <span> Share Webpage </span>
                    <font-awesome-icon icon="fa-share-from-square" />
                </button>
            </div>
            <div v-if="webData.shareSupported" class="mohit-documentMenu-bigOpt">
                <button @click="docStore.shareDoc()" :style="getColorStyles('var(--blue-one)')" pulse-loop>
                    <span> Share Document </span>
                    <font-awesome-icon :icon="docStore.shareIcon" :spin-pulse="docStore.documentShareStatus.pending" />
                </button>
            </div>
            <div class="mohit-documentMenu-bigOpt close bottom">
                <button @click="webData.closeNavMenu()" pulse-loop>
                    <span> Close Share Options </span>
                    <font-awesome-icon icon="fa-circle-arrow-down" />
                </button>
            </div>
        </div>
    </Transition>

    <div class="mohit-documentBar-bottom">
        <template v-if="docStore.onAnyResumeRoute">
            <RouterLink v-if="(docStore.onMarkdownRoute || docStore.onResumeQrcodeRoute)" to="/resume/" pulse-loop
                class="mohit-navBar-icon light"
                title="Use Website Viewer">

                <font-awesome-icon icon="fa-file-lines" />
            </RouterLink>
            <RouterLink v-if="!docStore.onResumeQrcodeRoute" to="/resume/qrcode" pulse-loop
                class="mohit-navBar-icon light"
                title="See My Resume With A QR Code.">

                <font-awesome-icon icon="fa-qrcode" />
            </RouterLink>
            <RouterLink v-if="!docStore.onMarkdownRoute" to="/resume/markdown" pulse-loop
                class="mohit-navBar-icon light"
                title="Use Markdown Format">

                <font-awesome-icon icon="fa-brands fa-markdown" />
            </RouterLink>
        </template>
        <template v-else-if="docStore.onCreateGithubRepoRoute">
            <a href="https://github.com/" class="mohit-navBar-icon white" title="Go To GitHub" pulse-loop>
                <font-awesome-icon icon="fa-brands fa-github" />
            </a>
        </template>
        <template v-else-if="docStore.onFCSCertificateRoute">
            <a :href="FCS_CERTIFICATE_LINKEDIN_POST"  target="_blank" pulse-loop
                title="See LinkedIn Post" class="mohit-navBar-icon"
                :style="getColorStyles('#0072B1')">

                <font-awesome-icon icon="fa-brands fa-linkedin" />
            </a>
            <a :href="FCS_CAREER_INTERNSHIP_LINK" target="_blank" pulse-loop
                title="FCS Career Internship Program" class="mohit-navBar-icon"
                :style="getColorStyles('var(--fulton-green)')">

                <font-awesome-icon icon="fa-school-flag" />
            </a>
        </template>
        <div class="mohit-navBar-bottom-separator"></div>

        <template v-if="laptopBar">
            <a :href="docStore.documentLink" target="mohit-document" pulse-loop
                class="mohit-navBar-icon white"
                title="Open Document in New Tab">

                <font-awesome-icon icon="fa-up-right-from-square" />
            </a>
            <button @click="docStore.downloadDoc()" pulse-loop
                class="mohit-navBar-icon" title="Download Document"
                :style="getColorStyles('var(--blue-three)')">

                <font-awesome-icon :icon="docStore.downloadIcon"
                    :spin-pulse="docStore.documentDownloadStatus.pending"
                />
            </button>
            <button v-if="docStore.saveAsSupported" @click="docStore.saveDoc()" pulse-loop
                class="mohit-navBar-icon" title="Save Document"
                :style="getColorStyles('var(--blue-one)')">

                <font-awesome-icon :icon="docStore.saveDocIcon"
                    :spin-pulse="docStore.documentSaveStatus.pending"
                />
            </button>
            <button @click="docStore.printDoc()" pulse-loop
                class="mohit-navBar-icon" title="Print Document"
                :style="getColorStyles('var(--blue-three)')">

                <font-awesome-icon :icon="(docStore.printIcon)"
                    :spin-pulse="(docStore.documentPrintStatus.pending && !docStore.documentPrintStatus.timeoutError)"
                />
            </button>
            <button v-if="docStore.googleDriveOptionAvailable" @click="webData.toggleDocumentMenu(1)" pulse-loop
                class="mohit-navBar-icon" title="Upload This Document To Your Google Drive!"
                :style="getColorStyles('#34A853')">

                <font-awesome-icon :spin-pulse="docStore.documentUploadToGoogleDriveStatus.pending"
                    :icon="docStore.uploadToGoogleDriveIcon"
                />
            </button>
            <div class="mohit-navBar-bottom-separator"></div>

            <button class="mohit-navBar-icon light" title="Share Webpage" @click="webData.toggleDocumentMenu(2)" pulse-loop>
                <font-awesome-icon icon="fa-share-from-square" />
            </button>
        </template>
        <button @click="docStore.toggleDocumentFullScreen()"
            class="mohit-navBar-icon light" pulse-loop
            :title="fullScreenStore.docElementTitle">

            <font-awesome-icon :icon="fullScreenStore.faIcon" />
        </button>
        <button v-if="!laptopBar" @click="webData.toggleDocumentMenu(0, true)" class="mohit-navBar-icon light" pulse-loop
            :title="(webData.documentMenuOpen ? 'Close Document Actions' : 'Open Document Actions')">

            <font-awesome-icon :icon="(webData.documentMenuOpen ? 'fa-file-circle-xmark' : 'fa-file-export')" />
        </button>
    </div>
</div>
</template>

<script setup>
import pdfjs_logo from "@/assets/PDFJS_logo.svg";
const PDFJS_LINK = "https://mozilla.github.io/pdf.js/";

const docNavBar = ref(null);
const docNavBarSwipe = useSwipe(docNavBar, { passive: true });
const { width: windowWidth } = useWindowSize();

const webData = useWebsiteDataStore();
const docStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();

const laptopBar = computed(() => { return (windowWidth.value > 500); });
const showMobileMenu = computed(() => { return (webData.documentMenuOpen && (webData.nestedMenuOpen == 0) && !laptopBar.value); });
const showGoogleDriveNestedMenu = computed(() => { return (webData.documentMenuOpen && (webData.nestedMenuOpen == 1) && docStore.googleDriveOptionAvailable); });
const showShareMenu = computed(() => { return (webData.documentMenuOpen && (webData.nestedMenuOpen == 2) && laptopBar.value); });

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });
usePulseLoopAnimation(docNavBar);

// This closes document menus that should not be open based on the viewport size.
watch(laptopBar, () => {
    if(laptopBar.value && webData.menuOpen == 1 && webData.nestedMenuOpen == 0) { webData.setMenuOpen(-1, 0); }
    if(!laptopBar.value && webData.menuOpen == 1 && webData.nestedMenuOpen == 2) { webData.setMenuOpen(-1, 0); }
});

// This tracks touch "swipe" events so that the user can open or close the document navigation bar with a swipe.
watch(docNavBarSwipe.isSwiping, () => {
    if(!docNavBarSwipe.isSwiping.value) { return; }
    const direction = docNavBarSwipe.direction.value;

    if(direction === "down" && webData.documentMenuOpen) {
        webData.menuOpen = -1;
        triggerClickSound();
    } else if(direction === "up" && !webData.documentMenuOpen) {
        webData.menuOpen = 1;
        triggerClickSound();
    }
});

const PDFJS_TITLE = "This page uses PDF.js to render and display my documents on this website. Click here to see more about PDF.js.";
const GOOGLE_DEFAULT_SAVE_TITLE = "Use Your Drive's Default Save Folder. (Typically Your Root Google Drive Folder)";
const GOOGLE_CHOOSE_FOLDER_TITLE = "Choose The Folder In Your Google Drive Where You Would Like To Keep My Document.";
</script>