<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<client-only>
    <div id="mohit-documentBar" :class="[(webData.documentMenuOpen ? 'menu-open' : '')]">
        <Transition name="documentMenu-transition">
            <div v-if="webData.documentMenuOpen" class="mohit-documentMenu">
                <div class="mohit-navMenu-opt">
                    <RouterLink class="mohit-navMenu-mainOpt" :to="currentPath" @click="scrollToTop(currentPath)">
                        <font-awesome-icon icon="fa-file-lines" />
                        <span> {{ 'Use Main Viewer' }} </span>
                    </RouterLink>
                </div>
                <div class="mohit-navMenu-opt">
                    <RouterLink class="mohit-navMenu-mainOpt" :to="(currentPath + '/google')" @click="scrollToTop(currentPath + '/google')">
                        <font-awesome-icon icon="fa-brands fa-google-drive" />
                        <span> {{ 'Google Doc Viewer' }} </span>
                    </RouterLink>
                </div>
                <div class="mohit-navMenu-opt">
                    <RouterLink class="mohit-navMenu-mainOpt" :to="(currentPath + '/pdf')" @click="scrollToTop(currentPath + '/pdf')">
                        <font-awesome-icon icon="fa-file-pdf" />
                        <span> {{ 'Web PDF Viewer' }} </span>
                    </RouterLink>
                </div>

                <div v-if="docStore.checkResumeRoute()" class="mohit-navMenu-opt">
                    <RouterLink class="mohit-navMenu-mainOpt" :to="(currentPath + '/markdown')"
                        @click="scrollToTop(currentPath + '/markdown')"
                        :style="getColorStyles('var(--website-light-text)')">

                        <font-awesome-icon icon="fa-brands fa-markdown" />
                        <span> {{ 'Use Markdown Format' }} </span>
                    </RouterLink>
                </div>
                <div v-if="docStore.checkFCSCertificateRoute()" class="mohit-navMenu-opt">
                    <a :href="FCS_CERTIFICATE_LINKEDIN_POST"  target="_blank"
                        title="See LinkedIn Post" class="mohit-navMenu-extra large"
                        :style="getColorStyles('#0072B1')">

                        <font-awesome-icon icon="fa-brands fa-linkedin" />
                    </a>
                    <a :href="FCS_CAREER_INTERNSHIP_LINK"  target="_blank"
                        title="FCS Career Internship Program" class="mohit-navMenu-extra large"
                        :style="getColorStyles('var(--fulton-green)')">

                        <font-awesome-icon icon="fa-school-flag" />
                    </a>
                </div>
            </div>
        </Transition>

        <div class="mohit-documentBar-bottom">
            <div class="mohit-documentBar-iconSection left">
                <button @click="docStore.downloadDoc()" class="mohit-navBar-icon light" title="Download Document">
                    <font-awesome-icon icon="fa-file-download" />
                </button>
                <button @click="docStore.printDoc()" class="mohit-navBar-icon light" title="Print Document">
                    <font-awesome-icon icon="fa-print" />
                </button>
                <button @click="reloadPage()" class="mohit-navBar-icon" title="Reload Page">
                    <font-awesome-icon icon="fa-rotate-right" />
                </button>
            </div>
            <div class="mohit-documentBar-iconSection right">
                <a class="mohit-navBar-icon white" :href="PDFJS_LINK" title="See More about PDF.js">
                    <img :src="pdfjs_logo" draggable="false" width="20" />
                </a>
                <button @click="webData.toggleDocumentMenu()" class="mohit-navBar-icon light"
                    :title="(webData.documentMenuOpen ? 'Close Document Menu' : 'Open Document Menu')">

                    <font-awesome-icon :icon="(webData.documentMenuOpen ? 'fa-square-xmark' : 'fa-bars')" />
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
const route = useRoute();

const currentPath = computed(() => { return (docStore.checkResumeRoute() ? '/resume' : FCS_CERTIFICATE_ROUTE) });
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