<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<!-- <WebCover v-if="(webData.documentMenuOpen && fullScreenStore.fullScreenSet)" /> -->
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.documentMenuOpen" class="mohit-navMenu" id="mohit-docMenu" ref="docMenu">
        <MenuTop />

        <template v-if="documentStore.onResumeRoute">
            <template v-if="documentStore.onMainResumeRoute">
                <div class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
                    <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(3.1)" pulse-loop>
                        <font-awesome-icon icon="fa-gears" />
                        <span> Edit Resume Components </span>
                    </button>
                </div>
                <div class="mohit-navMenu-opt light">
                    <RouterLink to="/resume/markdown/" class="mohit-navMenu-mainOpt" pulse-loop>
                        <font-awesome-icon icon="fa-brands fa-markdown" />
                        <span> See My Main Resume (Markdown) </span>
                    </RouterLink>
                </div>
            </template>
            <div v-else class="mohit-navMenu-opt light">
                <RouterLink to="/resume/" class="mohit-navMenu-mainOpt" pulse-loop>
                    <font-awesome-icon icon="fa-file-lines" />
                    <span> See My Main Resume </span>
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
        <template v-else-if="documentStore.onResearchPaperRoute">
            <div class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.scrollToPage(1)" pulse-loop>
                    <font-awesome-icon icon="fa-book-open" />
                    <span> Scroll To Title Page </span>
                </button>
            </div>
        </template>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.downloadDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.downloadIcon" :spin-pulse="documentStore.downloadPending" />
                <span> Download Document </span>
            </button>
        </div>
        <div v-if="scriptsStore.saveAsSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.saveDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.saveDocIcon" :spin-pulse="documentStore.savePending" />
                <span> Save Document </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.printDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.printIcon" :spin-pulse="documentStore.printPending" />
                <span> Print Document </span>
            </button>
        </div>
        <div v-if="webData.shareSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.shareDoc()" pulse-loop>
                <font-awesome-icon :icon="documentStore.shareIcon" :spin-pulse="documentStore.sharePending" />
                <span> Share Document </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.downloadDocAsImage()" :title="documentStore.imageDownloadTitle" pulse-loop>
                <font-awesome-icon :icon="documentStore.imageDownloadIcon" :spin-pulse="documentStore.imageDownloadPending" />
                <span> Download Document (PNG) </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>


        <div v-if="(documentStore.documentLink != '')" class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="documentStore.documentLink" target="mohit-document" class="mohit-navMenu-mainOpt" pulse-loop>
                <font-awesome-icon icon="fa-up-right-from-square" />
                <span> Open Document In New Tab </span>
            </a>
        </div>
        <div v-if="!documentStore.onMarkdownRoute" class="mohit-navMenu-opt" :style="getColorStyles('var(--c-color)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(3.2)" pulse-loop>
                <font-awesome-icon icon="fa-database" />
                <span> See Document Properties </span>
            </button>
        </div>
        <div v-if="documentStore.showPdfPageNav" :style="getColorStyles('var(--lightning-yellow)')" class="mohit-navMenu-opt">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(3.3)" pulse-loop>
                <font-awesome-icon icon="fa-compass" />
                <span> Open PDF Navigation </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <template v-if="documentStore.googleDriveOptionAvailable">
            <div class="mohit-navMenu-sectionheader" :style="getColorStyles('#34A853')">
                <span> Google Drive </span>
                <font-awesome-icon :icon="documentStore.uploadToGoogleDriveIcon" :spin-pulse="documentStore.uploadToGoogleDrivePending" />
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('#34A853')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.requestGoogleToUploadDoc(false)" :title="GOOGLE_DEFAULT_SAVE_TITLE" pulse-loop>
                    <font-awesome-icon icon="fa-folder" />
                    <span> Save To Google Drive (Default Folder) </span>
                </button>
            </div>
            <div class="mohit-navMenu-opt" :style="getColorStyles('#34A853')">
                <button class="mohit-navMenu-mainOpt" @click="documentStore.requestGoogleToUploadDoc(true)" :title="GOOGLE_CHOOSE_FOLDER_TITLE" pulse-loop>
                    <font-awesome-icon :icon="(documentStore.documentUploadToGoogleDriveCanceled ? 'fa-ban' : 'fa-folder-tree')" />
                    <span> Save To Google Drive (Choose Folder) </span>
                </button>
            </div>
            <div class="mohit-navMenu-opt-break"></div>
        </template>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="documentStore.toggleDocumentFullScreen()" pulse-loop>
                <font-awesome-icon :icon="fullScreenStore.faIcon" />
                <span> {{ (fullScreenStore.fullScreenSet ? 'Minimize Document' : 'Maximize Document') }} </span>
            </button>
        </div>
        <div v-if="!fullScreenStore.fullScreenSet" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
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
usePulseLoopAnimation(docMenu);
useWebsiteMenuUtility(docMenu);

const GOOGLE_DEFAULT_SAVE_TITLE = "Use Your Drive's Default Save Folder. (Typically Your Root Google Drive Folder)";
const GOOGLE_CHOOSE_FOLDER_TITLE = "Choose The Folder In Your Google Drive Where You Would Like To Keep My Document.";
const PDFJS_TITLE = "This page uses PDF.js to render and display my documents on this website. Click here to see more about PDF.js.";
</script>