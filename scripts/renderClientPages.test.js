// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { createPinia } from 'pinia';
import { createHead } from "@unhead/vue/client";

import { createRouter, createMemoryHistory } from "vue-router";
import { personalRoutes } from "@/routes";

const router = createRouter({
    history: createMemoryHistory('/'),
    routes: personalRoutes
});

vi.stubGlobal("FontAwesomeIcon", () => { })
vi.stubGlobal("ClientOnly", () => { })
vi.stubGlobal("VueParticles", () => { })

/**
 * This function tests any component to see if it works or fails when rendered on the Client.
 * @param {Component} component The Vue.js component/page to test out.
 */
export async function testClientComponent(component, name) {
    try {
        // const result = mount(component, {
        //     global: {
        //         plugins: [createPinia(), router, createHead()],
        //         stubs: { FontAwesomeIcon: true, ClientOnly: true, VueParticles: true }
        //     },
        // });

        const app = createApp(component);
        app.use(router);

        app.use(createPinia());
        app.use(createHead());
        app.mount(document.createElement('div'));

        // Wait for routing, async tasks, and rendering to finish
        await router.isReady();
        await nextTick();

        return { success: true, result: app, name }
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