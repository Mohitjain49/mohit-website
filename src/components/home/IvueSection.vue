<template>
<div id="ivue"></div>
<div class="ivue-section">
    <div class="ivue-section-title">
        <img :src="ivue_white_text" draggable="false" />
    </div>
    <div class="ivue-section-tabs-container">
        <a :href="Links.WORLDS_IVUE_LINK" id="wiv-tab" class="ivue-section-tab"
            @mouseenter="onIvueTabHover('wiv-tab')"
            @mouseleave="onIvueTabLeave('wiv-tab')">

            <img :src="wiv_banner" width="225" />
            <p>
                Worlds iVue is a 3D geospatial platform that functions as a ground control station for iVue's "Develop Air" Drones. 
                It's Dev Stack, amongst other modules, contains Vue.js, Cesium, MAVLink, and Amazon Web Services.
            </p>
        </a>
        <a :href="Links.MAIN_IVUE_WEBSITE_LINK" id="main-tab" class="ivue-section-tab"
            @mouseenter="onIvueTabHover('main-tab')"
            @mouseleave="onIvueTabLeave('main-tab')">

            <img :src="ivue_white_text" width="68" />
            <p>
                iVue provides a broad range of products and services through its multiple subsidiaries. 
                As iVue's Lead Developer, I founded and currently lead iVue's Website Development Team. 
                I also oversee iVue's usage of Amazon Web Services.
            </p>
        </a>
        <a :href="Links.IVUE_MEDIA_WEBSITE_LINK" id="media-tab" class="ivue-section-tab"
            @mouseenter="onIvueTabHover('media-tab')"
            @mouseleave="onIvueTabLeave('media-tab')">

            <img :src="ivue_media_banner" width="175" />
            <p>
                iVue Media offers photography, videography, and content creation services to our clients. 
                Apart from designing, developing, and deploying iVue Media's Website, 
                the Worlds iVue Development Team is currently creating an app for iVue Media on Worlds iVue.
            </p>
        </a>
        <a :href="Links.IVUE_ROBOTICS_WEBSITE_LINK" id="robotics-tab" class="ivue-section-tab"
            @mouseenter="onIvueTabHover('robotics-tab')"
            @mouseleave="onIvueTabLeave('robotics-tab')">

            <img :src="ivue_robotics_banner" width="190" />
            <p>
                iVue Robotics build Drone Hardware for the future. 
                We've made a selection of "Develop Air" drone models and ModKits to boost drone capabilities. 
                Now, you can order a drone directly on the website.
            </p>
        </a>
    </div>
</div>
</template>

<script setup>
import * as Links from "@/stores/Objects.js";
import ivue_white_text from "@/assets/ivue/iVue_White_Text_Cropped.png";
import wiv_banner from "@/assets/ivue/Worlds_iVue_Banner.png";
import ivue_media_banner from "@/assets/ivue/iVue_Media_Banner.png";
import ivue_robotics_banner from "@/assets/ivue/iVue_Robotics_Banner.png";

/**
 * This function adds an animation when the visitor hovers over a tab.
 * @param {Number} index The index of the tab.
 */
function onIvueTabHover(id = "main-tab") {
    document.getElementById(id).classList.add('animate__animated', 'animate__shakeY');
}

/**
 * This function removes an animation when the visitor leaves a tab.
 * @param {Number} index The index of the tab.
 */
function onIvueTabLeave(id = "main-tab") {
    document.getElementById(id).classList.remove('animate__animated', 'animate__shakeY');
}
</script>

<style scoped>
#ivue {
    height: 50px;
    width: 100%;
    background: linear-gradient(to top, #232323 0%, var(--blue-zero) 100%);
}
.ivue-section {
    height: fit-content;
    min-height: 800px;
    width: 100%;
    background-color: #232323;
}

.ivue-section-title {
    width: 100%;
    height: 125px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ivue-section-title img {
    height: 115px;
    user-select: none;
}

.ivue-section-tabs-container {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.ivue-section-tab {
    cursor: pointer;
    width: 90%;
    max-width: 1100px;
    height: 145px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    transition: box-shadow 0.35s;
    color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
}
.ivue-section-tab:hover {
    box-shadow: 0px 0px 15px 15px rgba(255, 255, 255, 0.25);
}

.ivue-section-tab img {
    padding-left: 15px;
}
.ivue-section-tab p {
    color: inherit;
    height: fit-content;
    width: calc(100% - 30px);
    padding: 0px 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    text-align: left;
}

.ivue-section-tab#wiv-tab {
    color: #48A548;
    border-color: #48A548;
}
.ivue-section-tab#wiv-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(72, 165, 72, 0.25);
}

.ivue-section-tab#media-tab {
    color: #d7bc84;
    border-color: #d7bc84;
}
.ivue-section-tab#media-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(215, 188, 132, 0.25);
}

.ivue-section-tab#robotics-tab {
    color: #ab0f14;
    border-color: #ab0f14;
}
.ivue-section-tab#robotics-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(171, 15, 20, 0.25);
}

.ivue-section-tab#news-tab {
    color: #0071bc;
    border-color: #0071bc;
}
.ivue-section-tab#news-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(0, 113, 188, 0.25);
}

@media (max-width: 850px) {
    .ivue-section-tab p {
        font-size: 16px;
    }
}
@media (max-width: 600px) {
    .ivue-section-title img {
        height: 80px;
    }
    .ivue-section-tabs-container {
        height: 900px;
    }
    .ivue-section-tab {
        height: 175px;
    }
    .ivue-section-tab p {
        font-size: 15px;
    }
}
@media (max-width: 500px) {
    .ivue-section-tab {
        width: 87.5%;
    }
    .ivue-section-tab p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
    }
}
</style>