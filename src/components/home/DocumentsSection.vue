<template>
<div id="documents" class="documents-section" v-observe-visibility="setInitTranstions">
    <div id="documents-section-title"> My Docs </div>
    <div class="documents-section-tabs-container">
        <RouterLink to="/resume" id="resume-tab" class="documents-section-tab"
            @mouseenter="onIvueTabHover('resume-tab')"
            @mouseleave="onIvueTabLeave('resume-tab')">

            <div class="documents-section-tab-header">
                <client-only> <font-awesome-icon icon="fa-file-lines" /> </client-only>
                <span> My Resume </span>
            </div>
            <p>
                I regularly update my resume as I learn more skills and gain more experience in software development. 
                Feel Free to take a look at it!
            </p>
        </RouterLink>
        <RouterLink :to="FCS_CERTIFICATE_ROUTE" id="fcs-certificate-tab" class="documents-section-tab"
            @mouseenter="onIvueTabHover('fcs-certificate-tab')"
            @mouseleave="onIvueTabLeave('fcs-certificate-tab')">

            <img :src="fcs_logo" width="110" draggable="false" />
            <p>
                iVue takes in a few interns through the Fulton County Schools Internship Program. 
                We teach website design and development skills to these interns via interactive learning. 
            </p>
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import fcs_logo from "@/assets/Fulton_County_Schools_Logo.png"

/**
 * This functions sets initial transitions upon entering this section for iVue.
 */
function setInitTranstions(isVisible) {
    if(!isVisible) { return; }
    var leftAnimation = "animate__lightSpeedInLeft";
    var rightAnimation = "animate__lightSpeedInRight";

    if(window.innerWidth <= 450) {
        leftAnimation = "animate__flipInX";
        rightAnimation = "animate__flipInX";
    }

    document.getElementById('documents-section-title').classList.add("animate__animated", leftAnimation);
    document.getElementById('resume-tab').classList.add("animate__animated", rightAnimation);
    document.getElementById('fcs-certificate-tab').classList.add("animate__animated", leftAnimation);

    setTimeout(() => {
        document.getElementById('documents-section-title').classList.remove("animate__animated", "animate__lightSpeedInLeft", "animate__flipInX");
        document.getElementById('resume-tab').classList.remove("animate__animated", "animate__lightSpeedInRight", "animate__flipInX");
        document.getElementById('fcs-certificate-tab').classList.remove("animate__animated", "animate__lightSpeedInLeft", "animate__flipInX");
    }, 800);
}

/**
 * This function adds an animation when the visitor hovers over a tab.
 * @param {Number} index The index of the tab.
 */
function onIvueTabHover(id = "fcs-certificate-tab") {
    document.getElementById(id).classList.add('animate__animated', 'animate__pulse', "animate__repeat-2");
}

/**
 * This function removes an animation when the visitor leaves a tab.
 * @param {Number} index The index of the tab.
 */
function onIvueTabLeave(id = "fcs-certificate-tab") {
    document.getElementById(id).classList.remove('animate__animated', 'animate__pulse', "animate__repeat-2");
}
</script>

<style scoped>
.documents-section {
    background: transparent;
    height: fit-content;
    min-height: 400px;
    width: 100%;
    padding: 100px 0px;
}

#documents-section-title {
    width: 100%;
    height: 125px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    --animate-duration: 1.2s;
    font-size: 95px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: var(--website-light-text);
    text-shadow: var(--website-light-text) 1px 0 30px;
}

.documents-section-tabs-container {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.documents-section-tab {
    cursor: pointer;
    width: 90%;
    max-width: 1100px;
    height: 145px;
    background-color: rgba(0, 0, 0, 0.9);
    border: 3px solid #005941;
    border-radius: 20px;
    transition: box-shadow 0.35s;
    color: #005941;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
    --animate-duration: 1.2s;
}
.documents-section-tab:hover {
    box-shadow: 0px 0px 12px 12px #005941bb;
}

.documents-section-tab-header {
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
.documents-section-tab-header svg {
    position: relative;
    bottom: 1px;
    margin-right: 7px;
}

.documents-section-tab img {
    padding-left: 15px;
    user-select: none;
}
.documents-section-tab p {
    color: inherit;
    height: fit-content;
    width: calc(100% - 30px);
    padding: 0px 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    text-align: left;
}

.documents-section-tab#resume-tab {
    color: var(--website-text);
    border-color: var(--website-text);
}
.documents-section-tab#resume-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(126, 90, 0, 0.25);
}

@media (max-width: 975px) {
    .documents-section-tab p {
        font-size: 17px;
    }
}
@media (max-width: 600px) {
    #documents-section-title {
        font-size: 80px;
    }
    .documents-section-tabs-container {
        height: 400px;
    }
    .documents-section-tab {
        height: 150px;
    }
}
@media (max-width: 500px) {
    #documents-section-title {
        font-size: 70px;
    }
    .documents-section-tab {
        width: 87.5%;
    }
    .documents-section-tab p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
    }
}
</style>