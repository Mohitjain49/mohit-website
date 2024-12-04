<template>
<NavigationMain />
<div id="update-body" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <UpdateMenu v-if="laptopScreen" />
    <div :id="Updates[versionIndex].versionPath" class="update-content update-log-content">
        <div class="gradient-text update-content-title">
            {{ 'Update ' + Updates[versionIndex].version }}
        </div>
        <p class="update-content-date"> {{ 'Released ' + Updates[versionIndex].releaseDate }} </p>
        <p class="update-content-mainDesc" v-html="Updates[versionIndex].mainDescription"></p>

        <div v-for="topic in Updates[versionIndex].topics" :id="topic.elementId" class="update-log-topic">
            <h1 class="update-log-topic-header"> {{ topic.name }} </h1>
            <p class="update-log-topic-desc" v-html="topic.description"></p>

            <iframe v-if="topic.example.type === 'iframe'"
                :src="topic.example.src"
                class="update-log-iframe"
            ></iframe>
            <component v-if="topic.example.type === 'component'"
                class="update-log-component"
                :is="topic.example.src"
                :sectorObj="topic.example.sectorObj"
            />
        </div>
    </div>
</div>
</template>

<script setup>
import "../../styles/update.css";
import UpdateMenu from "../../components/menus/UpdateMenu.vue";
import NavigationMain from '../../components/NavigationMain.vue';

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { Updates } from "../../stores/Updates.js";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from 'vue';

const webData = useWebsiteDataStore();
const versionIndex = ref(0);
const laptopScreen = ref(true);

const route = useRoute();
const router = useRouter();

onMounted(() => {
    const versionIdx = Updates.findIndex(update => update.versionPath === route.params.version);
    if(versionIdx == -1) {
        router.push("/invalid-update"); return;
    } else {
        versionIndex.value = versionIdx;    
    }

    document.title = ("Mohit Jain | Update " + Updates[versionIdx].version);
    webData.mountWebData();

    setUpdateLog();
    window.addEventListener("resize", setUpdateLog);
});
onUnmounted(() => {
    window.removeEventListener("resize", setUpdateLog);
});

/**
 * This function sets whether the update log is in mobile or laptop form.
 */
function setUpdateLog() {
    laptopScreen.value = (window.innerWidth > 840);
}
</script>