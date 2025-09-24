<template>
<DocumentNavigation />
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <ResumeMarkdownComponent />
    </div>

    <WebFooter v-if="!fullScreenStore.fullScreenSet" />
    <MinimizeScreenWidget />
</main>
</template>

<script setup>
const fullScreenStore = useFullScreenStore();
useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format."
));
</script>