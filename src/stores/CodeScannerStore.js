export const useCodeScannerStore = defineStore("code-scanner-store", () => {
    const SCANNED_ITEMS_KEY = "mohit-codeScanner-items";

    /**
     * @type {import('vue').Ref<Array<{ value: String, format: String, onlineLink: Boolean }>>}
     * This is the array of codes scanned by the camera.
     */
    const scannedItems = ref([]);
    const cameraActive = ref(false);
    const draggingImage = ref(false);

    const scanMode = ref(0);
    const scannedItemMenu = ref(-1);

    const copiedTimeout = ref(null);
    const copiedStatus = ref(0);

    const selectedItem = computed(() => {
        return ((scannedItemMenu.value == -1) ? null : scannedItems.value[scannedItemMenu.value]);
    });
    const copiedStatusIcon = computed(() => {
        return ((copiedStatus.value == 0) ? 'fa-copy' : ((copiedStatus.value == 1) ? 'fa-check' : 'fa-ban'));
    });

    const scanModeIcon = computed(() => { return ((scanMode.value == 0) ? "fa-file-arrow-up" : "fa-video"); });
    const scanModeBtnTitle = computed(() => { return ((scanMode.value == 0) ? "Switch To Drag and Drop" : "Switch to Video"); });
    const draggingImageText = computed(() => { return (!draggingImage.value ? "Drag Your Image Here..." : "Drop Your Image."); });

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
        setDraggingImage(false);
    }

    /**
     * This function sets which Scan component should be used.
     * @param {Number | String} index If equal to "toggle", toggles the value between 0 and 1, otherwise just a number.
     */
    function setScanMode(index = "toggle") {
        scanMode.value = ((index === "toggle") ? ((scanMode.value != 0) ? 0 : 1) : index);
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
            const rawValue = item.rawValue;

            const onlineLink = (rawValue.startsWith("https://") ||
                rawValue.startsWith("http://") ||
                rawValue.startsWith("mailto:") ||
                rawValue.startsWith("tel:")
            );
            scannedItems.value.push({ value: rawValue, format: item.format, onlineLink });
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
     * This function removes the selected item from the list.
     */
    function removeSelectedItem() {
        const index = (scannedItemMenu.value == -1 ? (scannedItems.value.length - 1) : scannedItemMenu.value);
        if(index == -1) { return; }
        setScannedItemMenu(-1);

        scannedItems.value.splice(index, 1);
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
        document.body.style.overflow = ((scannedItemMenu.value == -1) ? "" : "hidden");
    }

    /**
     * This function copies the value of the selected scanned value.
     */
    function copySelectedScannedValue() {
        if(copiedTimeout.value != null) { clearTimeout(copiedTimeout.value); }
        navigator.clipboard.writeText(selectedItem.value.value).then(() => {
            copiedStatus.value = 1;
            copiedTimeout.value = setTimeout(() => {
                copiedStatus.value = 0;
                copiedTimeout.value = null;
            }, 3500);
        }).catch(() => {
            copiedStatus.value = 2;
            copiedTimeout.value = setTimeout(() => {
                copiedStatus.value = 0;
                copiedTimeout.value = null;
            }, 3500);
        });
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

    return { scannedItems, cameraActive, scannedItemMenu, scanMode, draggingImage,
        selectedItem, copiedStatusIcon, scanModeIcon, scanModeBtnTitle, draggingImageText, BARCODE_FORMATS,
        mountCodeScanner, unmountCodeScanner, clearAllScannedItems, setScannedItemMenu, setScanMode,
        onCameraActive, deactivateCamera, onDetectCode, setDraggingImage, removeSelectedItem, copySelectedScannedValue
    }
});