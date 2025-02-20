<template></template>

<script setup>
import { initWebData } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';
import { useRoute } from "vue-router";
import { useHead } from '@unhead/vue';

const route = useRoute();
const websitePath = ("https://mohit-jain.com" + route.path);

const PAGE_DESC = "My personal website extensively displays my skills as a software developer " +
    "and the experience I have gathered through working with multiple companies. Made With Vue.js.";

const props = defineProps({
    pageTitle: { type: String, default: "Mohit Jain" },
    pageDesc: { type: String, default: PAGE_DESC }
});

onMounted(() => { initWebData(); });

useHead({
    title: props.pageTitle,

    meta: [
        { name: 'description', content: props.pageDesc },

        { property: 'og:url', content: websitePath },
        { property: 'og:title', content: props.pageTitle },
        { property: 'og:description', content: props.pageDesc },

        { property: 'twitter:url', content: websitePath },
        { property: 'twitter:title', content: props.pageTitle },
        { property: 'twitter:description', content: props.pageDesc },
    ]
})
</script>