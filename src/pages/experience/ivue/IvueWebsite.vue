<template>
<InitPage :pageTitle="'Mohit Jain | iVue\'s Main Website'" />
<IvueWebSidebar />

<div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="IVUE_WEBSITE_INFO_SECTORS[1]" class="info-sector-v3" />
</div>
</template>

<script setup>
import InitPage from "@/components/InitPage.vue";
import IvueWebSidebar from "@/components/sidebars/IvueWebSidebar.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { IVUE_WEBSITE_INFO_SECTORS } from '@/stores/Objects.js';
</script>