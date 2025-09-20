import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

import vue from "@vitejs/plugin-vue";
import generateSitemap from 'vite-ssg-sitemap';
import attrs from 'markdown-it-attrs';

import Info from "unplugin-info/vite";
import imagemin from 'unplugin-imagemin/vite';
import EnvTypes from 'vite-plugin-env-types';

import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite';
import Markdown from 'unplugin-vue-markdown/vite';

const SITEMAP_EXCLUDED_ROUTES = [
    "/gamepad", "/repo", "/repository", "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/sublo", "/code-scanner",
    "/ivue", "/ivuemedia", "/ivuerobotics", "/worldsivue", "/wiv", "/worlds-ivue", "/floridaman",
    "/email", "/github", "/gitlab", "/linkedin", "/discord", "/steam",
    "/static-icons/**", "/mohit-website/**", "/mohit-website", "/sitemap"
];
const VUEUSE_AUTO_IMPORTS = {
    '@vueuse/core': [
        'useIntersectionObserver',
        'useShare',
        'useFps'
    ]
}

export default defineConfig({
    base: "/",
    server: { port: 5000 },
    preview: { port: 4007 },
    plugins: [
        vue({ include: [/\.vue$/, /\.md$/] }),
        Info(),
        imagemin(),
        EnvTypes({ dts: "./dts/vite-env.d.ts" }),
        Components({
            dts: './dts/components.d.ts',
            extensions: ['vue', 'md'],
            resolvers: [
                (name) => {
                    if(name === "FontAwesomeIcon") {
                        return { name: "FontAwesomeIcon", from: '@fortawesome/vue-fontawesome' }
                    }
                }
            ]
        }),
        Markdown({
            markdownItSetup(md) { md.use(attrs); }
        }),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', { '@unhead/vue': ['useHead'] }, VUEUSE_AUTO_IMPORTS],
            dirs: ['./src/stores/**', './src/joypad-classes.js'],
            dts: './dts/auto-imports.d.ts',
            vueTemplate: true
        }),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: false },
            includeAssets: ['**/*.woff2', '**/*.woff'],

            workbox: {
                cacheId: "v3.2.0",
                globPatterns: ['**/*.{js,css,html,mjs,png,svg,pdf,webp,jpg,jpeg,woff2,woff,ttf,eot,md,wav,xml,txt,xsl,mp3}'],
                maximumFileSizeToCacheInBytes: 3000000,
                navigateFallback: "/index.html",
                navigateFallbackDenylist: [/\.xml$/, /\.txt$/, /\.xsl$/]
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
        })
    ],
    ssgOptions: {
        dirStyle: 'nested',
        onFinished() {
            generateSitemap({
                hostname: "https://www.mohit-jain.com/",
                exclude: SITEMAP_EXCLUDED_ROUTES,
                readable: false
            })
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@types': fileURLToPath(new URL('./types', import.meta.url)),
        }
    }
});