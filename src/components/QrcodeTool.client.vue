<template>
<div id="qr-code-popup" class="webpage-cover">
    <div class="qrcode-mainPopup animate__animated animate__bounceIn">
        <button class="popup-qr-text" @click="copyQRCodeLink()" title="Copy Link"> {{ truncate(qrCodeFormattedLink, ((windowWidth > 625) ? 54 : 47)) }} </button>
        <client-only> <div id="mohit-qrcode" :style="qrCodeDisplay"></div> </client-only>

        <div class="qrcode-mainPopup-options">
            <button v-if="webData.shareSupported" @click="copyQRCodeLink()" class="qrcode-mainPopup-btn light" :title="(linkCopied ? 'Copied Link!' : 'Copy Link')">
                <FontAwesomeIcon :icon="(linkCopied ? 'fa-check' : 'fa-copy')" :flip="linkCopied" />
            </button>
            <button v-if="webData.shareSupported" @click="webData.shareLink(qrCodeLink)" class="qrcode-mainPopup-btn light" title="Share Webpage Link">
                <FontAwesomeIcon icon="fa-share-nodes" />
            </button>
            <div class="qrcode-mainPopup-btn_v2">
                <button @click="setImageOptions('toggle')" class="qrcode-mainPopup-btn"
                    :title="((showImageOptions ? 'Close' : 'See') + ' Image Options')">

                    <FontAwesomeIcon icon="fa-image" />
                </button>
                <Transition name="fade-transition">
                    <div v-if="showImageOptions" class="qrcode-image-options">
                        <button v-if="webData.shareSupported" @click="shareQRCode()" class="qrcode-mainPopup-btn yellow" title="Share QR Code">
                            <FontAwesomeIcon icon="fa-share" />
                        </button>
                        <button @click="downloadQRCode()" class="qrcode-mainPopup-btn yellow" title="Download QR Code.">
                            <FontAwesomeIcon icon="fa-download" />
                        </button>
                    </div>
                </Transition>
            </div>
        </div>

        <button @click="webData.setQRCodePopup('quit')" class="qrcode-mainPopup-btn close" title="Close Popup">
            <FontAwesomeIcon icon="fa-xmark" />
        </button>
        <button v-if="(sharePopupMode == 0)" @click="webData.setQRCodePopup('filter')" class="qrcode-mainPopup-btn topLeft light" title="Remove All Hashes">
            <FontAwesomeIcon icon="fa-filter" />
        </button>
        <a v-if="showOpenNewTabButton" :href="qrCodeLink" target="_blank" class="qrcode-mainPopup-btn topLeft white" title="Open Link In New Tab">
            <FontAwesomeIcon icon="fa-up-right-from-square" />
        </a>
    </div>
</div>
</template>

<script setup>
import QRCodeStyling from 'qr-code-styling';
const router = useRouter();
const webData = useWebsiteDataStore();
const codeScannerStore = useCodeScannerStore();

const { width: windowWidth } = useWindowSize();
const overflowLocked = useScrollLock(document.body);

/** @type {Ref<QRCodeStyling>} This stores the qrcode object created when aking the QR Code for the Popup. */
const qrcode = ref(null);
const qrCodeLink = ref(PERSONAL_WEBSITE_LINK);
const qrCodeDisplay = ref({ display: "none" });

const sharePopupMode = ref(0);
const showImageOptions = ref(false);

const qrdata = computed(() => { return (router.currentRoute.value.query.qrdata ?? null); });
const qrCodeFormattedLink = computed(() => {
    if(typeof qrCodeLink.value !== "string") { return qrCodeLink.value; }
    if(qrCodeLink.value.startsWith("mailto:")) { return qrCodeLink.value.substring(7); }
    if(qrCodeLink.value.startsWith("tel:")) { return qrCodeLink.value.substring(4); }
    return qrCodeLink.value;
});
const showOpenNewTabButton = computed(() => {
    return (sharePopupMode == 2 && !qrCodeLink.startsWith(PERSONAL_WEBSITE_LINK));
});

const linkCopied = ref(false);
var copiedTimeout = null;

onMounted(() => {
    overflowLocked.value = true;
    nextTick(() => { setQRCodeLink(); });
});
onBeforeUnmount(() => {
    qrCodeDisplay.value.display = "none";
    overflowLocked.value = (codeScannerStore.scannedItemMenu != -1);
});

// This watches for changes to the QR Code Data so the popup changes reactively.
watch(qrdata, () => { setQRCodeLink(); });

/**
 * This function sets the link for the Share Popup.
 */
