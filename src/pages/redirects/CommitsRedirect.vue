<template>
<RedirectTemplate :website-link="PERSONAL_WEBSITE_COMMITS_LINK" />
</template>

<script setup>
useHead(getMetaWithLink("Mohit Jain | Commits",
    PERSONAL_WEBSITE_COMMITS_LINK,
    "This is the commit history for my website."
));
</script>