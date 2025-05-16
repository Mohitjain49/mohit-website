import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { VitePWA } from 'vite-plugin-pwa';

import Components from "unplugin-vue-components/vite";
import AutoImport from 'unplugin-auto-import/vite';
import generateSitemap from 'vite-ssg-sitemap';

export default defineConfig({
    base: "/",
    server: {
        port: 5000
    },
    preview: {
        port: 4007
    },
    plugins: [
        vue(),
        Components({ dts: true }),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dirs: ['./src/stores'],
            dts: true,
            vueTemplate: true
        }),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: false },
            workbox: {
                cacheId: "v2.6.0",
                globPatterns: ['**/*.{js,css,html,png,svg,pdf,webp,jpg,jpeg}'],
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
                        src: 'static-icons/Personal_Icon_Expanded.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'static-icons/Personal_Icon_Expanded.png',
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