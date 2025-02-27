<template>
<RedirectTemplate :websiteLink="SUBLO_WEBSITE_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { SUBLO_WEBSITE_LINK } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

const PAGE_TITLE = "Mohit Jain | Sublo";
const PAGE_DESC = "This link will redirect you to Sublo's Website.";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: SUBLO_WEBSITE_LINK },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: SUBLO_WEBSITE_LINK },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})
</script>