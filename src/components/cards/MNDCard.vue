<template>
<div class="newCard-container">
    <a :href="MND_PROJECT_LINK" id="mnd-nav-newCard" class="nav-newCard"
        @pointerenter="setPulseLoopAnimation"
        @mouseleave="setPulseLoopAnimation">

        <div class="nav-newCard-header">
            <img :src="mnd_text" width="200" class="nav-newCard-personalText" />
        </div>
        <div class="nav-newCard-picture">
            <img :src="main_app_page" width="77.5%" draggable="false" />
        </div>

        <div class="newCard-devStack">
            <div class="newCard-devStack-title"> Dev Stack </div>
            <div v-for="module in DEV_STACK" class="newCard-module">
                <img :src="module.icon" draggable="false" />
                <span> {{ module.title }} </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            For KSU's Spring 2025 Hackathon, my team and I created an app 
            that connects people through organizing in-person meetings.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import mnd_text from "/static-icons/MND_Icon_Transparent.png";
import main_app_page from "@/assets/Spring2025_Hackathon_Page.png";

import vuejs_icon from "@/assets/Vuejs_Icon.png";
import cognito_icon from "@/assets/aws/AWS_Cognito_Icon.svg";
import dynamodb_icon from "@/assets/aws/AWS_DynamoDB_Icon.svg";
import api_gateway_icon from "@/assets/aws/AWS_API_Gateway_Icon.svg";

onMounted(() => {
    setNavCardAnimation("mnd-nav-newCard");
});

const DEV_STACK = [
    { title: "Vue.js", icon: vuejs_icon },
    { title: "Amazon DynamoDB", icon: dynamodb_icon },
    { title: "Amazon Cognito", icon: cognito_icon },
    { title: "Amazon API Gateway", icon: api_gateway_icon },
];
</script>