<template>
<client-only>
    <FrontendSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="ANGULAR_INFO_SECTOR" class="info-sector-v3" />
    </div>
</client-only>
</template>

<script setup>
import FrontendSidebar from "@/components/sidebars/FrontendSidebar.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';

import { ANGULAR_INFO_SECTOR } from '@/stores/Objects.js';
import { initWebData, closeNavBarDropdown } from "@/stores/WebsiteData.js";
import { getMeta } from "@/stores/GetMeta.js";

import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Angular", "skills/frontend/angular",
    "Angular is Google's primary web development framework that I learned for one of my projects."
));
</script>