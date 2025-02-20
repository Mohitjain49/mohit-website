<template>
<client-only>
    <NavigationMain />
    <div id="resume-container" @click="closeNavBarDropdown()">
        <iframe :src="resume" height="100%" width="100%"></iframe>
    </div>
</client-only>
</template>

<script setup>
import NavigationMain from "../components/NavigationMain.vue";
import resume from "../assets/documents/Mohit_Jain_Resume.pdf";

import { initWebData, closeNavBarDropdown } from "../stores/WebsiteData.js";
import { onMounted, onUnmounted } from "vue";
import { useHead } from "@unhead/vue";

onMounted(() => {
    initWebData();
    document.body.style.overflowY = "hidden";
});
onUnmounted(() => {
    document.body.style.overflowY = "";
});

const WEBSITE_PATH = "https://mohit-jain.com/resume";
const PAGE_TITLE = "Mohit Jain | My Resume";
const PAGE_DESC = "Feel free to take a look at my resume. " +
    "Like any good resume, it sums up all my most relevant skills in one page.";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: WEBSITE_PATH },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: WEBSITE_PATH },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})
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