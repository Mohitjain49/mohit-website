<template>
<div id="experience"></div>
<div class="experience-section">
    <div class="experience-section-column">
        <div class="experience-section-title">My Experience</div>
        <div class="experience-section-desc">
            Since starting at iVue in 2023, I took resposibility for creating Worlds iVue, 
            building new versions of iVue's company websites, and more recently managing
            our use of AWS Services.
        </div>
        <div class="experience-section-routeBtn-container">
            <RouterLink to="/experience" class="experience-section-routeBtn"> Read More </RouterLink>
        </div>
    </div>

    <div class="experience-section-column">
        <div class="experience-phone">
            <div class="experience-phone-top">
                <font-awesome-icon icon="fa-circle-dot" class="experience-phone-camera" />
                <div class="experience-phone-time"> {{ dateStore.dateStrings.timeSection }} </div>
            </div>

            <div class="experience-phone-screen" :style="SCREENS[phoneScreenOpen].style">
                <div class="experience-phone-title center-flex-display">
                    <img :src="SCREENS[phoneScreenOpen].title.banner" draggable="false" :height="SCREENS[phoneScreenOpen].title.bannerHeight" />
                    <span v-if="SCREENS[phoneScreenOpen].title.textNeeded"> {{ SCREENS[phoneScreenOpen].name }} </span>
                </div>
                <a :href="SCREENS[phoneScreenOpen].mainLink" class="experience-phone-mainLink" target="_blank">
                    {{ SCREENS[phoneScreenOpen].mainLink }}
                </a>

                <div class="experience-section-desc experience-phone-desc"> {{ SCREENS[phoneScreenOpen].desc }} </div>
                <div class="experience-section-routeBtn-container" style="height: 50px;">
                    <RouterLink class="experience-section-routeBtn experience-phone-expBtn" :to="SCREENS[phoneScreenOpen].expLink"> Go To Experience </RouterLink>
                </div>
            </div>

            <div class="experience-phone-bottom">
                <div class="experience-phone-tabBtn" @click="setPhoneScreen(0)" title="Worlds iVue">
                    <img :src="wivIcon" draggable="false" />
                </div>
                <div class="experience-phone-tabBtn" @click="setPhoneScreen(1)" title="iVue">
                    <img :src="ivueText" style="height: 50px;" draggable="false" />
                </div>
                <div class="experience-phone-tabBtn" @click="setPhoneScreen(2)" title="Sublo">
                    <img :src="subloIcon" draggable="false" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import wivIcon from "@/assets/ivue/Worlds_iVue_Icon.png";
import ivueText from "@/assets/ivue/iVue_Black_Text.png";
import subloIcon from "@/assets/sublo/Sublo_Blue_Transparent.png";
import wivBanner from "@/assets/ivue/Worlds_iVue_Banner.png";

import { WORLDS_IVUE_LINK, MAIN_IVUE_WEBSITE_LINK, SUBLO_WEBSITE_LINK } from "@/stores/Objects.js";
import { useDateStore } from "@/stores/WebsiteData.js";
import { ref } from "vue";

const dateStore = useDateStore();
const phoneScreenOpen = ref(1);

/**
 * This function sets which phone screen to open.
 * @param {Number} index The index of the screen to open.
 */
function setPhoneScreen(index = 0) {
    phoneScreenOpen.value = index;
}

const SCREENS = [
    {
        name: "Worlds iVue",
        mainLink: WORLDS_IVUE_LINK,
        style: {
            background: "#80cf76",
            color: "#0872BA"
        },
        title: {
            banner: wivBanner,
            textNeeded: false,
            bannerHeight: "55"
        },

        desc: "Explore how Worlds iVue efficiently operates iVue Robotics's \"Develop Air\" Drones.",
        expLink: "/experience/ivue/worldsivue"
    },
    {
        name: "iVue",
        mainLink: MAIN_IVUE_WEBSITE_LINK,
        style: {
            background: "white",
            color: "black"
        },
        title: {
            banner: ivueText,
            textNeeded: false,
            bannerHeight: "90"
        },

        desc: "Observe how iVue produces media content, drone hardware, and 3D world map software " +
            "to make drones a part of everyone's daily life.",
        expLink: "/experience/ivue"
    },
    {
        name: "Sublo",
        mainLink: SUBLO_WEBSITE_LINK,
        style: {
            background: "#031427",
            color: "#d1efff"
        },
        title: {
            banner: subloIcon,
            textNeeded: true,
            bannerHeight: "40"
        },
        
        desc: "Read on how I am helped make an app to make finding or listing subleases easy for college students.",
        expLink: "/experience/sublo"
    }
]
</script>

