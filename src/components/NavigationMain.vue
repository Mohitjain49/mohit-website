<template>
<div id="mohit-navBar" :class="(webData.navMenuOpen ? 'menu-open' : '')">
    <div class="mohit-navBar-top">
        <RouterLink to="/" class="mohit-navBar-banner" @click="(event) => { flashNavOpt(event, '/') }">
            <img :src="mkj_text" draggable="false" />
        </RouterLink>

        <div v-if="webData.pageView != 2" class="mohit-navBar-icons">
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
                :title="(!webData.navMenuOpen ? 'Open Navigation Menu' : 'Close Navigation Menu')"
                :style="getColorStyles('var(--website-light-text)')"
                @mouseenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="((webData.navMenuOpen) ? 'fa-square-xmark' : 'fa-bars')" />
            </button>
        </div>

        <div v-if="webData.pageView == 2" class="mohit-navBar-icons">
            <RouterLink to="/" class="mohit-navBar-icon" title="Home Page"
                @click="(event) => { flashNavOpt(event, '/') }"
                :style="getColorStyles('var(--website-light-text)')"
                @mouseenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon icon="fa-house" />
            </RouterLink>
            <button class="mohit-navBar-icon" @click="webData.toggleNavMenu()"
                :title="(!webData.navMenuOpen ? 'Open Navigation Menu' : 'Close Navigation Menu')"
                @mouseenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="((webData.navMenuOpen) ? 'fa-square-xmark' : 'fa-bars')" />
            </button>
        </div>
    </div>

    <Transition name="navMenu-transition">
        <div v-if="webData.navMenuOpen" class="mohit-navMenu">
            <div v-for="btn in MAIN_BTNS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
                <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }">
                    <font-awesome-icon :icon="btn.icon" />
                    <span> {{ btn.title }} </span>
                </RouterLink>
            </div>

            <div class="mohit-navMenu-opt">
                <button class="mohit-navMenu-extra lock" @click="webData.toggleWakeLock()" :title="webData.wakeLockStatement">
                    <font-awesome-icon :icon="webData.wakeLockIcon" />
                </button>
                <RouterLink to="/install" title="Install Website as PWA"
                    class="mohit-navMenu-extra website-text"
                    @click="(event) => { flashNavOpt(event, '/install') }">

                    <client-only> <font-awesome-icon icon="fa-download" /> </client-only>
                </RouterLink>
                <a :href="PERSONAL_WEBSITE_REPOSITORY_LINK" target="mohit-repo"
                    class="mohit-navMenu-extra"
                    :style="getColorStyles('white')"
                    title="Website Repository">

                    <font-awesome-icon icon="fa-code-branch" />
                </a>
                <a :href="PERSONAL_WEBSITE_CODE_SANDBOX" target="mohit-repo"
                    class="mohit-navMenu-extra"
                    :style="getColorStyles('var(--lightning-yellow)')"
                    title="Code Sandbox">
                    
                    <font-awesome-icon icon="fa-square-pen" />
                </a>
            </div>
            <div class="mohit-navMenu-opt">
                <RouterLink v-for="extra in NAV_MENU_EXTRAS" :to="extra.path"
                    :title="extra.title"
                    class="mohit-navMenu-extra"
                    @click="(event) => { flashNavOpt(event, extra.path) }"
                    :style="getColorStyles(extra.color)">

                    <client-only> <font-awesome-icon :icon="extra.icon" /> </client-only>
                </RouterLink>
            </div>
        </div>
    </Transition>
</div>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Transparent.png";
const webData = useWebsiteDataStore();
const route = useRoute();

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
    
    if(route.path !== path && route.path !== (path + "/")) { return; }
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
    { path: "/resume", icon: "fa-file-lines", color: "var(--website-text)", title: "See My Resume" },
];

const LAPTOP_MAIN_BTNS = [
    { path: "/contact", icon: "fa-paper-plane", color: "var(--website-text)", title: "Contact Me!" },
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "See My Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "See My Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "See My Projects" },
];

