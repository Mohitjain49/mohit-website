<template>
<main id="icons-body" class="personal-web-body">
    <div id="start" class="icon-page-padding"></div>
    <div class="icon-background blue-zero">
        <h1 class="icon-start-header"> My Icons </h1>
        <div class="icon-start-desc">
            Using a combination of gradients and the Lexend Font, I was able to create "icons" for myself,
            which works well as a stamp for my personal brand.
        </div>

        <div class="icon-start-widgets">
            <div v-for="widget in ICON_WIDGETS" class="web-widget-container" title="Navigate To Image">
                <a :href="(ICON_IMPORT_START_LINK + widget.img)" target="_blank" class="web-widget">
                    <img :src="(ICON_IMPORT_START + widget.img)" />
                </a>
                <div class="web-widget-label"> {{ widget.name }} </div>
            </div>
            <div class="web-widget-container" title="Copy Image">
                <a :href="MND_LINK" target="_blank" class="web-widget">
                    <img :src="('/static-icons/MND_Icon_Transparent.png')" />
                </a>
                <div class="web-widget-label"> {{ 'MND Icon' }} </div>
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

    <div id="mnd" class="icon-page-padding"></div>
    <div class="icon-background">
        <div class="icon-text"> MND </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const ICON_IMPORT_START = "/static-icons/Personal_Icon";
const ICON_IMPORT_START_LINK = (PERSONAL_WEBSITE_LINK + "static-icons/Personal_Icon");
const MND_LINK = (PERSONAL_WEBSITE_LINK + 'static-icons/MND_Icon_Transparent.png');

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | My Icons", "icons",
    "I created my icons by using gradients and the Google Lexend Font. You can view them on this page."
));

const ICON_WIDGETS = [
    { name: "Base Icon", img: ".png" },
    { name: "Rounded Icon", img: "_Expanded_Rounded.png" },
    { name: "Clear Icon", img: "_Transparent.png" },
    { name: "Spaced Icon", img: "_Expanded.png" },
    { name: "Spaced Clear Icon", img: "_Expanded_Transparent.png" },
    { name: "Green Icon", img: "_Green.png" },
    { name: "Green Rounded Icon", img: "_Green_Expanded_Rounded.png" },
    { name: "Spaced Green Icon", img: "_Green_Expanded.png" },
    { name: "Gold Icon", img: "_Gold.png" },
    { name: "Gold Rounded Icon", img: "_Gold_Expanded_Rounded.png" },
    { name: "Gold Clear Icon", img: "_Gold_Transparent.png" },
    { name: "Gold Spaced Icon", img: "_Gold_Expanded.png" },
    { name: "Gold Spaced Clear Icon", img: "_Gold_Expanded_Transparent.png" }
];
</script>

<style scoped lang="scss">
#icons-body {
    background-color: var(--blue-zero);
    padding-top: 0px;
    min-height: 100%;
}
.icon-background {
    height: var(--body-height);
    min-height: 750px;
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
    height: 60px;
    background-color: var(--blue-zero);
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
.icon-page-padding#mnd {
    background: linear-gradient(to bottom, #333333 0%, white 100%);
}

.icon-text {
    font-size: 400px;
    width: fit-content;
    height: fit-content;
    background: linear-gradient(to right, var(--blue-four) 0%, var(--blue-two) 50%, var(--blue-four) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 900;
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
    font-size: 110px;
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
    font-size: 10px;
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