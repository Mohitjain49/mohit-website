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
    var pathInvalid = true;

    for(let i = 0; i < IVUE_EXPERIENCE_PATHS.length; i++) {
        if(!pathInvalid) { break; }
        const pathObj = IVUE_EXPERIENCE_PATHS[i];

        if(pathObj.path === subRoute) {
            pathInvalid = false;
            sectorOpen.value = i;
            document.title = pathObj.docTitle;
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
        aliases: ["main", "me", ""],
        docTitle: "Mohit Jain | iVue"
    },
    {
        path: "web",
        aliases: ["website", "ivue-website", "main-website"],
        docTitle: "Mohit Jain | iVue's Main Website"
    },
    {
        path: "ivuemedia",
        aliases: ["media", "ivue-media"],
        docTitle: "Mohit Jain | iVue Media"
    },
    {
        path: "ivuerobotics",
        aliases: ["robotics", "ivue-robotics"],
        docTitle: "Mohit Jain | iVue Robotics"
    },
    {
        path: "worldsivue",
        aliases: ["wiv", "worlds-ivue"],
        docTitle: "Mohit Jain | Worlds iVue"
    }
]
</script>