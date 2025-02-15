<template>
<NavigationMain />
<div id="icons-body" class="personal-web-body">
    <div id="start" class="icon-page-padding"></div>
    <div class="icon-background blue-zero">
        <div class="icon-start-header"> My Icons </div>
        <div class="icon-start-desc">
            Using a combination of gradients and the Lexend Google Font, I was able to create "icons" for myself,
            which works well as a stamp for my personal brand.
        </div>

        <div class="icon-start-widgets">
            <div v-for="widget in ICON_WIDGETS" class="web-widget-container"
                @click="copyImage(widget.img)" title="Copy Image">

                <div class="web-widget"> <img :src="widget.img" /> </div>
                <div class="web-widget-label"> {{ widget.name }} </div>
            </div>
        </div>
    </div>

    <div id="main" class="icon-page-padding"></div>
    <div class="icon-background">
        <div class="icon-text"> MKJ </div>
    </div>

    <div id="green" class="icon-page-padding"></div>
    <div class="icon-background green">
        <div class="icon-text"> MKJ </div>
    </div>

    <div id="orange" class="icon-page-padding"></div>
    <div class="icon-background black">
        <div class="icon-text orange"> MKJ </div>
    </div>
    <WebFooter />
</div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import WebFooter from '../components/WebFooter.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
const ICON_IMPORT_START = "/static-icons/Personal_Icon";

onMounted(() => {
    document.title = "Mohit Jain | My Icons";
    webData.mountWebData();
})

/**
 * This lets the visitor copy an image.
 * @param {String} imageUrl The URL of the image.
 */
async function copyImage(imageUrl = "") {
    if(imageUrl === "") { return; }
    imageUrl = (window.location.origin + imageUrl);

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const data = [new ClipboardItem({ [blob.type]: blob })];

    await navigator.clipboard.write(data);
    alert("Copied Image!");
}

const ICON_WIDGETS = [
    { name: "Base Icon", img: (ICON_IMPORT_START + ".png") },
    { name: "Clear Icon", img: (ICON_IMPORT_START + "_Transparent.png") },
    { name: "Spaced Icon", img: (ICON_IMPORT_START + "_Expanded.png") },
    { name: "Spaced Clear Icon", img: (ICON_IMPORT_START + "_Expanded_Transparent.png") },
    { name: "Green Icon", img: (ICON_IMPORT_START + "_Green.png") },
    { name: "Spaced Green Icon", img: (ICON_IMPORT_START + "_Green_Expanded.png") },
    { name: "Gold Icon", img: (ICON_IMPORT_START + "_Gold.png") },
    { name: "Gold Clear Icon", img: (ICON_IMPORT_START + "_Gold_Transparent.png") },
    { name: "Gold Spaced Icon", img: (ICON_IMPORT_START + "_Gold_Expanded.png") },
    { name: "Gold Spaced Clear Icon", img: (ICON_IMPORT_START + "_Gold_Expanded_Transparent.png") },
];
</script>

<style scoped>
#icons-body {
    background-color: white;
    top: 0px;
    min-height: 100%;
}
.icon-background {
    height: calc(100vh - 50px);
    min-height: 700px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
}

.icon-background.green {
    background-color: var(--globe-green);
}
.icon-background.black {
    background-color: #333333;
}
.icon-background.blue-zero {
    background-color: var(--blue-zero);
}

.icon-page-padding {
    width: 100%;
    height: 50px;
    background-color: white;
}
.icon-page-padding#main {
    background: linear-gradient(to top, white 0%, var(--blue-zero) 100%);
}
.icon-page-padding#green {
    background: linear-gradient(to bottom, white 0%, var(--globe-green) 100%);
}
.icon-page-padding#orange {
    background: linear-gradient(to top, #333333 0%, var(--globe-green) 100%);
}

.icon-text {
    font-size: 400px;
    width: fit-content;
    height: fit-content;
    background: linear-gradient(to right, var(--blue-four) 0%, var(--blue-two) 50%, var(--blue-four) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
    text-align: center;
}
.icon-text.orange {
    background: linear-gradient(to right, var(--website-text) 0%, var(--website-light-text) 50%, var(--website-text) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.icon-start-header {
    font-size: 100px;
    width: fit-content;
    height: fit-content;
    color: var(--blue-cobalt);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    text-align: center;
}
.icon-start-desc {
    text-align: center;
    margin-top: 15px;
    font-size: 20px;
    width: calc(100% - 30px);
    height: fit-content;
    max-width: 700px;
    padding: 0px 15px;
    color: var(--blue-cobalt);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}

.icon-start-widgets {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: fit-content;
    width: fit-content;
    max-width: 700px;
}
.web-widget-container {
    height: 120px;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.web-widget {
    cursor: copy;
    width: 70px;
    height: 70px;
    background-color: rgba(255, 255, 255, 0.25);
    border: 1px solid var(--blue-cobalt);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--default-transition);
}
.web-widget-label {
    margin-top: 3px;
    font-size: 12px;
    width: fit-content;
    height: 40px;
    max-width: 70px;
    text-align: center;
    color: var(--blue-cobalt);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}

.web-widget img {
    width: 53px;
}
.web-widget:hover {
    box-shadow: 0px 0px 9px 1px var(--blue-cobalt);
}

@media (max-width: 940px) {
    .icon-text {
        font-size: 200px;
    }
}
@media (max-width: 625px) {
    .icon-start-widgets {
        grid-template-columns: repeat(3, 1fr);
    }
    .icon-start-header {
        font-size: 75px;
    }
    .icon-start-desc {
        font-size: 17px;
    }

    .web-widget-container {
        width: 100px;
        height: 100px;
    }
    .web-widget {
        width: 62px;
        height: 62px;
    }
    .web-widget img {
        width: 45px;
    }
}
@media (max-width: 500px) {
    .icon-text {
        font-size: 100px;
    }
    .icon-start-header {
        font-size: 60px;
    }
}
</style>