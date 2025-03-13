<template>
<NavigationMain />
<AmazonSidebar />

<client-only>
    <vue-particles id="particlests" :options="AWS_BACKGROUND"></vue-particles>
</client-only>

<div id="aws-page" class="personal-web-body" @click="webData.setNavBarDropdown(-1)">
    <div :class="getPageContainerClasses()">
        <div class="aws-page-title">
            <img :src="aws_icon" draggable="false"
                :title="AWS_WEBSITE_LINK"
                @click="goToAWSWebsite()"
                @mouseenter="webData.setFlashAnimation"
                @mouseleave="webData.setFlashAnimation"
            />
            <span> AWS </span>
        </div>
        <div class="aws-page-mainDesc">
            With over 200 distinct services, AWS is the best cloud computing provider on the market for businesses and developers. 
            I currently use some of its services for my own projects.
        </div>
        <div class="aws-page-smallIcon-grid">
            <div v-for="icon in SMALL_ICONS" class="aws-page-smallIcon">
                <a :href="(AWS_WEBSITE_LINK + icon.webPath)" target="aws-website"
                    class="aws-page-smallIcon-link"
                    :title="icon.title"
                    @mouseenter="webData.setHeartbeatAnimation"
                    @mouseleave="webData.setHeartbeatAnimation">

                    <img :src="icon.image" />
                </a>
            </div>
        </div>
    </div>
    <WebFooter />
</div>
</template>

<script setup>
import aws_icon from "@/assets/aws/AWS_Icon.png";
import amplify_icon from "@/assets/aws/AWS_Amplify_Icon.svg";
import cognito_icon from "@/assets/aws/AWS_Cognito_Icon.svg";
import s3_icon from "@/assets/aws/AWS_S3_Icon.svg";
import cloudfront_icon from "@/assets/aws/AWS_CloudFront_Icon.svg";
import route53_icon from "@/assets/aws/AWS_Route_53_Icon.svg";
import workmail_icon from "@/assets/aws/AWS_WorkMail_Icon.svg";

import AmazonSidebar from '@/components/sidebars/AmazonSidebar.vue';
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { AWS_BACKGROUND } from '@/stores/ParticlesConfig.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import { getMeta } from "@/stores/GetMeta.js";

onMounted(() => { webData.mountWebData(); });
const webData = useWebsiteDataStore();
const AWS_WEBSITE_LINK = "https://aws.amazon.com/";

/**
 * Navigates the user to the AWS Website.
 */
function goToAWSWebsite() {
    window.open(AWS_WEBSITE_LINK, "aws-website");
}

/**
 * This returns the classes for the main page container.
 */
function getPageContainerClasses() {
    return ["aws-page-section", "animate__animated", "animate__zoomIn"]
}

useHead(getMeta("Mohit Jain | Amazon Web Services (AWS)", "aws/",
    "I use Amazon Web Services for most of my projects, whether I need to host and deploy a website, " +
    "manage company emails, manage user authentication, or to create an app."
));

const SMALL_ICONS = [
    { image: amplify_icon, title: "AWS Amplify", webPath: "amplify/" },
    { image: cognito_icon, title: "Amazon Cognito", webPath: "cognito/" },
    { image: s3_icon, title: "Amazon Simple Storage Service", webPath: "s3/" },
    { image: cloudfront_icon, title: "Amazon CloudFront", webPath: "cloudfront/" },
    { image: route53_icon, title: "Amazon Route 53", webPath: "route53/" },
    { image: workmail_icon, title: "Amazon WorkMail", webPath: "workmail/" }
]
</script>

<style scoped>
#aws-page {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
.aws-page-section {
    padding-top: 50px;
    padding-bottom: 10px;
    height: 600px;
    min-height: calc(100vh - 120px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.aws-page-title {
    width: 100%;
    height: fit-content;
    padding-top: 20px;
    text-align: center;
    color: white;
    font-size: 120px;
    font-family: 'Lexend', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    --animate-duration: 1s;
}
.aws-page-mainDesc {
    color: white;
    height: fit-content;
    width: 800px;
    padding: 20px calc(50% - 400px);
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    text-align: center;
    --animate-duration: 1s;
}

.aws-page-title img {
    cursor: pointer;
    width: 90px;
    user-select: none;
    margin-right: 15px;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    border-radius: 12px;
    transition: var(--default-transition);
}
.aws-page-title img:hover {
    background-color: rgba(43, 43, 43, 0.5);
}

.aws-page-smallIcon-grid {
    height: fit-content;
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.aws-page-smallIcon {
    width: 130px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.aws-page-smallIcon-link {
    width: fit-content;
    width: fit-content;
    padding: 15px 15px 12px;
    border: 1px solid white;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: var(--default-transition);
}
.aws-page-smallIcon-link:hover {
    background-color: rgba(43, 43, 43, 0.5);
}
.aws-page-smallIcon-link img {
    width: 35px;
}

@media (max-width: 800px) {
    .aws-page-mainDesc {
        width: calc(100% - 40px);
        padding: 10px 0px;
    }
}

@media (max-width: 600px) {
    .aws-page-title {
        font-size: 70px;
    }
    .aws-page-title img {
        width: 70px;
    }

    .aws-page-mainDesc {
        font-size: 20px;
    }
    .aws-page-smallIcon-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 450px) {
    .aws-page-title span {
        display: none;
    }
    .aws-page-mainDesc {
        font-size: 18px;
    }
}
</style>