<script setup>
import { PERSONAL_GLOBE_LINK } from "../stores/Objects.js";
import { useWebsiteDataStore } from "../stores/WebsiteData.js";
import { useRoute } from "vue-router";

const webData = useWebsiteDataStore();
const route = useRoute();

/**
 * This function, given a route, will scroll to the top of the page if they click on the same route.
 */
function scrollToTop(event, navRoute = "/") {
    if((navRoute != route.path) && ((navRoute + "/") != route.path)) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    webData.addFlashAnimation(event);
}

const CONTACT_TITLE = "Contact Me!";
const ROUTE_MENU_TITLE = "Navigation Menu";
const RESUME_TITLE = "See My Resume!";
</script>

<template>
<div class="web-navBar">
    <div class="web-navBar-links-side">
        <RouterLink to="/contact" class="web-navBar-largeSide" :title="CONTACT_TITLE"
            @click="(event) => { scrollToTop(event, '/contact') }">

            <client-only> <font-awesome-icon icon="fa-paper-plane" /> </client-only>
            <span>Contact Me!</span>
        </RouterLink>
    </div>

    <div v-if="webData.pageView == 0" class="web-navBar-links-section">
        <RouterLink class="web-navBar-opt" to="/" @click="(event) => { scrollToTop(event, '/') }"> Home </RouterLink>
        <RouterLink class="web-navBar-opt skills" to="/skills/" @click="(event) => { scrollToTop(event, '/skills') }"> Skills </RouterLink>
        <RouterLink class="web-navBar-opt" to="/experience/" @click="(event) => { scrollToTop(event, '/experience') }"> Experience </RouterLink>
        <a class="web-navBar-opt globe" :href="PERSONAL_GLOBE_LINK"> My Globe </a>
    </div>

    <div class="web-navBar-links-side" >
        <template v-if="webData.pageView == 0">
            <RouterLink class="web-navBar-largeSide" to="/resume" :title="RESUME_TITLE"
                @click="(event) => { scrollToTop(event, '/resume') }">

                <client-only> <font-awesome-icon icon="fa-file-lines" /> </client-only>
                <span>My Resume</span>
            </RouterLink>
        </template>

        <template v-if="webData.pageView != 0">
            <client-only>
                <RouterLink class="web-navBar-menuIcon" to="/resume" :title="RESUME_TITLE"
                    @click="(event) => { scrollToTop(event, '/resume') }">

                    <client-only> <font-awesome-icon icon="fa-file-lines" /> </client-only>
                </RouterLink>
                <div class="web-navBar-menuIcon" @click="webData.setNavBarDropdown(0)" :title="ROUTE_MENU_TITLE">
                    <client-only> <font-awesome-icon icon="fa-bars" /> </client-only>
                </div>
            </client-only>
        </template>
    </div>
</div>

<Transition name="navBarDDTransition">
    <div class="navBar-dropdown" v-if="webData.navBarDropdown == 0">
        <RouterLink class="navBar-dropdown-opt" to="/" @click="(event) => { scrollToTop(event, '/') }">
            <span> Home </span>
        </RouterLink>
        <RouterLink class="navBar-dropdown-opt skills" to="/skills/" @click="(event) => { scrollToTop(event, '/skills') }">
            <span> Skills </span>
        </RouterLink>
        <RouterLink class="navBar-dropdown-opt" to="/experience/" @click="(event) => { scrollToTop(event, '/experience') }">
            <span> Experience </span>
        </RouterLink>
        <a :href="PERSONAL_GLOBE_LINK" class="navBar-dropdown-opt globe">
            <span> My Globe </span>
        </a>
    </div>
</Transition>
</template>

<style scoped>
.web-navBar {
    position: fixed;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    background: var(--nav-bar-background);
    border-bottom: 1px solid var(--nav-bar-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
}

.web-navBar-links-section {
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
}
.web-navBar-links-side {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
}

.web-navBar-opt {
    cursor: pointer;
    text-decoration: none;
    color: var(--website-text);
    font-size: 18px;
    font-weight: bold;
    margin-top: 2px;
    padding: 5px;
    border-radius: 5px;
    border-bottom: var(--empty-border);
    transition: var(--default-transition);
    font-family: 'Lexend', sans-serif;
}
.web-navBar-opt:hover {
    border-color: var(--website-text);
    background-color: var(--translucent-background);
}

.web-navBar-largeSide {
    height: fit-content;
    width: fit-content;
    margin-top: 1px;
    padding: 7px 9px;
    border-radius: 10px;
    border: 2px dashed var(--website-text);
    border-style: dotted;
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    transition: var(--default-transition);
}
.web-navBar-largeSide:hover {
    background-color: black;
    color: var(--website-light-text);
}

.web-navBar-largeSide svg {
    margin-top: -4px;
    font-size: 17px;
}
.web-navBar-largeSide span {
    font-size: 16px;
    margin-left: 5px;
}

.web-navBar-menuIcon {
    cursor: pointer;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    padding: 5px;
    border-radius: 10px;
    border: 2px dashed var(--website-text);
    border-style: dotted;
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--website-text);
    font-size: 22px;
    transition: var(--default-transition);
}
.web-navBar-menuIcon:hover {
    background-color: black;
    color: var(--website-light-text);
}

.web-navBar-opt.skills {
    color: var(--blue-three);
}
.web-navBar-opt.skills:hover {
    border-color: var(--blue-three);
}

.web-navBar-opt.globe {
    color: var(--globe-green-opaque);
}
.web-navBar-opt.globe:hover {
    border-color: var(--globe-green-opaque);
}

@media (max-width: 825px) {
    .web-navBar-links-side {
        width: fit-content;
        min-width: 100px;
        justify-content: space-evenly;
    }
    .web-navBar-largeSide {
        margin: 0px 5px;
        margin-top: 1px;
    }
}
@media (max-width: 360px) {
    .web-navBar {
        position: absolute;
    }
}

/**
 * These styles are for the route menu.
 */

.navBar-dropdown {
    position: fixed;
    right: 0;
    top: 50px;
    height: 200px;
    width: 300px;
    z-index: 15;
    overflow: hidden;
    border-bottom: 1px solid var(--nav-bar-border);
    border-left: 1px solid var(--nav-bar-border);
    background: var(--webpage-background);
}

.navBar-dropdown-opt {
    cursor: pointer;
    height: 48px;
    width: calc(100% - 2px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--thin-empty-border);
    transition: var(--default-transition);
    text-align: left;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
    color: var(--website-text);
}
.navBar-dropdown-opt:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: var(--website-text);
}

.navBar-dropdown-opt.skills {
    color: var(--blue-three);
}
.navBar-dropdown-opt.skills:hover {
    border-color: var(--blue-three);
}

.navBar-dropdown-opt.globe {
    color: var(--globe-green-opaque);
}
.navBar-dropdown-opt.globe:hover {
    border-color: var(--globe-green-opaque);
}

.navBarDDTransition-enter-active, .navBarDDTransition-leave-active {
    transition: height 0.5s, opacity 0.5s;
}
.navBarDDTransition-enter-from, .navBarDDTransition-leave-to {
    opacity: 0;
    height: 0;
}
.navBarDDTransition-enter-to, .navBarDDTransition-leave-from {
    opacity: 1;
    height: 200px;
}

@media (max-width: 360px) {
    .navBar-dropdown {
        position: absolute;
    }
}
</style>