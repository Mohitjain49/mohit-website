<template>
<div id="qr-code-popup" class="webpage-cover">
    <div class="qrcode-mainPopup animate__animated animate__bounceIn">
        <button class="popup-qr-text" @click="copyQRCodeLink()" title="Copy Link"> {{ truncate(qrCodeLink, webData.qrPopup.truncateValue) }} </button>
        <client-only> <div id="mohit-qrcode" :style="qrCodeDisplay"></div> </client-only>

        <div class="qrcode-mainPopup-options">
            <button @click="webData.setQRCodePopup(false)" class="qrcode-mainPopup-btn close" title="Close QR Code Popup">
                <FontAwesomeIcon icon="fa-xmark" />
            </button>
            <button v-if="!linkExtrasRemoved" @click="setQRCodeLink(true)" class="qrcode-mainPopup-btn filter" title="Remove All Hashes">
                <FontAwesomeIcon icon="fa-filter" />
            </button>
            <button @click="downloadQRCode()" class="qrcode-mainPopup-btn download" title="Download QR Code.">
                <FontAwesomeIcon icon="fa-download" />
            </button>
        </div>
    </div>
</div>
</template>

<script setup>
import QRCodeStyling from 'qr-code-styling';

const route = useRoute();
const webData = useWebsiteDataStore();
const docStore = useDocumentStore();

/**
 * @type {import('vue').Ref<QRCodeStyling | null>} This stores the qrcode object created when aking the QR Code for the Popup.
 */
const qrcode = ref(null);
const qrCodeLink = ref(PERSONAL_WEBSITE_LINK);
const qrCodeDisplay = ref({ display: "none" });
const linkExtrasRemoved = ref(false);

onMounted(() => {
    hideQrcodePopupOverflow();
    window.addEventListener("resize", hideQrcodePopupOverflow);
    nextTick(() => { setQRCodeLink(false); });
});

onBeforeUnmount(() => {
    qrCodeDisplay.value.display = "none";
    window.removeEventListener("resize", hideQrcodePopupOverflow);
    document.body.style.overflow = "";    

    if(docStore.checkGoogleDocRoute() || docStore.checkPDFRoute()) {
        docStore.hideVerticalOverflow();
    }
})
watch(() => route.fullPath, () => { setQRCodeLink(); });


/**
 * This function sets the link for the QR Code Popup.
 * @param {Boolean} filterLink If true, this function filters the link to not include hashes.
 */
function setQRCodeLink(filterLink = false) {
    qrCodeLink.value = (PERSONAL_WEBSITE_LINK + (filterLink ? route.path.substring(1) : route.fullPath.substring(1)));
    linkExtrasRemoved.value = (filterLink || route.hash === "");

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
                type: 'extra-rounded'
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
            dotsOptions: { color: 'black' },
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
    navigator.clipboard.writeText(qrCodeLink.value);
}

/**
 * This function lets the user download the QR Code as a .png file.
 */
function downloadQRCode() {
    qrcode.value.download({ extension: "png" });
}

/**
 * This function hides the overflow while the popup is in effect.
 */
function hideQrcodePopupOverflow() {
    document.body.style.overflow = "hidden";
}
</script>

<style>
#qr-code-popup.webpage-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.9);
}
.qrcode-mainPopup {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    margin-bottom: 10px;
    background-color: white;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid;
    overflow-wrap: break-word;
}
.popup-qr-text:hover {
    text-decoration: underline;
}

.qrcode-mainPopup-options {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    gap: 7px;
}
.qrcode-mainPopup-btn {
    padding: 6px;
    border: 2px solid;
    border-radius: 50%;
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--dark-background);
}
.qrcode-mainPopup-btn svg {
    width: 17px;
    height: 17px;
}

.qrcode-mainPopup-btn.close {
    color: red;
}
.qrcode-mainPopup-btn.filter {
    color: var(--website-light-text);
}
.qrcode-mainPopup-btn.download {
    color: var(--website-text);
}
.qrcode-mainPopup-btn:hover {
    background-color: black;
    box-shadow: 0px 0px 10px black;
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