<template>
<RedirectTemplate :websiteLink="MAIN_IVUE_WEBSITE_LINK" />
</template>

<script setup>
useHead(getMetaWithLink("iVue - iVue The World", MAIN_IVUE_WEBSITE_LINK,
    "This link will redirect you to the Main iVue Website."
));
</script>