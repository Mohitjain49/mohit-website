<template>
<NavigationMain />
<ResumeWidgets />

<div id="resume-container">
    <iframe :src="resume" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import NavigationMain from "../components/NavigationMain.vue";
import ResumeWidgets from "../components/ResumeWidgets.vue";
import resume from "/Mohit_Jain_Resume.pdf";

import { getMeta } from "../stores/GetMeta.js";
import { useHead } from "@unhead/vue";

useHead(getMeta("Mohit Jain | My Resume", "resume/pdf",
    "Feel free to take a look at my resume."
));
</script>