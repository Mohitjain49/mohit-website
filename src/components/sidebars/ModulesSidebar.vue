<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'module-sidebar')">
    <div class="skill-sidebar-container">
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'module-sidebar-opt')"
            @click="navigateModulePages('cesium')"
            title="Cesium">

            <img :src="cesium_icon" class="skill-sidebar-opt-icon-v2" width="25" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'module-sidebar-opt')"
            @click="navigateModulePages('mavlink')"
            title="MAVLink Protocol">

            <img :src="mavlink_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
    </div>
    <div class="skill-sidebar-container">
        <a href="https://www.worldsivue.com/" target="_blank"
            class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'module-sidebar-opt')"
            title="Worlds iVue">

            <img :src="wiv_icon" class="skill-sidebar-wivIcon-visible" draggable="false" />
        </a>
        <RouterLink to="/skills" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'module-sidebar-opt')"
            title="Back To Skills Page">

            <img :src="return_icon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>
        <RouterLink to="/" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'module-sidebar-opt')"
            title="Back To Home Page">

            <font-awesome-icon class="skill-sidebar-opt-icon" icon="fa-house" draggable="false" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import "@/styles/sectors/sidebars.css";
import return_icon from "@/google-icons/Return_White_Icon.svg";
import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";

import cesium_icon from "@/assets/Cesium_Globe_Icon.png";
import mavlink_icon from "@/assets/ivue/Mavlink_Icon.png";

import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const classPrefix = ref("cesium-");

onMounted(() => {
    const subRoute = route.params.id;
    if(subRoute == undefined || subRoute === "cesium") {
        classPrefix.value = "cesium-";
    } else if(subRoute === "mavlink") {
        classPrefix.value = "mavlink-";
    }
});

/**
 * This function navigates to specific aws pages for the user.
 * @param subRoute The subroute within the aws path.
 */
function navigateModulePages(subRoute = "") {
    router.push("/skills/modules/" + subRoute);
}
</script>