<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<Transition name="navMenu-transition">
    <div v-show="webData.documentMenuOpen" class="mohit-navMenu" id="mohit-docMenu" ref="docMenu">
        <MenuTop />

        <template v-if="documentStore.onAnyResumeRoute">
            <div v-if="(documentStore.onMarkdownRoute || documentStore.onResumeQrcodeRoute)" class="mohit-navMenu-opt light">
                <RouterLink to="/resume/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <span> See My Main Resume </span>
                    <font-awesome-icon icon="fa-file-lines" />
                </RouterLink>
            </div>
            <div v-if="(!documentStore.onResumeQrcodeRoute)" class="mohit-navMenu-opt light">
                <RouterLink to="/resume/qrcode" class="mohit-navMenu-mainOpt" pulse-loop>
                    <span> See My Main Resume (With QR Code) </span>
                    <font-awesome-icon icon="fa-qrcode" />
                </RouterLink>
            </div>
            <div v-if="(!documentStore.onMarkdownRoute)" class="mohit-navMenu-opt light">
                <RouterLink to="/resume/markdown" class="mohit-navMenu-mainOpt" pulse-loop>
                    <span> See My Main Resume (Markdown) </span>
                    <font-awesome-icon icon="fa-brands fa-markdown" />
                </RouterLink>
            </div>
        </template>
        <template v-else-if="documentStore.onCreateGithubRepoRoute">
            <div class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
                <button class="mohit-navMenu-mainOpt" @click="scrollToTableOfContents(2)" pulse-loop>
                    <span> See Table Of Contents </span>
                    <font-awesome-icon icon="fa-list" />
                </button>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('white')">
                <a href="https://github.com/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <span> Go To GitHub </span>
                    <font-awesome-icon icon="fa-brands fa-github" />
                </a>
            </div>
        </template>
        <template v-else-if="documentStore.onFCSCertificateRoute">
            <div class="mohit-navMenu-opt" :style="getColorStyles('#0072B1')">
                <a :href="FCS_CERTIFICATE_LINKEDIN_POST" target="_blank" class="mohit-navMenu-mainOpt" pulse-loop>
                    <span> See Certificate On LinkedIn </span>
                    <font-awesome-icon icon="fa-brands fa-linkedin" />
                </a>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('var(--fulton-green)')">
                <a :href="FCS_CAREER_INTERNSHIP_LINK" target="_blank" class="mohit-navMenu-mainOpt" pulse-loop>
                    <span> FCS Career Internship Program </span>
                    <font-awesome-icon icon="fa-school-flag" />
                </a>
            </div>
        </template>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.downloadDoc()" pulse-loop>
                <span> Download Document </span>
                <font-awesome-icon :icon="documentStore.downloadIcon"
                    :spin-pulse="documentStore.documentDownloadStatus.pending"
                />
            </button>
        </div>
        <div v-if="scriptsStore.saveAsSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.saveDoc()" pulse-loop>
                <span> Save Document </span>
                <font-awesome-icon :icon="documentStore.saveDocIcon"
                    :spin-pulse="documentStore.documentSaveStatus.pending"
                />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.printDoc()" pulse-loop>
                <span> Print Document </span>
                <font-awesome-icon :icon="documentStore.printIcon"
                    :spin-pulse="documentStore.documentPrintStatus.pending"
                />
            </button>
        </div>
        <div v-if="scriptsStore.saveAsSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.shareDoc()" pulse-loop>
                <span> Share Document </span>
                <font-awesome-icon :icon="documentStore.shareIcon"
                    :spin-pulse="documentStore.documentShareStatus.pending"
                />
            </button>
        </div>
        <div v-if="(documentStore.documentLink != '')" class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="documentStore.documentLink" target="mohit-document" class="mohit-navMenu-mainOpt" pulse-loop>
                <span> Open Document In New Tab </span>
                <font-awesome-icon icon="fa-up-right-from-square" />
            </a>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <template v-if="documentStore.googleDriveOptionAvailable">
            <div class="mohit-navMenu-sectionheader" :style="getColorStyles('#34A853')">
                <span> Google Drive </span>
                <font-awesome-icon :icon="documentStore.uploadToGoogleDriveIcon" :spin-pulse="documentStore.documentUploadToGoogleDriveStatus.pending" />
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('#34A853')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.requestGoogleToUploadDoc(false)" :title="GOOGLE_DEFAULT_SAVE_TITLE" pulse-loop>
                    <span> Save To Google Drive (Default Folder) </span>
                    <font-awesome-icon icon="fa-folder" />
                </button>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('#34A853')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.requestGoogleToUploadDoc(true)" :title="GOOGLE_CHOOSE_FOLDER_TITLE" pulse-loop>
                    <span> Save To Google Drive (Choose Folder) </span>
                    <font-awesome-icon :icon="(documentStore.documentUploadToGoogleDriveStatus.cancel ? 'fa-ban' : 'fa-folder-tree')" />
                </button>
            </div>
            <div class="mohit-navMenu-opt-break"></div>
        </template>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.toggleDocumentFullScreen()" pulse-loop>
                <span> Maximize Document </span>
                <font-awesome-icon :icon="fullScreenStore.faIcon" />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0, 0)" pulse-loop>
                <span> Open Navigation Menu </span>
                <font-awesome-icon icon="fa-bars" />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="router.back()" pulse-loop>
                <span> Leave To Previous Page </span>
                <font-awesome-icon icon="fa-tent-arrow-turn-left" />
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="PDFJS_LINK" target="_blank" class="mohit-navMenu-mainOpt" :title="PDFJS_TITLE" pulse-loop>
                <span> PDF.js </span>
                <img :src="pdfjs_icon" draggable="false" />
            </a>
        </div>
    </div>
</Transition>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
import pdfjs_icon from "@/assets/PDFJS_logo.svg";
const PDFJS_LINK = "https://mozilla.github.io/pdf.js/";

const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const scriptsStore = useScriptsStore();
const documentStore = useDocumentStore();
const router = useRouter();

const docMenu = shallowRef(null);
const docMenuSwipe = useSwipe(docMenu, { passive: true });
usePulseLoopAnimation(docMenu);

// This tracks touch "swipe" events for the navigation menu so that the user can change the page if they swipe left or right.
watch(docMenuSwipe.isSwiping, () => {
    if(!docMenuSwipe.isSwiping.value) { return; }
    const direction = docMenuSwipe.direction.value;

    if(direction === "right" && webData.documentMenuOpen) {
        webData.menuOpen = -1;
        triggerClickSound();
    } 
});

/**
 * This function scrolls to the page the table of contents is on.
 * @param {Number} pageNum The number of the page that the table of contents is on.
 */
function scrollToTableOfContents(pageNum = 2) {
    try { goToPageSection(("page_" + pageNum), 70); } catch(e) {}
}

const GOOGLE_DEFAULT_SAVE_TITLE = "Use Your Drive's Default Save Folder. (Typically Your Root Google Drive Folder)";
const GOOGLE_CHOOSE_FOLDER_TITLE = "Choose The Folder In Your Google Drive Where You Would Like To Keep My Document.";
const PDFJS_TITLE = "This page uses PDF.js to render and display my documents on this website. Click here to see more about PDF.js.";
</script>