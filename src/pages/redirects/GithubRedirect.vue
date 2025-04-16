<template>
<RedirectTemplate :websiteLink="GITHUB_LINK" />
</template>

<script setup>
import { SOCIALS } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

import { getMetaWithLink } from '@/stores/GetMeta.js';
const GITHUB_LINK = SOCIALS[3].link;

useHead(getMetaWithLink("Mohit Jain | GitHub", GITHUB_LINK,
    "This link will redirect you to my GitHub Profile."
))
</script>