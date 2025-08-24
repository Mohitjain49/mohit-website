<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div id="mohit-documentBar" :class="[(webData.documentMenuOpen ? 'menu-open' : '')]">
    <Transition name="documentMenu-transition">
        <div v-if="webData.documentMenuOpen" class="mohit-documentMenu">
            <div class="mohit-navMenu-opt">
                <RouterLink class="mohit-navMenu-mainOpt" :to="currentPath" @click="webData.closeNavMenu()">
                    <font-awesome-icon icon="fa-file-lines" />
                    <span> {{ 'Back To Main Viewer' }} </span>
                </RouterLink>
            </div>
            <div class="mohit-navMenu-opt">
                <RouterLink class="mohit-navMenu-mainOpt" :to="(currentPath + '/google')" @click="webData.closeNavMenu()">
                    <font-awesome-icon icon="fa-brands fa-google-drive" />
                    <span> {{ 'Google Doc Viewer' }} </span>
                </RouterLink>
            </div>
            <div class="mohit-navMenu-opt">
                <RouterLink class="mohit-navMenu-mainOpt" :to="(currentPath + '/pdf')" @click="webData.closeNavMenu()">
                    <font-awesome-icon icon="fa-file-pdf" />
                    <span> {{ 'Web PDF Viewer' }} </span>
                </RouterLink>
            </div>

            <div v-if="docStore.checkResumeRoute()" class="mohit-navMenu-opt">
                <RouterLink class="mohit-navMenu-mainOpt" :to="(currentPath + '/markdown')"
                    @click="webData.closeNavMenu()"
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
            <button @click="webData.toggleDocumentMenu()" class="mohit-navBar-icon light"
                :title="(webData.documentMenuOpen ? 'Close Document Menu' : 'Open Document Menu')">

                <font-awesome-icon :icon="(webData.documentMenuOpen ? 'fa-square-xmark' : 'fa-bars')" />
            </button>
        </div>
    </div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const docStore = useDocumentStore();
const currentPath = computed(() => { return (docStore.checkResumeRoute() ? '/resume' : FCS_CERTIFICATE_ROUTE) });

/**
 * This sets the color and border color of an icon.
 * @param {String} color The color to use.
 */
function getColorStyles(color = "var(--website-text)") {
    return { color, borderColor: color }
}

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });
</script>