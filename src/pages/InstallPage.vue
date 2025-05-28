<template>
<client-only>
    <vue-particles id="particlests" :options="HOME_BACKGROUND"></vue-particles>
</client-only>

<div id="install-page" class="personal-web-body">
    <div style="height: 100vh;"></div>
    <WebFooter />
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
onMounted(() => { initWebData(); });

useHead(getMeta("Mohit Jain | Install My Portfolio", "install",
    "My website can be installed as a Progressive Web Application (PWA) on this page."
));
</script>

<style scoped>
#install-page {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
</style>