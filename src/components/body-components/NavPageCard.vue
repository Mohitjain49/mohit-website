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
import { ref, onMounted, onUnmounted } from "vue";
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
    const color = props.sectorObj.color;
    document.getElementById(props.sectorObj.id).style.borderColor = color;
    document.getElementById(props.sectorObj.titleId).style.borderColor = color;
}

/**
 * This function runs whenever visitors' mouse leave the nav card.
 */
function onNavCardLeave() {
    const navBarBorder = "rgb(255, 115, 0)";
    document.getElementById(props.sectorObj.id).style.borderColor = navBarBorder;
    document.getElementById(props.sectorObj.titleId).style.borderColor = navBarBorder;
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

<style scoped>
.card-container {
    position: relative;
    width: 95%;
    height: 800px;
    left: 2.5%;
}

.nav-card {
    cursor: pointer;
    text-decoration: none;
    width: 90%;
    min-width: 290px;
    max-width: 400px;
    height: 92.5%;
    border: 3px solid var(--nav-bar-border);
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.5);
    transition: var(--default-transition);
    overflow: hidden;
    background: var(--sector-background);
}
.nav-card-header {
    width: 100%;
    height: 123px;
    border-bottom: 2px solid var(--nav-bar-border);
    transition: var(--default-transition);
    background: rgba(255, 255, 255, 0.1);
}

.nav-card-header-image {
    position: relative;
    width: 45px;
    margin-top: 1px;
}
.nav-card-header-faIcon {
    font-size: 45px;
}
.nav-card-header-text {
    font-size: 45px;
    margin-left: 10px;
    font-weight: bold;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
}

.nav-card-picture-carousel {
    width: 100%;
    height: 240px;
}
.nav-card-picture-container {
    width: 100%;
    height: 225px;
}
.nav-card-picture {
    padding: 5px;
    border-radius: 10px;
}

.nav-card-picture-bars-container {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-card-picture-bar-wrapper {
    height: 100%;
    max-width: 100px;
}
.nav-card-picture-bar {
    width: 90%;
    max-width: 50px;
    height: 7px;
    border: 2px solid var(--nav-bar-border);
    border-radius: 7px;
    transition: background-color 0.5s;
}

.nav-card-desc-container {
    margin-top: 15px;
    height: 140px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
}
.nav-card-desc {
    width: 95%;
    height: auto;
    text-align: center;
    font-weight: bold;
    font-family: 'Calibri', 'Trebuchet MS', sans-serif;
    font-size: 18px;
}

.nav-card-bullet-points {
    margin: 20px;
    font-family: 'Calibri', 'Trebuchet MS', sans-serif;
    font-size: 18px;
}
.nav-card-bullet-points-title {
    position: relative;
    font-size: 22px;
    font-weight: bold;
    border-bottom: 2px dashed;
    width: fit-content;
    margin-bottom: 7px;
    right: 15px;
}
.experience-bullet-point {
    height: 25px;
}

.navPictureTransition-enter-active, .navPictureTransition-leave-active {
    transition: opacity 0.5s ease;
}
.navPictureTransition-enter-from, .navPictureTransition-leave-to {
    opacity: 0;
}
.navPictureTransition-enter-to, .navPictureTransition-leave-from {
    opacity: 1;
}
</style>