function setQRCodeLink() {
    const data = qrdata.value;
    const route = router.currentRoute.value;

    if(data === "main") {
        qrCodeLink.value = (PERSONAL_WEBSITE_LINK + (route.path.substring(1) + route.hash));
        sharePopupMode.value = ((route.hash === "") ? 1 : 0);
    } else if(data === "filter") {
        qrCodeLink.value = (PERSONAL_WEBSITE_LINK + route.path.substring(1));
        sharePopupMode.value = 1;
    } else {
        qrCodeLink.value = route.query.qrdata;
        sharePopupMode.value = 2;
    }

    if(qrcode.value != null) {
        qrcode.value.update({ data: qrCodeLink.value });
    } else {
        qrcode.value = new QRCodeStyling({
            width: 450,
            height: 450,
            type: 'canvas',
            data: qrCodeLink.value,
            image: "/static-icons/Personal_Icon_Expanded_Rounded.png",
            margin: 10,
            dotsOptions: {
                color: 'black',
                type: 'rounded'
            },
            cornersSquareOptions: {
                color: 'black',
                type: 'extra-rounded'
            },
            cornersDotOptions: {
                color: 'black',
                type: 'dot'
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 5,
                crossOrigin: 'anonymous',
            },
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'Q',
            },
            backgroundOptions: { color: '#E5E5E5' },
        });

        qrcode.value.append(document.getElementById("mohit-qrcode"));
        qrCodeDisplay.value.display = "block";
    }
}

/**
 * This function copies the QR Code Link currently visible.
 */
function copyQRCodeLink() {
    navigator.clipboard.writeText(qrCodeFormattedLink.value).then(() => {
        if(copiedTimeout != null) { clearTimeout(copiedTimeout); }
        linkCopied.value = true;

        copiedTimeout = setTimeout(() => {
            linkCopied.value = false;
            copiedTimeout = null;
        }, 3000);
    });
}

/**
 * This function sets a boolean that sets whether to show the image options.
 * @param {Boolean | "toggle"} status The new status for the image options. If it is set to "toggle", then it just flips the value.
 */
function setImageOptions(status = "toggle") {
    showImageOptions.value = ((status === "toggle") ? !showImageOptions.value : status);
}

/**
 * This function shares the actual QR Code image.
 */
function shareQRCode() {
    const canvas = document.getElementById("mohit-qrcode").querySelector("canvas");
    canvas.toBlob(async(blob) => {
        await webData.shareFile(new File([blob], 'Mohit_Website_QRCode.png', { type: blob.type }));
        setImageOptions(false);
    }, 'image/png');
}

/**
 * This function lets the user download the QR Code as a .png file.
 */
async function downloadQRCode() {
    await qrcode.value.download({ extension: "png" });
    setImageOptions(false);
}
</script>

<style>
#qr-code-popup.webpage-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1500;
    background-color: rgba(0, 0, 0, 0.9);
}
.qrcode-mainPopup {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: visible;
    height: 575px;
    width: 575px;
    border-radius: 20px;
    background: linear-gradient(
        to bottom right,
        var(--blue-cobalt) 0%,
        var(--blue-zero) 40%,
        var(--blue-zero) 60%,
        var(--blue-cobalt) 100%
    );
}

#mohit-qrcode {
    margin: 10px 0px 7px 0px;
    width: 450px;
    height: 450px;
    border-radius: 15px;
    overflow: clip;
    border: 2px dashed black;
}
#mohit-qrcode canvas {
    width: 100%;
}

.popup-qr-text {
    cursor: copy;
    color: black;
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
    background-color: white;
    padding: 7px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid;
    overflow-wrap: break-word;
}
.popup-qr-text:hover {
    text-decoration: underline;
}

.qrcode-mainPopup-options {
    display: flex;
    justify-content: center;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    gap: 7px;
}
.qrcode-mainPopup-btn {
    position: relative;
    padding: 6px;
    border: 2px solid;
    border-radius: 50%;
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--dark-background);
    color: var(--website-text);
}
.qrcode-mainPopup-btn svg {
    width: 17px;
    height: 17px;
}

.qrcode-mainPopup-btn.close {
    color: red;
    position: absolute;
    top: 10px;
    right: 10px;
}
.qrcode-mainPopup-btn.topLeft {
    position: absolute;
    top: 10px;
    left: 10px;
}

.qrcode-mainPopup-btn.light {
    color: var(--website-light-text);
}
.qrcode-mainPopup-btn.yellow {
    color: var(--lightning-yellow);
}
.qrcode-mainPopup-btn.white {
    color: white;
}
.qrcode-mainPopup-btn:hover {
    background-color: black;
    box-shadow: 0px 0px 10px black;
}

.qrcode-mainPopup-btn_v2 {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
}

.qrcode-image-options {
    position: absolute;
    top: calc(100% + 0px);
    height: fit-content;
    width: fit-content;
    padding: 3px 5px;
    gap: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: var(--blue-one)
}
.qrcode-image-options::before {
    content: '';
    position: absolute;
    top: -16px;
    left: calc(50% - 9px);
    border-width: 9px;
    border-style: solid;
    border-color: transparent transparent var(--blue-one) transparent;
    filter: var(--filter-drop-shadow);
}

@media (max-width: 625px) {
    .qrcode-mainPopup {
        width: 325px;
        height: 325px;
    }
    #mohit-qrcode {
        width: 225px !important;
        height: 225px !important;
    }

    #mohit-qrcode {
        width: 100%;
    }
    .popup-qr-text {
        font-size: 9px;
        padding: 5px;
    }

    .qrcode-mainPopup-btn {
        padding: 4.5px;
    }
    .qrcode-mainPopup-btn svg {
        width: 14px;
        height: 14px;
    }
}
</style>