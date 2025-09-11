<template>
<client-only>
    <vue-particles id="particlests" :options="ORANGE_BACKGROUND"></vue-particles>
</client-only>
<FeaturesReturnWidget />

<main id="qr-code-page" class="personal-web-body transparent">
    <div class="qr-page-grid">
        <div v-for="code in QR_CODES" class="qr-element-container">
            <client-only> <div class="qr-element" v-html="renderSVG(code.qrLink)"></div> </client-only>
            <a :href="code.textLink" class="qr-element-link">
                <span> {{ code.displayText }} </span>
            </a>
        </div>
    </div>

    <div class="qr-page-bottomSpace"></div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => {
    initWebData();
    const animation = (window.innerWidth > 1150 ? "animate__bounceInDown" : "animate__fadeIn");
    const qrCodes = document.getElementsByClassName("qr-element-container");

    for(let i = 0; i < qrCodes.length; i++) {
        qrCodes.item(i).classList.add("animate__animated", animation);
    }
});
onBeforeUnmount(() => {
    setQRCodePopup();
})

useHead(getMeta("Mohit Jain | QR Codes", "qrcode",
    "This page hosts Quick Response Codes that lead to projects or pages that I work on."
));

const QR_CODES = [
    { qrLink: PERSONAL_WEBSITE_LINK, textLink: PERSONAL_WEBSITE_LINK, displayText: PERSONAL_WEBSITE_LINK },
    { qrLink: SOCIALS[0].link, textLink: SOCIALS[0].link, displayText: SOCIALS[0].displayLink },
    { qrLink: SOCIALS[1].link, textLink: SOCIALS[1].link, displayText: SOCIALS[1].displayLink },
    { qrLink: SOCIALS[3].link, textLink: SOCIALS[3].link, displayText: SOCIALS[3].link },
    { qrLink: SOCIALS[4].link, textLink: SOCIALS[4].link, displayText: SOCIALS[4].link },
    { qrLink: SOCIALS[5].link, textLink: SOCIALS[5].link, displayText: SOCIALS[5].link }
];
</script>

<style scoped>
.qr-page-grid {
    width: 1400px;
    height: fit-content;
    min-height: var(--body-height);
    padding: 0px calc(50% - 700px);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    padding: 7px 12px;
    background-color: rgba(255, 255, 255, 0.25);
    font-family: 'Lexend', sans-serif;
    color: var(--website-text);
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    font-size: 11px;
}
.qr-element-link span {
    border-bottom: var(--thin-empty-border);
    transition: var(--default-transition);
    padding: 1px 0px;
}
.qr-element-link:hover span {
    border-color: var(--website-text);
}

.qr-page-bottomSpace {
    display: none;
    height: 75px;
}
#qr-code-popup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.9);
}

.popup-qr-element, .popup-qr-element svg {
    width: 450px;
    height: 450px;
}
.popup-qr-text {
    color: white;
    font-family: 'Lexend', sans-serif;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: rgba(255, 255, 255, 0.25);
    padding: 7px;
    border-radius: 5px;
    border: 1px solid white;
    overflow-wrap: break-word;
}

@media (max-width: 1400px) {
    .qr-page-grid {
        width: 1000px;
        padding: 0px calc(50% - 500px);
        grid-template-columns: 1fr 1fr;
    }
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
    .qr-page-bottomSpace {
        display: block;
    }
}
@media (max-width: 600px) {
    .qr-element {
        padding: 15px;
    }
    .qr-element, .qr-element svg {
        width: 275px;
        height: 275px;
    }

    .popup-qr-element, .popup-qr-element svg {
        width: 300px;
        height: 300px;
    }
    .popup-qr-text {
        font-size: 10px;
    }
}
</style>