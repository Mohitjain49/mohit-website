<template>
<main id="402D" class="personal-web-body" ref="402d-sweg-webpage">
    <img :id="SWEG_IMAGE_ID" :src="sweg_shield" draggable="false" />
</main>
</template>

<script setup>
import sweg_shield from "~/assets/402D_SWEG_Shield.png";
const styleStore = useStyleStore();
const webpageRef = useTemplateRef('402d-sweg-webpage');

const SWEG_IMAGE_ID = "sweg-image";
const ANIMATION_DURATION = 1400;

const animationInterval = useIntervalFn(() => { incrementBackground(); }, 20, { immediate: false });
var webpageAnimationInt = 1;
var animationTimeout = null;

onMounted(() => {
    startAnimation();
    styleStore.setHideOverflowArray(HideOverflow.EXPERIENCE_PAGE, true);
});
onBeforeUnmount(() => {
    stopAnimation();
    styleStore.setHideOverflowArray(HideOverflow.EXPERIENCE_PAGE, false);
});

/** This function starts and resets the animation for this page. */
function startAnimation() {
    if(animationInterval.isActive.value || animationTimeout != null) { stopAnimation(); }
    animationInterval.resume();
    document.getElementById(SWEG_IMAGE_ID)?.classList.add("animate__animated", "animate__zoomInDown");

    animationTimeout = setTimeout(() => {
        animationTimeout = null;
        stopAnimation();
    }, ANIMATION_DURATION);
}

/** This function stops the animation for this page. */
function stopAnimation() {
    animationInterval.pause();
    if(webpageRef.value) { webpageRef.value.style.backgroundImage = ""; }
    if(animationTimeout != null) { clearTimeout(animationTimeout); }

    document.getElementById(SWEG_IMAGE_ID)?.classList.remove("animate__animated", "animate__zoomInDown");
    webpageAnimationInt = 1;
    animationTimeout = null;
}

/** This increments the radiat gradient to slightly change.  */
function incrementBackground() {
    const element = webpageRef.value;
    if(!element || webpageAnimationInt > 70) { return; }

    const thirdPct = String(webpageAnimationInt + 30);
    element.style.backgroundImage = "radial-gradient(circle at center, #cfcfcf 0%, #e2e2e2 20%, #004DA7 " + thirdPct + "%, #004DA7 100%)";
    webpageAnimationInt++;
}

useHead(getMeta("Mohit Jain | My Work In The 402D Software Engineering Group", "402d-sweg", "", "black"));
</script>

<style scoped lang="scss">
.personal-web-body[id="402D"] {
    height: var(--body-height);
    background-image: radial-gradient(circle at center, #cfcfcf 0%, #e2e2e2 20%, #004DA7 100%);
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

#sweg-image {
    width: min(
        400px,
        calc(var(--true-100vh-safe) * 0.66),
        calc(var(--true-100vw-safe) * 0.85)
    );
    height: auto;
    user-select: none;
    --animate-duration: calc(v-bind(ANIMATION_DURATION) * 1ms);
}
</style>