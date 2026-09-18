<template>
<vue-particles v-if="(particlesOptionsCopy != null)"
    :id="BACKGROUND_PARTICLES_ID"
    :options="particlesOptionsCopy"
    @particlesLoaded="(e) => { onParticlesLoaded(e); }"
/>
</template>

<script setup>
// Refer to the tsParticles docs: https://particles.js.org/docs/
import { has } from "lodash-es";

const BATTERY_LOW_THRESHOLD = 0.2;
const DISABLE_DENSITY_EDGE_LENGTH = 1750;
const BACKGROUND_PARTICLES_ID = "mohit-website-particlests";
const BACKGROUND_COLOR_PROPERTY = "--particles-bg-color";

/** @type {import('vue').ShallowRef<import('@tsparticles/engine').Container>} The container representing the background. */
const tsparticlesContainer = shallowRef(null);

/** @type {import('vue').ShallowRef<import('@tsparticles/engine').IOptions>} A copy of the particles background property. */
const particlesOptionsCopy = shallowRef(null);
const props = defineProps({ particlesOptions: { type: Object, required: true } });

particlesOptionsCopy.value = props.particlesOptions;
var resizeAbortController = new AbortController();
var resizeTimeout = null;

const styleStore = useStyleStore();
const visibility = useDocumentVisibility();
const battery = useBattery();
const fps = useFps();

const particlesLoadedOnce = ref(false);
const particlesLoaded = ref(false);
const batteryLow = ref(false);
const webpageHidden = computed(() => { return (visibility.value === "hidden"); });

/**
 * This function runs when the particles are fully loaded on the webpage.
 * @param {import('@tsparticles/engine').Container} container The container representing the background.
 */
async function onParticlesLoaded(container) {
    tsparticlesContainer.value = container;
    setParticlesBackgroundColor();
    particlesLoaded.value = true;

    if(!particlesLoadedOnce.value) {
        await styleStore.waitForFirstViewportCalculation();
        await sleep(500);
        particlesLoadedOnce.value = true;
    }
    
    if(resizeAbortController != null) { resizeAbortController.abort(); }
    resizeAbortController = new AbortController();
    window.addEventListener("animation-resize", () => { resetParticlesOnResize(); }, { signal: resizeAbortController.signal });
}

