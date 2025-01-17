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
        <RouterLink v-for="route in ROUTE_COLLECTION"
            class="web-navBar-opt"
            :to="route.path"
            v-html="route.title"
        />
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
            @click="setDropdown(1)"
            :title="ROUTE_MENU_TITLE">

            <font-awesome-icon icon="fa-list" />
        </div>
    </div>
</div>

<Transition name="navBarDDTransition">
    <ColorMenu v-if="webData.navBarDropdown == 0" :globePage="false" />
</Transition>
<Transition name="navBarDDTransition">
    <RouteMenu v-if="webData.navBarDropdown == 1" :globePage="false" />
</Transition>
</template>

<script setup>
import "../styles/sectors/barstyles.css";
import ColorMenu from "./menus/ColorMenu.vue";
import RouteMenu from "./menus/RouteMenu.vue";
import { useWebsiteDataStore } from "../stores/WebsiteData.js";

const webData = useWebsiteDataStore();
const CONTACT_TITLE = "Contact Me!";
const ROUTE_MENU_TITLE = "Route Menu";
const RESUME_TITLE = "See My Resume!";
const UPDATES_TITLE = "Update Logs for My Website."

/**
 * This sets which dropdown is open.
 * @param {Number} newIndex The index of the dropdown to set.
 */
const setDropdown = (newIndex = -1) => {
    webData.setNavBarDropdown(newIndex);
}

const ROUTE_COLLECTION = [
    { path: "/", title: "Home" },
    { path: "/skills", title: "Skills" },
    { path: "/experience", title: "Experience" },
    { path: "/globe", title: "My Globe" }
]
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
    width: 160px;
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
.web-navBar-list span {
    margin-top: 0px;
}

.web-navBar-contact {
    width: fit-content;
    flex-direction: row;
    padding: 0px 7px;
}
.web-navBar-contact span {
    font-size: 16px;
    margin-left: 5px;
}
.web-navBar-contact svg {
    margin-top: -4px;
    font-size: 17px;
}

@media (max-width: 340px) {
    .web-navBar {
        position: absolute;
    }
}
</style>