<template>
<img v-if="useBrowserPrintIcon" :src="standard_print_icon" draggable="false" />
<FontAwesomeIcon v-else-if="useTimeoutIcon" :icon="(TIMEOUT_STATUS_ICONS[timeoutIconNum] ?? 'fa-hourglass-end')" :shake="true" />
<FontAwesomeIcon v-else :class="classes" :icon="statusIcon" :spin-pulse="(status == 1)" :style="{ color: (status == 5 ? 'red' : '') }" />
</template>

<script setup>
import standard_print_icon from "~/assets/Standard_Print_Icon.svg";
const STATUS_ICONS = ["fa-circle-question", "fa-spinner", "fa-check", "fa-ban", "fa-hourglass-end", "fa-octagon"];
const TIMEOUT_STATUS_ICONS = ["fa-hourglass-start", "fa-hourglass-half", "fa-hourglass-end"];

const props = defineProps({
    status: { type: Number, default: 0 },
    baseIcon: { type: String, default: "fa-circle-question" },
    fallbackIcon: { type: String, default: "fa-circle-question" },
    browserPrint: { type: Boolean, default: false },
    classes: { type: Array, default: [''] }
});

const { status, baseIcon, fallbackIcon, browserPrint, classes } = toRefs(props);
const timeoutIconNum = ref(0);
const timeoutIconSetter = useIntervalFn(() => { incrementTimeoutIconNum(); }, 333, { immediate: false });

const statusIcon = computed(() => { return (((status.value == 0) ? baseIcon.value : STATUS_ICONS[status.value]) ?? fallbackIcon.value); });
const useBrowserPrintIcon = computed(() => { return (browserPrint.value && status.value == 0); });
const useTimeoutIcon = computed(() => { return (status.value == 4); });

// This sets the Timeout Icon to use when the timeout error status is passed in.
onMounted(() => { manageTimeoutIconInterval(useTimeoutIcon.value); });
watch(useTimeoutIcon, (newValue) => { manageTimeoutIconInterval(newValue); });

/**
 * This function manages the status of the Timeout Icon Interval.
 * @param {Boolean} status The new status for said interval.
 */
function manageTimeoutIconInterval(status = true) {
    if(timeoutIconSetter.isActive.value) { timeoutIconSetter.pause(); }
    if(status) { timeoutIconSetter.resume(); }
    timeoutIconNum.value = 0;
}

/** This function increments the timeout number by one and loops it back to zero once it reaches two. */
function incrementTimeoutIconNum() {
    timeoutIconNum.value = ((timeoutIconNum.value >= 2) ? 0 : timeoutIconNum.value + 1);
}
</script>