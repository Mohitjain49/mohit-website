<template>
<InitPage :pageTitle="'Mohit Jain | Modules'" />
<ModulesSidebar />

<div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
    <InfoSector v-if="sectorOpen == 0" :sectorObj="CESIUM_INFO_SECTOR" class="info-sector-v3" />
    <InfoSector v-if="sectorOpen == 1" :sectorObj="MAVLINK_INFO_SECTOR" class="info-sector-v3" />
</div>
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import ModulesSidebar from '@/components/sidebars/ModulesSidebar.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { MAVLINK_INFO_SECTOR, CESIUM_INFO_SECTOR } from '@/stores/Objects.js';

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const sectorOpen = ref(0);

onMounted(() => {
    const subRoute = route.params.id;

    if(subRoute == undefined || subRoute === "cesium") {
        sectorOpen.value = 0;
    } else if(subRoute === "mavlink") {
        sectorOpen.value = 1;
    } else if(subRoute === "mavlink-protocol") {
        router.replace("/skills/modules/mavlink");
    } else {
        router.replace("/skills/invalid");
    }
})
</script>