<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<nav id="mohit-navBar" ref="navBar">
    <Transition name="fade-exit-transition" fade>
        <div class="mohit-main-progressBar" v-if="scrollProgress.show">
            <div class="inner" :style="('width:' + scrollProgress.pct + '%')"></div>
        </div>
    </Transition>

    <div class="mohit-navBar-top">
        <div class="mohit-navBar-icons left">
            <RouterLink to="/" class="mohit-navBar-banner" @click="(event) => { flashNavOpt(event, '/') }" title="Home Page" pulse-loop>
                <img :src="mkj_text" draggable="false" />
            </RouterLink>
        </div>

        <div class="mohit-navBar-mainLinks">
            <RouterLink v-for="link in CENTER_LINKS" :to="link.path"
                @click="(event) => { flashNavOpt(event, link.path) }"
                :style="getColorStyles(link.color)"
                class="mohit-navBar-link" pulse-loop>

                <span> {{ link.title }} </span>
            </RouterLink>
        </div>

        <div class="mohit-navBar-icons right">
            <RouterLink to="/contact/" title="Contact Me!" @click="(event) => { flashNavOpt(event, '/contact/') }" class="mohit-navBar-icon" pulse-loop>
                <font-awesome-icon icon="fa-paper-plane" />
            </RouterLink>
            <button v-if="webData.compassMenuAvailable" class="mohit-navBar-icon light" @click="webData.setMenuOpen(1, true)" title="Navigate This Page" pulse-loop>
                <font-awesome-icon icon="fa-compass" />
            </button>
            <button v-else-if="scriptsStore.onScriptRoute" class="mohit-navBar-icon light" @click="webData.setMenuOpen(2, true)" title="Script Options" pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
            </button>
            <button v-else-if="showDocumentOptionsBtn" class="mohit-navBar-icon light" @click="webData.setMenuOpen(3, true)" title="Document Options" pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
            </button>
            <button class="mohit-navBar-icon light" @click="webData.setMenuOpen(0, true)" title="Open Navigation Menu" pulse-loop>
                <font-awesome-icon icon="fa-bars" />
            </button>
        </div>
    </div>
</nav>

<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.navMenuOpen" class="mohit-navMenu" id="mohit-navMenu" ref="navMenu">
        <MenuTop />

        <div v-for="btn in MAIN_BTNS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
            <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }" pulse-loop>
                <font-awesome-icon :icon="btn.icon" />
                <span> {{ btn.title }} </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div v-for="btn in NAV_MENU_EXTRAS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
            <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }" pulse-loop>
                <font-awesome-icon :icon="btn.icon" />
                <span> {{ btn.title }} </span>
            </RouterLink>
        </div>
        <div v-if="webData.navFooterPresent" class="mohit-navMenu-opt">
            <RouterLink class="mohit-navMenu-mainOpt" :to="footerRoute" @click="webData.scrollToAndFromFooter()" pulse-loop>
                <font-awesome-icon :icon="(webData.webFooterVisibility ? 'fa-turn-up' : 'fa-book-open')" />
                <span> {{ (webData.webFooterVisibility ? 'Scroll To The Top' : 'See Webpages') }} </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div v-if="webData.compassMenuAvailable" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(1)" pulse-loop>
                <font-awesome-icon icon="fa-compass" />
                <span> Navigate This Page </span>
            </button>
        </div>
        <div v-if="scriptsStore.onScriptRoute" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(2)" pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
                <span> See Script Options </span>
            </button>
        </div>
        <div v-if="showDocumentOptionsBtn" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(3)" pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
                <span> See Document Options </span>
            </button>
        </div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <RouterLink class="mohit-navMenu-mainOpt" to="/gamepad/" @click="(event) => { flashNavOpt(event, '/gamepad'); }" pulse-loop>
                <font-awesome-icon icon="fa-gamepad" />
                <span> Gamepad Controls </span>
            </RouterLink>
        </div>
        <div v-if="isMounted" class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
            <button class="mohit-navMenu-mainOpt" @click="(event) => { onWakeLockButtonClick(event); }" :title="webData.wakeLockTitle" pulse-loop>
                <font-awesome-icon :icon="webData.wakeLockIcon" :flip="webData.wakeLockChangeFresh" />
                <span> {{ webData.wakeLockStatement }} </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt small-features" style="position: relative;">
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
            <button @click="reloadNuxtApp({ force: true })" ref="reload-btn" class="mohit-navMenu-reload-webpage" title="Reload Website">
                <font-awesome-icon icon="fa-rotate-right" :beat="onReloadHover" />
            </button>
        </div>
    </div>
</Transition>

<div v-show="showNavLeftWidgets" class="mohit-navBar-status-icons" ref="navWidgets">
    <button v-if="showUpdateWebsiteWidget" class="mohit-navBar-statusIcon yellow" pulse-loop
        @click="installStore.setUpdateBox(true)"
        title="This Is An Old Version Of My Website. Click Here To Update It.">

        <font-awesome-icon v-if="!installStore.swUpdating" icon="fa-triangle-exclamation" />
        <font-awesome-icon v-else icon="fa-spinner" spin-pulse />
    </button>
    <button v-if="showWakeLockWidget" :title="webData.wakeLockTitle" pulse-loop
        @click="(event) => { onWakeLockButtonClick(event); }"
        class="mohit-navBar-statusIcon wakelock">

        <font-awesome-icon :flip="webData.wakeLockChangeFresh"
            :icon="(webData.wakeLock.isActive ? 'fa-lock' : 'fa-unlock')"
        />
    </button>
    <RouterLink to="/gamepad/" v-if="gamepadStore.gamepadConnected"
        @click="(event) => { flashNavOpt(event, '/gamepad'); }"
        title="A gamepad is currently connected. Click Here to See More."
        class="mohit-navBar-statusIcon" pulse-loop>

        <font-awesome-icon icon="fa-gamepad" />
    </RouterLink>
    <button v-if="resumeStore.queryOutOfSync" :title="RESUME_QUERY_UNSYNC_TITLE"
        @click="() => { reloadNuxtApp({ force: true }); }"
        :style="getColorStyles('var(--blue-one)')"
        class="mohit-navBar-statusIcon" pulse-loop>

        <font-awesome-icon icon="fa-rotate-right" />
    </button>
