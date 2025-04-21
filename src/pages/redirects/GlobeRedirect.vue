<template>
<RedirectTemplate :websiteLink="PERSONAL_GLOBE_LINK" />
</template>

<script setup>
import { useHead } from '@unhead/vue';
useHead(getMetaWithLink("Mohit Jain - My Globe", PERSONAL_GLOBE_LINK,
    "This link will direct you to my personal globe."
));
</script>