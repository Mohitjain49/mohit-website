<template>
<div class="web-navBar globe-bar" @click="globeStore.closeRCM" @contextmenu="globeStore.closeRCM">
    <div class="web-navBar-links-section center-flex-display" style="width: 600px;">
        <div class="center-flex-display web-navBar-opt globe-bar-opt"
            @click="globeStore.setFeatureIndex(0)"
            :title="((globeStore.featureIndex == 0) ? 'Hide Available Colors' : 'Show Available Colors')">

            <font-awesome-icon icon="fa-palette" />
            <div class="globe-bar-opt-text">Color</div>
        </div>
        <div class="center-flex-display web-navBar-opt globe-bar-opt"
            @click="globeStore.setFeatureIndex(1)"
            :title="((globeStore.featureIndex == 1) ? 'Hide Website Routes' : 'Show Website Routes')">

            <font-awesome-icon icon="fa-list" />
            <div class="globe-bar-opt-text">Routes</div>
        </div>
        <div class="center-flex-display web-navBar-opt globe-bar-opt"
            @click="globeStore.setFeatureIndex(2)"
            :title="((globeStore.featureIndex == 2) ? 'Hide Interests Menu' : 'Show Interests Menu')">

            <font-awesome-icon icon="fa-map-pin" />
            <div class="globe-bar-opt-text">Interests</div>
        </div>
        <div class="center-flex-display web-navBar-opt globe-bar-opt"
            @click="globeStore.setGeocoderDisplay()"
            :title="globeStore.geocoderBtnTitle">

            <font-awesome-icon icon="fa-magnifying-glass" />
            <div class="globe-bar-opt-text">Search</div>
        </div>
    </div>
</div>
</template>

<script setup>
import "../../styles/sectors/barstyles.css";
import { useGlobeStore } from "../../stores/GlobeStore.js";
const globeStore = useGlobeStore();
</script>