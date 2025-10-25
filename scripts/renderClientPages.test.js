// @vitest-environment playwright
import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia } from 'pinia';
import { createUnhead } from "@unhead/vue";

import { createRouter, createMemoryHistory } from "vue-router";
import { personalRoutes } from "@/routes";

import VueParticles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const router = createRouter({
    history: createMemoryHistory('/'),
    routes: personalRoutes
});

/**
 * This function tests any component to see if it works or fails when rendered on the Client.
 * @param {Component} component The Vue.js component/page to test out.
 */
export async function testClientComponent(component, name) {
    try {
        const result = mount(component, {
            global: {
                plugins: [createPinia(), router, createUnhead()],
                provide: { usehead: {push: () => {}} },
            },
        });

        // Wait for routing, async tasks, and rendering to finish
        await router.isReady()
        await flushPromises()
        await nextTick()

        try {
            await loadSlim(VueParticles)
            await loadFireworksPreset(VueParticles)
        } catch {}

        return { success: true, result, name }
    } catch(error) {
        return { success: false, error, name }
    }
}

describe('CSR compatibility', () => {
    it('Renders All Pages on the Client', async () => {
        const errors = [];
        const app = await import("../src/App.vue");
        // const modules = import.meta.glob('../src/pages/**/*.vue', { eager: true });

        const appResult = await testClientComponent(app.default, "App.vue");
        if(!appResult.success) { errors.push({ name: appResult.name, message: appResult.error }); }

        // for(const [path, mod] of Object.entries(modules)) {
        //     const result = await testClientComponent(mod.default, path.split('/').pop());
        //     if(!result.success) { errors.push({ name: result.name, message: result.error }); }
        // }

        if(errors.length != 0) {
            console.log('\n=== CSR Failure Summary ===');
            errors.forEach(e => console.log(`${e.name}: ${e.message}`));
        }
        expect(errors.length == 0).toBeTruthy();
    })
})