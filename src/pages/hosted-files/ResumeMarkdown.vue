<template>
<DocumentNavigation />
<main id="resume-container">
    <FullScreenScrollBar :fs-element-id="'resume-container'" />
    <ParticlesBackground :particles-options="DOCUMENT_BACKGROUND" />
    <div class="pdf-doc-mohit-container"> <ResumeMarkdownComponent /> </div>

    <WebFooter v-if="!fullScreenSet" />
    <GamepadComponent v-if="fullScreenSet" />
    <MinimizeScreenWidget />
</main>
</template>

<script setup>
const fullScreenSet = getFullScreenSet();
useHead(getMeta("Mohit Jain | My Resume (Markdown Format)", "resume/markdown",
    "Feel free to take a look at my resume. This is in markdown format.",
    "resume-markdown"
));
</script>