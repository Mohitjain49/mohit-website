<template>
<DocumentNavigation />
<client-only>
    <main id="resume-container" v-if="documentStore.mounted">
        <div class="pdf-doc-mohit-container">
            <component v-for="page in pageNumbers"
                :is="documentStore.pdfComponent" class="tato-pdf-github-instructions"
                :pdf="documentStore.createGithubRepoPdfObj.pdf"
                text-layer annotation-layer
                @annotation="(event) => {documentStore.onAnnotationClick(event)}"
                :width="documentStore.customPdfWidth"
                :height="documentStore.customPdfHeight"
                :page="page"
            />
        </div>
        
        <WebFooter v-if="!fullScreenStore.fullScreenSet" />
        <GamepadComponent v-else />
        <MinimizeScreenWidget />
    </main>
    <div id="resume-container" class="center-flex-display" v-else>
        <div class="loading-spinner"></div>
    </div>
</client-only>
</template>

<script setup>
const documentStore = useDocumentStore();
const fullScreenStore = useFullScreenStore();
const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

useHead(getMeta(
    "Mohit Jain | Create A GitHub Repository",
    "create-github-repo",
    ("This is an instructions guide to how to create and clone a Repository with GitHub. " +
        "It'll walk anyone through creating an account with GitHub as well.")
));
</script>