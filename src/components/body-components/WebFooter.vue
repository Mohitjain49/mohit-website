<template>
<footer id="footer" :class="footerClass" ref="mohit-footer">
    <div class="footer-body">
        <div class="footer-routes-column">
            <RouterLink to="/" class="footer-routes-header light" @click="scrollToTop('/')" pulse-loop>
                <font-awesome-icon icon="fa-house" />
                <span> Home Page </span>
            </RouterLink>

            <RouterLink v-for="tab in MAIN_ROUTES" :to="tab.path" pulse-loop
                :style="{ 'color': tab.color }"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <font-awesome-icon :icon="tab.icon" />
                <span> {{ tab.name }} </span>
            </RouterLink>
        </div>

        <div class="footer-routes-column">
            <RouterLink to="/contact/" class="footer-routes-header" @click="scrollToTop('/contact')" pulse-loop>
                <font-awesome-icon icon="fa-paper-plane" />
                <span> Contact Me </span>
            </RouterLink>

            <template v-for="(social, index) in SOCIALS">
                <a v-if="(index != 2)" :href="social.link" class="footer-routes-opt" :style="{ 'color': social.color }" pulse-loop>
                    <font-awesome-icon :icon="social.linkIcon" />
                    <span> {{ social.name }} </span>
                </a>
            </template>
        </div>

        <div class="footer-routes-column">
            <RouterLink to="/features/" class="footer-routes-header" pulse-loop
                @click="scrollToTop('/features')"
                style="color: var(--lightning-yellow)">

                <font-awesome-icon icon="fa-bolt-lightning" />
                <span> Features </span>
            </RouterLink>

            <RouterLink v-for="tab in EXTRA_ROUTES" :to="tab.path" pulse-loop
                :style="{ 'color': tab.color }"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <font-awesome-icon :icon="tab.icon" />
                <span> {{ tab.name }} </span>
            </RouterLink>

            <a :href="PERSONAL_WEBSITE_REPOSITORY_LINK" class="footer-routes-opt" :style="{ 'color': 'white' }" pulse-loop>
                <font-awesome-icon icon="fa-code-branch" />
                <span> Repository </span>
            </a>
        </div>
    </div>

    <div class="footer-bottom">
        <RouterLink to="/copyright/" class="copyright-statement" @click="scrollToTop('/copyright')" pulse-loop>
            <font-awesome-icon icon="fa-copyright" />
            <span> {{ COPYRIGHT_TEXT }} </span>
        </RouterLink>
        <div class="footer-bottom-buttons">
            <button @click="webData.openQRCodePopup()" :title="SHARE_PAGE_TITLE" :style="getColorStyles('var(--website-light-text)')" pulse-loop>
                <FontAwesomeIcon icon="fa-share-from-square" />
            </button>
            <RouterLink :to="{ route: route.path }" @click="webData.scrollToAndFromFooter()" title="Scroll To The Top" pulse-loop>
                <FontAwesomeIcon icon="fa-turn-up" />
            </RouterLink>
        </div>
    </div>
</footer>
</template>

<script setup>
const route = useRoute();
const webData = useWebsiteDataStore();
const COPYRIGHT_TEXT = ref("2026 Mohit Jain");

const footerRef = useTemplateRef('mohit-footer');
usePulseLoopAnimation(footerRef);

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
    if(-1 != MAIN_PAGE_STYLE_ROUTES.findIndex((item) => { return (item === path || (item + "/") === path) })) {
        return 'main-page';
    } else {
        return '';
    }
})

/**
 * This scrolls to the top of the webpage if the user won't change routes.
 * @param {String} routeStr The route the button is attached to.
 */
