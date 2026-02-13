<template>
<footer id="footer" :class="footerClass" ref="mohit-footer">
    <div class="footer-body">
        <div class="footer-routes-column">
            <RouterLink to="/" class="footer-routes-header light" @click="scrollToTop('/')">
                <font-awesome-icon icon="fa-house" />
                <span> Home Page </span>
            </RouterLink>

            <RouterLink v-for="tab in MAIN_ROUTES" :to="(tab.path + '/')"
                :style="{ 'color': tab.color }"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <font-awesome-icon :icon="tab.icon" />
                <span> {{ tab.name }} </span>
            </RouterLink>
        </div>

        <div class="footer-routes-column right">
            <RouterLink to="/contact" class="footer-routes-header" @click="scrollToTop('/contact')">
                <font-awesome-icon icon="fa-paper-plane" />
                <span> Contact Me </span>
            </RouterLink>

            <template v-for="(social, index) in SOCIALS">
                <a v-if="(index != 2)" :href="social.link" class="footer-routes-opt" :style="{ 'color': social.color }">
                    <font-awesome-icon :icon="social.linkIcon" />
                    <span> {{ social.name }} </span>
                </a>
            </template>
        </div>

        <div class="footer-routes-column extras">
            <RouterLink to="/features" class="footer-routes-header"
                @click="scrollToTop('/features')"
                style="color: var(--lightning-yellow)">

                <font-awesome-icon icon="fa-bolt-lightning" />
                <span> Features </span>
            </RouterLink>

            <RouterLink v-for="tab in EXTRA_ROUTES" :to="tab.path"
                :style="{ 'color': tab.color }"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <font-awesome-icon :icon="tab.icon" />
                <span> {{ tab.name }} </span>
            </RouterLink>
        </div>

        <div class="footer-routes-column extras right">
            <a :href="PERSONAL_WEBSITE_REPOSITORY_LINK" class="footer-routes-header white">
                <font-awesome-icon icon="fa-code-branch" />
                <span> Repository </span>
            </a>

            <a v-for="tab in REPO_ROUTES" :href="tab.link" :style="{ 'color': tab.color }" class="footer-routes-opt">
                <font-awesome-icon :icon="tab.icon" />
                <span> {{ tab.name }} </span>
            </a>
        </div>
    </div>

    <div class="footer-bottom">
        <RouterLink to="/copyright" class="copyright-statement" @click="scrollToTop('/copyright')">
            <font-awesome-icon icon="fa-copyright" />
            <span> {{ COPYRIGHT_TEXT }} </span>
        </RouterLink>
    </div>

    <button v-if="!docStore.onHostedFileRoute"
        @click="webData.openQRCodePopup()"
        class="qr-popup-open-section"
        title="Share This Page With Someone Else!">

        <FontAwesomeIcon icon="fa-share-from-square" />
    </button>
</footer>
</template>

<script setup>
const route = useRoute();
const webData = useWebsiteDataStore();
const docStore = useDocumentStore();

const fullScreenSet = getFullScreenSet();
const COPYRIGHT_TEXT = ref("2025 Mohit Jain");

onMounted(() => {
    COPYRIGHT_TEXT.value = (new Date().getFullYear() + " Mohit Jain");
    webData.navFooterPresent = true;
    webData.webFooter = document.getElementById("footer");
});
onBeforeUnmount(() => {
    webData.navFooterPresent = false;
    webData.webFooter = null;
})

const footerClass = computed(() => {
    const path = route.path;
    if(-1 != MAIN_PAGE_STYLE_ROUTES.findIndex(item => item === path)) {
        return 'main-page';
    } else if(!fullScreenSet.value && docStore.onHostedFileRoute) {
        return 'document-route';
    } else {
        return '';
    }
})

/**
 * This scrolls to the top of the webpage if the user won't change routes.
 * @param {String} routeStr The route the button is attached to.
 */
