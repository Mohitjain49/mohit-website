<template>
<div id="qr-code-popup" class="webpage-cover">
    <div class="qrcode-mainPopup animate__animated animate__bounceIn">
        <button class="popup-qr-text" @click="copyQRCodeLink()" title="Copy Link"> {{ truncate(qrCodeLink, webData.qrPopup.truncateValue) }} </button>
        <client-only> <div class="popup-qr-element" v-html="renderSVG(qrCodeLink)"></div> </client-only>

        <button @click="webData.setQRCodePopup(false)" class="qrcode-mainPopup-closeBtn" title="Close QR Code Popup">
            <FontAwesomeIcon icon="fa-xmark" />
        </button>
    </div>
</div>
</template>

<script setup>
const route = useRoute();
const webData = useWebsiteDataStore();
const docStore = useDocumentStore();
const qrCodeLink = ref(PERSONAL_WEBSITE_LINK);

onMounted(() => {
    setQRCodeLink();
    hideQrcodePopupOverflow();
    window.addEventListener("resize", hideQrcodePopupOverflow);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", hideQrcodePopupOverflow);
    document.body.style.overflow = "";    

    if(docStore.checkGoogleDocRoute() || docStore.checkPDFRoute()) {
        docStore.hideVerticalOverflow();
    }
})
watch(() => route.fullPath, () => { setQRCodeLink(); });


/**
 * This function sets the link for the QR Code Popup.
 */
function setQRCodeLink() {
    qrCodeLink.value = PERSONAL_WEBSITE_LINK + route.fullPath.substring(1);
}

/**
 * This function copies the QR Code Link currently visible.
 */
function copyQRCodeLink() {
    navigator.clipboard.writeText(qrCodeLink.value);
}

/**
 * This function hides the overflow while the popup is in effect.
 */
function hideQrcodePopupOverflow() {
    document.body.style.overflow = "hidden";
}
</script>

<style scoped>
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

.popup-qr-element, .popup-qr-element svg {
    width: 450px;
    height: 450px;
    border-radius: 15px;
    overflow: hidden;
    border: 2px dashed black;
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

.qrcode-mainPopup-closeBtn {
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
    background: var(--dark-background);
}
.qrcode-mainPopup-closeBtn svg {
    width: 17px;
    height: 17px;
}
.qrcode-mainPopup-closeBtn:hover {
    background-color: black;
    box-shadow: 0px 0px 10px black;
}

@media (max-width: 625px) {
    .qrcode-mainPopup {
        width: 325px;
        height: 325px;
    }
    .popup-qr-element, .popup-qr-element svg {
        width: 225px;
        height: 225px;
    }
    .popup-qr-text {
        font-size: 9px;
        padding: 5px;
    }

    .qrcode-mainPopup-closeBtn {
        top: 7px;
        right: 7px;
        padding: 4.5px;
    }
    .qrcode-mainPopup-closeBtn svg {
        width: 14px;
        height: 14px;
    }
}
</style>