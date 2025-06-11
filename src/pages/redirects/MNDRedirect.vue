<template>
<RedirectTemplate :websiteLink="MND_PROJECT_LINK" />
</template>

<script setup>
useHead(getMetaWithLink("MND - Mapping Neurodivergence", MND_PROJECT_LINK,
    "This link will direct you to " + MND_PROJECT_LINK + "."
));
</script>