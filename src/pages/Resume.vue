<template>
<NavigationMain />
<div id="resume-container" @click="() => {webData.setNavBarDropdown(-1)}">
    <iframe :src="resume" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import NavigationMain from "../components/NavigationMain.vue";
import resume from "../assets/documents/Mohit_Jain_Resume.pdf";

import { useWebsiteDataStore } from "../stores/WebsiteData.js";
import { onMounted, onUnmounted } from "vue";

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | My Resume";
    document.body.style.overflowY = "hidden";
    webData.mountWebData();
});
onUnmounted(() => {
    document.body.style.overflowY = "";
});
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