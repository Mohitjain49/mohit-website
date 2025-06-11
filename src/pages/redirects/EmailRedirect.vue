<template>
<RedirectTemplate :websiteLink="EMAIL_LINK" :emailPage="true" />
</template>

<script setup>
const EMAIL_LINK = SOCIALS[0].link;
useHead(getMetaWithLink("Mohit Jain | Email Me", EMAIL_LINK,
    "This link will redirect you to your email client for you to email me."
))
</script>