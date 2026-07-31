<template>
<vue-particles :id="BACKGROUND_PARTICLES_ID" :options="particlesOptions" @particlesLoaded="(e) => { onParticlesLoaded(e); }" />
</template>

<script setup>
import { has } from "lodash-es";
const BATTERY_LOW_THRESHOLD = 0.2;
const BACKGROUND_PARTICLES_ID = "mohit-website-particlests";
const BACKGROUND_COLOR_PROPERTY = "--particles-bg-color";

/**
 * @type {import('vue').ShallowRef<import('@tsparticles/engine').Container>} The container representing the background.
 * Refer to the tsParticles docs: {@link https://particles.js.org/docs/}
 */
const tsparticlesContainer = shallowRef(null);
const props = defineProps({ particlesOptions: { type: Object, required: true } });

var resizeAbortController = new AbortController();
var resizeTimeout = null;

const visibility = useDocumentVisibility();
const battery = useBattery();
const windowSize = useMohitWindowSize();

const particlesLoaded = ref(false);
const particlesResetting = ref(false);
const batteryLow = ref(false);
const particlesHalved = ref(false);

const webpageHidden = computed(() => { return (visibility.value === "hidden"); });
const disableParticleDensity = computed(() => { return (windowSize.height.value >= 2000 || windowSize.width.value >= 2000); });

/**
 * This function runs when the particles are fully loaded on the webpage.
 * @param {import('@tsparticles/engine').Container} container The container representing the background.
 */
function onParticlesLoaded(container) {
    tsparticlesContainer.value = container;
    setParticlesBackgroundColor();

    particlesLoaded.value = true;
    particlesResetting.value = false;

    if(resizeAbortController != null) { resizeAbortController.abort(); }
    resizeAbortController = new AbortController();
    window.addEventListener("animation-resize", () => { resetParticlesOnResize(); }, { signal: resizeAbortController.signal });
}

/** This function simple resets the particles in the tsparticles container. */
async function resetParticles() {
    if(particlesResetting.value) { return; }
    particlesResetting.value = true;

    try {
        await waitForParticles();
        particlesLoaded.value = false;

        await tsparticlesContainer.value.reset(props.particlesOptions);
        particlesResetting.value = false;
        particlesLoaded.value = true;
    } catch(e) {
        if(import.meta.dev) { console.error(e); }
    }
}

/** This function triggers a particle reset on a viewport resize. */
function resetParticlesOnResize() {
    if(resizeTimeout != null) { clearTimeout(resizeTimeout); }
    resizeTimeout = setTimeout(() => { resetParticles().then(() => { resizeTimeout = null; }); }, 500);
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

/** This returns whether the density property for a particles background exists. */
function checkDensityExists() { return has(props.particlesOptions, 'particles.number.density.enable'); }

/** This returns whether the number's "value" property for a particles background exists. */
function checkParticlesNumberExists() { return has(props.particlesOptions, 'particles.number.value'); }

/** This returns whether the number's "value" property for a particles background exists. */
function checkParticlesBgColorExists() { return has(props.particlesOptions, 'background.color'); }

/**
 * This function is responsible for changing the intensity of tsparticles depending on the battery status.
 * It's main purpose is to have the app take up less operating power if the user's laptop battery is low.
 */
function onBatteryStatusChange() {
    if(!battery.isSupported.value || !checkParticlesNumberExists()) { return; }
    const prevStatus = batteryLow.value;
    batteryLow.value = (battery.level.value <= BATTERY_LOW_THRESHOLD && !battery.charging.value);

    if(batteryLow.value && !prevStatus) {
        props.particlesOptions.particles.number.value *= 0.5;
        particlesHalved.value = true;
        resetParticles();
    } else if(!batteryLow.value && prevStatus) {
        props.particlesOptions.particles.number.value *= 2;
        particlesHalved.value = false;
        resetParticles();
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
        element.style.setProperty(BACKGROUND_COLOR_PROPERTY, props.particlesOptions.background.color);
    }
}

// This sets the Particles Background Color when the component mounts.
onMountedAdvanced(() => { setParticlesBackgroundColor(); });

// This resets the number of particles and destroys the container before unmounting the page.
onBeforeUnmount(() => {
    if(particlesHalved.value && checkParticlesNumberExists()) { (props.particlesOptions.particles.number.value *= 2); }
    if(checkDensityExists()) { props.particlesOptions.particles.number.density.enable = true; }
    if(tsparticlesContainer.value != null) { tsparticlesContainer.value.destroy(true); }
});

// This pauses the animations when the website is not visible on the visitor's device.
watch(webpageHidden, (newValue) => {
    waitForParticles().then(() => {
        if(newValue) {
            tsparticlesContainer.value.pause();
        } else {
            tsparticlesContainer.value.play();
        }
    }).catch((e) => {
        if(import.meta.dev) { console.error(e); }
    });
});

// This disables the "density" property of the TS Particles Background when the viewport size gets too large.
// If not disabled, the particles lags the user's device.
watch(disableParticleDensity, (newValue) => {
    if(!checkDensityExists()) { return; }
    if(newValue) {
        props.particlesOptions.particles.number.density.enable = false;
        resetParticles();
    } else {
        props.particlesOptions.particles.number.density.enable = true;
        resetParticles();
    }
});

watch(battery.level, () => { onBatteryStatusChange(); });
watch(battery.isSupported, () => { onBatteryStatusChange(); });
watch(battery.charging, () => { onBatteryStatusChange(); });

watch(tsparticlesContainer, () => { onBatteryStatusChange(); });
watch(() => props.particlesOptions, () => { resetParticles(); });
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
}
#mohit-website-particlests canvas {
    background-color: var(--particles-bg-color) !important;
}
</style>