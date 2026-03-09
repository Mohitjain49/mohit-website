<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<nav id="mohit-navBar" ref="navBar">
    <div class="mohit-navBar-top">
        <div class="mohit-navBar-icons left">
            <RouterLink to="/" class="mohit-navBar-banner" @click="(event) => { flashNavOpt(event, '/') }" title="Home Page" pulse-loop>
                <img :src="mkj_text" draggable="false" />
            </RouterLink>
        </div>

        <div class="mohit-navBar-mainLinks" v-show="(windowWidth > 650)">
            <RouterLink v-for="link in CENTER_LINKS" :to="link.path"
                @click="(event) => { flashNavOpt(event, link.path) }"
                :style="getColorStyles(link.color)"
                class="mohit-navBar-link" pulse-loop>

                <span> {{ link.title }} </span>
            </RouterLink>
        </div>

        <div class="mohit-navBar-icons right">
            <RouterLink v-for="btn in LAPTOP_MAIN_BTNS" :to="btn.path" :title="btn.title"
                @click="(event) => { flashNavOpt(event, btn.path) }"
                :style="getColorStyles(btn.color)"
                class="mohit-navBar-icon" pulse-loop>

                <font-awesome-icon :icon="btn.icon" />
            </RouterLink>
            <button class="mohit-navBar-icon light" @click="webData.toggleNavMenu()" title="Open Navigation Menu" pulse-loop>
                <font-awesome-icon icon="fa-bars" />
            </button>
        </div>
    </div>
</nav>

<Transition name="navMenu-transition">
    <div v-show="webData.navMenuOpen" class="mohit-navMenu" id="mohit-navMenu" ref="navMenu">
        <div class="mohit-navMenu-top">
            <div class="mohit-navBar-icons left">
                <RouterLink to="/" class="mohit-navBar-banner" @click="(event) => { flashNavOpt(event, '/') }" title="Home Page" pulse-loop>
                    <img :src="mkj_text" draggable="false" />
                </RouterLink>
            </div>

            <div class="mohit-navBar-icons right">
                <button @click="webData.openQRCodePopup()" class="mohit-navBar-icon light" title="Share This Page With Someone Else!" pulse-loop>
                    <font-awesome-icon icon="fa-share-from-square" />
                </button>
                <button class="mohit-navBar-icon light" @click="webData.closeNavMenu()" title="Close Navigation Menu" pulse-loop>
                    <font-awesome-icon :icon="(webData.navMenuOpen ? 'fa-square-xmark' : 'fa-bars')" />
                </button>
            </div>
        </div>

        <div v-for="btn in MAIN_BTNS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
            <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }" pulse-loop>
                <span> {{ btn.title }} </span>
                <font-awesome-icon :icon="btn.icon" />
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div v-for="btn in NAV_MENU_EXTRAS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
            <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }" pulse-loop>
                <span> {{ btn.title }} </span>
                <font-awesome-icon :icon="btn.icon" />
            </RouterLink>
        </div>
        <div v-if="webData.navFooterPresent" class="mohit-navMenu-opt">
            <RouterLink class="mohit-navMenu-mainOpt" :to="footerRoute" @click="webData.scrollToAndFromFooter()" pulse-loop>
                <span> {{ (webData.webFooterVisibility ? 'Scroll To The Top' : 'See Webpages') }} </span>
                <font-awesome-icon :icon="(webData.webFooterVisibility ? 'fa-turn-up' : 'fa-book-open')" />
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt small-features">
            <div class="mohit-navMenu-volume-meter">
                <button @click="audioStore.setAudioMuted('toggle')" :title="audioStore.volumeInputTitle" pulse-loop>
                    <FontAwesomeIcon :icon="audioStore.volumeInputIcon" />
                </button>
                <input type="range" min="0" max="100" title="Volume Meter for the click sound."
                    v-model="audioStore.volumeInput"
                    @input="audioStore.changeAudioVolume()"
                />
                <span> {{ (audioStore.volumeInput + '%') }} </span>
            </div>
        </div>
    </div>
</Transition>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const webData = useWebsiteDataStore();
const audioStore = useAudioStore();
const router = useRouter();

const navBar = shallowRef(null);
const navMenu = shallowRef(null);
const navBarSwipe = useSwipe(navBar, { passive: true });

const { width: windowWidth } = useWindowSize();
usePulseLoopAnimation(navBar);
usePulseLoopAnimation(navMenu);

const routePath = computed(() => { return router.currentRoute.value.path; });
const footerRoute = computed(() => { return { path: routePath.value, hash: (webData.webFooterVisibility ? '' :'#footer') } });

// This tracks touch "swipe" events so that the user can change the page if the swipe left or right.
watch(navBarSwipe.isSwiping, () => {
    if(!navBarSwipe.isSwiping.value) { return; }
    const direction = navBarSwipe.direction.value;

    if(direction === "right" && webData.navMenuOpen) {
        webData.menuOpen = -1;
        triggerClickSound();
    } else if(direction === "left" && !webData.navMenuOpen) {
        webData.menuOpen = 0;
        triggerClickSound();
    }
});

/**
 * This function makes a button flash if it will do nothing.
 * @param event The event made when the user clicks on the navigation option.
 * @param path The route the option leads to.
 */
function flashNavOpt(event = new MouseEvent("click"), path = "/") {
    path = (path.endsWith("/") ? path.slice(0, -1) : path);
    
    if(routePath.value !== path && routePath.value !== (path + "/")) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    addFlashAnimation(event);
    webData.closeNavMenu();
}

const MAIN_BTNS = [
    { path: "/", icon: "fa-house", color: "var(--website-light-text)", title: "Home Page" },
    { path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me" },
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "See My Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "See My Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "See My Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "See My Resume" },
    { path: "/features", icon: "fa-bolt-lightning", color: "var(--lightning-yellow)", title: "Website Features" },
];

const LAPTOP_MAIN_BTNS = [
    { path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me!" },
];

const CENTER_LINKS = [
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "Resume" },
];

const NAV_MENU_EXTRAS = [
    { path: "/icons", icon: "fa-pen-fancy", color: "var(--blue-one)", title: "My Icons" },
    { path: "/copyright", icon: "fa-copyright", color: "var(--blue-four)", title: "Copyright Statement" },
    { path: "/documents", icon: "fa-folder-open", color: "var(--website-light-text)", title: "My Documents" },
];
</script>