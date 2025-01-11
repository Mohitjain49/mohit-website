<template>
<div class="skill-sidebar-container skill-sidebar aws-sidebar">
    <div class="skill-sidebar-container" v-if="webData.pageView != 2">
        <div v-for="path in AWS_PATHS" :title="path.title"
            class="skill-sidebar-opt aws-sidebar-opt center-flex-display"
            @click="navigateAmazonPages(path.route)">

            <img :src="path.icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
    </div>
    <div class="skill-sidebar-container" v-if="webData.pageView == 2">
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="webData.toggleMobileSidebar()" title="Open Sidebar">
            <font-awesome-icon icon="fa-bars" class="skill-sidebar-opt-icon" />
        </div>
    </div>

    <div class="skill-sidebar-container">
        <a :href="AWS_ICONS_LINK" target="_blank" class="skill-sidebar-opt aws-sidebar-opt center-flex-display" title="AWS Icons">
            <img :src="icons_logo" class="skill-sidebar-opt-icon-v2" width="35" draggable="false" />
        </a>
        <a :href="WORLDS_IVUE_LINK" target="_blank" class="skill-sidebar-opt aws-sidebar-opt center-flex-display" title="Worlds iVue">
            <img :src="wiv_icon" class="skill-sidebar-opt-icon-v2" width="30" draggable="false" />
        </a>
        <RouterLink to="/skills" class="skill-sidebar-opt aws-sidebar-opt center-flex-display" title="Back To Skills Page">
            <img :src="return_icon" class="skill-sidebar-opt-icon-v2" draggable="false" />
        </RouterLink>
        <RouterLink to="/" class="skill-sidebar-opt aws-sidebar-opt center-flex-display" title="Back To Home Page">
            <font-awesome-icon class="skill-sidebar-opt-icon" icon="fa-house" draggable="false" />
        </RouterLink>
    </div>
</div>

<div v-if="webData.mobileSidebarOpen" class="webpage-cover"
    @click="webData.closeMobileSidebar()"
    style="z-index: 1499;">
</div>
<Transition name="mobile-skill-sidebar-transition">
    <div v-if="webData.mobileSidebarOpen" class="mobile-skill-sidebar aws-sidebar" draggable="false">
        <div class="mobile-skill-sidebar-opt aws-sidebar-opt" @click="webData.toggleMobileSidebar()">
            <font-awesome-icon icon="fa-bars" class="mobile-skill-sidebar-opt-icon" />
            <span> Close Sidebar </span>
        </div>
        <div v-for="path in AWS_PATHS"
            class="mobile-skill-sidebar-opt aws-sidebar-opt"
            @click="navigateAmazonPages(path.route)">

            <img :src="path.icon" class="mobile-skill-sidebar-opt-icon" draggable="false" />
            <span> {{ path.title }} </span>
        </div>
    </div>
</Transition>
</template>

<script setup>
import "@/styles/sectors/sidebars.css";
import return_icon from "@/google-icons/Return_White_Icon.svg";
import wiv_icon from "@/assets/ivue/Worlds_iVue_Icon.png";
import icons_logo from "@/assets/aws/AWS_Icons_Logo.svg";

import aws_icon from "@/assets/aws/AWS_Icon.png"
import amplify_icon from "@/assets/aws/AWS_Amplify_Icon.svg";
import cognito_icon from "@/assets/aws/AWS_Cognito_Icon.svg";
import s3_icon from "@/assets/aws/AWS_S3_Icon.svg";
import cloudfront_icon from "@/assets/aws/AWS_CloudFront_Icon.svg";
import route53_icon from "@/assets/aws/AWS_Route_53_Icon.svg";

// WILL BE REINSTATED IN A LATER DATE.
// import dynamo_db_icon from "@/assets/aws/AWS_Dynamo_DB_Icon.svg";

import { WORLDS_IVUE_LINK } from "@/stores/Objects.js";
import { useWebsiteDataStore } from "@/stores/WebsiteData.js";

import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";

const webData = useWebsiteDataStore();
const router = useRouter();
const AWS_ICONS_LINK = "https://aws-icons.com/";

onBeforeUnmount(() => {
    if(webData.mobileSidebarOpen) { webData.closeMobileSidebar(); }
})

/**
 * This function navigates to specific aws pages for the user.
 * @param subRoute The subroute within the aws path.
 */
function navigateAmazonPages(subRoute = "") {
    router.push("/skills/aws/" + subRoute);
}

/**
 * This is the list of available paths in the AWS skills page.
 */
const AWS_PATHS = [
    { title: "Amazon Web Services", icon: aws_icon, route: "main" },
    { title: "AWS Amplify", icon: amplify_icon, route: "amplify" },
    { title: "Amazon Cognito", icon: cognito_icon, route: "cognito" },
    { title: "Amazon S3", icon: s3_icon, route: "s3" },
    { title: "Amazon CloudFront", icon: cloudfront_icon, route: "cloudfront" },
    { title: "Amazon Route 53", icon: route53_icon, route: "route53" },
    // { title: "Amazon DynamoDB", icon: dynamo_db_icon, route: "dynamodb" }
];
</script>