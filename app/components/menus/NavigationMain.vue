<template>
<nav id="mohit-navBar" ref="navBar">
    <Transition name="fade-exit-transition" fade>
        <div class="mohit-main-progressBar" v-if="scrollProgress.show">
            <div class="inner" :style="('width:' + scrollProgress.pct + '%')"></div>
        </div>
    </Transition>

    <div class="mohit-navBar-top">
        <div class="mohit-navBar-icons left">
            <RouterLink to="/" :class="['mohit-navBar-banner', (currentPathEquals('/') ? 'focused' : '')]" title="Home Page" v-pulse-loop>
                <img :src="mkj_text" draggable="false" />
            </RouterLink>
        </div>

        <div class="mohit-navBar-mainLinks">
            <RouterLink v-for="link in CENTER_LINKS" :to="link.path" :class="getNavBarCenterAnchorClasses(link.extraClass, link.path)" v-pulse-loop>
                <span> {{ link.title }} </span>
            </RouterLink>
        </div>

        <div class="mohit-navBar-icons right">
            <RouterLink to="/contact/" :class="['mohit-navBar-icon', (currentPathEquals('/contact/') ? 'focused' : '')]" title="Contact Me!" v-pulse-loop>
                <font-awesome-icon icon="fa-paper-plane" />
            </RouterLink>
            <button v-if="webData.compassMenuAvailable"
                class="mohit-navBar-icon light"
                :title="(webData.compassMenuOpen ? 'Close Compass Menu' : 'Navigate This Page')"
                @click="webData.setMenuOpen(COMPASS_MENU, true)" v-pulse-loop>

                <font-awesome-icon icon="fa-compass" />
            </button>
            <button v-else-if="showScriptOptionsBtn"
                class="mohit-navBar-icon light"
                :title="(webData.scriptsMenuOpen ? 'Close Script Options' : 'See Script Options')"
                @click="webData.setMenuOpen(SCRIPTS_MENU, true)" v-pulse-loop>

                <font-awesome-icon icon="fa-file-export" />
            </button>
            <button v-else-if="showDocumentOptionsBtn"
                class="mohit-navBar-icon light"
                :title="(webData.documentMenuOpen ? 'Close Document Options' : 'See Document Options')"
                @click="webData.setMenuOpen(DOCUMENT_MENU, true)" v-pulse-loop>

                <font-awesome-icon icon="fa-file-pdf" />
            </button>
            <button class="mohit-navBar-icon light"
                :title="((webData.navMenuOpen ? 'Close ' : '') + 'Navigation Menu')"
                @click="webData.setMenuOpen(NAVIGATION_MENU, true)"v-pulse-loop>

                <font-awesome-icon icon="fa-bars" />
            </button>
        </div>
    </div>
</nav>

