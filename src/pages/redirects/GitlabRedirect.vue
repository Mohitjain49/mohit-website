<template>
<RedirectTemplate :websiteLink="GITLAB_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { SOCIALS } from '@/stores/Objects.js';
import { useHead } from '@unhead/vue';

import { getMetaWithLink } from '@/stores/GetMeta.js';
const GITLAB_LINK = SOCIALS[4].link;

useHead(getMetaWithLink("Mohit Jain | GitLab", GITLAB_LINK,
    "This link will redirect you to my GitLab Profile."
));
</script>