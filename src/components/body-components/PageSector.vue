<template>
<div class="page-sector center-flex-display" :style="{ 'background': sectorObj.style.background }">
    <div v-if="!sectorObj.text.leftSide && webData.sectorTextWidth.width === '50%'"
        class="page-sector-half center-flex-display">

        <img v-for="image in sectorObj.images"
            class="page-sector-img"
            :src="image.asset"
            :style="image.style"
        />
    </div>

    <div class="page-sector-half center-flex-display" :style="webData.sectorTextWidth">
        <div class="page-sector-title" :style="{ 'color': sectorColor }" v-html="sectorObj.text.title"></div>
        <div class="page-sector-desc" :style="{ 'color': sectorColor }" v-html="sectorObj.text.desc"></div>

        <div v-for="btn in sectorObj.buttons" class="page-sector-btn-container">
            <RouterLink v-if="btn.nativeRoute" :to="btn.route"
                class="page-sector-btn"
                v-html="btn.title"
                :style="{ 'color': sectorColor }">
            </RouterLink>
            <a v-else :href="btn.route" target="_blank"
                class="page-sector-btn"
                v-html="btn.title"
                :style="{ 'color': sectorColor }">
            </a>
        </div>
    </div>

    <div v-if="sectorObj.text.leftSide && webData.sectorTextWidth.width === '50%'"
        class="page-sector-half center-flex-display">
        
        <img v-for="image in sectorObj.images"
            class="page-sector-img"
            :src="image.asset"
            :style="image.style"
        />
    </div>
</div>
</template>

<script setup>
import "../../styles/sectors/sectorstyles.css";
import { useWebsiteDataStore } from "../../stores/WebsiteData.js";

const webData = useWebsiteDataStore();
const props = defineProps({ sectorObj: Object });
const sectorColor = props.sectorObj.style.fontColor;
</script>