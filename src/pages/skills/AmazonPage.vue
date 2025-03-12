<template>
<NavigationMain />
<AmazonSidebar />

<client-only>
    <vue-particles id="particlests" :options="AWS_BACKGROUND"></vue-particles>
</client-only>

<div id="aws-page" class="personal-web-body" @click="webData.setNavBarDropdown(-1)">
    <client-only>
        <div id="start" class="aws-page-section">
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
        </div>
    </client-only>
    <WebFooter />
</div>
</template>

<script setup>
import aws_icon from "@/assets/aws/AWS_Icon.png";

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

useHead(getMeta("Mohit Jain | Amazon Web Services (AWS)", "aws/",
    "I use Amazon Web Services for most of my projects, whether I need to host and deploy a website, " +
    "manage company emails, manage user authentication, or to create an app."
));
</script>

<style scoped>
#aws-page {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
.aws-page-section {
    padding: 50px 0px 70px 0px;
    height: fit-content;
    min-height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.aws-page-mainDesc {
    color: white;
    height: fit-content;
    width: 800px;
    padding: 0px calc(50% - 400px);
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    text-align: center;
    --animate-duration: 1s;
}

.aws-page-title {
    width: 100%;
    height: fit-content;
    padding: 30px 0px;
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

@media (max-width: 800px) {
    .aws-page-mainDesc {
        width: calc(100% - 20px);
        padding: 0px 10px;
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
}
</style>