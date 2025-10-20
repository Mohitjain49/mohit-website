<template>
<div v-if="showUpdateBox" class="update-box animate__animated animate__fadeInRight">
    <div class="update-box-desc">
        <FontAwesomeIcon :icon="(buttonClicked ? 'fa-spinner' : 'fa-triangle-exclamation')" :spin-pulse="buttonClicked" />
        <p v-html="UPDATE_WIDGET_TITLE"></p>
    </div>

    <div class="update-box-buttons">
        <button class="updateBtn" @click="updateWebsite()"> {{ (buttonClicked ? 'Updating...' : 'Update') }} </button>
        <button class="closeBtn" @click="showUpdateBox = false"> Close </button>
    </div>
</div>
</template>

<script setup>
import { registerSW } from 'virtual:pwa-register';
import { version } from "~build/package";
const UPDATE_WIDGET_TITLE = ("My website has a new update!<br>You are currently on Version " + version + ".");

const installStore = useInstallStore();
const showUpdateBox = ref(false);
const buttonClicked = ref(false);

const updateSW = registerSW({
    onNeedRefresh() { showUpdateBox.value = true; },
    onOfflineReady() { installStore.setPwaCreated(); }
});

/**
 * This button triggers a reload that updates the website to its latest version.
 */
function updateWebsite() {
    if(buttonClicked.value) { return; }
    updateSW();
    buttonClicked.value = true;
}
</script>

<style scoped>
.update-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: black;
    border: 2px solid var(--lightning-yellow);
    color: var(--lightning-yellow);
    border-radius: 10px;
    height: 90px;
    width: 300px;
    overflow: hidden;
    z-index: 1100;
    font-size: 24px;
    box-shadow: 0px 0px 10px black;
}

.update-box-desc {
    width: 95%;
    height: 55%;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.update-box-buttons {
    width: 90%;
    height: 45%;
    margin: 0px auto;
    gap: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
}

.update-box p {
    width: 90%;
    margin: 5px;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    color: inherit;
}
.update-box button {
    margin-top: 3px;
    font-size: 14px;
    font-family: 'Monserrat', sans-serif;
    border: 1px solid;
    padding: 4px 7px;
    background-color: var(--dark-background);
    border-radius: 5px;
    transition: var(--default-transition);
}
.update-box button:hover {
    box-shadow: 0px 0px 12px 1px;
}

.update-box button.updateBtn {
    color: var(--globe-green-opaque);
}
.update-box button.closeBtn {
    color: red;
}
</style>