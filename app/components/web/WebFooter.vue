<template>
<footer id="footer" ref="mohit-footer" :style="footerScrollMargin">
    <div :class="['footer-websiteVersion', ((smallViewport && leftNavWidgetsVisible) ? 'center' : '')]">
        {{ websiteVersion }}
    </div>

    <div class="footer-body">
        <div id="webpages" class="footer-main-icon" :style="webpagesScrollMargin">
            <RouterLink to="/" title="Home Page" v-pulse-loop>
                <img :src="mkj_icon" draggable="false" />
            </RouterLink>
        </div>

        <div class="footer-routes-column">
            <h2 class="footer-routes-header light"> Main Pages </h2>
            <RouterLink v-for="tab in MAIN_ROUTES" :to="tab.path" v-pulse-loop
                :style="getColorStyles(tab.color)"
                class="footer-routes-opt">

                <span> {{ tab.name }} </span>
                <font-awesome-icon :icon="tab.icon" />
            </RouterLink>
        </div>

        <div class="footer-routes-column">
            <h2 class="footer-routes-header"> Secondary Pages </h2>
            <RouterLink v-for="tab in SECONDARY_ROUTES" :to="tab.path" v-pulse-loop
                :style="getColorStyles(tab.color)"
                class="footer-routes-opt">

                <span> {{ tab.name }} </span>
                <font-awesome-icon :icon="tab.icon" />
            </RouterLink>
            <a :href="PERSONAL_WEBSITE_REPOSITORY_LINK"
                :style="getColorStyles('white')"
                class="footer-routes-opt"
                target="_self" v-pulse-loop>

                <span> Website Repository </span>
                <font-awesome-icon icon="fa-code-branch" />
            </a>
        </div>
    </div>

    <div class="footer-contact-section">
        <a v-for="(contact, index) in SOCIALS" :href="contact.link" v-pulse-loop
            :title="((index == 0) ? contact.name : ('My ' + contact.name + ' Profile'))"
            :style="getColorStyles(contact.color)">

            <font-awesome-icon :icon="contact.linkIcon" />
        </a>
    </div>
    <div class="footer-job-title">
        Lead Software Developer At
        <span><a :href="MAIN_IVUE_WEBSITE_LINK" v-pulse-loop> <img :src="ivue_text" draggable="false" /> </a></span>
    </div>

    <div class="footer-bottom">
        <RouterLink to="/copyright/" class="copyright-statement" title="Copyright Notice" v-pulse-loop>
            <font-awesome-icon icon="fa-copyright" />
            <span> {{ copyrightText }} </span>
        </RouterLink>

        <div class="footer-bottom-buttons">
            <button @click="webData.openQRCodePopup()"
                :style="getColorStyles('var(--website-light-text)')"
                :title="SHARE_PAGE_TITLE" v-pulse-loop>

                <FontAwesomeIcon icon="fa-share-from-square" />
            </button>
            <RouterLink v-show="isMounted" :to="topPath" title="Scroll To The Top" v-pulse-loop>
                <FontAwesomeIcon icon="fa-turn-up" />
            </RouterLink>
        </div>
    </div>
</footer>
</template>

<script setup>
import mkj_icon from "/static-icons/Personal_Icon_Expanded_Rounded.png";
import ivue_text from "@/assets/ivue/iVue_White_Text_Cropped.png";

const { $websiteBuild } = useNuxtApp();
const { cssViewportWidth } = storeToRefs(useStyleStore());
const webData = useWebsiteDataStore();

const topPath = useRoutePathWithQuery();
const footerRef = useTemplateRef('mohit-footer');

const leftNavWidgetsVisible = useState('left-nav-widgets', () => { return false; });
const copyrightText = useState("footer-copyright-text", () => { return ($websiteBuild.coprightYear + " Mohit Jain"); });
const websiteVersion = useState("footer-project-version", () => { return ("Version " + $websiteBuild.version); });

