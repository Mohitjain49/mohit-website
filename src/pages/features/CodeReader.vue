<script setup>
import { QrcodeStream, QrcodeDropZone } from 'vue-qrcode-reader';
const codeScanner = useCodeScannerStore();
const VUE_QRCODE_READER_GITHUB = "https://github.com/gruhn/vue-qrcode-reader";

onMounted(() => { codeScanner.mountCodeScanner(); });
onBeforeUnmount(() => { codeScanner.deactivateCamera(); });
useHead(getMeta("Mohit Jain | Barcode & Qrcode Scanner & Reader", "code-scanner",
    "This page is capable of scanning and reading the values of Barcodes and QR Codes."
));
</script>

<template>
<client-only>
    <vue-particles id="particlests" :options="CODE_SCANNER_BACKGROUND"></vue-particles>
</client-only>
<FeaturesReturnWidget />

<main id="code-reader-page" class="personal-web-body">
    <div class="code-scanner-main">
        <div class="scanner-component-container">
            <QrcodeStream v-if="codeScanner.scanMode == 0"
                @detect="(event) => {codeScanner.onDetectCode(event)}"
                @camera-on="(event) => {codeScanner.onCameraActive(event)}"
                @camera-off="(event) => {codeScanner.deactivateCamera(event)}"
                :formats="codeScanner.BARCODE_FORMATS"
                :style="{ 'display': (!codeScanner.cameraActive ? 'none' : '') }"
            />
            <div class="scanner-component-inactive"
                v-html="'Waiting On Camera...'"
                v-if="!codeScanner.cameraActive && codeScanner.scanMode == 0">
            </div>
            <QrcodeDropZone v-if="codeScanner.scanMode == 1" class="scanner-component-dropZone"
                @dragover="(e) => { codeScanner.setDraggingImage(e); }"
                @detect="(event) => {codeScanner.onDetectCode(event)}"
                :formats="codeScanner.BARCODE_FORMATS">
                
                {{ codeScanner.draggingImageText }}
            </QrcodeDropZone>
        </div>
        <div class="code-scanner-console">
            <div class="scanner-console-top">
                <div class="scanner-console-header"> <FontAwesomeIcon icon="fa-terminal" /> Console </div>
                <div class="scanner-console-utils">
                    <a :href="VUE_QRCODE_READER_GITHUB" target="vue-qrcode-reader" title="See the dependency This page uses.">
                        <FontAwesomeIcon icon="fa-brands fa-github-square" />
                    </a>
                    <button @click="codeScanner.setScanMode('toggle')" :title="codeScanner.scanModeBtnTitle">
                        <FontAwesomeIcon :icon="codeScanner.scanModeIcon" />
                    </button>
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

<div v-if="(codeScanner.scannedItemMenu != -1)" id="code-scanner-popup" class="webpage-cover">
    <div class="scanner-itemMenu">
        <button @click="codeScanner.setScannedItemMenu(-1)" class="scanner-itemMenu-closeBtn" title="Close Menu">
            <FontAwesomeIcon icon="fa-xmark" />
        </button>

        <input v-model="codeScanner.selectedItem.value" readonly />
        <div class="scanner-itemMenu-options">
            <button @click="codeScanner.removeSelectedItem()"
                class="scanner-itemMenu-opt delete"
                title="Remove Scanned Value From List">

                <FontAwesomeIcon icon="fa-trash" />
            </button>
            <button class="scanner-itemMenu-opt" @click="codeScanner.copySelectedScannedValue()" title="Copy Scanned Value">
                <FontAwesomeIcon :icon="codeScanner.copiedStatusIcon" />
            </button>
            <a v-if="codeScanner.selectedItem.onlineLink" title="Open Link"
                :href="codeScanner.selectedItem.value" target="_blank"
                class="scanner-itemMenu-opt link">

                <FontAwesomeIcon icon="fa-arrow-up-right-from-square" />
            </a>
        </div>
    </div>
</div>
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

.scanner-component-dropZone {
    position: relative;
    cursor: default;
    user-select: none;
    width: 100%;
    height: 100%;
    background-color: var(--dark-background);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    font-family: 'Lexend', sans-serif;
    font-size: 28px;
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
    gap: 7px;
    margin-right: 10px;
    margin-top: 2px;
}
.scanner-console-utils button, .scanner-console-utils a {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border: 1px solid;
    font-size: 14px;
    border-radius: 5px;
    color: white;
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

#code-scanner-popup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.9);
}
.scanner-itemMenu {
    position: relative;
    width: 500px;
    height: 250px;
    background-color: var(--dark-background);
    border: 2px solid var(--blue-two);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.scanner-itemMenu-closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px;
    color: red;
    border: 2px solid;
    border-radius: 50%;
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
}
.scanner-itemMenu-closeBtn svg {
    width: 17px;
    height: 17px;
}
.scanner-itemMenu-closeBtn:hover {
    background-color: black;
}

.scanner-itemMenu input {
    padding: 5px;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: 1px solid;
    color: var(--blue-two);
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    width: 80%;
    max-width: 80%;
    text-align: center;
    margin-bottom: 15px;
}
.scanner-itemMenu-options {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;
}

.scanner-itemMenu-opt {
    font-size: 16px;
    color: var(--blue-three);
    border: 2px dotted;
    border-radius: 12px;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition);
}
.scanner-itemMenu-opt:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

.scanner-itemMenu-opt.delete {
    color: red;
}
.scanner-itemMenu-opt.link {
    color: white;
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
@media (max-width: 600px) {
    .scanner-itemMenu {
        width: 300px;
        height: 200px;
    }
    .scanner-itemMenu input {
        font-size: 12px;
    }
}
</style>