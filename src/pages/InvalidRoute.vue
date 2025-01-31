<template>
<NotCompleted :pageTitle="'Mohit Jain | Invalid'" :message="MESSAGE" />
</template>

<script setup>
import NotCompleted from '../components/body-components/NotCompleted.vue';
const MESSAGE = '404 - Page Not Found';
</script>