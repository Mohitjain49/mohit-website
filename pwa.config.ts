import type { PwaModuleOptions } from "@vite-pwa/nuxt";

// This is the configuration for the website's PWA. It is on a separate file as it takes up a lot of space.
const pwaConfig: PwaModuleOptions = {
    strategies: "generateSW",
    registerType: "prompt",
    devOptions: { enabled: false },
    registerWebManifestInRouteRules: true,

    client: { periodicSyncForUpdates: 600 },
    workbox: {
        cacheId: `v3.10.2-${Date.now()}`,
        globPatterns: ['**/*.{js,css,html,mjs,png,svg,pdf,webp,jpg,jpeg,woff2,woff,ttf,eot,md,wav,xml,txt,xsl,mp3,json}', '_fonts/**'],
        ignoreURLParametersMatching: [/.*/],
        globIgnores: ["**\/node_modules\/**\/*", '**/node_modules/**/*', '404.html'],
        dontCacheBustURLsMatching: /_nuxt\/builds\//,
        maximumFileSizeToCacheInBytes: 5000000,
        navigateFallback: "200",
        navigateFallbackDenylist: [/\.xml$/, /\.txt$/, /\.xsl$/, /\.json$/],
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
}

export default pwaConfig;