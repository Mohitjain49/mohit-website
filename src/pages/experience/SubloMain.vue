<template>
    <NavigationMain />
    <div class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
        <InfoSector :sectorObj="SUBLO_INFO_SECTOR" />
    </div>
</template>

<script setup>
import "../../styles/sectors/infosectorstyles.css";
import NavigationMain from "../../components/NavigationMain.vue";
import InfoSector from '../../components/body-components/InfoSector.vue';

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { SUBLO_INFO_SECTOR } from '../../stores/Objects.js';

import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    webData.mountWebData();
    document.title = "Mohit Jain | Sublo";
})
</script>