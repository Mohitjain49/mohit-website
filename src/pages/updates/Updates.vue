<template>
<NavigationMain />
<div id="update-body" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
    <UpdateMenu />

    <div v-if="laptopScreen" class="update-content center-flex-display" style="flex-direction: column;">
        <div class="gradient-text incomplete-title">
            {{('Choose an Update!')}}
        </div>
        <div class="main-sector-bottom-linkBtn-container center-flex-display">
            <RouterLink to="/updates/1-1-0" class="main-sector-bottom-linkBtn center-flex-display">See Update 1.1.0</RouterLink>
        </div>
    </div>
</div>
</template>

<script setup>
import "../../styles/update.css";
import "../../styles/nav/navpage.css";
import "../../styles/sectors/sectorstyles.css";

import UpdateMenu from "../../components/menus/UpdateMenu.vue";
import NavigationMain from '../../components/NavigationMain.vue';

import { useWebsiteDataStore } from '../../stores/WebsiteData.js';
import { ref, onMounted, onUnmounted } from 'vue';

const webData = useWebsiteDataStore();
const laptopScreen = ref(false);

onMounted(() => {
    document.title = "Mohit Jain | Updates";
    webData.mountWebData();

    setUpdatesPage();
    window.addEventListener("resize", setUpdatesPage);
});
onUnmounted(() => {
    window.removeEventListener("resize", setUpdatesPage);
})

/**
 * This sets whether the updates page is in its mobile or desktop form.
 */
function setUpdatesPage() {
    laptopScreen.value = (window.innerWidth > 840);
}
</script>