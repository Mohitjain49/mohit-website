<template>
<RedirectTemplate :websiteLink="PERSONAL_GLOBE_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { PERSONAL_GLOBE_LINK } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

const WEBSITE_PATH = "https://mohit-jain.com/globe";
const PAGE_TITLE = "Mohit Jain | My Globe";
const PAGE_DESC = "This link will redirect you to my globe.";

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