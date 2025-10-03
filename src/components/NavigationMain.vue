<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<nav id="mohit-navBar" :class="[noNavMenuOverflow]">
    <div class="mohit-navBar-top">
        <RouterLink to="/" class="mohit-navBar-banner" @click="(event) => { flashNavOpt(event, '/') }" title="Back To Home Page">
            <img :src="mkj_text" draggable="false" />
        </RouterLink>

        <div class="mohit-navBar-icons">
            <RouterLink v-for="btn in LAPTOP_MAIN_BTNS" :to="btn.path"
                @click="(event) => { flashNavOpt(event, btn.path) }"
                :title="btn.title"
                class="mohit-navBar-icon"
                :style="getColorStyles(btn.color)"
                @mouseenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="btn.icon" />
            </RouterLink>
            <button class="mohit-navBar-icon" @click="webData.toggleNavMenu()"
                :title="(webData.navMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu')"
                :style="getColorStyles('var(--website-light-text)')"
                @mouseenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="(webData.navMenuOpen ? 'fa-square-xmark' : 'fa-bars')" />
            </button>
        </div>
    </div>

    <Transition name="navMenu-transition">
        <div v-if="webData.navMenuOpen" class="mohit-navMenu" id="mohit-navMenu" ref="mohit-navMenu">
            <div v-for="btn in MAIN_BTNS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
                <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }">
                    <font-awesome-icon :icon="btn.icon" />
                    <span> {{ btn.title }} </span>
                </RouterLink>
            </div>

            <div class="mohit-navMenu-opt">
                <RouterLink v-for="extra in NAV_MENU_EXTRAS" :to="extra.path"
                    :title="extra.title"
                    class="mohit-navMenu-extra"
                    @click="(event) => { flashNavOpt(event, extra.path) }"
                    :style="getColorStyles(extra.color)">

                    <font-awesome-icon :icon="extra.icon" />
                </RouterLink>
                <RouterLink v-if="webData.navFooterPresent" :to="footerRoute"
                    class="mohit-navMenu-extra"
                    @click="webData.scrollToAndFromFooter()"
                    :title="(webData.webFooterVisibility ? 'Scroll To The Top' : 'Scroll Down To Footer')">

                    <FontAwesomeIcon :icon="(webData.webFooterVisibility ? 'fa-angles-up' : 'fa-angles-down')" />
                </RouterLink>
            </div>
            <div class="mohit-navMenu-opt small-features">
                <button @click="webData.setQRCodePopup(true)" class="mohit-navMenu-smallFeatures-btn" title="Share This Page With Someone Else!">
                    <font-awesome-icon icon="fa-share-from-square" />
                </button>
                <div class="mohit-navMenu-volume-meter">
                    <FontAwesomeIcon :icon="audioStore.volumeInputIcon" />
                    <input type="range" min="0" max="100" title="Volume Meter for the click sound."
                        v-model="audioStore.volumeInput"
                        @input="audioStore.changeAudioVolume()"
                    />
                    <span> {{ (audioStore.volumeInput + '%') }} </span>
                </div>
                <div class="mohit-navMenu-smallFeatures-right"></div>
            </div>
        </div>
    </Transition>
</nav>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Transparent.png";
const webData = useWebsiteDataStore();
const audioStore = useAudioStore();
const { height: windowHeight } = useWindowSize();

const router = useRouter();
const routePath = computed(() => { return router.currentRoute.value.path; });
const footerRoute = computed(() => {
    return { path: routePath.value, hash: (webData.webFooterVisibility ? '' :'#footer') }
});

// This changes the style of the Navigation Bar if its menu is open and has to overflow its content.
const noNavMenuOverflow = computed(() => {
    return ((!webData.navMenuOpen || windowHeight.value >= 590) ? '' : 'menu-overflowing');
});

/**
 * This sets the color and border color of an icon.
 * @param {String} color The color to use.
 */
function getColorStyles(color = "var(--website-text)") {
    return { color, borderColor: color }
}

/**
 * This function makes a button flash if it will do nothing.
 * @param event The event made when the user clicks on the navigation option.
 * @param path The route the option leads to.
 */
function flashNavOpt(event = new MouseEvent("click"), path = "/") {
    path = (path.endsWith("/") ? path.slice(0, -1) : path);
    
    if(routePath.value !== path && routePath.value !== (path + "/")) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    webData.addFlashAnimation(event);
    webData.closeNavMenu();
}

const MAIN_BTNS = [
    { path: "/", icon: "fa-house", color: "var(--website-light-text)", title: "Home Page" },
    { path: "/contact", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me" },
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "See My Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "See My Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "See My Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "See My Resume" },
    { path: "/features", icon: "fa-bolt-lightning", color: "var(--lightning-yellow)", title: "Website Features" },
];

const LAPTOP_MAIN_BTNS = [
    { path: "/", icon: "fa-house", color: "var(--website-light-text)", title: "Home Page" },
    { path: "/contact", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me!" },
];

const NAV_MENU_EXTRAS = [
    { path: "/icons", icon: "fa-pen-fancy", color: "var(--blue-one)", title: "My Icons" },
    { path: "/copyright", icon: "fa-copyright", color: "var(--blue-four)", title: "Copyright" },
    { path: FCS_CERTIFICATE_ROUTE, icon: "fa-school-flag", color: "var(--fulton-green)", title: "FCS Certificate" },
];
</script>