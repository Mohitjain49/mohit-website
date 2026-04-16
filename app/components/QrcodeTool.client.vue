<template>
<div id="qr-code-popup" class="webpage-cover">
    <div class="qrcode-mainPopup animate__animated animate__bounceIn">
        <button id="popup-shareLink" class="popup-qr-text" @click="copyQRCodeLink()" title="Copy Link"> <p> {{ qrCodeFormattedLink }} </p> </button>
        <div v-if="showShareLinkScrollbar" class="popup-qr-text-scrollBar"> <div class="inner" :style="shareLinkScrollbarStyle"></div> </div>
        <div id="mohit-qrcode" v-show="qrCodeDisplay"></div>

        <div class="qrcode-mainPopup-options">
            <button v-if="(sharePopupMode == 0)" @click="webData.setQRCodePopup('filter')" class="qrcode-mainPopup-btn light" title="Remove All Hashes">
                <FontAwesomeIcon icon="fa-filter" />
            </button>
            <a v-if="showOpenNewTabButton" :href="qrCodeLink" target="_blank" class="qrcode-mainPopup-btn white" title="Open Link In New Tab">
                <FontAwesomeIcon icon="fa-up-right-from-square" />
            </a>

            <button @click="copyQRCodeLink()" class="qrcode-mainPopup-btn light" :title="((actions.copy == 2) ? 'Copied Link!' : 'Copy Link')">
                <FontAwesomeIcon :icon="copyLinkIcon" :spin-pulse="(actions.copy == 1)" />
            </button>
            <button v-if="webData.shareSupported" @click="shareQRCodeLink()" class="qrcode-mainPopup-btn light" title="Share Webpage Link">
                <FontAwesomeIcon :icon="shareLinkIcon" :spin-pulse="(actions.share == 1)" />
            </button>
            <div class="qrcode-mainPopup-btn_v2">
                <button @click="setImageOptions('toggle')" class="qrcode-mainPopup-btn" :title="((showImageOptions ? 'Close' : 'See') + ' Image Options')">
                    <FontAwesomeIcon icon="fa-image" />
                </button>
                <Transition name="fade-transition">
                    <div v-if="showImageOptions" class="qrcode-image-options">
                        <button v-if="webData.shareSupported" @click="shareQRCode()" class="qrcode-mainPopup-btn yellow" title="Share QR Code">
                            <FontAwesomeIcon :icon="shareImageIcon" :spin-pulse="(actions.shareImage == 1)" />
                        </button>
                        <button @click="downloadQRCode()" class="qrcode-mainPopup-btn yellow" title="Download QR Code.">
                            <FontAwesomeIcon :icon="downloadImageIcon" :spin-pulse="(actions.downloadImage == 1)" />
                        </button>
                    </div>
                </Transition>
            </div>
        </div>

        <button ref="sharePopup-close" @click="webData.setQRCodePopup('quit')" class="qrcode-mainPopup-close" title="Close Popup">
            <FontAwesomeIcon icon="fa-xmark" :beat="hoverOverCloseBtn" />
        </button>
    </div>
</div>
</template>

<script setup>
import QRCodeStyling from 'qr-code-styling';
import Lenis from 'lenis';

const router = useRouter();
const webData = useWebsiteDataStore();
const codeScannerStore = useCodeScannerStore();
const overflowLocked = useScrollLock(document.body);

/** @type {Lenis} This lenis instance manages the autoscroll mechanic for the link. */
var lenis = null;
var autoscrollTimeout = null;
const { hScrollbarStyle: shareLinkScrollbarStyle } = useScrollPercentage("popup-shareLink");

/** @type {Ref<QRCodeStyling>} This stores the qrcode object created when aking the QR Code for the Popup. */
const qrcode = ref(null);
const qrCodeLink = ref(PERSONAL_WEBSITE_LINK);
const qrCodeDisplay = ref(false);

const sharePopupMode = ref(0);
const showImageOptions = ref(false);

const shareCloseRef = useTemplateRef('sharePopup-close');
const hoverOverCloseBtn = useElementHover(shareCloseRef);

const qrdata = computed(() => { return (router.currentRoute.value.query.qrdata ?? null); });
const showShareLinkScrollbar = computed(() => { return (shareLinkScrollbarStyle.value.width !== "100%"); });

