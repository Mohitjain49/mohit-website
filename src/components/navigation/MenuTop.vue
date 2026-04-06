<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<div class="mohit-navMenu-top">
    <div class="mohit-navBar-icons left" style="margin-left: 15px;">
        <RouterLink to="/" class="mohit-navBar-banner" title="Home Page" @click="manageHomeNav()" pulse-loop>
            <img :src="mkj_text" draggable="false" />
        </RouterLink>
    </div>

    <div class="mohit-navBar-icons right" style="margin-right: 12px;">
        <button class="mohit-navBar-icon light" @click="webData.openQRCodePopup()" :title="SHARE_PAGE_TITLE" pulse-loop>
            <font-awesome-icon icon="fa-share-from-square" />
        </button>
        <button class="mohit-navBar-icon red" @click="webData.closeNavMenu()" title="Close Menu" pulse-loop>
            <font-awesome-icon icon="fa-square-xmark" />
        </button>
    </div>
</div>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const webData = useWebsiteDataStore();
const route = useRoute();

/** This function manages the home button on a website menu. */
function manageHomeNav() {
    if(route.path !== "/") { return; }
    scrollToTop(false, 0);
    webData.closeNavMenu();
}
</script>