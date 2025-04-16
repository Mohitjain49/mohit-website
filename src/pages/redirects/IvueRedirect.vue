<template>
<RedirectTemplate :websiteLink="MAIN_IVUE_WEBSITE_LINK" />
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { MAIN_IVUE_WEBSITE_LINK } from '@/stores/Objects.js';
import { getMetaWithLink } from '@/stores/GetMeta.js';

useHead(getMetaWithLink("iVue - iVue The World", MAIN_IVUE_WEBSITE_LINK,
    "This link will redirect you to the Main iVue Website."
));
</script>