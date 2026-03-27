import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

import { VitePWA } from 'vite-plugin-pwa';
import { qrcode } from 'vite-plugin-qrcode';
import { resolveComponents, resolveFontAwesomeIcons } from './resolvers.js';

import vue from "@vitejs/plugin-vue";
import generateSitemap from 'vite-ssg-sitemap';
import attrs from 'markdown-it-attrs';
import visualizer from 'rollup-plugin-visualizer';

import Info from "unplugin-info/vite";
import imagemin from 'unplugin-imagemin/vite';
import EnvTypes from 'vite-plugin-env-types';

import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite';
import Markdown from 'unplugin-vue-markdown/vite';

const SITEMAP_EXCLUDED_ROUTES = [
    "/gamepad", "/repo", "/repository", "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/sublo", "/code-scanner", "/resume/qrcode",
    "/ivue", "/ivuemedia", "/ivuerobotics", "/worldsivue", "/wiv", "/worlds-ivue", "/floridaman",
    "/email", "/github", "/gitlab", "/linkedin", "/discord", "/steam",
    "/static-icons/**", "/mohit-website/**", "/mohit-website", "/sitemap",
    "/gamepad/store-and-utility", "/gamepad/vuejs-component", "/gamepad/custom-events",
];
const VUEUSE_AUTO_IMPORTS = {
    '@vueuse/core': [
        'useIntersectionObserver',
        'useWakeLock',
        'useObjectUrl',
        'useShare',
        'useFps',
        'onStartTyping',
        'useDocumentVisibility',
        'useElementVisibility',
        'useBattery',
        'useWindowSize',
        'useScrollLock',
        'useMouse',
        'usePageLeave',
        'useSwipe',
        'useElementBounding',
        'onClickOutside',
        'useDateFormat',
        'useScriptTag',
        'useSpeechRecognition',
        'useMousePressed'
    ]
}

export default defineConfig(({ isSsrBuild }) => {
    return {
        base: "/",
        server: { port: 5000 },
        preview: { port: 4007 },
        test: {
            watch: false,
            environment: "node",
            server: { deps: { inline: true } },
            setupFiles: ['./vitest.setup.js'],
            pool: "forks",
            isolate: true,
            fileParallelism: false
        },
        build: {
            rollupOptions: {
                output: { 
                    manualChunks: (!isSsrBuild ? {
                        'vendor-vue-pdf': ['@tato30/vue-pdf'],
                        'vendor-fontawesome': [
                            '@fortawesome/fontawesome-svg-core',
                            '@fortawesome/free-solid-svg-icons',
                            '@fortawesome/free-brands-svg-icons',
                            '@fortawesome/vue-fontawesome'
                        ],
                        'vendor-pdf-editor': ['pdf-lib'],
                        'vendor-tsparticles': [
                            '@tsparticles/preset-fireworks',
                            '@tsparticles/slim',
                            '@tsparticles/vue3'
                        ],
                        'vendor-qr-code-reader': ['vue-qrcode-reader']
                    } : undefined)
                }
            }
        },
        plugins: [
            vue({ include: [/\.vue$/, /\.md$/] }),
            qrcode(),
            Info(),
            imagemin(),
            EnvTypes({ dts: "./dts/vite-env.d.ts" }),
            Components({
                dirs: [],
                dts: (isSsrBuild ? false : './dts/components.d.ts'),
                extensions: ['vue', 'client.vue', 'md'],
                resolvers: [
                    (name) => { return resolveComponents(name, isSsrBuild); },
                    (name) => { return resolveFontAwesomeIcons(name); }
                ]
            }),
            Markdown({
                markdownItSetup(md) { md.use(attrs); }
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia', { '@unhead/vue': ['useHead'] }, VUEUSE_AUTO_IMPORTS],
                dirs: ['./src/stores/**', './src/utils/**'],
                dts: (isSsrBuild ? false : './dts/auto-imports.d.ts'),
                vueTemplate: true
            }),
            VitePWA({
                registerType: "prompt",
                devOptions: { enabled: false },
                includeAssets: ['**/*.woff2', '**/*.woff'],

                workbox: {
                    cacheId: `v3.8.3-${Date.now()}`,
                    globPatterns: ['**/*.{js,css,html,mjs,png,svg,pdf,webp,jpg,jpeg,woff2,woff,ttf,eot,md,wav,xml,txt,xsl,mp3}'],
                    maximumFileSizeToCacheInBytes: 5000000,
                    navigateFallback: "/index.html",
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
                    ],
                },
            }),
            visualizer({
                open: false,
                title: "Mohit Jain | Website Plugins Mapped (" + (isSsrBuild ? "SSR" : "CSR") + ")",
                filename: (isSsrBuild ? "bundle-visualizer/ssr.html" : "bundle-visualizer/csr.html"),
                gzipSize: true,
                brotliSize: true
            }),
        ],
        ssgOptions: {
            dirStyle: 'nested',
            beastiesOptions: { preload: 'media' },
            onFinished() {
                generateSitemap({
                    hostname: "https://www.mohit-jain.com/",
                    exclude: SITEMAP_EXCLUDED_ROUTES,
                    readable: false
                })
            }
        },
        ssr: {
            noExternal: [
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/free-brands-svg-icons',
                '@fortawesome/vue-fontawesome'
            ]
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@scripts': fileURLToPath(new URL('./scripts', import.meta.url))
            }
        }
    }
});