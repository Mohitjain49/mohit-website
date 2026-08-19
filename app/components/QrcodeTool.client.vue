<template>
<!-- <WebCover v-if="(showSharePopupImmediate && fullScreenSet)" :zIndex="1500" /> -->
<Transition name="qrcode-popup-transition" appear fade>
    <div v-if="showMainPopup" id="share-popup" class="qrcode-mainPopup">
        <button id="popup-shareLink" class="popup-qr-text" @click="copyQRCodeLink()" title="Copy Link"> <p> {{ qrCodeFormattedLink }} </p> </button>
        <div v-if="showShareLinkScrollbar" class="popup-qr-text-scrollBar"> <div class="inner" :style="shareLinkScrollbarStyle"></div> </div>

        <button id="mohit-qrcode" v-show="qrCodeDisplay"
            @focus="setImageOptions(true)"
            @click="(e) => { focusOnQrcode(e); }"
            @contextmenu="(e) => { focusOnQrcode(e); }"
            title="Select QR Code"
            tabindex="0" :style="qrcodeBg">
        </button>
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
            <RouterLink v-if="showInternalNavLink" :to="internalShareLinkFullPath" class="qrcode-mainPopup-btn white">
                <FontAwesomeIcon icon="fa-diamond-turn-right" />
            </RouterLink>

            <button @click="copyQRCodeLink()" class="qrcode-mainPopup-btn light" :title="((actions.copy == 2) ? 'Copied Link!' : 'Copy Link')">
                <FontAwesomeIcon :icon="copyLinkIcon" :spin-pulse="(actions.copy == 1)" />
            </button>
            <button v-if="showCustomLinkShare" @click="shareQRCodeLink()" class="qrcode-mainPopup-btn light" title="Share Link">
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
                <button v-if="qrCodeBlob != null" @click="setImageOptions('toggle')" class="qrcode-mainPopup-btn"
                    :title="(((showShareOptions == 0) ? 'Close' : 'See') + ' Image Options')">

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
                        <button v-if="webData.saveAsSupported" @click="saveQRCode()" class="qrcode-mainPopup-btn yellow" title="Save QR Code.">
                            <FontAwesomeIcon :icon="saveImageIcon" :spin-pulse="(actions.saveImage == 1)" />
                        </button>
                        <button v-if="qrcodeImageCopySupported" @click="copyQRCode()" class="qrcode-mainPopup-btn yellow" title="Copy QR Code As Image.">
                            <FontAwesomeIcon :icon="copyImageIcon" :spin-pulse="(actions.copyImage == 1)" />
                        </button>
                        <button @click="printQRCode()" class="qrcode-mainPopup-btn yellow" title="Print QR Code.">
                            <FontAwesomeIcon :icon="printImageIcon" :spin-pulse="(actions.printImage == 1)" />
                        </button>
                        <a v-if="(qrCodeURL != undefined)" :href="qrCodeURL" target="mohit-qrcode" class="qrcode-mainPopup-btn white" title="Open QR Code in New Tab">
                            <FontAwesomeIcon icon="fa-arrow-up-right-from-square" />
                        </a>
                    </div>
                </Transition>
            </div>

            <div class="qrcode-mainPopup-btn_v2">
                <button v-if="qrCodeBlob != null" @click="setImageTypesOptions('toggle')" class="qrcode-mainPopup-btn"
                    :title="((showShareOptions == 2) ? 'Close Image Types' : 'Change Image Type')">

                    <FontAwesomeIcon icon="fa-marker" />
                </button>
                <Transition name="fade-transition">
                    <div v-if="(showShareOptions == 2)" class="qrcode-image-options">
                        <button v-for="(type, index) in IMAGE_STATUS" v-html="type.toUpperCase()"
                            @click="() => { changeImageType(index); }"
                            :class="['qrcode-mainPopup-btn_v3', (qrcodeImageMode == index ? 'selected' : '')]">
                        </button>
                    </div>
                </Transition>
            </div>
        </div>

        <button ref="sharePopup-close" @click="webData.setQRCodePopup('quit')" class="qrcode-mainPopup-close" title="Close Popup">
            <FontAwesomeIcon icon="fa-xmark" :jello="hoverOverCloseBtn" />
        </button>
    </div>
