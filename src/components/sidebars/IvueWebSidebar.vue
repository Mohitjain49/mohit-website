<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'ivue-sidebar')">
    <div class="skill-sidebar-container">
        <RouterLink :to="getIvueRoute('')" :class="returnSidebarOptClasses()" title="My Role At iVue">
            <font-awesome-icon class="skill-sidebar-opt-icon" icon="fa-laptop-code" :style="blackWhiteIcons.faIconColor" />
        </RouterLink>

        <RouterLink :to="getIvueRoute('website')" :class="returnSidebarOptClasses()" title="Main iVue Website">
            <img :src="blackWhiteIcons.ivueText" class="skill-sidebar-opt-icon-v2" width="40" draggable="false" />
        </RouterLink>

        <RouterLink :to="getIvueRoute('ivuemedia')" :class="returnSidebarOptClasses()" title="iVue Media">
            <img :src="media_icon" class="skill-sidebar-opt-icon-v2" width="30" draggable="false" />
        </RouterLink>

        <RouterLink :to="getIvueRoute('ivuerobotics')" :class="returnSidebarOptClasses()" title="iVue Robotics">
            <img :src="robotics_icon" :class="returnRoboticsIconClass()" width="30" draggable="false" />
        </RouterLink>

        <RouterLink :to="getIvueRoute('worldsivue')" :class="returnSidebarOptClasses()" title="Worlds iVue">
            <img :src="wiv_icon" :class="returnWIVIconClass()" width="30" draggable="false" />
        </RouterLink>
    </div>

    <div class="skill-sidebar-container">
        <a :href="VUEJS_WEBSITE_LINK" target="_blank" :class="returnSidebarOptClasses()" title="Vue.js">
            <img :src="vuejs_icon" class="skill-sidebar-opt-icon-v2" width="25" draggable="false" />
        </a>

        <RouterLink to="/experience" :class="returnSidebarOptClasses()" title="Back To Experience Page">
            <img :src="blackWhiteIcons.returnIcon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>

        <RouterLink to="/" :class="returnSidebarOptClasses()" title="Back To Home Page">
            <font-awesome-icon class="skill-sidebar-opt-icon" icon="fa-house" :style="blackWhiteIcons.faIconColor" />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import "@/styles/sidebars.css";
import return_black_icon from "@/assets/google-icons/Return_Black_Icon.svg";
import return_white_icon from "@/assets/google-icons/Return_White_Icon.svg";
import vuejs_icon from "@/assets/Vuejs_Icon.png";

import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";
import ivue_black_text from "@/assets/ivue/iVue_Black_Text.png";
import ivue_white_text from "@/assets/ivue/iVue_White_Text.png";
import media_icon from "@/assets/ivue/iVue_Media_Icon.png";
import robotics_icon from "@/assets/ivue/iVue_Robotics_Cog_Icon.png";

import { VUEJS_WEBSITE_LINK } from "@/stores/Objects.js";
import { RouterLink, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const classPrefix = ref("main-");

const blackWhiteIcons= ref({
    faIconColor: { color: "black" },
    returnIcon: return_black_icon,
    ivueText: ivue_black_text
});

onMounted(() => {
    const subRoute = route.path.substring("/experience/ivue/".length);
    setIconColor();

    for(let i = 0; i < IVUE_EXPERIENCE_PATHS.length; i++) {
        if(IVUE_EXPERIENCE_PATHS[i].paths.includes(subRoute)) {
            classPrefix.value = IVUE_EXPERIENCE_PATHS[i].classPrefix;
            return;
        }
    }
});

/**
 * This function returns the path for a specific iVue Page.
 * @param subRoute The subroute within the ivue path.
 */
function getIvueRoute(subRoute = "") {
    return ("/experience/ivue/" + subRoute);
}

/**
 * This returns the classes for a sidebar opt.
 */
function returnSidebarOptClasses() {
    return ["skill-sidebar-opt", "center-flex-display", (classPrefix.value + 'ivue-sidebar-opt')];
}

/**
 * This returns what class the WIV Icon should use.
 */
function returnWIVIconClass() {
    return ((classPrefix.value !== "wiv-") ? 'skill-sidebar-opt-icon-v2' : 'skill-sidebar-wivIcon-visible');
}

/**
 * This returns what class the iVue Robotics Icon should use.
 */
function returnRoboticsIconClass() {
    return ((classPrefix.value !== "robotics-") ? 'skill-sidebar-opt-icon-v2' : 'skill-sidebar-wivIcon-visible');
}

/**
 * This function sets the color of the black and white icons.
 */
function setIconColor() {
    const subRoute = route.path.substring("/experience/ivue/".length);
    const array = ["main", "me", "", "web",
        "website", "ivue-website", "main-website",
        "worldsivue", "wiv", "worlds-ivue"
    ];

    blackWhiteIcons.value = {
        faIconColor: { color: "black" },
        returnIcon: return_black_icon,
        ivueText: ivue_black_text
    }

    if(array.findIndex(mainRoute => mainRoute === subRoute) == -1) {
        blackWhiteIcons.value = {
            faIconColor: { color: "white" },
            returnIcon: return_white_icon,
            ivueText: ivue_white_text
        }
    }
}

const IVUE_EXPERIENCE_PATHS = [
    { classPrefix: "main-", paths: ["main", "me", "", "web", "website", "ivue-website", "main-website"] },
    { classPrefix: "media-", paths: ["ivuemedia", "media", "ivue-media"] },
    { classPrefix: "robotics-", paths: ["ivuerobotics", "robotics", "ivue-robotics"] },
    { classPrefix: "wiv-", paths: ["worldsivue", "wiv", "worlds-ivue"] }
]
</script>