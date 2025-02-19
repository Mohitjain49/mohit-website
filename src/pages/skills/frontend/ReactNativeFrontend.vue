<template>
<InitPage :pageTitle="'Mohit Jain | React Native'" />
<FrontendSidebar />

<div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="REACT_NATIVE_INFO_SECTOR" class="info-sector-v3" />
</div>
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';
import FrontendSidebar from "@/components/sidebars/FrontendSidebar.vue";

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { REACT_NATIVE_INFO_SECTOR } from '@/stores/Objects.js';
</script>