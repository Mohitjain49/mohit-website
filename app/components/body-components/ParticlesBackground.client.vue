<template>
<vue-particles id="particlests" :options="particlesOptions" @particlesLoaded="(e) => {onParticlesLoaded(e)}" />
</template>

<script setup>
/**
 * @type {Ref<import('@tsparticles/engine').Container>} The container representing the background.
 * Refer to the tsParticles docs: {@link https://particles.js.org/docs/}
 */
const tsparticlesContainer = ref(null);
const props = defineProps({ particlesOptions: { type: Object, required: true } });

const BATTERY_LOW_THRESHOLD = 0.2 // This is a value between 0 and 1 that represents the user having "low battery".
const visibility = useDocumentVisibility();
const battery = useBattery();
const windowSize = useWindowSize();

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
}

/** This function simple resets the particles in the tsparticles container. */
function resetParticles() {
    if(tsparticlesContainer.value == null) { return; }
    tsparticlesContainer.value.reset(props.particlesOptions);
}

/** This function returns whether the website is using a fireworks background or not. */
function onFireworksBackground() { return (props.particlesOptions.preset === "fireworks"); }

/**
 * This function is responsible for changing the intensity of tsparticles depending on the battery status.
 * It's main purpose is to have the app take up less operating power if the user's laptop battery is low.
 */
function onBatteryStatusChange() {
    if(!battery.isSupported.value || onFireworksBackground()) { return; }
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
    // if(import.meta.env.DEV) { console.log(props.particlesOptions.particles.number) };
}

// This resets the number of particles and destroys the container before unmounting the page.
onBeforeUnmount(() => {
    if(particlesHalved.value) { (props.particlesOptions.particles.number.value *= 2); }
    if(!onFireworksBackground()) { props.particlesOptions.particles.number.density.enable = true; }
    if(tsparticlesContainer.value != null) { tsparticlesContainer.value.destroy(true); }
});

// This pauses the animations when the website is not visible on the visitor's device.
watch(webpageHidden, (newValue) => {
    if(tsparticlesContainer.value == null) { return; }
    if(newValue) {
        tsparticlesContainer.value.pause();
    } else {
        tsparticlesContainer.value.play();
    }
});

// This disables the "density" property of the TS Particles Background when the viewport size gets too large.
// If not disabled, the particles lags the user's device.
watch(disableParticleDensity, (newValue) => {
    if(onFireworksBackground()) { return; }
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