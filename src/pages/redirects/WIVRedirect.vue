<template>
<RedirectTemplate :websiteLink="WORLDS_IVUE_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { useHead } from '@unhead/vue';

import { WORLDS_IVUE_LINK } from '@/stores/Objects.js';
import { getMetaWithLink } from '@/stores/GetMeta';

useHead(getMetaWithLink("Worlds iVue", WORLDS_IVUE_LINK,
    "This link will redirect you to Worlds iVue."
));
</script>