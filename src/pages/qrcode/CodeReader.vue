<template>
<main class="personal-web-body transparent">
    <div style="height: calc(100vh - 60px);"></div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Barcode & Qrcode Reader", "code-reader",
    "This page is capable of reading the values of Barcodes and QR Codes."
));

</script>