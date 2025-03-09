<template>
<RedirectTemplate :websiteLink="LINKEDIN_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { SOCIALS } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

import { getMetaWithLink } from '@/stores/GetMeta.js';
const LINKEDIN_LINK = SOCIALS[1].link;

useHead(getMetaWithLink("Mohit Jain | LinkedIn", LINKEDIN_LINK,
    "This link will redirect you to my LinkedIn Profile."
));
</script>