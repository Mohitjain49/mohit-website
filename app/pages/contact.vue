<style scoped>
@import "~/styles/contactpage.css";
</style>

<template>
<ParticlesBackground :particlesOptions="ORANGE_BACKGROUND" />
<CompassMenu :routes="CONTACT_COMPASS" />
<CompassWidget :htmlClass="'main'" />

<main id="contact-page" class="personal-web-body">
    <div class="contact-boxes-container">
        <div class="contact-me-box web-service" id="form" ref="contact-form-box">
            <button @click="webData.openQRCodePopup()" class="contact-share-btn" :title="SHARE_PAGE_TITLE" pulse-loop>
                <FontAwesomeIcon icon="fa-share-from-square" />
            </button>

            <div class="contact-box-title-container">
                <h1 class="gradient-text contact-box-title"> Contact Me </h1>
            </div>
            <div class="contact-box-desc">
                <p v-html="CONTACT_ME_DESC"></p>
            </div>

            <div class="contact-box-content">
                <div class="contact-input-tab">
                    <div class="contact-input-tab-header-container">
                        <div class="contact-input-tab-header">Title</div>
                    </div>
                    <input class="contact-input-tab-textbox"
                        ref="titleInput"
                        v-model="msgTitle"
                        @click="setAlertBox('')"
                    >
                </div>
                <div class="contact-input-tab" style="height: calc(100% - 70px);">
                    <div class="contact-input-tab-header-container withOptions">
                        <div class="contact-input-tab-header">
                            <span style="margin-right: 10px;"> Your Message </span>
                            <div v-if="isMounted" class="options">
                                <button @click="audioStore.manageTTS(msgMain)" :title="audioStore.ttsTitle">
                                    <font-awesome-icon :icon="audioStore.ttsIcon" />
                                </button>
                                <button @click="audioStore.manageSTT()" :title="audioStore.sttUtilityTitle">
                                    <font-awesome-icon :icon="audioStore.sttUtilityIcon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <textarea class="contact-input-tab-textbox contact-input-tab-textarea"
                        placeholder="Type your message here (minimum 50 characters)..."
                        v-model="msgMain"
                        @click="setAlertBox('')"
                    ></textarea>
                    <div :class="['contact-input-tab-characterCount', (messageLong ? 'good' : '')]">
                        <span class="main-count"> {{ (msgMain.length) + ' / ' + MIN_MESSAGE_LENGTH }} </span>
                        <span class="small-text"> required characters </span>
                    </div>
                </div>
                <div class="contact-box-line"></div>

                <div class="contact-input-tab">
                    <div class="contact-input-tab-header-container">
                        <div class="contact-input-tab-header">Your Name</div>
                    </div>
                    <input class="contact-input-tab-textbox"
                        placeholder="Mohit Jain"
                        v-model="senderName"
                        @click="setAlertBox('')"
                    >
                </div>
                <div class="contact-input-tab">
                    <div class="contact-input-tab-header-container">
                        <div class="contact-input-tab-header">Your Email</div>
                    </div>
                    <input class="contact-input-tab-textbox"
                        type="email" placeholder="example@example.com"
                        v-model="senderEmail"
                        @click="setAlertBox('')"
                    >
                </div>
                <div class="contact-box-buttons-container">
                    <div class="contact-input-tab-btn-container">
                        <button class="contact-input-tab-btn" @click="sendEmail()" pulse-loop>
                            <span> Send Message </span>
                            <FontAwesomeIcon :icon="sendMessageIcon" :spinPulse="sendMessageState.pending" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact-me-box socials">
            <div class="contact-box-title-container">
                <div class="gradient-text contact-box-title">My Socials</div>
            </div>
            <div class="contact-box-desc">
                <p v-html="MY_SOCIALS_DESC"></p>
            </div>

            <div class="contact-box-content">
                <template v-for="(social, index) in SOCIALS">
                    <div :id="social.id" class="social-tab" v-if="(index != 2)" :style="{ color: social.altColor }">
                        <div class="social-tab-top">
                            <h3 class="social-tab-header">
                                {{ social.name }}
                                <font-awesome-icon :icon="social.linkIcon" />
                            </h3>
                        </div>
                        <a :href="social.link" class="social-tab-link"> {{ social.displayLink }} </a>

                        <div class="social-tab-options">
                            <button @click="copyLink(social.displayLink)" :title="social.copyBtn"
                                @pointerenter="setHeadShakeAnimation"
                                @mouseleave="setHeadShakeAnimation">

                                <font-awesome-icon icon="fa-copy" />
                            </button>
                            <button v-if="(webData.shareSupported && isMounted)" :title="social.shareBtn"
                                @click="shareLink(social.displayLink)"
                                @pointerenter="setHeadShakeAnimation"
                                @mouseleave="setHeadShakeAnimation">

                                <font-awesome-icon icon="fa-share" />
                            </button>
                            <a :href="social.link" target="_blank" :title="social.linkBtn"
                                @pointerenter="setHeadShakeAnimation"
                                @mouseleave="setHeadShakeAnimation">

                                <font-awesome-icon icon="fa-up-right-from-square" />
                            </a>
                            <button v-if="social.showCopyUsername" title="Copy Username"
                                @click="copyUsername(social.username)"
                                @pointerenter="setHeadShakeAnimation"
                                @mouseleave="setHeadShakeAnimation">

                                <font-awesome-icon icon="fa-signature" />
                            </button>
                        </div>

                        <button @click="openSocialQrcode(social.link)" class="social-tab-qrcodeBtn" title="Get QR Code">
                            <font-awesome-icon icon="fa-qrcode" />
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <WebFooter />
</main>