/** This function simple resets the particles in the tsparticles container. */
async function resetParticles() {
    try {
        await waitForParticles();
        particlesLoaded.value = false;
        await tsparticlesContainer.value.reset(particlesOptionsCopy.value);
        particlesLoaded.value = true;
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/** This function triggers a particle reset on a viewport resize. */
function resetParticlesOnResize() {
    if(resizeTimeout != null) { clearTimeout(resizeTimeout); }
    resizeTimeout = setTimeout(async() => {
        await setParticlesDensity(false);
        await resetParticles();
        resizeTimeout = null;
    }, 500);
}

/** This function can have a function wait till the particles are loaded before executing its capabilities. */
async function waitForParticles() {
    await new Promise(async(resolve, reject) => {
        var msPassed = 0;
        while(msPassed < 10000 && !particlesLoaded.value) {
            await sleep(50);
            msPassed += 50;
        }

        if(particlesLoaded.value) {
            resolve("Wait Time: " + msPassed + " milliseconds");
        } else {
            reject("Timeout Error");
        }
    });
}

/**
 * This function runs when all particles options need to be set.
 * @param {Boolean} mounting If true, this function is used when initially mounting the component.
 */
async function setAllParticlesSettings(mounting = true) {
    if(!mounting) {
        particlesOptionsCopy.value = props.particlesOptions;
        batteryLow.value = false;

        visibilityWatcher.pause();
        batteryLevelWatcher.pause();
        batterySupportedWatcher.pause();
        batteryChargingWatcher.pause();
    }

    setParticlesBackgroundColor();
    await waitForParticles();

    const batteryReset = await onBatteryStatusChange(false);
    const densityReset = await setParticlesDensity(false);
    // const fpsReset = await setFpsLimit(false);

    batteryLevelWatcher.resume();
    batterySupportedWatcher.resume();
    batteryChargingWatcher.resume();

    if(batteryReset || densityReset || !mounting) { await resetParticles(); }
    onWebpageVisibilityChange();
    visibilityWatcher.resume();
}

/** This returns whether the density property for a particles background exists. */
function checkDensityExists() { return has(particlesOptionsCopy.value, 'particles.number.density.enable'); }

/** This returns whether the "fps limit" property for a particles background exists. */
function checkFpsLimitExists() { return has(particlesOptionsCopy.value, 'fpsLimit'); }

/** This returns whether the number's "value" property for a particles background exists. */
function checkParticlesNumberExists() { return has(particlesOptionsCopy.value, 'particles.number.value'); }

/** This returns whether the number's "value" property for a particles background exists. */
function checkParticlesBgColorExists() { return has(particlesOptionsCopy.value, 'background.color'); }

/**
 * This function is responsible for changing the intensity of tsparticles depending on the battery status.
 * It's main purpose is to have the app take up less operating power if the user's laptop battery is low.
 * @param {Boolean} reset If true, this function resets the particles after the change.
 * @returns A boolean indicating whether the particles need to be reset.
 */
async function onBatteryStatusChange(reset = true) {
    if(!battery.isSupported.value || !checkParticlesNumberExists()) { return false; }
    const prevStatus = batteryLow.value;
    batteryLow.value = (battery.level.value <= BATTERY_LOW_THRESHOLD && !battery.charging.value);

    if(batteryLow.value && !prevStatus) {
        particlesOptionsCopy.value.particles.number.value *= 0.5;
        if(reset) { await resetParticles(); }
        return true;
    } else if(!batteryLow.value && prevStatus) {
        particlesOptionsCopy.value.particles.number.value *= 2;
        if(reset) { await resetParticles(); }
        return true;
    } else {
        return false;
    }
}

/** This function sets the particles background color. */
function setParticlesBackgroundColor() {
    if(!import.meta.client || !document) { return; }
    const element = document.getElementById(BACKGROUND_PARTICLES_ID);
    if(!element) { return; }

    if(document.documentElement) {
        element.style.setProperty(BACKGROUND_COLOR_PROPERTY, window.getComputedStyle(document.documentElement).backgroundColor);
    } else if(checkParticlesBgColorExists()) {
        element.style.setProperty(BACKGROUND_COLOR_PROPERTY, particlesOptionsCopy.value.background.color);
    }
}

/**
 * This disables the "density" property of the TS Particles Background when the viewport size gets too large.
 * @param {Boolean} reset If true, this function resets the particles after the change.
 * @returns A boolean indicating whether the particles need to be reset.
 */
async function setParticlesDensity(reset = true) {
    if(!checkDensityExists()) { return false; }
    await styleStore.waitForFirstViewportCalculation();

    const oldDensity = particlesOptionsCopy.value.particles.number.density.enable;
    const newDensity = (styleStore.cssViewportHeight < DISABLE_DENSITY_EDGE_LENGTH && styleStore.cssViewportWidth < DISABLE_DENSITY_EDGE_LENGTH);
    particlesOptionsCopy.value.particles.number.density.enable = newDensity;

    const needsReset = (oldDensity != newDensity);
    if(reset && needsReset) { await resetParticles(); }
    return needsReset;
}

/**
 * This sets the FPS Limit for the Particles Background to prevent lag.
 * @param {Boolean} reset If true, this function resets the particles after the change.
 * @returns A boolean indicating whether the particles need to be reset.
 */
async function setFpsLimit(reset = true) {
    if(!checkFpsLimitExists()) { return false; }
    await sleep(1000);

    const oldFpsLimit = particlesOptionsCopy.value.fpsLimit;
    const newFpsLimit = Math.ceil(fps.value / 2);
    particlesOptionsCopy.value.fpsLimit = newFpsLimit;

    const needsReset = (oldFpsLimit != newFpsLimit);
    if(reset && needsReset) { await resetParticles(); }
    return needsReset;
}

/** This function changes whether the particles are paused or playing based on whether the webpage is visible. */
function onWebpageVisibilityChange() {
    waitForParticles().then(() => {
        if(webpageHidden.value) {
            tsparticlesContainer.value.pause();
        } else {
            tsparticlesContainer.value.play();
        }
    }).catch((e) => {
        if(import.meta.dev) { console.error(e); }
    });
}

// This sets certain settings of the particles background when the component is mounted.
onMountedAdvanced(async() => { await setAllParticlesSettings(true); });

// This destroys the particles container before unmounting the component.
onBeforeUnmount(() => {
    if(tsparticlesContainer.value != null) { tsparticlesContainer.value.destroy(true); }
    if(resizeAbortController != null) { resizeAbortController.abort(); }
    resizeAbortController = null;
    sleep(1000).then(() => { particlesOptionsCopy.value = null; });
});

watch(() => props.particlesOptions, () => { setAllParticlesSettings(false); }, { immediate: false });
const visibilityWatcher = watch(webpageHidden, () => { onWebpageVisibilityChange(); }, { immediate: false });

const batteryLevelWatcher = watch(battery.level, () => { onBatteryStatusChange(true); }, { immediate: false });
const batterySupportedWatcher = watch(battery.isSupported, () => { onBatteryStatusChange(true); }, { immediate: false });
const batteryChargingWatcher = watch(battery.charging, () => { onBatteryStatusChange(true); }, { immediate: false });

visibilityWatcher.pause();
batteryLevelWatcher.pause();
batterySupportedWatcher.pause();
batteryChargingWatcher.pause();
</script>

<style lang="scss">
#mohit-website-particlests {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 0px;
    height: 0px;
    z-index: -10;
    --particles-bg-color: var(--webpage-html-bg-color, #000000);
    background-color: var(--particles-bg-color) !important;
}
#mohit-website-particlests canvas {
    background-color: var(--particles-bg-color) !important;
}
</style>