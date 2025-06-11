<template>
<RedirectTemplate :websiteLink="GITHUB_LINK" />
</template>

<script setup>
const GITHUB_LINK = SOCIALS[3].link;
useHead(getMetaWithLink("Mohit Jain | GitHub", GITHUB_LINK,
    "This link will redirect you to my GitHub Profile."
))
</script>