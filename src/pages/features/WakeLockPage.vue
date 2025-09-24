<template>
<ParticlesBackground :particlesOptions="WAKE_LOCK_BACKGROUND" />
<FeaturesReturnWidget />

<main id="wakeLock-page" class="personal-web-body">
    <div class="wakeLock-body">
        <div class="wakeLock-box">
            <button class="wakeLock-button" @click="webData.toggleWakeLock()">
                <font-awesome-icon :icon="webData.wakeLockIcon" />
                <span> {{ webData.wakeLockStatement }} </span>
            </button>
            <a :href="WAKE_LOCK_MDN_DOCS" class="wakeLock-mdn-docs">
                This page uses the Screen Wake Lock Web API to keep the screen on when enabled, 
                preventing the screen from closing naturally.
            </a>
            <p class="wakelock-keybind-msg">
                P.S. You can also access this page with Alt + W
            </p>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
const webData = useWebsiteDataStore();
const WAKE_LOCK_MDN_DOCS = "https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API";

useHead(getMeta("Mohit Jain | Wake Lock", "wakelock",
    "This page uses the Wake Lock Web API to keep the screen on when enabled, " +
    "preventing the screen from closing naturally."
));
</script>

<style scoped>
#wakeLock-page {
    background: rgba(0, 0, 0, 0.25);
    padding-top: 0px;
    min-height: 100%;
}
.wakeLock-body {
    width: 100%;
    height: 100vh;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--vibrant-flame);
}

.wakeLock-box {
    width: 500px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 20px;
    border: 2px solid var(--vibrant-flame);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.wakeLock-mdn-docs {
    width: 80%;
    height: fit-content;
    margin-top: 20px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
}
.wakeLock-mdn-docs:hover {
    text-decoration: underline;
}

.wakeLock-button {
    width: 65%;
    height: 25%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border: 2px dotted var(--vibrant-flame);
    text-align: center;
    color: var(--vibrant-flame);
    font-size: 19px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}
.wakeLock-button svg {
    margin-right: 5px;
}

.wakelock-keybind-msg {
    width: 80%;
    height: fit-content;
    margin-top: 10px;
    text-align: center;
    font-family: 'Lexend', sans-serif;
    font-size: 14px;
    color: var(--lightning-yellow);
}

@media (max-width: 600px) {
    .wakeLock-box {
        width: 300px;
        height: 250px;
    }
    .wakeLock-button {
        width: 80%;
        font-size: 14px;
    }
    .wakelock-keybind-msg {
        font-size: 12px;
    }
}
</style>