function scrollToTop(routeStr = "/") {
    if(routeStr !== route.path && (routeStr + "/") !== route.path) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

const MAIN_ROUTES = [
    { name: "My Skills", path: "/skills", icon: "fa-code", color: "var(--blue-two)" },
    { name: "My Experience", path: "/experience", icon: "fa-file-code", color: "var(--website-text)" },
    { name: "My Projects", path: "/projects", icon: "fa-cubes", color: "var(--globe-green)" },
    { name: "My Resume", path: "/resume", icon: "fa-file-lines", color: "var(--website-text)" },
    { name: "My Documents", path: "/documents", icon: "fa-folder-open", color: "var(--website-light-text)" },
    { name: "My Icons", path: "/icons", icon: "fa-pen-fancy", color: "var(--blue-two)" },
];

const EXTRA_ROUTES = [
    { name: "Gamepad", path: "/gamepad", icon: "fa-gamepad", color: "var(--website-light-text)" },
    { name: "Barcode Reader", path: "/code-reader", icon: "fa-barcode", color: "var(--blue-cobalt)" },
    { name: "Install Website", path: "/install", icon: "fa-download", color: "var(--website-text)" },
    { name: "Wake Lock", path: "/wakelock", icon: "fa-lock", color: "var(--vibrant-flame)" },
    { name: "Google Mockup", path: "/google-mockup/", icon: "fa-brands fa-google", color: "#4286F5" },
];

const REPO_ROUTES = [
    { name: "Code Sandbox", link: PERSONAL_WEBSITE_CODE_SANDBOX, icon: "fa-square-pen", color: "var(--lightning-yellow)" },
    { name: "Commits", link: PERSONAL_WEBSITE_COMMITS_LINK, icon: "fa-code-commit", color: "white" },
    { name: "Sitemap", link: PERSONAL_SITEMAP_LINK, icon: "fa-sitemap", color: "lightgrey" },
];

const MAIN_PAGE_STYLE_ROUTES = ["/", "/wakelock", "/wakelock/", "/features", "/features/"];
</script>

<style scoped>
#footer {
    position: relative;
    background-color: rgba(0, 0, 0, 0.95);
    width: 100%;
    height: 375px;
    border: none;
    padding-top: 25px;
    z-index: 20;
}
#footer.main-page {
    border-top: 2px dashed var(--website-light-text);
    background-color: rgb(10, 10, 10);
}
#footer.document-route {
    padding-bottom: 30px;
}

.footer-body {
    position: relative;
    left: calc((100% - 1000px) / 2);
    width: 1000px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.footer-bottom {
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    padding-bottom: 15px;
}

.copyright-statement {
    width: fit-content;
    text-align: center;
    color: var(--blue-cobalt);
    font-size: 25px;
    font-family: 'Lexend', sans-serif;
    cursor: pointer;
    border-bottom: var(--empty-border);
    transition: var(--default-transition);
}
.copyright-statement svg {
    font-size: 23px;
    margin-right: 4px;
}
.copyright-statement:hover {
    border-color: var(--blue-cobalt);
}

.footer-routes-column {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}
.footer-routes-column.extras {
    height: fit-content;
    padding-bottom: 20px;
}

.footer-routes-header {
    color: var(--website-text);
    font-family: 'Roboto', sans-serif;
    font-size: 27px;
    font-weight: bold;
    border-bottom: var(--thin-empty-border);
    transition: var(--default-transition);
    padding-bottom: 1px;
    margin-bottom: 20px;
    margin-left: 40px;
}
.footer-routes-header svg {
    font-size: 22px;
    margin-bottom: 2px;
}
.footer-routes-header:hover {
    border-color: inherit;
}

.footer-routes-header.light {
    color: var(--website-light-text);
}
.footer-routes-header.white {
    color: white;
}

.footer-routes-opt {
    color: var(--website-text);
    font-family: 'Roboto', sans-serif;
    font-size: 19px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0);
    transition: var(--default-transition);
    padding-bottom: 2px;
    margin-bottom: 10px;
    margin-left: 40px;
}
.footer-routes-opt:hover {
    border-color: inherit;
}
.footer-routes-opt svg {
    width: 25px;
    margin-right: 8px;
}

.qr-popup-open-section {
    position: absolute;
    bottom: 15px;
    left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: fit-content;
    color: var(--website-light-text);
    padding: 7px;
    border: 1px solid;
    border-radius: 10px;
    transition: var(--default-transition), scale 0.2s;
}
.qr-popup-open-section svg {
    width: 35px;
    height: 35px;
}
.qr-popup-open-section:hover {
    background-color: rgb(43, 43, 43);
    scale: 1.1;
}

@media (max-width: 1050px) {
    #footer {
        height: 640px;
    }
    #footer.document-route {
        padding-bottom: 20px;
    }
    .footer-body {
        grid-template-columns: 1fr 1fr;
        left: 0px;
        width: 100%;
    }

    .footer-routes-column {
        width: 230px;
        position: relative;
        left: calc(100% - 250px)
    }
    .footer-routes-column.right {
        left: 20px;
    }
}
@media (max-width: 700px) {
    .footer-body {
        left: 0px;
        width: 100%;
    }
}
@media (max-width: 525px) {
    #footer {
        height: 545px;
    }
    #footer.document-route {
        padding-bottom: 40px;
    }
    .footer-body {
        height: 470px;
        left: 0px;
        width: 100%;
    }
    .footer-bottom {
        padding: 10px 0px;
    }
    .copyright-statement {
        font-size: 23px;
    }
    .copyright-statement svg {
        font-size: 21px;
    }

    .footer-routes-column {
        height: 260px;
        left: 0px;
        width: auto;
    }
    .footer-routes-column.right {
        left: 0px;
    }

    .footer-routes-header {
        font-size: 20px;
        margin-left: 18px;
        margin-bottom: 15px;
    }
    .footer-routes-header svg {
        font-size: 18px;
    }

    .footer-routes-opt {
        font-size: 14px;
        margin-left: 20px;
    }
    .footer-routes-opt svg {
        width: 15px;
        margin-right: 5px;
    }

    .qr-popup-open-section {
        bottom: 20px;
    }
    .qr-popup-open-section svg {
        width: 25px;
        height: 25px;
    }
}
</style>