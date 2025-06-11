<template>
<RedirectTemplate :websiteLink="SUBLO_WEBSITE_LINK" />
</template>

<script setup>
useHead(getMetaWithLink("Mohit Jain | Sublo", SUBLO_WEBSITE_LINK,
    "This link will redirect you to Sublo's Website."
));
</script>