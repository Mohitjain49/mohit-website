<template>
<client-only>
    <vue-particles id="particlests" :options="ORANGE_BACKGROUND"></vue-particles>
</client-only>

<main id="contact-page" class="personal-web-body">
    <div class="contact-me-box web-service">
        <div class="contact-box-title-container center-flex-display">
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
                    v-model="msgTitle"
                    @click="setAlertBox('')"
                >
            </div>
            <div class="contact-input-tab" style="height: calc(100% - 70px);">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">
                        <span> Your Message </span>
                        <client-only>
                            <button @click="manageTTS()" :title="documentStore.ttsTitle">
                                <font-awesome-icon :icon="documentStore.ttsIcon" />
                            </button>
                        </client-only>
                    </div>
                </div>
                <textarea class="contact-input-tab-textbox contact-input-tab-textarea"
                    placeholder="Type your message here (minimum 50 characters)..."
                    v-model="msgMain"
                    @click="setAlertBox('')"
                ></textarea>
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
            <div class="contact-box-buttons-container center-flex-display">
                <div class="contact-input-tab-btn-container center-flex-display">
                    <button class="contact-input-tab-btn center-flex-display"
                        @click="sendEmail()"
                        @mouseenter="webData.setHeartbeatAnimation"
                        @mouseleave="webData.setHeartbeatAnimation"
                        v-html="'Send Message'">
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="contact-me-box socials">
        <div class="contact-box-title-container center-flex-display">
            <div class="gradient-text contact-box-title">My Socials</div>
        </div>
        <div class="contact-box-desc">
            <p v-html="MY_SOCIALS_DESC"></p>
        </div>

        <div class="contact-box-content">
            <template v-for="(social, index) in SOCIALS">
                <div class="social-tab" v-if="(index != 4)" :style="{ color: social.altColor }">
                    <div class="social-tab-header"> {{ social.name }} </div>
                    <a :href="social.link" class="social-tab-link"> {{ social.displayLink }} </a>

                    <div class="social-tab-btn-container">
                        <button class="social-tab-btn animate__animated" @click="copyLink(social.displayLink)"
                            @mouseenter="setSocialBtnAnimation"
                            @mouseleave="setSocialBtnAnimation">

                            <span> {{ social.copyBtn }} </span>
                            <client-only> <font-awesome-icon icon="fa-copy" /> </client-only>
                        </button>
                        <a :href="social.link" target="_blank" class="social-tab-btn send animate__animated"
                            @mouseenter="setSocialBtnAnimation"
                            @mouseleave="setSocialBtnAnimation">

                            <span> {{ social.linkBtn }} </span>
                            <client-only> <font-awesome-icon :icon="social.linkIcon" /> </client-only>
                        </a>
                    </div>
                </div>
            </template>
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
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const AWS_API_LINK = "https://bdddff0ya8.execute-api.us-east-2.amazonaws.com/default/sendEmail";

const alertBoxText = ref("");
var alertBoxTimeout = null;

const msgTitle = ref("");
const msgMain = ref("");
const senderName = ref("");
const senderEmail = ref("");

useHead(getMeta("Mohit Jain | Contact Me", "contact",
    "This page hosts multiple links to platforms where you can contact me."
));

/**
 * ----------------------------------------------------
 * These functions add Transitions to the contact page.
 * ----------------------------------------------------
 */

/**
 * This adds a transition to the contact boxes if the screen width is large enough.
 */
onMounted(() => {
    webData.mountWebData();
    if(window.innerWidth <= 525) { return; }

    document.getElementsByClassName("contact-me-box").item(0).classList.add("animate__animated", "animate__fadeInDown");
    document.getElementsByClassName("contact-me-box").item(1).classList.add("animate__animated", "animate__fadeInDown");
})

/**
 * This function adds or removes a transition to a social media link button.
 */
function setSocialBtnAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add("animate__headShake");
    } else {
        event.target.classList.remove("animate__headShake");
    }
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
    const body = {
        title: msgTitle.value,
        msgBody: msgMain.value,
        name: senderName.value,
        emailAddress: senderEmail.value
    }

    if(AWS_API_LINK === "") {
        setAlertBox("This feature is momentarily unavailable. I apologize for the inconvenience." + getAPIErrorRedirect());
        return;
    } else if(!checkAPIParameters(body)) {
        return;
    }

    ofetch.raw(AWS_API_LINK, { method: 'POST', body }).then((response) => {
        if(response.status !== 200) { return; }
        setAlertBox("Message sent successfully! I will make sure to respond to you within the next 48 hours.");
    }).catch((e) => {
        console.error(e);
        setAlertBox("This feature is not working at the moment." + getAPIErrorRedirect());
    })

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
    } else if(message.msgBody.length < 50) {
        setAlertBox("Please ensure that your message is at least 50 characters long.");
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

/**
 * This returns a string redirecting visitors to email my work email.
 */
function getAPIErrorRedirect() {
    return (" You can email me directly with my work email: " + getLinkString(SOCIALS[0].link, SOCIALS[0].displayLink));
}

/**
 * -----------------------------------------------------------
 * These functions manage the alert box and some text strings.
 * -----------------------------------------------------------
 */

/**
 * This function manages TTS with the message.
 */
function manageTTS() {
    if(documentStore.ttsPlaying) {
        documentStore.cancelTTS();
    } else {
        documentStore.startTTS(msgMain.value);
    }
}

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
    if(link === SOCIALS[2].displayLink) {
        copyDiscordLink();
        return;
    }

    const navLink = ((link === SOCIALS[0].displayLink) ? SOCIALS[0].link : link);
    navigator.clipboard.writeText(link).then(() => {
        setAlertBox("Copied Link: " + getLinkString(navLink, link));
    }).catch(() => {
        setAlertBox("Failed To Copy " + getLinkString(navLink, link));
    });
}

/**
 * This function copies the discord link.
 */
function copyDiscordLink() {
    const link = "mohitjainn";
    navigator.clipboard.writeText(link).then(() => {
        setAlertBox("Copied Username: " + link);
    }).catch(() => {
        setAlertBox("Failed To Copy Discord Username.");
    });
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
const MY_SOCIALS_DESC = "If you prefer to contact me another way, you can reach me via email, LinkedIn, Discord, and Github.";
</script>

<style scoped>
@import "@/styles/contactpage.css";
</style>