<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.navMenuOpen" class="mohit-navMenu" id="mohit-navMenu" ref="navMenu">
        <MenuTop />

        <div v-for="btn in MAIN_BTNS" :style="getColorStyles(btn.color)" class="mohit-navMenu-opt">
            <RouterLink :class="getNavMenuAnchorClasses(btn.path)" :to="btn.path" v-pulse-loop>
                <font-awesome-icon :icon="btn.icon" />
                <span> {{ btn.title }} </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div v-for="btn in NAV_MENU_EXTRAS" :style="getColorStyles(btn.color)" class="mohit-navMenu-opt">
            <RouterLink :class="getNavMenuAnchorClasses(btn.path)" :to="btn.path" v-pulse-loop>
                <font-awesome-icon :icon="btn.icon" />
                <span> {{ btn.title }} </span>
            </RouterLink>
        </div>
        <div v-if="webData.navFooterPresent" class="mohit-navMenu-opt">
            <RouterLink class="mohit-navMenu-mainOpt" :to="footerRoute" @click="webData.scrollToAndFromFooter()" v-pulse-loop>
                <font-awesome-icon :icon="(webData.webFooterVisibility ? 'fa-turn-up' : 'fa-book-open')" />
                <span> {{ (webData.webFooterVisibility ? 'Scroll To The Top' : 'See Webpages') }} </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div v-if="webData.compassMenuAvailable" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(COMPASS_MENU)" v-pulse-loop>
                <font-awesome-icon icon="fa-compass" />
                <span> Navigate This Page </span>
            </button>
        </div>
        <div v-if="showScriptOptionsBtn" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(SCRIPTS_MENU)" v-pulse-loop>
                <font-awesome-icon icon="fa-file-export" />
                <span> See Script Options </span>
            </button>
        </div>
        <div v-if="showDocumentOptionsBtn" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(DOCUMENT_MENU)" v-pulse-loop>
                <font-awesome-icon icon="fa-file-pdf" />
                <span> See Document Options </span>
            </button>
        </div>

        <div v-if="isMounted" class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
            <button class="mohit-navMenu-mainOpt"
                @click="(event) => { webData.onWakeLockButtonClick(event); }"
                :title="webData.wakeLockTitle" v-pulse-loop>

                <font-awesome-icon :icon="webData.wakeLockIcon" :flip="webData.wakeLockChangeFresh" />
                <span> {{ webData.wakeLockStatement }} </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt small-features" style="position: relative;">
            <div class="mohit-navMenu-volume-meter">
                <button @click="audioStore.setAudioMuted('toggle')" :title="audioStore.volumeInputTitle" v-pulse-loop>
                    <FontAwesomeIcon :icon="audioStore.volumeInputIcon" />
                </button>
                <input type="range" min="0" max="100" title="Volume Meter for the click sound."
                    v-model="audioStore.volumeInput"
                    @input="audioStore.changeAudioVolume()"
                />
                <span> {{ (audioStore.volumeInput + '%') }} </span>
            </div>
            <button @click="reloadNuxtApp({ force: true })" ref="reload-btn" class="mohit-navMenu-reload-webpage" title="Reload Website">
                <font-awesome-icon icon="fa-rotate-right" :jello="onReloadHover" />
            </button>
        </div>
    </div>
</Transition>

<div v-show="showNavLeftWidgets" class="mohit-navBar-status-icons" ref="navWidgets">
    <button v-if="showUpdateWebsiteWidget" @click="openUpdateBox()" v-pulse-loop
        :class="['mohit-navBar-statusIcon', 'yellow', (installStore.updateNeeded ? '' : 'noAction')]"
        :title="(installStore.swUpdating ? 'Updating Website...' : 'This Is An Old Version Of My Website. Click Here To Update It.')">

        <font-awesome-icon v-if="!installStore.swUpdating" icon="fa-triangle-exclamation" />
        <font-awesome-icon v-else icon="fa-spinner" spin-pulse />
    </button>
    <button v-if="showWakeLockWidget" :title="webData.wakeLockTitle" v-pulse-loop
        @click="(event) => { webData.onWakeLockButtonClick(event); }"
        class="mohit-navBar-statusIcon wakelock">

        <font-awesome-icon :flip="webData.wakeLockChangeFresh"
            :icon="(webData.wakeLock.isActive ? 'fa-lock' : 'fa-unlock')"
        />
    </button>
    <button v-if="resumeStore.queryOutOfSync" :title="RESUME_QUERY_UNSYNC_TITLE"
        @click="() => { reloadNuxtApp({ force: true }); }"
        class="mohit-navBar-statusIcon resume-unsynced" v-pulse-loop>

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
    <button v-if="showCopyLinkButton" @click="copyWebpageLink()"
        class="mohit-navBar-statusIcon share yellow"
        :title="(COPY_STATUS_TITLE[copyStatus] ?? 'Copy Webpage Link')"
        v-action-cursor="copyStatus" v-pulse-loop>

        <FontAwesomeActionIcon :baseIcon="'fa-link'" :status="copyStatus" />
    </button>
    <button :title="SHARE_PAGE_TITLE" @click="webData.openQRCodePopup()" class="mohit-navBar-statusIcon share" v-pulse-loop>
        <font-awesome-icon v-if="!webData.sharePopupClosing" icon="fa-share-from-square" />
        <font-awesome-icon v-else icon="fa-spinner" spin-pulse />
    </button>
</div>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const { scrollProgress } = storeToRefs(useScrollStore());

const webData = useWebsiteDataStore();
const audioStore = useAudioStore();
const scriptsStore = useScriptsStore();
const documentStore = useDocumentStore();
const resumeStore = useResumeStore();
const installStore = useInstallStore();

const router = useRouter();
const isMounted = onMountedAdvanced();
const copyStatus = shallowRef(0);

const navMenu = shallowRef(null);
useWebsiteMenuUtility(navMenu);

