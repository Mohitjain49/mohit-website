<template>
<InitPage :pageTitle="'Mohit Jain | iVue'" />
<IvueWebSidebar />

<div class="personal-web-body personal-web-body-v3" @click="closeNavBarDropdown()">
    <InfoSector :sectorObj="IVUE_WEBSITE_INFO_SECTORS[sectorOpen]" class="info-sector-v3" />
</div>
</template>

<script setup>
import InitPage from "@/components/InitPage.vue";
import IvueWebSidebar from "@/components/sidebars/IvueWebSidebar.vue";
import InfoSector from '@/components/body-components/InfoSector.vue';

import { closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { IVUE_WEBSITE_INFO_SECTORS } from '@/stores/Objects.js';

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const sectorOpen = ref(0);

onMounted(() => {
    const subRoute = route.params.id;
    var pathInvalid = true;

    for(let i = 0; i < IVUE_EXPERIENCE_PATHS.length; i++) {
        if(!pathInvalid) { break; }
        const pathObj = IVUE_EXPERIENCE_PATHS[i];

        if(pathObj.path === subRoute) {
            pathInvalid = false;
            sectorOpen.value = i;
        } else if(pathObj.aliases.findIndex(mainRoute => mainRoute === subRoute) != -1) {
            pathInvalid = false;
            router.push("/experience/ivue/" + pathObj.path);
        }
    }

    if(pathInvalid) { router.replace("/experience/invalid"); }
});

const IVUE_EXPERIENCE_PATHS = [
    {
        path: undefined,
        aliases: ["main", "me", ""]
    },
    {
        path: "web",
        aliases: ["website", "ivue-website", "main-website"]
    },
    {
        path: "ivuemedia",
        aliases: ["media", "ivue-media"]
    },
    {
        path: "ivuerobotics",
        aliases: ["robotics", "ivue-robotics"]
    },
    {
        path: "worldsivue",
        aliases: ["wiv", "worlds-ivue"]
    }
]
</script>