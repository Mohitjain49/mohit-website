<template>
<NavigationMain />
<div id="contact-page" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <div class="contact-me-box web-service">
        <div class="contact-box-title-container center-flex-display">
            <div class="gradient-text contact-box-title">Contact Me</div>
        </div>
        <div class="contact-box-desc">
            <span v-html="CONTACT_ME_DESC"></span>
        </div>

        <div class="contact-box-content">
            <div class="contact-input-tab">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Title</div>
                </div>
                <input class="contact-input-tab-textbox" v-model="msgTitle">
            </div>
            <div class="contact-input-tab" style="height: calc(100% - 70px);">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Your Message</div>
                </div>
                <textarea class="contact-input-tab-textbox contact-input-tab-textarea" v-model="msgMain"></textarea>
            </div>
            <div class="contact-box-line"></div>

            <div class="contact-input-tab">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Your Name</div>
                </div>
                <input class="contact-input-tab-textbox" v-model="senderName">
            </div>
            <div class="contact-input-tab">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Your Email</div>
                </div>
                <input class="contact-input-tab-textbox" v-model="senderEmail">
            </div>
            <div class="contact-box-buttons-container center-flex-display">
                <div class="contact-input-tab-btn-container center-flex-display">
                    <div class="contact-input-tab-btn center-flex-display" @click="sendEmail()">Send Message</div>
                </div>
            </div>
        </div>
    </div>

    <div class="contact-me-box socials">
        <div class="contact-box-title-container center-flex-display">
            <div class="gradient-text contact-box-title">My Socials</div>
        </div>
        <div class="contact-box-desc">
            <span v-html="MY_SOCIALS_DESC"></span>
        </div>

        <div class="contact-box-content">
            <div class="social-tab" v-for="social in SOCIALS">
                <div class="social-tab-header"> {{ social.name }} </div>
                <a :href="social.link" class="social-tab-link"> {{ social.displayLink }} </a>
                <div class="social-tab-btn-container">
                    <div class="social-tab-btn" @click="copyLink(social.displayLink)">
                        <span> {{ social.copyBtn }} </span>
                        <font-awesome-icon icon="fa-copy" />
                    </div>
                    <a :href="social.link" target="_blank" class="social-tab-btn send">
                        <span> {{ social.linkBtn }} </span>
                        <font-awesome-icon :icon="social.linkIcon" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<Transition name="alertBoxTransition">
    <div class="contact-alert-box" v-if="(alertBoxText !== '')">
        <div class="contact-alert-box-text" v-html="alertBoxText"></div>
    </div>
</Transition>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import { SOCIALS } from '../stores/Objects.js';
import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { ref, onMounted } from 'vue';

const webData = useWebsiteDataStore();
const AWS_API_AVAILABLE = false;

const alertBoxText = ref("");
var alertBoxTimeout = null;

const msgTitle = ref("");
const msgMain = ref("");
const senderName = ref("");
const senderEmail = ref("");

onMounted(() => {
    document.title = "Mohit Jain | Contact Me";
    webData.mountWebData();
});

/**
 * This function calls a AWS Lambda Function via Amazon API Gateway to send an email to me.
 */
