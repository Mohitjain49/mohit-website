<template>
<RedirectTemplate :websiteLink="PERSONAL_WEBSITE_REPOSITORY_LINK" />
</template>

<script setup>
useHead(getMetaWithLink("Mohit Jain | Website Repository",
    PERSONAL_WEBSITE_REPOSITORY_LINK,
    "This link will direct you to this website's GitHub Repository."
));
</script>