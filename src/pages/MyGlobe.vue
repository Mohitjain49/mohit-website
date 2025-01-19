<script setup>
import GlobeBar from '../components/globe/GlobeBar.vue';
import GlobeRoutes from '../components/globe/GlobeRoutes.vue';
import GlobePoints from '../components/globe/GlobePoints.vue';

import GlobeRCM from '../components/globe/GlobeRCM.vue';
import GlobeHover from '../components/globe/GlobeHover.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { useGlobeStore, CESIUM_GLOBE_ID, CESIUM_GEOCODER_ID } from '../stores/GlobeStore.js';
import { onMounted, onUnmounted } from 'vue';

const webData = useWebsiteDataStore();
const globeStore = useGlobeStore();

import '../styles/globe/globestyle.css';
import "../styles/globe/globemenus.css";

onMounted(() => {
    document.title = "Mohit Jain | My Globe";
    webData.mountWebData();
    globeStore.mountGlobeStore();
})
onUnmounted(() => {
    globeStore.unmountGlobeStore();
})
</script>

<template>
    <div :id="CESIUM_GLOBE_ID">
        <div :id="CESIUM_GEOCODER_ID" :style="globeStore.geocoderDisplay"
            @click="globeStore.closeRCM"
            @contextmenu="globeStore.closeRCM">
        </div>
    </div>

    <GlobeBar />
    <Transition name="globeMenuTransition" appear fade>
        <GlobeRoutes v-if="globeStore.featureIndex == 1" />
    </Transition>
    <Transition name="globeMenuTransition" appear fade>
        <GlobePoints v-if="globeStore.featureIndex == 2" />
    </Transition>

    <GlobeRCM v-if="globeStore.globeRCMHandler.rcmOpen == 0" />
    <GlobeHover v-if="globeStore.hoverPointHandler.title !== ''" />
</template>