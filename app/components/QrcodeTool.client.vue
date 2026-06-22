<template>
<!-- <WebCover v-if="(showSharePopupImmediate && fullScreenSet)" :zIndex="1500" /> -->
<Transition name="qrcode-popup-transition" appear fade>
    <div v-if="showMainPopup" class="qrcode-mainPopup">
        <button id="popup-shareLink" class="popup-qr-text" @click="copyQRCodeLink()" title="Copy Link"> <p> {{ qrCodeFormattedLink }} </p> </button>
        <div v-if="showShareLinkScrollbar" class="popup-qr-text-scrollBar"> <div class="inner" :style="shareLinkScrollbarStyle"></div> </div>

        <div id="mohit-qrcode" :style="qrcodeBg" v-show="qrCodeDisplay"></div>
        <div id="mohit-qrcode-waiting" v-if="!qrCodeDisplay">
            <div class="cover"> <FontAwesomeIcon icon="fa-spinner" :spin-pulse="true" /> </div>
        </div>

        <div class="qrcode-mainPopup-options">
            <button v-if="(sharePopupMode == 0)" @click="webData.setQRCodePopup('filter')" class="qrcode-mainPopup-btn light" title="Remove All Hashes">
                <FontAwesomeIcon icon="fa-filter" />
            </button>
            <a v-if="showOpenNewTabButton" :href="qrCodeLink" target="_blank" class="qrcode-mainPopup-btn white" :title="openNewTabButtonTitle">
                <FontAwesomeIcon :icon="openNewTabButtonIcon" />
            </a>

            <button @click="copyQRCodeLink()" class="qrcode-mainPopup-btn light" :title="((actions.copy == 2) ? 'Copied Link!' : 'Copy Link')">
                <FontAwesomeIcon :icon="copyLinkIcon" :spin-pulse="(actions.copy == 1)" />
            </button>
            <button v-if="(webData.shareSupported && sharePopupMode == 2)" @click="shareQRCodeLink()" class="qrcode-mainPopup-btn light" title="Share Link">
                <FontAwesomeIcon :icon="shareLinkIcon" :spin-pulse="(actions.share == 1)" />
            </button>
            
            <div v-if="(sharePopupMode != 2)" class="qrcode-mainPopup-btn_v2">
                <button @click="setSocialMediaOptions('toggle')" class="qrcode-mainPopup-btn" title="Share Webpage Link!">
                    <FontAwesomeIcon icon="fa-comment-nodes" />
                </button>
                <Transition name="fade-transition">
                    <div v-if="(showShareOptions == 1)" class="qrcode-image-options">
                        <button v-if="webData.shareSupported" @click="shareQRCodeLink()" class="qrcode-mainPopup-btn light" title="Share Link">
                            <FontAwesomeIcon :icon="shareLinkIcon" :spin-pulse="(actions.share == 1)" />
                        </button>
                        <a :href="shareEmail" class="qrcode-mainPopup-btn" title="Share This Link By Email!">
                            <FontAwesomeIcon icon="fa-envelope" />
                        </a>
                        <a :href="shareLinkedIn" target="_blank" class="qrcode-mainPopup-btn" title="Share This Link On LinkedIn!" :style="getColorStyles('#0072B1')">
                            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                        </a>
                        <a :href="shareWhatsApp" target="_blank" class="qrcode-mainPopup-btn" title="Share This Link On WhatsApp!" :style="getColorStyles('#2DED64')">
                            <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
                        </a>
                        <a :href="shareFacebook" target="_blank" class="qrcode-mainPopup-btn" title="Share This Link On Facebook!" :style="getColorStyles('#0A65FE')">
                            <FontAwesomeIcon icon="fa-brands fa-facebook" />
                        </a>
                    </div>
                </Transition>
            </div>

            <div class="qrcode-mainPopup-btn_v2">
                <button @click="setImageOptions('toggle')" class="qrcode-mainPopup-btn" :title="(((showShareOptions == 0) ? 'Close' : 'See') + ' Image Options')">
                    <FontAwesomeIcon icon="fa-image" />
                </button>
                <Transition name="fade-transition">
                    <div v-if="(showShareOptions == 0)" class="qrcode-image-options">
                        <button v-if="webData.shareSupported" @click="shareQRCode()" class="qrcode-mainPopup-btn yellow" title="Share QR Code">
                            <FontAwesomeIcon :icon="shareImageIcon" :spin-pulse="(actions.shareImage == 1)" />
                        </button>
                        <button @click="downloadQRCode()" class="qrcode-mainPopup-btn yellow" title="Download QR Code.">
                            <FontAwesomeIcon :icon="downloadImageIcon" :spin-pulse="(actions.downloadImage == 1)" />
                        </button>
                        <button @click="copyQRCode()" class="qrcode-mainPopup-btn yellow" title="Copy QR Code As Image.">
                            <FontAwesomeIcon :icon="copyImageIcon" :spin-pulse="(actions.copyImage == 1)" />
                        </button>
                        <a v-if="(qrCodeURL != undefined)" :href="qrCodeURL" target="mohit-qrcode" class="qrcode-mainPopup-btn white" title="Open QR Code in New Tab">
                            <FontAwesomeIcon icon="fa-arrow-up-right-from-square" />
                        </a>
                    </div>
                </Transition>
            </div>
        </div>

        <button ref="sharePopup-close" @click="webData.setQRCodePopup('quit')" class="qrcode-mainPopup-close" title="Close Popup">
            <FontAwesomeIcon icon="fa-xmark" :beat="hoverOverCloseBtn" />
        </button>
    </div>
