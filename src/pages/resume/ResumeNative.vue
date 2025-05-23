<template>
<DocumentWidgets />
<div id="resume-container">
    <iframe :src="resume_pdf" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
const resume_pdf = "https://www.mohit-jain.com/Mohit_Jain_Resume.pdf";

useHead(getMeta("Mohit Jain | My Resume", "resume/pdf",
    "Feel free to take a look at my resume."
));
</script>