<template>
<RedirectTemplate :websiteLink="WORLDS_IVUE_LINK" />
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead(getMetaWithLink("Worlds iVue", WORLDS_IVUE_LINK,
    "This link will redirect you to Worlds iVue."
));
</script>