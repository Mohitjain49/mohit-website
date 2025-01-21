<template>
<NavigationMain />
<div id="invalid" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <div class="gradient-text incomplete-title"> {{ message }} </div>
    <div class="incomplete-subtitle"> {{ subtitle }} </div>
    <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
        <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Go to Home</RouterLink>
    </div>
</div>
</template>

<script setup>
import NavigationMain from '../NavigationMain.vue';
import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
const props = defineProps({
    pageTitle: String,
    message: String,
    subtitle: String
});

onMounted(() => {
    document.title = props.pageTitle;
    webData.mountWebData();
})
</script>

<style scoped>
.personal-web-body#invalid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: calc(100% - 40px);
    padding: 0px 20px;
}
.incomplete-title {
    font-size: 60px;
    width: fit-content;
    height: fit-content;
    margin-bottom: 5px;
    text-align: center;
}
.incomplete-subtitle {
    font-size: 20px;
    font-family: "Roboto", "Lexend", sans-serif;
    color: var(--website-text);
    margin-bottom: 10px;
    height: fit-content;
    width: fit-content;
    text-align: center;
}

@media (max-width: 600px) {
    .incomplete-title {
        font-size: 42px;
    }
}
</style>