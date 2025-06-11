<template>
<client-only>
    <vue-particles id="particlests" :options="INSTALL_BACKGROUND"></vue-particles>
</client-only>

<div id="install-page" class="personal-web-body">
    <div class="install-body">
        <div class="install-box">
            <button class="install-button" @click="installStore.installApp()">
                <client-only> <font-awesome-icon :icon="installStore.installIcon" /> </client-only>
                <span> {{ installStore.installText }} </span>
            </button>
            <a :href="VITE_PWA_WEBSITE" class="install-vite-pwa">
                This uses Vite PWA to create and download a Progressive Web Application on your device.
            </a>
        </div>
    </div>
    <WebFooter />
</div>
</template>

<script setup>
onMounted(() => { initWebData(); });
const installStore = useInstallStore();
const VITE_PWA_WEBSITE = "https://vite-pwa-org.netlify.app/";

useHead(getMeta("Mohit Jain | Install My Portfolio", "install",
    "My website can be installed as a Progressive Web Application (PWA) on this page."
));
</script>

<style scoped>
#install-page {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
.install-body {
    width: 100%;
    height: 100vh;
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

@media (max-width: 600px) {
    .install-box {
        width: 300px;
        height: 200px;
    }
    .install-button {
        width: 80%;
        font-size: 19px;
    }
}
</style>