<template>
<client-only>
    <NavigationMain />
    <div id="contact-page" class="personal-web-body" @click="closeNavBarDropdown()">
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
                    <input class="contact-input-tab-textbox"
                        v-model="msgTitle"
                        @click="setAlertBox('')"
                    >
                </div>
                <div class="contact-input-tab" style="height: calc(100% - 70px);">
                    <div class="contact-input-tab-header-container">
                        <div class="contact-input-tab-header">Your Message</div>
                    </div>
                    <textarea class="contact-input-tab-textbox contact-input-tab-textarea"
                        placeholder="Type your message here..."
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
                <div class="social-tab" v-for="social in SOCIALS" :style="{ color: social.altColor }">
                    <div class="social-tab-header"> {{ social.name }} </div>
                    <a :href="social.link" class="social-tab-link"> {{ social.displayLink }} </a>

                    <div class="social-tab-btn-container">
                        <div class="social-tab-btn animate__animated" @click="copyLink(social.displayLink)"
                            @mouseenter="setSocialBtnTransition"
                            @mouseleave="setSocialBtnTransition">

                            <span> {{ social.copyBtn }} </span>
                            <font-awesome-icon icon="fa-copy" />
                        </div>
                        <a :href="social.link" target="_blank" class="social-tab-btn send animate__animated"
                            @mouseenter="setSocialBtnTransition"
                            @mouseleave="setSocialBtnTransition">

                            <span> {{ social.linkBtn }} </span>
                            <font-awesome-icon :icon="social.linkIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter class="web-footer-contact" />
    </div>

    <Transition name="alertBoxTransition">
        <div class="contact-alert-box" v-if="(alertBoxText !== '')">
            <div class="contact-alert-box-text" v-html="alertBoxText"></div>
        </div>
    </Transition>
</client-only>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import WebFooter from '../components/WebFooter.vue';
import { SOCIALS } from '../stores/Objects.js';

import axios from 'axios';
import { initWebData, closeNavBarDropdown } from '../stores/WebsiteData.js';
import { ref, onMounted, nextTick } from 'vue';
import { useHead } from '@unhead/vue';

const AWS_API_LINK = "https://bdddff0ya8.execute-api.us-east-2.amazonaws.com/default/sendEmail";
const alertBoxText = ref("");
var alertBoxTimeout = null;

const msgTitle = ref("");
const msgMain = ref("");
const senderName = ref("");
const senderEmail = ref("");

const WEBSITE_PATH = "https://mohit-jain.com/contact";
const PAGE_TITLE = "Mohit Jain | Contact Me";
const PAGE_DESC = "This page hosts multiple links to platforms where you can contact me.";

useHead({
    title: PAGE_TITLE,

    meta: [
        { name: 'description', content: PAGE_DESC },

        { property: 'og:url', content: WEBSITE_PATH },
        { property: 'og:title', content: PAGE_TITLE },
        { property: 'og:description', content: PAGE_DESC },

        { property: 'twitter:url', content: WEBSITE_PATH },
        { property: 'twitter:title', content: PAGE_TITLE },
        { property: 'twitter:description', content: PAGE_DESC },
    ]
})

/**
 * ----------------------------------------------------
 * These functions add Transitions to the contact page.
 * ----------------------------------------------------
 */

/**
 * This adds a transition to the contact boxes if the screen width is large enough.
 */
onMounted(() => {
    initWebData();
    if(window.innerWidth <= 525) { return; }

    nextTick(() => {
        document.getElementsByClassName("contact-me-box").item(0).classList.add("animate__animated", "animate__fadeInDown");
        document.getElementsByClassName("contact-me-box").item(1).classList.add("animate__animated", "animate__fadeInDown");
    })
})

/**
 * This function adds or removes a transition to a social media link button.
 */
function setSocialBtnTransition(event = new MouseEvent("mouseenter")) {
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
    const message = {
        title: msgTitle.value,
        msgBody: msgMain.value,
        name: senderName.value,
        emailAddress: senderEmail.value
    }

    if(AWS_API_LINK === "") {
        setAlertBox("This feature is momentarily unavailable. I apologize for the inconvenience." + getAPIErrorRedirect());
        return;
    } else if(!checkAPIParameters(message)) {
        return;
    }

    axios.post(AWS_API_LINK, message).then((response) => {
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
        setAlertBox("Send Message. Please Wait...");
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

const CONTACT_ME_DESC = "If you wish to contact me for any professional reason, you can do so below. It uses " +
    getLinkString("https://aws.amazon.com/ses/", "Amazon Simple Email Service (SES)") + " to send an automatic email to me.";
const MY_SOCIALS_DESC = "If you prefer to contact me another way, you can reach me via email, LinkedIn, Discord, and Github.";
</script>

<style scoped>
#contact-page {
    background: linear-gradient(to bottom, var(--blue-one) 0%, var(--blue-three) 100%);
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.web-footer-contact {
    grid-column: span 2;
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
.contact-input-tab-textbox::placeholder {
    font-size: 14px;
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
    border: 2px solid;
    border-radius: 7px;
    margin-bottom: 30px;
    background-color: var(--silver-light);
}
.social-tab-header {
    margin-left: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    margin-bottom: 3px;
    color: inherit;
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
    color: inherit;
    border: 1px solid;
    border-radius: 6px;
    font-size: 17px;
    font-weight: bold;
    font-family: 'Calibri', 'Trebuchet MS', sans-serif;
    transition: var(--default-transition);
}
.social-tab-btn:hover {
    background-color: rgba(255, 255, 255, 0.5);
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
@media (min-height: 965px) and (min-width: 1051px) {
    .web-footer-contact {
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
@media (min-height: 1820px) and (max-width: 1050px) {
    .web-footer-contact {
        position: absolute;
        bottom: 0;
        left: 0;
    }
}

@media (max-width: 1050px) and (min-width: 526px) {
    #contact-page {
        grid-template-columns: 1fr;
    }
    .contact-me-box {
        left: calc(50% - 237px) !important;
    }
    .web-footer-contact {
        grid-column: span 1;
    }
}

@media (max-width: 525px) {
    #contact-page {
        grid-template-columns: 1fr;
    }
    .web-footer-contact {
        grid-column: span 1;
        z-index: 20;
    }

    .contact-me-box {
        width: 100%;
        left: 0 !important;
        padding: 30px 0px;
        border: none;
        border-radius: 0px;
        margin: 0px;
    }
    .contact-me-box.web-service {
        border-bottom: 2px dashed var(--website-text);
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