<template>
<NotCompleted :pageTitle="'Mohit Jain | Invalid'" :message="PAGE_DESC" />
</template>

<script setup>
import NotCompleted from '@/components/body-components/NotCompleted.vue';
import { useHead } from '@unhead/vue';

const WEBSITE_PATH = "https://mohit-jain.com/404";
const PAGE_TITLE = "Mohit Jain | 404 Error";
const PAGE_DESC = "404 - Page Not Found.";

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