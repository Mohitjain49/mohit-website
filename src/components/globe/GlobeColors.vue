<template>
<div class="globe-menu-container" @click="globeStore.closeRCM" @contextmenu="globeStore.closeRCM">
    <div class="globe-menu-title">
        <div style="width: 35px"></div>
        <div style="border-bottom: 2px solid var(--nav-bar-border);" v-html="'Colors'"></div>
        <font-awesome-icon icon="fa-x" class="globe-menu-xMark" @click="globeStore.setFeatureIndex()" />
    </div>
    <ColorMenu :globePage="true" class="wrapper-menu-styles" />
</div>
</template>

<script setup>
import ColorMenu from '../menus/ColorMenu.vue';
import { useGlobeStore } from '../../stores/GlobeStore.js';
const globeStore = useGlobeStore();
</script>