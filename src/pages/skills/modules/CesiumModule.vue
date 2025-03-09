<template>
<client-only>
    <ModulesSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="CESIUM_INFO_SECTOR" class="info-sector-v3" />
    </div>
</client-only>
</template>

<script setup>
import ModulesSidebar from '@/components/sidebars/ModulesSidebar.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';

import { CESIUM_INFO_SECTOR } from '@/stores/Objects.js';
import { initWebData, closeNavBarDropdown } from "@/stores/WebsiteData.js";
import { getMeta } from '@/stores/GetMeta.js';

import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Cesium", "skills/modules/cesium",
    "I learned how to use Cesium to create Worlds iVue and My Personal Globe."
));
</script>