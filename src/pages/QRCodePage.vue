<template>
<NavigationMain />
<client-only>
    <vue-particles id="particlests" :options="ORANGE_BACKGROUND"></vue-particles>
</client-only>

<div id="qr-code-page" class="personal-web-body" @click="closeNavBarDropdown()">
    <div class="qr-page-grid">
        <div class="qr-element-container">
            <div class="qr-element" v-html="renderSVG(PERSONAL_WEBSITE_LINK)"></div>
            <a :href="PORTFOLIO_WEBSITE_LINK" class="qr-element-link">
                <span> {{ PORTFOLIO_WEBSITE_LINK }} </span>
            </a>
        </div>
        <div class="qr-element-container">
            <div class="qr-element" v-html="renderSVG(PERSONAL_GLOBE_LINK)"></div>
            <a :href="PERSONAL_GLOBE_LINK" class="qr-element-link">
                <span> {{ PERSONAL_GLOBE_LINK }} </span>
            </a>
        </div>
    </div>
    <WebFooter />
</div>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import WebFooter from '../components/WebFooter.vue';
import { initWebData, closeNavBarDropdown } from '../stores/WebsiteData.js';

import { ORANGE_BACKGROUND } from '../stores/ParticlesConfig.js';
import { PERSONAL_WEBSITE_LINK, PERSONAL_GLOBE_LINK } from '../stores/Objects.js';
import { getMeta } from '../stores/GetMeta.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import { renderSVG } from 'uqr';

onMounted(() => {
    initWebData();
    if(window.innerWidth <= 1150) { return; }
    const qrCodes = document.getElementsByClassName("qr-element-container");

    for(let i = 0; i < qrCodes.length; i++) {
        qrCodes.item(i).classList.add("animate__animated", "animate__bounceInDown")
    }
});

const UQR_PACKAGE_PAGE = "https://unjs.io/packages/uqr";
const PAGE_DESC = "This page hosts QR (Quick Response) codes that lead to projects or pages that I work on. " +
    "I used the uqr (" + UQR_PACKAGE_PAGE + ") Code Package for this page.";

useHead(getMeta("Mohit Jain | QR Codes", "qrcode", PAGE_DESC));
</script>

<style scoped>
#qr-code-page {
    background: transparent;
}

.qr-page-grid {
    width: 1000px;
    height: fit-content;
    min-height: var(--body-height);
    padding: 0px calc(50% - 500px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.qr-element-container {
    width: 100%;
    height: fit-content;
    min-height: calc(100% - 150px);
    padding: 75px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.qr-element {
    padding: 25px;
    background-color: rgba(255, 255, 255, 0.25);
    border: 1px solid black;
    border-radius: 15px;
}
.qr-element, .qr-element svg {
    width: 300px;
    height: 300px;
}

.qr-element-link {
    width: fit-content;
    height: fit-content;
    margin-top: 15px;
    padding: 10px 15px;
    background-color: rgba(255, 255, 255, 0.25);
    font-family: 'Lexend', sans-serif;
    color: var(--website-text);
    border: 1px solid black;
    border-radius: 15px;
    cursor: pointer;
}
.qr-element-link span {
    border-bottom: var(--empty-border);
    transition: var(--default-transition);
    padding: 2px 0px;
}
.qr-element-link:hover span {
    border-color: var(--website-text);
}

@media (max-width: 1000px) {
    .qr-page-grid {
        width: 100%;
        padding: 0px;
    }
}
@media (max-width: 800px) {
    .qr-page-grid {
        grid-template-columns: 1fr;
    }
    .qr-element-container {
        min-height: 0px;
        padding-bottom: 0px;
    }
    .qr-element-container.last {
        padding-bottom: 75px;
    }
}
@media (max-width: 600px) {
    .qr-element {
        padding: 15px;
    }
}
</style>