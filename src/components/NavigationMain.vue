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

const HOME_TITLE = "Home Page";
const SKILLS_TITLE = "My Skills";
const EXP_TITLE = "My Experience";
const GLOBE_TITLE = "My Globe";

const CONTACT_TITLE = "Contact Me!";
const RESUME_TITLE = "See My Resume!";
</script>

<template>
<div class="web-navBar">
    <template v-if="webData.pageView == 0">
        <div class="web-navBar-links-side">
            <RouterLink to="/contact" class="web-navBar-largeSide" :title="CONTACT_TITLE"
                @click="(event) => { scrollToTop(event, '/contact') }">

                <client-only> <font-awesome-icon icon="fa-paper-plane" /> </client-only>
                <span>Contact Me!</span>
            </RouterLink>
        </div>

        <div class="web-navBar-links-section">
            <RouterLink class="web-navBar-opt" to="/" @click="(event) => { scrollToTop(event, '/') }"> Home </RouterLink>
            <RouterLink class="web-navBar-opt skills" to="/skills/" @click="(event) => { scrollToTop(event, '/skills') }"> Skills </RouterLink>
            <RouterLink class="web-navBar-opt" to="/experience/" @click="(event) => { scrollToTop(event, '/experience') }"> Experience </RouterLink>
            <a class="web-navBar-opt globe" :href="PERSONAL_GLOBE_LINK"> My Globe </a>
        </div>

        <div class="web-navBar-links-side" >
            <RouterLink class="web-navBar-largeSide" to="/resume" :title="RESUME_TITLE"
                @click="(event) => { scrollToTop(event, '/resume') }">

                <client-only> <font-awesome-icon icon="fa-file-lines" /> </client-only>
                <span>My Resume</span>
            </RouterLink>
        </div>
    </template>

    <div class="web-navBar-mobile" v-if="webData.pageView != 0">
        <RouterLink class="web-navBar-menuIcon inverse" to="/contact" :title="CONTACT_TITLE"
            @click="(event) => { scrollToTop(event, '/contact') }">

            <client-only> <font-awesome-icon icon="fa-paper-plane" /> </client-only>
        </RouterLink>
        <RouterLink class="web-navBar-menuIcon skills" to="/skills/" :title="SKILLS_TITLE"
            @click="(event) => { scrollToTop(event, '/skills') }">

            <client-only> <font-awesome-icon icon="fa-code" /> </client-only>
        </RouterLink>

        <RouterLink class="web-navBar-menuIcon" to="/" :title="HOME_TITLE"
            @click="(event) => { scrollToTop(event, '/') }">

            <client-only> <font-awesome-icon icon="fa-house" /> </client-only>
        </RouterLink>
        <RouterLink class="web-navBar-menuIcon" to="/experience/" :title="EXP_TITLE"
            @click="(event) => { scrollToTop(event, '/experience') }">

            <client-only> <font-awesome-icon icon="fa-file-code" /> </client-only>
        </RouterLink>

        <a :href="PERSONAL_GLOBE_LINK" class="web-navBar-menuIcon globe" :title="GLOBE_TITLE">
            <client-only> <font-awesome-icon icon="fa-globe" /> </client-only>
        </a>
        <RouterLink class="web-navBar-menuIcon inverse" to="/resume" :title="RESUME_TITLE"
            @click="(event) => { scrollToTop(event, '/resume') }">

            <client-only> <font-awesome-icon icon="fa-file-lines" /> </client-only>
        </RouterLink>
    </div>
</div>
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

.web-navBar-mobile {
    width: 350px;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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
    background-color: rgba(255, 255, 255, 0.125);
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

.web-navBar-menuIcon.inverse {
    color: var(--website-dark-text);
    border-color: var(--website-dark-text);
    background-color: rgba(255, 255, 255, 0.5);
}
.web-navBar-menuIcon.inverse:hover {
    background-color: black;
    color: var(--website-light-text);
    border-color: var(--website-light-text);
}

.web-navBar-menuIcon.skills {
    color: var(--blue-three);
    border-color: var(--blue-three);
    background-color: rgba(255, 255, 255, 0.25);
}
.web-navBar-menuIcon.skills:hover {
    background-color: var(--blue-zero);
    color: var(--blue-cobalt);
    border-color: var(--blue-cobalt);
}

.web-navBar-menuIcon.globe {
    color: var(--globe-green-opaque);
    border-color: var(--globe-green-opaque);
    background-color: rgba(255, 255, 255, 0.25);
}
.web-navBar-menuIcon.globe:hover {
    background-color: var(--dark-background);
    color: var(--globe-green-opaque);
    border-color: var(--globe-green-opaque);
}

@media (max-width: 825px) {
    .web-navBar {
        justify-content: center;
    }
}
@media (max-width: 360px) {
    .web-navBar {
        position: absolute;
    }
}
</style>