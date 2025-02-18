<template>
<InitPage :pageTitle="'Mohit Jain | Sublo'" />
<NavigationMain />

<div class="personal-web-body" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="SUBLO_INFO_SECTOR" />
</div>
</template>

<script setup>
import InitPage from "@/components/InitPage.vue";
import NavigationMain from "@/components/NavigationMain.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { SUBLO_INFO_SECTOR } from '@/stores/Objects.js';
</script>