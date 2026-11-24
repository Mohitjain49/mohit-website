<template>
<!-- <WebCover v-if="(webMenuOpen && fullScreenStore.fullScreenSet)" /> -->
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webMenuOpen" :inert="!webMenuOpen" :class="webMenuClasses" :id="menuId">
        <MenuEventActions v-if="webMenuOpen" />
        <div class="mohit-navMenu-closing-cover" v-show="!webMenuOpen"></div>

        <div class="mohit-navMenu-contents">
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

            <!-- This below will store all the content that is unique for a website menu. -->
            <div class="mohit-navMenu-opt-break"></div>
            <slot></slot>
        </div>
    </div>
</Transition>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const props = defineProps({
    menuNumber: { type: Number, default: NAVIGATION_MENU },
    menuId: { type: String, default: "mohit-navMenu" },
    extraMenuClass: { type: String, default: "" },
    showDocOptionsBtn: { type: Boolean, default: false }
});

const router = useRouter();
const webData = useWebsiteDataStore();

const webMenuOpen = computed(() => { return (webData.menuOpen == props.menuNumber); });
const webMenuClasses = computed(() => { return ['mohit-navMenu', props.extraMenuClass, (webMenuOpen.value ? '' : 'closed')]; });
const onHomepage = computed(() => { return (router.currentRoute.value.path === "/"); });

// This unfocuses or "blurs" the active element if the active element is in the website menu when the website menu closes.
watch(webMenuOpen, (newValue) => {
    if(newValue || !import.meta.client || !document || !document.activeElement) { return; }
    const activeElement = document.activeElement;
    if(Boolean(activeElement) && Boolean(activeElement.blur) && Boolean(activeElement.closest("#" + props.menuId))) { activeElement.blur(); }
});
</script>