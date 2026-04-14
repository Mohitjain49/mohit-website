import { fileURLToPath } from "node:url";
import { addComponent } from "@nuxt/kit";
import { imagetools } from "vite-imagetools";

import usePageTemplates from "./page-templates.config";
import Info from "unplugin-info/vite";

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
        '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/fonts',
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

    site: {
        url: "https://www.mohit-jain.com",
        name: "Mohit Jain | My Portfolio"
    },
    sitemap: { exclude: SITEMAP_EXCLUDED_ROUTES },
    experimental: { appManifest: true },

    vite: {
        plugins: [
            Info(),
            imagetools({
                include: /assets\/.*\.(png|jpe?g)$/,
                defaultDirectives: (url) => { return new URLSearchParams('format=webp&quality=70'); }
            })
        ]
    },
    pwa: {
        strategies: "generateSW",
        registerType: "prompt",
        devOptions: { enabled: false },
        registerWebManifestInRouteRules: true,

        client: { periodicSyncForUpdates: 600 },
        workbox: {
            cacheId: `v3.10.0-${Date.now()}`,
            globPatterns: [
                '**/*.{js,css,html,mjs,png,svg,pdf,webp,jpg,jpeg,woff2,woff,ttf,eot,md,wav,xml,txt,xsl,mp3,json}',
                '_fonts/**', '**/_payload.json?**'
            ],
            globIgnores: ['**/node_modules/**/*'],
            dontCacheBustURLsMatching: /_nuxt\/builds\//,
            maximumFileSizeToCacheInBytes: 5000000,
            navigateFallback: "/",
            navigateFallbackDenylist: [/\.xml$/, /\.txt$/, /\.xsl$/],
            cleanupOutdatedCaches: true,
            clientsClaim: false,
            skipWaiting: false
        },

        manifest: {
            name: 'Mohit Jain\'s Portfolio',
            short_name: 'Mohit Jain',
            start_url: '/',
            display: 'minimal-ui',
            background_color: '#ffffff',
            theme_color: '#000000',
            icons: [
                {
                    src: 'static-icons/Personal_Icon_Expanded_Rounded.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'static-icons/Personal_Icon_Expanded_Rounded.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ]
        }
    },
    alias: {
        '@scripts': fileURLToPath(new URL('./scripts', import.meta.url))
    }
})