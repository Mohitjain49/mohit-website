<template>
<DocumentViewer v-if="documentStore.mounted"
    :annontations="true"
    :addShare="true"
    :url="documentStore.createGithubRepoUrl"
    :class="'tato-pdf-github-instructions'"
/>
<div id="resume-container" class="center-flex-display" v-else>
    <div class="loading-spinner"></div>
</div>
</template>

<script setup>
const documentStore = useDocumentStore();
useHead(getMeta(
    "Mohit Jain | Create A GitHub Repository",
    "create-github-repo",
    ("This is an instructions guide to how to create and clone a Repository with GitHub. " +
        "It'll walk anyone through creating an account with GitHub as well.")
));
</script>