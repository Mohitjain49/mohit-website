import VueParticles from "@tsparticles/vue3";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueParticles, { init: async(engine) => {
        const { loadSlim } = await import('@tsparticles/slim');
        await loadSlim(engine);
    }});
});