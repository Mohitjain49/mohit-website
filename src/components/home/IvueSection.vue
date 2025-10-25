<template>
<div id="ivue" class="ivue-section" ref="ivue">
    <div id="ivue-section-title">
        <a :href="MAIN_IVUE_WEBSITE_LINK" target="ivue" title="Explore iVue">
            <img :src="ivue_white_text" draggable="false" />
        </a>
    </div>
    <div class="ivue-section-tabs-container">
        <a :href="WORLDS_IVUE_LINK" id="wiv-tab" class="ivue-section-tab"
            @pointerenter="setPulseTwiceAnimation"
            @mouseleave="setPulseTwiceAnimation">

            <img :src="wiv_banner" width="225" />
            <p>
                Worlds iVue is a 3D geospatial platform that functions as a ground control station for iVue's "Develop Air" Drones. 
                It's Dev Stack, amongst other modules, contains Vue.js, Cesium, MAVLink, and Amazon Web Services.
            </p>
        </a>
        <a :href="MAIN_IVUE_WEBSITE_LINK" id="main-tab" class="ivue-section-tab"
            @pointerenter="setPulseTwiceAnimation"
            @mouseleave="setPulseTwiceAnimation">

            <img :src="ivue_white_text" width="68" />
            <p>
                iVue provides a broad range of products and services through its multiple subsidiaries. 
                As iVue's Lead Developer, I founded and currently lead iVue's Website Development Team. 
                I also oversee iVue's usage of Amazon Web Services.
            </p>
        </a>
        <a :href="IVUE_MEDIA_WEBSITE_LINK" id="media-tab" class="ivue-section-tab"
            @pointerenter="setPulseTwiceAnimation"
            @mouseleave="setPulseTwiceAnimation">

            <img :src="ivue_media_banner" width="175" />
            <p>
                iVue Media offers photography, videography, and content creation services to our clients. 
                Apart from designing, developing, and deploying iVue Media's Website, 
                the Worlds iVue Development Team is currently creating an app for iVue Media on Worlds iVue.
            </p>
        </a>
        <a :href="IVUE_ROBOTICS_WEBSITE_LINK" id="robotics-tab" class="ivue-section-tab"
            @pointerenter="setPulseTwiceAnimation"
            @mouseleave="setPulseTwiceAnimation">

            <img :src="ivue_robotics_banner" width="190" />
            <p>
                iVue Robotics build Drone Hardware for the future. 
                We've made a selection of "Develop Air" drone models and ModKits to boost drone capabilities. 
                Now, you can order a drone directly on the website.
            </p>
        </a>
        <a :href="FLORIDA_MAN_LINK" id="florida-man-tab" class="ivue-section-tab"
            @pointerenter="setPulseTwiceAnimation"
            @mouseleave="setPulseTwiceAnimation">

            <div class="ivue-section-tab-header">
                <img :src="fm_photo" width="45" />
                <span>Florida Man</span>
            </div>
            <p>
                Florida Man is a new production that is being made by iVue Media in collaboration with Olympus Entertainment. 
                You can check out the production's social media profiles on this website I personally made for the series.
            </p>
        </a>
    </div>
</div>
</template>

<script setup>
import ivue_white_text from "@/assets/ivue/iVue_White_Text_Cropped.png";
import wiv_banner from "@/assets/ivue/Worlds_iVue_Banner.png";
import ivue_media_banner from "@/assets/ivue/iVue_Media_Banner.png";
import ivue_robotics_banner from "@/assets/ivue/iVue_Robotics_Banner.png";
import fm_photo from "@/assets/ivue/FM_Profile_Photo.png";

const ivue = ref(null);
const ANIMATE_DURATION = 800;

useIntersectionObserver(ivue, ([{ isIntersecting }]) => {
    setInitTransitions(isIntersecting);
});

/**
 * This functions sets initial transitions upon entering this section for iVue.
 */
function setInitTransitions(isVisible) {
    if(!isVisible) { return; }
    var leftAnimation = "animate__lightSpeedInLeft";
    var rightAnimation = "animate__lightSpeedInRight";

    if(window.innerWidth <= 450) {
        leftAnimation = "animate__fadeIn";
        rightAnimation = "animate__fadeIn";
    }

    document.getElementById('ivue-section-title').classList.add("animate__animated", leftAnimation);
    document.getElementById('wiv-tab').classList.add("animate__animated", rightAnimation);
    document.getElementById('main-tab').classList.add("animate__animated", leftAnimation);
    document.getElementById('media-tab').classList.add("animate__animated", rightAnimation);
    document.getElementById('robotics-tab').classList.add("animate__animated", leftAnimation);
    document.getElementById('florida-man-tab').classList.add("animate__animated", rightAnimation);

    setTimeout(() => {
        document.getElementById('ivue-section-title').classList.remove("animate__animated", "animate__lightSpeedInLeft", "animate__fadeIn");
        document.getElementById('wiv-tab').classList.remove("animate__animated", "animate__lightSpeedInRight", "animate__fadeIn");
        document.getElementById('main-tab').classList.remove("animate__animated", "animate__lightSpeedInLeft", "animate__fadeIn");
        document.getElementById('media-tab').classList.remove("animate__animated", "animate__lightSpeedInRight", "animate__fadeIn");
        document.getElementById('robotics-tab').classList.remove("animate__animated", "animate__lightSpeedInLeft", "animate__fadeIn");
        document.getElementById('florida-man-tab').classList.remove("animate__animated", "animate__lightSpeedInRight", "animate__fadeIn");
    }, ANIMATE_DURATION)
}
</script>

<style scoped>
.ivue-section {
    background: transparent;
    height: fit-content;
    min-height: 1000px;
    width: 100%;
    padding: 100px 0px;
}

#ivue-section-title {
    width: 100%;
    height: 125px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    --animate-duration: 1.2s;
}
#ivue-section-title > a {
    cursor: pointer;
    height: fit-content;
    width: fit-content;
}
#ivue-section-title > a > img {
    height: 115px;
    user-select: none;
}

.ivue-section-tabs-container {
    width: 100%;
    height: 950px;
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
    background-color: rgba(0, 0, 0, 0.5);
    border: 3px solid white;
    border-radius: 20px;
    transition: box-shadow 0.35s;
    color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
    --animate-duration: 1.2s;
}
.ivue-section-tab:hover {
    box-shadow: 0px 0px 15px 15px rgba(255, 255, 255, 0.25);
}

.ivue-section-tab-header {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: 'Lexend', sans-serif;
    padding-left: 15px;
}
.ivue-section-tab-header img {
    padding-left: 0px !important;
    padding-right: 10px; 
}

.ivue-section-tab img {
    padding-left: 15px;
    user-select: none;
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

.ivue-section-tab#florida-man-tab {
    color: #D8829D;
    border-color: #D8829D;
}
.ivue-section-tab#florida-man-tab:hover {
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
    #ivue-section-title > a > img {
        height: 80px;
    }
    .ivue-section-tabs-container {
        height: 1075px;
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