import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

import vue from "@vitejs/plugin-vue";
import generateSitemap from 'vite-ssg-sitemap';
import EnvTypes from 'vite-plugin-env-types';

import swc from "unplugin-swc";
import Info from "unplugin-info/vite";

import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite';
import Markdown from 'unplugin-vue-markdown/vite';

const SITEMAP_EXCLUDED_ROUTES = [
    "/gamepad", "/repo", "/repository",
    "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/sublo",
    "/ivue", "/ivuemedia", "/ivuerobotics",
    "/worldsivue", "/wiv", "/worlds-ivue", "/floridaman",
    "/email", "/github", "/gitlab", "/linkedin", "/discord", "/steam",
    "/mohit-website/**", "/mohit-website"
];

export default defineConfig({
    base: "/",
    server: { port: 5000 },
    preview: { port: 4007 },
    plugins: [
        vue({ include: [/\.vue$/, /\.md$/] }),
        swc.vite(),
        Info(),
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
        Markdown(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', { '@unhead/vue': ['useHead'] }],
            dirs: ['./src/stores'],
            dts: './dts/auto-imports.d.ts',
            vueTemplate: true
        }),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: false },
            includeAssets: ['**/*.woff2', '**/*.woff'],

            workbox: {
                cacheId: "v2.8.2",
                globPatterns: ['**/*.{js,css,html,png,svg,pdf,webp,jpg,jpeg,woff2,woff,ttf,eot,md,wav}'],
                maximumFileSizeToCacheInBytes: 3000000
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
                readable: true
            })
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});