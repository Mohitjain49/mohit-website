<template>
<Transition :name="((windowWidth > 600) ? 'update-box-transition' : 'update-box-mobile-transition')">
    <div v-if="installStore.showUpdateBox" class="update-box">
        <div class="update-box-desc">
            <FontAwesomeIcon class="update-box-desc-mainIcon"
                :spin-pulse="installStore.swUpdating"
                :icon="(installStore.swUpdating ? 'fa-spinner' : 'fa-triangle-exclamation')"
            />
            <p class="update-box-desc-text">
                <span> You are viewing a website release made </span>
                <span class="version-num" v-html="UPDATE_DATE"></span>
                <span>. Click "Update" to view the latest releases.</span>
            </p>
        </div>

        <div :class="['update-box-buttons', (installStore.swUpdating ? 'updating' : '')]">
            <button class="updateBtn" @click="installStore.resetWebsiteVersion()"> {{ (installStore.swUpdating ? 'Updating...' : 'Update') }} </button>
            <button class="closeBtn" @click="installStore.setUpdateBox(false)"> Close </button>
            <RouterLink to="/copyright/" class="copyrightBtn"> Current Version </RouterLink>
        </div>
    </div>
</Transition>
</template>

<script setup>
import dayjs from 'dayjs';

const { $pwa, $websiteBuild } = useNuxtApp();
const { width: windowWidth } = useMohitWindowSize();
const currentNow = useNow({ scheduler: (fn) => useIntervalFn(fn, 1000) });

const installStore = useInstallStore();
const UPDATE_DATE = ref("10/24/2025");

onMountedAdvanced(() => { calculateDateDifference(); });
watch(currentNow, () => { calculateDateDifference(); });

watch(() => $pwa?.needRefresh, (newValue) => { if(newValue) { installStore.setUpdateNeeded(true); } });
watch(() => $pwa?.offlineReady, (newValue) => { if(newValue) { installStore.setPwaCreated(); } });
watch(() => $pwa?.swActivated, (newValue) => { if(newValue) { installStore.swRegistered = true; } });

/**
 * This function calculates the date difference between the present date and the date of the user's last update.
 * Then, it makes a string for the update box.
 * https://day.js.org/docs/en/display/difference
 */
async function calculateDateDifference() {
    const currentDate = dayjs(currentNow.value);
    const lastUpdateDate = $websiteBuild.date;

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
        UPDATE_DATE.value = (dateDifference.year + " year" + getPlural(dateDifference.year));
    } else if(dateDifference.month > 0) {
        UPDATE_DATE.value = (dateDifference.month + " month" + getPlural(dateDifference.month));
    } else if(dateDifference.week > 0) {
        UPDATE_DATE.value = (dateDifference.week + " week" + getPlural(dateDifference.week));
    } else if(dateDifference.day > 0) {
        UPDATE_DATE.value = (dateDifference.day + " day" + getPlural(dateDifference.day));
    } else if(dateDifference.hour > 0) {
        UPDATE_DATE.value = (dateDifference.hour + " hour" + getPlural(dateDifference.hour));
    } else if(dateDifference.minute > 0) {
        UPDATE_DATE.value = (dateDifference.minute + " minute" + getPlural(dateDifference.minute));
    } else {
        UPDATE_DATE.value = "a moment ago";
    }
}

/** This function returns a "pluralized" date unit if it has a quantity over 1. */
function getPlural(num = 1) { return (((num > 1) ? "s" : "") + " ago"); }
</script>

<style scoped lang="scss">
.update-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: black;
    border: 2px solid var(--lightning-yellow);
    color: var(--lightning-yellow);
    border-radius: 10px;
    height: 80px;
    width: 300px;
    overflow: hidden;
    z-index: 1100;
    font-size: 24px;
    box-shadow: 0px 0px 10px black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
}

.update-box-desc {
    width: 95%;
    height: fit-content;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: row;
}
.update-box-desc-mainIcon {
    width: 22px;
    height: 22px;
}

.update-box-buttons {
    width: 90%;
    height: fit-content;
    margin: 0px auto;
    gap: 15px;
    display: flex;
    justify-content: center;
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
    margin-left: 7px;
    font-size: 11px;
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

.update-box-transition-enter-active, .update-box-transition-leave-active {
    transition: transform 0.75s, opacity 0.75s;
}
.update-box-transition-enter-from, .update-box-transition-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.update-box-transition-enter-to, .update-box-transition-leave-from {
    opacity: 1;
    transform: translateX(0px);
}

.update-box-mobile-transition-enter-active, .update-box-mobile-transition-leave-active {
    transition: transform 0.75s, opacity 0.75s;
}
.update-box-mobile-transition-enter-from, .update-box-mobile-transition-leave-to {
    opacity: 0;
    transform: translateY(100%);
}
.update-box-mobile-transition-enter-to, .update-box-mobile-transition-leave-from {
    opacity: 1;
    transform: translateY(0px);
}

@include dynamic-less-equal-width-rule(600) {
    .update-box { right: calc(50% - 152px) !important; }
}
</style>