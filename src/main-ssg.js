import "@fontsource/lexend";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import '~build/console';

import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";

import VueParticles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

import App from "./App.vue";
import { personalRoutes } from "./routes";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);
const USE_LEGACY_PDFJS_WORKER = false; // If necessary, this can be enabled to let the app use a legacy version of Pdf.js

export const createApp = ViteSSG(App, { routes: personalRoutes },
    ({ app }) => {
        app.use(createPinia());
        if(!import.meta.env.SSR) {
            if(USE_LEGACY_PDFJS_WORKER) {
                import("pdfjs-dist").then((PDFJS) => {
                    PDFJS.GlobalWorkerOptions.workerSrc = new URL(
                        "pdfjs-dist/legacy/build/pdf.worker.mjs",
                        import.meta.url
                    ).toString();
                });
            }

            if(navigator.getGamepads()) { import("./joypad-events.js"); }
            app.use(VueParticles, { init: async engine => {
                await loadSlim(engine);
                await loadFireworksPreset(engine);
            }});
        }
    }
)