<Transition name="alertBoxTransition">
    <div class="contact-alert-box" v-if="(alertBoxText !== '')">
        <div class="contact-alert-box-text" v-html="alertBoxText"></div>
    </div>
</Transition>
</template>

<script setup>
import { ofetch } from 'ofetch';
const AWS_API_LINK = "https://contact-api.mohit-jain.com/sendEmail";
const MIN_MESSAGE_LENGTH = 50;

const webData = useWebsiteDataStore();
const audioStore = useAudioStore();
const router = useRouter();
const isMounted = useMounted();

const titleInput = ref();
const alertBoxText = ref("");
const contactFormRef = useTemplateRef('contact-form-box');
usePulseLoopAnimation(contactFormRef);

var alertBoxTimeout = null;
var sendMessageTimeout = null;

const msgTitle = ref("");
const msgMain = ref("");
const senderName = ref("");
const senderEmail = ref("");

const routeHash = computed(() => { return router.currentRoute.value.hash; });
const messageLong = computed(() => { return (msgMain.value.length >= MIN_MESSAGE_LENGTH); });
const sendMessageState = ref({ pending: false, sent: false, error: false });

const sendMessageIcon = computed(() => {
    const sendMessageObj = sendMessageState.value;
    return ("fa-" + (sendMessageObj.error ? "ban" : (sendMessageObj.sent ? "check" : (sendMessageObj.pending ? "spinner" : "arrow-right-from-bracket"))));
});
useHead(getMeta("Mohit Jain | Contact Me", "contact", "This page hosts multiple links to platforms where you can contact me.", "rgb(248, 206, 171)"));

/**
 * ----------------------------------------------------------------------------
 * These functions manage Transitions and Event Listeners for the contact page.
 * ----------------------------------------------------------------------------
 */

/**
 * This adds a transition to the contact boxes if the screen width is large enough.
 */
onMounted(() => {
    initWebData(70);
    manageSocialTabGlow();

    audioStore.changeSTTUpdateFunc((str) => { updateMainMsg(str); });
    if(window.innerWidth <= 525 || routeHash.value !== "") { return; }

    const contactBoxes = [
        document.getElementsByClassName("contact-me-box").item(0),
        document.getElementsByClassName("contact-me-box").item(1)
    ];

    for(let i = 0; i < contactBoxes.length; i++) {
        const box = contactBoxes[i];
        if(box && (typeof box.classList !== "undefined") && (box.classList instanceof DOMTokenList)) {
            box.classList.add("animate__animated", "animate__fadeInDown");
        }
    }
});

