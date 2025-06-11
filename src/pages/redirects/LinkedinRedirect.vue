<template>
<RedirectTemplate :websiteLink="LINKEDIN_LINK" />
</template>

<script setup>
const LINKEDIN_LINK = SOCIALS[1].link;
useHead(getMetaWithLink("Mohit Jain | LinkedIn", LINKEDIN_LINK,
    "This link will redirect you to my LinkedIn Profile."
));
</script>