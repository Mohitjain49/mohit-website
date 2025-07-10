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
            <div class="newCard-devStack-title"> My Duties </div>
            <div v-for="module in DEV_STACK" class="newCard-module">
                <img :src="module.icon" draggable="false" />
                <span> {{ module.title }} </span>
            </div>
            <div class="newCard-module">
                <client-only> <font-awesome-icon icon="fa-laptop-code" class="web-dev" /> </client-only>
                <span> Web Development </span>
            </div>
            <div class="newCard-module">
                <client-only> <font-awesome-icon icon="fa-users-rectangle" style="color: #F58A27" /> </client-only>
                <span> Mentoring Interns </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            As a lead software developer at iVue, I take charge of the company's full-stack application development.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import ivue_text from "@/assets/ivue/iVue_Black_Text_Cropped.png";
import main_webpage from "@/assets/ivue/iVue_Main_Website_Home.png";

import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";
import aws_icon from "@/assets/aws/AWS_Icon.png";

onMounted(() => {
    setNavCardTransition("ivue-nav-newCard");
});

const DEV_STACK = [
    { title: "Worlds iVue", icon: wiv_icon },
    { title: "Cloud Architecture", icon: aws_icon },
];
</script>