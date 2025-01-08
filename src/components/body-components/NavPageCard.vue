<template>
<div class="card-container center-flex-display">
    <RouterLink :to="sectorObj.route" :id="sectorObj.id" class="nav-card"
        @mouseenter="onNavCardHover"
        @mouseleave="onNavCardLeave">

        <div :id="sectorObj.titleId" class="nav-card-header center-flex-display">
            <font-awesome-icon v-if="sectorObj.title.faIcon"
                class="nav-card-header-faIcon"
                :icon="sectorObj.title.icon"
                :style="{ 'color': sectorObj.title.color, 'font-size': sectorObj.title.size }"
            />
            <img v-else class="nav-card-header-image" :src="sectorObj.title.icon" :style="{ 'width': sectorObj.title.size }" />

            <div :class="[ 'nav-card-header-text', sectorObj.title.extraClass ]" v-html="sectorObj.title.text"
                :style="{ [sectorObj.title.colorType]: sectorObj.title.color, 'fontSize': sectorObj.title.size }">
            </div>
        </div>

        <div class="nav-card-picture-carousel">
            <div class="nav-card-picture-container center-flex-display">
                <Transition name="navPictureTransition" mode="out-in">
                    <img :src="sectorObj.pictures[pictureShown].image"
                        :width="sectorObj.pictures[pictureShown].width"
                        :style="getPictureBackground(sectorObj.pictures[pictureShown].width)"
                        :key="pictureShown"
                        class="nav-card-picture"
                    />
                </Transition>
            </div>
            <div class="nav-card-picture-bars-container">
                <div v-for="picture in sectorObj.pictures"
                    class="nav-card-picture-bar-wrapper center-flex-display"
                    :style="{ 'width': 'calc(100% / ' + sectorObj.pictures.length  + ')' }">

                    <div :class="['nav-card-picture-bar', sectorObj.pictureBarClass]"></div>
                </div>
            </div>
        </div>

        <div class="nav-card-desc-container center-flex-display">
            <div class="nav-card-desc center-flex-display"
                v-html="sectorObj.desc"
                :style="{ 'color': sectorObj.color }">
            </div>
        </div>

        <ul class="nav-card-bullet-points" :style="{ 'color': sectorObj.color }">
            <div class="nav-card-bullet-points-title" v-html="sectorObj.pointsTitle"></div>
            <li class="experience-bullet-point" v-for="point in sectorObj.bulletPoints"
                v-html="point">
            </li>
        </ul>
    </RouterLink>
</div>
</template>

<script setup>
import "../../styles/nav/navcards.css";
import { useWebsiteDataStore } from "../../stores/WebsiteData.js";
import { ref, onMounted, onUnmounted } from "vue";

const webData = useWebsiteDataStore();
const props = defineProps({ sectorObj: Object });

const pictureShown = ref(0);
var pictureInterval = null;

onMounted(() => {
    document.getElementsByClassName(props.sectorObj.pictureBarClass).item(0).style.backgroundColor = props.sectorObj.color;
    if(props.sectorObj.pictures.length > 1) { setPictureInterval(); }
})
onUnmounted(() => { removePictureInterval(); })

/**
 * This function occurs whenever visitors hovers over the nav card.
 */
function onNavCardHover() {
    webData.colorHandler.onNavCardHover(
        props.sectorObj.id,
        props.sectorObj.titleId,
        props.sectorObj.color
    );
}

/**
 * This function runs whenever visitors' mouse leave the nav card.
 */
function onNavCardLeave() {
    webData.colorHandler.onNavCardLeave(
        props.sectorObj.id,
        props.sectorObj.titleId
    );
}

/**
 * This is the function that runs within the interval.
 */
function pictureIntervalFunc() {
    document.getElementsByClassName(props.sectorObj.pictureBarClass).item(pictureShown.value).style.backgroundColor = "rgba(0, 0, 0, 0)";
    pictureShown.value = ((pictureShown.value + 1) % props.sectorObj.pictures.length);
    document.getElementsByClassName(props.sectorObj.pictureBarClass).item(pictureShown.value).style.backgroundColor = props.sectorObj.color;
}
 
/**
 * This sets the picture interval to toggle between the pictures.
 */
function setPictureInterval() {
    if(pictureInterval != null) { return; }
    pictureInterval = setInterval(() => { pictureIntervalFunc(); }, 5000);
}

/**
 * This removes the picture interval from being used.
 */
function removePictureInterval() {
    if(pictureInterval == null) { return; }
    clearInterval(pictureInterval);
    pictureInterval = null;
}

/**
 * This function returns the background of a picture.
 * @param {String} picWidth The width of the picture.
 */
function getPictureBackground(picWidth = "50%") {
    const obj = { backgroundColor: "none" }
    if(picWidth === "51%" || picWidth === "41%" || picWidth === "76%") {
        obj.backgroundColor = "white";
    } else if(picWidth === "49%" || picWidth === "39%") {
        obj.backgroundColor = "black";
    }

    return obj;
}
</script>