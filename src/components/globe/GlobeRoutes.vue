<template>
<div class="globe-menu-container" @click="globeStore.closeRCM" @contextmenu="globeStore.closeRCM">
    <div class="globe-menu-title">
        <div style="width: 35px"></div>
        <div style="border-bottom: 2px solid var(--nav-bar-border);" v-html="'Routes'"></div>
        <font-awesome-icon icon="fa-x" class="globe-menu-xMark" @click="globeStore.setFeatureIndex()" />
    </div>
    <RouteMenu :globePage="true" class="wrapper-menu-styles" />
    <RouterLink to="/resume" class="globe-menu-btn-container center-flex-display">
        <div class="globe-menu-btn" v-html="'See My Resume!'"></div>
    </RouterLink>
</div>
</template>

<script setup>
import RouteMenu from '../menus/RouteMenu.vue';
import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { useGlobeStore } from '../../stores/GlobeStore.js';

const webData = useWebsiteDataStore();
const globeStore = useGlobeStore();
</script>