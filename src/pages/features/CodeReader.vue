<script setup>
import { QrcodeStream } from 'vue-qrcode-reader';
const codeScanner = useCodeScannerStore();

onMounted(() => { codeScanner.mountCodeScanner(); });
onBeforeUnmount(() => { codeScanner.deactivateCamera(); });
useHead(getMeta("Mohit Jain | Barcode & Qrcode Scanner & Reader", "code-reader",
    "This page is capable of scanning and reading the values of Barcodes and QR Codes."
));
</script>

<template>
<client-only>
    <vue-particles id="particlests" :options="FEATURES_BACKGROUND"></vue-particles>
</client-only>
<FeaturesReturnWidget />

<main id="code-reader-page" class="personal-web-body">
    <div class="code-scanner-main">
        <div class="scanner-component-container">
            <QrcodeStream @detect="(event) => {codeScanner.onDetectCode(event)}"
                @camera-on="(event) => {codeScanner.onCameraActive(event)}"
                @camera-off="(event) => {codeScanner.deactivateCamera(event)}"
                :formats="codeScanner.BARCODE_FORMATS"
                :style="{ 'display': (!codeScanner.cameraActive ? 'none' : '') }"
            />
            <div v-if="!codeScanner.cameraActive" class="scanner-component-inactive"> Waiting On Camera... </div>
        </div>
        <div class="code-scanner-console">
            <div class="scanner-console-top">
                <div class="scanner-console-header"> <FontAwesomeIcon icon="fa-terminal" /> Console </div>
                <div class="scanner-console-utils">
                    <button @click="codeScanner.clearAllScannedItems()" title="Delete All Scanned Items" style="color: red;">
                        <FontAwesomeIcon icon="fa-trash" />
                    </button>
                </div>
            </div>
            <div class="scanner-console-body">
                <div class="scanned-code-item" v-for="(item, index) in codeScanner.scannedItems">
                    <p v-if="!item.onlineLink"> {{ truncate(item.value, 25) }} </p>
                    <a v-else :href="item.value" :title="('Open: ' + item.value)"> {{ truncate(item.value, 25) }} </a>

                    <button title="Open Info For Scanned Item" @click="codeScanner.setScannedItemMenu(index, true)">
                        <FontAwesomeIcon icon="fa-bars-staggered" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

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
    border: 2px solid white;
}
.scanner-component-inactive {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
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
.scanned-code-item p, .scanned-code-item a {
    font-family: 'Montserrat', sans-serif;
    color: inherit;
    font-size: 15px;
    font-weight: bold;
}
.scanned-code-item a:hover {
    text-decoration: underline;
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
    transition: var(--default-transition);
}
.scanned-code-item button:hover {
    background-color: black;
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