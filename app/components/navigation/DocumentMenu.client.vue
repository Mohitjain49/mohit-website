<style scoped>
@import "~/styles/navmenu.css";
</style>

<template>
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.documentMenuOpen" class="mohit-navMenu" id="mohit-docMenu" ref="docMenu">
        <MenuTop />

        <template v-if="documentStore.onAnyResumeRoute">
            <div v-if="(documentStore.onMarkdownRoute || documentStore.onResumeQrcodeRoute)" class="mohit-navMenu-opt light">
                <RouterLink to="/resume/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-file-lines" />
                    <span> See My Main Resume </span>
                </RouterLink>
            </div>
            <div v-if="(!documentStore.onResumeQrcodeRoute)" class="mohit-navMenu-opt light">
                <RouterLink to="/resume/qrcode/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-qrcode" />
                    <span> See My Main Resume (With QR Code) </span>
                </RouterLink>
            </div>
            <div v-if="(!documentStore.onMarkdownRoute)" class="mohit-navMenu-opt light">
                <RouterLink to="/resume/markdown/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-brands fa-markdown" />
                    <span> See My Main Resume (Markdown) </span>
                </RouterLink>
            </div>
        </template>
        <template v-else-if="documentStore.onCreateGithubRepoRoute">
            <div class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.scrollToPage(2)" pulse-loop>
                    <font-awesome-icon icon="fa-list" />
                    <span> See Table Of Contents </span>
                </button>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('white')">
                <a href="https://github.com/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-brands fa-github" />
                    <span> Go To GitHub </span>
                </a>
            </div>
        </template>
        <template v-else-if="documentStore.onFCSCertificateRoute">
            <div class="mohit-navMenu-opt" :style="getColorStyles('#0072B1')">
                <a :href="FCS_CERTIFICATE_LINKEDIN_POST" target="_blank" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-brands fa-linkedin" />
                    <span> See Certificate On LinkedIn </span>
                </a>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('var(--fulton-green)')">
                <a :href="FCS_CAREER_INTERNSHIP_LINK" target="_blank" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-school-flag" />
                    <span> FCS Career Internship Program </span>
                </a>
            </div>
        </template>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.downloadDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.downloadIcon"
                    :spin-pulse="documentStore.documentDownloadStatus.pending"
                />
                <span> Download Document </span>
            </button>
        </div>
        <div v-if="scriptsStore.saveAsSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.saveDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.saveDocIcon"
                    :spin-pulse="documentStore.documentSaveStatus.pending"
                />
                <span> Save Document </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.printDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.printIcon"
                    :spin-pulse="documentStore.documentPrintStatus.pending"
                />
                <span> Print Document </span>
            </button>
        </div>
        <div v-if="webData.shareSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.shareDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.shareIcon"
                    :spin-pulse="documentStore.documentShareStatus.pending"
                />
                <span> Share Document </span>
            </button>
        </div>
        <div v-if="(documentStore.documentLink != '')" class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="documentStore.documentLink" target="mohit-document" class="mohit-navMenu-mainOpt" pulse-loop>
                <font-awesome-icon icon="fa-up-right-from-square" />
                <span> Open Document In New Tab </span>
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
                    <font-awesome-icon icon="fa-folder" />
                    <span> Save To Google Drive (Default Folder) </span>
                </button>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('#34A853')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.requestGoogleToUploadDoc(true)" :title="GOOGLE_CHOOSE_FOLDER_TITLE" pulse-loop>
                    <font-awesome-icon :icon="(documentStore.documentUploadToGoogleDriveStatus.cancel ? 'fa-ban' : 'fa-folder-tree')" />
                    <span> Save To Google Drive (Choose Folder) </span>
                </button>
            </div>
            <div class="mohit-navMenu-opt-break"></div>
        </template>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.toggleDocumentFullScreen()" pulse-loop>
                <font-awesome-icon :icon="fullScreenStore.faIcon" />
                <span> Maximize Document </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0)" pulse-loop>
                <font-awesome-icon icon="fa-bars" />
                <span> Open Navigation Menu </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="router.back()" pulse-loop>
                <font-awesome-icon icon="fa-tent-arrow-turn-left" />
                <span> Leave To Previous Page </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="PDFJS_LINK" target="_blank" class="mohit-navMenu-mainOpt" :title="PDFJS_TITLE" pulse-loop>
                <img :src="pdfjs_icon" draggable="false" />
                <span> PDF.js </span>
            </a>
        </div>
    </div>
</Transition>
</template>

<script setup>
import pdfjs_icon from "~/assets/PDFJS_logo.svg";
const PDFJS_LINK = "https://mozilla.github.io/pdf.js/";

const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const scriptsStore = useScriptsStore();
const documentStore = useDocumentStore();
const router = useRouter();

const docMenu = shallowRef(null);
useSwipeToCloseMenu(docMenu);
usePulseLoopAnimation(docMenu);

const GOOGLE_DEFAULT_SAVE_TITLE = "Use Your Drive's Default Save Folder. (Typically Your Root Google Drive Folder)";
const GOOGLE_CHOOSE_FOLDER_TITLE = "Choose The Folder In Your Google Drive Where You Would Like To Keep My Document.";
const PDFJS_TITLE = "This page uses PDF.js to render and display my documents on this website. Click here to see more about PDF.js.";
</script>