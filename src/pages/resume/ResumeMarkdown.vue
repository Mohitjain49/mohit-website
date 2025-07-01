<template>
<DocumentWidgets />
<main id="resume-container" class="markdown">
    <br>
    <ResumeMarkdownComponent />
    <br>
</main>
</template>

<script setup>
useHead(getMeta("Mohit Jain | My Resume", "resume/markdown",
    "Feel free to take a look at my resume."
));
</script>

<style scoped>
.markdown-body {
    width: 1000px;
    padding: 15px;
    border-radius: 10px;
    height: fit-content;
    margin: auto;
    background-color: white;
}
</style>