<template>
<div class="aws-nav-widget animate__animated animate__fadeInRight">
    <div class="aws-nav-widget-opt" @click="webData.toggleSkillsSidebar()" title="Open Menu">
        <client-only> <font-awesome-icon icon="fa-bars" /> </client-only>
    </div>
    <div class="aws-nav-widget-line"></div>
    <RouterLink to="/skills" class="aws-nav-widget-opt" title="Back To Skills Page">
        <img :src="return_icon" draggable="false" />
    </RouterLink>
</div>

<div v-if="webData.skillsSidebarOpen" class="webpage-cover"
    @click="webData.toggleSkillsSidebar()"
    style="z-index: 1499;">
</div>
<Transition name="mobile-skill-sidebar-transition">
    <div v-if="webData.skillsSidebarOpen" class="mobile-skill-sidebar aws-sidebar" draggable="false">
        <div class="mobile-skill-sidebar-opt aws-sidebar-opt" @click="webData.toggleSkillsSidebar()">
            <font-awesome-icon icon="fa-bars" class="mobile-skill-sidebar-opt-icon" />
            <span> Close Menu </span>
        </div>

        <RouterLink v-for="path in AWS_PATHS"
            :to="getAmazonRoute(path.route)"
            @click="goToAmazonSection(path.route)"
            class="mobile-skill-sidebar-opt aws-sidebar-opt">

            <img :src="path.icon" class="mobile-skill-sidebar-opt-icon" draggable="false" />
            <span> {{ path.title }} </span>
        </RouterLink>
        <a :href="AWS_ICONS_LINK" target="_blank" class="mobile-skill-sidebar-opt aws-sidebar-opt">
            <img :src="icons_logo" id="aws-icon-logo" draggable="false" />
            <span> AWS Icons </span>
        </a>
    </div>
</Transition>
</template>

<script setup>
import "@/styles/sidebars.css";
import return_icon from "@/assets/google-icons/Return_White_Icon.svg";
import icons_logo from "@/assets/aws/AWS_Icons_Logo.svg";

import aws_icon from "@/assets/aws/AWS_Icon.png"
import amplify_icon from "@/assets/aws/AWS_Amplify_Icon.svg";
import cognito_icon from "@/assets/aws/AWS_Cognito_Icon.svg";
import s3_icon from "@/assets/aws/AWS_S3_Icon.svg";
import cloudfront_icon from "@/assets/aws/AWS_CloudFront_Icon.svg";
import route53_icon from "@/assets/aws/AWS_Route_53_Icon.svg";
import workmail_icon from "@/assets/aws/AWS_WorkMail_Icon.svg";

import { useWebsiteDataStore } from "@/stores/WebsiteData.js";
import { onBeforeUnmount } from "vue";

const webData = useWebsiteDataStore();
const AWS_ICONS_LINK = "https://aws-icons.com/";

onBeforeUnmount(() => {
    if(webData.skillsSidebarOpen) { webData.toggleSkillsSidebar(); }
})

/**
 * This function returns an object that navigates visitors to a specific section of the AWS Page.
 * @param hash The id of the section.
 */
function getAmazonRoute(hash = "#start") {
    return { path: "/aws", hash };
}

/**
 * This function navigates the user to a section on the AWS Page.
 * @param id The id of the AWS section.
 */
function goToAmazonSection(id) {
    webData.goToPageSection(id);
    if(webData.skillsSidebarOpen) { webData.toggleSkillsSidebar(); }
}

/**
 * This is the list of available paths in the AWS skills page.
 */
const AWS_PATHS = [
    { title: "Amazon Web Services", icon: aws_icon, route: "#start" },
    { title: "AWS Amplify", icon: amplify_icon, route: "#amplify" },
    { title: "Amazon Cognito", icon: cognito_icon, route: "#cognito" },
    { title: "Amazon S3", icon: s3_icon, route: "#s3" },
    { title: "Amazon CloudFront", icon: cloudfront_icon, route: "#cloudfront" },
    { title: "Amazon Route 53", icon: route53_icon, route: "#route53" },
    { title: "Amazon WorkMail", icon: workmail_icon, route: "#workmail" }
];
</script>

<style>
.aws-nav-widget {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    top: 65px;
    left: 15px;
    height: 122px;
    width: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid #402C6D;
    box-shadow: 0px 0px 7px 0px white;
    border-radius: 30px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.aws-nav-widget-opt {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 25px;
    transition: var(--default-transition);
}
.aws-nav-widget-opt:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.aws-nav-widget-opt img {
    width: 25px;
    user-select: none;
}
.aws-nav-widget-line {
    width: 100%;
    height: 2px;
    background-color: #402C6D;
}

#aws-icon-logo {
    margin: 0px 15px;
    width: 25px;
    background-color: rgb(255, 255, 255);
    padding: 4px;
    border-radius: 5px;
}

@media (max-width: 340px) {
    .aws-nav-widget {
        display: none;
    }
}
</style>