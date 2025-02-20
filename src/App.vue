<template>
<client-only>
    <RouterView :key="$route.path" />
</client-only>
</template>

<script setup>
import "./styles/mainstyles.css";
import { useWebsiteDataStore } from "./stores/WebsiteData.js";
import { onMounted, onUnmounted } from "vue";
import { useHead } from "@unhead/vue";

const webData = useWebsiteDataStore();
onMounted(() => {webData.setEventListeners()})
onUnmounted(() => {webData.removeEventListeners()})

const PAGE_TITLE = "Mohit Jain | My Portfolio";
const PAGE_DESC = "My personal website extensively displays my skills as a software developer " +
    "and the experience I have gathered through working with multiple companies. Made With Vue.js.";
const WEBSITE_PATH = "https://mohit-jain.com/";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: WEBSITE_PATH },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: WEBSITE_PATH },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC }
    ]
})
</script>