</div>
<div v-show="showNavRightWidgets" class="mohit-navBar-status-icons right" ref="shareWidget">
    <div v-if="showLoadingDocsWidget" class="mohit-navBar-loadingWidget" title="Loading Document...">
        <font-awesome-icon icon="fa-spinner" spin-pulse />
        <span v-if="(documentStore.docLoaded.totalPages > 1)">
            {{ documentStore.docLoaded.loadedPages + '/' + documentStore.docLoaded.totalPages }}
        </span>
    </div>
    <button :title="SHARE_PAGE_TITLE" @click="webData.openQRCodePopup()" class="mohit-navBar-statusIcon share" pulse-loop>
        <font-awesome-icon v-if="!webData.sharePopupClosing" icon="fa-share-from-square" />
        <font-awesome-icon v-else icon="fa-spinner" spin-pulse />
    </button>
</div>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const { scrollProgress } = storeToRefs(useScrollStore());
const { $pwa } = useNuxtApp();

const webData = useWebsiteDataStore();
const audioStore = useAudioStore();
const scriptsStore = useScriptsStore();
const documentStore = useDocumentStore();
const gamepadStore = useGamepadStore();
const resumeStore = useResumeStore();
const installStore = useInstallStore();

const router = useRouter();
const isMounted = onMountedAdvanced();

const navBar = shallowRef(null);
const navMenu = shallowRef(null);
const navWidgets = shallowRef(null);
const shareWidget = shallowRef(null);

const reloadBtnRef = useTemplateRef('reload-btn');
const onReloadHover = useElementHover(reloadBtnRef);

usePulseLoopAnimation(navBar);
usePulseLoopAnimation(navMenu);
usePulseLoopAnimation(navWidgets);
usePulseLoopAnimation(shareWidget);
useWebsiteMenuUtility(navMenu);

const routePath = computed(() => { return router.currentRoute.value.path; });
const footerRoute = computed(() => { return { path: routePath.value, hash: (webData.webFooterVisibility ? '' :'#footer') } });

const showWakeLockWidget = computed(() => {
    const isActive = webData.wakeLock.isActive;
    return (webData.wakeLock.isSupported && (isActive || (!isActive && webData.wakeLockChangeFresh)));
});

const showDocumentOptionsBtn = computed(() => { return (documentStore.onDocumentRoute && documentStore.currentDocumentBlobCreated); });
const showLoadingDocsWidget = computed(() => { return (!documentStore.docLoaded.status && documentStore.docLoaded.totalPages > 0); });
const showUpdateWebsiteWidget = computed(() => { return (!installStore.showUpdateBox && $pwa?.needRefresh); });

const showNavLeftWidgets = computed(() => { return (import.meta.client && (showWakeLockWidget.value || gamepadStore.gamepadConnected || showUpdateWebsiteWidget.value)); });
const showNavRightWidgets = computed(() => { return (isMounted.value && (webData.menuOpen == -1 || webData.websiteMenuMode == 1)); });

/**
 * This function makes a button flash if it will do nothing.
 * @param event The event made when the user clicks on the navigation option.
 * @param path The route the option leads to.
 */
function flashNavOpt(event = new MouseEvent("click"), path = "/") {
    path = (path.endsWith("/") ? path.slice(0, -1) : path);
    if(routePath.value !== path && routePath.value !== (path + "/")) { return; }
    scrollToTop(false, 0);
    webData.closeNavMenu();
}

/**
 * This function triggers whenever someone clicks on the Wake Lock Button.
 * @param {PointerEvent} event The Click event to draw from.
 */
function onWakeLockButtonClick(event) {
    if(event.ctrlKey) {
        if(routePath.value !== "/wakelock" && routePath.value !== "/wakelock/") {
            router.push("/wakelock/");
        } else {
            flashNavOpt(event, "/wakelock");
        }
    } else {
        webData.toggleWakeLock();
    }
}

const MAIN_BTNS = [
    { path: "/", icon: "fa-house", color: "var(--website-light-text)", title: "Home Page" },
    { path: "/contact/", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me" },
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "My Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "My Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "My Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "My Resume" },
];

const CENTER_LINKS = [
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "Projects" },
    { path: "/resume/", icon: "fa-file-lines", color: "var(--website-text)", title: "Resume" },
];

const NAV_MENU_EXTRAS = [
    { path: "/library/", icon: "fa-book-open-reader", color: "var(--website-light-text)", title: "My Library" },
    { path: "/features/", icon: "fa-bolt-lightning", color: "var(--lightning-yellow)", title: "Website Features" },
    { path: "/copyright/", icon: "fa-copyright", color: "var(--blue-four)", title: "Copyright Statement" },
];

const RESUME_QUERY_UNSYNC_TITLE = "Please reload this page here to apply your changes to customizing my resume.";
</script>