// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { createApp } from "vue";

import { createRouter, createMemoryHistory } from "vue-router";
import { personalRoutes } from "@/routes";

const router = createRouter({
    history: createMemoryHistory('/'),
    routes: personalRoutes
});

/**
 * This function tests any component to see if it works or fails when rendered on the Client.
 * @param {Component} component The Vue.js component/page to test out.
 * @param {String} name The name of the Vue.js component.
 */
export async function testClientComponent(component, name) {
    try {
        const app = createApp(component);
        app.config.warnHandler = () => {}
        app.config.errorHandler = () => {}
        
        app.use(createPinia());
        app.use(router);

        const element = document.createElement("div");
        app.mount(element)

        return { success: true, app, name }
    } catch(error) {
        return { success: false, error, name }
    }
}

describe('Component Render compatibility', () => {
    it('Renders All Components', async () => {
        const errors = [];
        const modules = import.meta.glob('../src/components/**/*.vue', { eager: true });

        for(const [path, mod] of Object.entries(modules)) {
            const result = await testClientComponent(mod.default, path.split('/').pop());
            if(!result.success) { errors.push({ name: result.name, message: result.error }); }
        }

        if(errors.length != 0) {
            console.log('\n=== Component Rendering Failure Summary ===');
            errors.forEach(e => console.log(`${e.name}: ${e.message}`));
        }
        expect(errors.length == 0).toBeTruthy();
    })
})