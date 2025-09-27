<template>
<client-only>
    <vue-particles id="particlests" :options="particlesOptions" @particlesLoaded="(e) => {onParticlesLoaded(e)}" />
</client-only>
</template>

<script setup>
// Refer to the tsParticles docs: https://particles.js.org/docs/

/**
 * @type {Ref<import('@tsparticles/engine').Container>}
 * The container representing the background.
 */
const tsparticlesContainer = ref(null);
const props = defineProps({ particlesOptions: { type: Object, required: true } });

const visibility = useDocumentVisibility();
const battery = useBattery();
const batteryLow = ref(false);

/**
 * This function runs when the particles are fully loaded on the webpage.
 * @param {import('@tsparticles/engine').Container} container The container representing the background.
 */
function onParticlesLoaded(container) {
    tsparticlesContainer.value = container;
}

/**
 * This function is responsible for changing the intensity of tsparticles depending on the battery status.
 * It's main purpose is to have the app take up less operating power if the user's laptop battery is low.
 */
function onBatteryStatusChange() {
    if(!battery.isSupported.value || (props.particlesOptions === FEATURES_BACKGROUND.value)) { return; }
    const prevStatus = batteryLow.value;
    batteryLow.value = (battery.level.value <= 0.3 && !battery.charging.value);

    if(batteryLow.value && !prevStatus) {
        props.particlesOptions.particles.number.value = props.particlesOptions.particles.number.value * 0.5;
        if(tsparticlesContainer.value != null) { tsparticlesContainer.value.reset(props.particlesOptions); }
    } else if(!batteryLow.value && prevStatus) {
        props.particlesOptions.particles.number.value = props.particlesOptions.particles.number.value * 2;
        if(tsparticlesContainer.value != null) { tsparticlesContainer.value.reset(props.particlesOptions); }
    }
    // if(import.meta.env.DEV) { console.log(props.particlesOptions.particles.number) };
}

watch(visibility, () => {
    if(tsparticlesContainer.value == null) { return; }
    if(visibility.value === "hidden") {
        tsparticlesContainer.value.pause();
    } else {
        tsparticlesContainer.value.play();
    }
});

watch(battery.level, () => { onBatteryStatusChange(); });
watch(battery.isSupported, () => { onBatteryStatusChange(); });
watch(battery.charging, () => { onBatteryStatusChange(); });
watch(tsparticlesContainer, () => { onBatteryStatusChange(); });
</script>