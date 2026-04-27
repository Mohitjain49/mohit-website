import { fileURLToPath } from "node:url";
import { addComponent } from "@nuxt/kit";
import { imagetools } from "vite-imagetools";

import usePageTemplates from "./page-templates.config";
import pwaConfig from "./pwa.config";

const SITEMAP_EXCLUDED_ROUTES = [
    "/repo", "/repository", "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/sublo", "/code-scanner",
    "/ivue", "/ivuemedia", "/ivuerobotics", "/worldsivue", "/wiv", "/worlds-ivue", "/floridaman",
    "/email", "/github", "/gitlab", "/linkedin", "/discord", "/steam",
    "/static-icons/**", "/mohit-website/**", "/mohit-website", "/sitemap",
    "/gamepad/store-and-utility", "/gamepad/vuejs-component", "/gamepad/custom-events",
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    ssr: true,
    app: { baseURL: "/" },
    devServer: { port: 5000, host: "localhost" },
    modules: [
        '@vueuse/nuxt', '@pinia/nuxt', '@nuxt/content', '@vite-pwa/nuxt',
        '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/fonts', 'unplugin-info/nuxt',
        (_, nuxt) => {
            addComponent({
                name: 'FontAwesomeIcon',
                export: 'FontAwesomeIcon',
                filePath: "@fortawesome/vue-fontawesome"
            })
        }
    ],
    components: [{ path: '~/components', pathPrefix: false, extensions: ['vue', 'md'] }],
    imports: { dirs: ['~/stores/**', '~/utils/**'] },
    pinia: { storesDirs: ['./stores/**'] },
    hooks: { 'pages:extend'(pages) { usePageTemplates(pages); } },
    css: ['@fortawesome/fontawesome-svg-core/styles.css'],
    build: {
        transpile: [
            'nuxt-site-config',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/vue-fontawesome'
        ]
    },
    nitro: {
        output: {
            dir: ".output",
            publicDir: '.output/public'
        }
    },
    routeRules: { '/**': { prerender: true } },
    fonts: {
        families: [
            { name: "Lexend", provider: "fontsource" },
            { name: "Roboto", provider: "fontsource" },
            { name: "Montserrat", provider: "fontsource" }
        ]
    },

    site: { url: "https://www.mohit-jain.com", name: "Mohit Jain | My Portfolio" },
    sitemap: {
        zeroRuntime: true,
        exclude: SITEMAP_EXCLUDED_ROUTES,
        defaults: { lastmod: new Date().toISOString().split('T')[0] }
    },

    sourcemap: false,
    experimental: { appManifest: true, typedPages: true },
    pwa: pwaConfig,

    vite: {
        plugins: [
            imagetools({
                include: /assets\/.*\.(png|jpe?g)$/,
                defaultDirectives: (url) => { return new URLSearchParams('format=webp&quality=70'); }
            })
        ]
    },
    alias: { '@scripts': fileURLToPath(new URL('./scripts', import.meta.url)) }
});