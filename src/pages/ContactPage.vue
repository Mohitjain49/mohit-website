<template>
<NavigationMain />
<div id="contact-page" class="personal-web-body contact-flex-display" @click="() => {webData.setNavBarDropdown(-1)}">
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
                <textarea class="contact-input-tab-textbox contact-input-tab-textarea"></textarea>
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

<style scoped>
#contact-page {
    background: linear-gradient(to bottom, var(--blue-one) 0%, var(--blue-three) 100%);
}

.contact-me-box {
    width: 450px;
    padding: 25px 10px;
    margin: 25px 0px;
    height: fit-content;
    border: 2px solid var(--website-text);
    border-radius: 20px;
    overflow: hidden;
    background: var(--webpage-static-background);
}
.contact-flex-display {
    display: flex;
    justify-content: center;
    align-items: center;
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
    border: 1px solid var(--website-text);;
    outline: none;
    font-size: 17px;
    border-radius: 5px;
    width: 75%;
    left: 12.5%;
    background-color: var(--nav-bar-background);
    color: var(--website-text);
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

@media (max-width: 500px) {
    .contact-me-box {
        width: 100%;
        padding: 20px 0px;
        height: fit-content;
        border: none;
    }
}

@media (min-height: 1400px) and (min-width: 1000px) {
    .contact-me-box {
        transform: scale(1.5, 1.5);
    }
}
</style>