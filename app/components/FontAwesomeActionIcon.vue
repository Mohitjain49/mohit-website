<template>
<img v-if="useBrowserPrintIcon" :src="standard_print_icon" draggable="false" />
<FontAwesomeIcon v-else :class="classes" :icon="statusIcon" :spin-pulse="(status == 1)" :style="{ color: (status == 5 ? 'red' : '') }" />
</template>

<script setup>
import standard_print_icon from "~/assets/Standard_Print_Icon.svg";

const props = defineProps({
    status: { type: Number, default: 0 },
    baseIcon: { type: String, default: "fa-circle-question" },
    fallbackIcon: { type: String, default: "fa-circle-question" },
    browserPrint: { type: Boolean, default: false },
    classes: { type: Array, default: [''] }
});

const { status, baseIcon, fallbackIcon, browserPrint, classes } = toRefs(props);
const STATUS_ICONS = ["fa-circle-question", "fa-spinner", "fa-check", "fa-ban", "fa-hourglass-end", "fa-octagon"];

const statusIcon = computed(() => { return (((status.value == 0) ? baseIcon.value : STATUS_ICONS[status.value]) ?? fallbackIcon.value); });
const useBrowserPrintIcon = computed(() => { return (browserPrint.value && status.value == 0); });
</script>