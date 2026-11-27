import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { globSync } from 'fast-glob';

import { addComponent } from "@nuxt/kit";
import { imagetools } from "vite-imagetools";
import type { Plugin } from "vite";

// import pwaConfig from "./pwa.config";
import usePageTemplates from "./page-templates.config";

/** This is my website's version number. */
const VERSION_NUMBER: string = JSON.parse(readFileSync("./package.json", "utf8")).version;
const RUNNING_DOCKER_ENV = (process.env.DOCKER_SCRIPT === "true");
const PERSONAL_MAIN_WEBSITE = "https://www.mohit-jain.com";

const GOOGLE_CLOUD_OAUTH_CLIENT_ID: string = (process.env.GOOGLE_CLOUD_OAUTH_CLIENT_ID || "");
const GOOGLE_DRIVE_PICKER_DEVELOPER_KEY: string = (process.env.GOOGLE_DRIVE_PICKER_DEVELOPER_KEY || "");
const GOOGLE_DRIVE_PICKER_APP_ID: string = (process.env.GOOGLE_DRIVE_PICKER_APP_ID || "");

/** This fetches all the Vue.js Directive Plugins that this project uses so they are registered here. */
const VUE_DIRECTIVE_PLUGINS = globSync("app/directives/**/*.{ts,js}", {
    cwd: __dirname,
    absolute: true
});

/** This is a list containing all routes that should be excluded from the sitemap on build. */
const SITEMAP_EXCLUDED_ROUTES = [
    "/repo", "/repository", "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/sublo", "/code-scanner",
    "/ivue", "/ivuemedia", "/ivuerobotics", "/worldsivue", "/wiv", "/worlds-ivue", "/floridaman",
    "/email", "/github", "/gitlab", "/linkedin", "/discord", "/steam",
    "/static-icons/**", "/mohit-website/**", "/mohit-website", "/sitemap"
];

/** This is a list of all the TypeScript dependencies used to make developing code easier. */
const TS_TYPES = [
    '@types/node', '@types/validator', '@types/lodash-es',
    '@types/google.picker', '@types/google.accounts', '@types/gapi',
    '@types/wicg-file-system-access'
];

/** This function prevents any auto-scrolling before the website's internal JS can kick in. */
const NO_SCROLL_FUNCTION = "if(\'scrollRestoration\' in history) { history.scrollRestoration = \'manual\'; }";

/**
 * This function is ran to confirm whether to inline a style block.
 * @param id The id of the resource asking to inline a style block.
 */
function inlineStylesCallback(id?: string) {
    if(!Boolean(id) || (typeof id !== "string")) { return false; }
    return !(id.includes('?inline'));
}

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

