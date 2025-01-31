<template>
<NotCompleted :pageTitle="'Mohit Jain | My Globe'" :message="MESSAGE" :subtitle="SUBTITLE" />
</template>

<script setup>
import NotCompleted from '../components/body-components/NotCompleted.vue';
const MESSAGE = "Page Not Available.";
const SUBTITLE = "This page will soon be available again at globe.mohit-jain.com.";
</script>