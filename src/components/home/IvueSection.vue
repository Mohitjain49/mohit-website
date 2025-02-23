<template>
<div id="ivue"></div>
<div class="ivue-section">
    <div class="ivue-section-title">
        <img :src="ivue_white_text" draggable="false" />
    </div>
    <div class="ivue-section-tabs-container">
        <div class="ivue-section-tab wiv">
            <img :src="wiv_banner" width="350" />
        </div>
        <div class="ivue-section-tab">
            <img :src="ivue_white_text" width="135" />
        </div>
        <div class="ivue-section-tab media">
            <img :src="ivue_media_banner" width="350" />
        </div>
        <div class="ivue-section-tab robotics">
            <img :src="ivue_robotics_banner" width="385" />
        </div>
        <div class="ivue-section-tab news">
            <img :src="ivue_white_text" width="135" />
        </div>
    </div>
</div>
</template>

<script setup>
import ivue_white_text from "@/assets/ivue/iVue_White_Text_Cropped.png";
import wiv_banner from "@/assets/ivue/Worlds_iVue_Banner.png";
import ivue_media_banner from "@/assets/ivue/iVue_Media_Banner.png";
import ivue_robotics_banner from "@/assets/ivue/iVue_Robotics_Banner.png";
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
    height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.ivue-section-tab {
    cursor: pointer;
    width: 90%;
    max-width: 1100px;
    height: 125px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    transition: box-shadow 0.35s;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ivue-section-tab:hover {
    box-shadow: 0px 0px 15px 15px rgba(255, 255, 255, 0.25);
}

.ivue-section-tab.wiv {
    border-color: #48A548;
}
.ivue-section-tab.wiv:hover {
    box-shadow: 0px 0px 15px 15px rgba(72, 165, 72, 0.25);
}

.ivue-section-tab.media {
    border-color: #d7bc84;
}
.ivue-section-tab.media:hover {
    box-shadow: 0px 0px 15px 15px rgba(215, 188, 132, 0.25);
}

.ivue-section-tab.robotics {
    border-color: #ab0f14;
}
.ivue-section-tab.robotics:hover {
    box-shadow: 0px 0px 15px 15px rgba(171, 15, 20, 0.25);
}

.ivue-section-tab.news {
    border-color: #0071bc;
}
.ivue-section-tab.news:hover {
    box-shadow: 0px 0px 15px 15px rgba(0, 113, 188, 0.25);
}

.ivue-section-tab img {
    padding-left: 15px;
}
</style>