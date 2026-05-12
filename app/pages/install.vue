<template>
<ParticlesBackground :particlesOptions="INSTALL_BACKGROUND" />
<FeaturesReturnWidget />

<main id="install-page" class="personal-web-body">
    <div class="install-body">
        <div class="install-box">
            <button class="install-button" @click="installStore.installApp()">
                <font-awesome-icon :icon="installStore.installIcon" />
                <span> {{ installStore.installText }} </span>
            </button>
            <a :href="VITE_PWA_WEBSITE" class="install-vite-pwa">
                This uses Vite PWA to create and download a Progressive Web Application on your device.
            </a>
            <p class="install-keybind-msg">
                P.S. You can also access this page with Alt + I
            </p>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
const installStore = useInstallStore();
const VITE_PWA_WEBSITE = "https://vite-pwa-org.netlify.app/";

useHead(getMeta("Mohit Jain | Install My Portfolio", "install",
    "My website can be installed as a Progressive Web Application (PWA) on this page.",
    "#232323"
));
</script>

<style scoped lang="scss">
#install-page {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
.install-body {
    width: 100%;
    height: calc(var(--true-100vh, 100vh) + 10px);
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--website-text);
}

.install-box {
    width: 500px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 20px;
    border: 2px solid var(--website-text);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.install-vite-pwa {
    width: 80%;
    height: fit-content;
    margin-top: 20px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}
.install-vite-pwa:hover {
    text-decoration: underline;
}

.install-button {
    width: 60%;
    height: 28%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border: 2px dotted var(--website-text);
    text-align: center;
    color: var(--website-text);
    font-size: 24px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}
.install-button svg {
    margin-right: 5px;
}

.install-keybind-msg {
    width: 80%;
    height: fit-content;
    margin-top: 10px;
    text-align: center;
    font-family: 'Lexend', sans-serif;
    font-size: 14px;
    color: var(--lightning-yellow);
}

@media (max-width: 600px) {
    .install-box {
        width: 300px;
        height: 250px;
    }
    .install-button {
        width: 80%;
        font-size: 19px;
    }
    .install-keybind-msg {
        font-size: 12px;
    }
}
</style>