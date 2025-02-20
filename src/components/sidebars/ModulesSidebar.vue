<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'module-sidebar')">
    <div class="skill-sidebar-container">
        <RouterLink :to="getModuleRoute('cesium')" :class="returnSidebarOptClasses()" title="Cesium">
            <img :src="cesium_icon" class="skill-sidebar-opt-icon-v2" width="25" draggable="false" />
        </RouterLink>

        <RouterLink :to="getModuleRoute('mavlink')" :class="returnSidebarOptClasses()" title="MAVLink Protocol">
            <img :src="mavlink_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </RouterLink>
    </div>
    <div class="skill-sidebar-container">
        <a :href="WORLDS_IVUE_LINK" target="_blank" :class="returnSidebarOptClasses()" title="Worlds iVue">
            <img :src="wiv_icon" class="skill-sidebar-wivIcon-visible" draggable="false" />
        </a>

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
import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";

import cesium_icon from "@/assets/Cesium_Globe_Icon.svg";
import mavlink_icon from "@/assets/ivue/Mavlink_Icon.png";

import { WORLDS_IVUE_LINK } from "@/stores/Objects.js";
import { RouterLink, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const classPrefix = ref("cesium-");

onMounted(() => {
    const subRoute = route.path.substring("/skills/modules/".length);
    if(subRoute === "" || subRoute === "cesium" || subRoute === "cesiumjs") {
        classPrefix.value = "cesium-";
    } else if(subRoute === "mavlink" || subRoute === "mavlink-protocol") {
        classPrefix.value = "mavlink-";
    }
});

/**
 * This returns the classes for a sidebar opt.
 */
function returnSidebarOptClasses() {
    return ["skill-sidebar-opt", "center-flex-display", (classPrefix.value + 'module-sidebar-opt')];
}

/**
 * This function returns the route for a module page.
 * @param subRoute The subroute for the module page.
 */
function getModuleRoute(subRoute = "") {
    return ("/skills/modules/" + subRoute);
}
</script>