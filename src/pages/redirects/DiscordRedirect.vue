<template>
<RedirectTemplate :websiteLink="DISCORD_LINK" />
</template>

<script setup>
const DISCORD_LINK = SOCIALS[2].link;
useHead(getMetaWithLink("Mohit Jain | Discord", DISCORD_LINK,
    "This link will redirect you to my Discord Profile."
))
</script>