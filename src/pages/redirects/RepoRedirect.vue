<template>
<RedirectTemplate :websiteLink="PERSONAL_WEBSITE_REPOSITORY_LINK" />
</template>

<script setup>
import { useHead } from '@unhead/vue';
useHead(getMetaWithLink("Mohit Jain - My Globe",
    PERSONAL_WEBSITE_REPOSITORY_LINK,
    "This link will direct you to my personal globe."
));
</script>