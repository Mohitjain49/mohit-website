<template>
<div :class="getCircleClasses()" @click="!webData.toggleHomeNav()" title="Navigate This Page">
    <client-only>
        <font-awesome-icon v-if="!webData.homeNavExpanded" icon="fa-bars" class="home-nav-barsIcon" :beat="iconBeating" />
    </client-only>

    <template v-if="webData.homeNavExpanded">
        <RouterLink to="/#start" @click="goToHomeSection('start')" :class="getCircleOptClasses('start')"> Start </RouterLink>
        <RouterLink to="/#skills" @click="goToHomeSection('skills')" :class="getCircleOptClasses('skills')"> Skills </RouterLink>
        <RouterLink to="/#ivue" @click="goToHomeSection('ivue')" :class="getCircleOptClasses('')"> <img :src="ivue_text" width="50" /> </RouterLink>
        <RouterLink to="/#ksu" @click="goToHomeSection('ksu')" :class="getCircleOptClasses('')"> <img :src="ksu_banner" width="130" /> </RouterLink>
        <RouterLink to="/#extras" @click="goToHomeSection('extras')" :class="getCircleOptClasses('')"> Extras </RouterLink>
        <div class="close" :class="getCircleOptClasses()"> Close Menu </div>
    </template>
</div>

<RouterLink to="/qrcode" :class="QR_CODE_CLASSES" title="QR Codes for My Website">
    <client-only>
        <font-awesome-icon icon="fa-qrcode" class="home-nav-barsIcon" :beat="iconBeating" />
    </client-only>
</RouterLink>
</template>

<script setup>
import ivue_text from "@/assets/ivue/iVue_Black_Text_Cropped.png";
import ksu_banner from "@/assets/ksu/Kennesaw_State_Banner.svg";

import { useWebsiteDataStore } from '@/stores/WebsiteData.js';
import { ref, onMounted } from 'vue';

const webData = useWebsiteDataStore();
const iconBeating = ref(true);

/**
 * This lets the icon "beat" for 5 seconds before stopping it.
 */
onMounted(() => {
    setTimeout(() => { iconBeating.value = false; }, 5000);
})

/**
 * This scrolls to the section the visitor requested.
 * @param {String} id The element ID of the section.
 */
function goToHomeSection(id = "start") {
    webData.goToPageSection(id);
}

/**
 * This function returns the classes for the main element.
 */
function getCircleClasses() {
    return ['home-nav',
        (webData.homeNavExpanded ? 'home-nav-expanded' : ''),
        'animate__animated', 'animate__fadeInBottomRight'
    ];
}

/**
 * This function returns the classes for the option elements.
 * @param {String} specialClass An extra class that can be added onto the list of classes.
 */
function getCircleOptClasses(specialClass = '') {
    return ['home-nav-opt', (webData.homeNavExpanded ? '' : 'hidden'), specialClass];
}

const QR_CODE_CLASSES = ['home-nav', 'qrcode-nav', 'animate__animated', 'animate__fadeInBottomLeft'];
</script>

<style>
.home-nav {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    top: 60px;
    left: 10px;
    background-color: var(--website-text);
    height: 50px;
    width: 50px;
    border-radius: 30px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), height 0.2s, width 0.2s;
}
.home-nav:hover {
    background-color: var(--website-light-text);
}

.qrcode-nav {
    left: auto;
    right: 10px;
}

.home-nav.home-nav-expanded {
    height: 229px;
    width: 200px;
    border-radius: 15px;
    background-color: var(--website-text);
}
.home-nav-barsIcon {
    color: rgba(0, 0, 0, 0.8);
    font-size: 25px;
}

.home-nav-opt {
    color: rgba(0, 0, 0, 0.8);
    font-family: "Lexend", "Roboto", sans-serif;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 45px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    transition: var(--default-transition), font-size 0.2s;
}
.home-nav-opt:hover {
    background-color: var(--website-light-text);
}

.home-nav-opt.hidden {
    font-size: 1px;
}
.home-nav-opt.close {
    border-bottom: none;
    font-weight: 400;
}
.home-nav-opt.start {
    color: white;
    text-shadow: 0px 0px 10px var(--website-light-text);
}
.home-nav-opt.skills {
    color: var(--blue-zero);
}

.resume-widget {
    width: 45px;
    height: 45px;
}
.resume-widget .home-nav-barsIcon {
    font-size: 22px !important;
}

.resume-widget.reload {
    top: 110px;
}
.resume-widget.nav {
    top: 160px;
}

@media (max-width: 825px) {
    .home-nav {
        width: 38px;
        height: 38px;
    }
    .home-nav-barsIcon {
        font-size: 21px !important;
    }

    .resume-widget {
        width: 32px;
        height: 32px;
    }
    .resume-widget .home-nav-barsIcon {
        font-size: 17px !important;
    }

    .resume-widget.reload {
        top: 97px;
    }
    .resume-widget.nav {
        top: 133px;
    }
}
@media (max-width: 360px) {
    .home-nav {
        display: none;
    }
}
</style>