const reloadBtnRef = useTemplateRef('reload-btn');
const onReloadHover = useElementHover(reloadBtnRef);

const topPath = useRoutePathWithQuery();
const routePath = computed(() => { return router.currentRoute.value.path; });
const footerRoute = computed(() => { return (topPath.value + (webData.webFooterVisibility ? '' :'#footer')); });

const showWakeLockWidget = computed(() => {
    const isActive = webData.wakeLock.isActive;
    return (webData.wakeLock.isSupported && (isActive || (!isActive && webData.wakeLockChangeFresh)));
});

const showDocumentOptionsBtn = computed(() => { return (documentStore.onDocumentRoute && documentStore.currentDocumentBlobCreated); });
const showScriptOptionsBtn = computed(() => { return (scriptsStore.onScriptRoute && scriptsStore.scriptBlobCreated); });
const showLoadingDocsWidget = computed(() => { return (!documentStore.docLoaded.status && documentStore.docLoaded.totalPages > 0); });
const showUpdateWebsiteWidget = computed(() => { return (!installStore.showUpdateBox && (installStore.updateNeeded || installStore.swUpdating)); });
const showCopyLinkButton = computed(() => { return (webData.compassMenuAvailable || showDocumentOptionsBtn.value || showScriptOptionsBtn.value); });

const showNavLeftWidgets = computed(() => {
    return (isMounted.value && (showWakeLockWidget.value || showUpdateWebsiteWidget.value || resumeStore.queryOutOfSync));
});
const showNavRightWidgets = computed(() => { return (isMounted.value && (webData.noMenuOpen || webData.websiteMenuMode == 1)); });

/** This is a reactive function that can be used to check if a string equals the curent router path. */
const currentPathEquals = computed(() => { return (path = "") => {
    return (path === routePath.value || path.substring(0, (path.length - 1)) === routePath.value);
}});

/** This opens the update box only if an update is needed. */
function openUpdateBox() { if(installStore.updateNeeded) { installStore.setUpdateBox(true); }}

/** This function lets users copy the webpage link  */
async function copyWebpageLink() {
    if(copyStatus.value != 0) { return; }
    copyStatus.value = 1;

    try {
        const url = new URL(router.currentRoute.value.fullPath.substring(1), PERSONAL_WEBSITE_LINK)
        await navigator.clipboard.writeText(PERSONAL_WEBSITE_LINK + url.pathname.substring(1) + url.search + url.hash);
        copyStatus.value = 2;
    } catch(e) {
        copyStatus.value = 3;
    } finally {
        setTimeout(() => { copyStatus.value = 0; }, 3000); 
    }
}

/**
 * This function gets the classes for a navigation menu anchor element.
 * @param {String} path The path for said anchor element.
 */
function getNavMenuAnchorClasses(path = "/") {
    return ['mohit-navMenu-mainOpt', (currentPathEquals.value(path) ? 'focused' : '')];
}

/**
 * This function gets the classes for a navigation menu anchor element.
 * @param {String} extraClass an extra class for the element.
 * @param {String} path The path for said anchor element.
 */
function getNavBarCenterAnchorClasses(extraClass = "", path = "/") {
    return ['mohit-navBar-link', extraClass, (currentPathEquals.value(path) ? 'focused' : '')];
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
    { path: "/skills/", icon: "fa-code", extraClass: "skills", title: "Skills" },
    { path: "/experience/", icon: "fa-file-code", extraClass: "", title: "Experience" },
    { path: "/projects/", icon: "fa-cubes", extraClass: "projects", title: "Projects" },
    { path: "/resume/", icon: "fa-file-lines", extraClass: "", title: "Resume" },
];

const NAV_MENU_EXTRAS = [
    { path: "/library/", icon: "fa-book-open-reader", color: "var(--website-light-text)", title: "My Library" },
    { path: "/features/", icon: "fa-bolt-lightning", color: "var(--lightning-yellow)", title: "Website Features" },
    { path: "/copyright/", icon: "fa-copyright", color: "var(--blue-four)", title: "Copyright Notice" },
];

const RESUME_QUERY_UNSYNC_TITLE = "Please reload this page here to apply your changes to customizing my resume.";
const COPY_STATUS_TITLE = ["Copy Webpage Link", "Copying Link...", "Link Copied!", "Error Copying Webpage Link."]
</script>