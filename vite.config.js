import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: "/",
    server: {
        port: 5000
    },
    plugins: [
        vue(),
        Components({ dts: true }),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: true },
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg,pdf,webp,jpg,jpeg}']
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
        dirStyle: 'nested'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});