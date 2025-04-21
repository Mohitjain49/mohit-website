<template>
<div class="newCard-container">
    <a :href="MAIN_IVUE_WEBSITE_LINK" id="ivue-nav-newCard" class="nav-newCard"
        @mouseenter="setPulseLoopAnimation"
        @mouseleave="setPulseLoopAnimation">

        <div class="nav-newCard-header">
            <img :src="ivue_text" width="150" />
        </div>
        <div class="nav-newCard-picture">
            <img :src="main_webpage" width="77.5%" draggable="false" />
        </div>

        <div class="newCard-devStack">
            <div class="newCard-devStack-title"> Dev Stack </div>
            <div v-for="module in DEV_STACK" class="newCard-module">
                <img :src="module.icon" draggable="false" />
                <span> {{ module.title }} </span>
            </div>
            <div class="newCard-module">
                <client-only> <font-awesome-icon icon="fa-brands fa-cloudflare" style="color: #F58A27" /> </client-only>
                <span> Cloudflare </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            As iVue's lead software developer, I develop iVue's company websites 
            and manage how they are hosted online.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import ivue_text from "@/assets/ivue/iVue_Black_Text_Cropped.png";
import main_webpage from "@/assets/ivue/iVue_Main_Website_Home.png";

import vuejs_icon from "@/assets/Vuejs_Icon.png";
import nuxt_icon from "@/assets/Nuxt_Icon.png";
import aws_icon from "@/assets/aws/AWS_Icon.png";

onMounted(() => {
    setNavCardTransition("ivue-nav-newCard");
});

const DEV_STACK = [
    { title: "Vue.js", icon: vuejs_icon },
    { title: "Nuxt", icon: nuxt_icon },
    { title: "Amazon Web Services", icon: aws_icon },
];
</script>