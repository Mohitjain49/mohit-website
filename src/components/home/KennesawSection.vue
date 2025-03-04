<template>
<div id="ksu" class="ksu-section" v-observe-visibility="setInitTranstions">
    <a :href="KSU_LINK" target="_blank" class="ksu-section-chunk"
        @mouseenter="onKennesawChunkHover(0)"
        @mouseleave="onKennesawChunkLeave(0)">

        <img :src="ksu_banner" class="ksu-section-banner" draggable="false" />
    </a>
    <div class="ksu-section-chunk ksu-section-desc">
        Currently, I am pursuing a bachelor's degree in Computer Science at Kennesaw State University, 
        and I'm set to graduate on May 2027. I made a page dedicated to describing how my 
        education shapes my software development skills.
    </div>
    <RouterLink to="/ksu-edu" class="ksu-section-chunk ksu-section-link"
        @mouseenter="onKennesawChunkHover(2)"
        @mouseleave="onKennesawChunkLeave(2)">

        <span> Go To My KSU Page </span>
    </RouterLink>
</div>
</template>

<script setup>
import ksu_banner from "@/assets/ksu/Kennesaw_State_Banner.svg";
import { KSU_LINK } from "@/stores/Objects.js";
const ANIMATE_DURATION = 800; // The time spent for the duration in milliseconds.

/**
 * This functions sets initial transitions upon entering this section for the KSU chunks.
 */
function setInitTranstions(isVisible) {
    if(!isVisible || window.innerWidth <= 450) { return; }
    document.getElementsByClassName("ksu-section-chunk").item(0).classList.add("animate__animated", "animate__lightSpeedInLeft");
    document.getElementsByClassName("ksu-section-chunk").item(1).classList.add("animate__animated", "animate__lightSpeedInRight");
    document.getElementsByClassName("ksu-section-chunk").item(2).classList.add("animate__animated", "animate__lightSpeedInLeft");

    setTimeout(() => {
        document.getElementsByClassName("ksu-section-chunk").item(0).classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName("ksu-section-chunk").item(1).classList.remove("animate__animated", "animate__lightSpeedInRight");
        document.getElementsByClassName("ksu-section-chunk").item(2).classList.remove("animate__animated", "animate__lightSpeedInLeft");
    }, ANIMATE_DURATION)
}

/**
 * This function adds an animation to a section chunk whenever visitors hover over it.
 * @param {Number} chunkIndex The index of the chunk in this section.
 */
function onKennesawChunkHover(chunkIndex = 0) {
    document.getElementsByClassName("ksu-section-chunk").item(chunkIndex).classList.add("animate__animated", "animate__shakeX");
}

/**
 * This function removes an animation to a section chunk whenever visitors stop hovering over it.
 * @param {Number} chunkIndex The index of the chunk in this section.
 */
function onKennesawChunkLeave(chunkIndex = 0) {
    document.getElementsByClassName("ksu-section-chunk").item(chunkIndex).classList.remove("animate__animated", "animate__shakeX");
}
</script>

<style scoped>
.ksu-section {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: fit-content;
    width: 900px;
    padding: 60px calc(50% - 450px);
}

.ksu-section-chunk {
    width: 750px;
    height: fit-content;
    padding: 25px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
}
.ksu-section-banner {
    width: 100%;
    user-select: none;
}

.ksu-section-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    margin-top: 30px;
    color: white;
    cursor: default;
}
.ksu-section-link {
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    margin-top: 20px;
    color: var(--blue-five);
    font-weight: bold;
}

.ksu-section-link span {
    border-bottom: var(--empty-border);
    padding-top: 2px;
    padding-bottom: 1px;
    transition: var(--default-transition);
}
.ksu-section-link:hover span {
    border-color: var(--blue-five);
}

@media (max-width: 900px) {
    .ksu-section {
        width: 100%;
        padding: 60px 0px;
    }
    .ksu-section-chunk {
        width: calc(88% - 50px);
    }
}
</style>