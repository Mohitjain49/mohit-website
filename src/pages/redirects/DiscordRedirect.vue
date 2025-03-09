<template>
<RedirectTemplate :websiteLink="DISCORD_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { SOCIALS } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

import { getMetaWithLink } from '@/stores/GetMeta.js';
const DISCORD_LINK = SOCIALS[2].link;

useHead(getMetaWithLink("Mohit Jain | Discord", DISCORD_LINK,
    "This link will redirect you to my Discord Profile."
))
</script>