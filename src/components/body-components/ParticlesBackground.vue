<template>
<vue-particles id="particlests" :options="particlesOptions" @particlesLoaded="(e) => {onParticlesLoaded(e)}" />
<Transition name="batteryLow-transition" appear>
    <div v-if="batteryLow && showLowBattery" class="batteryLow-box" :style="batteryLowStyle">
        <div class="batteryLow-box-desc">
            <font-awesome-icon icon="fa-battery-quarter" />
            <span> {{ "Battery Below " + (BATTERY_LOW_THRESHOLD * 100) +"% and Not Charging. Reducing Particles..."}} </span>
        </div>

        <button @click="showLowBattery = false" class="batteryLow-box-closeBtn" title="Close Popup">
            <FontAwesomeIcon icon="fa-xmark" />
        </button>
    </div>
</Transition>
</template>

<script setup>
// Refer to the tsParticles docs: https://particles.js.org/docs/

/** @type {Ref<import('@tsparticles/engine').Container>} The container representing the background. */
const tsparticlesContainer = ref(null);
const props = defineProps({ particlesOptions: { type: Object, required: true } });

const BATTERY_LOW_THRESHOLD = 0.3 // This is a value between 0 and 1 that represents the user having "low battery".
var popupTimeout = null;

const visibility = useDocumentVisibility();
const battery = useBattery();
const installStore = useInstallStore();

const batteryLow = ref(false);
const particlesHalved = ref(false);
const showLowBattery = ref(true);

const batteryLowStyle = computed(() => {
    return { bottom: (installStore.showUpdateBox ? "130px" : "20px") }
})

/**
 * This function runs when the particles are fully loaded on the webpage.
 * @param {import('@tsparticles/engine').Container} container The container representing the background.
 */
function onParticlesLoaded(container) {
    tsparticlesContainer.value = container;
}

/**
 * This function simple resets the particles in the tsparticles container.
 */
function resetParticles() {
    if(tsparticlesContainer.value != null) { tsparticlesContainer.value.reset(props.particlesOptions); }
}

/**
 * This function is responsible for changing the intensity of tsparticles depending on the battery status.
 * It's main purpose is to have the app take up less operating power if the user's laptop battery is low.
 */
function onBatteryStatusChange() {
    if(!battery.isSupported.value || (props.particlesOptions === FEATURES_BACKGROUND.value)) { return; }
    const prevStatus = batteryLow.value;
    batteryLow.value = (battery.level.value <= BATTERY_LOW_THRESHOLD && !battery.charging.value);

    if(batteryLow.value && !prevStatus) {
        props.particlesOptions.particles.number.value *= 0.5;
        particlesHalved.value = true;
        showLowBattery.value = true;

        resetParticles();
        if(popupTimeout != null) { clearTimeout(popupTimeout); }

        popupTimeout = setTimeout(() => {
            showLowBattery.value = false;
            popupTimeout = null;
        }, 10000);
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
    if(tsparticlesContainer.value != null) { tsparticlesContainer.value.destroy(true); }
});

// This pauses the animations when the website is not visible on the visitor's device.
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
watch(() => props.particlesOptions, () => { resetParticles(); });
</script>

<style scoped>
.batteryLow-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--dark-background);
    border: 2px solid var(--vibrant-flame);
    color: var(--vibrant-flame);
    border-radius: 10px;
    height: 60px;
    width: 300px;
    overflow: hidden;
    z-index: 1100;
    font-size: 24px;
    box-shadow: 0px 0px 10px black;
    transition: opacity 0.5s, right 0.5s, bottom 0.2s;
}

.batteryLow-box-desc {
    width: 95%;
    height: 100%;
    margin: 0px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 5px;
}
.batteryLow-box-desc span {
    font-size: 14px;
    width: 85%;
    font-family: "Montserrat", sans-serif;
}

.batteryLow-box-closeBtn {
    padding: 4px;
    color: red;
    position: absolute;
    top: 5px;
    right: 5px;
    border: 2px solid;
    border-radius: 50%;
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
}
.batteryLow-box-closeBtn svg {
    width: 10px;
    height: 10px;
}

.batteryLow-transition-enter-active, .batteryLow-transition-leave-active {
    transition: opacity 0.5s, right 1s;
}
.batteryLow-transition-enter-from, .batteryLow-transition-leave-to {
    opacity: 0;
    right: -320px;
}   
.batteryLow-transition-enter-to, .batteryLow-transition-leave-from {
    opacity: 1;
    right: 20px;
}
</style>