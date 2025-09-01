<template>
<main id="resume-container">
    <div class="pdf-doc-mohit-container">
        <GoogleMockupAssignmentComponent />
    </div>
    <WebFooter />
</main>
</template>

<script setup>
onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Google Mockup Assignment", "google-mockup-assignment",
    "This is a simple guide I give to new frontend developers to introduce them to Vue.js development."
));
</script>