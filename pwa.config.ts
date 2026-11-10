// import type { PwaModuleOptions } from "@vite-pwa/nuxt";

// This is the configuration for the website's PWA. It is on a separate file as it takes up a lot of space.
// THIS IS NOT IN USE AS PWA CACHING HAS BEEN REMOVED. THIS IS STILL HERE AS I MIGHT WANT TO REINTRODUCE IT.
const pwaConfig = {
    strategies: "generateSW",
    registerType: "prompt",
    devOptions: { enabled: false },
    selfDestroying: false,
    registerWebManifestInRouteRules: true,

    client: { periodicSyncForUpdates: 100 },
    workbox: {
        cacheId: `mohit-website-pwa-cache-id-v4.0.0-${Date.now()}`,
        globPatterns: ['**/*', '_nuxt/fonts/**'],
        ignoreURLParametersMatching: [/.*/],
        globIgnores: ["**\/node_modules\/**\/*", '**/node_modules/**/*', "**/_headers"],
        dontCacheBustURLsMatching: /_nuxt\/builds\//,
        maximumFileSizeToCacheInBytes: 5000000,
        navigateFallback: "/200.html",
        navigateFallbackDenylist: [/\.xml$/, /\.txt$/, /\.xsl$/, /\.json$/],
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
        manifestTransforms: [
            (manifestEntries: any) => {
                const manifest = manifestEntries.map((entry: any) => {
                    if (!entry.url.startsWith('/')) { entry.url = `/${entry.url}`; }
                    return entry;
                });
                return { manifest, warnings: [] };
            }
        ]
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

// Exports the PWA Configuration Object.
export default pwaConfig;