<template>
<NavigationMain />
<div id="icons-body">
    <div id="main" class="icon-page-padding"></div>
    <div class="icon-background">
        <div class="icon-text">MKJ</div>
    </div>

    <div id="green" class="icon-page-padding"></div>
    <div class="icon-background green">
        <div class="icon-text">MKJ</div>
    </div>

    <div id="orange" class="icon-page-padding"></div>
    <div class="icon-background black">
        <div class="icon-text orange">MKJ</div>
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
onMounted(() => {
    document.title = "Mohit Jain | My Icons";
    webData.mountWebData();
})
</script>

<style scoped>
#icons-body {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: white;
}
.icon-background {
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.icon-background.green {
    background-color: var(--globe-green);
}
.icon-background.black {
    background-color: rgba(0, 0, 0, 0.8);
}

.icon-page-padding {
    width: 100%;
    height: 50px;
    background-color: white;
}
.icon-page-padding#green {
    background: linear-gradient(to bottom, white 0%, var(--globe-green) 100%);
}
.icon-page-padding#orange {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.80) 0%, var(--globe-green) 100%);
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

@media (max-width: 940px) and (min-width: 501px) {
    .icon-text {
        font-size: 200px;
    }
}
@media (max-width: 500px) {
    .icon-text {
        font-size: 100px;
    }
}
</style>