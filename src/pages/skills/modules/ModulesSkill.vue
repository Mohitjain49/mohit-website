<template>
<ModulesSidebar />
<div class="personal-web-body personal-web-body-v3" @click="() => {webData.setNavBarDropdown(-1)}">
    <InfoSector v-if="sectorOpen == 0" :sectorObj="CESIUM_INFO_SECTOR" class="info-sector-v3" />
    <InfoSector v-if="sectorOpen == 1" :sectorObj="MAVLINK_INFO_SECTOR" class="info-sector-v3" />
</div>
</template>

<script setup>
import ModulesSidebar from '../../../components/sidebars/ModulesSidebar.vue';
import InfoSector from '../../../components/body-components/InfoSector.vue';

import { useWebsiteDataStore } from '../../../stores/WebsiteData.js';
import { MAVLINK_INFO_SECTOR, CESIUM_INFO_SECTOR } from '../../../stores/Objects.js';

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const webData = useWebsiteDataStore();
const sectorOpen = ref(0);

onMounted(() => {
    webData.mountWebData();
    const subRoute = route.params.id;

    if(subRoute == undefined || subRoute === "cesium") {
        sectorOpen.value = 0;
        document.title = "Mohit Jain | Modules | Cesium";
    } else if(subRoute === "mavlink") {
        sectorOpen.value = 1;
        document.title = "Mohit Jain | Modules | MAVLink Protocol";
    } else if(subRoute === "mavlink-protocol") {
        router.replace("/skills/modules/mavlink");
    } else {
        router.replace("/skills/invalid");
    }
})
</script>