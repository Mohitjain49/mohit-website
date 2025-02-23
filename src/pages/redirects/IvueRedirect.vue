<template>
<RedirectTemplate :websiteLink="'/#ivue'" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { useHead } from '@unhead/vue';

const WEBSITE_PATH = "https://mohit-jain.com/#ivue";
const PAGE_TITLE = "Mohit Jain | iVue";
const PAGE_DESC = "This link will redirect you to my website's section of iVue.";

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