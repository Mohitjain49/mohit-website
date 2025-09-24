<template>
<client-only>
    <vue-particles id="particlests" :options="particlesOptions" @particlesLoaded="(e) => {onParticlesLoaded(e)}" />
</client-only>
</template>

<script setup>
/**
 * @type {import('vue').Ref<import('@tsparticles/engine').Container>}
 * The container representing the background.
 */
const tsparticlesContainer = ref(null);
const visibility = useDocumentVisibility();
const props = defineProps({ particlesOptions: { type: Object, required: true } });

/**
 * This function runs when the particles are fully loaded on the webpage.
 * @param {import('@tsparticles/engine').Container} container The container representing the background.
 */
function onParticlesLoaded(container) {
    tsparticlesContainer.value = container;
}

watch(visibility, () => {
    if(tsparticlesContainer.value == null) { return; }
    if(visibility.value === "hidden") {
        tsparticlesContainer.value.pause();
    } else {
        tsparticlesContainer.value.play();
    }
})
</script>