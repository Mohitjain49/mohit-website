<template>
<ParticlesBackground :particles-options="CODE_ICON_BACKGROUND" />
<main class="personal-web-body transparent">
    <div class="code-file-inHTML" v-html="html"></div>
    <WebFooter />
</main>
</template>

<script setup>
import deploy_code from "@scripts/deploy.mjs?raw";
const html = ref("<pre> <div class=\"loading-spinner\"></div> </pre>");

onMounted(async() => { await mountWebpage(); });
useHead(getMeta("Mohit Jain | My AWS Deployment Script", "/aws-deploy-script",
    "This page shows my AWS deployment script that I use for my websites and web applications."
));

/** This function mounts the webpage to showcase the AWS Deployment Script. */
async function mountWebpage() {
    initWebData();
    await nextTick(() => {});

    const createHighlighterCore = (await import("shiki/dist/core.mjs")).createHighlighterCore;
    const createOnigurumaEngine = (await import("shiki/dist/engine-oniguruma.mjs")).createOnigurumaEngine;
    const langJs = (await import("shiki/dist/langs/javascript.mjs"));
    const themeVitesseDark = (await import("shiki/dist/themes/vitesse-dark.mjs"));

    const highlighter = await createHighlighterCore({
        themes: [themeVitesseDark], langs: [langJs],
        engine: createOnigurumaEngine(import('shiki/wasm')) 
    });
    html.value = highlighter.codeToHtml(deploy_code, { lang: "javascript", theme: "vitesse-dark" });
}
</script>

<style scoped>
.code-file-inHTML :deep(pre) {
    max-width: 1000px;
    width: calc(100% - 70px);
    height: fit-content;
    min-height: var(--body-height);
    overflow-y: hidden;
    overflow-x: auto;
    left: 10px;
    padding: 30px 0px;
    border-left: 20px solid;
    border-right: 20px solid;
    border-color: #121212 !important;
    border-radius: 15px;
    margin: 20px auto;
    background-color: #121212 !important;
}

.code-file-inHTML ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border: 1px solid white;
    border-radius: 30px;
    background: var(--blue-zero);
}
.code-file-inHTML ::-webkit-scrollbar-thumb {
    background-color: var(--website-text);
    border-radius: 30px;
    transition: background-color 0.2s;
}
.code-file-inHTML ::-webkit-scrollbar-thumb:hover {
    background-color: var(--website-dark-text);
}
.code-file-inHTML ::-webkit-scrollbar-button {
    display: none;
}
</style>