const smallViewport = computed(() => { return (cssViewportWidth.value <= 925); });
const footerScrollMargin = computed(() => {
    return { scrollMarginTop: ((leftNavWidgetsVisible.value && !smallViewport.value) ? "90px" : "50px") }
});
const webpagesScrollMargin = computed(() => {
    return { scrollMarginTop: ((leftNavWidgetsVisible.value && !smallViewport.value) ? "115px" : "75px") }
});

const isMounted = onAfterMounted(() => {
    if(!Boolean(footerRef.value)) { throw new Error("Website Footer Not Accessible."); }
    webData.navFooterPresent = true;
    webData.webFooter = footerRef.value;

    copyrightText.value = ($websiteBuild.coprightYear + " Mohit Jain");
    websiteVersion.value = ("Version " + $websiteBuild.version);
});
onBeforeUnmount(() => {
    webData.navFooterPresent = false;
    webData.webFooter = null;
});

const MAIN_ROUTES = [
    { name: "Home Page", path: "/", icon: "fa-house", color: "var(--website-light-text)" },
    { name: "Contact Me", path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)" },
    { name: "My Skills", path: "/skills/", icon: "fa-code", color: "var(--blue-two)" },
    { name: "My Experience", path: "/experience/", icon: "fa-file-code", color: "var(--website-text)" },
    { name: "My Projects", path: "/projects/", icon: "fa-cubes", color: "var(--globe-green)" },
    { name: "My Resume", path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)" }
];

const SECONDARY_ROUTES = [
    { name: "My Library", path: "/library/", icon: "fa-book-open-reader", color: "var(--website-light-text)" },
    { name: "Website Features", path: "/features/", icon: "fa-bolt-lightning", color: "var(--lightning-yellow)" },
    { name: "Copyright Notice", path: "/copyright/", icon: "fa-copyright", color: "var(--blue-cobalt)" },
    { name: "My Icons", path: "/icons/", icon: "fa-pen-fancy", color: "var(--blue-two)" },
    { name: "Wake Lock", path: "/wakelock/", icon: "fa-lock", color: "var(--vibrant-flame)" },
];
</script>

<style scoped lang="scss">
#footer {
    position: relative;
    background-color: black;
    width: 100%;
    height: fit-content;
    border: none;
    overflow: hidden;
    padding-top: 25px;
    z-index: 20;
    scroll-margin-top: 50px;
    --footer-border-color: var(--website-light-text); 
    border-top: 2px solid var(--footer-border-color, var(--website-light-text));
}
#webpages {
    scroll-margin-top: 75px;
}

.footer-websiteVersion {
    position: absolute;
    top: 0px;
    left: 0px;
    height: fit-content;
    width: fit-content;
    color: var(--footer-border-color, var(--website-light-text));
    padding: 5px 8px;
    border: 2px solid var(--footer-border-color, var(--website-light-text));
    border-top: none;
    border-radius: 0px 0px 7px 7px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
    background: transparent;
    user-select: none;
}
.footer-websiteVersion.center {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: 0px auto;
}

.footer-body {
    position: relative;
    left: calc(50% - 450px);
    width: 900px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    border-radius: 7px;
    height: fit-content;
    width: 225px;
    color: var(--website-text);
    background-color: rgb(29, 29, 29);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 16px;
    transition: scale 0.2s;
    padding: 4px 8px;
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

@include dynamic-less-equal-width-rule-scopedBlock(925) {
    .footer-body {
        grid-template-columns: repeat(2, 1fr);
        left: calc(50% - 275px);
        width: 550px;
    }
    .footer-main-icon {
        grid-column: span 2;
    }
}
@include dynamic-less-equal-width-rule-scopedBlock(550) {
    .footer-body {
        grid-template-columns: repeat(1, 1fr);
        left: 0px;
        width: 100%;
    }
    .footer-routes-opt {
        width: 280px;
        padding: 4px 8px;
        letter-spacing: 1px;
    }

    .footer-main-icon { grid-column: span 1; }
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