const qrCodeFormattedLink = computed(() => {
    if(typeof qrCodeLink.value !== "string") { return qrCodeLink.value; }
    if(qrCodeLink.value.startsWith("mailto:")) { return qrCodeLink.value.substring(7); }
    if(qrCodeLink.value.startsWith("tel:")) { return qrCodeLink.value.substring(4); }
    return qrCodeLink.value;
});
const showOpenNewTabButton = computed(() => {
    return (sharePopupMode.value == 2 && !qrCodeLink.value.startsWith(PERSONAL_WEBSITE_LINK));
});

const actions = ref({ copy: 0, share: 0, shareImage: 0, downloadImage: 0 });
var timeouts = { copy: null, share: null, shareImage: null, downloadImage: null }

const copyLinkIcon = computed(() => {
    const status = actions.value.copy;
    return ((status == 0) ? 'fa-copy' : ((status == 1) ? 'fa-spinner' : ((status == 2) ? 'fa-check' : 'fa-ban')));
});
const shareLinkIcon = computed(() => {
    const status = actions.value.share;
    return ((status == 0) ? 'fa-share-nodes' : ((status == 1) ? 'fa-spinner' : ((status == 2) ? 'fa-check' : 'fa-ban')));
});
const shareImageIcon = computed(() => {
    const status = actions.value.shareImage;
    return ((status == 0) ? 'fa-share' : ((status == 1) ? 'fa-spinner' : ((status == 2) ? 'fa-check' : 'fa-ban')));
});
const downloadImageIcon = computed(() => {
    const status = actions.value.downloadImage;
    return ((status == 0) ? 'fa-download' : ((status == 1) ? 'fa-spinner' : ((status == 2) ? 'fa-check' : 'fa-ban')));
});

onMounted(async() => {
    overflowLocked.value = true;
    await nextTick();
    setQRCodeLink();

    // This creates and starts the Lenis auto scrolling for this popup.
    lenis = new Lenis({ autoRaf: true, orientation: "horizontal",
        wrapper: document.getElementsByClassName("popup-qr-text").item(0),
        content: document.getElementsByClassName("popup-qr-text").item(0).querySelector("p"),
        easing: (x = 0) => { return x; }
    });
    manageLenisScrolling();
});
onBeforeUnmount(() => {
    qrCodeDisplay.value = false;
    if(lenis != null) { lenis.destroy(); }
    if(autoscrollTimeout != null) { clearTimeout(autoscrollTimeout); }
    overflowLocked.value = (codeScannerStore.scannedItemMenu != -1);
});

// This watches for changes to the QR Code Data so the popup changes reactively.
watch(qrdata, () => { setQRCodeLink(); });

/** This function sets the link for the Share Popup. */
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
        qrCodeDisplay.value = true;
    }
}

/**
 * This function sets a boolean that sets whether to show the image options.
 * @param {Boolean | "toggle"} status The new status for the image options. If it is set to "toggle", then it just flips the value.
 */
function setImageOptions(status = "toggle") {
    showImageOptions.value = ((status === "toggle") ? !showImageOptions.value : status);
}

/**
 * This function copies the QR Code Link currently visible.
 */
async function copyQRCodeLink() {
    if(actions.value.copy > 0) { return; }
    actions.value.copy = 1;

    try {
        await navigator.clipboard.writeText(qrCodeFormattedLink.value);
        actions.value.copy = 2; 
    } catch(e) {
        actions.value.copy = 3;
    } finally {
        if(timeouts.copy != null) { clearTimeout(timeouts.copy); }
        timeouts.copy = setTimeout(() => {
            actions.value.copy = 0;
            timeouts.copy = null;
        }, 3000); 
    }
}

/**
 * This function shares the QR Code Link currently visible.
 */
async function shareQRCodeLink() {
    if(actions.value.share > 0) { return; }
    actions.value.share = 1;

    try {
        if(qrCodeLink.value !== qrCodeFormattedLink.value) {
            await webData.shareText(qrCodeFormattedLink.value);
        } else {
            await webData.shareLink(qrCodeLink.value);
        }
        actions.value.share = 2; 
    } catch(e) {
        actions.value.share = 3;
    } finally {
        if(timeouts.share != null) { clearTimeout(timeouts.share); }
        timeouts.share = setTimeout(() => {
            actions.value.share = 0;
            timeouts.share = null;
        }, 3000); 
    }
}

