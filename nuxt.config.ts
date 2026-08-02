import { fileURLToPath } from "node:url";
import { addComponent } from "@nuxt/kit";
import { imagetools } from "vite-imagetools";
import type { Plugin } from "vite";

import usePageTemplates from "./page-templates.config";
import pwaConfig from "./pwa.config";

const PERSONAL_MAIN_WEBSITE = "https://www.mohit-jain.com";
const SITEMAP_EXCLUDED_ROUTES = [
    "/repo", "/repository", "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/sublo", "/code-scanner",
    "/ivue", "/ivuemedia", "/ivuerobotics", "/worldsivue", "/wiv", "/worlds-ivue", "/floridaman",
    "/email", "/github", "/gitlab", "/linkedin", "/discord", "/steam",
    "/static-icons/**", "/mohit-website/**", "/mohit-website", "/sitemap",
    "/gamepad/store-and-utility", "/gamepad/vuejs-component", "/gamepad/custom-events",
];

/** This function prevents any auto-scrolling before the website's internal JS can kick in. */
const NO_SCROLL_FUNCTION = "if(\'scrollRestoration\' in history) { history.scrollRestoration = \'manual\'; }";

/** This plugin adds a null "alt" attribute to any image tag that doesn't already have an "alt" attribute. */
const AUTO_ALT_PLUGIN: Plugin = {
    name: 'vite-plugin-auto-null-alt',
    enforce: 'pre', 
    transform(code, id) {
        if(!id.endsWith('.vue') && !id.endsWith('.md')) { return; }
        const missingAltRegex = /<img\s+(?![^>]*\balt\b)([^>]+)>/g;
        const updatedCode = code.replace(missingAltRegex, (match, attributes) => { return `<img alt="" ${attributes}>`; })
        return { code: updatedCode, map: null }
    }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-05-08',
    devtools: { enabled: false },
    ssr: true,
    app: { baseURL: "/",
        head: {
            htmlAttrs: { lang: "en-US" },
            script: [{ type: 'text/javascript', tagPosition: 'head', innerHTML: NO_SCROLL_FUNCTION }],
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
        }
    },
    devServer: { port: 5700, host: "localhost" },
    modules: [
        '@vueuse/nuxt', '@pinia/nuxt', '@vite-pwa/nuxt', '@nuxt/fonts',
        '@nuxtjs/sitemap', '@nuxtjs/robots', 'unplugin-info/nuxt',
        '@stefanobartoletti/nuxt-social-share', "@comark/nuxt", "nuxt-vitalizer",
        (_, nuxt) => {
            addComponent({
                name: 'FontAwesomeIcon',
                export: 'FontAwesomeIcon',
                filePath: "@fortawesome/vue-fontawesome"
            })
        }
    ],
    components: [{ path: '~/components', pathPrefix: false, extensions: ['vue'] }],
    imports: { dirs: ['~/stores/**', '~/utils/**'] },
    pinia: { storesDirs: ['./stores/**'] },
    css: ['@fortawesome/fontawesome-svg-core/styles.css'],
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/vue-fontawesome'
        ]
    },
    nitro: {
        static: true,
        prerender: { concurrency: 1 },
        preset: "static"
    },
    fonts: {
        families: [
            { name: "Lexend", provider: "fontsource" },
            { name: "Roboto", provider: "fontsource" },
            { name: "Montserrat", provider: "fontsource" }
        ]
    },

    routeRules: { '/**': { appLayout: false }},
    router: { options: { sensitive: false }},

    features: { inlineStyles: true },
    vitalizer: {
        disableStylesheets: false,
        disablePrefetchLinks: true,
        disablePreloadLinks: true
    },

    hooks: { 'pages:extend'(pages) { usePageTemplates(pages); } },
    site: { url: PERSONAL_MAIN_WEBSITE, name: "Mohit Jain | My Portfolio" },
    sitemap: {
        zeroRuntime: true,
        exclude: SITEMAP_EXCLUDED_ROUTES,
        defaults: { lastmod: new Date().toISOString().split('T')[0] }
    },

    sourcemap: false,
    experimental: { appManifest: true, typedPages: true },
    pwa: pwaConfig,
    socialShare: { baseUrl: PERSONAL_MAIN_WEBSITE },
    watch: ['./scripts/**', './tests/**', "./page-templates.config.ts", "./pwa.config.ts" ],

    vite: {
        plugins: [
            imagetools({
                include: /assets\/.*\.(png|jpe?g)(\?.*)?$/,
                removeMetadata: true,
                defaultDirectives: (url) => {
                    const params = new URLSearchParams('format=webp&quality=90');
                    url.searchParams.forEach((value, key) => { params.set(key, value); });
                    return params;
                }
            }),
            AUTO_ALT_PLUGIN
        ],
        css: {
            preprocessorOptions: { scss: { additionalData: '@use "@/styles/_dynamicrules.scss" as *;\n' }},
            lightningcss: { errorRecovery: true },
        },
        build: { cssMinify: "lightningcss" }
    },
    alias: { '@scripts': fileURLToPath(new URL('./scripts', import.meta.url)) },
    typescript: { tsConfig: { compilerOptions: { types:
        ['unplugin-info/client', '@types/node', '@types/validator', '@types/lodash-es', '@types/google.picker']
    }}}
});