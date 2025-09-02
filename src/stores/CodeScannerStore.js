export const useCodeScannerStore = defineStore("code-scanner-store", () => {
    const SCANNED_ITEMS_KEY = "mohit-codeScanner-items";

    /**
     * @type {import('vue').Ref<Array<{ value: String, format: String, onlineLink: Boolean }>>}
     * This is the array of codes scanned by the camera.
     */
    const scannedItems = ref([]);
    const cameraActive = ref(false);
    const scannedItemMenu = ref(-1);

    /**
     * This function mounts the page hosting the code scanner.
     */
    function mountCodeScanner() {
        initWebData();
        const lastScannedItems = localStorage.getItem(SCANNED_ITEMS_KEY);
        scannedItems.value = ((lastScannedItems == null) ? [] : JSON.parse(lastScannedItems));
    }

    /**
     * This function unmounts the page hosting the code scanner.
     */
    function unmountCodeScanner() {
        deactivateCamera();
        setScannedItemMenu(-1);
    }

    /**
     * This function is run whenever a visior activates their camera for the webpage.
     */
    function onCameraActive(event = {}) {
        if(import.meta.env.DEV) { console.log(event); }
        cameraActive.value = true;
    }

    /**
     * This function sets the "cameraActive" boolean to false.
     * Note that this doesn't actually deactivate the camera.
     */
    function deactivateCamera(event = {}) {
        if(import.meta.env.DEV) { console.log(event); }
        cameraActive.value = false;
    }

    /**
     * This is triggered every time a new code is scanned.
     * @param {Array<{ rawValue: String, format: String }>} event The object made by the event.
     */
    function onDetectCode(event) {
        if(import.meta.env.DEV) { console.log(event); }
        for(let i = 0; i < event.length; i++) {
            const item = event[i];
            const onlineLink = (item.rawValue.startsWith("https://") ||
                item.rawValue.startsWith("http://") ||
                item.rawValue.startsWith("mailto:") ||
                item.rawValue.startsWith("tel:")
            );
            scannedItems.value.push({ value: item.rawValue, format: item.format, onlineLink });
        }

        triggerScanSound();
        setLocalStorageObj();
    }

    /**
     * This function clears all scanned items from the list.
     */
    function clearAllScannedItems() {
        scannedItems.value = [];
        setLocalStorageObj();
    }

    /**
     * This function sets the local storage object so that visitors can access scanned items later.
     */
    function setLocalStorageObj() {
        localStorage.setItem(SCANNED_ITEMS_KEY, JSON.stringify(scannedItems.value));
    }

    /**
     * This function sets which scanned item menu is open or not.
     * @param {Number} index The new index for which scanned item should be displayed.
     * @param {Boolean} toggle Sets the variable to -1 if true and if the variable equals the passed in index.
     */
    function setScannedItemMenu(index = -1, toggle = false) {
        scannedItemMenu.value = ((toggle && index == scannedItemMenu.value) ? -1 : index);
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

    return { scannedItems, cameraActive, scannedItemMenu, BARCODE_FORMATS,
        mountCodeScanner, unmountCodeScanner, clearAllScannedItems, setScannedItemMenu,
        onCameraActive, deactivateCamera, onDetectCode
    }
});