<template>
<div class="globe-menu-container" @click="globeStore.closeRCM" @contextmenu="globeStore.closeRCM">
    <div class="globe-menu-title">
        <div style="width: 35px"></div>
        <div style="border-bottom: 2px solid var(--nav-bar-border);" v-html="'Interests'"></div>
        <font-awesome-icon icon="fa-x" class="globe-menu-xMark" @click="globeStore.setFeatureIndex()" />
    </div>

    <div class="globe-menu-body">
        <div v-for="(interest, index) in INTEREST_POINTS" :key="interest.title"
            class="points-menu-tab"
            @click="globeStore.callZoomToPoint(index)"
            :style="{ 'height': 'calc((100% / ' + INTEREST_POINTS.length + ') - 0.5px)' }">
        
            <div class="point-menu-tab-half center-flex-display">
                <img :src="interest.image" width="100" />
            </div>
            <div class="point-menu-tab-half center-flex-display">
                <div class="point-menu-tab-location" v-html="interest.location"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useGlobeStore, INTEREST_POINTS } from '../../stores/GlobeStore.js';
const globeStore = useGlobeStore();
</script>