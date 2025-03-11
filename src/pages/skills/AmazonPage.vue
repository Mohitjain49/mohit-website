<template>
<NavigationMain />
<AmazonSidebar />

<client-only>
    <vue-particles id="particlests" :options="AWS_BACKGROUND"></vue-particles>
</client-only>

<div id="aws-page" class="personal-web-body" @click="closeNavBarDropdown()">
    <client-only>
        <div id="start" class="aws-page-section">

        </div>
    </client-only>
    <WebFooter />
</div>
</template>

<script setup>
import AmazonSidebar from '@/components/sidebars/AmazonSidebar.vue';
import NavigationMain from '@/components/NavigationMain.vue';
import WebFooter from '@/components/WebFooter.vue';

import { initWebData, closeNavBarDropdown } from '@/stores/WebsiteData.js';
import { AWS_BACKGROUND } from '@/stores/ParticlesConfig.js';

import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import { getMeta } from "@/stores/GetMeta.js";

onMounted(() => { initWebData(); });
useHead(getMeta("Mohit Jain | Amazon Web Services (AWS)", "aws/",
    "I use Amazon Web Services for most of my projects, whether I need to host and deploy a website, " +
    "manage company emails, manage user authentication, or to create an app."
));
</script>

<style scoped>
#aws-page {
    background: rgba(0, 0, 0, 0.25);
    top: 0px;
    min-height: 100%;
}
.aws-page-section {
    padding: 50px 0px 70px 0px;
    height: fit-content;
    min-height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>