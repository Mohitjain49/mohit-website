<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div id="mohit-documentBar" :class="[(webData.documentMenuOpen ? 'menu-open' : '')]" ref="docNavBar">
    <Transition name="documentMenu-transition">
        <div v-if="(webData.documentMenuOpen && (webData.nestedMenuOpen == 0))" class="mohit-documentMenu">
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
                <a class="light" :href="documentLink" target="mohit-document" title="Open Document in New Tab">
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
            <div class="mohit-documentMenu-googleOpt top">
                <button @click="docStore.requestGoogleToUploadDoc(false)" :title="GOOGLE_DEFAULT_SAVE_TITLE">
                    <span> Use Default Save Folder </span>
                    <font-awesome-icon icon="fa-folder" />
                </button>
            </div>
            <div class="mohit-documentMenu-googleOpt">
                <button @click="docStore.requestGoogleToUploadDoc(true)" :title="GOOGLE_CHOOSE_FOLDER_TITLE">
                    <span> Choose Folder In Your Drive </span>
                    <font-awesome-icon :icon="(docStore.documentUploadToGoogleDriveStatus.cancel ? 'fa-ban' : 'fa-folder-tree')" />
                </button>
            </div>
            <div class="mohit-documentMenu-googleOpt bottom">
                <button @click="webData.setNestedMenu(0)" :style="getColorStyles('red')">
                    <span> Back To Document Options </span>
                    <font-awesome-icon icon="fa-circle-arrow-down" />
                </button>
            </div>
        </div>
    </Transition>

    <div class="mohit-documentBar-bottom">
        <div class="mohit-documentBar-iconSection left">
            <template v-if="docStore.onResumeRoute">
                <RouterLink v-if="(docStore.onMarkdownRoute || docStore.onResumeQrcodeRoute)" to="/resume/"
                    class="mohit-navBar-icon light"
                    title="Use Website Viewer"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-file-lines" />
                </RouterLink>
                <RouterLink v-if="!docStore.onResumeQrcodeRoute" to="/resume/qrcode"
                    class="mohit-navBar-icon light"
                    title="See My Resume With A QR Code."
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-qrcode" />
                </RouterLink>
                <RouterLink v-if="!docStore.onMarkdownRoute" to="/resume/markdown"
                    class="mohit-navBar-icon light"
                    title="Use Markdown Format"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-brands fa-markdown" />
                </RouterLink>
            </template>
            <template v-else-if="docStore.onCreateGithubRepoRoute">
                <a href="https://github.com/" class="mohit-navBar-icon" title="Go To GitHub"
                    :style="getColorStyles('#FFFFFF')"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-brands fa-github" />
                </a>
            </template>
            <template v-else>
                <a :href="FCS_CERTIFICATE_LINKEDIN_POST"  target="_blank"
                    title="See LinkedIn Post" class="mohit-navBar-icon"
                    :style="getColorStyles('#0072B1')"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-brands fa-linkedin" />
                </a>
                <a :href="FCS_CAREER_INTERNSHIP_LINK"  target="_blank"
                    title="FCS Career Internship Program" class="mohit-navBar-icon"
                    :style="getColorStyles('var(--fulton-green)')"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-school-flag" />
                </a>
            </template>
        </div>
        <div class="mohit-documentBar-iconSection right">
            <button @click="docStore.toggleDocumentFullScreen()"
                class="mohit-navBar-icon light"
                :title="fullScreenStore.docElementTitle"
                @pointerenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="fullScreenStore.faIcon" />
            </button>
            <button @click="webData.toggleDocumentMenu()" class="mohit-navBar-icon light"
                :title="(webData.documentMenuOpen ? 'Close Document Actions' : 'Open Document Actions')"
                @pointerenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="(webData.documentMenuOpen ? 'fa-file-circle-xmark' : 'fa-file-export')" />
            </button>
        </div>
    </div>
</div>
</template>

<script setup>
import pdfjs_logo from "@/assets/PDFJS_logo.svg";
const PDFJS_LINK = "https://mozilla.github.io/pdf.js/";

const docNavBar = ref(null);
const docNavBarSwipe = useSwipe(docNavBar, { passive: true });

const webData = useWebsiteDataStore();
const docStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();

const showGoogleDriveNestedMenu = computed(() => {
    return (webData.documentMenuOpen && (webData.nestedMenuOpen == 1) && docStore.googleDriveOptionAvailable);
});

const documentLink = computed(() => {
    if(docStore.onResumeQrcodeRoute) {
        return docStore.qrcodeResumeUrl;
    } else if(docStore.onResumeRoute) {
        return PERSONAL_RESUME_LINK;
    } else if(docStore.onFCSCertificateRoute) {
        return FCS_CERTIFICATE_LINK;
    } else if(docStore.onCreateGithubRepoRoute) {
        return "https://www.mohit-jain.com/Create_Github_Repo.pdf";
    }
});

/**
 * This sets the color and border color of an icon.
 * @param {String} color The color to use.
 */
function getColorStyles(color = "var(--website-text)") {
    return { color, borderColor: color }
}

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });

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