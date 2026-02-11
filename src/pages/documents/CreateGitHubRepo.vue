<template>
<DocumentNavigation />
<main id="resume-container" v-if="(documentStore.mounted && !checkSSR())">
    <div class="pdf-doc-mohit-container">
        <div class="pdf-page-innerContainer" v-for="(page, index) in pageNumbers" :id="('page_' + page)">
            <DocumentViewerAddons :shareLink="getShareLink(page)" :titleEnd="('Page '+ page)" />
            <component :is="documentStore.pdfComponent" class="tato-pdf-github-instructions"
                :pdf="documentStore.createGithubRepoPdfObj.pdf"
                text-layer annotation-layer
                @loaded="() => {setSingleDocLoaded(index)}"
                @annotation="(event) => {documentStore.onAnnotationClick(event)}"
                :width="documentStore.customPdfWidth"
                :height="documentStore.customPdfHeight"
                :page="page"
            />
        </div>>
    </div>
    
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <GamepadComponent v-else />
    <MinimizeScreenWidget />
</main>
<div id="resume-container" class="center-flex-display" v-else>
    <div class="loading-spinner"></div>
</div>
</template>

<script setup>
const documentStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();

const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
const docsLoaded = ref([false, false, false, false, false, false, false, false]);

/**
 * This function sets a particular document component as loaded and only runs the main function once every doc is loaded.
 */
function setSingleDocLoaded(index) {
    docsLoaded.value[index] = true;
    const notLoaded = docsLoaded.value.findIndex(item => !item);
    if(notLoaded == -1) { documentStore.setDocLoaded(); }
}

/**
 * This function returns a link that can be used by the share popup.
 */
function getShareLink(index = 0) {
    return (PERSONAL_WEBSITE_LINK + "create-github-repo/#page_" + index);
}

useHead(getMeta(
    "Mohit Jain | Create A GitHub Repository",
    "create-github-repo",
    ("This is an instructions guide to how to create and clone a Repository with GitHub. " +
        "It'll walk anyone through creating an account with GitHub as well.")
));
</script>