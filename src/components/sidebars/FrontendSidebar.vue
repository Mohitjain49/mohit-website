<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'frontend-sidebar')">
    <div class="skill-sidebar-container">
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'frontend-sidebar-opt')"
            @click="navigateFrontendPages('vuejs')"
            title="Vue.js">

            <img :src="vue_icon" class="skill-sidebar-opt-icon-v2" width="25" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'frontend-sidebar-opt')"
            @click="navigateFrontendPages('reactnative')"
            title="React Native">

            <img :src="react_icon" draggable="false"
                class="skill-sidebar-wivIcon-visible"
                style="background-color: black;"
            />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'frontend-sidebar-opt')"
            @click="navigateFrontendPages('angular')"
            title="Angular">

            <img :src="angular_icon" class="skill-sidebar-wivIcon-visible" draggable="false" />
        </div>
    </div>
    <div class="skill-sidebar-container">
        <RouterLink to="/skills" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'frontend-sidebar-opt')"
            title="Back To Skills Page">

            <img :src="return_icon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>
        <RouterLink to="/" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'frontend-sidebar-opt')"
            title="Back To Home Page">

            <font-awesome-icon class="skill-sidebar-opt-icon" icon="fa-house" draggable="false" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import "@/styles/sectors/sidebars.css";
import return_icon from "@/assets/google-icons/Return_White_Icon.svg";

import vue_icon from "@/assets/Vuejs_Icon.png";
import angular_icon from "@/assets/Angular_Icon.webp";
import react_icon from "@/assets/React_Icon.png";

import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const classPrefix = ref("vue-");

onMounted(() => {
    const subRoute = route.params.id;
    if(subRoute == undefined || subRoute === "vue") {
        classPrefix.value = "vue-";
    } else if(subRoute === "angular") {
        classPrefix.value = "angular-";
    } else if(subRoute === "react" || subRoute === "reactnative") {
        classPrefix.value = "react-";
    }
});

/**
 * This function navigates to specific aws pages for the user.
 * @param subRoute The subroute within the aws path.
 */
function navigateFrontendPages(subRoute = "") {
    router.push("/skills/frontend/" + subRoute);
}
</script>