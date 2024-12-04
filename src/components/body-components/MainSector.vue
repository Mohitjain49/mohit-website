<template>
<div class="main-content-sector">
    <div v-if="sectorObj.title !== ''" class="main-sector-title center-flex-display gradient-text" v-html="sectorObj.title"></div>
    <div v-else class="center-flex-display" style="height: 100px; width: 100%;">
        <div class="main-line"></div>
    </div>

    <div :class="sectorObj.gridClasses">
        <div v-for="section in sectorObj.content" class="main-sector-body-grid"
            :style="{ 'height': (String(45 + (section.points.length * 35)) + 'px') }">
            <div class="main-sector-subtitle" v-html="section.subtitle"></div>

            <a v-for="point in section.points" class="main-sector-point-container center-flex-display"
                :style="{ 'color': point.color,
                    'cursor': (point.link !== '') ? 'pointer' : 'default',
                    'margin-left': ((point.title === 'Vue.js' || point.faIcon) ? '4.2%' : (point.title === 'Sublo') ? '2%' : '1%')
                }"
                :href="((point.link !== '') ? point.link : '#')" :target="((point.link !== '') ? '_blank': '')">

                <font-awesome-icon v-if="point.faIcon" :icon="point.icon" />
                <img v-else :src="point.icon" :style="{ 'height': '60%',
                    'margin': ((point.title !== 'Vue.js') ? '0px 7px' : '0px')}"
                />
                
                <div class="main-sector-point-label"
                    v-html="point.title"
                    :style="{ 'margin-left': (point.title === 'Vue.js' || point.faIcon) ? '7px' : '0px' }">
                </div>
            </a>
        </div>
    </div>

    <div v-if="sectorObj.routePath !== ''" class="main-sector-bottom-linkBtn-container center-flex-display">
        <RouterLink :to="sectorObj.routePath" class="main-sector-bottom-linkBtn center-flex-display" v-html="sectorObj.routeBtn"></RouterLink>
    </div>
    <div v-else style="height: 100px; width: 100%;"></div>
</div>
</template>

<script setup>
import "../../styles/sectors/sectorstyles.css";
const props = defineProps({ sectorObj: Object });
</script>