<template>
<RedirectTemplate :websiteLink="PIZZA_WEBSITE_LINK" />
</template>

<script setup>
useHead(getMetaWithLink("Mohit Jain - Pizza Project", PIZZA_WEBSITE_LINK,
    "This link will direct you to my pizza project."
));
</script>