const NAV_MENU_EXTRAS = [
    { path: "/qrcode", icon: "fa-qrcode", color: "var(--website-light-text)", title: "QR Codes" },
    { path: "/icons", icon: "fa-pen-fancy", color: "var(--blue-one)", title: "My Icons" },
    { path: "/copyright", icon: "fa-copyright", color: "var(--blue-four)", title: "Copyright" },
    { path: FCS_CERTIFICATE_ROUTE, icon: "fa-school-flag", color: "var(--fulton-green)", title: "FCS Certificate" },
];
</script>

<style scoped>
#mohit-navBar {
    position: fixed;
    top: 8px;
    left: calc((100% - 695px) / 2);
    width: 695px;
    height: fit-content;
    min-height: 50px;
    background-color: black;
    z-index: 515;
    border: 2px solid var(--website-text);
    border-radius: 15px;
    overflow: hidden;
    transition: height 0.2s;
}
 #mohit-navBar.menu-open {
    border-bottom-right-radius: 0px;
}

.mohit-navBar-top {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
.mohit-navBar-banner {
    width: 100px;
    height: 46px;
    padding-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition);
    border: var(--empty-border);
    border-radius: 14px;
}

.mohit-navBar-banner img {
    user-select: none;
    width: 80px;
}
.mohit-navBar-banner:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: var(--blue-one);
}

.mohit-navBar-icons {
    width: 250px;
    padding-right: 7px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.mohit-navBar-icon {
    cursor: pointer;
    width: 38px;
    height: 38px;
    color: var(--website-text);
    border: 1px solid var(--website-text);
    border-radius: 10px;
    font-size: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition);
}
.mohit-navBar-icon:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.mohit-navMenu {
    width: 100%;
    height: 480px;
    max-height: calc(100vh - 70px);
    overflow-x: hidden;
    overflow-y: auto;
}
.mohit-navMenu-opt {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-size: 18px;
}

.mohit-navMenu-mainOpt {
    cursor: pointer;
    background-color: rgba(20, 20, 20);
    height: 40px;
    width: calc(100% - 50px);
    padding: 0px 10px;
    color: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 2px dashed;
    border-radius: 15px;
    transition: var(--default-transition);
    user-select: none;
}
.mohit-navMenu-mainOpt:hover {
    background-color: rgba(40, 40, 40);
}
.mohit-navMenu-mainOpt svg {
    margin-right: 10px;
    width: 25px;
}

.mohit-navMenu-extra {
    height: 35px;
    width: 35px;
    font-size: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--website-light-text);
    border-radius: 15px;
    transition: var(--default-transition);
    background-color: rgb(20, 20, 20);
    color: var(--website-light-text);
    margin: 0px 6px;
}
.mohit-navMenu-extra:hover {
    background-color: rgb(40, 40, 40);
}

.mohit-navMenu-extra.website-text {
    color: var(--website-text);
    border-color: var(--website-text);
}
.mohit-navMenu-extra.lock {
    color: var(--vibrant-flame);
    border-color: var(--vibrant-flame);
}
.mohit-navMenu-extra.repo {
    color: white;
    border-color: white;
}

.navMenu-transition-enter-active, .navMenu-transition-leave-active {
    transition: height 0.5s;
}
.navMenu-transition-enter-from, .navMenu-transition-leave-to {
    height: 0;
    overflow-y: hidden;
}
.navMenu-transition-enter-to, .navMenu-transition-leave-from {
    height: 480px;
    max-height: calc(100vh - 70px);
    overflow-y: hidden;
}

@media (max-width: 825px) {
    #mohit-navBar {
        width: calc(100% - 120px);
        left: 60px;
    }
}
@media (max-width: 600px) { #mohit-navBar.menu-open {
        width: calc(100% - 30px);
        left: 15px;
    }
    .mohit-navBar-icons {
        width: 90px;
    }
}

@media (max-width: 450px) {
    #mohit-navBar {
        width: calc(100% - 80px);
        left: 40px;
    }
   
}
@media (max-width: 350px) {
    #mohit-navBar {
        position: absolute;
    }
}

.mohit-navMenu::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 30px;
    background: transparent;
}
.mohit-navMenu::-webkit-scrollbar-thumb {
    background-color: var(--blue-three);
    border-radius: 30px;
    transition: background-color 0.2s;
}
.mohit-navMenu::-webkit-scrollbar-thumb:hover {
    background-color: var(--blue-cobalt);
}
.mohit-navMenu::-webkit-scrollbar-button {
    display: none;
}
</style>