/**
 * This function shares the actual QR Code image.
 */
function shareQRCode() {
    if(actions.value.shareImage > 0) { return; }
    actions.value.shareImage = 1;

    const canvas = document.getElementById("mohit-qrcode").querySelector("canvas");
    canvas.toBlob(async(blob) => {
        try {
            await webData.shareFile(new File([blob], 'Mohit_Website_QRCode.png', { type: blob.type }));
            actions.value.shareImage = 2; 
        } catch(e) {
            console.error(e)
            actions.value.shareImage = 3;
        } finally {
            if(timeouts.shareImage != null) { clearTimeout(timeouts.shareImage); }
            timeouts.shareImage = setTimeout(() => {
                actions.value.shareImage = 0;
                timeouts.shareImage = null;
            }, 3000);
        }
    }, 'image/png');
}

/**
 * This function lets the user download the QR Code as a .png file.
 */
async function downloadQRCode() {
    if(actions.value.downloadImage > 0) { return; }
    actions.value.downloadImage = 1;

    try {
        await qrcode.value.download({ extension: "png" });
        actions.value.downloadImage = 2; 
    } catch(e) {
        actions.value.downloadImage = 3;
    } finally {
        if(timeouts.downloadImage != null) { clearTimeout(timeouts.downloadImage); }
        timeouts.downloadImage = setTimeout(() => {
            actions.value.downloadImage = 0;
            timeouts.downloadImage = null;
        }, 3000); 
    }
}

/** This function triggers all parts of the lenis autoscroll for this popup. */
async function triggerLenisAutoScroll() {
    lenis.scrollTo("left", { immediate: true });
    await sleep(500);
    lenis.scrollTo("right", { duration: 3, onComplete: () => { manageLenisScrolling(); }, easing: (x = 0) => { return x; } });
}

/** This function starts a loop that enables the link at the top of the popup to autoscroll. */
function manageLenisScrolling() {
    autoscrollTimeout = setTimeout(() => {
        triggerLenisAutoScroll();
        autoscrollTimeout = null;
    }, 1500);
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
    border-radius: 10px;
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
    height: fit-content;
    width: fit-content;
    max-width: 430px;
    color: black;
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
    background-color: white;
    padding: 7px 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid;
    text-align: center;
    overflow: hidden;
    scroll-behavior: auto;
}
.popup-qr-text p {
    width: max-content;
    height: fit-content;
    color: var(--blue-five);
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 0px 3px;
    white-space: nowrap;
}
.popup-qr-text:hover {
    text-decoration: underline;
}

.popup-qr-text-scrollBar {
    width: 450px;
    height: 3px;
    border-radius: 5px;
    overflow: hidden;
    background-color: black;
}
.popup-qr-text-scrollBar .inner {
    position: relative;
    top: 0px;
    left: 0px;
    border-radius: 5px;
    background-color: var(--vibrant-flame);
    height: 100%;
    width: 100%;
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
.qrcode-mainPopup-btn.topLeft {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 4px;
}
.qrcode-mainPopup-btn.topLeft svg {
    width: 12px;
    height: 12px;
}

.qrcode-mainPopup-close {
    color: red;
    position: absolute;
    top: 0px;
    right: 0px;
    transition: box-shadow 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--dark-background);
    width: 28px;
    height: 28px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 6px;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
}
.qrcode-mainPopup-close:hover {
    box-shadow: 0px 0px 20px 3px black;
}
.qrcode-mainPopup-close svg {
    width: 15px;
    height: 15px;
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
    top: 100%;
    height: fit-content;
    width: fit-content;
    padding: 3px 5px;
    gap: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: var(--blue-one);
    box-shadow: 0px 0px 20px 2px black;
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

@keyframes stadium-scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(-100%));
    }
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
        padding: 5px;
        max-width: 215px;
    }
    .popup-qr-text p {
        font-size: 9px;
    }
    .popup-qr-text-scrollBar {
        width: 225px;
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