function sendEmail() {
    // Stores the necessary parameters for the message.
    const message = {
        title: msgTitle.value,
        body: msgMain.value,
        name: senderName.value,
        email: senderEmail.value
    }

    // Clears all the input boxes.
    msgTitle.value = "";
    msgMain.value = "";
    senderName.value = "";
    senderEmail.value = "";

    if(!AWS_API_AVAILABLE) {
        setAlertBox("This feature is momentarily unavailable. I apologize for the inconvenience. " +
            "You can email me directly with my work email: " +
            getLinkString(SOCIALS[0].link, SOCIALS[0].displayLink)
        );
    } else {
        console.log(message);
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
    navigator.clipboard.writeText(link);
    const navLink = ((link === SOCIALS[0].displayLink) ? SOCIALS[0].link : link);
    setAlertBox("Copied Link: " + getLinkString(navLink, link));
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

const CONTACT_ME_DESC = "If you wish to contact me for any professional reason, please do so below. It uses " +
    getLinkString("https://aws.amazon.com/ses/", "Amazon Simple Email Service (SES)") +
    " to send an automatic email to me."
const MY_SOCIALS_DESC = "If you prefer to contact me another way, you can reach me via email, LinkedIn, Discord, and Github.";
</script>

<style scoped>
#contact-page {
    background: linear-gradient(to bottom, var(--blue-one) 0%, var(--blue-three) 100%);
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.contact-me-box {
    position: relative;
    width: 450px;
    padding: 25px 10px;
    margin: 25px 0px;
    height: fit-content;
    min-height: 750px;
    border: 2px solid var(--website-text);
    border-radius: 20px;
    overflow: hidden;
    background: var(--webpage-static-background);
}
.contact-me-box.web-service {
    left: calc(100% - 525px);
}
.contact-me-box.socials {
    left: 50px;
}

.contact-box-line {
    position: relative;
    left: calc(12.5% + 2.5px);
    height: 2px;
    width: 75%;
    margin: 20px 0px;
    background-color: var(--website-text);
}

.contact-box-title-container {
    height: 75px;
    width: 100%;
    text-align: center;
}
.contact-box-title {
    font-size: 50px;
    width: fit-content;
    border-bottom: 2px solid var(--website-text);
    margin-top: 2px;
    border-radius: 5px;
}

.contact-box-desc {
    position: relative;
    width: 80%;
    left: 10%;
    margin: 15px 0px;
    color: var(--website-text);
    font-size: 17px;
    font-family: 'Lexend';
}
.contact-box-desc-link {
    cursor: pointer;
    margin-top: 2px;
    border-radius: 3px;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    transition: var(--default-transition);
}
.contact-box-desc-link:hover {
    border-color: var(--website-text);
}

.contact-box-content {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr;
}
.contact-input-tab {
    height: 70px;
    width: 100%;
}

.contact-input-tab-header-container {
    width: 100%;
    height: 25px;
    padding-bottom: 2.5px;
    padding-top: 2.5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.contact-input-tab-header {
    width: 75%;
    height: 100%;
    color: var(--website-text);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
}

.contact-input-tab-textbox {
    position: relative;
    border: 1px solid var(--website-text);
    outline: none;
    font-size: 17px;
    border-radius: 5px;
    width: 75%;
    left: 12.5%;
    background-color: var(--nav-bar-background);
    color: var(--website-text);
    font-family: 'Roboto', sans-serif;
    padding: 5px 3px;
    transition: background-color 0.2s;
}
.contact-input-tab-textbox:hover {
    background-color: var(--translucent-background); 
}
.contact-input-tab-textbox:focus {
    border: 2px solid var(--website-text);
}

.contact-input-tab-textarea {
    resize: vertical;
    height: 200px;
    max-width: 75%;
    min-width: 75%;
    min-height: 20px;
    max-height: 375px;
    overflow-y: auto;
    overflow-x: hidden;
}
.contact-box-buttons-container {
    flex-direction: column;
    width: 100%;
    height: fit-content;
}

.contact-input-tab-btn-container {
    height: 60px;
    width: 100%;
}
.contact-input-tab-btn {
    cursor: pointer;
    height: 30px;
    width: 60%;
    color: var(--website-text);
    font-size: 17px;
    font-weight: bold;
    font-family: 'Calibri', 'Trebuchet MS', sans-serif;
    border-radius: 10px;
    text-decoration: none;
    border: var(--empty-border);
    background-color: var(--website-light-text);
    transition: var(--default-transition);
}
.contact-input-tab-btn:hover {
    border-color: var(--website-text);
}

.social-tab {
    position: relative;
    padding: 5px;
    height: 90px;
    width: 80%;
    left: calc(10% - 10px);
    border: 2px solid var(--website-text);
    border-radius: 7px;
    margin-bottom: 30px;
}
.social-tab-header {
    margin-left: 5px;
    color: var(--website-text);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    margin-bottom: 3px;
}

.social-tab-link {
    margin-left: 5px;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    color: var(--blue-five);
    border-bottom: var(--thin-empty-border);
    padding-bottom: 1px;
    transition: var(--default-transition);
}
.social-tab-link:hover {
    border-color: var(--blue-five);
}

.social-tab-btn-container {
    position: relative;
    top: 3px;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.social-tab-btn {
    cursor: pointer;
    margin-left: 5px;
    padding: 7px;
    width: fit-content;
    text-align: center;
    border: 1px dotted var(--website-text);
    color: var(--website-text);
    border-radius: 6px;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Calibri', 'Trebuchet MS', sans-serif;
    transition: var(--default-transition);
}
.social-tab-btn:hover {
    background-color: var(--translucent-background);
    border: 1px solid var(--website-text);
}

.social-tab-btn.send {
    margin-left: 0px;
    margin-right: 5px;
}
.social-tab-btn span {
    margin-right: 5px;
}

.contact-alert-box {
    position: fixed;
    left: 10%;
    bottom: 30px;
    height: 100px;
    width: 80%;
    max-width: 600px;
    border: 2px solid var(--website-text);
    border-radius: 20px;
    background-color: var(--webpage-static-background);
    z-index: 5;
    box-shadow: 0px 0px 10px 0px black;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.contact-alert-box-text {
    height: fit-content;
    width: calc(100% - 20px);
    padding: 5px 10px;
    color: var(--blue-three);
    text-align: center;
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
}

.alertBoxTransition-enter-active, .alertBoxTransition-leave-active {
    transition: bottom 0.5s, opacity 0.5s;
}
.alertBoxTransition-enter-from, .alertBoxTransition-leave-to {
    opacity: 0;
    bottom: -90px;
}
.alertBoxTransition-enter-to, .alertBoxTransition-leave-from {
    opacity: 1;
    bottom: 30px;
}

@media (min-width: 750px) {
    .contact-alert-box {
        left: calc(50% - 300px);
    }
}

@media (max-width: 1050px) and (min-width: 526px) {
    #contact-page {
        grid-template-columns: 1fr;
    }
    .contact-me-box {
        left: calc(50% - 225px) !important;
    }
}

@media (max-width: 525px) {
    #contact-page {
        grid-template-columns: 1fr;
    }
    .contact-me-box {
        width: 100%;
        min-height: 100%;
        left: 0 !important;
        padding: 20px 0px;
        border: none;
        border-radius: 0px;
    }
    .contact-me-box.web-service {
        margin-top: 0px;
        padding-bottom: 0px;
    }

    .social-tab-link {
        font-size: 14px;
    }
    .social-tab-btn {
        font-size: 14px;
    }
    .contact-alert-box-text {
        font-size: 14px;
    }
}
</style>