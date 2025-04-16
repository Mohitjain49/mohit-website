<template>
<RedirectTemplate :websiteLink="SUBLO_WEBSITE_LINK" />
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { SUBLO_WEBSITE_LINK } from '@/stores/Objects.js';
import { getMetaWithLink } from '@/stores/GetMeta.js';

useHead(getMetaWithLink("Mohit Jain | Sublo", SUBLO_WEBSITE_LINK,
    "This link will redirect you to Sublo's Website."
));
</script>