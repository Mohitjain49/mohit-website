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
            <div v-for="name in ['Angular', 'Angular Material']" class="newCard-module">
                <img :src="angular_icon" draggable="false" />
                <span> {{ name }} </span>
            </div>
            <div class="newCard-module">
                <client-only> <font-awesome-icon icon="fa-brands fa-github" style="color: black" /> </client-only>
                <span> GitHub </span>
            </div>
            <div class="newCard-module">
                <img :src="ts_icon" draggable="false" />
                <span> TypeScript </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            I made a mock UI for a pizza ordering and delivery system using Angular. 
            It is hosted online via GitHub Pages.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import main_app_page from "@/assets/Pizza_Project_Main_Page.png";
import angular_icon from "@/assets/Angular_Icon.webp";
import ts_icon from "@/assets/TypeScript_Icon.png";

onMounted(() => {
    setNavCardTransition("pizza-nav-newCard");
});
</script>