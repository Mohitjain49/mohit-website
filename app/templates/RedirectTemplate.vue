<template>
<main class="personal-web-body">
    <div class="redirect-statement"> {{ ('Redirecting You To ' + link) }} </div>
</main>
</template>

<script setup>
import isURL from 'validator/es/lib/isURL';
const props = defineProps({
    link: { type: String, default: "" },
    title: { type: String, default: "" },
    desc: { type: String, default: "" }
});

const linkNotFound = (!props.link || typeof props.link !== "string" || !isURL(props.link, { protocols: ['https'] }));
const titleNotFound = (!props.title || typeof props.title !== "string");
const descNotFound = (!props.desc || typeof props.desc !== "string");

const usuableTitle = (titleNotFound ? "" : props.title);
const usuableDesc = (descNotFound ? "" : props.desc);

// This throws an error if a proper link is not passed in this template as a property.
if(linkNotFound) { throw createError({ status: 500, message: "Invalid Link For Redirect Page." }); }

useHead(getMetaWithLink(usuableTitle, props.link, usuableDesc));
onAfterMounted(() => { window.location.replace(props.link); });
</script>