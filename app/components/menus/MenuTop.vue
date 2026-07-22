<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<div class="mohit-navMenu-top">
    <div class="mohit-navBar-icons menu-top left">
        <RouterLink to="/" class="mohit-navBar-banner" title="Home Page" @click="manageHomeNav()" pulse-loop>
            <img :src="mkj_text" draggable="false" />
        </RouterLink>
    </div>

    <div class="mohit-navBar-icons menu-top right">
        <button v-if="props.showDocOptionsBtn" class="mohit-navBar-icon light" @click="webData.setMenuOpen(DOCUMENT_MENU)" title="Back To Document Options" pulse-loop>
            <font-awesome-icon icon="fa-file-pdf" />
        </button>
        <button class="mohit-navBar-icon light" @click="webData.openQRCodePopup()" :title="SHARE_PAGE_TITLE" pulse-loop>
            <font-awesome-icon icon="fa-share-from-square" />
        </button>
        <button class="mohit-navBar-icon red" @click="webData.closeNavMenu()" title="Close Menu" pulse-loop>
            <font-awesome-icon icon="fa-square-xmark" />
        </button>
    </div>
</div>
<div class="mohit-navMenu-opt-break"></div>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const webData = useWebsiteDataStore();
const router = useRouter();
const props = defineProps({ showDocOptionsBtn: { type: Boolean, default: false }});

/** This function manages the home button on a website menu. */
function manageHomeNav() {
    if(router.currentRoute.value.path !== "/") { return; }
    scrollToTop(false, 0);
    webData.closeNavMenu();
}
</script>