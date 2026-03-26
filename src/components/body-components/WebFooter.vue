<template>
<footer id="footer" ref="mohit-footer">
    <div class="footer-body">
        <div class="footer-main-icon">
            <RouterLink to="/" @click="scrollToTop('/')" title="Home Page" pulse-loop>
                <img :src="mkj_icon" draggable="false" />
            </RouterLink>
        </div>

        <div class="footer-routes-column">
            <h2 class="footer-routes-header light"> Main Pages </h2>
            <RouterLink v-for="tab in MAIN_ROUTES" :to="tab.path" pulse-loop
                :style="getColorStyles(tab.color)"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <span> {{ tab.name }} </span>
                <font-awesome-icon :icon="tab.icon" />
            </RouterLink>
        </div>

        <div class="footer-routes-column">
            <h2 class="footer-routes-header"> Secondary Pages </h2>
            <RouterLink v-for="tab in SECONDARY_ROUTES" :to="tab.path" pulse-loop
                :style="getColorStyles(tab.color)"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <span> {{ tab.name }} </span>
                <font-awesome-icon :icon="tab.icon" />
            </RouterLink>
        </div>

        <div class="footer-routes-column">
            <h2 class="footer-routes-header light"> Extra Pages </h2>
            <RouterLink v-for="tab in EXTRA_ROUTES" :to="tab.path" pulse-loop
                :style="getColorStyles(tab.color)"
                class="footer-routes-opt"
                @click="scrollToTop(tab.path)">

                <span> {{ tab.name }} </span>
                <font-awesome-icon :icon="tab.icon" />
            </RouterLink>

            <a :href="PERSONAL_WEBSITE_REPOSITORY_LINK" class="footer-routes-opt" :style="getColorStyles('white')" pulse-loop>
                <span> Website Repository </span>
                <font-awesome-icon icon="fa-code-branch" />
            </a>
        </div>
    </div>

    <div class="footer-contact-section">
        <template v-for="(contact, index) in SOCIALS">
            <a v-if="(index != 2)" :href="contact.link" pulse-loop
                :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
                :style="getColorStyles(contact.color)">

                <font-awesome-icon :icon="contact.linkIcon" />
            </a>
        </template>
    </div>
    <div class="footer-job-title">
        Lead Software Developer At <span><a :href="MAIN_IVUE_WEBSITE_LINK" pulse-loop> <img :src="ivue_text" draggable="false" /> </a></span>
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
            <RouterLink :to="routePath" @click="webData.scrollToAndFromFooter()" title="Scroll To The Top" pulse-loop>
                <FontAwesomeIcon icon="fa-turn-up" />
            </RouterLink>
        </div>
    </div>
</footer>
</template>

<script setup>
import mkj_icon from "/static-icons/Personal_Icon_Expanded_Rounded.png";
import ivue_text from "@/assets/ivue/iVue_White_Text_Cropped.png";

const router = useRouter();
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
});
const routePath = computed(() => { return router.currentRoute.value.path; });

/**
 * This scrolls to the top of the webpage if the user won't change routes.
 * @param {String} routeStr The route the button is attached to.
 */
