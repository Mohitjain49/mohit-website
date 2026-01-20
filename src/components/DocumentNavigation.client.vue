<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div id="mohit-documentBar" :class="[(webData.documentMenuOpen ? 'menu-open' : '')]" ref="docNavBar">
    <Transition name="documentMenu-transition">
        <div v-if="webData.documentMenuOpen" class="mohit-documentMenu">
            <div class="mohit-documentMenu-tools">
                <button @click="docStore.downloadDoc()" title="Download Document" :style="getColorStyles('var(--blue-one)')">
                    <font-awesome-icon :icon="(docStore.downloadingDocument ? 'fa-spinner' : 'fa-file-download')" :spin-pulse="docStore.downloadingDocument" />
                </button>
                <button @click="docStore.printDoc()" title="Print Document" :style="getColorStyles('var(--blue-three)')">
                    <font-awesome-icon :icon="(docStore.printingIcon)" :spin-pulse="(docStore.printingDocument && !docStore.printingTimeoutError)" />
                </button>
                <button v-if="webData.shareSupported" @click="docStore.shareDoc()" title="Share Document" :style="getColorStyles('var(--blue-one)')">
                    <font-awesome-icon :icon="(docStore.sharingDocument ? 'fa-spinner' : 'fa-share')" :spin-pulse="docStore.sharingDocument" />
                </button>
                <div id="g-savetodrive" class="g-savetodrive"
                    data-src="https://www.mohit-jain.com/Mohit_Jain_Resume.pdf"
                    data-filename="Mohit_Jain_Resume.pdf"
                    data-sitename="Mohit Jain">
                </div>
            </div>
            <div class="mohit-documentMenu-tools">
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

    <div class="mohit-documentBar-bottom">
        <div class="mohit-documentBar-iconSection left">
            <template v-if="docStore.onResumeRoute">
                <RouterLink v-if="(docStore.onMarkdownRoute || docStore.onResumeQrcodeRoute)" to="/resume/" class="mohit-navBar-icon light"
                    title="Use Website Viewer"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-file-lines" />
                </RouterLink>
                <RouterLink v-if="!docStore.onResumeQrcodeRoute" to="/resume/qrcode" class="mohit-navBar-icon light"
                    title="See My Resume With A QR Code."
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-qrcode" />
                </RouterLink>
                <RouterLink v-if="!docStore.onMarkdownRoute" to="/resume/markdown" class="mohit-navBar-icon light"
                    title="Use Markdown Format"
                    @pointerenter="setPulseLoopAnimation"
                    @mouseleave="setPulseLoopAnimation">

                    <font-awesome-icon icon="fa-brands fa-markdown" />
                </RouterLink>
            </template>
            <template v-else-if="docStore.onCreateGithubRepoRoute">
                <a href="https://github.com/" to="/create-github-repo" class="mohit-navBar-icon"
                    title="Go To GitHub"
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
            <button @click="docStore.toggleDocumentFullScreen()" class="mohit-navBar-icon light"
                :title="fullScreenStore.docElementTitle"
                @pointerenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="fullScreenStore.faIcon" />
            </button>
            <button @click="webData.toggleDocumentMenu()" class="mohit-navBar-icon light"
                :title="(webData.documentMenuOpen ? 'Close Document Options' : 'Open Document Options')"
                @pointerenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="(webData.documentMenuOpen ? 'fa-circle-xmark' : 'fa-ellipsis')" />
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
const fullScreenStore = useFullScreenStore();

const pageMounted = ref(false);
const scriptLoaded = ref(false);

const webData = useWebsiteDataStore();
const docStore = useDocumentStore();

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

onMounted(() => {
    docStore.mountDocumentPage();
    nextTick(() => {
        pageMounted.value = true;
        if(!scriptLoaded.value) { return; }

        window.gapi.savetodrive.render(document.getElementById("g-savetodrive"),
            { src: "https://www.mohit-jain.com/Mohit_Jain_Resume.pdf", filename: "Mohit_Jain_Resume.pdf", sitename: "Mohit Jain" }
        );
    })
});
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

useScriptTag(
    "https://apis.google.com/js/platform.js",
    (el) => { console.log(el); scriptLoaded.value = true; },
    { async: true, defer: true }
);

watch(scriptLoaded, () => {
    if(!pageMounted.value) { return; }
    window.gapi.savetodrive.render(document.getElementById("g-savetodrive"),
        { src: "//www.mohit-jain.com/Mohit_Jain_Resume.pdf", filename: "Mohit_Jain_Resume.pdf", sitename: "Mohit Jain" }
    );
})

const PDFJS_TITLE = "This page uses PDF.js to render and display my documents on this website. Click here to see more about PDF.js.";
</script>