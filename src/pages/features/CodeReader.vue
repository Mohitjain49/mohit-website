<template>
<client-only>
    <vue-particles id="particlests" :options="FEATURES_BACKGROUND"></vue-particles>
</client-only>

<main id="code-reader-page" class="personal-web-body">
    <div class="code-scanner-main">
        <div class="scanner-component-container">
            <QrcodeStream @detect="onDetect" @camera-on="onCameraActive"
                :formats="BARCODE_FORMATS"
                :style="{ 'display': (!cameraActive ? 'none' : '') }"
            />
            <div v-if="!cameraActive" class="scanner-component-inactive"> Waiting On Camera... </div>
        </div>
        <div class="code-scanner-console">
            <div class="scanner-console-top">
                <div class="scanner-console-header"> <FontAwesomeIcon icon="fa-terminal" /> Console </div>
                <div class="scanner-console-utils">
                    <button @click="clearAllScannedItems()" title="Delete All Scanned Items" style="color: red;">
                        <FontAwesomeIcon icon="fa-trash" />
                    </button>
                </div>
            </div>
            <div class="scanner-console-body">
                <div class="scanned-code-item" v-for="item in scannedItemsArray">
                    <p> {{ truncate(item.value, 25) }} </p>
                    <button title="Open Info For Scanned Item" @click="() => {}">
                        <FontAwesomeIcon icon="fa-bars-staggered" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>
<FeaturesReturnWidget />
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader';
const cameraActive = ref(false);

/**
 * @type {import('vue').Ref<Array<{ value: String, format: String }>>}
 * This is the array of codes scanned by the camera.
 */
const scannedItemsArray = ref([{ value: "https://www.mohit-jain.com/", format: "qr_code" }]);
/**
 * This function is run whenever a visior activates their camera for the webpage.
 */
function onCameraActive(event) {
    if(import.meta.env.DEV) { console.log(event); }
    cameraActive.value = true;
}

/**
 * This is triggered every time a new code is scanned.
 * @param {Array<{ rawValue: String, format: String }>} event The object made by the event.
 */
function onDetect(event) {
    if(import.meta.env.DEV) { console.log(event); }
    triggerScanSound();
    for(let i = 0; i < event.length; i++) {
        const item = event[i];
        scannedItemsArray.value.push({ value: item.rawValue, format: item.format });
    }
}

/**
 * This function clears all scanned items from the list.
 */
function clearAllScannedItems() {
    scannedItemsArray.value = [];
}

const BARCODE_FORMATS = [
    "aztec",
    "code_128",
    "code_39",
    "code_93",
    "codabar",
    "databar",
    "databar_expanded",
    "data_matrix",
    "dx_film_edge",
    "ean_13",
    "ean_8",
    "itf",
    "maxi_code",
    "micro_qr_code",
    "pdf417",
    "qr_code",
    "rm_qr_code",
    "upc_a",
    "upc_e",
    "linear_codes",
    "matrix_codes"
];

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Barcode & Qrcode Reader", "code-reader",
    "This page is capable of reading the values of Barcodes and QR Codes."
));
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

.scanned-code-item {
    width: calc(100% - 20px);
    height: fit-content;
    margin-left: 4px;
    margin-top: 5px;
    padding: 5px;
    color: var(--blue-zero);
    border: 1px solid var(--blue-two);
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
.scanned-code-item p {
    font-family: 'Montserrat', sans-serif;
    color: inherit;
    font-size: 15px;
    font-weight: bold;
}

.scanned-code-item button {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 5px;
    padding: 4px;
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