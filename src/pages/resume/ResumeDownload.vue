<template>
<ResumeWidgets />
<div id="resume-container"></div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
const router = useRouter();

onMounted(() => {
    downloadResume();
    router.push("/resume");
});

useHead(getMeta("Mohit Jain | Download My Resume", "resume/download",
    "This link lets anyone download the latest version of my resume."
));
</script>