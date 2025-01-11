<template>
<div class="web-navBar">
    <div class="web-navBar-links-side" style="justify-content: left;">
        <div class="web-navBar-opt web-navBar-side web-navBar-color-section center-flex-display"
            @click="setDropdown(0)"
            :title="COLOR_MENU_TITLE">
            
            <font-awesome-icon icon="fa-palette" />
            <div style="margin-left: 5px;">Color</div>
        </div>
    </div>

    <div v-if="webData.pageView == 0" class="web-navBar-links-section center-flex-display">
        <RouterLink v-for="route in webData.routeHandler.ROUTE_COLLECTION"
            :class="route.classes"
            :to="route.path"
            v-html="route.title"
        />
    </div>

    <div v-if="webData.pageView == 0" class="web-navBar-links-side" style="justify-content: right;">
        <!--
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
            to="/contact-me"
            :title="CONTACT_TITLE">

            <font-awesome-icon icon="fa-message" />
        </RouterLink>
        -->
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
            to="/resume"
            style="flex-direction: column !important; width: 70px;"
            :title="RESUME_TITLE">

            <font-awesome-icon icon="fa-file-lines" style="margin-top: 7px;" />
            <div style="font-size: 14px;">Resume</div>
        </RouterLink>
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
            to="/updates"
            style="flex-direction: column !important; width: 70px;"
            :title="UPDATES_TITLE">

            <font-awesome-icon icon="fa-file-code" style="margin-top: 7px;" />
            <div style="font-size: 14px;">Updates</div>
        </RouterLink>
    </div>

    <div v-if="webData.pageView != 0" style="display: flex; height: 100%;">
        <!--
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
            to="/contact-me"
            :title="CONTACT_TITLE">

            <font-awesome-icon icon="fa-message" />
        </RouterLink>
        -->
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
            to="/resume"
            style="flex-direction: column !important;"
            :title="RESUME_TITLE">

            <font-awesome-icon icon="fa-file-lines" style="margin-top: 5px;" />
            <div style="font-size: 12px;">Resume</div>
        </RouterLink>
        <RouterLink class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
            to="/updates"
            style="flex-direction: column !important; width: 70px;"
            :title="UPDATES_TITLE">

            <font-awesome-icon icon="fa-file-code" style="margin-top: 5px;" />
            <div style="font-size: 12px;">Updates</div>
        </RouterLink>
        <div class="web-navBar-opt web-navBar-side web-navBar-routeIcon-container center-flex-display"
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
const COLOR_MENU_TITLE = "Color Menu (Alt + C)";
const ROUTE_MENU_TITLE = "Route Menu";
const RESUME_TITLE = "See My Resume!";
const UPDATES_TITLE = "Update Logs for My Website."
const CONTACT_TITLE = "Contact Me!";

/**
 * This sets which dropdown is open.
 * @param {Number} newIndex The index of the dropdown to set.
 */
const setDropdown = (newIndex = -1) => {
    webData.setNavBarDropdown(newIndex);
}
</script>