</Transition>
</template>

<script setup>
import QRCodeStyling from 'qr-code-styling';
import ParsePhoneNumber from 'libphonenumber-js';
import Lenis from 'lenis';

const router = useRouter();
const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
const fullScreenSet = getFullScreenSet();

/** @type {Lenis} This lenis instance manages the autoscroll mechanic for the link. */
var lenis = null;
var autoscrollTimeout = null;
const { hScrollbarStyle: shareLinkScrollbarStyle } = useScrollPercentage("popup-shareLink");

/** @type {Ref<QRCodeStyling>} This stores the qrcode object created when aking the QR Code for the Popup. */
const qrcode = ref(null);
const qrCodeLink = ref(PERSONAL_WEBSITE_LINK);
const qrCodeDisplay = ref(false);

/** @type {Ref<Blob>} This blob is used for the backgorund image and to download the qr code. */
const qrCodeBlob = ref(null);
const qrCodeURL = useObjectUrl(qrCodeBlob);

const showMainPopup = ref(false);
const showShareOptions = ref(-1);
const sharePopupMode = ref(0);

const shareLinkedIn = ref("");
const shareFacebook = ref("");
const shareWhatsApp = ref("");
const shareEmail = ref("");

const shareCloseRef = useTemplateRef('sharePopup-close');
const hoverOverCloseBtn = useElementHover(shareCloseRef);

const qrdata = computed(() => { return (router.currentRoute.value.query.qrdata ?? null); });
const qrcodeBg = computed(() => { return { 'background-image': ((qrCodeURL.value != undefined) ? 'url(' + qrCodeURL.value + ')' : '') }});

const showSharePopupImmediate = computed(() => { return webData.showSharePopupImmediate; });
const showShareLinkScrollbar = computed(() => { return (shareLinkScrollbarStyle.value.width !== "100%"); });

const qrCodeFormattedLink = computed(() => {
    const mainLink = qrCodeLink.value;
    if(typeof mainLink !== "string") { return mainLink; }

    if(mainLink.startsWith("mailto:")) { return mainLink.substring(7); }
    if(mainLink.startsWith("tel:")) { return formatPhoneNumber(); }
    return mainLink;
});

const showOpenNewTabButton = computed(() => { return (sharePopupMode.value == 2 && !qrCodeLink.value.startsWith(PERSONAL_WEBSITE_LINK)); });
const openNewTabButtonIcon = computed(() => {
    const mainLink = qrCodeLink.value;
    return (mainLink.startsWith("mailto:") ? 'fa-square-envelope' : (mainLink.startsWith("tel:") ? 'fa-square-phone' : 'fa-up-right-from-square'));
});
const openNewTabButtonTitle = computed(() => {
    const mainLink = qrCodeLink.value;
    const formattedLink = qrCodeFormattedLink.value;
    return (mainLink.startsWith("mailto:") ? ('Email ' + formattedLink) : (mainLink.startsWith("tel:") ? ('Call ' + formattedLink) : 'Open Link In New Tab'));
});

