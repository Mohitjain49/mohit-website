<template>
<div class="skill-sidebar-container skill-sidebar aws-sidebar">
    <div class="skill-sidebar-container">
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('main')" title="Amazon Web Services">
            <img :src="aws_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('amplify')" title="AWS Amplify">
            <img :src="amplify_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('cognito')" title="Amazon Cognito">
            <img :src="cognito_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('s3')" title="Amazon S3">
            <img :src="s3_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('cloudfront')" title="Amazon CloudFront">
            <img :src="cloudfront_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('route53')" title="Amazon Route 53">
            <img :src="route53_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        <!--
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('dynamodb')" title="Amazon DynamoDB">
            <img :src="dynamo_db_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        -->
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
import { useRouter } from "vue-router";

const router = useRouter();
const AWS_ICONS_LINK = "https://aws-icons.com/";

/**
 * This function navigates to specific aws pages for the user.
 * @param subRoute The subroute within the aws path.
 */
function navigateAmazonPages(subRoute = "") {
    router.push("/skills/aws/" + subRoute);
}
</script>