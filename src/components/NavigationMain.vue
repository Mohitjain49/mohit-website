<template>
<div class="web-navBar">
    <div class="web-navBar-links-side" style="justify-content: left;">
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-contact"
            to="/contact"
            :title="CONTACT_TITLE">
            
            <font-awesome-icon icon="fa-paper-plane" />
            <span>Contact Me!</span>
        </RouterLink>
    </div>

    <div v-if="webData.pageView == 0" class="web-navBar-links-section center-flex-display">
        <RouterLink v-for="route in ROUTE_COLLECTION" class="web-navBar-opt" :to="route.path" v-html="route.title" />
        <a class="web-navBar-opt" :href="PERSONAL_GLOBE_LINK"> My Globe </a>
    </div>

    <div class="web-navBar-links-side" style="justify-content: right;">
        <RouterLink to="/resume" class="web-navBar-opt web-navBar-side" :title="RESUME_TITLE">
            <font-awesome-icon icon="fa-file-lines" />
            <span>Resume</span>
        </RouterLink>
        <RouterLink to="/updates" class="web-navBar-opt web-navBar-side" :title="UPDATES_TITLE">
            <font-awesome-icon icon="fa-file-code" />
            <span>Updates</span>
        </RouterLink>
        <div class="web-navBar-opt web-navBar-side web-navBar-list"
            v-if="webData.pageView != 0"
            @click="webData.setNavBarDropdown(0)"
            :title="ROUTE_MENU_TITLE">

            <font-awesome-icon icon="fa-list" />
        </div>
    </div>
</div>

<Transition name="navBarDDTransition">
    <div class="navBar-dropdown" v-if="webData.navBarDropdown == 0">
        <RouterLink class="navBar-dropdown-opt" v-for="route in ROUTE_COLLECTION" :to="route.path">
            <span> {{ route.title }} </span>
        </RouterLink>
        <a :href="PERSONAL_GLOBE_LINK" class="navBar-dropdown-opt">
            <span> My Globe </span>
        </a>
    </div>
</Transition>
</template>

<script setup>
import { PERSONAL_GLOBE_LINK } from "../stores/Objects.js";
import { useWebsiteDataStore } from "../stores/WebsiteData.js";
const webData = useWebsiteDataStore();

const CONTACT_TITLE = "Contact Me!";
const ROUTE_MENU_TITLE = "Route Menu";
const RESUME_TITLE = "See My Resume!";
const UPDATES_TITLE = "Update Logs for My Website.";

const ROUTE_COLLECTION = [
    { path: "/", title: "Home" },
    { path: "/skills", title: "Skills" },
    { path: "/experience", title: "Experience" }
];
</script>

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
    justify-content: space-evenly;
    height: 100%;
}
.web-navBar-links-side {
    display: flex;
    width: 140px;
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

.web-navBar-side {
    height: 100%;
    width: 70px;
    padding: 0px;
    border: none;
    margin-top: 0px;
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.web-navBar-side span {
    font-size: 12px;
}
.web-navBar-side svg {
    margin-top: 7px;
}

.web-navBar-list {
    width: 50px;
}
.web-navBar-list svg {
    margin-top: 0px;
}

.web-navBar-contact {
    width: 120px !important;
    flex-direction: row;
    padding: 0px 7px;
}
.web-navBar-contact span {
    font-size: 16px !important;
    margin-left: 5px;
}
.web-navBar-contact svg {
    margin-top: -4px;
    font-size: 17px;
}

@media (max-width: 825px) {
    .web-navBar-links-side {
        width: fit-content;
    }
    .web-navBar-side {
        width: 50px;
    }
    .web-navBar-side span {
        font-size: 10px;
    }
}
@media (max-width: 340px) {
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
    z-index: 6;
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
}
.navBar-dropdown-opt:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: var(--website-text);
}
.navBar-dropdown-opt span {
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
    transition: var(--default-transition);
    color: var(--website-text);
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
</style>