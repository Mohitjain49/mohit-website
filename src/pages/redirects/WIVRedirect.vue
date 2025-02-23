<template>
<RedirectTemplate :websiteLink="WORLDS_IVUE_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { WORLDS_IVUE_LINK } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

const PAGE_TITLE = "Worlds iVue";
const PAGE_DESC = "This link will redirect you to the Worlds iVue Platform.";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: WORLDS_IVUE_LINK },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: WORLDS_IVUE_LINK },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})
</script>