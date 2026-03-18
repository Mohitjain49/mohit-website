<template>
<ParticlesBackground :particlesOptions="COPYRIGHT_BACKGROUND" />
<main class="personal-web-body transparent">
    <div class="copyright-body-exterior">
        <div class="copyright-body">
            <h1 class="copyright-body-header">
                <font-awesome-icon icon="fa-copyright" />
                <span> {{ COPYRIGHT_TEXT }} </span>
            </h1>

            <h2 class="copyright-body-subheader version"> {{ PROJECT_VERSION }} </h2>
            <h2 class="copyright-body-subheader"> {{ RELEASE_DATE }} </h2>
            <h2 class="copyright-body-subheader small"> {{ RELEASE_TIME }} </h2>

            <div class="copyright-body-desc">
                I'm glad you're here and hope you find inspiration in my work.
                Feel free to explore the site, take ideas, and use them to spark your own creativity.
                However, please don't directly copy and then take full credit for my content, design, or code.
                <br> <br>
                If you would like to collaborate or discuss using any part of my work, 
                I'd love to hear from you! You'll find some links to contact me on the footer 
                <span style="text-decoration: underline;">
                    <RouterLink :to="{ path: route.path, hash: '#footer' }" @click="goToPageSection('footer')">below.</RouterLink>
                </span>
            </div>

            <button @click="checkForUpdates()" class="copyright-reload-btn" title="Update Website">
                <FontAwesomeIcon icon="fa-rotate" :spin="buttonClicked" />
            </button>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import now from '~build/time';
import { version } from "~build/package";

const route = useRoute();
const buttonClicked = ref(false);

const COPYRIGHT_TEXT = ref("2026 Mohit Jain");
const RELEASE_DATE = ref("Released On: Jan 22, 2026");
const RELEASE_TIME = ref("(11:59 PM)");
const PROJECT_VERSION = ref("Version " + version);

onMounted(() => {
    initWebData();
    COPYRIGHT_TEXT.value = (new Date().getFullYear() + " Mohit Jain");
    RELEASE_DATE.value = ("Released On: " + useDateFormat(now, "MMMM Do, YYYY").value);
    RELEASE_TIME.value = ("(" + useDateFormat(now, "h:mm A").value + ")");
});
useHead(getMeta("Mohit Jain | Copyright Notice", "copyright",
    "A legal disclaimer for any vistors on my website.",
    "rgb(248, 206, 171)"
));

/**
 * This function checks for updates and deletes the cache and unregisters service workers.
 */
async function checkForUpdates() {
    if(buttonClicked.value) { return; }
    buttonClicked.value = true;

    if('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for(const reg of regs) { await reg.unregister(); }
    }
    if('caches' in window) {
        const keys = await caches.keys();
        for(const key of keys) { await caches.delete(key); }
    }
    window.location.reload(true);
}
</script>

<style scoped>
.copyright-body-exterior {
    height: fit-content;
    min-height: calc(100vh - 90px);
    padding: 20px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.copyright-body {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin: 0px auto;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: black;
    color: var(--website-light-text);
    border-radius: 25px;
}

.copyright-body-header {
    width: fit-content;
    height: fit-content;
    font-size: 60px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.copyright-body-subheader {
    width: fit-content;
    height: fit-content;
    font-size: 20px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: inherit;
    margin-top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.copyright-body-desc {
    padding-top: 20px;
    width: 100%;
    height: fit-content;
    max-width: 700px;
    font-size: 25px;
    font-family: 'Montserrat', 'Roboto', sans-serif;
    color: inherit;
}

.copyright-body-subheader.small {
    font-size: 14px;
    margin-top: 0px;
}
.copyright-body-subheader.version {
    color: var(--lightning-yellow);
    text-decoration: underline;
}

.copyright-reload-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: var(--dark-background);
    border: 2px solid var(--website-text);
    color: var(--website-text);
    height: 40px;
    width: 40px;
    font-size: 20px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition);
}
.copyright-reload-btn:hover {
    box-shadow: 0px 0px 10px 1px var(--website-light-text);
}

@media (max-width: 680px) {
    .copyright-body-header {
        font-size: 40px;
    }
}
@media (max-width: 600px) {
    .copyright-body-header {
        font-size: 28px;
    }
    .copyright-body-subheader {
        font-size: 12px;
    }
    .copyright-body-desc {
        font-size: 16px;
    }

    .copyright-body-subheader.small {
        font-size: 9px;
    }
    .copyright-reload-btn {
        top: 10px;
        left: 10px;
        font-size: 14px;
        width: 30px;
        height: 30px;
    }
}
@media (max-width: 450px) {
    .copyright-body-header {
        font-size: 24px;
        gap: 3px;
    }
}
</style>