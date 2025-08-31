<template>
<client-only>
    <vue-particles id="particlests" :options="FEATURES_BACKGROUND"></vue-particles>
</client-only>

<main id="code-reader-page" class="personal-web-body">
    <div class="code-scanner-main">
        <div class="scanner-component-container">
            <QrcodeStream @detect="onDetect" @camera-on="onCameraActive"
                :formats="selectedBarcodeFormats"
                :style="{ 'display': (!cameraActive ? 'none' : '') }"
            />
            <div v-if="!cameraActive" class="scanner-component-inactive"> Waiting On Camera... </div>
        </div>
        <div class="code-scanner-console">
            <div class="scanner-console-top">
                <div class="scanner-console-header"> <FontAwesomeIcon icon="fa-terminal" /> Console </div>
                <div class="scanner-console-utils">
                    <button @click="() => {}" title="Delete All Scanned Items" style="color: red;">
                        <FontAwesomeIcon icon="fa-trash" />
                    </button>
                </div>
            </div>
            <div class="scanner-console-body"></div>
        </div>
    </div>
</main>
<FeaturesReturnWidget />
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader';
const cameraActive = ref(false);

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Barcode & Qrcode Reader", "code-reader",
    "This page is capable of reading the values of Barcodes and QR Codes."
));

function onCameraActive(event) {
    console.log(event);
    cameraActive.value = true;
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
    flex-direction: row;
    gap: 20px;
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
.scanner-component-inactive {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    border: 2px dashed;
    font-family: 'Lexend', sans-serif;
    font-size: 28px;
    border-radius: 20px;
    background-color: var(--dark-background);
}

.code-scanner-console {
    height: calc(80% - 4px);
    width: 296px;
    max-height: 546px;
    background-color: var(--dark-background);
    border: 2px solid var(--blue-cobalt);
    color: var(--blue-cobalt);
    border-radius: 20px;
    overflow: hidden;
}
.scanner-console-top {
    height: 31px;
    color: inherit;
    border-bottom: 2px solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}

.scanner-console-header {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: inherit;
    font-size: 17px;
    font-family: 'Lexend', sans-serif;
    user-select: none;
    margin-left: 10px;
}
.scanner-console-header svg {
    font-size: 14px;
    padding: 2px;
    border: 1px solid;
    margin-right: 3px;
    border-radius: 5px;
}

.scanner-console-utils {
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 15px;
    margin-right: 10px;
    margin-top: 2px;
}
.scanner-console-utils button {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border: 1px solid;
    font-size: 14px;
    border-radius: 5px;
}

@media (max-width: 1050px) {
    .code-scanner-main {
        flex-direction: column-reverse;
        min-height: 1200px;
    }
    .scanner-component-container {
        width: 90%;
    }
    .code-scanner-console {
        width: calc(90% - 4px);
    }
}
</style>