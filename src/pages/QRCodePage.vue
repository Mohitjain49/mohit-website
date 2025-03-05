<template>
<client-only>
    <NavigationMain />
    <vue-particles id="particlests" :options="QR_PAGE_BACKGROUND"></vue-particles>

    <div id="qr-code-page" class="personal-web-body" @click="closeNavBarDropdown()">
        <div class="qr-element-separator"></div>
        <div class="qr-element" v-html="renderSVG(PORTFOLIO_WEBSITE_LINK)"></div>
        <div class="qr-element-separator"></div>
    </div>

    <div class="qr-package-link" @click="closeNavBarDropdown()">
        <span><a :href="UQR_PACKAGE_PAGE" target="_blank"> {{ UQR_PACKAGE_PAGE }} </a></span>
    </div>
</client-only>
</template>

<script setup>
import NavigationMain from '../components/NavigationMain.vue';
import { QR_PAGE_BACKGROUND } from '../stores/ParticlesConfig.js';
import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import { renderSVG } from 'uqr';

onMounted(() => { initWebData(); });
const PORTFOLIO_WEBSITE_LINK = "https://mohit-jain.com/";
const UQR_PACKAGE_PAGE = "https://unjs.io/packages/uqr";

const WEBSITE_PATH = "https://mohit-jain.com/qrcode";
const PAGE_TITLE = "Mohit Jain | QR Codes";
const PAGE_DESC = "This page hosts QR (Quick Response) codes that lead to projects or pages that I work on.";

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
</script>

<style scoped>
#qr-code-page {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.qr-element-separator {
    height: 75px;
    width: 100%;
}

.qr-element {
    padding: 25px;
    background-color: rgba(0, 0, 0, 0.25);
    border: 1px solid white;
    border-radius: 15px;
}
.qr-element, .qr-element svg {
    width: 475px;
    height: 475px;
}

.qr-package-link {
    position: fixed;
    width: fit-content;
    height: fit-content;
    top: 60px;
    left: 15px;
    color: black;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 10px;
    z-index: 10;
}
.qr-package-link a {
    color: var(--blue-five);
    transition: var(--default-transition);
    border-bottom: var(--thin-empty-border);
    padding-top: 2px;
    padding-bottom: 1px;
}
.qr-package-link a:hover {
    border-color: var(--blue-five);
}

@media (max-width: 600px) {
    .qr-element, .qr-element svg {
        width: 300px;
        height: 300px;
    }
    .qr-element {
        padding: 15px;
    }
}
</style>