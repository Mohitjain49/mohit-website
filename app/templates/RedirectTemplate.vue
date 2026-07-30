<template>
<main class="personal-web-body">
    <div class="redirect-statement"> {{ ('Redirecting You To ' + link) }} </div>
</main>
</template>

<script setup>
const props = defineProps({
    link: String,
    title: String,
    desc: String
});

useHead(getMetaWithLink(props.title, props.link, props.desc));
onMountedAdvanced(() => { window.location.replace(props.link); });
</script>