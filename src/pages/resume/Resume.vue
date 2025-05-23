<template>
<DocumentWidgets />
<div id="resume-container">
    <iframe :src="VIEWER_URL" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
const VIEWER_URL = `https://docs.google.com/gview?url=${encodeURIComponent("https://www.mohit-jain.com/Mohit_Jain_Resume.pdf")}&embedded=true`;

useHead(getMeta("Mohit Jain | My Resume", "resume",
    "Feel free to take a look at my resume."
));
</script>