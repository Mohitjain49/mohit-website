<template>
<main class="personal-web-body">
    <div style="height: calc(100vh - 60px)"></div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Gamepad Controls", "gamepad",
    "These are the gamepad controls on my website."
))
</script>

<style scoped>

</style>