<template>
    <IvueWebSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="() => {webData.setNavBarDropdown(-1)}">
        <InfoSector :sectorObj="IVUE_WEBSITE_INFO_SECTORS[sectorOpen]" class="info-sector-v3" />
    </div>
</template>

<script setup>
import "../../styles/sectors/infosectorstyles.css";
import IvueWebSidebar from "../../components/sidebars/IvueWebSidebar.vue";
import InfoSector from '../../components/body-components/InfoSector.vue';

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { IVUE_WEBSITE_INFO_SECTORS } from '../../stores/Objects.js';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const webData = useWebsiteDataStore();
const sectorOpen = ref(0);

onMounted(() => {
    webData.mountWebData();
    const subRoute = route.params.id;

    if(subRoute == undefined || subRoute === "main" || subRoute === "me") {
        sectorOpen.value = 0;
        document.title = "Mohit Jain | iVue";
    } else if(subRoute === "website" || subRoute === "web") {
        sectorOpen.value = 1;
        document.title = "Mohit Jain | iVue Websites";
    } else if(subRoute === "media") {
        sectorOpen.value = 2;
        document.title = "Mohit Jain | iVue Media";
    } else if(subRoute === "worldsivue" || subRoute === "wiv" || subRoute === "worlds-ivue") {
        sectorOpen.value = 3;
        document.title = "Mohit Jain | Worlds iVue";
    } else {
        router.replace("/experience/invalid");
    }
})
</script>