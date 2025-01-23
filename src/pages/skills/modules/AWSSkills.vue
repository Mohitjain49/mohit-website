<template>
<AmazonSidebar />
<div class="personal-web-body personal-web-body-v2" @click="() => {webData.setNavBarDropdown(-1)}">
    <InfoSector :sectorObj="AWS_INFO_SECTORS[sectorOpen]" class="info-sector-v2" />
</div>
</template>

<script setup>
import InfoSector from '../../../components/body-components/InfoSector.vue';
import AmazonSidebar from '../../../components/sidebars/AmazonSidebar.vue';

import { useWebsiteDataStore } from '../../../stores/WebsiteData.js';
import { AWS_INFO_SECTORS } from '../../../stores/Objects.js';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const webData = useWebsiteDataStore();
const sectorOpen = ref(0);

onMounted(() => {
    var documentTitle = "Mohit Jain | Amazon Web Services (AWS)";
    webData.mountWebData();
    const subRoute = route.params.id;

    if(subRoute == undefined || subRoute == "main") {
        sectorOpen.value = 0;
        document.title = documentTitle;
    } else if(subRoute === "amplify") {
        sectorOpen.value = 1;
        document.title = (documentTitle + " | AWS Amplify");
    } else if(subRoute === "cognito") {
        sectorOpen.value = 2;
        document.title = (documentTitle + " | Amazon Cognito");
    } else if(subRoute === "s3" || subRoute === "simple-storage-service") {
        sectorOpen.value = 3;
        document.title = (documentTitle + " | Amazon S3");
    } else if(subRoute === "cloudfront") {
        sectorOpen.value = 4;
        document.title = (documentTitle + " | Amazon CloudFront");
    } else if(subRoute === "route53" || subRoute === "route-53") {
        sectorOpen.value = 5;
        document.title = (documentTitle + " | Amazon Route 53");
    } else if(subRoute === "CloudFront" || subRoute === "Cloudfront") {
        router.push("/skills/aws/cloudfront");
    }
    /*
    else if(subRoute === "dynamodb") {
        sectorOpen.value = 3;
        document.title = (documentTitle + " | Amazon DynamoDB");
    } else if(subRoute === "dynamo") {
        router.replace("/skills/aws/dynamodb");
    }
    */
    else {
        router.replace("/skills/invalid");
    }
});
</script>