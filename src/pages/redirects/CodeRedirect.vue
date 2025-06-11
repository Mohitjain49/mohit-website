<template>
<RedirectTemplate :websiteLink="PERSONAL_WEBSITE_CODE_SANDBOX" />
</template>

<script setup>
useHead(getMetaWithLink("Mohit Jain | Code Sandbox",
    PERSONAL_WEBSITE_CODE_SANDBOX,
    "This link will direct you to codesandbox.io, which shows the code behind this website."
));
</script>