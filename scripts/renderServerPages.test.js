// @vitest-environment node
import { describe, it, expect } from "vitest";
import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import { createUnhead } from "@unhead/vue";

import { createRouter, createMemoryHistory } from "vue-router";
import { personalRoutes } from "@/routes";

const router = createRouter({
    history: createMemoryHistory('/'),
    routes: personalRoutes
});

/**
 * This function tests any component to see if it works or fails when rendered on the Server.
 * @param {Component} component The Vue.js component/page to test out.
 * @param {String} name The name of the Vue.js component.
 */
export async function testSSRComponent(component, name) {
    const app = createSSRApp(component);
    app.config.warnHandler = () => {}
    app.config.errorHandler = () => {}

    app.use(createPinia());
    app.use(createUnhead());
    app.use(router);
    app.provide("usehead", { push: () => {} });

    try {
        const html = await renderToString(app);
        return { success: true, html, name }
    } catch(error) {
        return { success: false, error, name }
    }
}

describe('SSR compatibility', () => {
    it('Renders All Pages on the Server', async () => {
        const errors = [];
        const app = await import("../src/App.vue");
        const modules = import.meta.glob('../src/pages/**/*.vue', { eager: true });

        const appResult = await testSSRComponent(app.default, app.default.__name);
        if(!appResult.success) { errors.push({ name: appResult.name, message: appResult.error }); }

        for(const [path, mod] of Object.entries(modules)) {
            const result = await testSSRComponent(mod.default, path.split('/').pop());
            if(!result.success) { errors.push({ name: result.name, message: result.error }); }
        }

        if(errors.length != 0) {
            console.log('\n=== SSR Failure Summary ===');
            errors.forEach(e => console.log(`${e.name}: ${e.message}`));
        }
        expect(errors.length == 0).toBeTruthy();
    })
})