<template>
<div :class="(globePage ? GLOBE_MENU_CLASSES : NAV_BAR_CLASSES)">
    <div v-for="route in webData.routeHandler.ROUTE_COLLECTION"
        class="navBar-dropdown-opt-container center-flex-display"
        @click="changePage(route.path)">

        <div class="navBar-dropdown-opt default-color-opt center-flex-display"
            v-html="route.title">
        </div>
    </div>
</div>
</template>

<script setup>
import "../../styles/dropdowns.css";
import { useWebsiteDataStore } from "../../stores/WebsiteData.js";

const webData = useWebsiteDataStore();
const props = defineProps({ globePage: Boolean });

const NAV_BAR_CLASSES = ["navBar-dropdown", "route-nav-dropdown"];
const GLOBE_MENU_CLASSES = ["globe-menu"];

/**
 * This navigates the user to a different route.
 * @param {String} route The path of the route to go to.
 */
const changePage = (route) => {
    webData.routeHandler.navigateToRoute(route);
}
</script>