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
import { useWebsiteDataStore } from "../../stores/WebsiteData.js";
const webData = useWebsiteDataStore();
const props = defineProps({ sectorObj: Object });
const sectorColor = props.sectorObj.style.fontColor;
</script>

<style scoped>
.page-sector {
    position: relative;
    left: calc(5% - 6px);
    width: 90%;
    height: 800px;
    padding: 20px 0px;
    margin: 50px 0px;
    border: 3px solid var(--website-text);
    border-radius: 20px;
}
.page-sector-half {
    width: 50%;
    max-width: 1250px;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
}

.page-sector-title {
    font-size: 55px;
    font-weight: bold;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
    color: rgb(7, 89, 197);
}
.page-sector-desc {
    width: 90%;
    max-width: 800px;
    margin-top: 20px;
    font-size: 25px;
    font-family: monospace;
    text-align: center;
    color: rgb(7, 89, 197);
}

.page-sector-btn-container {
    margin-top: 20px;
    padding: 12px 20px;
    height: fit-content;
    width: fit-content;
}
.page-sector-btn {
    cursor: pointer;
    width: fit-content;
    padding: 12px 20px;
    border: 2px solid;
    border-radius: 15px;
    font-size: 18px;
    font-weight: bold;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    transition: padding 0.2s, background-color 0.2s;
}
.page-sector-btn:hover {
    padding: 15px 20px;
    background-color: rgba(0, 0, 0, 0.15);
}

.page-sector-img {
    width: 70%;
}

@media (max-width: 625px) {
    .page-sector {
        left: calc(7.5% - 6px);
        width: 85%;
    }
    .page-sector-btn {
        font-size: 16px;
    }
}
</style>