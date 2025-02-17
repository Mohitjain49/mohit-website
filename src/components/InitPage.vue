<template></template>

<script setup>
import doc_img from "/static-icons/Personal_Icon_Expanded_Transparent.png";
import og_img from "/static-icons/Personal_Icon_Expanded.png"
import { useWebsiteDataStore } from '../stores/WebsiteData.js';

import { onMounted } from 'vue';
import { useRoute } from "vue-router";
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
const route = useRoute();
const websitePath = ("https://mohit-jain.com" + route.path);

const PAGE_DESC = "My personal website extensively displays my skills as a software developer " +
    "and the experience I have gathered through working with multiple companies. Made With Vue.js.";

const props = defineProps({
    pageTitle: { type: String, default: "Mohit Jain" },
    pageDesc: { type: String, default: PAGE_DESC }
});

onMounted(() => {
    webData.mountWebData();
});

useHead({
    title: props.pageTitle,
    link: [{ rel: 'icon', href: doc_img }],

    meta: [
        { name: 'description', content: props.pageDesc },
        { name: 'author', content: "Mohit Jain" },

        { property: 'og:site:name', content: "Mohit Jain" },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: websitePath },
        { property: 'og:title', content: props.pageTitle },
        { property: 'og:description', content: props.pageDesc },
        { property: 'og:image', content: og_img },

        { property: 'twitter:card', content: "summary" },
        { property: 'twitter:url', content: websitePath },
        { property: 'twitter:title', content: props.pageTitle },
        { property: 'twitter:description', content: props.pageDesc },
        { property: 'twitter:image', content: og_img },
    ]
})
</script>