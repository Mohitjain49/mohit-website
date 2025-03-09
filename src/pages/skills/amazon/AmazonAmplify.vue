<template>
<client-only>
    <AmazonSidebar />
    <div class="personal-web-body personal-web-body-v2" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="AWS_INFO_SECTORS[1]" class="info-sector-v2" />
    </div>
</client-only>
</template>

<script setup>
import InfoSector from '@/components/body-components/InfoSector.vue';
import AmazonSidebar from '@/components/sidebars/AmazonSidebar.vue';

import { AWS_INFO_SECTORS } from '@/stores/Objects.js';
import { initWebData, closeNavBarDropdown } from "@/stores/WebsiteData.js";
import { getMeta } from '@/stores/GetMeta.js';

import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | AWS Amplify", "skills/aws/amplify"));
</script>