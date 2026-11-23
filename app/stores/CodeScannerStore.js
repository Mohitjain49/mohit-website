export const useCodeScannerStore = defineStore("code-scanner-store", () => {
    const SCANNED_ITEMS_KEY = "mohit-codeScanner-items";
    const webData = useWebsiteDataStore();

    /**
     * @type {Ref<Array<{ value: String, format: String, onlineLink: Boolean }>>}
     * This is the array of codes scanned by the camera.
     */
    const scannedItems = ref([]);
    const cameraActive = ref(false);
    const draggingImage = ref(false);
    const scanMode = ref(0);

    const scanModeIcon = computed(() => { return ((scanMode.value == 0) ? "fa-file-arrow-up" : "fa-video"); });
    const scanModeBtnTitle = computed(() => { return ((scanMode.value == 0) ? "Switch To Drag and Drop" : "Switch to Video"); });
    const draggingImageText = computed(() => {
        return (!draggingImage.value ? "Click Here or Drag Your Image Here To Find Its QR Codes." : "Drop Your Image Here.");
    });

    /** This function mounts the page hosting the code scanner. */
    function mountCodeScanner() {
        const lastScannedItems = localStorage.getItem(SCANNED_ITEMS_KEY);
        scannedItems.value = ((lastScannedItems == null) ? [] : JSON.parse(lastScannedItems));
    }

    /** This function unmounts the page hosting the code scanner. */
    function unmountCodeScanner() {
        deactivateCamera();
        setDraggingImage(false);
    }

    /**
     * This function sets which Scan component should be used.
     * @param {Number | String} index If equal to "toggle", toggles the value between 0 and 1, otherwise just a number.
     */
    function setScanMode(index = "toggle") {
        scanMode.value = ((index === "toggle") ? ((scanMode.value != 0) ? 0 : 1) : index);
        if(scanMode.value != 0) { deactivateCamera({}); }
    }

    /** This function is run whenever a visior activates their camera for the webpage. */
    function onCameraActive(event = {}) {
        if(import.meta.dev) { console.log(event); }
        cameraActive.value = true;
    }

    /** This function sets the "cameraActive" boolean to false. Note that this doesn't actually deactivate the camera. */
    function deactivateCamera(event = {}) {
        if(import.meta.dev) { console.log(event); }
        cameraActive.value = false;
    }

    /**
     * This is triggered every time a new code is scanned.
     * @param {Array<{ rawValue: String, format: String }>} event The object made by the event.
     */
    function onDetectCode(event) {
        if(import.meta.dev) { console.log(event); }
        for(let i = 0; i < event.length; i++) {
            const item = event[i];
            const rawValue = item.rawValue;
            scannedItems.value.push({ value: rawValue, format: item.format, onlineLink: validateLink(rawValue) });
        }

        triggerScanSound();
        setLocalStorageObj();
    }

    /**
     * This function sets whether an image is being dragged onto the scanner drop component.
     * @param {Boolean} event The event returned by the scanner component.
     */
    function setDraggingImage(event = false) {
        draggingImage.value = event;
    }

    /**
     * This function opens the share popup for a selected item from the list.
     * @param {Number} index The index of the scanned item.
     */
    function shareScannedItem(index = 0) {
        if(index < 0 || index >= scannedItems.value.length) { return; }
        webData.setQRCodePopup(scannedItems.value[index].value);
    }

    /**
     * This function removes the selected item from the list.
     * @param {Number} index The index of the selected scanned item.
     */
    function removeSelectedItem(index = 0) {
        if(index < 0 || index >= scannedItems.value.length) { return; }
        scannedItems.value.splice(index, 1);
        setLocalStorageObj();
    }

    /** This function clears all scanned items from the list. */
    function clearAllScannedItems() {
        scannedItems.value = [];
        setLocalStorageObj();
    }

    /** This function sets the local storage object so that visitors can access scanned items later. */
    function setLocalStorageObj() { localStorage.setItem(SCANNED_ITEMS_KEY, JSON.stringify(scannedItems.value)); }

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

    return { scannedItems, cameraActive, scanMode, draggingImage,
        scanModeIcon, scanModeBtnTitle, draggingImageText, BARCODE_FORMATS,
        mountCodeScanner, unmountCodeScanner, clearAllScannedItems, setScanMode, shareScannedItem,
        onCameraActive, deactivateCamera, onDetectCode, setDraggingImage, removeSelectedItem
    }
});