function scrollToTop(routeStr = "/") {
    if(routeStr.endsWith("/")) { routeStr = routeStr.substring(0, (routeStr.length - 1)); }
    if(routeStr !== route.path && (routeStr + "/") !== route.path) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

const MAIN_ROUTES = [
    { name: "My Skills", path: "/skills/", icon: "fa-code", color: "var(--blue-two)" },
    { name: "My Experience", path: "/experience/", icon: "fa-file-code", color: "var(--website-text)" },
    { name: "My Projects", path: "/projects/", icon: "fa-cubes", color: "var(--globe-green)" },
    { name: "My Resume", path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)" },
    { name: "My Documents", path: "/documents/", icon: "fa-folder-open", color: "var(--website-light-text)" },
    { name: "My Icons", path: "/icons/", icon: "fa-pen-fancy", color: "var(--blue-two)" },
];

const EXTRA_ROUTES = [
    { name: "Gamepad", path: "/gamepad/", icon: "fa-gamepad", color: "var(--website-light-text)" },
    { name: "Barcode Reader", path: "/code-scanner/", icon: "fa-barcode", color: "var(--blue-cobalt)" },
    { name: "Install Website", path: "/install/", icon: "fa-download", color: "var(--website-text)" },
    { name: "Wake Lock", path: "/wakelock/", icon: "fa-lock", color: "var(--vibrant-flame)" },
    { name: "Google Mockup", path: "/google-mockup/", icon: "fa-brands fa-google", color: "#4286F5" }
];

const MAIN_PAGE_STYLE_ROUTES = ["/", "/wakelock", "/features", "/gamepad", "/code-scanner"];
</script>

<style scoped>
#footer {
    position: relative;
    background-color: rgba(0, 0, 0, 0.95);
    width: 100%;
    height: fit-content;
    border: none;
    padding-top: 25px;
    z-index: 20;
}
#footer.main-page {
    border-top: 2px dashed var(--website-light-text);
    background-color: rgb(10, 10, 10);
}

.footer-body {
    position: relative;
    left: calc((100% - 750px) / 2);
    width: 750px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.footer-bottom {
    width: calc(100% - 30px);
    height: 50px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    padding: 4px 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.copyright-statement {
    width: fit-content;
    text-align: center;
    color: var(--blue-cobalt);
    font-size: 20px;
    font-family: 'Lexend', sans-serif;
    cursor: pointer;
    transition: scale 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 3px;
}
.copyright-statement:hover {
    scale: 1.05;
    text-decoration: underline;
}

.footer-routes-column {
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding-bottom: 20px;
}

.footer-routes-header {
    color: var(--website-text);
    font-family: 'Roboto', sans-serif;
    font-size: 27px;
    font-weight: bold;
    transition: scale 0.2s;
    padding-bottom: 1px;
    margin-bottom: 20px;
    margin-left: 40px;
}
.footer-routes-header svg {
    font-size: 22px;
    margin-bottom: 2px;
}
.footer-routes-header:hover {
    scale: 1.05;
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
    transition: scale 0.2s;
    padding-bottom: 2px;
    margin-bottom: 10px;
    margin-left: 40px;
}
.footer-routes-opt:hover {
    scale: 1.05;
}
.footer-routes-opt svg {
    width: 25px;
    margin-right: 8px;
}

.footer-bottom-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: fit-content;
    gap: 10px;
}
.footer-bottom-buttons > button, .footer-bottom-buttons > a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 33px;
    width: 33px;
    color: var(--website-text);
    border: 1px solid;
    border-radius: 7px;
    transition: var(--default-transition), scale 0.2s;
}

.footer-bottom-buttons > button > svg, .footer-bottom-buttons > a > svg {
    font-size: 20px;
}
.footer-bottom-buttons > button:hover, .footer-bottom-buttons > a:hover {
    background-color: rgb(43, 43, 43);
    scale: 1.1;
}

@media (max-width: 800px) {
    .footer-body {
        grid-template-columns: repeat(1, 1fr);
        left: 0px;
        width: 100%;
    }
    .footer-routes-column {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .footer-routes-header {
        width: 250px;
        text-align: left;
        font-size: 36px;
        margin-left: 0px;
        margin-right: 0px;
    }
    .footer-routes-header svg {
        font-size: 28px;
    }

    .footer-routes-opt {
        width: 170px;
        text-align: left;
        margin-left: 0px;
        margin-right: 0px;
    }
}
@media (max-width: 525px) {
    .footer-bottom { height: 40px; }
    .copyright-statement { font-size: 18px; }

    .footer-bottom-buttons > button, .footer-bottom-buttons > a {
        height: 27px;
        width: 27px;
    }
    .footer-bottom-buttons > button > svg, .footer-bottom-buttons > a > svg {
        font-size: 17px;
    }
}
</style>