// This changes which, if any, social tab "glows" based on the router hash.
watch(routeHash, (newValue, oldValue) => { manageSocialTabGlow(oldValue); });

// This starts typing on the title input when the user is focused on the page but not on any input element.
onStartTyping(() => { if(!titleInput.value.active) { titleInput.value.focus(); } });

/**
 * This function manages which social tab is "glowing" or not.
 * @param {String} oldValue The old hash value.
 */
function manageSocialTabGlow(oldValue = "") {
    // This section removes the glow effect from the old social tab.
    if(oldValue !== "" && oldValue.length > 0) {
        const oldIndex = SOCIALS.findIndex(item => item.id === oldValue.substring(1));
        if(oldIndex != -1 && oldIndex != 2) {
            const oldTab = document.getElementById(SOCIALS[oldIndex].id);
            if(oldTab && typeof (oldTab.classList !== "undefined") && (oldTab.classList instanceof DOMTokenList)) {
                oldTab.classList.remove("glowing");
            }
        }
    }

    // This section adds the glow effect to the new social tab.
    const hash = routeHash.value;
    if(hash !== "" && hash.length > 0) {
        const newIndex = SOCIALS.findIndex(item => item.id === hash.substring(1));
        if(newIndex != -1 && newIndex != 2) {
            const socialTab = document.getElementById(SOCIALS[newIndex].id);
            if(socialTab && typeof (socialTab.classList !== "undefined") && (socialTab.classList instanceof DOMTokenList)) {
                socialTab.classList.add("glowing");
            }
        }
    }
}

/**
 * This function can be used by event listeners to update the main message on the contact page.
 * @param {String} str The new string that will become the main message.
 */
function updateMainMsg(str = "") {
    msgMain.value += str;
}

/**
 * ----------------------------------------------
 * These functions manage sending an email to me.
 * ----------------------------------------------
 */

/**
 * This function calls a AWS Lambda Function via Amazon API Gateway to send an email to me.
 */
function sendEmail() {
    // Stores the necessary parameters for the message.
    sendMessageState.value.pending = true;
    const body = {
        title: msgTitle.value,
        msgBody: msgMain.value,
        name: senderName.value,
        emailAddress: senderEmail.value
    }

    if(AWS_API_LINK === "") {
        setAlertBox("This feature is momentarily unavailable. I apologize for the inconvenience." + getAPIErrorRedirect());
        onSendEmailError();
        return;
    } else if(!checkAPIParameters(body)) {
        onSendEmailError();
        return;
    }

    ofetch.raw(AWS_API_LINK, { method: 'POST', body }).then((response) => {
        if(response.status !== 200) { return; }
        setAlertBox("Message sent successfully! I will make sure to respond to you within the next 48 hours.");

        // This changes an icon to show the message was sent successfully.
        sendMessageState.value.pending = false;
        sendMessageState.value.error = false;
        sendMessageState.value.sent = true;

        if(sendMessageTimeout != null) { clearTimeout(sendMessageTimeout); }
        sendMessageTimeout = setTimeout(() => {
            sendMessageState.value.sent = false;
            sendMessageTimeout = null;
        }, 4000);
    }).catch((e) => {
        console.error(e);
        onSendEmailError();
        setAlertBox("This feature is not working at the moment." + getAPIErrorRedirect());
    });
}

/**
 * This function checks the parameters for my API function.
 * @param {Object} message The parameters for the API.
 * @param {String} message.title The title of the message.
 * @param {String} message.msgBody The body of the message.
 * @param {String} message.name The name of the sender.
 * @param {String} message.emailAddress The title of the email.
 */
