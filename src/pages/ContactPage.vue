<template>
    <NavigationMain />
    <div class="personal-web-body contact-flex-display" @click="() => {webData.setNavBarDropdown(-1)}">
        <div class="contact-me-box">
            <div class="contact-box-title-container center-flex-display">
                <div class="gradient-text contact-box-title">Contact Me</div>
            </div>
            <div class="contact-box-desc">
                <span v-html="CONTACT_ME_DESC_ONE"></span>
                <span class="contact-box-desc-link" @click="openAmazonSES" title="Open Amazon SES">
                    {{ "Amazon Simple Email Service (SES)" }}
                </span>
                <span v-html="CONTACT_ME_DESC_TWO"></span>
            </div>

            <div class="contact-box-content">
                <div class="contact-input-tab">
                    <div class="contact-input-tab-header-container center-flex-display">
                        <div class="contact-input-tab-header">Title</div>
                    </div>
                    <input class="contact-input-tab-textbox">
                </div>
                <div class="contact-input-tab" style="height: calc(100% - 70px);">
                    <div class="contact-input-tab-header-container center-flex-display">
                        <div class="contact-input-tab-header">Your Message</div>
                    </div>
                    <textarea class="contact-input-tab-textbox contact-input-tab-textarea" data-gramm-editor="false"></textarea>
                </div>
                <div class="contact-box-line"></div>

                <div class="contact-input-tab">
                    <div class="contact-input-tab-header-container center-flex-display">
                        <div class="contact-input-tab-header">Your Name</div>
                    </div>
                    <input class="contact-input-tab-textbox">
                </div>
                <div class="contact-input-tab">
                    <div class="contact-input-tab-header-container center-flex-display">
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
    </div>
</template>

<script setup>
import "../styles/mainpage.css";
import NavigationMain from '../components/NavigationMain.vue';

import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | Contact Me";
    webData.mountWebData();
})

/**
 * This opens the Amazon Simple Email Service (SES) Website in a new browser tab.
 */
function openAmazonSES() {
    window.open("https://aws.amazon.com/ses/", "_blank");
}

const CONTACT_ME_DESC_ONE = "If you wish to contact me for any professional reason, please do so below. It uses ";
const CONTACT_ME_DESC_TWO = " to send an automatic email to me."
</script>