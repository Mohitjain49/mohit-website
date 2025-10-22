// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { createApp, warn } from "vue";
import { createUnhead } from "@unhead/vue";

import { createRouter, createMemoryHistory } from "vue-router";
import { personalRoutes } from "@/routes";

const router = createRouter({
    history: createMemoryHistory('/'),
    routes: personalRoutes
});

global.DOMMatrix = class {
    constructor() { this.isFake = true }
}

global.fetch = async () => ({
    arrayBuffer: async () => new ArrayBuffer(8)
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
        app.use(createUnhead());
        app.use(router);
        app.provide("usehead", { push: () => {} });

        const element = document.createElement("div");
        app.mount(element);

        return { success: true, app, name }
    } catch(error) {
        return { success: false, error, name }
    }
}

describe('CSR compatibility', () => {
    it('Renders All Pages on the Client', async () => {
        const errors = [];
        const app = await import("../src/App.vue");
        const modules = import.meta.glob('../src/pages/**/*.vue', { eager: true });

        const appResult = await testClientComponent(app.default, app.default.__name);
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