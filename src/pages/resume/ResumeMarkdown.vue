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

<style>
.markdown-body {
    width: 1000px;
    padding: 15px;
    border-radius: 10px;
    height: fit-content;
    margin: auto;
    background-color: white;
    font-family: 'Roboto', sans-serif;
}
.markdown-doc-bottom {
    height: 75px;
}

.markdown-body h1, .markdown-body p {
    color: black;
    font-family: 'Roboto', sans-serif;
}
.markdown-body a {
    color: #517ac7;
    text-decoration: underline;
    font-family: 'Roboto', sans-serif;
}

@media (max-width: 1075px) {
    .markdown-body {
        width: calc(100% - 70px);
    }
}
</style>