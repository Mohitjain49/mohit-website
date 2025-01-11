<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'ivue-sidebar')">
    <div class="skill-sidebar-container">
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('me')"
            title="My Role At iVue">

            <font-awesome-icon class="skill-sidebar-opt-icon" style="color: black" icon="fa-laptop-code" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('web')"
            title="Main iVue Website">

            <img :src="ivue_text" class="skill-sidebar-opt-icon-v2" width="40" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('media')"
            title="iVue Media Website">

            <img :src="media_icon" class="skill-sidebar-opt-icon-v2" width="30" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('worldsivue')"
            title="Worlds iVue">

            <img :src="wiv_icon" :class="returnWIVIconClass()" width="30" draggable="false" />
        </div>
    </div>
    <div class="skill-sidebar-container">
        <a :href="VUEJS_WEBSITE_LINK" target="_blank"
            class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            title="Vue.js">

            <img :src="vuejs_icon" class="skill-sidebar-opt-icon-v2" width="25" draggable="false" />
        </a>
        <RouterLink to="/experience" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            title="Back To Experience Page">

            <img :src="return_icon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>
        <RouterLink to="/" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            title="Back To Home Page">

            <font-awesome-icon class="skill-sidebar-opt-icon" style="color: black" icon="fa-house" draggable="false" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import "@/styles/sectors/sidebars.css";
import return_icon from "@/assets/google-icons/Return_Black_Icon.svg";
import vuejs_icon from "@/assets/Vuejs_Icon.png";

import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";
import ivue_text from "@/assets/ivue/iVue_Black_Text.png";
import media_icon from "@/assets/ivue/iVue_Media_Icon.png";

import { VUEJS_WEBSITE_LINK } from "@/stores/Objects.js";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const classPrefix = ref("main-");

const MAIN_COLOR_SUBROUTES = [
    "main", "me", "web", "website", undefined
];

onMounted(() => {
    const subRoute = route.params.id;
    if(MAIN_COLOR_SUBROUTES.findIndex(mainRoute => mainRoute === subRoute) != -1) {
        classPrefix.value = "main-";
    } else if(subRoute === "media") {
        classPrefix.value = "media-";
    } else if(subRoute === "worldsivue" || subRoute === "wiv" || subRoute === "worlds-ivue") {
        classPrefix.value = "wiv-";
    }
});

/**
 * This function navigates to specific aws pages for the user.
 * @param subRoute The subroute within the aws path.
 */
function navigateIvuePages(subRoute = "") {
    router.push("/experience/ivue/" + subRoute);
}

/**
 * This returns what class the WIV Icon should use.
 */
function returnWIVIconClass() {
    return ((classPrefix.value !== "wiv-") ? 'skill-sidebar-opt-icon-v2' : 'skill-sidebar-wivIcon-visible');
}
</script>