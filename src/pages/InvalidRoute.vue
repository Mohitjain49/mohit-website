<template>
<NotCompleted :pageTitle="'Mohit Jain | Invalid'" :message="PAGE_DESC" />
</template>

<script setup>
import NotCompleted from '@/components/body-components/NotCompleted.vue';
import { useHead } from '@unhead/vue';

import { getMeta } from '@/stores/GetMeta.js';
const PAGE_DESC = "404 - Page Not Found.";

useHead(getMeta("Mohit Jain | 404 Error", "404", PAGE_DESC))
</script>