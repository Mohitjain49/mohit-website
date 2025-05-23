<template>
<div id="resume-container">
    <iframe :src="intern_appreciation_certificate" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import intern_appreciation_certificate from "/Fulton_Internship_Program_Appreciation_Certificate_2025.pdf";

useHead(getMeta("Mohit Jain | My Certificates", "certificates",
    "Feel free to take a look at my certificates."
));
</script>