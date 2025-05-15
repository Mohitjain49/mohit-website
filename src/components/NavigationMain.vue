<template>
<div id="mohit-navBar" :class="(webData.navMenuOpen ? 'widen' : '')">
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
            <RouterLink v-for="btn in MOBILE_MAIN_BTNS" :to="btn.path"
                @click="(event) => { flashNavOpt(event, btn.path) }"
                :title="btn.title"
                class="mohit-navBar-icon"
                :style="getColorStyles('var(--website-light-text)')"
                @mouseenter="setPulseLoopAnimation"
                @mouseleave="setPulseLoopAnimation">

                <font-awesome-icon :icon="btn.icon" />
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
            <div v-for="(btn, index) in MAIN_BTNS" class="mohit-navMenu-opt" :style="getColorStyles(btn.color)">
                <RouterLink class="mohit-navMenu-mainOpt" :to="btn.path" @click="(event) => { flashNavOpt(event, btn.path) }">
                    <font-awesome-icon :icon="btn.icon" />
                    <span> {{ btn.title }} </span>
                </RouterLink>
            </div>

            <div class="mohit-navMenu-opt">
                <RouterLink to="/qrcode" class="mohit-navMenu-extra" title="QR Codes">
                    <font-awesome-icon icon="fa-qrcode" />
                </RouterLink>
                <button class="mohit-navMenu-extra" @click="webData.toggleWakeLock()" :title="wakeLockStatement">
                    <font-awesome-icon :icon="((webData.wakeLock == null) ? 'fa-lock' : 'fa-unlock')" />
                </button>
                <RouterLink to="/icons" class="mohit-navMenu-extra icons" title="My Icons">
                    <font-awesome-icon icon="fa-pen-fancy" />
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

const wakeLockStatement = computed(() => {
    return (((webData.wakeLock == null) ? "Set" : "Release") + " Screen Wake Lock");
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
    { path: "/skills/", icon: "fa-code", color: "var(--blue-three)", title: "See My Skills" },
    { path: "/experience/", icon: "fa-file-code", color: "var(--website-text)", title: "See My Experience" },
    { path: "/projects/", icon: "fa-cubes", color: "var(--globe-green-opaque)", title: "See My Projects" },
];

const MOBILE_MAIN_BTNS = [
    { path: "/", icon: "fa-house", title: "Home Page" },
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
    width: 200px;
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
    height: 427px;
    overflow: hidden;
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
    height: 40px;
    width: 40px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--website-light-text);
    border-radius: 15px;
    transition: var(--default-transition);
    background-color: rgb(20, 20, 20);
    color: var(--website-light-text);
    margin: 0px 10px;
}
.mohit-navMenu-extra:hover {
    background-color: rgb(40, 40, 40);
}

.mohit-navMenu-extra.icons {
    color: var(--blue-zero);
    border-color: var(--blue-zero);
}

.navMenu-transition-enter-active, .navMenu-transition-leave-active {
    transition: height 0.5s;
}
.navMenu-transition-enter-from, .navMenu-transition-leave-to {
    height: 0;
}
.navMenu-transition-enter-to, .navMenu-transition-leave-from {
    height: 427px;
}

@media (max-width: 825px) {
    #mohit-navBar {
        width: calc(100% - 120px);
        left: 60px;
    }
}
@media (max-width: 600px) {
    .mohit-navBar-icons {
        width: 90px;
    }
}

@media (max-width: 450px) {
    #mohit-navBar {
        width: calc(100% - 80px);
        left: 40px;
    }
    #mohit-navBar.widen {
        width: calc(100% - 30px);
        left: 15px;
    }
}
@media (max-width: 350px) {
    #mohit-navBar {
        position: absolute;
    }
}
</style>