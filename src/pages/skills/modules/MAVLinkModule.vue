<template>
<client-only>
    <ModulesSidebar />
    <div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
        <InfoSector :sectorObj="MAVLINK_INFO_SECTOR" class="info-sector-v3" />
    </div>
</client-only>
</template>

<script setup>
import ModulesSidebar from '@/components/sidebars/ModulesSidebar.vue';
import InfoSector from '@/components/body-components/InfoSector.vue';

import { MAVLINK_INFO_SECTOR } from '@/stores/Objects.js';
import { initWebData, closeNavBarDropdown } from "@/stores/WebsiteData.js";
import { getMeta } from '@/stores/GetMeta.js';

import { onMounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | MAVLink Protocol", "skills/modules/mavlink",
    "I learned how to use the MAVLink Protoicol so that Worlds iVue can programmatically operate drones."
));
</script>