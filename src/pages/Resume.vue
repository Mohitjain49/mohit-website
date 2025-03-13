<template>
<NavigationMain />
<div id="resume-container" @click="closeNavBarDropdown()">
    <iframe :src="resume" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import NavigationMain from "../components/NavigationMain.vue";
import resume from "/Mohit_Jain_Resume.pdf";
import { getMeta } from "../stores/GetMeta.js";

import { initWebData, closeNavBarDropdown } from "../stores/WebsiteData.js";
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { useHead } from "@unhead/vue";

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