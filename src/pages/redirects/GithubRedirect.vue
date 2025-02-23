<template>
<RedirectTemplate :websiteLink="GITHUB_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { SOCIALS } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

const GITHUB_LINK = SOCIALS[3].link;
const PAGE_TITLE = "Mohit Jain | GitHub";
const PAGE_DESC = "This link will redirect you to my GitHub Profile.";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: GITHUB_LINK },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: GITHUB_LINK },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})
</script>