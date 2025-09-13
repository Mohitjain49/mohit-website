<template>
<main class="personal-web-body">
    <div class="redirect-statement"> Redirecting You To The Home Page... </div>
</main>
</template>

<script setup>
const router = useRouter();
onMounted(() => { initWebData(); router.replace("/"); });
useHead(getMeta());
</script>