<template>
<button ref="animate-icon-on-hover-button">
    <FontAwesomeIcon :icon="faIcon" :[hoverAnimation]="isHovering" :class="iconClass" />
</button>
</template>

<script setup>
const props = defineProps({
    faIcon: { type: String, default: "fa-question" },
    hoverAnimation: { type: String, default: "jello" },
    iconClass: { type: [String, Array], default: '' }
});

/** @type {AbortController} This is the abort controller that manages stopping the abort controller. */
var eventsAbortController = null;
var checkHoverInterval = null;

const { mouseElement } = storeToRefs(useStyleStore());
const buttonRef = useTemplateRef('animate-icon-on-hover-button');
const isHovering = ref(false);

onAfterMounted(() => {
    if(!Boolean(buttonRef.value) || !('PointerEvent' in window)) { return; }
    setHoverInterval(true);

    eventsAbortController = new AbortController();
    const signal = eventsAbortController.signal;
    
    buttonRef.value.addEventListener("pointerenter", (event) => { onButtonHover(event); }, { signal, passive: true });
    buttonRef.value.addEventListener("pointerleave", (event) => { onButtonHover(event); }, { signal, passive: true });
    signal.addEventListener("abort", () => { setHoverInterval(false); }, { once: true });
});
onBeforeUnmount(() => {
    isHovering.value = false;
    setHoverInterval(false);
    if(eventsAbortController != null) { eventsAbortController.abort(); }
});

/**
 * This function runs when the user either hovers over the button or stops hovering over the button.
 * @param {PointerEvent} event The event to listen to.
 */
function onButtonHover(event) {
    if(!event || event.pointerType !== "mouse") { return; }
    isHovering.value = (event.type === "pointerenter");
}

/**
 * This function sets an interval that uses the recorded mouse element to see if the animation should still continue.
 * @param {Boolean} status The new status of the Hover Interval.
 */
function setHoverInterval(status = false) {
    if(checkHoverInterval != null) { clearInterval(checkHoverInterval); }
    if(status) {
        checkHoverInterval = setInterval(() => {
            const mouseNotOnElement = (!Boolean(buttonRef.value) || !buttonRef.value.contains(mouseElement.value));
            if(mouseNotOnElement) { isHovering.value = false; }
        }, 500);
    } else {
        checkHoverInterval = null;
        isHovering.value = false;
    }
}
</script>