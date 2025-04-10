<template>
<NavigationMain />
<div id="resume-container">
    <iframe :src="VIEWER_URL" height="100%" width="100%"></iframe>
</div>

<div @click="downloadResume()" :class="WIDGET_CLASSES" title="Download My Resume">
    <client-only> <font-awesome-icon icon="fa-download" class="home-nav-barsIcon" /> </client-only>
</div>
<div @click="reloadPage()" :class="WIDGET_CLASSES" class="reload" title="Reload Page">
    <client-only> <font-awesome-icon icon="fa-rotate-right" class="home-nav-barsIcon" /> </client-only>
</div>
</template>

<script setup>
import NavigationMain from "../components/NavigationMain.vue";
import { downloadResume, initWebData } from "../stores/WebsiteData.js";
import { onMounted, onBeforeUnmount, nextTick } from "vue";

import { getMeta } from "../stores/GetMeta.js";
import { useHead } from "@unhead/vue";

const VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent("https://www.mohit-jain.com/Mohit_Jain_Resume.pdf")}&embedded=true`;
const WIDGET_CLASSES = ['home-nav', 'resume-widget', 'animate__animated', 'animate__fadeInBottomRight'];

onMounted(() => {
    initWebData();
    nextTick().then(() => {
        hideVerticalOverflow();
        window.addEventListener("resize", hideVerticalOverflow);
    })
});
onBeforeUnmount(() => {
    document.body.style.overflowY = "";
    window.removeEventListener("resize", hideVerticalOverflow);
});

/**
 * This function hides the body's vertical overflow.
 */
function hideVerticalOverflow() {
    document.body.style.overflowY = "hidden";
}

/**
 * This function reloads the website.
 */
function reloadPage() {
    window.location.reload();
}

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume."
));
</script>

<style scoped>
#resume-container {
    position: absolute;
    top: 50px;
    left: 0;
    height: calc(100% - 50px);
    width: 100%;
    min-width: 350px;
}
</style>