</Transition>
</template>

<script setup>
import QRCodeStyling from 'qr-code-styling';
import ParsePhoneNumber from 'libphonenumber-js';
import Lenis from 'lenis';

import isURL from 'validator/es/lib/isURL';
import isMailtoURI from 'validator/es/lib/isMailtoURI';

const STATUS_ICONS = ['', 'fa-spinner', 'fa-check', 'fa-ban'];
const IMAGE_STATUS = ['png', 'svg'];

const DEFAULT_IMAGE_FILENAME = "Mohit_Website_QRCode";
const SHARE_POPUP_SCALE_CSS_VAR = "--mohit-share-popup-scale";
const SHARE_POPUP_MIN_VIEWPORT_EDGE = 675;

const router = useRouter();
const webData = useWebsiteDataStore();
const styleStore = useStyleStore();
// const fullScreenSet = getFullScreenSet();

/** @type {Lenis} This lenis instance manages the autoscroll mechanic for the link. */
var lenis = null;
var autoscrollTimeout = null;

/** @type {HTMLIFrameElement} This variable stores the iframe element used for printing the qr code. */
var printIframe = null;

const { width: windowWidth, height: windowHeight } = useMohitWindowSize();
const { hScrollbarStyle: shareLinkScrollbarStyle } = useScrollPercentage("popup-shareLink");

/** @type {Ref<QRCodeStyling>} This stores the qrcode object created when aking the QR Code for the Popup. */
const qrcode = ref(null);
const qrCodeLink = ref(PERSONAL_WEBSITE_LINK);
const qrCodeDisplay = ref(false);

/** This integer determines what image type should be displayed for the QR Code. */
const qrcodeImageMode = ref(0);

/** @type {Ref<Blob>} This blob is used for the backgorund image and to download the qr code. */
const qrCodeBlob = ref(null);
const qrCodeURL = useObjectUrl(qrCodeBlob);

const showMainPopup = ref(false);
const showShareOptions = ref(-1);
const sharePopupMode = ref(0);
const customLinkValid = ref(false);

const shareLinkedIn = ref("");
const shareFacebook = ref("");
const shareWhatsApp = ref("");
const shareEmail = ref("");

const shareCloseRef = useTemplateRef('sharePopup-close');
const hoverOverCloseBtn = useElementHover(shareCloseRef);

const qrdata = computed(() => { return (router.currentRoute.value.query.qrdata ?? null); });
const qrcodeBg = computed(() => { return { 'background-image': ((qrCodeURL.value != undefined) ? 'url(' + qrCodeURL.value + ')' : '') }});
const qrcodeImageSuffix = computed(() => { return (IMAGE_STATUS[qrcodeImageMode.value] ?? ''); });
const qrcodeImageCopySupported = computed(() => { return ((qrcodeImageMode.value == 0) ? webData.copyImageSupported : webData.copySvgSupported); });

const { showSharePopupImmediate } = storeToRefs(webData);
const showShareLinkScrollbar = computed(() => { return (shareLinkScrollbarStyle.value.width !== "100%"); });

const qrCodeFormattedLink = computed(() => {
    const mainLink = qrCodeLink.value;
    if(typeof mainLink !== "string") { return mainLink; }

    if(mainLink.startsWith("mailto:")) { return mainLink.substring(7); }
    if(mainLink.startsWith("tel:")) { return formatPhoneNumber(); }
    return mainLink;
});

const shareLinkInternal = computed(() => { return qrCodeLink.value.startsWith(PERSONAL_WEBSITE_LINK); });
const internalShareLinkFullPath = computed(() => { return (shareLinkInternal.value ? ("/" + qrCodeLink.value.replace(PERSONAL_WEBSITE_LINK, "")) : ""); });
const showOpenNewTabButton = computed(() => { return (sharePopupMode.value == 2 && !shareLinkInternal.value && customLinkValid.value); });
const showCustomLinkShare = computed(() => { return (webData.shareSupported && sharePopupMode.value == 2 && customLinkValid.value); });

