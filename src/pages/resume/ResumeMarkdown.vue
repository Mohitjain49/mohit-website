<template>
<DocumentWidgets />
<main id="resume-container" class="markdown">
    <br>
    <ResumeMarkdownComponent />
    <div class="markdown-doc-bottom"></div>
</main>
</template>

<script setup>
useHead(getMeta("Mohit Jain | My Resume", "resume/markdown",
    "Feel free to take a look at my resume."
));
</script>