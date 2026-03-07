<template>
<div id="third-nav-card" class="newCard-container">
    <a :href="PERSONAL_GLOBE_LINK" id="globe-nav-newCard" class="nav-newCard" pulse-loop>
        <div class="nav-newCard-header">
            <font-awesome-icon icon="fa-earth-americas" style="font-size: 80px;" />
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
                <font-awesome-icon icon="fa-brands fa-github" style="color: black" />
                <span> GitHub </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            I created a User Interface using CesiumJS as a "Feature Lab" for Worlds iVue. 
            It can be downloaded as a desktop app via Tauri.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import globe_page from "@/assets/Personal_Globe_Page.png";
import vuejs_icon from "@/assets/Vuejs_Icon.png";
import cesium_icon from "@/assets/Cesium_Globe_Icon.svg";
import tauri_icon from "@/assets/Tauri_Icon.png";

onMounted(() => {
    setNavCardAnimation("globe-nav-newCard");
});

const DEV_STACK = [
    { title: "Vue.js", icon: vuejs_icon },
    { title: "Cesium", icon: cesium_icon },
    { title: "Tauri", icon: tauri_icon },
];
</script>