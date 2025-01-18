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
                <input class="contact-input-tab-textbox">
            </div>
            <div class="contact-input-tab" style="height: calc(100% - 70px);">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Your Message</div>
                </div>
                <textarea class="contact-input-tab-textbox contact-input-tab-textarea"></textarea>
            </div>
            <div class="contact-box-line"></div>

            <div class="contact-input-tab">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Your Name</div>
                </div>
                <input class="contact-input-tab-textbox">
            </div>
            <div class="contact-input-tab">
                <div class="contact-input-tab-header-container">
                    <div class="contact-input-tab-header">Your Email</div>
                </div>
                <input class="contact-input-tab-textbox">
            </div>
            <div class="contact-box-buttons-container center-flex-display">
                <div class="contact-input-tab-btn-container center-flex-display">
                    <div class="contact-input-tab-btn center-flex-display">Send Message</div>
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
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | Contact Me";
    webData.mountWebData();
})

/**
 * This function copies a social link for the visitor.
 * @param {String} link The link to copy.
 */
function copyLink(link = "") {
    navigator.clipboard.writeText(link);
}

const CONTACT_ME_DESC = "If you wish to contact me for any professional reason, please do so below. It uses " +
    "<span><a href=\"https://aws.amazon.com/ses/\" style=\"text-decoration: underline;\" target=\"_blank\">Amazon Simple Email Service (SES)</a></span>" +
    " to send an automatic email to me."
const MY_SOCIALS_DESC = "If you prefer to contact me another way, you can reach me via email, phone, LinkedIn, Discord, and Github.";

/**
 * These socials are ways that people will be able to contact me.
 */
const SOCIALS = [
    {
        name: "Email",
        displayLink: "mohitkjain49@gmail.com",
        link: "mailto:mohitkjain49@gmail.com",
        copyBtn: "Copy Email",
        linkBtn: "Send Email",
        linkIcon: "fa-share"
    },
    {
        name: "Phone Number",
        displayLink: "(770) 687-5981",
        link: "tel:7706875981",
        copyBtn: "Copy Number",
        linkBtn: "Call Number",
        linkIcon: "fa-phone"
    },
    {
        name: "LinkedIn",
        displayLink: "https://www.linkedin.com/in/mohitjain49",
        link: "https://www.linkedin.com/in/mohitjain49",
        copyBtn: "Copy LinkedIn Link",
        linkBtn: "Go To LinkedIn",
        linkIcon: "fa-brands fa-linkedin"
    },
    {
        name: "Discord",
        displayLink: "https://discord.com/users/mohitjainn",
        link: "https://discord.com/users/mohitjainn",
        copyBtn: "Copy Discord Link",
        linkBtn: "Go To Discord",
        linkIcon: "fa-brands fa-discord"
    },
    {
        name: "GitHub",
        displayLink: "https://github.com/Mohitjain49",
        link: "https://github.com/Mohitjain49",
        copyBtn: "Copy GitHub Link",
        linkBtn: "Go To Github",
        linkIcon: "fa-brands fa-github"
    },
]
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
    margin-bottom: 12px;
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
        height: 100%;
        width: 100%;
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
}
</style>