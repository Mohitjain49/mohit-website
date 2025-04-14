<template>
<div @click="downloadResume()" :class="WIDGET_CLASSES" title="Download My Resume">
    <client-only> <font-awesome-icon icon="fa-download" class="home-nav-barsIcon" /> </client-only>
</div>
<div @click="reloadPage()" :class="WIDGET_CLASSES" class="reload" title="Reload Page">
    <client-only> <font-awesome-icon icon="fa-rotate-right" class="home-nav-barsIcon" /> </client-only>
</div>

<RouterLink v-if="checkRoute()" to="/resume/pdf" :class="WIDGET_CLASSES" class="nav" title="Use Built-In PDF Viewer">
    <client-only> <font-awesome-icon icon="fa-file-pdf" class="home-nav-barsIcon" /> </client-only>
</RouterLink>
<RouterLink v-if="!checkRoute()" to="/resume" :class="WIDGET_CLASSES" class="nav" title="Use Google Doc Viewer">
    <client-only> <font-awesome-icon icon="fa-brands fa-google-drive" class="home-nav-barsIcon" /> </client-only>
</RouterLink>
</template>

<script setup>
import { downloadResume, initWebData } from "../stores/WebsiteData.js";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
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

/**
 * This function checks if the visitor is using the Google Doc Viewer or the Built-In PDF Viewer.
 */
function checkRoute() {
    return (route.path === "/resume" || route.path === "/resume/");
}
</script>