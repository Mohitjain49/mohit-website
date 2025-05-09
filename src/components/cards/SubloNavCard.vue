<template>
<div id="third-nav-card" class="newCard-container">
    <a :href="SUBLO_WEBSITE_LINK" id="sublo-nav-newCard" class="nav-newCard"
        @mouseenter="setPulseLoopAnimation"
        @mouseleave="setPulseLoopAnimation">

        <div class="nav-newCard-header">
            <img :src="sublo_icon" width="55" />
            <div class="nav-newCard-header-text" style="color: #36A1D9"> ublo </div>
        </div>
        <div class="nav-newCard-picture">
            <img :src="sublo_blue_background" width="35%" draggable="false" />
        </div>

        <div class="newCard-devStack">
            <div class="newCard-devStack-title"> Dev Stack </div>
            <div v-for="module in DEV_STACK" class="newCard-module">
                <img :src="module.icon" draggable="false" />
                <span> {{ module.title }} </span>
            </div>
        </div>

        <div class="nav-newCard-desc center-flex-display">
            I collaborated with other developers to create a 
            subleasing mobile app with React Native and Amazon Web Services.
        </div>
    </a>
</div>
</template>

<script setup>
import "@/styles/navcards.css";
import sublo_icon from "@/assets/sublo/Sublo_Blue_Transparent.png";
import sublo_blue_background from "@/assets/sublo/Sublo_Blue_Background.png";

import react_icon from "@/assets/React_Icon.png";
import expo_icon from "@/assets/sublo/Expo_Icon.svg";
import cognito_icon from "@/assets/aws/AWS_Cognito_Icon.svg";
import amplify_icon from "@/assets/aws/AWS_Amplify_Icon.svg";

onMounted(() => {
    setNavCardTransition("sublo-nav-newCard");
});

const DEV_STACK = [
    { title: "React Native", icon: react_icon },
    { title: "Expo", icon: expo_icon },
    { title: "Amazon Cognito", icon: cognito_icon },
    { title: "AWS Amplify", icon: amplify_icon },
];
</script>