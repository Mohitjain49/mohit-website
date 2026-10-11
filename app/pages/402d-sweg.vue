<template>
<main id="402D" class="personal-web-body"></main>
</template>

<script setup>
const styleStore = useStyleStore();
onMounted(() => { styleStore.setHideOverflowArray(HideOverflow.EXPERIENCE_PAGE, true); });
onBeforeUnmount(() => { styleStore.setHideOverflowArray(HideOverflow.EXPERIENCE_PAGE, false); });
useHead(getMeta("Mohit Jain | My Work In The 402D Software Engineering Group", "402d-sweg", "", "black"));
</script>

<style scoped lang="scss">
.personal-web-body[id="402D"] {
    height: var(--body-height);
    background: radial-gradient(ellipse at center, #e2e2e2 0%, #e2e2e2 40%, #004DA7 100%);
    padding-top: 50px;
}
</style>