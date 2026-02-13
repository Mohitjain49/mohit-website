<template>
<DocumentNavigation />
<main id="script-page" class="personal-web-body transparent">
    <div class="code-file-inHTML" v-html="documentStore.deployScriptHtml"></div>

    <ParticlesBackground :particles-options="CODE_ICON_BACKGROUND" />
    <WebFooter v-if="!fullScreenSet" />
    <GamepadComponent v-if="fullScreenSet" />
    <MinimizeScreenWidget />
    <FullScreenScrollBar :fs-element-id="'script-page'" />
</main>
</template>

<script setup>
const documentStore = useDocumentStore();
const fullScreenSet = getFullScreenSet();

useHead(getMeta("Mohit Jain | My AWS Deployment Script", "/aws-deploy-script",
    "This page shows my AWS deployment script that I use for my websites and web applications."
));
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