<style scoped>
#experience {
    height: 50px;
    width: 100%;
    background: linear-gradient(to top, rgb(248, 206, 171) 0%, var(--blue-two) 100%);
}
.experience-section {
    height: var(--body-height);
    min-height: 700px;
    display: grid;
    grid-template-columns: 60% 40% ;
}

.experience-section-column {
    height: 100%;
    width: calc(100% - 30px);
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.experience-section-title {
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    font-size: 75px;
    width: fit-content;
    text-align: center;
}
.experience-section-desc {
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-size: 22px;
    width: fit-content;
    max-width: 680px;
    text-align: center;
    padding: 5px 0px 10px 0px;
}

.experience-section-routeBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    width: 100%;
}
.experience-section-routeBtn {
    width: fit-content;
    padding: 10px;
    font-size: 26px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--website-text);
    border: 2px solid var(--website-text);
    border-radius: 15px;
    transition: var(--default-transition);
}
.experience-section-routeBtn:hover {
    background-color: var(--dark-translucent-background);
}

.experience-phone {
    width: 375px;
    height: 700px;
    border: 2px solid var(--silver-color);
    border-radius: 20px;
    overflow: hidden;
}
.experience-phone-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    width: 100%;
    border-bottom: 2px solid var(--silver-color);
    background-color: var(--silver-light);
}

.experience-phone-camera {
    margin-left: 10px;
    font-size: 16px;
    color: var(--silver-color);
}
.experience-phone-time {
    margin-right: 12px;
    font-size: 16px;
    color: var(--blue-four);
    font-family: 'Lexend', sans-serif;
    user-select: none;
}

.experience-phone-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    width: 100%;
    border-top: 2px solid var(--silver-color);
    background-color: var(--silver-light);
}
.experience-phone-tabBtn {
    height: 100%;
    width: calc(100% / 3);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--default-transition);
    overflow: hidden;
}

.experience-phone-tabBtn:hover {
    background-color: var(--silver-color);
}
.experience-phone-tabBtn img {
    height: 35px;
    user-select: none;
}

.experience-phone-screen {
    height: calc(100% - 80px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.experience-phone-title {
    height: 70px;
    width: 100%;
    overflow: hidden;
}

.experience-phone-title span {
    margin-left: 5px;
    color: inherit;
    font-size: 40px;
    font-family: 'Lexend', sans-serif;
}
.experience-phone-title img {
    user-select: none;
}

.experience-phone-mainLink {
    color: #790cee;
    width: auto;
    text-align: center;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    border-bottom: var(--thin-empty-border);
    transition: var(--default-transition);
    padding: 0px 3px 1px;
    border-radius: 5px;
    margin-bottom: 20px;
}
.experience-phone-mainLink:hover {
    border-color: #790cee;
}

.experience-phone-desc {
    color: inherit;
    font-size: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 210px);
    padding: 0px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.experience-phone-expBtn {
    color: inherit;
    border-color: inherit;
    font-size: 18px;
}

@media (max-width: 1175px) {
    .experience-section {
        grid-template-columns: 1fr;
        height: fit-content;
    }
    .experience-section-column {
        height: fit-content;
        padding: 20px 15px;
    }
    .experience-section-title {
        padding-top: 10px;
    }
}

@media (max-width: 600px) {
    .experience-section {
        min-height: 0px;
    }
    .experience-section-title {
        font-size: 55px;
    }
    .experience-section-desc {
        font-size: 17px;
    }
    .experience-phone {
        width: 325px;
        height: 600px;
    }
}
</style>