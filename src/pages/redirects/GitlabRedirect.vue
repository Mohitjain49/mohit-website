<template>
<RedirectTemplate :websiteLink="GITLAB_LINK" />
</template>

<script setup>
import { useHead } from '@unhead/vue';
const GITLAB_LINK = SOCIALS[4].link;

useHead(getMetaWithLink("Mohit Jain | GitLab", GITLAB_LINK,
    "This link will redirect you to my GitLab Profile."
));
</script>