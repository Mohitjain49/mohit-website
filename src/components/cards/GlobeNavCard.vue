<template>
<div id="third-nav-card" class="newCard-container">
    <a :href="PERSONAL_GLOBE_LINK" id="globe-nav-newCard" class="nav-newCard"
        @mouseenter="setPulseLoopAnimation"
        @mouseleave="setPulseLoopAnimation">

        <div class="nav-newCard-header">
            <img :src="mkj_text" width="200" class="nav-newCard-personalText" />
        </div>
        <div class="nav-newCard-picture">
            <img :src="globe_page" width="77.5%" draggable="false" />
        </div>

        <div class="newCard-devStack">
            <div class="newCard-devStack-title"> Dev Stack </div>
            <div v-for="module in DEV_STACK" class="newCard-module">
                <img :src="module.icon" draggable="false" />
                <span> {{ module.title }} </span>
            </div>
            <div class="newCard-module">
                <client-only> <font-awesome-icon icon="fa-brands fa-github" style="color: black" /> </client-only>
                <span> GitHub </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            As a side project, I created a new UI using CesiumJS, 
            equipped with the ability to search locations across the world.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import mkj_text from "/static-icons/Personal_Icon_Transparent.png";
import globe_page from "@/assets/Personal_Globe_Page.png";

import vuejs_icon from "@/assets/Vuejs_Icon.png";
import cesium_icon from "@/assets/Cesium_Globe_Icon.svg";
import pinia_icon from "@/assets/Pinia_Icon.svg";

onMounted(() => {
    setNavCardTransition("globe-nav-newCard");
});

const DEV_STACK = [
    { title: "Vue.js", icon: vuejs_icon },
    { title: "Pinia", icon: pinia_icon },
    { title: "Cesium", icon: cesium_icon },
];
</script>