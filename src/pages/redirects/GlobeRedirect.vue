<template>
<RedirectTemplate :websiteLink="PERSONAL_GLOBE_LINK" />
</template>

<script setup>
import RedirectTemplate from '@/components/body-components/RedirectTemplate.vue';
import { PERSONAL_GLOBE_LINK } from '@/stores/Objects.js';
</script>