/** This plugin reloads the client when a page change is detected. */
const WINDOW_RELOAD_PLUGIN: Plugin = {
    name: 'vite-plugin-window-reload-mohit',
    configureServer(viteServer) {
        viteServer.watcher.on("all", (event, path) => {
            viteServer.ws.send('dev:window:reload', { event, path });
        });
    }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-10-05',
    devtools: { enabled: false },
    ssr: true,
    devServer: { port: 5700, host: "localhost" },
    app: {
        baseURL: "/",
        head: {
            htmlAttrs: { lang: "en-US" },
            script: [{ type: 'text/javascript', tagPosition: 'head', innerHTML: NO_SCROLL_FUNCTION }],
            meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
            link: [{ rel: 'manifest', href: '/manifest.webmanifest' }]
        }
    },
    modules: [
        '@vueuse/nuxt', '@pinia/nuxt', '@nuxt/fonts', "@comark/vue", "nuxt-vitalizer",
        '@nuxtjs/sitemap', '@nuxtjs/robots', '@stefanobartoletti/nuxt-social-share',
        (_, nuxt) => {
            addComponent({
                name: 'FontAwesomeIcon',
                export: 'FontAwesomeIcon',
                filePath: "@fortawesome/vue-fontawesome"
            })
        }
    ],

    plugins: [...VUE_DIRECTIVE_PLUGINS],
    components: [{ path: '~/components', pathPrefix: false, extensions: ['vue'] }],
    pinia: { storesDirs: ['./stores/**'] },
    css: ['@fortawesome/fontawesome-svg-core/styles.css', '~/styles/mainstyles.scss', '~/styles/navmenu.scss'],

    runtimeConfig: {
        public: {
            version: VERSION_NUMBER,
            buildDate: (new Date().toISOString()),
            GOOGLE_CLOUD_OAUTH_CLIENT_ID,
            GOOGLE_DRIVE_PICKER_DEVELOPER_KEY,
            GOOGLE_DRIVE_PICKER_APP_ID
        }
    },
    imports: {
        dirs: ['~/stores/**', '~/utils/**'],
        presets: [
            {
                from: 'lodash-es',
                imports: [
                    { name: "clamp", as: "clampNumber" },
                    { name: "round", as: "roundNumber" }
                ]
            },
            { from: 'validator/es/lib/isURL', imports: [{ name: "default", as: "isStringUrl" }] },
            { from: 'validator/es/lib/isMailtoURI.js', imports: [{ name: "default", as: "isStringMailtoUri" }] }
        ]
    },
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
    router: { options: { sensitive: true }},

    features: { inlineStyles: (id?: string) => { return inlineStylesCallback(id); }},
    vitalizer: { disablePrefetchLinks: true, disablePreloadLinks: true },
    hooks: { 'pages:extend'(pages) { usePageTemplates(pages); }},
    site: { url: PERSONAL_MAIN_WEBSITE, name: "Mohit Jain | My Portfolio" },
    sitemap: {
        zeroRuntime: true,
        exclude: SITEMAP_EXCLUDED_ROUTES,
        defaults: { lastmod: (new Date().toISOString().split('T')[0]) },
        xsl: false
    },

    sourcemap: false,
    experimental: { appManifest: true, typedPages: true, payloadExtraction: true, webmcp: false, parallelBuild: false },
    socialShare: { baseUrl: PERSONAL_MAIN_WEBSITE },
    watch: ['./scripts/**', './tests/**', "./page-templates.config.ts", "./pwa.config.ts" ],

    vite: {
        server: {
            ws: {
                protocol: (RUNNING_DOCKER_ENV ? 'ws' : undefined),
                host: (RUNNING_DOCKER_ENV ? '0.0.0.0' : undefined),
                port: (RUNNING_DOCKER_ENV ? 5700 : undefined),
                clientPort: (RUNNING_DOCKER_ENV ? 5700 : undefined)
            },
            watch: {
                usePolling: (RUNNING_DOCKER_ENV ? true : undefined),
                interval: (RUNNING_DOCKER_ENV ? 100 : undefined)
            }
        },
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
            AUTO_ALT_PLUGIN,
            WINDOW_RELOAD_PLUGIN
        ],
        optimizeDeps: {
            entries: ['./app/**/*.vue', './app/**/*.ts', './app/**/*.js'],
            include: ["shiki/wasm",
                "shiki/dist/langs/javascript.mjs",
                "shiki/dist/langs/c.mjs",
                "shiki/dist/core.mjs",
                "shiki/dist/engine-oniguruma.mjs",
                "shiki/dist/themes/material-theme-ocean.mjs",
                "validator/es/lib/isEmail"
            ]
        },
        css: {
            preprocessorOptions: { scss: { additionalData: '@use "@/styles/_dynamicrules.scss" as *;\n' }},
            lightningcss: { errorRecovery: true }
        },
        build: { cssMinify: "lightningcss" }
    },

    alias: { '@scripts': fileURLToPath(new URL('./scripts', import.meta.url)) },
    typescript: { tsConfig: { compilerOptions: { types: TS_TYPES }}}
});