// This plugin reloads the website every time a file is changed in development mode
export default defineNuxtPlugin((nuxtApp) => {
    const RELOAD_WEBSITE_ON_CHANGE = true;
    if(RELOAD_WEBSITE_ON_CHANGE && import.meta.dev && import.meta.hot) {
        import.meta.hot.on("dev:window:reload", (data) => { reloadNuxtApp({ force: true }); });
    }
});