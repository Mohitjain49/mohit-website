<template>
<div class="newCard-container">
    <a :href="WORLDS_IVUE_LINK" id="wiv-nav-newCard" class="nav-newCard" pulse-loop>
        <div class="nav-newCard-header">
            <img :src="wiv_banner" width="200" />
        </div>
        <div class="nav-newCard-picture">
            <img :src="wiv_page" width="80%" draggable="false" />
        </div>

        <div class="newCard-devStack">
            <div class="newCard-devStack-title"> Dev Stack </div>
            <div v-for="module in DEV_STACK" class="newCard-module">
                <img :src="module.icon" draggable="false" />
                <span> {{ module.title }} </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            Explore Worlds iVue, a geospatial app that serves as a 
            drone control operator and will serve as a media sharing app in the future.
        </div>
    </a>
</div>
</template>

<script setup>
import wiv_banner from "~/assets/ivue/Worlds_iVue_Banner.png";
import wiv_page from "~/assets/ivue/Worlds_iVue_Main_App.png";

import vuejs_icon from "~/assets/Vuejs_Icon.png";
import cesium_icon from "~/assets/Cesium_Globe_Icon.svg";
import mavlink_icon from "~/assets/ivue/Mavlink_Icon.png";
import aws_icon from "~/assets/aws/AWS_Icon.png";

onMounted(() => { nextTick(() => { setNavCardAnimation("wiv-nav-newCard"); }); });
const DEV_STACK = [
    { title: "Vue.js", icon: vuejs_icon },
    { title: "Cesium", icon: cesium_icon },
    { title: "MAVLink", icon: mavlink_icon },
    { title: "Amazon Web Services", icon: aws_icon }
];
</script>

<style scoped>
@import "~/styles/navcards.css";
</style>