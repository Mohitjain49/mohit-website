<template>
<div class="skill-sidebar-container skill-sidebar" :class="(classPrefix + 'ivue-sidebar')">
    <div class="skill-sidebar-container">
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('')"
            title="My Role At iVue">

            <font-awesome-icon class="skill-sidebar-opt-icon"
                icon="fa-laptop-code" draggable="false"
                :style="blackWhiteIcons.faIconColor"
            />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('web')"
            title="Main iVue Website">

            <img :src="blackWhiteIcons.ivueText" class="skill-sidebar-opt-icon-v2" width="40" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('ivuemedia')"
            title="iVue Media Website">

            <img :src="media_icon" class="skill-sidebar-opt-icon-v2" width="30" draggable="false" />
        </div>
        <div class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            @click="navigateIvuePages('ivuerobotics')"
            title="iVue Robotics Website">

            <img :src="robotics_icon" :class="returnRoboticsIconClass()" width="30" draggable="false" />
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

            <img :src="blackWhiteIcons.returnIcon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>
        <RouterLink to="/" class="skill-sidebar-opt center-flex-display"
            :class="(classPrefix + 'ivue-sidebar-opt')"
            title="Back To Home Page">

            <font-awesome-icon class="skill-sidebar-opt-icon"
                icon="fa-house" draggable="false"
                :style="blackWhiteIcons.faIconColor"
            />
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import "@/styles/sectors/sidebars.css";
import return_black_icon from "@/assets/google-icons/Return_Black_Icon.svg";
import return_white_icon from "@/assets/google-icons/Return_White_Icon.svg";
import vuejs_icon from "@/assets/Vuejs_Icon.png";

import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";
import ivue_black_text from "@/assets/ivue/iVue_Black_Text.png";
import ivue_white_text from "@/assets/ivue/iVue_White_Text.png";
import media_icon from "@/assets/ivue/iVue_Media_Icon.png";
import robotics_icon from "@/assets/ivue/iVue_Robotics_Cog_Icon.png";

import { VUEJS_WEBSITE_LINK } from "@/stores/Objects.js";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const classPrefix = ref("main-");
const blackWhiteIcons= ref({
    faIconColor: { color: "black" },
    returnIcon: return_black_icon,
    ivueText: ivue_black_text
});

onMounted(() => {
    const subRoute = route.params.id;
    setIconColor();

    if(subRoute == undefined || subRoute === "web") {
        classPrefix.value = "main-";
    } else if(subRoute === "ivuemedia") {
        classPrefix.value = "media-";
    } else if(subRoute === "ivuerobotics") {
        classPrefix.value = "robotics-";
    } else if(subRoute === "worldsivue") {
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
    const subRoute = route.params.id;
    const array = [undefined, "web", "worldsivue"];

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
</script>