function scrollToTop(routeStr = "/") {
    if(routeStr.endsWith("/")) { routeStr = routeStr.substring(0, (routeStr.length - 1)); }
    if(routeStr !== routePath.value && (routeStr + "/") !== routePath.value) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

const MAIN_ROUTES = [
    { name: "Home Page", path: "/", icon: "fa-house", color: "var(--website-light-text)" },
    { name: "Contact Me", path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)" },
    { name: "My Skills", path: "/skills/", icon: "fa-code", color: "var(--blue-two)" },
    { name: "My Experience", path: "/experience/", icon: "fa-file-code", color: "var(--website-text)" },
    { name: "My Projects", path: "/projects/", icon: "fa-cubes", color: "var(--globe-green)" },
    { name: "My Resume", path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)" }
]

const SECONDARY_ROUTES = [
    { name: "My Documents", path: "/documents/", icon: "fa-folder-open", color: "var(--website-light-text)" },
    { name: "Website Features", path: "/features/", icon: "fa-bolt-lightning", color: "var(--lightning-yellow)" },
    { name: "Copyright Statement", path: "/copyright/", icon: "fa-copyright", color: "var(--blue-cobalt)" },
    { name: "My Icons", path: "/icons/", icon: "fa-pen-fancy", color: "var(--blue-two)" },
    { name: "Gamepad Controls", path: "/gamepad/", icon: "fa-gamepad", color: "var(--website-light-text)" },
]

const EXTRA_ROUTES = [
    { name: "Barcode Reader", path: "/code-scanner/", icon: "fa-barcode", color: "var(--blue-cobalt)" },
    { name: "Install Website", path: "/install/", icon: "fa-download", color: "var(--website-text)" },
    { name: "Wake Lock", path: "/wakelock/", icon: "fa-lock", color: "var(--vibrant-flame)" },
    { name: "Google Mockup", path: "/google-mockup/", icon: "fa-brands fa-google", color: "#4286F5" }
];
</script>

<style scoped>
#footer {
    position: relative;
    background-color: black;
    width: 100%;
    height: fit-content;
    border: none;
    overflow: hidden;
    padding-top: 25px;
    z-index: 20;
    border-top: 2px solid var(--website-light-text)
}

.footer-body {
    position: relative;
    left: calc(50% - 600px);
    width: 1200px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.footer-main-icon {
    grid-column: span 1;
    width: 100%;
    height: 275px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-main-icon > a {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 40px;
    transition: var(--default-transition);
}
.footer-main-icon > a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.footer-main-icon > a > img {
    height: 220px;
    user-select: none;
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
    padding-bottom: 1px;
    margin: 0px auto;
    margin-bottom: 20px;
    border-bottom: 2px solid;
}
.footer-routes-header.light {
    color: var(--website-light-text);
}

.footer-routes-opt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border: 1px solid var(--website-text);
    border-radius: 12px;
    height: fit-content;
    width: 190px;
    color: var(--website-text);
    background-color: rgb(29, 29, 29);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 16px;
    transition: scale 0.2s;
    padding: 4px;
    margin: 0px auto;
    margin-bottom: 10px;
}
.footer-routes-opt:hover {
    scale: 1.05;
}

.footer-contact-section {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 15px;
    padding-top: 15px;
}
.footer-contact-section > a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    font-size: 20px;
    color: var(--website-text);
    border: 1px solid;
    border-radius: 7px;
    transition: var(--default-transition), scale 0.2s;
    background-color: black;
}
.footer-contact-section > a:hover {
    scale: 1.1;
}

.footer-job-title {
    height: fit-content;
    width: 100%;
    padding: 5px 0px;
    margin-bottom: 10px;
    text-align: center;
    color: rgb(202, 202, 202);
    font-family: 'Lexend', sans-serif;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 3px;
}
.footer-job-title img {
    user-select: none;
    height: 16px;
    padding-bottom: 2px;
    border-bottom: 1px solid white;
}

.footer-job-title span {
    position: relative;
    top: 1px;
    height: fit-content;
    width: fit-content;
}
.footer-job-title a {
    display: block;
    height: 21px;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    transition: background-color 0.2s, scale 0.2s;
}
.footer-job-title a:hover {
    scale: 1.05;
    background-color: rgba(255, 255, 255, 0.151);
}

.footer-bottom {
    width: calc(100% - 30px);
    height: 50px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    padding: 4px 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
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
    user-select: none;
}
.copyright-statement:hover {
    scale: 1.05;
    text-decoration: underline;
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

@media (max-width: 1200px) {
    .footer-body {
        grid-template-columns: repeat(3, 1fr);
        left: calc(50% - 375px);
        width: 750px;
    }
    .footer-main-icon {
        grid-column: span 3;
        margin-bottom: 20px;
    }
}
@media (max-width: 750px) {
    .footer-body {
        grid-template-columns: repeat(2, 1fr);
        left: calc(50% - 275px);
        width: 550px;
    }
    .footer-main-icon {
        grid-column: span 2;
    }
}
@media (max-width: 550px) {
    .footer-body {
        grid-template-columns: repeat(1, 1fr);
        left: 0px;
        width: 100%;
    }
    .footer-main-icon {
        grid-column: span 1;
    }

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