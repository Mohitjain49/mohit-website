<template>
<client-only>
    <vue-particles id="particlests" :options="FEATURES_BACKGROUND"></vue-particles>
</client-only>

<main id="code-reader-page" class="personal-web-body">
    <div class="code-scanner-main">
        <div class="scanner-component-container">
            <QrcodeStream @detect="onDetect" @camera-on="onCameraActive" :formats="selectedBarcodeFormats" />
        </div>
    </div>
</main>
<FeaturesReturnWidget />
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader';
onMounted(() => { initWebData(); console.log(selectedBarcodeFormats.value) });
useHead(getMeta("Mohit Jain | Barcode & Qrcode Reader", "code-reader",
    "This page is capable of reading the values of Barcodes and QR Codes."
));

function onCameraActive(event) {
    console.log(event);
}

function onDetect(event) {
    console.log(event);
}

const barcodeFormats = ref({
    aztec: true,
    code_128: true,
    code_39: true,
    code_93: true,
    codabar: true,
    databar: true,
    databar_expanded: true,
    data_matrix: true,
    dx_film_edge: true,
    ean_13: true,
    ean_8: true,
    itf: true,
    maxi_code: true,
    micro_qr_code: true,
    pdf417: true,
    qr_code: true,
    rm_qr_code: true,
    upc_a: true,
    upc_e: true,
    linear_codes: true,
    matrix_codes: true
})
const selectedBarcodeFormats = computed(() => {
    return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
})
</script>

<style scoped>
.personal-web-body#code-reader-page {
    background: rgba(0, 0, 0, 0.6);
}
.code-scanner-main {
    width: 100%;
    height: var(--body-height);
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.scanner-component-container {
    height: 80%;
    width: 65%;
    max-width: 875px;
    max-height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
}

@media (max-width: 850px) {
    .scanner-component-container {
        width: 90%;
    }
}
</style>