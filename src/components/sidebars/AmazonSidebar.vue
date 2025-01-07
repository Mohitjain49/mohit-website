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
        <!--
        <div class="skill-sidebar-opt aws-sidebar-opt center-flex-display" @click="navigateAmazonPages('dynamodb')" title="Amazon DynamoDB">
            <img :src="dynamo_db_icon" class="skill-sidebar-opt-icon" draggable="false" />
        </div>
        -->
    </div>
    <div class="skill-sidebar-container">
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

import aws_icon from "@/assets/modules/AWS_Icon.png"
import amplify_icon from "@/assets/modules/AWS_Amplify_Icon.svg";
import cognito_icon from "@/assets/modules/AWS_Cognito_Icon.svg";

// WILL BE REINSTATED IN A LATER DATE.
// import dynamo_db_icon from "@/assets/modules/AWS_Dynamo_DB_Icon.svg";

import { WORLDS_IVUE_LINK } from "@/stores/Objects.js";
import { useRouter } from "vue-router";
const router = useRouter();

/**
 * This function navigates to specific aws pages for the user.
 * @param subRoute The subroute within the aws path.
 */
function navigateAmazonPages(subRoute = "") {
    router.push("/skills/aws/" + subRoute);
}
</script>