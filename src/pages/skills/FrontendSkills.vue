<template>
    <FrontendSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="() => {webData.setNavBarDropdown(-1)}">
        <InfoSector v-if="sectorOpen == 0" :sectorObj="VUE_INFO_SECTOR" class="info-sector-v3" />
        <InfoSector v-else-if="sectorOpen == 1" :sectorObj="ANGULAR_INFO_SECTOR" class="info-sector-v3" />
        <InfoSector v-else-if="sectorOpen == 2" :sectorObj="REACT_NATIVE_INFO_SECTOR" class="info-sector-v3" />
    </div>
</template>

<script setup>
import "../../styles/sectors/infosectorstyles.css";
import InfoSector from '../../components/body-components/InfoSector.vue';
import FrontendSidebar from "../../components/sidebars/FrontendSidebar.vue";

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { VUE_INFO_SECTOR, ANGULAR_INFO_SECTOR, REACT_NATIVE_INFO_SECTOR } from '../../stores/Objects.js';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const webData = useWebsiteDataStore();
const sectorOpen = ref(0);

onMounted(() => {
    var documentTitle = "Mohit Jain | Frontend Development";
    webData.mountWebData();
    const subRoute = route.params.id;

    if(subRoute == undefined) {
        sectorOpen.value = 0;
        document.title = documentTitle;
    } else if(subRoute === "vuejs") {
        sectorOpen.value = 0;
        document.title = (documentTitle + " | Vue.js");
    } else if(subRoute === "angular") {
        sectorOpen.value = 1;
        document.title = (documentTitle + " | Angular");
    } else if(subRoute === "reactnative") {
        sectorOpen.value = 2;
        document.title = (documentTitle + " | React Native");
    } else if(subRoute === "vue") {
        router.replace("/skills/frontend/vuejs");
    } else if(subRoute === "angularjs") {
        router.replace("/skills/frontend/angular");
    } else if(subRoute === "react") {
        router.replace("/skills/frontend/reactnative");
    } else {
        router.replace("/skills/invalid");
    }
});
</script>