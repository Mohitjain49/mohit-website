<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'frontend-sidebar')">
    <div class="skill-sidebar-container">
        <RouterLink :to="getFrontendRoute('vuejs')" :class="returnSidebarOptClasses()" title="Vue.js">
            <img :src="vue_icon" class="skill-sidebar-opt-icon-v2" width="25" draggable="false" />
        </RouterLink>

        <RouterLink :to="getFrontendRoute('reactnative')" :class="returnSidebarOptClasses()" title="React Native">
            <img :src="react_icon" draggable="false" class="skill-sidebar-wivIcon-visible" style="background-color: black;" />
        </RouterLink>

        <RouterLink :to="getFrontendRoute('angular')" :class="returnSidebarOptClasses()" title="Angular">
            <img :src="angular_icon" class="skill-sidebar-wivIcon-visible" draggable="false" />
        </RouterLink>
    </div>
    <div class="skill-sidebar-container">
        <RouterLink to="/skills" :class="returnSidebarOptClasses()" title="Back To Skills Page">
            <img :src="return_icon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>

        <RouterLink to="/" :class="returnSidebarOptClasses()" title="Back To Home Page">
            <font-awesome-icon class="skill-sidebar-opt-icon" icon="fa-house" draggable="false" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import "@/styles/sidebars.css";
import return_icon from "@/assets/google-icons/Return_White_Icon.svg";

import vue_icon from "@/assets/Vuejs_Icon.png";
import angular_icon from "@/assets/Angular_Icon.webp";
import react_icon from "@/assets/React_Icon.png";

import { RouterLink, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const classPrefix = ref("vue-");

onMounted(() => {
    const subRoute = route.path.substring("/skills/frontend/".length);
    if(subRoute == undefined || subRoute === "vue" || subRoute === "vuejs") {
        classPrefix.value = "vue-";
    } else if(subRoute === "angular" || subRoute === "angularjs") {
        classPrefix.value = "angular-";
    } else if(subRoute === "react" || subRoute === "reactnative") {
        classPrefix.value = "react-";
    }
});

/**
 * This returns the classes for a sidebar opt.
 */
function returnSidebarOptClasses() {
    return ["skill-sidebar-opt", "center-flex-display", (classPrefix.value + 'frontend-sidebar-opt')];
}

/**
 * This function returns the route for a frontend page.
 * @param subRoute The subroute for the module page.
 */
function getFrontendRoute(subRoute = "") {
    return ("/skills/frontend/" + subRoute);
}
</script>