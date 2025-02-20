<template></template>

<script setup>
import { initWebData } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

onMounted(() => { initWebData(); });
</script>