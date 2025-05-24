<template>
<div id="gamepad-page" class="personal-web-body">
    <div style="height: 100vh"></div>
    <WebFooter />
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';

useHead(getMeta("Mohit Jain | Gamepad Controls", "gamepad",
    "This page list the controls for using a gamepad with my website."
));
</script>

<style scoped>

</style>