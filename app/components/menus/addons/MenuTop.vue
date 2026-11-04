<template>
<div class="mohit-navMenu-top">
    <div class="mohit-navBar-icons menu-top left">
        <RouterLink to="/" :class="['mohit-navBar-banner', (onHomepage ? 'focused' : '')]" title="Home Page" v-pulse-loop>
            <img :src="mkj_text" draggable="false" />
        </RouterLink>
    </div>

    <div class="mohit-navBar-icons menu-top right">
        <button class="mohit-navBar-icon light" v-if="props.showDocOptionsBtn"
            title="Back To Document Options"
            @click="webData.setMenuOpen(DOCUMENT_MENU)" v-pulse-loop>

            <font-awesome-icon icon="fa-file-pdf" />
        </button>
        <button class="mohit-navBar-icon light" @click="webData.openQRCodePopup()" :title="SHARE_PAGE_TITLE" v-pulse-loop>
            <font-awesome-icon icon="fa-share-from-square" />
        </button>
        <button class="mohit-navBar-icon red" @click="webData.closeNavMenu()" title="Close Menu" v-pulse-loop>
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
const onHomepage = computed(() => { return (router.currentRoute.value.path === "/"); });
</script>