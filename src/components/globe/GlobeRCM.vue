<template>
<div class="right-click-menu" @contextmenu.prevent :style="globeStore.globeRCMHandler.rcmStyle">
    <div @click="activateOpt(0)" class="right-click-opt"
        :class="[((globeStore.rcmZoomPosition != null) ? '' : 'right-click-invalid-opt')]"
        v-html="'Zoom To Position'">
    </div>
    <div class="right-click-line"></div>

    <div class="right-click-opt" @click="activateOpt(2)">
        {{ ((globeStore.featureIndex == 1) ? 'Hide Website Routes' : 'Show Website Routes') }}
    </div>
    <div class="right-click-opt" @click="activateOpt(3)">
        {{ ((globeStore.featureIndex == 2) ? 'Hide Interests Menu' : 'Show Interests Menu') }}
    </div>
    <div class="right-click-opt" @click="activateOpt(4)" v-html="globeStore.geocoderBtnTitle"></div>
</div>
</template>

<script setup>
import "../../styles/globe/rcm.css";
import { useGlobeStore } from '../../stores/GlobeStore.js';
const globeStore = useGlobeStore();

/**
 * This runs an option based on the index and then closes the RCM.
 * @param {Number} index The index of the option.
 */
function activateOpt(index = -1) {
    if(index == 0) {
        globeStore.zoomToSelectedPosition();
    } else if(index == 4) {
        globeStore.setGeocoderDisplay();
    } else {
        globeStore.setFeatureIndex(index - 1);
    }
    globeStore.globeRCMHandler.setRCMOpen(-1);
}
</script>