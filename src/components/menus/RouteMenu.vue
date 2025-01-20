<template>
<div :class="(globePage ? GLOBE_MENU_CLASSES : NAV_BAR_CLASSES)">
    <div v-for="route in ROUTE_COLLECTION"
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
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({ globePage: Boolean });

const NAV_BAR_CLASSES = ["navBar-dropdown", "route-nav-dropdown"];
const GLOBE_MENU_CLASSES = ["globe-menu"];

/**
 * This navigates the user to a different route.
 * @param {String} route The path of the route to go to.
 */
function changePage(route) {
    router.push(route);
}

const ROUTE_COLLECTION = [
    { path: "/", title: "Home" },
    { path: "/skills", title: "Skills" },
    { path: "/experience", title: "Experience" },
    { path: "/globe", title: "My Globe" }
]
</script>