const showInternalNavLink = computed(() => {
    return (shareLinkInternal.value ? ((PERSONAL_WEBSITE_LINK + internalShareLinkFullPath.value.substring(1)) !== getParsedUrl().href) : false);
});
const openNewTabButtonIcon = computed(() => {
    const mainLink = qrCodeLink.value;
    return (mainLink.startsWith("mailto:") ? 'fa-square-envelope' : (mainLink.startsWith("tel:") ? 'fa-square-phone' : 'fa-up-right-from-square'));
});
const openNewTabButtonTitle = computed(() => {
    const mainLink = qrCodeLink.value;
    const formattedLink = qrCodeFormattedLink.value;
    return (mainLink.startsWith("mailto:") ? ('Email ' + formattedLink) : (mainLink.startsWith("tel:") ? ('Call ' + formattedLink) : 'Open Link In New Tab'));
});

const actions = ref({ copy: 0, share: 0, shareImage: 0, downloadImage: 0, copyImage: 0, printImage: 0, saveImage: 0 });
var timeouts = { copy: null, share: null, shareImage: null, downloadImage: null, copyImage: null, printImage: null, saveImage: null }
var sharePopupAbortController = new AbortController();

const copyLinkIcon = computed(() => {
    const status = actions.value.copy;
    return ((status == 0) ? 'fa-link' : STATUS_ICONS[status]);
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
const printImageIcon = computed(() => {
    const status = actions.value.printImage;
    return ((status == 0) ? 'fa-print' : STATUS_ICONS[status]);
});
const saveImageIcon = computed(() => {
    const status = actions.value.saveImage;
    return ((status == 0) ? 'fa-floppy-disk' : STATUS_ICONS[status]);
});

// This mounts the share popup and all of its functionality.
onMounted(async() => {
    styleStore.setHideOverflowArray(HideOverflow.SHARE_POPUP, true);
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
    calculateSharePopupScale();

    const signal = sharePopupAbortController.signal;
    window.addEventListener("animation-resize", () => { calculateSharePopupScale(); }, { signal });
    window.addEventListener("keydown", (event) => { onSharePopupKeydown(event); }, { signal });
    window.addEventListener("click", (event) => { onSharePopupClick(event); }, { signal });
});

// This watches for changes to the QR Code Data so the popup changes reactively.
watch(qrdata, () => { setQRCodeLink(); });

// This watcher closes the main share popup and disables all the JS.
watch(showSharePopupImmediate, (newValue) => { if(!newValue) { unmountSharePopup(); } });

/** This function is used to unmount the share popup. */
function unmountSharePopup() {
    showMainPopup.value = false;
    showShareOptions.value = -1;
    styleStore.setHideOverflowArray(HideOverflow.SHARE_POPUP, false);

    if(lenis != null) { lenis.destroy(); }
    if(autoscrollTimeout != null) { clearTimeout(autoscrollTimeout); }
    setTimeout(() => { sharePopupAbortController.abort(); }, 450);
}

/** This function sets the link for the Share Popup. */
async function setQRCodeLink() {
    const data = qrdata.value;
    const route = router.currentRoute.value;
    if(!data) { return; }
    // await sleep(50000); For testing purposes if the waiting screen needs to be edited.

    if(data === "main") {
        const linkUrl = getParsedUrl();
        qrCodeLink.value = (PERSONAL_WEBSITE_LINK + linkUrl.pathname.substring(1) + linkUrl.search + linkUrl.hash);
        sharePopupMode.value = ((linkUrl.hash !== "" || linkUrl.searchParams.size > 0) ? 0 : 1);
    } else if(data === "filter") {
        qrCodeLink.value = (PERSONAL_WEBSITE_LINK + route.path.substring(1));
        sharePopupMode.value = 1;
    } else {
        qrCodeLink.value = route.query.qrdata;
        sharePopupMode.value = 2;
    }

    /** This is the new and parsed QR Code Link. */
    const newQRCodeLink = qrCodeLink.value;

    if(sharePopupMode.value != 2) {
        customLinkValid.value = true;
        shareLinkedIn.value = useSocialShare({ network: 'linkedin', url: newQRCodeLink }).value.shareUrl;
        shareFacebook.value = useSocialShare({ network: 'facebook', url: newQRCodeLink }).value.shareUrl;
        shareWhatsApp.value = useSocialShare({ network: 'whatsapp', url: newQRCodeLink }).value.shareUrl;
        shareEmail.value = useSocialShare({ network: 'email', url: newQRCodeLink }).value.shareUrl;
    } else {
        customLinkValid.value = (isURL(newQRCodeLink) || isMailtoURI(newQRCodeLink) || newQRCodeLink.startsWith("tel:"));
    }

    if(qrcode.value != null) {
        qrcode.value.update({
            type: ((qrcodeImageMode.value == 0) ? 'canvas' : 'svg'),
            data: newQRCodeLink
        });
    } else {
        qrcode.value = new QRCodeStyling({
            width: 450,
            height: 450,
            type: ((qrcodeImageMode.value == 0) ? 'canvas' : 'svg'),
            data: newQRCodeLink,
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

    try {
        qrCodeBlob.value = await qrcode.value.getRawData(qrcodeImageSuffix.value);
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function sets the new QR Code Image Type.
 * @param {Number} newType The new image type.
 */
async function changeImageType(newType = 0) {
    qrcodeImageMode.value = newType;
    setQRCodeLink();
}

/**
 * This function sets a boolean that sets whether to show the image options.
 * @param {Boolean | "toggle"} status The new status for the image options. If it is set to "toggle", then it just flips the value.
 */
function setImageOptions(status = "toggle") {
    if(qrCodeBlob.value == null) { return; }
    showShareOptions.value = ((status === "toggle") ? ((showShareOptions.value == 0) ? -1 : 0) : (status ? 0 : -1));
}

/**
 * This function sets a boolean that sets whether to show the social media options.
 * @param {Boolean | "toggle"} status The new status for the social media options. If it is set to "toggle", then it just flips the value.
 */
function setSocialMediaOptions(status = "toggle") {
    showShareOptions.value = ((status === "toggle") ? ((showShareOptions.value == 1) ? -1 : 1) : (status ? 1 : -1));
}

/**
 * This function sets a boolean that sets whether to show the image options.
 * @param {Boolean | "toggle"} status The new status for the image options. If it is set to "toggle", then it just flips the value.
 */
function setImageTypesOptions(status = "toggle") {
    if(qrCodeBlob.value == null) { return; }
    showShareOptions.value = ((status === "toggle") ? ((showShareOptions.value == 2) ? -1 : 2) : (status ? 2 : -1));
}


/**
 * This function has the website focus on the QR Code.
 * @param {PointerEvent} event The click event.
 */
function focusOnQrcode(event = undefined) {
    try {
        if(event) { event.preventDefault(); }
        document.getElementById("mohit-qrcode").focus({ preventScroll: true, focusVisible: true });
        setImageOptions(true);
        triggerClickSound();
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function triggers on every keyboard press when the share popup is open.
 * This allows users to use keybinds to copy, print, or save the qr code image.
 * @param {KeyboardEvent} event The Keyboard Event.
 */
function onSharePopupKeydown(event = undefined) {
    try {
        if(!event || document.activeElement !== document.getElementById("mohit-qrcode")) { return; }
        if(!event.ctrlKey || !qrCodeBlob.value) { return; }
        const keyLetter = event.key.toLowerCase();

        if(keyLetter === "c") {
            event.preventDefault();
            setImageOptions(true);
            copyQRCode();
        } else if(keyLetter === "p") {
            event.preventDefault();
            setImageOptions(true);
            printQRCode()
        } else if(keyLetter === "s") {
            event.preventDefault();
            setImageOptions(true);

            if(webData.saveAsSupported && event.shiftKey) {
                saveQRCode();
            } else {
                downloadQRCode();
            }
        }
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/**
 * This function triggers when the user clicks anywhere while the share popup is open.
 * @param {PointerEvent} event The click event.
 */
function onSharePopupClick(event) {
    if(!event || !event.target) { return; }

    /** @type {HTMLElement} The element the user clicked on. */
    const clickedElement = event.target;
    if(!(clickedElement instanceof HTMLElement)) { return; }

    // This function by default should close the Share Options in the popup if the user does not click on the share options or the QR Code.
    const notInSharePopupOptions = (clickedElement.closest(".qrcode-mainPopup-options") == null);
    const notInQrcode = (clickedElement.closest("#mohit-qrcode") == null);
    if(notInSharePopupOptions && notInQrcode) { showShareOptions.value = -1; }
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
    if(!webData.copyImageSupported || actions.value.shareImage > 0 || !qrCodeBlob.value) { return; }
    actions.value.shareImage = 1;
    const blob = qrCodeBlob.value;

    webData.shareFile(new File([blob], getImageFilename(), { type: blob.type })).then(() => {
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

/** This function saves the actual QR Code image. */
async function saveQRCode() {
    if(!webData.saveAsSupported || actions.value.saveImage > 0 || !qrCodeBlob.value) { return; }
    actions.value.saveImage = 1;

    try {
        const blob = qrCodeBlob.value;
        const saveHandle = await window.showSaveFilePicker({
            suggestedName: getImageFilename(),
            types: [{ description: "QR Code", accept: { [blob.type]: ['.' + qrcodeImageSuffix.value] }}]
        });

        const writable = await saveHandle.createWritable();
        await writable.write(blob);
        await writable.close();

        // Marks the action as completed!
        actions.value.saveImage = 2; 
    } catch(e) {
        actions.value.saveImage = 3;
    } finally {
        if(timeouts.saveImage != null) { clearTimeout(timeouts.saveImage); }
        timeouts.saveImage = setTimeout(() => {
            actions.value.saveImage = 0;
            timeouts.saveImage = null;
        }, 3000); 
    }
}

/** This function lets the user download the QR Code as a .png file. */
function downloadQRCode() {
    if(actions.value.downloadImage > 0 || !qrCodeURL.value) { return; }
    actions.value.downloadImage = 1;

    try {
        const link = document.createElement('a');
        link.href = qrCodeURL.value;
        link.download = getImageFilename();

        document.body.appendChild(link);
        link.addEventListener("click", (event) => { event.stopPropagation(); });
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
    if(actions.value.copyImage > 0 || !qrcodeImageCopySupported.value || !qrCodeBlob.value) { return; }
    actions.value.copyImage = 1;

    try {
        const blob = qrCodeBlob.value;
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

/** This function lets the user print the QR Code rendered by the user. */
async function printQRCode() {
    if(actions.value.printImage > 0 || !qrCodeURL.value) { return; }
    actions.value.printImage = 1;

    const PRINT_IFRAME_ID = "mohit-qrcode-customPrint";
    const PRINT_IFRAME_IMG_CLASS = "mohit-qrcode-customPrint-img";
    const QRCODE_EDGE_LENGTH = 450;

    try {
        if(printIframe != null) { document.body.removeChild(printIframe); }
        printIframe = document.createElement("iframe");
        printIframe.id = PRINT_IFRAME_ID;
        printIframe.classList.add(PRINT_IFRAME_ID);

        await new Promise(async (resolve, reject) => {
            document.body.append(printIframe);
            const tempIframeDocument = (printIframe.contentDocument || printIframe.contentWindow?.document);

            if(tempIframeDocument && tempIframeDocument.readyState === "complete") {
                resolve("IFrame Loaded");
            } else {
                printIframe.onload = () => { resolve("IFrame Loaded"); }
                sleep(7000).then(() => { reject(new Error("Timeout Error")); });
            }
        });

        const printIframeDocument = (printIframe.contentDocument || printIframe.contentWindow.document);
        printIframeDocument.title = DEFAULT_IMAGE_FILENAME;

        const newChild = printIframeDocument.createElement("div");
        const newChildImg = printIframeDocument.createElement("img");
        const iframeStyle = printIframeDocument.createElement("style");

        // The style rule here should match the one at the bottom for this same class.
        iframeStyle.textContent = `
            .mohit-qrcode-customPrint-img {
                width: 99vw;
                height: 99vh;
                max-height: 100vh;
                margin: 0px;
                padding: 0px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;

        newChild.classList.add(PRINT_IFRAME_IMG_CLASS);
        newChildImg.src = qrCodeURL.value;

        newChildImg.width = QRCODE_EDGE_LENGTH;
        newChildImg.height = QRCODE_EDGE_LENGTH;
        newChildImg.draggable = false;
        newChildImg.style.borderRadius = "10px";

        printIframeDocument.body.appendChild(iframeStyle);
        printIframeDocument.body.appendChild(newChild);
        await new Promise((resolve, reject) => { requestAnimationFrame(() => { requestAnimationFrame(() => { resolve(); }); }); });

        newChild.appendChild(newChildImg);
        await new Promise((resolve, reject) => {
            if(newChildImg.complete) {
                resolve();
            } else {
                newChildImg.onload = () => { resolve(); }
            }
        });

        // This triggers the print function at the end to open the popup.
        const printIframeWin = printIframe.contentWindow;
        printIframeWin.focus();
        printIframeWin.print();
       actions.value.printImage = 2; 
    } catch(e) {
        actions.value.printImage = 3;
    } finally {
        if(timeouts.printImage != null) { clearTimeout(timeouts.printImage); }
        timeouts.printImage = setTimeout(() => {
            actions.value.printImage = 0;
            timeouts.printImage = null;
        }, 3000); 
    }
}

/** This function calculates and sets the scale property for the share popup. */
function calculateSharePopupScale() {
    const width = windowWidth.value;
    const height = windowHeight.value;
    if(!document || !document.documentElement) { return; }

    if(width >= SHARE_POPUP_MIN_VIEWPORT_EDGE && height >= SHARE_POPUP_MIN_VIEWPORT_EDGE) {
        document.documentElement.style.setProperty(SHARE_POPUP_SCALE_CSS_VAR, "1"); // Sets the scale to 1 if the viewport is big enough.
    } else {
        const newScale = (((width < height) ? width : height) / SHARE_POPUP_MIN_VIEWPORT_EDGE);
        document.documentElement.style.setProperty(SHARE_POPUP_SCALE_CSS_VAR, String(newScale)); // Sets the scale based on the viewport.
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

/** This returns the image filename for the image export options. */
function getImageFilename() { return (DEFAULT_IMAGE_FILENAME + "." + qrcodeImageSuffix.value); }

/** This function returns a formatted phone number for the share popup to display. */
function formatPhoneNumber() { return ParsePhoneNumber(qrCodeLink.value.substring(4), "US").formatNational(); }

/** This function returns the current full URL as a string with the QR Data search parameter removed. */
function getParsedUrl() {
    const tempUrl = new URL(PERSONAL_WEBSITE_LINK + router.currentRoute.value.fullPath.substring(1));
    tempUrl.searchParams.delete("qrdata");
    return tempUrl;
}
</script>

<style lang="scss">
.qrcode-mainPopup {
    position: fixed;
    top: calc((100% - 585px) / 2);
    left: calc((100% - 585px) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: visible;
    width: 585px;
    height: auto;
    aspect-ratio: 1 / 1;
    scale: var(--mohit-share-popup-scale, 1);
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
    transition: border 0.2s, box-shadow 0.2s;
    cursor: pointer;
    outline: none;
}
#mohit-qrcode-waiting > .cover {
    position: relative;
    width: 450px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
}

#mohit-qrcode canvas, #mohit-qrcode svg {
    width: 100%;
}
#mohit-qrcode:focus, #mohit-qrcode:focus-visible {
    border: 2px solid black;
    box-shadow: 0px 0px 15px 3px var(--blue-three);
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
    top: 5px;
    right: 5px;
    transition: box-shadow 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--dark-background);
    width: 29px;
    height: 29px;
    border-radius: 10px;
    border: 1px solid white;
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
.qrcode-mainPopup-btn_v3 {
    padding: 0px;
    height: 27px;
    width: 32px;
    border: 2px solid var(--globe-green);
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--dark-background);
    color: var(--globe-green);
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: bold;
    transition: box-shadow 0.2s;
}

.qrcode-mainPopup-btn_v3:hover {
    box-shadow: 0px 0px 3px 1px var(--blue-five);
}
.qrcode-mainPopup-btn_v3.selected {
    font-weight: bold;
    color: var(--globe-green-light);
}

.qrcode-image-options {
    position: absolute;
    top: calc(100% - 5px);
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

#mohit-qrcode-customPrint, .mohit-qrcode-customPrint {
    position: absolute;
    width: 0px;
    height: 0px;
    border: none;
    margin: 0px;
    padding: 0px;
    page-break-after: avoid;
    page-break-inside: avoid;
    break-after: avoid;
    break-inside: avoid;
}
.mohit-qrcode-customPrint-img {
    width: 99vw;
    height: 99vh;
    max-height: 100vh;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

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