<template>
<InitPage :pageTitle="'Mohit Jain | Amazon Web Services (AWS)'" />
<AmazonSidebar />

<div class="personal-web-body personal-web-body-v2" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="AWS_INFO_SECTORS[0]" class="info-sector-v2" />
</div>
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';
import AmazonSidebar from '@/components/sidebars/AmazonSidebar.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { AWS_INFO_SECTORS } from '@/stores/Objects.js';
</script>