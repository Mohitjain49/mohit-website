import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

import vue from "@vitejs/plugin-vue";
import generateSitemap from 'vite-ssg-sitemap';

import swc from "unplugin-swc";
import Info from "unplugin-info/vite";

import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite';
import Markdown from 'unplugin-vue-markdown/vite';

const SITEMAP_EXCLUDED_ROUTES = [
    "/gamepad", "/repo", "/repository",
    "/code", "/codesandbox", "/code-sandbox", "/commits",
    "/globe", "/mnd", "/pizza", "/ivue", "/sublo",
    "/worldsivue", "/wiv", "/worlds-ivue",
    "/email", "/github", "/gitlab", "/linkedin", "/discord"
];

export default defineConfig({
    base: "/",
    server: { port: 5000 },
    preview: { port: 4007 },
    plugins: [
        vue({ include: [/\.vue$/, /\.md$/] }),
        swc.vite(),
        Info(),
        Components({ dts: true, extensions: ['vue', 'md'] }),
        Markdown(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', { '@unhead/vue': ['useHead'] }],
            dirs: ['./src/stores'],
            dts: true,
            vueTemplate: true
        }),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: false },
            includeAssets: ['**/*.woff2', '**/*.woff'],

            workbox: {
                cacheId: "v2.7.5",
                globPatterns: ['**/*.{js,css,html,png,svg,pdf,webp,jpg,jpeg,woff2,woff,ttf,eot,md}'],
                maximumFileSizeToCacheInBytes: 3000000
            },

            manifest: {
                name: 'Mohit Jain\'s Portfolio',
                short_name: 'Mohit Jain',
                start_url: '/',
                display: 'standalone',
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