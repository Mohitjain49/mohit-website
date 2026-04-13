<template>
<div v-if="installStore.showUpdateBox" class="update-box animate__animated animate__fadeInRight">
    <div class="update-box-desc">
        <FontAwesomeIcon :icon="(buttonClicked ? 'fa-spinner' : 'fa-triangle-exclamation')" :spin-pulse="buttonClicked" />
        <p class="update-box-desc-text">
            <span v-html="UPDATE_WIDGET_TITLE"></span>
            <span class="version-num" v-html="UPDATE_DATE"></span>.
        </p>
    </div>

    <div :class="['update-box-buttons', (buttonClicked ? 'updating' : '')]">
        <button class="updateBtn" @click="updateWebsite()"> {{ (buttonClicked ? 'Updating...' : 'Update') }} </button>
        <button class="closeBtn" @click="installStore.setUpdateBox(false)"> Close </button>
        <RouterLink to="/copyright/" class="copyrightBtn"> Current Version </RouterLink>
    </div>
</div>
</template>

<script setup>
import dayjs from 'dayjs';
import now from '~build/time';

const { $pwa } = useNuxtApp();
const installStore = useInstallStore();
const buttonClicked = ref(false);

const UPDATE_WIDGET_TITLE = ("My website has a new update! Your current website version was from ");
const UPDATE_DATE = ref("10/24/2025");

onMounted(() => { nextTick(() => { calculateDateDifference(); }); });
watch(() => $pwa?.needRefresh, (newValue) => { if(newValue) { installStore.setUpdateBox(true); } });
watch(() => $pwa?.offlineReady, (newValue) => { if(newValue) { installStore.setPwaCreated(); } });
watch(() => $pwa?.swActivated, (newValue) => { if(newValue) { installStore.swRegistered = true; } });

/**
 * This button triggers a reload that updates the website to its latest version.
 */
async function updateWebsite() {
    if(buttonClicked.value) { return; }
    buttonClicked.value = true;
    await $pwa?.updateServiceWorker(true);
}

/**
 * This function calculates the date difference between the present date and the date of the user's last update.
 * Then, it makes a string for the update box.
 * https://day.js.org/docs/en/display/difference
 */
function calculateDateDifference() {
    const currentDate = dayjs(new Date());
    const lastUpdateDate = dayjs(now);

    const dateDifference = {
        year: currentDate.diff(lastUpdateDate, "y"),
        month: currentDate.diff(lastUpdateDate, "M"),
        week: currentDate.diff(lastUpdateDate, "w"),
        day: currentDate.diff(lastUpdateDate, "d"),
        hour: currentDate.diff(lastUpdateDate, "h"),
        minute: currentDate.diff(lastUpdateDate, "m"),
    }
    // console.log(dateDifference);

    if(dateDifference.year > 0) {
        UPDATE_DATE.value = (dateDifference.year + " year" + ((dateDifference.year > 1) ? "s" : "") + " ago");
    } else if(dateDifference.month > 0) {
        UPDATE_DATE.value = (dateDifference.month + " month" + ((dateDifference.month > 1) ? "s" : "") + " ago");
    } else if(dateDifference.week > 0) {
        UPDATE_DATE.value = (dateDifference.week + " week" + ((dateDifference.week > 1) ? "s" : "") + " ago");
    } else if(dateDifference.day > 0) {
        UPDATE_DATE.value = (dateDifference.day + " day" + ((dateDifference.day > 1) ? "s" : "") + " ago");
    } else if(dateDifference.hour > 0) {
        UPDATE_DATE.value = (dateDifference.hour + " hour" + ((dateDifference.hour > 1) ? "s" : "") + " ago");
    } else if(dateDifference.minute > 0) {
        UPDATE_DATE.value = (dateDifference.minute + " minute" + ((dateDifference.minute > 1) ? "s" : "") + " ago");
    } else {
        UPDATE_DATE.value = "a moment ago";
    }
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
.update-box-buttons.updating {
    width: 95%;
    gap: 12px;
    justify-content: center;
}

.update-box-desc-text {
    width: 100%;
    margin-left: 5px;
    font-size: 13px;
    font-family: 'Roboto', sans-serif;
    color: inherit;
}
.update-box-desc-text > span.version-num {
    text-decoration: underline;
    color: var(--vibrant-flame);
    font-weight: bold;
}

.update-box button, .update-box a {
    margin-top: 3px;
    font-size: 14px;
    font-family: 'Monserrat', sans-serif;
    border: 1px solid;
    padding: 4px 7px;
    background-color: var(--dark-background);
    border-radius: 5px;
    transition: var(--default-transition);
}
.update-box button:hover, .update-box a:hover {
    box-shadow: 0px 0px 12px 1px;
}

.update-box button.updateBtn {
    color: var(--globe-green-opaque);
}
.update-box button.closeBtn {
    color: red;
}
.update-box a.copyrightBtn {
    color: var(--blue-two);
    text-wrap: nowrap;
}
</style>