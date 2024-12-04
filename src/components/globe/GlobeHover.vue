<template>
<div class="right-click-menu" style="width: 100px;"
    @contextmenu="globeStore.closeRCM()"
    :style="globeStore.hoverPointHandler.position"
    @mouseleave="globeStore.hoverPointHandler.setTitle('')">

    <div class="hover-box-title center-flex-display">
        {{ globeStore.hoverPointHandler.title }}
    </div>
</div>
</template>

<script setup>
import "../../styles/globe/rcm.css";
import { useGlobeStore } from '../../stores/GlobeStore.js';
const globeStore = useGlobeStore();
</script>