<template>
<RedirectTemplate :websiteLink="LINKEDIN_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { SOCIALS } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

const LINKEDIN_LINK = SOCIALS[1].link;
const PAGE_TITLE = "Mohit Jain | LinkedIn";
const PAGE_DESC = "This link will redirect you to my LinkedIn Profile.";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: LINKEDIN_LINK },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: LINKEDIN_LINK },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})
</script>