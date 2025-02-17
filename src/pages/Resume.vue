<template>
<InitPage :pageTitle="'Mohit Jain | My Resume'" />
<NavigationMain />

<div id="resume-container" @click="closeNavBarDropdown()">
    <iframe :src="resume" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import InitPage from "../components/InitPage.vue";
import NavigationMain from "../components/NavigationMain.vue";
import resume from "../assets/documents/Mohit_Jain_Resume.pdf";

import { closeNavBarDropdown } from "../stores/WebsiteData.js";
import { onMounted, onUnmounted } from "vue";

onMounted(() => { document.body.style.overflowY = "hidden"; });
onUnmounted(() => { document.body.style.overflowY = ""; });
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