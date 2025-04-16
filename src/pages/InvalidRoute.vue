<template>
<NotCompleted :pageTitle="'Mohit Jain | Invalid'" :message="PAGE_DESC" />
</template>

<script setup>
import { useHead } from '@unhead/vue';
const PAGE_DESC = "404 - Page Not Found.";
useHead(getMeta("Mohit Jain | 404 Error", "404", PAGE_DESC))
</script>