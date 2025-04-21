<template>
<div class="newCard-container">
    <a :href="PIZZA_WEBSITE_LINK" id="pizza-nav-newCard" class="nav-newCard"
        @mouseenter="setPulseLoopAnimation"
        @mouseleave="setPulseLoopAnimation">

        <div class="nav-newCard-header">
            <client-only> <font-awesome-icon icon="fa-pizza-slice" style="font-size: 80px;" /> </client-only>
        </div>
        <div class="nav-newCard-picture">
            <img :src="main_app_page" width="77.5%" draggable="false" style="border: 2px solid #8B0000;" />
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
            I made a mock UI for a pizza ordering and delivery system using Angular. 
            Electron also converts this UI into a desktop app.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import mnd_text from "/static-icons/MND_Icon_Transparent.png";
import main_app_page from "@/assets/Pizza_Project_Main_Page.png";

import angular_icon from "@/assets/Angular_Icon.webp";
import electron_icon from "@/assets/Electron_Icon.ico";

onMounted(() => {
    setNavCardTransition("pizza-nav-newCard");
});

const DEV_STACK = [
    { title: "Angular", icon: angular_icon },
    { title: "Angular Material", icon: angular_icon },
    { title: "Electron", icon: electron_icon }
];
</script>