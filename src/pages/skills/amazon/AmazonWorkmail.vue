<template>
<AmazonSidebar />
<InitPage :pageTitle="'Mohit Jain | Amazon Web Services (AWS) | Amazon WorkMail'" />

<div class="personal-web-body personal-web-body-v2" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="AWS_INFO_SECTORS[6]" class="info-sector-v2" />
</div>
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';
import AmazonSidebar from '@/components/sidebars/AmazonSidebar.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { AWS_INFO_SECTORS } from '@/stores/Objects.js';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const sectorOpen = ref(0);

onMounted(() => {
    const subRoute = route.params.id;

    if(subRoute == undefined || subRoute == "main") {
        sectorOpen.value = 0;
    } else if(subRoute === "amplify") {
        sectorOpen.value = 1;
    } else if(subRoute === "cognito") {
        sectorOpen.value = 2;
    } else if(subRoute === "s3" || subRoute === "simple-storage-service") {
        sectorOpen.value = 3;
    } else if(subRoute === "cloudfront") {
        sectorOpen.value = 4;
    } else if(subRoute === "route53" || subRoute === "route-53") {
        sectorOpen.value = 5;
    } else if(subRoute === "workmail") {
        sectorOpen.value = 6;
    } else if(subRoute === "CloudFront" || subRoute === "Cloudfront") {
        router.push("/skills/aws/cloudfront");
    } else if(subRoute === "WorkMail" || subRoute === "Workmail") {
        router.push("/skills/aws/workmail");
    } else {
        router.replace("/skills/invalid");
    }
});
</script>