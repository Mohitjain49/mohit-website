import VueParticles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueParticles, { init: async engine => {
        await loadSlim(engine);
        await loadFireworksPreset(engine);
    }});
});