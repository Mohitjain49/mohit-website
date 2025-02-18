<template>
<InitPage :pageTitle="'Mohit Jain | Frontend Development'" />
<FrontendSidebar />

<div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
    <InfoSector v-if="sectorOpen == 0" :sectorObj="VUE_INFO_SECTOR" class="info-sector-v3" />
    <InfoSector v-else-if="sectorOpen == 1" :sectorObj="ANGULAR_INFO_SECTOR" class="info-sector-v3" />
    <InfoSector v-else-if="sectorOpen == 2" :sectorObj="REACT_NATIVE_INFO_SECTOR" class="info-sector-v3" />
</div>
</template>

<script setup>
import InitPage from '@/components/InitPage.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';
import FrontendSidebar from "@/components/sidebars/FrontendSidebar.vue";

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { VUE_INFO_SECTOR, ANGULAR_INFO_SECTOR, REACT_NATIVE_INFO_SECTOR } from '@/stores/Objects.js';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const sectorOpen = ref(0);

onMounted(() => {
    const subRoute = route.params.id;

    if(subRoute == undefined) {
        sectorOpen.value = 0;
    } else if(subRoute === "vuejs") {
        sectorOpen.value = 0;
    } else if(subRoute === "angular") {
        sectorOpen.value = 1;
    } else if(subRoute === "reactnative") {
        sectorOpen.value = 2;
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