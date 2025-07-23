<template>
<client-only>
    <vue-particles id="particlests" :options="WAKE_LOCK_BACKGROUND"></vue-particles>
</client-only>

<main id="wakeLock-page" class="personal-web-body">
    <div class="wakeLock-body">
        <div class="wakeLock-box">
            <button class="wakeLock-button" @click="webData.toggleWakeLock()">
                <client-only> <font-awesome-icon :icon="webData.wakeLockIcon" /> </client-only>
                <span> {{ webData.wakeLockStatement }} </span>
            </button>
            <a :href="WAKE_LOCK_MDN_DOCS" class="wakeLock-mdn-docs">
                This page uses the Wake Lock Web API to keep the screen on when enabled, 
                preventing the screen from closing naturally.
            </a>
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
    height: 28%;
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

@media (max-width: 600px) {
    .wakeLock-box {
        width: 300px;
        height: 200px;
    }
    .wakeLock-button {
        width: 80%;
        font-size: 14px;
    }
}
</style>