<template>
<div id="skills"></div>
<div class="skills-section">
    <div class="skills-section-title center-flex-display"> My Skills </div>
    <div class="skills-section-mainText center-flex-display">
        Since 2021, I have successfully designed, developed, and deployed numerous websites, web applications, and projects 
        by utilizing multiple programming languages, frontend frameworks, and web services.
    </div>

    <div class="skills-section-routeBtn-container">
        <RouterLink to="/skills/" class="skills-section-routeBtn"> Want To Know More? </RouterLink>
    </div>
    <div class="skills-section-icons-container">
        <div class="skills-section-icons">
            <div v-for="skill in SOFTWARE_SKILLS" class="skills-section-tab">
                <img v-if="!skill.faIcon" :src="skill.asset"
                    @click="openWebsite(skill.link)"
                    :title="skill.name"
                    :style="getIconStyle(skill.link, undefined)"
                    class="skills-section-tab-asset"
                    draggable="false"
                />
                <font-awesome-icon v-else :icon="skill.asset"
                    @click="openWebsite(skill.link)"
                    :title="skill.name"
                    :style="getIconStyle(skill.link, skill.color)"
                    class="skills-section-tab-asset skills-section-tab-faIcon"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { VUEJS_WEBSITE_LINK, REACT_NATIVE_WEBSITE_LINK } from "@/stores/Objects.js";
import vuejs_icon from "@/assets/Vuejs_Icon.png";
import aws_icon from "@/assets/aws/AWS_Icon.png";
import cesium_icon from "@/assets/Cesium_Globe_Icon.svg";
import angular_icon from "@/assets/Angular_Icon.webp";
import mavlink_icon from "@/assets/ivue/Mavlink_Icon.png";

/**
 * This function is simple. it opens a website for the visitor.
 * @param {String} website The website domain name.
 */
function openWebsite(website = "#") {
    if(website === "#") { return; }
    window.open(website, "_blank")
}

/**
 * This function returns the style for an icon.
 * @param {String} website The website domain name.
 * @param {String} color The color of the icon. Can be undefined.
 */
function getIconStyle(website = "#", color = undefined) {
    return { color: ((color == undefined) ? "" : color),
        cursor: ((website === "#") ? "default" : "pointer")
    }
}

/**
 * These are the multiple software skills I have experience with.
 */
const SOFTWARE_SKILLS = [
    { name: "Vue.js", link: VUEJS_WEBSITE_LINK, asset: vuejs_icon, faIcon: false },
    { name: "Amazon Web Services", link: "https://aws.amazon.com", asset: aws_icon, faIcon: false },
    { name: "JavaScript", link: "#", asset: "fa-brands fa-js", faIcon: true, color: "#F7DF1E" },
    { name: "React Native", link: REACT_NATIVE_WEBSITE_LINK, asset: "fa-brands fa-react", faIcon: true, color: "#61DBFB" },
    { name: "Cesium", link: "https://cesium.com", asset: cesium_icon, faIcon: false },
    { name: "HTML", link: "#", asset: "fa-brands fa-html5", faIcon: true, color: "#E34E26" },
    { name: "Angular", link: "https://angular.dev", asset: angular_icon, faIcon: false },
    { name: "MAVLink", link: "https://mavlink.io/en", asset: mavlink_icon, faIcon: false },
    { name: "CSS", link: "#", asset: "fa-brands fa-css3-alt", faIcon: true, color: "#264DE4" },
]
</script>

<style scoped>
#skills {
    height: 50px;
    width: 100%;
    background: linear-gradient(to bottom, rgb(248, 206, 171) 0%, var(--blue-zero) 100%);
}
.skills-section {
    height: fit-content;
    min-height: calc(var(--body-height));
    padding: 20px 0px;
    width: 100%;
    background: var(--blue-zero);
    color: var(--blue-cobalt);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

.skills-section-title {
    position: relative;
    font-size: 90px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--blue-cobalt);
    width: fit-content;
    height: 18%;
}
.skills-section-mainText {
    font-size: 22px;
    font-family: 'Lexend', 'sans-serif';
    width: calc(100% - 20px);
    height: fit-content;
    max-width: 700px;
    padding: 15px 10px;
    text-align: center;
}

.skills-section-routeBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    width: 100%;
    padding-bottom: 25px;
}
.skills-section-routeBtn {
    width: fit-content;
    padding: 10px;
    font-size: 26px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--blue-cobalt);
    border: 2px solid var(--blue-cobalt);
    border-radius: 15px;
    transition: var(--default-transition);
}
.skills-section-routeBtn:hover {
    background-color: var(--blue-two);
}

.skills-section-icons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: 100%;
}
.skills-section-icons {
    height: fit-content;
    width: fit-content;
    padding: 20px;
    border: 2px solid var(--blue-cobalt);
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.skills-section-tab {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.skills-section-tab-faIcon {
    font-size: 70px;
}

.skills-section-tab-asset {
    cursor: pointer;
    user-select: none;
    width: 70px;
    padding: 12px;
    margin: 10px;
    border: 2px solid var(--blue-cobalt);
    border-radius: 10px;
    transition: var(--default-transition), padding 0.2s;
    background-color: rgba(0, 0, 0, 0.15);
}
.skills-section-tab-asset:hover {
    background-color: rgba(0, 0, 0, 0.25);
}

@media (max-width: 600px) {
    .skills-section {
        min-height: 0px;
    }
    .skills-section-title {
        font-size: 70px;
        height: 100px;
    }
    .skills-section-mainText {
        font-size: 17px;
        padding: 10px 0px 20px 0px;
    }

    .skills-section-icons {
        margin: 20px 0px;
    }
    .skills-section-tab-asset {
        width: 40px;
    }
    .skills-section-tab-faIcon {
        font-size: 40px;
    }
}
@media (min-height: 900px) and (min-width: 601px) {
    .skills-section {
        justify-content: center;
    }
    .skills-section-tab-asset {
        width: 84px;
        padding: 15px;
        margin: 12px;
    }
    .skills-section-tab-faIcon {
        font-size: 84px;
    }
    .skills-section-routeBtn-container {
        padding-bottom: 25px;
    }
}
</style>