const actions = ref({ copy: 0, share: 0, shareImage: 0, downloadImage: 0, copyImage: 0 });
var timeouts = { copy: null, share: null, shareImage: null, downloadImage: null, copyImage: null }
const STATUS_ICONS = ['', 'fa-spinner', 'fa-check', 'fa-ban'];

const copyLinkIcon = computed(() => {
    const status = actions.value.copy;
    return ((status == 0) ? 'fa-copy' : STATUS_ICONS[status]);
});
const shareLinkIcon = computed(() => {
    const status = actions.value.share;
    return ((status == 0) ? 'fa-share' : STATUS_ICONS[status]);
});
const shareImageIcon = computed(() => {
    const status = actions.value.shareImage;
    return ((status == 0) ? 'fa-share' : STATUS_ICONS[status]);
});
const downloadImageIcon = computed(() => {
    const status = actions.value.downloadImage;
    return ((status == 0) ? 'fa-download' : STATUS_ICONS[status]);
});
const copyImageIcon = computed(() => {
    const status = actions.value.copyImage;
    return ((status == 0) ? 'fa-clone' : STATUS_ICONS[status]);
});

onMounted(async() => {
    styleStore.setHideOverflowArray(0, true);
    await nextTick();

    showMainPopup.value = true;
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

// This watches for changes to the QR Code Data so the popup changes reactively.
watch(qrdata, () => { setQRCodeLink(); });

// This watcher closes the main share popup and disables all the JS.
watch(showSharePopupImmediate, (newValue) => { if(!newValue) { unmountSharePopup(); } });

/** This function is used to unmount the share popup. */
function unmountSharePopup() {
    showMainPopup.value = false;
    showShareOptions.value = -1;
    styleStore.setHideOverflowArray(0, false);

    if(lenis != null) { lenis.destroy(); }
    if(autoscrollTimeout != null) { clearTimeout(autoscrollTimeout); }
}

/** This function sets the link for the Share Popup. */
function setQRCodeLink() {
    const data = qrdata.value;
    const route = router.currentRoute.value;

    if(data === "main") {
        const linkUrl = new URL(route.fullPath.substring(1), PERSONAL_WEBSITE_LINK);
        linkUrl.searchParams.delete('qrdata');

        qrCodeLink.value = (PERSONAL_WEBSITE_LINK + linkUrl.pathname.substring(1) + linkUrl.search + linkUrl.hash);
        sharePopupMode.value = ((route.hash !== "" || Object.keys(route.query).length > 0) ? 0 : 1);
    } else if(data === "filter") {
        qrCodeLink.value = (PERSONAL_WEBSITE_LINK + route.path.substring(1));
        sharePopupMode.value = 1;
    } else {
        qrCodeLink.value = route.query.qrdata;
        sharePopupMode.value = 2;
    }

    if(sharePopupMode.value != 2) {
        shareLinkedIn.value = useSocialShare({ network: 'linkedin', url: qrCodeLink.value }).value.shareUrl;
        shareFacebook.value = useSocialShare({ network: 'facebook', url: qrCodeLink.value }).value.shareUrl;
        shareWhatsApp.value = useSocialShare({ network: 'whatsapp', url: qrCodeLink.value }).value.shareUrl;
        shareEmail.value = useSocialShare({ network: 'email', url: qrCodeLink.value }).value.shareUrl;
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

    qrcode.value.getRawData("png").then((result) => {
        qrCodeBlob.value = result;
    }).catch((e) => {
        console.error(e)
    });
}

/**
 * This function sets a boolean that sets whether to show the image options.
 * @param {Boolean | "toggle"} status The new status for the image options. If it is set to "toggle", then it just flips the value.
 */
function setImageOptions(status = "toggle") {
    showShareOptions.value = ((status === "toggle") ? ((showShareOptions.value == 0) ? -1 : 0) : (status ? 0 : -1));
}

/**
 * This function sets a boolean that sets whether to show the social media options.
 * @param {Boolean | "toggle"} status The new status for the social media options. If it is set to "toggle", then it just flips the value.
 */
function setSocialMediaOptions(status = "toggle") {
    showShareOptions.value = ((status === "toggle") ? ((showShareOptions.value == 1) ? -1 : 1) : (status ? 1 : -1));
}

/** This function copies the QR Code Link currently visible. */
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

/** This function shares the QR Code Link currently visible. */
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

/** This function shares the actual QR Code image. */
function shareQRCode() {
    if(actions.value.shareImage > 0 || qrCodeBlob.value == null) { return; }
    actions.value.shareImage = 1;
    const blob = qrCodeBlob.value;

    webData.shareFile(new File([blob], 'Mohit_Website_QRCode.png', { type: blob.type })).then(() => {
        actions.value.shareImage = 2;
    }).catch((e) => {
        console.error(e)
        actions.value.shareImage = 3;
    }).finally(() => {
        if(timeouts.shareImage != null) { clearTimeout(timeouts.shareImage); }
        timeouts.shareImage = setTimeout(() => {
            actions.value.shareImage = 0;
            timeouts.shareImage = null;
        }, 3000);
    });
}

/** This function lets the user download the QR Code as a .png file. */
function downloadQRCode() {
    if(actions.value.downloadImage > 0 || qrCodeURL.value == undefined) { return; }
    actions.value.downloadImage = 1;

    try {
        const link = document.createElement('a');
        link.href = qrCodeURL.value;
        link.download = 'Mohit_Website_QRCode.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

/** This function lets the user copy the QR Code. */
async function copyQRCode() {
    if(actions.value.copyImage > 0 || qrCodeBlob.value == undefined) { return; }
    actions.value.copyImage = 1;
    const blob = qrCodeBlob.value;

    try {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        actions.value.copyImage = 2; 
    } catch(e) {
        actions.value.copyImage = 3;
    } finally {
        if(timeouts.copyImage != null) { clearTimeout(timeouts.copyImage); }
        timeouts.copyImage = setTimeout(() => {
            actions.value.copyImage = 0;
            timeouts.copyImage = null;
        }, 3000); 
    }
}

/** This function triggers all parts of the lenis autoscroll for this popup. */
async function triggerLenisAutoScroll() {
    lenis.scrollTo("left", { immediate: true });
    await sleep(500);
    const duration = ((lenis.dimensions.scrollWidth / lenis.dimensions.width) * 1.9);
    lenis.scrollTo("right", { duration, onComplete: () => { manageLenisScrolling(); } });
}

/** This function starts a loop that enables the link at the top of the popup to autoscroll. */
function manageLenisScrolling() {
    autoscrollTimeout = setTimeout(() => {
        triggerLenisAutoScroll();
        autoscrollTimeout = null;
    }, 1500);
}

/** This function returns a formatted phone number for the share popup to display. */
function formatPhoneNumber() { return ParsePhoneNumber(qrCodeLink.value.substring(4), "US").formatNational(); }
</script>

<style lang="scss">
#qr-code-popup.webpage-cover {
    z-index: 1500;
}
.qrcode-mainPopup {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: visible;
    height: 575px;
    width: 575px;
    border-radius: 10px;
    z-index: 1501;
    background: linear-gradient(
        to bottom right,
        var(--blue-cobalt) 0%,
        var(--blue-zero) 40%,
        var(--blue-zero) 60%,
        var(--blue-cobalt) 100%
    );
}

#mohit-qrcode, #mohit-qrcode-waiting {
    margin: 10px 0px 7px 0px;
    width: 450px;
    height: 450px;
    border-radius: 15px;
    overflow: clip;
    border: 2px dashed black;
    background: #E5E5E5;
    background-image: url('/qrcode/Homepage_Qrcode.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
#mohit-qrcode-waiting > .cover {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
}

#mohit-qrcode canvas {
    width: 100%;
}
#mohit-qrcode-waiting svg {
    font-size: 100px;
    color: var(--vibrant-flame);
    user-select: none;
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

@mixin qrcode-mainPopup-small-viewport {
    .qrcode-mainPopup {
        width: 325px;
        height: 325px;
    }
    #mohit-qrcode, #mohit-qrcode-waiting {
        width: 225px !important;
        height: 225px !important;
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

@include dynamic-less-equal-width-rule(650) { @include qrcode-mainPopup-small-viewport(); }
@include dynamic-less-equal-height-rule(650) { @include qrcode-mainPopup-small-viewport(); }

.qrcode-popup-transition-enter-active, .qrcode-popup-transition-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.qrcode-popup-transition-enter-from, .qrcode-popup-transition-leave-to {
    opacity: 0;
    transform: scale(0.10);
}
.qrcode-popup-transition-enter-to, .qrcode-popup-transition-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>