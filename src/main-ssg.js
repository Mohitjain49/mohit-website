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
library.add(fas, fab); // Adds ALL the solid and brand font awesome icons.

export const createApp = ViteSSG(App, { routes: personalRoutes },
    ({ app }) => {
        app.use(createPinia());
        if(import.meta.env.SSR) { return; }
            
        // Uncomment this to use a legacy PDF.js worker.
        // Note: this increases the build size by around 2MB.
        //
        // import("pdfjs-dist").then((PDFJS) => {
        //     PDFJS.GlobalWorkerOptions.workerSrc = new URL(
        //         "pdfjs-dist/legacy/build/pdf.worker.mjs",
        //         import.meta.url
        //     ).toString();
        // });

        if(navigator.getGamepads()) { import("./gamepad-events.js"); }
        app.use(VueParticles, { init: async engine => {
            await loadSlim(engine);
            await loadFireworksPreset(engine);
        }});
    }
)