function checkAPIParameters(message) {
    if(message.title === "") {
        setAlertBox("Please enter an appropriate title for your message.");
    } else if(message.msgBody.length < MIN_MESSAGE_LENGTH) {
        setAlertBox("Please ensure that your message is at least " + MIN_MESSAGE_LENGTH + " characters long.");
    } else if(message.name === "") {
        setAlertBox("Please enter your name that I can refer to you as.");
    } else if(message.emailAddress === "") {
        setAlertBox("Please enter your email address so I can stay in touch with you.");
    } else {
        setAlertBox("Sending Message. Please Wait...");
        msgTitle.value = "";
        msgMain.value = "";
        senderName.value = "";
        senderEmail.value = "";
        return true;
    }
    return false;
}

/** This returns a string redirecting visitors to email my work email. */
function getAPIErrorRedirect() {
    return (" You can email me directly with my work email: " + getLinkString(SOCIALS[0].link, SOCIALS[0].displayLink));
}

/** This function runs whenever an error is detected when sendng an email to me. */
function onSendEmailError() {
    sendMessageState.value.pending = false;
    sendMessageState.value.sent = false;
    sendMessageState.value.error = true;

    if(sendMessageTimeout != null) { clearTimeout(sendMessageTimeout); }
    sendMessageTimeout = setTimeout(() => {
        sendMessageState.value.error = false;
        sendMessageTimeout = null;
    }, 4000);
}

/**
 * -----------------------------------------------------------
 * These functions manage the alert box and some text strings.
 * -----------------------------------------------------------
 */

/**
 * This sets the status of the alert box.
 * @param {String} text The text for the alert box.
 */
function setAlertBox(text = "") {
    alertBoxText.value = text;
    if(alertBoxTimeout != null) {
        clearTimeout(alertBoxTimeout);
        alertBoxTimeout = null;
    }

    if(text === "") { return; }
    alertBoxTimeout = setTimeout(() => {
        alertBoxText.value = "";
        alertBoxTimeout = null;
    }, 5000);
}

/**
 * This function copies a social link for the visitor.
 * @param {String} link The link to copy.
 */
function copyLink(link = "") {
    const navLink = ((link === SOCIALS[0].displayLink) ? SOCIALS[0].link : link);
    navigator.clipboard.writeText(link).then(() => {
        setAlertBox("Copied Link: " + getLinkString(navLink, link));
    }).catch(() => {
        setAlertBox("Failed To Copy " + getLinkString(navLink, link));
    });
}

/**
 * This function copies a username for the visitor.
 * @param name The username to copy.
 */
function copyUsername(name = "") {
    navigator.clipboard.writeText(name).then(() => {
        setAlertBox("Copied Username: <u>" + name + "</u>");
    }).catch(() => {
        setAlertBox("Failed To Copy <u>" + name + "</u>");
    });
}

/**
 * This function lets the user share a link with someone else.
 * @param {String} link The link to share.
 */
async function shareLink(link = "") {
    if(link === SOCIALS[0].displayLink) {
        await webData.shareText(link);
    } else {
        await webData.shareLink(link);
    }
}

/**
 * This simply calls the "openQRCodePopupWithData" function.
 */
function openSocialQrcode(link = PERSONAL_WEBSITE_LINK) {
    webData.setQRCodePopup(link);
}

/**
 * This function returns a HTML element in string form for JS functions here.
 * @param {String} link The link to use here.
 * @param {string} text The text that's displayed on the screen. If it's an empty string, it uses the link itself.
 */
function getLinkString(link = "/", text = "") {
    text = ((text === "") ? link : text);
    return ("<span><a href=\"" + link + "\" style=\"text-decoration: underline;\" target=\"_blank\">" + text + "</a></span>");
}

const CONTACT_ME_DESC = "If you wish to contact me for any professional reason, you can do so below. It uses " +
    getLinkString("https://aws.amazon.com/ses/", "Amazon Simple Email Service (SES)") + " to send an automatic email to me.";
const MY_SOCIALS_DESC = "If you prefer to contact me another way, you can reach me via email, LinkedIn, Github, and more.";
</script>