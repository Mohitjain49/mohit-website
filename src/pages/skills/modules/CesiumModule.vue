<template>
<InitPage :pageTitle="'Mohit Jain | Cesium'" />
<ModulesSidebar />

<div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="CESIUM_INFO_SECTOR" class="info-sector-v3" />
</div>
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import ModulesSidebar from '@/components/sidebars/ModulesSidebar.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { CESIUM_INFO_SECTOR } from '@/stores/Objects.js';
</script>