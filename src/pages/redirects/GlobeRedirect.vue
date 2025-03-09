<template>
<RedirectTemplate :websiteLink="PERSONAL_GLOBE_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { useHead } from '@unhead/vue';

import { PERSONAL_GLOBE_LINK } from '@/stores/Objects.js';
import { getMetaWithLink } from '@/stores/GetMeta';

useHead(getMetaWithLink("Mohit Jain - My Globe", PERSONAL_GLOBE_LINK,
    "This link will direct you to my personal globe."
));
</script>