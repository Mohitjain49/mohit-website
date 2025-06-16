<template>
<client-only>
    <vue-particles id="particlests" :options="NIGHT_BACKGROUND"></vue-particles>
</client-only>

<main class="personal-web-body transparent">
    <div class="search-wrapper">
        <h1>Search the Site</h1>
        <div id="search"></div>
    </div>
</main>
</template>

<script setup>
import { PagefindUI } from '@pagefind/default-ui';
import "@pagefind/default-ui/css/ui.css";

onMounted(() => {
    new PagefindUI({ element: '#search' });
})
</script>

<style scoped>
.search-wrapper {
    max-width: 800px;
    margin: 2rem auto;
    font-family: sans-serif;
}
</style>