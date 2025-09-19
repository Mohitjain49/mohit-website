<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<client-only>
    <div id="mohit-documentBar" :class="[(webData.documentMenuOpen ? 'menu-open' : '')]">
        <Transition name="documentMenu-transition">
            <div v-if="webData.documentMenuOpen" class="mohit-documentMenu">
                <div class="mohit-documentMenu-tools">
                    <button @click="docStore.downloadDoc()" title="Download Document" :style="getColorStyles('var(--blue-one)')">
                        <font-awesome-icon icon="fa-file-download" />
                    </button>
                    <button @click="docStore.printDoc()" title="Print Document" :style="getColorStyles('var(--blue-three)')">
                        <font-awesome-icon icon="fa-print" />
                    </button>
                    <button v-if="webData.shareSupported" @click="docStore.shareDoc()" title="Share Document" :style="getColorStyles('var(--blue-one)')">
                        <font-awesome-icon :icon="(docStore.sharingDocument ? 'fa-spinner' : 'fa-share')" :spin-pulse="docStore.sharingDocument" />
                    </button>
                </div>
                <div class="mohit-documentMenu-tools">
                    <button @click="webData.setQRCodePopup(true)" title="Share Webpage" :style="getColorStyles('var(--website-light-text)')">
                        <font-awesome-icon icon="fa-share-from-square" />
                    </button>
                    <button @click="reloadPage()" title="Reload Page">
                        <font-awesome-icon icon="fa-rotate-right" />
                    </button>
                    <a target="mohit-document" title="Open Document in New Tab"
                        :href="(docStore.checkFCSCertificateRoute() ? FCS_CERTIFICATE_LINK : PERSONAL_RESUME_LINK)"
                        :style="getColorStyles('var(--website-light-text)')">

                        <font-awesome-icon icon="fa-arrow-up-right-from-square" />
                    </a>
                </div>
            </div>
        </Transition>

        <div class="mohit-documentBar-bottom">
            <div class="mohit-documentBar-iconSection left">
                <template v-if="docStore.checkFCSCertificateRoute()">
                    <a :href="FCS_CERTIFICATE_LINKEDIN_POST"  target="_blank"
                        title="See LinkedIn Post" class="mohit-navBar-icon"
                        :style="getColorStyles('#0072B1')"
                        @mouseenter="setPulseLoopAnimation"
                        @mouseleave="setPulseLoopAnimation">

                        <font-awesome-icon icon="fa-brands fa-linkedin" />
                    </a>
                    <a :href="FCS_CAREER_INTERNSHIP_LINK"  target="_blank"
                        title="FCS Career Internship Program" class="mohit-navBar-icon"
                        :style="getColorStyles('var(--fulton-green)')"
                        @mouseenter="setPulseLoopAnimation"
                        @mouseleave="setPulseLoopAnimation">

                        <font-awesome-icon icon="fa-school-flag" />
                    </a>
                </template>
                <RouterLink v-else :to="resumeNavPath" class="mohit-navBar-icon light"
                    :title="(docStore.checkMarkdownRoute() ? 'Use Website Viewer' : 'Use Markdown Format')"
                    @mouseenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon :icon="(docStore.checkMarkdownRoute() ? 'fa-file-lines' : 'fa-brands fa-markdown')" />
                </RouterLink>

                <a class="mohit-navBar-icon white" :href="PDFJS_LINK"
                    title="See More about PDF.js"
                    @mouseenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <img :src="pdfjs_logo" draggable="false" width="20" />
                </a>
                <!-- <button @click="docStore.downloadDoc()" class="mohit-navBar-icon light" title="Download Document">
                    <font-awesome-icon icon="fa-file-download" />
                </button>
                <button @click="docStore.printDoc()" class="mohit-navBar-icon light" title="Print Document">
                    <font-awesome-icon icon="fa-print" />
                </button>
                <button @click="reloadPage()" class="mohit-navBar-icon" title="Reload Page">
                    <font-awesome-icon icon="fa-rotate-right" />
                </button> -->
            </div>
            <div class="mohit-documentBar-iconSection right">
                <button @click="docStore.toggleDocumentFullScreen()" class="mohit-navBar-icon light"
                    :title="fullScreenStore.docElementTitle"
                    @mouseenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon :icon="fullScreenStore.faIcon" />
                </button>
                <button @click="webData.toggleDocumentMenu()" class="mohit-navBar-icon light"
                    :title="(webData.documentMenuOpen ? 'Close Document Options' : 'Open Document Options')"
                    @mouseenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon :icon="(webData.documentMenuOpen ? 'fa-square-caret-down' : 'fa-arrow-up-from-bracket')" />
                </button>
            </div>
        </div>
    </div>
</client-only>
</template>

<script setup>
import pdfjs_logo from "@/assets/PDFJS_logo.svg";
const webData = useWebsiteDataStore();
const docStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();
const route = useRoute();

const resumeNavPath = computed(() => { return (docStore.checkMarkdownRoute() ? '/resume' : '/resume/markdown'); });
const PDFJS_LINK = "https://mozilla.github.io/pdf.js/";

/**
 * This sets the color and border color of an icon.
 * @param {String} color The color to use.
 */
function getColorStyles(color = "var(--website-text)") {
    return { color, borderColor: color }
}

/**
 * This scrolls to the top of the webpage if the user won't change routes.
 * @param {String} routeStr The route the button is attached to.
 */
function scrollToTop(routeStr = "/") {
    if(routeStr !== route.path && (routeStr + "/") !== route.path) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    webData.closeNavMenu();
}

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });
</script>